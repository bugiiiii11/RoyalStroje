import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewDealStepConfirm({ reservation }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Obchod vytvorený!</h2>
      <p className="text-gray-500 mb-1">Číslo obchodu</p>
      <p className="text-3xl font-mono font-bold text-royal-600 mb-8">{reservation?.reservation_number}</p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/deals/${reservation?.id}`)}
          className="bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-glow hover:shadow-glow-md transition-all btn-press"
        >
          Zobraziť detail
        </button>
        <button
          onClick={() => navigate('/deals/new', { replace: true })}
          className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-full transition-colors"
        >
          Nový obchod
        </button>
      </div>
    </div>
  );
}
