# ElderLink — Assignment Criteria Mapping

## 9.1 ความน่าสนใจ / ตอบโจทย์ / ความคิดสร้างสรรค์ (3 คะแนน)

- แก้ปัญหาจริงของผู้สูงอายุที่ไม่มั่นใจในการใช้บริการดิจิทัล
- แบ่งคำแนะนำเป็น Step-by-Step เพื่อลด cognitive load
- ใช้ภาพหน้าจอและวิดีโอจากการใช้งานจริงเพื่อเชื่อมคำอธิบายกับหน้าจอที่ผู้ใช้พบ
- มีเสียงอ่าน ตัวอักษรหลายขนาด High Contrast และข้อความเตือนที่สงบ
- รวมการเรียนรู้บริการทั่วไป ความปลอดภัย และหมายเลขฉุกเฉินใน Information Architecture เดียวที่มีเหตุผล

## 9.2 ความสวยงาม / หน้าจอ / เมนู / Interaction (3 คะแนน)

- ใช้ design tokens ร่วมกันสำหรับสี spacing radius shadow และ container
- Responsive ตั้งแต่ mobile ถึง desktop โดยจำกัดความกว้างเนื้อหาเพื่อให้อ่านง่าย
- ปุ่มและ interactive controls มี touch target อย่างน้อย 48px พร้อม hover, focus, active และ disabled state
- Tutorial มี progress, media, tip, speech, Previous/Next และ completion feedback
- Favorites มี pressed state และ toast ส่วน Settings มี keyboard focus management
- รองรับ High Contrast, Large Text และ `prefers-reduced-motion`

## 9.3 ความสัมพันธ์ของเมนูและฟังก์ชัน (2 คะแนน)

เส้นทางหลักเชื่อมต่อกันอย่างชัดเจน:

`Home → Services → Service Detail → Tutorial → Completion`

ผู้ใช้เก็บ Tutorial เพื่อเปิดซ้ำผ่าน Favorites ได้ ส่วน Emergency เป็นเส้นทางเร่งด่วนที่แยกจากการเรียนรู้ และ Reading Settings เป็นเครื่องมือระดับเว็บไซต์ที่ใช้ได้ทุกหน้า จึงไม่มีเมนูหลักที่ซ้ำหน้าที่กัน

## 9.4 การนำเสนอ (2 คะแนน)

- มี `PRESENTATION_GUIDE.md` จัดลำดับเนื้อหาและ Live Demo ครบภายใน 10 นาที
- มี flow สำรองและคำแนะนำการแบ่งเวลาสำหรับสมาชิก
- มี `AI_USAGE.md` อธิบายเครื่องมือ AI วิธีใช้ และบทบาทการตรวจสอบของผู้พัฒนาตามข้อกำหนด
- Demo หลักเน้น Facebook, Messenger, Grab และ LINE MAN ซึ่งมีสื่อจริงพร้อมใช้งาน
