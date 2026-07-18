# WanderTag — Tour & Travels Website

Ye ek **static website** hai (plain HTML/CSS/JS, koi build step nahi) jisme ek **free admin panel** bhi hai — jahan se aap coding kiye bina packages, prices, images, testimonials sab edit kar sakte hain.

---

## 📁 Kya Kya Hai Isme

- `index.html`, `packages.html`, `package.html`, `about.html`, `contact.html`, `gallery.html` — website ke pages
- `css/style.css` — poori design
- `js/` — packages load karne aur header/footer render karne ka logic
- `content/packages.json` — sabhi tour packages ka data (admin panel se edit hota hai)
- `content/settings.json` — site name, phone, hero text, testimonials (admin panel se edit hota hai)
- `admin/` — aapka **admin panel** (Decap CMS)

**Important:** Abhi images `picsum.photos` ke placeholder hain. Deploy karne ke baad admin panel se apni real photos upload kar dein.

---

## 🚀 Deploy Kaise Karein (100% Free) — Step by Step

### Step 1: GitHub par code daalein
1. [github.com](https://github.com) par free account banayein (agar nahi hai)
2. Naya repository banayein (e.g. `tour-travels-site`) — **Public** ya **Private** dono chalega
3. Is poore folder ka content us repository me upload/push kar dein
   - Sabse aasan: GitHub website par "uploading an existing file" option se saare files/folders drag-drop kar dein
   - Ya git use karke: `git init`, `git add .`, `git commit -m "first commit"`, phir GitHub ke instructions follow karein

### Step 2: Netlify par deploy karein
1. [netlify.com](https://netlify.com) par free account banayein (GitHub se sign up karna sabse aasan hai)
2. Dashboard me **"Add new site" → "Import an existing project"** click karein
3. GitHub connect karein aur apni repository select karein
4. Build settings me kuch change karne ki zaroorat nahi (build command khali chhod dein, publish directory `.` rahega — `netlify.toml` already isko handle kar raha hai)
5. **Deploy site** click karein — 1-2 minute me aapki site live ho jayegi (e.g. `random-name-123.netlify.app`)
6. (Optional) Site settings me jaake site ka naam change kar sakte hain, ya apna khud ka domain (e.g. `wandertag.in`) connect kar sakte hain — Netlify domain connect karna bhi free hai

### Step 3: Admin Panel Enable Karein
Admin panel (`/admin`) ko use karne ke liye Netlify Identity + Git Gateway enable karna hoga (ye login aur file-saving handle karta hai — 100% free):

1. Netlify dashboard me apni site kholein
2. **Site configuration → Identity → Enable Identity**
3. Identity ke andar **Registration** ko **"Invite only"** set karein (taaki koi bhi random signup na kar sake)
4. **Site configuration → Identity → Services → Git Gateway → Enable Git Gateway**
5. Wapas **Identity** tab me jaake **"Invite users"** click karein aur apna email daalein
6. Aapke email par ek invite aayega — usko accept karke apna password set karein

### Step 4: Admin Panel Use Karein
1. Apni site ke URL ke aage `/admin` lagayein (e.g. `wandertag.netlify.app/admin`)
2. Login karein (jo password Step 3 me set kiya tha)
3. Ab aap:
   - **Tour Packages** section me jaake naya package add kar sakte hain, price/duration/images change kar sakte hain
   - **Site Settings** me phone number, WhatsApp number, hero text, about text, testimonials edit kar sakte hain
4. Har change **"Publish"** karne par 1-2 minute me live website par reflect ho jayega

---

## ✏️ Zaroor Change Karein (Deploy Karne Se Pehle Ya Baad Me)

Admin panel se ye sab edit kar sakte hain, ya seedhe `content/settings.json` file me:
- `whatsapp_number` — apna real WhatsApp business number (country code ke saath, `+` ke bina, e.g. `919876543210`)
- `phone`, `email`, `address`
- `hero_image`, `about_image` — apni real photos
- Sabhi packages ki real photos, prices, itinerary

---

## 💡 Extra (Optional) Improvements

- **Contact form ko email par bhejna ho** (abhi ye WhatsApp khol deta hai): [Formspree.io](https://formspree.io) ka free plan use karein — sirf form ka `action` attribute unki URL se replace karna hoga
- **Custom domain**: Netlify me free me connect ho jata hai, sirf domain kharidna padega (GoDaddy/Namecheap se ~₹700-900/year me `.in` domain milta hai)
- **SEO**: Har page ke `<title>` aur `<meta name="description">` ko apni real business info se update karein

---

## ❓ Kuch Kaam Nahi Kar Raha?

- **Admin panel login nahi ho raha** → Identity aur Git Gateway dono enable hain ya nahi check karein (Step 3)
- **Changes site par nahi dikh rahe** → Deploy hone me 1-2 minute lagta hai, Netlify dashboard ke "Deploys" tab me status check karein
- **Images nahi dikh rahi** → Admin panel se upload ki gayi images `images/uploads/` folder me save hoti hain, path automatically sahi set ho jata hai
