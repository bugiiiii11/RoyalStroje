import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Phone, Mail, MapPin, Crown, Send, User, Calendar, CreditCard } from 'lucide-react';
import useClient from '../../hooks/useClient';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { ContentCard } from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import { formatPrice, formatDate, CLIENT_TYPES } from '../../lib/constants';

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [inviting, setInviting] = useState(false);
  const [inviteResult, setInviteResult] = useState(null);
  const { client: { data: client, loading }, reservations: { data: deals, loading: dealsLoading } } = useClient(id);

  if (loading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (!client) {
    return <p className="text-center text-gray-500 py-20">Klient nebol nájdený</p>;
  }

  const isFO = client.entity_type === 'fo';
  const typeInfo = CLIENT_TYPES[client.client_type] || CLIENT_TYPES.standard;
  const typeColorMap = {
    standard: { bg: 'bg-gray-100', text: 'text-gray-700' },
    royal_card: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    vip: { bg: 'bg-purple-100', text: 'text-purple-700' },
  };
  const typeColors = typeColorMap[client.client_type] || typeColorMap.standard;

  const totalRevenue = (deals || [])
    .filter(d => ['completed', 'invoiced', 'paid'].includes(d.status))
    .reduce((sum, d) => sum + (parseFloat(d.total) || 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/clients')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{client.company_name}</h1>
            <Badge
              label={isFO ? 'FO' : 'PO'}
              bg={isFO ? 'bg-blue-50' : 'bg-gray-100'}
              text={isFO ? 'text-blue-600' : 'text-gray-600'}
            />
            <Badge label={typeInfo.label} bg={typeColors.bg} text={typeColors.text} />
          </div>
          {client.contact_person && (
            <p className="text-sm text-gray-500 mt-0.5">{client.contact_person}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rental History */}
          <ContentCard title={`Prenájmy (${deals?.length || 0})`}>
            {dealsLoading ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : !deals || deals.length === 0 ? (
              <EmptyState message="Žiadne prenájmy" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Číslo</th>
                      <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Stav</th>
                      <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Termín</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Celkom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {deals.map((deal) => (
                      <tr
                        key={deal.id}
                        onClick={() => navigate(`/deals/${deal.id}`)}
                        className="cursor-pointer table-row-hover"
                      >
                        <td className="px-4 py-3 font-mono text-sm font-medium">{deal.reservation_number}</td>
                        <td className="px-4 py-3"><StatusBadge status={deal.status} /></td>
                        <td className="px-4 py-3 text-gray-600">
                          {formatDate(deal.date_from)} – {formatDate(deal.date_to)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium">{formatPrice(deal.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ContentCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <ContentCard title="Kontakt">
            <div className="space-y-3">
              {client.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{client.phone}</span>
                </div>
              )}
              {client.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{client.email}</span>
                </div>
              )}
              {(client.address || client.city) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{[client.address, client.postal_code, client.city].filter(Boolean).join(', ')}</span>
                </div>
              )}
            </div>
          </ContentCard>

          {/* Business/Personal Details */}
          <ContentCard title={isFO ? 'Osobné údaje' : 'Firemné údaje'}>
            <div className="space-y-2 text-sm">
              {isFO ? (
                <>
                  {client.birth_date && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Dátum narodenia</span>
                      <span>{new Date(client.birth_date).toLocaleDateString('sk-SK')}</span>
                    </div>
                  )}
                  {client.id_card_number && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" />Číslo OP</span>
                      <span>{client.id_card_number}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {client.ico && <div className="flex justify-between"><span className="text-gray-500">IČO</span><span>{client.ico}</span></div>}
                  {client.dic && <div className="flex justify-between"><span className="text-gray-500">DIČ</span><span>{client.dic}</span></div>}
                  {client.ic_dph && <div className="flex justify-between"><span className="text-gray-500">IČ DPH</span><span>{client.ic_dph}</span></div>}
                </>
              )}
              {typeInfo.discount > 0 && (
                <div className="flex justify-between"><span className="text-gray-500">Zľava</span><span className="text-green-600">{typeInfo.discount}%</span></div>
              )}
            </div>
          </ContentCard>

          {/* Stats */}
          <ContentCard title="Štatistiky">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Počet obchodov</span>
                <span className="font-medium">{deals?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Celkový obrat</span>
                <span className="font-medium">{formatPrice(totalRevenue)}</span>
              </div>
            </div>
          </ContentCard>

          {/* Royal Card Invite */}
          {client.client_type !== 'royal_card' && client.client_type !== 'vip' && (
            <ContentCard title="Royal Card">
              {inviteResult ? (
                <div>
                  <p className="text-sm text-green-600 mb-1">Pozvánka vytvorená!</p>
                  <p className="text-xs font-mono bg-gray-100 px-3 py-2 rounded text-center">{inviteResult}</p>
                  <p className="text-xs text-gray-400 mt-2">Kód pošlite klientovi</p>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    setInviting(true);
                    try {
                      const { data, error } = await supabase.from('royal_card_invitations').insert({
                        email: client.email || '',
                        company_name: client.company_name,
                        invited_by: user?.id,
                        client_id: client.id,
                        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                      }).select().single();
                      if (error) throw error;
                      setInviteResult(data.invite_code);
                    } catch (e) {
                      alert('Chyba: ' + e.message);
                    } finally {
                      setInviting(false);
                    }
                  }}
                  disabled={inviting}
                  className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white text-sm font-semibold py-2.5 rounded-full shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50"
                >
                  <Crown className="w-4 h-4" />
                  {inviting ? 'Vytvára sa...' : 'Pozvať do Royal Card'}
                </button>
              )}
            </ContentCard>
          )}

          {client.notes && (
            <ContentCard title="Poznámky">
              <p className="text-sm text-gray-600">{client.notes}</p>
            </ContentCard>
          )}
        </div>
      </div>
    </div>
  );
}
