import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Home,
  Grid2X2,
  Phone,
  Heart,
  Settings,
  ChevronRight,
  Star,
  X,
  Minus,
  Plus,
  Volume2,
  Square,
} from "lucide-react";

export function Layout({ children, settings, setSettings }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isTutorial = location.pathname.startsWith("/tutorial/");
  return (
    <div className={`app${isTutorial ? " tutorial-mode" : ""}`}>
      <a className="skip" href="#main">
        ข้ามไปเนื้อหาหลัก
      </a>
      <header>
        <div className="container header">
          <Link className="brand" to="/" aria-label="ElderLink หน้าหลัก">
            <span className="brandmark">E</span>
            <span>
              ElderLink<small>เพื่อนคู่ใจเรื่องดิจิทัล</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="เมนูหลัก">
            <NavItem to="/" icon={Home}>
              หน้าหลัก
            </NavItem>
            <NavItem to="/services" icon={Grid2X2}>
              บริการ
            </NavItem>
            <NavItem to="/emergency" icon={Phone}>
              ฉุกเฉิน
            </NavItem>
            <NavItem to="/favorites" icon={Heart}>
              รายการโปรด
            </NavItem>
          </nav>
          <button
            className="settings-btn"
            aria-label="เปิดตั้งค่าการอ่าน"
            onClick={() => setOpen(true)}
          >
            <Settings /> <span>ตั้งค่าการอ่าน</span>
          </button>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="container footer">
          <div>
            <strong>ElderLink</strong>
            <p>เรียนรู้ดิจิทัลอย่างมั่นใจ ทีละขั้น</p>
          </div>
          <Link to="/how-to">วิธีใช้ ElderLink</Link>
          <Link to="/emergency">เบอร์ฉุกเฉิน</Link>
        </div>
      </footer>
      <nav className="bottom-nav" aria-label="เมนูหลักบนมือถือ">
        <NavItem to="/" icon={Home}>
          หน้าหลัก
        </NavItem>
        <NavItem to="/services" icon={Grid2X2}>
          บริการ
        </NavItem>
        <NavItem to="/emergency" icon={Phone}>
          ฉุกเฉิน
        </NavItem>
        <NavItem to="/favorites" icon={Heart}>
          โปรด
        </NavItem>
      </nav>
      {open && (
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}
function NavItem({ to, icon: Icon, children }) {
  return (
    <NavLink to={to} end={to === "/"}>
      <Icon />
      <span>{children}</span>
    </NavLink>
  );
}
function SettingsPanel({ settings, setSettings, close }) {
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <section
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <button
          className="close"
          onClick={close}
          aria-label="ปิดหน้าต่างตั้งค่า"
        >
          <X />
        </button>
        <p className="eyebrow">ปรับให้สบายตา</p>
        <h2 id="settings-title">ตั้งค่าการอ่าน</h2>
        <fieldset>
          <legend>ขนาดตัวอักษร</legend>
          <div className="segmented">
            {[
              ["normal", "ปกติ"],
              ["large", "ใหญ่"],
              ["xlarge", "ใหญ่มาก"],
            ].map(([v, l]) => (
              <button
                key={v}
                className={settings.font === v ? "selected" : ""}
                onClick={() => setSettings({ ...settings, font: v })}
              >
                {l}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="switch-row">
          <span>
            <strong>สีตัดกันชัดเจน</strong>
            <small>เพิ่มความเข้มของตัวอักษรและขอบ</small>
          </span>
          <input
            type="checkbox"
            checked={settings.contrast}
            onChange={(e) =>
              setSettings({ ...settings, contrast: e.target.checked })
            }
          />
        </label>
        <button className="btn primary full" onClick={close}>
          บันทึกและปิด
        </button>
      </section>
    </div>
  );
}
export function ServiceCard({ service }) {
  const I = service.Icon;
  return (
    <Link
      className="service-card"
      to={"/services/" + service.id}
      style={{ "--accent": service.color }}
    >
      <span className="iconbox">
        <I />
      </span>
      <span>
        <strong>{service.name}</strong>
        <small>{service.short}</small>
      </span>
      <ChevronRight className="chev" />
    </Link>
  );
}
export function GuideCard({
  guide,
  serviceId,
  favorites = [],
  toggleFavorite,
}) {
  const id = serviceId + "-" + guide.id,
    yes = favorites.includes(id);
  return (
    <article className="guide-card">
      <div>
        <span className="tag">{guide.steps.length} ขั้นตอน</span>
        <h3>{guide.title}</h3>
        <p>{guide.time}</p>
      </div>
      <div className="card-actions">
        <Link className="btn primary" to={`/tutorial/${serviceId}/${guide.id}`}>
          เริ่มเรียน <ChevronRight />
        </Link>
        {toggleFavorite && (
          <button
            className={"icon-label " + (yes ? "saved" : "")}
            onClick={() => toggleFavorite(id)}
            aria-pressed={yes}
            aria-label={`${yes ? "นำออกจาก" : "เพิ่มใน"}รายการโปรด: ${guide.title}`}
          >
            <Star />
            {yes ? "บันทึกแล้ว" : "เก็บไว้ดู"}
          </button>
        )}
      </div>
    </article>
  );
}
export function SpeechButton({ text }) {
  const [reading, setReading] = useState(false);
  useEffect(() => () => speechSynthesis?.cancel(), []);
  function speak() {
    if (reading) {
      speechSynthesis.cancel();
      setReading(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "th-TH";
    u.rate = 0.82;
    u.onend = () => setReading(false);
    u.onerror = () => setReading(false);
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    setReading(true);
  }
  return (
    <button
      className={"btn speech " + (reading ? "speaking" : "")}
      onClick={speak}
    >
      {reading ? <Square /> : <Volume2 />}
      {reading ? "หยุดอ่าน" : "ฟังคำแนะนำ"}
    </button>
  );
}
export function Toast({ text, clear }) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(clear, 2500);
    return () => clearTimeout(t);
  }, [text]);
  return text ? (
    <div className="toast" role="status">
      {text}
    </div>
  ) : null;
}
