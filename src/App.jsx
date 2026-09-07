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

export default function App() {
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("elderlink-favorites") || "[]"),
  );
  const [settings, setSettings] = useState(() =>
    JSON.parse(
      localStorage.getItem("elderlink-settings") ||
        '{"font":"normal","contrast":false}',
    ),
  );
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
    speechSynthesis?.cancel();
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
