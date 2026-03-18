import { Construction } from 'lucide-react';

export default function Placeholder({ title, sprint = 2 }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Construction className="w-12 h-12 text-gray-300 mb-4" />
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <p className="text-gray-400 mt-2">Pripravuje sa v Sprint {sprint}</p>
    </div>
  );
}
