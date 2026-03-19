import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Crown, AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: invite code, 1: details, 2: success
  const [inviteCode, setInviteCode] = useState('');
  const [invitation, setInvitation] = useState(null);
  const [form, setForm] = useState({ email: '', password: '', company_name: '', contact_person: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateCode = async () => {
    setError('');
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from('royal_card_invitations')
        .select('*')
        .eq('invite_code', inviteCode.trim())
        .in('status', ['pending', 'sent'])
        .gt('expires_at', new Date().toISOString())
        .single();
      if (err || !data) throw new Error('Neplatný alebo expirovaný kód pozvánky');
      setInvitation(data);
      setForm(f => ({ ...f, email: data.email || '', company_name: data.company_name || '' }));
      setStep(1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Create auth user
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { app_role: 'royal_card' } },
      });
      if (authErr) throw authErr;

      const userId = authData.user?.id;
      if (!userId) throw new Error('Registrácia zlyhala');

      // Link client + mark invitation via RPC (bypasses RLS)
      const { error: rpcErr } = await supabase.rpc('register_royal_card', {
        p_auth_user_id: userId,
        p_invitation_id: invitation.id,
        p_client_id: invitation.client_id || null,
        p_company_name: form.company_name,
        p_contact_person: form.contact_person,
        p_email: form.email,
        p_phone: form.phone,
      });
      if (rpcErr) throw rpcErr;

      setStep(2);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-royal-500 to-royal-400 rounded-xl shadow-glow mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Registrácia Royal Card</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}

          {step === 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Zadajte kód z pozvánky od Royal Stroje</p>
              <input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="RC-XXXXXXXX"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center text-lg font-mono focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none mb-4"
              />
              <button onClick={validateCode} disabled={loading || !inviteCode.trim()}
                className="w-full bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold py-2.5 rounded-full shadow-glow btn-press disabled:opacity-50 transition-all">
                {loading ? 'Overujem...' : 'Overiť kód'}
              </button>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <p className="text-sm text-gray-500 mb-2">Doplňte údaje pre vytvorenie účtu</p>
              <input value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} type="email" required
                placeholder="Email *" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
              <input value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} type="password" required minLength={6}
                placeholder="Heslo (min. 6 znakov) *" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
              <input value={form.company_name} onChange={(e) => setForm(f => ({ ...f, company_name: e.target.value }))} required
                placeholder="Názov firmy *" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
              <input value={form.contact_person} onChange={(e) => setForm(f => ({ ...f, contact_person: e.target.value }))}
                placeholder="Kontaktná osoba" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
              <input value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="Telefón" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold py-2.5 rounded-full shadow-glow btn-press disabled:opacity-50 transition-all">
                {loading ? 'Registrujem...' : 'Zaregistrovať sa'}
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="text-center py-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Registrácia úspešná!</h2>
              <p className="text-gray-500 mb-6">Teraz sa môžete prihlásiť do portálu.</p>
              <button onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-glow btn-press transition-all">
                Prihlásiť sa
              </button>
            </div>
          )}

          {step < 2 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Už máte účet? <Link to="/login" className="text-royal-600 hover:underline font-medium">Prihláste sa</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
