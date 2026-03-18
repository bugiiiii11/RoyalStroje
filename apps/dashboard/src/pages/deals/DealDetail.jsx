import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Phone, Mail, FileDown, FileText, Receipt } from 'lucide-react';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';
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
import CreateInvoiceModal from '../invoices/CreateInvoiceModal';
import { VALID_TRANSITIONS, RESERVATION_STATUSES, formatDate, formatPrice } from '../../lib/constants';

export default function DealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transitioning, setTransitioning] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

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
      .select('*, equipment(name, slug)')
      .eq('reservation_id', id),
    [id]
  );

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
              onClick={() => generateQuotePdf(reservation, items, client)}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              title="Stiahnuť cenovú ponuku"
            >
              <FileDown className="w-4 h-4" />
              Ponuka
            </button>
          )}
          <button
            onClick={() => generateAgreementPdf(reservation, items, client)}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            title="Stiahnuť zmluvu"
          >
            <FileText className="w-4 h-4" />
            Zmluva
          </button>
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCancelled
                      ? 'border border-red-300 text-red-600 hover:bg-red-50'
                      : 'bg-royal-500 text-white hover:bg-royal-600'
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
            <DealItemsTable items={items} />
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
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
          >
            Zrušiť
          </button>
          <button
            onClick={() => handleStatusChange(confirmStatus)}
            disabled={transitioning}
            className="px-4 py-2 bg-royal-500 text-white rounded-lg text-sm font-medium hover:bg-royal-600 disabled:opacity-50"
          >
            {transitioning ? 'Mení sa...' : 'Potvrdiť'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
