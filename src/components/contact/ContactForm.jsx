import { useState } from 'react';
import { Send, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    honeypot: '' // Anti-bot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Rate limiting - max 3 správy za hodinu
  const checkRateLimit = () => {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    const oneHourAgo = Date.now() - (60 * 60 * 1000);

    // Filter submissions from last hour
    const recentSubmissions = submissions.filter(time => time > oneHourAgo);

    if (recentSubmissions.length >= 3) {
      return false;
    }

    // Add current submission
    recentSubmissions.push(Date.now());
    localStorage.setItem('formSubmissions', JSON.stringify(recentSubmissions));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      console.log('Bot detected');
      return;
    }

    // Rate limiting check
    if (!checkRateLimit()) {
      setError('Prekročili ste limit odoslaných správ. Skúste to prosím o hodinu.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not ready');
      }

      const recaptchaToken = await executeRecaptcha('submit_contact_form');

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        message: formData.message || 'Bez správy',
        recaptcha_token: recaptchaToken,
        to_email: 'info@royalstroje.sk'
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          honeypot: ''
        });
      }
    } catch (err) {
      console.error('Error sending email:', err);

      // Check if it's a quota limit error
      if (err.text && err.text.includes('quota')) {
        setError('limit');
      } else {
        setError('general');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Error state with fallback contact options
  if (error === 'limit') {
    return (
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mx-auto mb-6">
          <Phone className="text-orange-primary" size={40} />
        </div>
        <h3 className="text-white font-black text-2xl mb-4">Formulár je momentálne nedostupný</h3>
        <p className="text-white/70 mb-6 leading-relaxed">
          Dosiahli sme mesačný limit správ. Kontaktujte nás prosím priamo:
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <a
            href="tel:+421948555551"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all"
          >
            <Phone size={20} />
            <span>0948 555 551</span>
          </a>
          <a
            href="https://wa.me/421948555551"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-full hover:scale-105 transition-all"
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </a>
        </div>
        <button
          onClick={() => setError(null)}
          className="text-orange-primary font-bold hover:text-orange-hover transition-colors"
        >
          ← Späť na formulár
        </button>
      </div>
    );
  }

  if (error === 'general') {
    return (
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mx-auto mb-6">
          <Phone className="text-orange-primary" size={40} />
        </div>
        <h3 className="text-white font-black text-2xl mb-4">Nastala chyba</h3>
        <p className="text-white/70 mb-6 leading-relaxed">
          Správu sa nepodarilo odoslať. Prosím kontaktujte nás priamo:
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <a
            href="tel:+421948555551"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all"
          >
            <Phone size={20} />
            <span>0948 555 551</span>
          </a>
          <a
            href="mailto:info@royalstroje.sk"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 text-white font-bold rounded-full hover:scale-105 transition-all"
          >
            <span>info@royalstroje.sk</span>
          </a>
        </div>
        <button
          onClick={() => setError(null)}
          className="text-orange-primary font-bold hover:text-orange-hover transition-colors"
        >
          ← Skúsiť znova
        </button>
      </div>
    );
  }

  // Success state
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

  // Form state
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
        {/* Honeypot field - hidden from users, visible to bots */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ position: 'absolute', left: '-9999px' }}
          tabIndex="-1"
          autoComplete="off"
        />

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
          <span>{isSubmitting ? 'Odosiela sa...' : 'Odoslať správu'}</span>
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

        {/* reCAPTCHA Badge Info */}
        <p className="text-center text-white/40 text-xs mt-4">
          Táto stránka je chránená službou reCAPTCHA. Platia{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-primary hover:text-orange-hover">
            Zásady ochrany osobných údajov
          </a>
          {' '}a{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-orange-primary hover:text-orange-hover">
            Zmluvné podmienky
          </a>
          {' '}spoločnosti Google.
        </p>
      </form>
    </div>
  );
}
