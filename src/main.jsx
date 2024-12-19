import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./pages/DashboardPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Forgot from "./pages/ForgotPage.jsx";
import RegisterUser from "./pages/RegisterUserPage.jsx";
import RegisterKurir from "./pages/RegisterKurirPage.jsx";
import PermintaanSampah from "./pages/PermintaanSampah.jsx";
import DaftarPenjemputan from "./pages/DaftarPenjemputan.jsx";
import KonversiPoin from "./pages/KonversiPoin.jsx";
import JenisKategori from "./pages/JenisKategoriPage.jsx";
import Dropbox from "./pages/DropboxPage.jsx";
import "./style/index.css";
import EWastePage from './pages/E-WastePage.jsx';
import Area from './pages/AreaPage.jsx';
import HistoryPenjemputanPage from './pages/HistoryPenjemputanPage.jsx'; // Import the new page
import EditProfile from './pages/EditProfile.jsx';
import KodeOTP from "./pages/VerificationPage.jsx";
import GantiPassword from "./pages/ChangePasswordPage.jsx";

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
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/register-user",
    element: <RegisterUser />,
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
    path: "/history-penjemputan",
    element: <HistoryPenjemputanPage />,
  },
  {
    path: "/EditProfile",
    element: <EditProfile/>,
  },
  {
    path:"/KodeOTP",
    element:<KodeOTP/>,
  },
  {
    path:"/GantiPW",
    element:<GantiPassword/>,
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);