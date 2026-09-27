import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { services } from "./data/services";
import { Layout, Toast } from "./components";
import {
  Home,
  Services,
  ServiceDetail,
  Tutorial,
  Emergency,
  Favorites,
  HowTo,
} from "./pages";

function readStoredValue(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = readStoredValue("elderlink-favorites", []);
    return Array.isArray(stored) ? stored : [];
  });
  const [settings, setSettings] = useState(() => {
    const stored = readStoredValue("elderlink-settings", {
      font: "normal",
      contrast: false,
    });
    return {
      font: ["normal", "large", "xlarge"].includes(stored?.font)
        ? stored.font
        : "normal",
      contrast: Boolean(stored?.contrast),
    };
  });
  const [toast, setToast] = useState("");
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("elderlink-favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("elderlink-settings", JSON.stringify(settings));
    document.documentElement.dataset.font = settings.font;
    document.documentElement.dataset.contrast = settings.contrast
      ? "on"
      : "off";
  }, [settings]);
  useEffect(() => {
    window.scrollTo(0, 0);
    window.speechSynthesis?.cancel();
  }, [location.pathname]);
  const toggleFavorite = (id) => {
    setFavorites((x) =>
      x.includes(id) ? x.filter((v) => v !== id) : [...x, id],
    );
    setToast(
      favorites.includes(id)
        ? "นำออกจากรายการโปรดแล้ว"
        : "เพิ่มในรายการโปรดแล้ว",
    );
  };
  const shared = { favorites, toggleFavorite, settings, setSettings };
  return (
    <Layout {...shared}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail {...shared} />} />
        <Route
          path="/tutorial/:serviceId/:guideId"
          element={<Tutorial {...shared} />}
        />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/favorites" element={<Favorites {...shared} />} />
        <Route path="/how-to" element={<HowTo />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toast text={toast} clear={() => setToast("")} />
    </Layout>
  );
}
