import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import ToastProvider from "./components/ui/Toast";
import RequireAcceso from "./components/layout/RequireAcceso";
import AppLayout from "./components/layout/AppLayout";
import AccesoPage from "./pages/AccesoPage";
import InicioPage from "./pages/InicioPage";
import ArtistasPage from "./pages/ArtistasPage";
import ArtistaDetailPage from "./pages/ArtistaDetailPage";
import ArtistaGeneralTab from "./pages/artista-tabs/ArtistaGeneralTab";
import ArtistaDocumentosTab from "./pages/artista-tabs/ArtistaDocumentosTab";
import ArtistaEventosTab from "./pages/artista-tabs/ArtistaEventosTab";
import ArtistaPreciosTab from "./pages/artista-tabs/ArtistaPreciosTab";
import AgendaPage from "./pages/AgendaPage";
import EventoDetailPage from "./pages/EventoDetailPage";
import FacturasPage from "./pages/FacturasPage";
import FacturaDetailPage from "./pages/FacturaDetailPage";
import ResumenCategoriasPage from "./pages/ResumenCategoriasPage";
import AliadosPage from "./pages/AliadosPage";
import ConfiguracionPage from "./pages/ConfiguracionPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/acceso" element={<AccesoPage />} />

          <Route
            element={
              <RequireAcceso>
                <AppLayout />
              </RequireAcceso>
            }
          >
            <Route path="/" element={<InicioPage />} />

            <Route path="/artistas" element={<ArtistasPage />} />
            <Route path="/artistas/:artistaId" element={<ArtistaDetailPage />}>
              <Route index element={<Navigate to="general" replace />} />
              <Route path="general" element={<ArtistaGeneralTab />} />
              <Route path="documentos" element={<ArtistaDocumentosTab />} />
              <Route path="eventos" element={<ArtistaEventosTab />} />
              <Route path="precios" element={<ArtistaPreciosTab />} />
            </Route>

            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/eventos/:eventoId" element={<EventoDetailPage />} />

            {/* "resumen" antes que ":facturaId" para evitar colisión */}
            <Route path="/facturacion" element={<FacturasPage />} />
            <Route path="/facturacion/resumen" element={<ResumenCategoriasPage />} />
            <Route path="/facturacion/:facturaId" element={<FacturaDetailPage />} />

            <Route path="/aliados" element={<AliadosPage />} />

            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
