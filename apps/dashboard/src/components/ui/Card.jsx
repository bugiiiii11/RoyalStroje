export function StatCard({ icon: Icon, label, value, color = 'bg-blue-500' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

export function ContentCard({ title, children, action, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
