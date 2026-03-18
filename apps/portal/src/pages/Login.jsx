import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle, Crown } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? 'Nesprávny email alebo heslo' : 'Chyba pri prihlásení');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-500 rounded-xl mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Royal Card</h1>
          <p className="text-gray-500 mt-1">Klientský portál</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heslo</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-royal-500 hover:bg-royal-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50">
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <><LogIn className="w-4 h-4" />Prihlásiť sa</>}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Máte pozvánku? <Link to="/register" className="text-royal-600 hover:underline font-medium">Zaregistrujte sa</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
