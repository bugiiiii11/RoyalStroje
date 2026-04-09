import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Phone, Mail, MapPin, Crown, User, Calendar, CreditCard, Plus, Trash2, Star } from 'lucide-react';
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
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', position: '' });
  const [savingContact, setSavingContact] = useState(false);
  const { client: { data: client, loading }, reservations: { data: deals, loading: dealsLoading }, contacts: { data: contactsList, refetch: refetchContacts } } = useClient(id);

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

          {/* Contact Persons (PO only) */}
          {!isFO && (
            <ContentCard title={`Kontaktné osoby (${contactsList?.length || 0}/5)`}>
              <div className="space-y-3">
                {(contactsList || []).map((c) => (
                  <div key={c.id} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-gray-50">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {c.is_primary && <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />}
                        <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                      </div>
                      {c.position && <p className="text-xs text-gray-400">{c.position}</p>}
                      {c.phone && <p className="text-xs text-gray-600">{c.phone}</p>}
                      {c.email && <p className="text-xs text-gray-600 truncate">{c.email}</p>}
                    </div>
                    {!c.is_primary && (
                      <button
                        onClick={async () => {
                          await supabase.from('client_contacts').delete().eq('id', c.id);
                          refetchContacts();
                        }}
                        className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                {(contactsList?.length || 0) < 5 && !showAddContact && (
                  <button
                    onClick={() => setShowAddContact(true)}
                    className="flex items-center gap-1.5 text-sm text-royal-600 hover:text-royal-700 font-medium w-full justify-center py-1.5 border border-dashed border-royal-300 rounded-lg hover:border-royal-400 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Pridať kontakt
                  </button>
                )}

                {showAddContact && (
                  <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                    <input placeholder="Meno a priezvisko *" value={newContact.name}
                      onChange={(e) => setNewContact(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500" />
                    <input placeholder="Pozícia" value={newContact.position}
                      onChange={(e) => setNewContact(p => ({ ...p, position: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500" />
                    <input placeholder="Telefón" value={newContact.phone}
                      onChange={(e) => setNewContact(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500" />
                    <input placeholder="Email" type="email" value={newContact.email}
                      onChange={(e) => setNewContact(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500" />
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          if (!newContact.name.trim()) return;
                          setSavingContact(true);
                          try {
                            await supabase.from('client_contacts').insert({
                              client_id: id,
                              name: newContact.name,
                              phone: newContact.phone || null,
                              email: newContact.email || null,
                              position: newContact.position || null,
                              is_primary: (contactsList?.length || 0) === 0,
                            });
                            setNewContact({ name: '', phone: '', email: '', position: '' });
                            setShowAddContact(false);
                            refetchContacts();
                          } catch (e) { alert(e.message); }
                          finally { setSavingContact(false); }
                        }}
                        disabled={savingContact || !newContact.name.trim()}
                        className="flex-1 bg-royal-500 text-white text-xs font-semibold py-1.5 rounded-lg disabled:opacity-50"
                      >
                        {savingContact ? 'Ukladá...' : 'Uložiť'}
                      </button>
                      <button onClick={() => setShowAddContact(false)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs hover:bg-gray-50">
                        Zrušiť
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ContentCard>
          )}

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
