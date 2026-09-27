import { useEffect, useRef, useState } from "react";
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
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector("button")?.focus();
    document.body.classList.add("dialog-open");

    return () => {
      document.body.classList.remove("dialog-open");
      previousFocusRef.current?.focus();
    };
  }, []);

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = panelRef.current?.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), a[href]',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <section
        ref={panelRef}
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onKeyDown={handleKeyDown}
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
                aria-pressed={settings.font === v}
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

export function TutorialMedia({ step, accent, StepIcon, stepNumber }) {
  const hasMedia = Boolean(step.image || step.video);

  return (
    <div
      className={`step-visual${hasMedia ? " has-media" : ""}`}
      style={{ "--accent": accent }}
    >
      {step.video ? (
        <figure className="tutorial-step-figure">
          <video
            className="tutorial-step-video"
            controls
            playsInline
            preload="metadata"
            poster={step.videoPoster}
            aria-label={step.videoCaption || `วิดีโอประกอบ ${step.title}`}
          >
            <source src={step.video} type="video/mp4" />
            เบราว์เซอร์นี้ไม่สามารถเปิดวิดีโอได้ กรุณาอ่านคำอธิบายด้านล่าง
          </video>
          {step.videoCaption && (
            <figcaption className="tutorial-step-caption">
              {step.videoCaption}
            </figcaption>
          )}
        </figure>
      ) : step.image ? (
        <figure className="tutorial-step-figure">
          <a
            className="tutorial-step-image-link"
            href={step.image}
            target="_blank"
            rel="noreferrer"
            aria-label={`เปิดภาพขนาดใหญ่: ${step.imageAlt}`}
          >
            <img
              className="tutorial-step-image"
              src={step.image}
              alt={step.imageAlt}
              loading="eager"
              decoding="async"
            />
          </a>
          {step.imageCaption && (
            <figcaption className="tutorial-step-caption">
              {step.imageCaption} · แตะภาพเพื่อดูขนาดใหญ่
            </figcaption>
          )}
        </figure>
      ) : (
        <div className="mock-phone">
          <span>{stepNumber}</span>
          <StepIcon />
        </div>
      )}
    </div>
  );
}

export function SpeechButton({ text }) {
  const [reading, setReading] = useState(false);
  const synthesis = window.speechSynthesis;
  const supported = Boolean(synthesis && window.SpeechSynthesisUtterance);
  useEffect(
    () => () => {
      synthesis?.cancel();
    },
    [synthesis],
  );
  function speak() {
    if (!supported) return;
    if (reading) {
      synthesis.cancel();
      setReading(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "th-TH";
    u.rate = 0.82;
    u.onend = () => setReading(false);
    u.onerror = () => setReading(false);
    synthesis.cancel();
    synthesis.speak(u);
    setReading(true);
  }
  return (
    <button
      className={"btn speech " + (reading ? "speaking" : "")}
      onClick={speak}
      disabled={!supported}
      aria-pressed={reading}
      aria-live="polite"
    >
      {reading ? <Square /> : <Volume2 />}
      {reading
        ? "หยุดอ่าน"
        : supported
          ? "ฟังคำแนะนำ"
          : "เบราว์เซอร์นี้ไม่รองรับเสียงอ่าน"}
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
