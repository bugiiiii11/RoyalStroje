import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import NewDealStepClient from './NewDealStepClient';
import NewDealStepItems from './NewDealStepItems';
import NewDealStepReview from './NewDealStepReview';
import NewDealStepConfirm from './NewDealStepConfirm';

const STEPS = ['Klient', 'Zariadenia', 'Súhrn', 'Hotovo'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            i < current ? 'bg-green-500 text-white' :
            i === current ? 'bg-royal-500 text-white' :
            'bg-gray-200 text-gray-500'
          }`}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`text-sm hidden sm:inline ${i === current ? 'font-medium text-gray-900' : 'text-gray-400'}`}>
            {label}
          </span>
          {i < STEPS.length - 1 && <div className="w-8 h-px bg-gray-300 hidden sm:block" />}
        </div>
      ))}
    </div>
  );
}

export default function NewDeal() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const [client, setClient] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [items, setItems] = useState([]);

  const canNext = () => {
    if (step === 0) return !!client;
    if (step === 1) return dateFrom && dateTo && items.length > 0;
    return true;
  };

  const handleSubmit = async (finalData) => {
    setSubmitting(true);
    setError('');
    try {
      let clientId = finalData.client.id;

      // Create new client if needed
      if (finalData.client._isNew) {
        const { data: newClient, error: clientErr } = await supabase
          .from('clients')
          .insert({
            company_name: finalData.client.company_name,
            contact_person: finalData.client.contact_person,
            email: finalData.client.email,
            phone: finalData.client.phone,
            client_type: 'standard',
          })
          .select()
          .single();
        if (clientErr) throw clientErr;
        clientId = newClient.id;
      }

      // Create reservation
      const { data: reservation, error: resErr } = await supabase
        .from('reservations')
        .insert({
          client_id: clientId,
          status: 'inquiry',
          date_from: finalData.dateFrom,
          date_to: finalData.dateTo,
          delivery_required: finalData.deliveryRequired,
          delivery_address: finalData.deliveryAddress || null,
          delivery_fee: finalData.deliveryFee || 0,
          discount_percent: finalData.discountPercent || 0,
          deposit_required: finalData.client.client_type !== 'royal_card',
          notes: finalData.notes || null,
          internal_notes: finalData.internalNotes || null,
          created_by: user?.id,
        })
        .select()
        .single();
      if (resErr) throw resErr;

      // Create reservation items
      const itemsToInsert = finalData.items.map((item) => ({
        reservation_id: reservation.id,
        equipment_id: item.equipment_id,
        quantity: item.quantity,
        daily_rate: item.daily_rate,
        days: item.days,
        line_total: item.quantity * item.daily_rate * item.days,
      }));

      const { error: itemsErr } = await supabase
        .from('reservation_items')
        .insert(itemsToInsert);
      if (itemsErr) throw itemsErr;

      // Log activity
      await supabase.rpc('log_activity', {
        p_user_id: user?.id,
        p_action: 'reservation.created',
        p_entity_type: 'reservation',
        p_entity_id: reservation.id,
        p_details: { reservation_number: reservation.reservation_number },
      });

      // Fetch updated reservation (with recalculated totals)
      const { data: updated } = await supabase
        .from('reservations')
        .select('*')
        .eq('id', reservation.id)
        .single();

      setResult(updated || reservation);
      setStep(3);
    } catch (e) {
      setError(e.message || 'Chyba pri vytváraní obchodu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nový obchod</h1>
      <StepIndicator current={step} />

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
      )}

      {step === 0 && <NewDealStepClient selected={client} onSelect={setClient} />}
      {step === 1 && (
        <NewDealStepItems
          dateFrom={dateFrom}
          dateTo={dateTo}
          items={items}
          onDatesChange={(f, t) => { setDateFrom(f); setDateTo(t); }}
          onItemsChange={setItems}
        />
      )}
      {step === 2 && (
        <NewDealStepReview
          dealData={{ client, items, dateFrom, dateTo }}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
      {step === 3 && <NewDealStepConfirm reservation={result} />}

      {/* Navigation */}
      {step < 3 && step !== 2 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-30 transition-colors"
          >
            Späť
          </button>
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="px-6 py-2 bg-royal-500 text-white rounded-lg text-sm font-medium hover:bg-royal-600 disabled:opacity-50 transition-colors"
          >
            Ďalej
          </button>
        </div>
      )}
    </div>
  );
}
