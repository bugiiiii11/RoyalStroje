import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using formspree.io or similar service - replace with your endpoint
    // For now, using mailto as fallback
    const mailtoLink = `mailto:info@royalstroje.sk?subject=Dopyt z webu - ${formData.projectType}&body=Meno: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ATelefón: ${formData.phone}%0D%0ATyp projektu: ${formData.projectType}%0D%0A%0D%0ASprávová:%0D%0A${formData.message}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-white" size={40} />
        </div>
        <h3 className="text-white font-black text-2xl mb-4">Ďakujeme za správu!</h3>
        <p className="text-white/70 mb-6">
          Ozveme sa vám do 24 hodín s cenovou ponukou.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-orange-primary font-bold hover:text-orange-hover transition-colors"
        >
          Poslať ďalšiu správu →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 md:border-2 rounded-2xl md:rounded-3xl p-6 md:p-12">
      <div className="mb-6 md:mb-8 text-center">
        <h3 className="text-white font-black text-2xl md:text-3xl mb-3 md:mb-4">
          Potrebujete <span className="text-orange-primary">cenovú ponuku</span>?
        </h3>
        <p className="text-white/70 text-sm md:text-base">
          Vyplňte formulár a ozveme sa vám do 24 hodín s nezáväznou ponukou.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-white font-bold text-sm md:text-base mb-2">
            Meno a priezvisko <span className="text-orange-primary">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all"
            placeholder="Ján Novák"
          />
        </div>

        {/* Email & Phone - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="email" className="block text-white font-bold text-sm md:text-base mb-2">
              Email <span className="text-orange-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all"
              placeholder="jan.novak@email.sk"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-white font-bold text-sm md:text-base mb-2">
              Telefón <span className="text-orange-primary">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all"
              placeholder="0900 123 456"
            />
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-white font-bold text-sm md:text-base mb-2">
            Typ projektu <span className="text-orange-primary">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-orange-primary/50 transition-all"
          >
            <option value="">Vyberte typ projektu</option>
            <option value="Stavba domu">Stavba domu</option>
            <option value="Rekonštrukcia">Rekonštrukcia</option>
            <option value="Terénne úpravy">Terénne úpravy</option>
            <option value="Zemné práce">Zemné práce</option>
            <option value="Záhradné úpravy">Záhradné úpravy</option>
            <option value="Iné">Iné</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-white font-bold text-sm md:text-base mb-2">
            Správa
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all resize-none"
            placeholder="Popíšte nám vašu požiadavku..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-base md:text-lg rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send size={20} />
          <span>{isSubmitting ? 'Odosiela sa...' : 'Odoslať dopyt'}</span>
        </button>

        {/* Info Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4 text-xs md:text-sm text-white/60">
          <span className="flex items-center gap-1">
            <span className="text-orange-primary">✓</span> Odpoveď do 24 hodín
          </span>
          <span className="flex items-center gap-1">
            <span className="text-orange-primary">✓</span> Zadarmo a nezáväzne
          </span>
          <span className="flex items-center gap-1">
            <span className="text-orange-primary">✓</span> Osobný prístup
          </span>
        </div>
      </form>
    </div>
  );
}
