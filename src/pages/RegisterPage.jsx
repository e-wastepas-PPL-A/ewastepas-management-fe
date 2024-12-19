import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import GLogin from '../assets/glogin.png';
import InputCheck from '../components/Input/InputCheck';
import InputText from '../components/Input/InputText';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import FooterBar from '../components/Register/FooterBar';
import { registration, sendOtp } from "../services";
import PopUpGagal from '../components/PopUpGagal';
import PopUpBerhasil from '../components/PopUpBerhasil';


export default function PageName() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        document.title = "E-Wastepas | Register";
    }, []);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError("Kolom Tidak Boleh Kosong");
            setShowErrorPopup(true);
            return;
        }
        if (!validateEmail(email)) {
            setError("Email Tidak Valid");
            setShowErrorPopup(true);
            return;
        }
        if (password !== confirmPassword) {
            setError("Kata Sandi Tidak Cocok");
            setShowErrorPopup(true);
            return;
        }
        if (!agreeToTerms) {
            setError("Anda harus menyetujui syarat dan ketentuan");
            setShowErrorPopup(true);
            return;
        }

        const payload = {
            email,
            password,
            confirm_password: confirmPassword
        };

        setIsLoading(true);

        try {
            const response = await registration(payload);
            if (response.status === 201) {
                setSuccess("Pendaftaran berhasil! Silakan periksa email Anda untuk memverifikasi akun.");
                setShowSuccessPopup(true);
                setError(null);
            } else if (response.response.data.error === "Your account has not been verified") {
                await sendOtp({ email });
                setSuccess("Email verifikasi telah dikirim. Silakan periksa email Anda.");
                setShowSuccessPopup(true);
            } else {
                setError(response.response.data.error);
                setShowErrorPopup(true);
            }
        } catch {
            setError("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.");
            setShowErrorPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk memvalidasi email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Fungsi untuk memvalidasi nama
    const validateName = (name) => {
        return name.trim().length > 0; // Memastikan nama tidak kosong
    };

    return (
        <>
            {/* PopUp untuk menampilkan error */}
            <PopUpGagal isOpen={showErrorPopup} message={error} onClose={() => { setShowErrorPopup(false); setError(null); }} />
            {/* PopUp untuk menampilkan success */}
            <PopUpBerhasil isOpen={showSuccessPopup} message={success} onClose={() => { setShowSuccessPopup(false); setSuccess(null); }} />
            <div className="h-[100dvh] flex flex-col lg:flex-row justify-between items-center">
                {/* Bagian Gambar Kiri */}
                <div className="w-full lg:w-1/2 flex justify-center p-4">
                    <img src={GLogin} alt="Illustrasi" className="max-w-[90%] h-auto" />
                </div>

                {/* Formulir Pendaftaran */}
                <div className="w-full lg:w-1/2 px-6 lg:px-16 py-4">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <img src={Logo} alt="Logo E-Wastepas" className="w-60" />
                    </div>

                    {/* Judul */}
                    <h1 className="text-3xl font-semibold text-center mb-2">Register Untuk Menjadi Manajemen Sampah</h1>

                    {/* Input */}
                    <div className="space-y-4 mt-4">
                        <div className="flex flex-col">
                            <InputText
                                label="Nama Lengkap"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameTouched(true);
                                }}
                                className={`border-b ${validateName(name) ? "border-gray-300" : "border-red-500"} focus:outline-none`}
                            />
                            {nameTouched && name.trim() === '' && <span className="text-red-500 text-sm">Kolom Tidak Boleh Kosong</span>}
                        </div>
                        <div className="flex flex-col">
                            <InputEmail
                                label="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailTouched(true);
                                }}
                                className={`border-b ${validateEmail(email) ? "border-gray-300" : "border-red-500"} focus:outline-none`}
                            />
                            {emailTouched && email.trim() === '' && <span className="text-red-500 text-sm">Kolom Tidak Boleh Kosong</span>}
                            {!validateEmail(email) && email && <span className="text-red-500 text-sm">Email tidak valid</span>}
                        </div>

                        <div className="flex flex-col">
                            <InputPassword
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordTouched(true);
                                }}
                                className={`border-b ${password.length >= 8 ? "border-gray-300" : "border-red-500"} focus:outline-none`}
                            />
                            {passwordTouched && password.trim() === '' && <span className="text-red-500 text-sm">Kolom Tidak Boleh Kosong</span>}
                        </div>

                        <div className="text-sm mt-4">
                        <p className="font-medium">Kata Sandi Anda Setidaknya harus memiliki:</p>
                        <ul className="list-disc ml-5 mt-1 text-gray-600">
                            <li className={password.length >= 8 ? "text-green-500" : "text-red-500"}>
                                8 Karakter Maksimal (20 Karakter)
                            </li>
                            <li className={/[A-Z]/.test(password) ? "text-green-500" : "text-red-500"}>
                                1 Huruf Kapital
                            </li>
                            <li className={/\d/.test(password) ? "text-green-500" : "text-red-500"}>
                                1 Angka
                            </li>
                            <li className={/[!@#$%^&*]/.test(password) ? "text-green-500" : "text-red-500"}>
                                1 Karakter Unik seperti (* # $ @ ! ?)
                            </li>
                        </ul>
                    </div>

                        <div className="flex flex-col">
                            <InputPassword
                                label="Konfirmasi Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordTouched(true);
                                }}
                                className={`border-b ${password === confirmPassword ? "border-gray-300" : "border-red-500"} focus:outline-none`}
                            />
                            {confirmPasswordTouched && confirmPassword.trim() === '' && <span className="text-red-500 text-sm">Kolom Tidak Boleh Kosong</span>}
                            {password !== confirmPassword && <span className="text-red-500 text-sm">Kata Sandi Tidak Cocok</span>}
                        </div>
                    </div>

                    {/* Checkbox dan Tombol */}
                    <div className="flex items-center space-x-2 mt-4">
                        <InputCheck
                            label={
                                <span>
                                    Saya menyetujui semua{" "}
                                    <a href="#" className="text-blue-600 font-medium">
                                        Syarat
                                    </a>{" "}
                                    dan{" "}
                                    <a href="#" className="text-blue-600 font-medium">
                                        Kebijakan Privasi
                                    </a>
                                </span>
                            }
                            value={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
                            onClick={handleRegister}
                        >
                            Daftar
                        </button>
                    </div>

                    {/* Sudah Punya Akun */}
                    <div className="text-center mt-4 text-sm">
                        <span>
                            Sudah Memiliki Akun?{" "}
                            <a href="/login" className="text-blue-600 font-semibold">
                                Masuk Disini
                            </a>
                        </span>
                    </div>
                    <br/>
                    <div>
                        <FooterBar/>
                    </div>
                </div>
            </div>
        </>
    );
}
