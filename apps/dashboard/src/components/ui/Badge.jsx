export default function Badge({ label, bg = 'bg-gray-100', text = 'text-gray-700', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${className}`}>
      {label}
    </span>
  );
}
