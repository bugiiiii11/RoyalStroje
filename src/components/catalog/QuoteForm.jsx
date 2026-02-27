import { useState } from 'react';
import { Send, CheckCircle, FileText } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import emailjs from '@emailjs/browser';

export default function QuoteForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    honeypot: ''
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

  const checkRateLimit = () => {
    const submissions = JSON.parse(localStorage.getItem('quoteSubmissions') || '[]');
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const recentSubmissions = submissions.filter(time => time > oneHourAgo);

    if (recentSubmissions.length >= 3) {
      return false;
    }

    recentSubmissions.push(Date.now());
    localStorage.setItem('quoteSubmissions', JSON.stringify(recentSubmissions));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.honeypot) {
      return;
    }

    if (!checkRateLimit()) {
      setError('rate_limit');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not ready');
      }

      const recaptchaToken = await executeRecaptcha('submit_quote_form');

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        message: formData.message || 'Žiadam o cenovú ponuku',
        recaptcha_token: recaptchaToken,
        to_email: 'info@royalstroje.sk'
      };

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

        // Auto reset after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (err) {
      console.error('Error sending email:', err);
      setError('general');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-white" size={32} />
        </div>
        <h3 className="text-white font-black text-lg mb-2">Ďakujeme!</h3>
        <p className="text-white/70 text-sm">
          Ozveme sa vám do 24 hodín.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-white/10 px-4 py-3 flex items-center gap-2">
        <FileText size={18} className="text-orange-primary" />
        <h3 className="text-white font-bold text-sm">Cenová ponuka</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        {/* Honeypot */}
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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all"
            placeholder="Meno a priezvisko *"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all"
            placeholder="Email *"
          />
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all"
            placeholder="Telefón *"
          />
        </div>

        {/* Project Type */}
        <div>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-primary/50 transition-all"
          >
            <option value="">Vyberte typ projektu *</option>
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
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all resize-none"
            placeholder="Správa (voliteľné)"
          ></textarea>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-xs">
              {error === 'rate_limit'
                ? 'Prekročili ste limit správ. Skúste o hodinu.'
                : 'Chyba pri odosielaní. Zavolajte nám.'}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-primary/40 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <Send size={16} className="relative z-10" />
          <span className="relative z-10">{isSubmitting ? 'Odosiela sa...' : 'Odoslať'}</span>
        </button>

        {/* Info */}
        <p className="text-white/50 text-[10px] text-center leading-tight">
          Odpoveď do 24h • Nezáväzne
        </p>
      </form>
    </div>
  );
}
