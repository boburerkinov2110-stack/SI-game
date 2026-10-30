# Shaxsiy o’yin — turnir platformasi

Statik veb-sayt (HTML + CSS + vanilla JavaScript). Build, framework va server kerak emas.
Ma’lumotlar foydalanuvchi brauzerida (localStorage) saqlanadi.

## Fayllar
- `index.html` — sahifa
- `style.css` — dizayn
- `app.js` — barcha mantiq
- `vercel.json` — Vercel sozlamalari (xavfsizlik sarlavhalari, build yo’q)
- `.gitignore` — maxfiy/keraksiz fayllarni Git’dan chiqarib tashlaydi

## Lokal ishga tushirish
`npx serve .` yoki `index.html` ni brauzerda oching.

## Vercel’ga joylashtirish
**A) GitHub orqali (tavsiya etiladi)**
1. GitHub’da yangi repozitoriy yarating va shu papka ichidagi fayllarni yuklang.
2. vercel.com → Add New → Project → repozitoriyni tanlang → Import.
3. Framework Preset: **Other**. Build Command, Install Command va Output Directory maydonlarini **bo’sh** qoldiring (vercel.json allaqachon sozlagan).
4. Deploy tugmasini bosing. 1 daqiqada `https://loyiha-nomi.vercel.app` manzili tayyor bo’ladi.
5. Keyingi o’zgarishlar: GitHub’ga push qiling, Vercel o’zi qayta joylaydi.

**B) Vercel CLI orqali**
1. `npm i -g vercel`
2. Shu papkada: `vercel login`, so’ng `vercel` (sinov), `vercel --prod` (ishchi nusxa).

**O’z domeningiz:** Project → Settings → Domains → Add, so’ng DNS yozuvlarini Vercel ko’rsatganidek kiriting.

## Xavfsizlik
Kodda API kalit, parol yoki tashqi so’rovlar yo’q. `.env` fayllari `.gitignore`da. Kelajakda kalit kerak bo’lsa, uni kodga emas, Vercel → Settings → Environment Variables bo’limiga kiriting.
