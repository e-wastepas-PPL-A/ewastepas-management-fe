import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide2 from '../assets/forgot.png';
import InputPassword from '../components/Input/InputPassword';
import { changePassword } from "../services";

export default function PageName() {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "E-Wastepas | Reset Password";
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
    }, []);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Kata sandi tidak cocok!");
            return;
        }
        setIsLoading(true);

        try {
            const response = await changePassword({ new_password: password, confirm_new_password: confirmPassword }, token);
            if (response.status === 200) {
                alert("Kata sandi berhasil diubah!");
                window.location.href = "/login";
            } else {
                alert("Gagal memperbarui kata sandi");
            }
        } catch {
            alert("Terjadi kesalahan, silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            {/* Container Utama */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl ">
                {/* Bagian Gambar */}
                <div className="hidden md:block w-1/2">
                    <img src={Slide2} alt="Forgot Password" className="w-3/4 h-auto object-cover" />
                </div>

                {/* Bagian Form */}
                <div className="w-full md:w-1/2 px-12 py-16">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <img src={Logo} alt="Logo" className="mx-auto w-52 mb-2" />
                        <h2 className="text-3xl font-bold mt-2 text-gray-800">Atur Ulang Kata Sandi</h2>
                    </div>

                    {/* Input Kata Sandi */}
                    <div className="mb-6">
                        <InputPassword
                            label="Kata Sandi Baru"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Input Konfirmasi Kata Sandi */}
                    <div className="mb-6">
                        <InputPassword
                            label="Konfirmasi Kata Sandi"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {password !== confirmPassword && confirmPassword && (
                            <span className="text-red-500 text-sm">Kata sandi tidak cocok</span>
                        )}
                    </div>

                    {/* Tombol Submit */}
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold transition duration-200"
                        onClick={handleRegister}
                        disabled={isLoading || !password || !confirmPassword}
                    >
                        {isLoading ? "Memproses..." : "Kirim"}
                    </button>
                </div>
            </div>
        </div>
    );
}
