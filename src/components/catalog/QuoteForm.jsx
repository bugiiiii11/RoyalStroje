import { useState } from 'react';
import { Send, CheckCircle, FileText } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import emailjs from '@emailjs/browser';
import CustomSelect from '../ui/CustomSelect';
import RecaptchaWrapper from '../common/RecaptchaWrapper';

function QuoteFormInner() {
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
      // Debug: Check environment variables
      console.log('EmailJS Config:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        recaptchaKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
      });

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
      <div className="card-light p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-white" size={32} />
        </div>
        <h3 className="text-zinc-900 font-black text-lg mb-2">Ďakujeme!</h3>
        <p className="text-zinc-600 text-sm">
          Ozveme sa vám do 24 hodín.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 border-t-2 border-t-orange-primary/60 rounded-2xl shadow-sm shadow-zinc-900/5 overflow-visible">
      {/* Header with Title and Description */}
      <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-4 md:py-5 rounded-t-2xl">
        <div className="flex items-center gap-2 mb-2">
          <FileText size={18} className="text-orange-primary" />
          <h3 className="text-zinc-900 font-bold text-base md:text-lg">
            Potrebujete <span className="text-orange-primary">cenovú ponuku?</span>
          </h3>
        </div>
        {/* Description - Desktop only */}
        <p className="hidden md:block text-zinc-600 text-xs md:text-sm pl-7">
          Vyplňte formulár a ozveme sa vám do 24 hodín s nezáväznou ponukou.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-3 overflow-visible">
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
            className="input-light px-3 py-2.5"
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
            className="input-light px-3 py-2.5"
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
            className="input-light px-3 py-2.5"
            placeholder="Telefón *"
          />
        </div>

        {/* Project Type */}
        <div>
          <CustomSelect
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            light
            placeholder="Vyberte typ projektu *"
            options={[
              { value: 'Stavba domu', label: 'Stavba domu' },
              { value: 'Rekonštrukcia', label: 'Rekonštrukcia' },
              { value: 'Terénne úpravy', label: 'Terénne úpravy' },
              { value: 'Zemné práce', label: 'Zemné práce' },
              { value: 'Záhradné úpravy', label: 'Záhradné úpravy' },
              { value: 'Iné', label: 'Iné' },
            ]}
          />
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="input-light px-3 py-2.5 resize-none"
            placeholder="Správa (voliteľné)"
          ></textarea>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-xs">
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
          className="btn-primary w-full px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Send size={16} />
          <span>{isSubmitting ? 'Odosiela sa...' : 'Odoslať'}</span>
        </button>
      </form>
    </div>
  );
}

export default function QuoteForm() {
  return (
    <RecaptchaWrapper>
      <QuoteFormInner />
    </RecaptchaWrapper>
  );
}
