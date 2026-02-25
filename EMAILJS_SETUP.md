# EmailJS + reCAPTCHA v3 - Návod na nastavenie

Tento dokument obsahuje kompletnýkrok-za-krokom návod na nastavenie EmailJS a Google reCAPTCHA v3 pre kontaktný formulár.

---

## 1. Nastavenie EmailJS

### Krok 1: Registrácia na EmailJS

1. Choďte na [https://dashboard.emailjs.com/sign-up](https://dashboard.emailjs.com/sign-up)
2. Zaregistrujte sa pomocou Google účtu alebo emailu
3. Prihláste sa do dashboardu

### Krok 2: Pridanie Email Service

1. V dashboarde kliknite na **"Email Services"** v ľavom menu
2. Kliknite na **"Add New Service"**
3. Vyberte **Gmail** (alebo iný email provider podľa vašich potrieb)
4. Prihláste sa pomocou **info@royalstroje.sk** Google účtu
5. Skopírujte **Service ID** (napr. `service_abc123`)
6. Kliknite **"Create Service"**

### Krok 3: Vytvorenie Email Template

1. V dashboarde kliknite na **"Email Templates"**
2. Kliknite na **"Create New Template"**
3. Nastavte template nasledovne:

**Template Name:** `contact_form_royalstroje`

**Subject:**
```
Nový dopyt z webu - {{project_type}}
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ff6600; border-bottom: 3px solid #ff6600; padding-bottom: 10px;">
    Nový dopyt z kontaktného formulára
  </h2>

  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #333;">Kontaktné údaje</h3>
    <p><strong>Meno:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Telefón:</strong> {{phone}}</p>
  </div>

  <div style="background: #fff; padding: 20px; border-left: 4px solid #ff6600; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #333;">Projekt</h3>
    <p><strong>Typ projektu:</strong> {{project_type}}</p>
  </div>

  <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #333;">Správa</h3>
    <p style="white-space: pre-wrap;">{{message}}</p>
  </div>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

  <p style="color: #666; font-size: 12px; text-align: center;">
    Odoslané z kontaktného formulára Royal Stroje
  </p>
</div>
```

4. V časti **"Settings"** nastavte:
   - **From Name:** `Royal Stroje Web`
   - **From Email:** `{{from_email}}`
   - **To Email:** `info@royalstroje.sk`
   - **Subject:** `Nový dopyt z webu - {{project_type}}`

5. Kliknite **"Save"**
6. Skopírujte **Template ID** (napr. `template_xyz456`)

### Krok 4: Získanie Public Key

1. V dashboarde kliknite na **"Account"** (ikona užívateľa vpravo hore)
2. Choďte do sekcie **"General"**
3. Nájdite **"Public Key"** (napr. `AbCdEfGhIjKlMnOp`)
4. Skopírujte ho

---

## 2. Nastavenie Google reCAPTCHA v3

### Krok 1: Registrácia reCAPTCHA

1. Choďte na [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Prihláste sa pomocou Google účtu

### Krok 2: Vytvorenie nového Site Key

1. Vyplňte formulár:
   - **Label:** `Royal Stroje - Kontaktný formulár`
   - **reCAPTCHA type:** Vyberte **reCAPTCHA v3**
   - **Domains:** Pridajte:
     - `royalstroje.sk`
     - `www.royalstroje.sk`
     - `localhost` (pre testovanie)
   - **Owners:** Môžete pridať ďalších administrátorov

2. Súhlaste s podmienkami
3. Kliknite **"Submit"**

### Krok 3: Získanie Site Key

1. Po vytvorení uvidíte:
   - **Site Key** (napr. `6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890`)
   - **Secret Key** (tento NEPOTREBUJEME pre reCAPTCHA v3 frontend)

2. Skopírujte **Site Key**

---

## 3. Konfigurácia Environment Variables

Otvorte súbor `.env` v root priečinku projektu a vyplňte získané hodnoty:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz456
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp

# Google reCAPTCHA v3
VITE_RECAPTCHA_SITE_KEY=6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**DÔLEŽITÉ:** Nahraďte ukážkové hodnoty skutočnými hodnotami z vašich účtov!

---

## 4. Testovanie

### Krok 1: Reštartujte development server

```bash
npm run dev
```

### Krok 2: Otvorte stránku "Cenová ponuka"

Navigujte na `http://localhost:5173/cenova-ponuka`

### Krok 3: Vyplňte a odošlite formulár

1. Vyplňte všetky povinné polia
2. Kliknite na **"Odoslať správu"**
3. Počkajte na hlášku **"Ďakujeme za správu!"**

### Krok 4: Skontrolujte email

Skontrolujte emailovú schránku **info@royalstroje.sk** - mail by mal prísť do 1 minúty.

---

## 5. Funkcionality a ochrana

### ✅ Implementované bezpečnostné funkcie:

1. **reCAPTCHA v3** - Neviditeľná ochrana proti botom
2. **Honeypot field** - Skryté pole, ktoré zachytáva boty
3. **Rate limiting** - Max 3 správy za hodinu z jedného zariadenia
4. **EmailJS quota handling** - Automatická detekcia mesačného limitu (200 emailov)
5. **Fallback kontakty** - Ak zlyhá odoslanie, zobrazí sa telefón a WhatsApp

### 📊 Sledovanie limitov:

- **EmailJS Dashboard:** [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
  - Sledujte počet odoslaných emailov
  - Free tier: 200 emailov/mesiac
  - Limit sa resetuje 1. deň v mesiaci

- **reCAPTCHA Admin:** [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
  - Sledujte score a štatistiky

---

## 6. Riešenie problémov

### Problém: Formulár neodosiela správy

**Riešenie:**
1. Skontrolujte konzolu prehliadača (F12)
2. Overte, že sú všetky environment variables správne nastavené
3. Skontrolujte EmailJS dashboard či je service aktívny

### Problém: Email neprichádza

**Riešenie:**
1. Skontrolujte SPAM priečinok
2. Overte že template je správne nastavený s `to_email: info@royalstroje.sk`
3. V EmailJS dashboarde choďte do **"Email Services"** a overte Gmail pripojenie

### Problém: reCAPTCHA sa nezobrazuje

**Riešenie:**
1. Skontrolujte že Site Key je správny v `.env`
2. Overte že doména je pridaná v reCAPTCHA admin konzole
3. Skúste vyprázdniť cache prehliadača

### Problém: "Formulár je momentálne nedostupný"

**Riešenie:**
- Dosiahli ste 200 emailov/mesiac v EmailJS free tier
- Možnosti:
  1. Počkať na nový mesiac (limit sa resetuje)
  2. Upgrade na paid plán (EmailJS Personal - $15/mesiac za 1000 emailov)
  3. Používatelia môžu použiť telefón/WhatsApp

---

## 7. Upgrade možnosti

Ak potrebujete viac ako 200 emailov/mesiac:

### EmailJS Personal Plan ($15/mesiac)
- 1,000 emailov/mesiac
- Email podpora
- Viac services a templates

### EmailJS Team Plan ($50/mesiac)
- 5,000 emailov/mesiac
- Prioritná podpora
- Team spolupráca

Upgrade: [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)

---

## 8. Podpora

V prípade otázok:
- **EmailJS dokumentácia:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **reCAPTCHA dokumentácia:** [https://developers.google.com/recaptcha/docs/v3](https://developers.google.com/recaptcha/docs/v3)

---

**Implementácia vykonaná:** 2025-02-25
**Verzia:** 1.0
