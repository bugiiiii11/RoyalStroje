import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

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
      setError(
        err.message === 'Invalid login credentials'
          ? 'Nesprávny email alebo heslo'
          : 'Chyba pri prihlásení. Skúste to znova.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-royal-500 to-royal-400 rounded-2xl shadow-glow-md mb-4">
            <span className="text-2xl font-bold text-white">RS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Royal Stroje</h1>
          <p className="text-gray-500 mt-1">Dashboard prihlásenie</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none transition-colors input-glow"
                placeholder="meno@royalstroje.sk"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Heslo
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none transition-colors input-glow"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold py-2.5 px-4 rounded-full shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Prihlásiť sa
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
