# ElderLink

ศูนย์เรียนรู้การใช้บริการดิจิทัลสำหรับผู้สูงอายุ อธิบายเป็นภาษาไทยแบบทีละขั้น พร้อมฟังคำแนะนำและเก็บคู่มือที่ใช้บ่อยได้

## กลุ่มผู้ใช้

ผู้สูงอายุ 60 ปีขึ้นไป โดยออกแบบเผื่อผู้ที่สายตาไม่ดี ไม่คุ้นกับศัพท์เทคนิค หรือกังวลว่าจะกดผิด

## ความสามารถ

- หน้าแรกและรายการบริการ แยกตามหมวดหมู่พร้อมค้นหา
- คู่มือ Facebook, Grab, LINE MAN, เป๋าตัง, สุขภาพ และความปลอดภัยออนไลน์
- Tutorial แสดงครั้งละหนึ่งขั้น พร้อม progress และ Browser SpeechSynthesis ภาษาไทย
- รายการโปรดและการตั้งค่าขนาดตัวอักษร/สีตัดกัน เก็บด้วย LocalStorage
- เบอร์ฉุกเฉินแบบแตะเพื่อโทร
- Mobile bottom navigation และ responsive layout

## เทคโนโลยี

React, Vite, React Router, Lucide Icons และ custom CSS

## โครงสร้างสำคัญ

```text
src/
  App.jsx              routing และ state ส่วนกลาง
  components.jsx       reusable UI components
  pages.jsx            หน้าหลักทั้งหมด
  data/services.js     demo services และ tutorial steps
  styles.css           design tokens และ responsive styles
```

## วิธีรัน

```bash
npm install
npm run dev
```

ตรวจ production build ด้วย `npm run build`

## Deploy บน Vercel

เชื่อม repository กับ Vercel แล้วเลือก Vite preset ได้ทันที โดยใช้ build command
`npm run build` และ output directory `dist` ไฟล์ `vercel.json` มี SPA rewrite
เพื่อให้ React Router routes เปิดโดยตรงหรือ refresh ได้โดยไม่พบ 404

## หลักการออกแบบ

Simple, Clear, Familiar, Forgiving: ทุกหน้าระบุหัวข้อชัด มีการกระทำหลักเพียงหนึ่งจุดเด่น ใช้คำไทยตรงไปตรงมา และให้ทางย้อนกลับเสมอ

## Accessibility

ใช้ semantic HTML, visible focus, skip link, heading hierarchy, touch target อย่างน้อย 48px, label คู่กับ icon, contrast ใกล้เคียง WCAG AA, keyboard navigation, `aria-live` ผ่าน status toast และรองรับ `prefers-reduced-motion`

รายละเอียดเหตุผลอยู่ใน `DESIGN_DECISIONS.md`
