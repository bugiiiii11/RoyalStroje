import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Phone, Mail, FileDown, FileText, Receipt, CheckCircle, ChevronDown } from 'lucide-react';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';
import useReservationContracts from '../../hooks/useReservationContracts';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/ui/StatusBadge';
import { ContentCard } from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';
import DealItemsTable from './DealItemsTable';
import DealFinancials from './DealFinancials';
import DealTimeline from './DealTimeline';
import generateQuotePdf from '../../lib/generateQuotePdf';
import generateAgreementPdf from '../../lib/generateAgreementPdf';
import generateAgreementPdfPO from '../../lib/generateAgreementPdfPO';
import CreateInvoiceModal from '../invoices/CreateInvoiceModal';
import ReturnItemsModal from './ReturnItemsModal';
import { VALID_TRANSITIONS, RESERVATION_STATUSES, formatDate, formatPrice } from '../../lib/constants';

export default function DealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transitioning, setTransitioning] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [finalDropdownOpen, setFinalDropdownOpen] = useState(false);

  const { data: reservation, loading, refetch } = useSupabaseQuery(
    () => supabase
      .from('reservations')
      .select('*, clients(*)')
      .eq('id', id)
      .single(),
    [id]
  );

  const { data: items } = useSupabaseQuery(
    () => supabase
      .from('reservation_items')
      .select('*, equipment(name, slug, rate_unit)')
      .eq('reservation_id', id),
    [id]
  );

  const { data: contractInfo, refetch: refetchContract } = useReservationContracts(id);
  const contracts = contractInfo?.contracts || [];
  const finalContracts = contractInfo?.finalContracts || [];
  const returnedBySerial = contractInfo?.returnedBySerial || {};
  const returnedQty = contractInfo?.returnedQty || {};
  const navrhContract = contracts.find((c) => c.type === 'navrh');

  // Determine how many units are still NOT returned
  const remainingUnits = (items || []).reduce((count, item) => {
    const serials = Array.isArray(item.serial_numbers) ? item.serial_numbers.filter(Boolean) : [];
    if (serials.length > 0) {
      const returned = returnedBySerial[item.id] || new Set();
      return count + serials.filter((sn) => !returned.has(sn)).length;
    }
    const qty = parseInt(item.quantity, 10) || 1;
    const alreadyReturned = returnedQty[item.id] || 0;
    return count + Math.max(0, qty - alreadyReturned);
  }, 0);
  const hasPendingReturns = remainingUnits > 0 && items && items.length > 0;

  const handleStatusChange = async (newStatus) => {
    setTransitioning(true);
    try {
      const updates = { status: newStatus };
      if (newStatus === 'cancelled') {
        updates.cancelled_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('reservations')
        .update(updates)
        .eq('id', id);
      if (error) throw error;

      await supabase.rpc('log_activity', {
        p_user_id: user?.id,
        p_action: 'status.changed',
        p_entity_type: 'reservation',
        p_entity_id: id,
        p_details: { from: reservation.status, to: newStatus },
      });

      setConfirmStatus(null);
      refetch();
    } catch (e) {
      alert('Chyba: ' + e.message);
    } finally {
      setTransitioning(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (!reservation) {
    return <p className="text-center text-gray-500 py-20">Obchod nebol nájdený</p>;
  }

  const client = reservation.clients;
  const validNext = VALID_TRANSITIONS[reservation.status] || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 font-mono">{reservation.reservation_number}</h1>
            <StatusBadge status={reservation.status} />
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Vytvorené {formatDate(reservation.created_at)}
          </p>
        </div>

        {/* PDF Buttons */}
        <div className="flex gap-2">
          {reservation.status !== 'inquiry' && (
            <button
              onClick={async () => await generateQuotePdf(reservation, items, client)}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all"
              title="Stiahnuť cenovú ponuku"
            >
              <FileDown className="w-4 h-4" />
              Ponuka
            </button>
          )}
          {/* Návrh zmluvy — available while any item still out */}
          {hasPendingReturns && (
            <button
              onClick={async () => {
                const gen = client?.entity_type === 'fo' ? generateAgreementPdf : generateAgreementPdfPO;
                await gen(reservation, items, client, navrhContract || null);
              }}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all"
              title="Stiahnuť návrh zmluvy"
            >
              <FileText className="w-4 h-4" />
              Návrh zmluvy
            </button>
          )}

          {/* Finálne zmluvy dropdown (one or more) */}
          {finalContracts.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setFinalDropdownOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 border border-purple-300 text-purple-700 hover:bg-purple-50 rounded-lg text-sm font-medium transition-all"
                title="Finálne zmluvy"
              >
                <FileText className="w-4 h-4" />
                {finalContracts.length === 1 ? 'Finálna zmluva' : `Finálne zmluvy (${finalContracts.length})`}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {finalDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setFinalDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                    {finalContracts.map((fc) => {
                      const count = fc.contract_returned_items?.length || 0;
                      return (
                        <button
                          key={fc.id}
                          onClick={async () => {
                            setFinalDropdownOpen(false);
                            // Rebuild items with only the returned ones for this contract
                            const returnedMap = {};
                            for (const r of fc.contract_returned_items || []) {
                              if (!returnedMap[r.reservation_item_id]) returnedMap[r.reservation_item_id] = [];
                              returnedMap[r.reservation_item_id].push(r);
                            }
                            const pdfItems = (items || [])
                              .map((item) => {
                                const own = returnedMap[item.id];
                                if (!own || own.length === 0) return null;
                                const serials = own.filter((r) => r.serial_number).map((r) => r.serial_number);
                                const qty = serials.length > 0
                                  ? serials.length
                                  : own.reduce((s, r) => s + (r.quantity || 0), 0);
                                const days = fc.calculated_days || 0;
                                return {
                                  ...item,
                                  quantity: qty,
                                  serial_numbers: serials,
                                  days,
                                  line_total: (parseFloat(item.daily_rate) || 0) * qty * days,
                                };
                              })
                              .filter(Boolean);
                            const gen = client?.entity_type === 'fo' ? generateAgreementPdf : generateAgreementPdfPO;
                            await gen(reservation, pdfItems, client, fc);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-mono font-medium text-gray-900">{fc.contract_number}</p>
                            <p className="text-xs text-gray-500">
                              {fc.return_date ? formatDate(fc.return_date) : '—'} · {count} {count === 1 ? 'položka' : 'položky'}
                            </p>
                          </div>
                          <FileDown className="w-4 h-4 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Vrátiť zariadenia — while any item still out */}
          {hasPendingReturns && (
            <button
              onClick={() => setShowReturn(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-lg text-sm font-medium shadow-glow hover:shadow-glow-md btn-press transition-all"
              title="Vrátiť zariadenia a generovať finálnu zmluvu"
            >
              <CheckCircle className="w-4 h-4" />
              Vrátiť zariadenia
            </button>
          )}
          {['completed', 'invoiced', 'paid'].includes(reservation.status) && (
            <button
              onClick={() => setShowInvoice(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              title="Vystaviť faktúru"
            >
              <Receipt className="w-4 h-4" />
              Faktúra
            </button>
          )}
        </div>

        {/* Status Actions */}
        {validNext.length > 0 && (
          <div className="flex gap-2">
            {validNext.map((nextStatus) => {
              const info = RESERVATION_STATUSES[nextStatus];
              const isCancelled = nextStatus === 'cancelled';
              return (
                <button
                  key={nextStatus}
                  onClick={() => setConfirmStatus(nextStatus)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    isCancelled
                      ? 'border border-red-300 text-red-600 hover:bg-red-50 rounded-lg'
                      : 'bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-full shadow-glow hover:shadow-glow-md btn-press'
                  }`}
                >
                  → {info.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dates */}
          <ContentCard title="Termín">
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-gray-500">Od</p>
                <p className="font-medium text-gray-900">{formatDate(reservation.date_from)}</p>
              </div>
              <div>
                <p className="text-gray-500">Do</p>
                <p className="font-medium text-gray-900">{formatDate(reservation.date_to)}</p>
              </div>
              {reservation.delivery_required && (
                <div>
                  <p className="text-gray-500">Dovoz</p>
                  <p className="font-medium text-gray-900">{reservation.delivery_address || 'Áno'}</p>
                </div>
              )}
            </div>
          </ContentCard>

          {/* Items */}
          <ContentCard title="Zariadenia">
            <DealItemsTable
              items={items}
              returnedBySerial={returnedBySerial}
              returnedQty={returnedQty}
            />
          </ContentCard>

          {/* Notes */}
          {(reservation.notes || reservation.internal_notes) && (
            <ContentCard title="Poznámky">
              {reservation.notes && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">Pre klienta</p>
                  <p className="text-sm text-gray-700">{reservation.notes}</p>
                </div>
              )}
              {reservation.internal_notes && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Interné</p>
                  <p className="text-sm text-gray-700">{reservation.internal_notes}</p>
                </div>
              )}
            </ContentCard>
          )}

          {/* Timeline */}
          <ContentCard title="Aktivita">
            <DealTimeline reservationId={id} />
          </ContentCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Financials */}
          <ContentCard title="Financie">
            <DealFinancials reservation={reservation} />
          </ContentCard>

          {/* Client Info */}
          {client && (
            <ContentCard title="Klient">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{client.company_name}</span>
                </div>
                {client.contact_person && (
                  <p className="text-sm text-gray-600 ml-6">{client.contact_person}</p>
                )}
                {client.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{client.phone}</span>
                  </div>
                )}
                {client.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{client.email}</span>
                  </div>
                )}
                {client.ico && (
                  <p className="text-xs text-gray-400 mt-2">IČO: {client.ico}</p>
                )}
              </div>
            </ContentCard>
          )}
        </div>
      </div>

      {/* Return Items Modal */}
      <ReturnItemsModal
        open={showReturn}
        onClose={() => setShowReturn(false)}
        reservation={reservation}
        items={items}
        client={client}
        contracts={contracts}
        returnedBySerial={returnedBySerial}
        returnedQty={returnedQty}
        onFinalized={() => { setShowReturn(false); refetchContract(); refetch(); }}
      />

      {/* Invoice Modal */}
      <CreateInvoiceModal
        open={showInvoice}
        onClose={() => setShowInvoice(false)}
        reservationId={id}
        onCreated={() => { setShowInvoice(false); navigate('/invoices'); }}
      />

      {/* Status Change Confirmation Modal */}
      <Modal
        open={!!confirmStatus}
        onClose={() => setConfirmStatus(null)}
        title="Zmena stavu"
      >
        <p className="text-sm text-gray-600 mb-6">
          Naozaj chcete zmeniť stav z <strong>{RESERVATION_STATUSES[reservation.status]?.label}</strong> na{' '}
          <strong>{RESERVATION_STATUSES[confirmStatus]?.label}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmStatus(null)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all"
          >
            Zrušiť
          </button>
          <button
            onClick={() => handleStatusChange(confirmStatus)}
            disabled={transitioning}
            className="px-4 py-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-full text-sm font-medium shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50"
          >
            {transitioning ? 'Mení sa...' : 'Potvrdiť'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
