export default function ContentSection({ children, className = "", id, light = false, ...props }) {
  return (
    <section
      id={id}
      className={`relative pb-16 md:py-16 overflow-hidden min-h-screen ${className}`}
      style={{
        background: light ? '#FAFAFA' : '#181818'
      }}
      {...props}
    >
      {children}
    </section>
  );
}
