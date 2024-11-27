import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import Dashboard from './pages/DashboardPage.jsx';
import EWastePage from './pages/E-WastePage.jsx';
import Register from './pages/RegisterPage.jsx';
import RegisterKurir from './pages/RegisterKurirPage.jsx';
import PermintaanSampah from './pages/PermintaanSampah.jsx';
import DaftarPenjemputan from './pages/DaftarPenjemputan.jsx';
import KonversiPoin from './pages/KonversiPoin.jsx';
import JenisKategori from './pages/JenisKategoriPage.jsx';
import Dropbox from './pages/DropboxPage.jsx';
import Area from './pages/AreaPage.jsx';
import HistoryPenjemputanPage from './pages/HistoryPenjemputanPage.jsx'; // Import the new page
import './style/index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/E-WastePage",
    element: <EWastePage />,
  },
  {
    path: "/test",
    element: <App />,
  },
  {
    path: "/register-masyarakat",
    element: <Register />,
  },
  {
    path: "/register-kurir",
    element: <RegisterKurir />,
  },
  {
    path: "/permintaan-sampah",
    element: <PermintaanSampah />,
  },
  {
    path: "/daftar-penjemputan",
    element: <DaftarPenjemputan />,
  },
  {
    path: "/konversi-poin",
    element: <KonversiPoin />,
  },
  {
    path: "/jenis-kategori",
    element: <JenisKategori />,
  },
  {
    path: "/dropbox",
    element: <Dropbox />,
  },
  {
    path: "/AreaPage",
    element: <Area />,
  },
  {
    path: "/history-penjemputan", // New path for History Penjemputan
    element: <HistoryPenjemputanPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
