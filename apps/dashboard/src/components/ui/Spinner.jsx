export default function Spinner({ size = 'md', className = '' }) {
  const sizeClass = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  return (
    <div className={`animate-spin rounded-full ${sizeClass} border-2 border-royal-100 border-t-royal-500 ${className}`} />
  );
}
