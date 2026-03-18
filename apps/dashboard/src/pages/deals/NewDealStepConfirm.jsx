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
          className="bg-royal-500 hover:bg-royal-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Zobraziť detail
        </button>
        <button
          onClick={() => navigate('/deals/new', { replace: true })}
          className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Nový obchod
        </button>
      </div>
    </div>
  );
}
