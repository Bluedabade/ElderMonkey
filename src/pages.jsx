import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  ShieldCheck,
  Search,
  Heart,
  CheckCircle2,
  Home as HomeIcon,
  Volume2,
} from "lucide-react";
import { services, allGuides } from "./data/services";
import { ServiceCard, GuideCard, SpeechButton } from "./components";
export function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">เรียนรู้ได้ ไม่ต้องกลัวกดผิด</p>
            <h1>
              สวัสดีครับ
              <br />
              วันนี้อยากเรียนรู้อะไร?
            </h1>
            <p className="lead">
              เลือกเรื่องที่ต้องการ เราจะอธิบายให้ทีละขั้นด้วยภาษาที่เข้าใจง่าย
            </p>
            <Link className="btn primary large" to="/services">
              ดูบริการทั้งหมด <ArrowRight />
            </Link>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="phone">
              <div className="phone-top"></div>
              <div className="bubble one">
                <CheckCircle2 /> ทำทีละขั้น
              </div>
              <div className="bubble two">
                <Volume2 /> กดฟังได้
              </div>
              <div className="hand"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHead
          eyebrow="เริ่มต้นตรงนี้"
          title="บริการที่ใช้บ่อย"
          link="/services"
        />
        <div className="service-grid">
          {services.slice(0, 4).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>
      <EmergencyStrip />
      <section className="section container two-col">
        <div className="safety-card">
          <span className="iconbox orange">
            <ShieldCheck />
          </span>
          <div>
            <p className="eyebrow">รู้ทัน ปลอดภัยกว่า</p>
            <h2>อย่าบอกรหัส OTP ให้ใคร</h2>
            <p>
              ธนาคารและเจ้าหน้าที่จะไม่โทรมาขอรหัสผ่าน หากไม่แน่ใจให้หยุดก่อน
              แล้วถามคนที่ไว้ใจ
            </p>
            <Link className="btn secondary" to="/services/safety">
              เรียนรู้เรื่องความปลอดภัย
            </Link>
          </div>
        </div>
        <div className="latest">
          <p className="eyebrow">แนะนำวันนี้</p>
          <h2>วิธีเรียกรถ Grab</h2>
          <p>ตั้งแต่เลือกจุดรับ จนถึงตรวจสอบทะเบียนรถก่อนขึ้น</p>
          <Link to="/tutorial/grab/ride" className="text-link">
            เริ่มเรียน 6 ขั้นตอน <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
function SectionHead({ eyebrow, title, link }) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link to={link}>
          ดูทั้งหมด <ArrowRight />
        </Link>
      )}
    </div>
  );
}
function EmergencyStrip() {
  return (
    <section className="emergency-strip">
      <div className="container emergency-inner">
        <div>
          <p className="eyebrow">ความช่วยเหลือเร่งด่วน</p>
          <h2>ต้องการความช่วยเหลือฉุกเฉิน?</h2>
          <p>แตะที่เบอร์เพื่อโทรออกได้ทันที</p>
        </div>
        <div className="quick-numbers">
          <a href="tel:1669">
            <Phone />
            <span>
              <strong>1669</strong>
              <small>การแพทย์ฉุกเฉิน</small>
            </span>
          </a>
          <a href="tel:191">
            <Phone />
            <span>
              <strong>191</strong>
              <small>เหตุด่วนเหตุร้าย</small>
            </span>
          </a>
        </div>
        <Link className="btn light" to="/emergency">
          ดูเบอร์ทั้งหมด
        </Link>
      </div>
    </section>
  );
}
export function Services() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("ทั้งหมด");
  const cats = ["ทั้งหมด", ...new Set(services.map((s) => s.category))];
  const found = services.filter(
    (s) =>
      (cat === "ทั้งหมด" || s.category === cat) &&
      `${s.name}${s.short}${s.guides.map((g) => g.title)}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <div className="container page">
      <p className="eyebrow">รวมคู่มือทั้งหมด</p>
      <h1>อยากเรียนรู้เรื่องอะไร?</h1>
      <p className="lead">ค้นหาจากชื่อบริการ หรือเลือกหมวดหมู่ด้านล่าง</p>
      <label className="search">
        <Search />
        <span className="sr-only">ค้นหาวิธีใช้งาน</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาวิธีใช้งาน เช่น เรียกรถ"
        />
      </label>
      <div className="chips" aria-label="กรองตามหมวดหมู่">
        {cats.map((c) => (
          <button
            className={cat === c ? "active" : ""}
            onClick={() => setCat(c)}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="result-count">พบ {found.length} บริการ</p>
      <div className="service-grid">
        {found.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
      {!found.length && (
        <div className="empty">
          <Search />
          <h2>ยังไม่พบเรื่องที่ค้นหา</h2>
          <p>ลองใช้คำสั้น ๆ เช่น “รถ” หรือ “อาหาร”</p>
        </div>
      )}
    </div>
  );
}
export function ServiceDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const s = services.find((x) => x.id === id);
  if (!s)
    return (
      <div className="container page">
        <h1>ไม่พบบริการนี้</h1>
      </div>
    );
  const I = s.Icon;
  return (
    <div className="container page">
      <Link className="back" to="/services">
        <ArrowLeft /> กลับไปหน้าบริการ
      </Link>
      <section className="service-hero" style={{ "--accent": s.color }}>
        <span className="iconbox">
          <I />
        </span>
        <div>
          <p className="eyebrow">{s.category}</p>
          <h1>{s.name}</h1>
          <p>{s.short}</p>
        </div>
      </section>
      <SectionHead eyebrow="เลือกเรื่องที่ต้องการ" title={`คู่มือ ${s.name}`} />
      <div className="guide-list">
        {s.guides.map((g) => (
          <GuideCard
            key={g.id}
            guide={g}
            serviceId={s.id}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
export function Tutorial({ favorites, toggleFavorite }) {
  const { serviceId, guideId } = useParams();
  const s = services.find((x) => x.id === serviceId),
    g = s?.guides.find((x) => x.id === guideId);
  const [i, setI] = useState(0);
  if (!g) return null;
  const step = g.steps[i],
    fid = serviceId + "-" + guideId;
  return (
    <div className="tutorial-page">
      <div className="container tutorial-top">
        <Link className="back" to={"/services/" + serviceId}>
          <ArrowLeft /> กลับหน้าบริการ {s.name}
        </Link>
        <button
          className={"icon-label " + (favorites.includes(fid) ? "saved" : "")}
          onClick={() => toggleFavorite(fid)}
          aria-pressed={favorites.includes(fid)}
          aria-label={`${favorites.includes(fid) ? "นำออกจาก" : "เพิ่มใน"}รายการโปรด: ${g.title}`}
        >
          <Heart />
          {favorites.includes(fid) ? "อยู่ในรายการโปรด" : "เก็บไว้ดู"}
        </button>
      </div>
      <article className="tutorial-card">
        <div className="progress-head">
          <span>
            ขั้นตอนที่ <strong>{i + 1}</strong> จาก {g.steps.length}
          </span>
          <span>{Math.round(((i + 1) / g.steps.length) * 100)}%</span>
        </div>
        <div
          className="progress"
          aria-label={`ขั้นตอน ${i + 1} จาก ${g.steps.length}`}
        >
          <span style={{ width: `${((i + 1) / g.steps.length) * 100}%` }} />
        </div>
        <div className="step-visual" style={{ "--accent": s.color }}>
          <div className="mock-phone">
            <span>{i + 1}</span>
            <s.Icon />
          </div>
        </div>
        <div className="step-copy">
          <p className="eyebrow">{g.title}</p>
          <h1>{step.title}</h1>
          <p>{step.text}</p>
          <div className="calm-note">
            <CheckCircle2 />
            <span>
              <strong>จำไว้นะครับ</strong>
              {step.hint}
            </span>
          </div>
          <SpeechButton text={`${step.title} ${step.text} ${step.hint}`} />
        </div>
        <div className="tutorial-nav">
          <button
            className="btn secondary"
            disabled={i === 0}
            onClick={() => setI(i - 1)}
          >
            <ArrowLeft /> ย้อนกลับ
          </button>
          {i < g.steps.length - 1 ? (
            <button className="btn primary" onClick={() => setI(i + 1)}>
              ขั้นตอนถัดไป <ArrowRight />
            </button>
          ) : (
            <Link className="btn primary" to={"/services/" + serviceId}>
              เรียนจบแล้ว <CheckCircle2 />
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
export function Emergency() {
  const nums = [
    ["1669", "การแพทย์ฉุกเฉิน", "เจ็บป่วยรุนแรง หมดสติ หรืออุบัติเหตุ"],
    ["191", "เหตุด่วนเหตุร้าย", "แจ้งตำรวจเมื่อมีอันตรายหรือเหตุร้าย"],
    ["199", "ดับเพลิง", "แจ้งเหตุไฟไหม้และสัตว์เข้าบ้าน"],
    ["1155", "ตำรวจท่องเที่ยว", "ขอความช่วยเหลือสำหรับนักท่องเที่ยว"],
    ["1441", "ศูนย์ต่อต้านมิจฉาชีพ", "แจ้งเหตุหรือขอคำแนะนำเรื่องภัยออนไลน์"],
  ];
  return (
    <div className="container page emergency-page">
      <p className="eyebrow">พร้อมช่วยเหลือ</p>
      <h1>เบอร์โทรฉุกเฉิน</h1>
      <p className="lead">เลือกเบอร์ตามเหตุการณ์ แล้วแตะปุ่มสีแดงเพื่อโทรออก</p>
      <div className="emergency-list">
        {nums.map((n) => (
          <article key={n[0]}>
            <div>
              <strong>{n[0]}</strong>
              <h2>{n[1]}</h2>
              <p>{n[2]}</p>
            </div>
            <a className="btn emergency" href={"tel:" + n[0]}>
              <Phone /> โทร {n[0]}
            </a>
          </article>
        ))}
      </div>
      <div className="calm-note">
        <ShieldCheck />
        <span>
          <strong>หากไม่แน่ใจว่าโทรเบอร์ไหน</strong>โทร 191
          และบอกเจ้าหน้าที่ว่าเกิดอะไรขึ้น อยู่ที่ไหน และชื่อของคุณ
        </span>
      </div>
    </div>
  );
}
export function Favorites({ favorites, toggleFavorite }) {
  const gs = allGuides.filter((g) =>
    favorites.includes(g.serviceId + "-" + g.id),
  );
  return (
    <div className="container page">
      <p className="eyebrow">เปิดดูได้สะดวก</p>
      <h1>รายการโปรด</h1>
      <p className="lead">คู่มือที่คุณเก็บไว้จะอยู่ในหน้านี้</p>
      {gs.length ? (
        <div className="guide-list">
          {gs.map((g) => (
            <GuideCard
              key={g.serviceId + g.id}
              guide={g}
              serviceId={g.serviceId}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Heart />
          <h2>ยังไม่มีรายการโปรด</h2>
          <p>เมื่อพบคู่มือที่ใช้บ่อย กด “เก็บไว้ดู” เพื่อกลับมาเปิดได้ง่าย</p>
          <Link className="btn primary" to="/services">
            เลือกดูบริการ
          </Link>
        </div>
      )}
    </div>
  );
}
export function HowTo() {
  return (
    <div className="container page readable">
      <p className="eyebrow">เริ่มต้นใช้งาน</p>
      <h1>วิธีใช้ ElderLink</h1>
      <p className="lead">เว็บไซต์นี้ช่วยสอนการใช้บริการดิจิทัลแบบทีละขั้น</p>
      {[
        ["1", "เลือกบริการ", "ไปที่หน้า “บริการ” แล้วเลือกเรื่องที่อยากเรียน"],
        ["2", "เลือกคู่มือ", "กด “เริ่มเรียน” ในหัวข้อที่ต้องการ"],
        ["3", "ทำตามทีละขั้น", "อ่านหรือกดฟังคำแนะนำ แล้วกด “ขั้นตอนถัดไป”"],
        [
          "4",
          "เก็บเรื่องที่ใช้บ่อย",
          "กด “เก็บไว้ดู” เพื่อเปิดจากหน้ารายการโปรด",
        ],
      ].map((x) => (
        <div className="how-row" key={x[0]}>
          <span>{x[0]}</span>
          <div>
            <h2>{x[1]}</h2>
            <p>{x[2]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
