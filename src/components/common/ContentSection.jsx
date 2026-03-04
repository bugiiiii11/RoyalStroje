export default function ContentSection({ children, className = "", id, ...props }) {
  return (
    <section
      id={id}
      className={`relative pb-16 md:py-16 overflow-hidden min-h-screen ${className}`}
      style={{
        background: 'linear-gradient(to bottom, #09090b 0%, #09090b 2%, #52525b 30%, #52525b 80%, #09090b 98%, #09090b 100%)'
      }}
      {...props}
    >
      {children}
    </section>
  );
}
