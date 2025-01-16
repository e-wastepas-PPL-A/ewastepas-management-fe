import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide2 from '../assets/changePassword.png';
import InputPassword from '../components/Input/InputPassword';
import FooterBar from '../components/Register/FooterBar';
import { changePassword } from "../services";
import PopUpGagal from "../components/PopUpGagal";
import PopUpBerhasil from "../components/PopUpBerhasil";

export default function PageName() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        document.title = "E-Wastepas | Change Password";
    }, []);

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
    };

    const handlePasswordChange = async () => {
        if (password !== passwordConfirm) {
            setError("Kata sandi dan konfirmasi kata sandi tidak cocok.");
            setShowErrorPopup(() => (true, 1500));
            return;
        }

        const payload = {
            password: password,
            password_confirmation: passwordConfirm,
        };

        const token = localStorage.getItem('resetPasswordToken');
        if (!token) {
            setError("Token tidak ditemukan. Silakan coba lagi.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await changePassword(payload, token);
            if (response.status === 200) {
                setSuccess("Kata sandi berhasil diubah!");
                setError(null);
                setShowSuccessPopup(() => (true, 1500));
                // setTimeout(() => (window.location.href = "/login"), 1500);
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Terjadi kesalahan saat mengubah kata sandi.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const validatePassword = (password) =>
        validateMinLength(password) &&
        validateUppercase(password) &&
        validateNumber(password) &&
        validateSpecialChar(password);

    const validateMinLength = (password) => /.{8,}/.test(password);
    const validateUppercase = (password) => /[A-Z]/.test(password);
    const validateNumber = (password) => /[0-9]/.test(password);
    const validateSpecialChar = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = password === passwordConfirm;
    const isButtonDisabled = !isPasswordValid || !isConfirmPasswordValid || isLoading;

    return (
        <>
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide2} className="max-h-[90vh]" alt="Slide" />
            </div>
            <div className="text-center w-full lg:w-1/2">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Ubah Kata Sandi</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">
                            Kata sandi Anda yang sebelumnya telah direset. Silakan tetapkan kata sandi baru untuk akun Anda.
                        </span>
                    </div>
                    {error && (
                        <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">
                            {success}
                        </div>
                    )}
                    <div className="mb-[24px]">
                        <InputPassword
                            label="Kata Sandi"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordTouched(true);
                            }}
                            className={`border-b ${
                                passwordTouched
                                    ? isPasswordValid
                                        ? "border-green-500"
                                        : "border-red-500"
                                    : "border-gray-300"
                            } focus:outline-none`}
                        />
                        {passwordTouched && (
                            <div className="text-sm mt-2 mb-5">
                                <p className={`${validateMinLength(password) ? "text-green-500" : "text-red-500" } flex`}>
                                    Minimal 8 karakter
                                </p>
                                <p className={`${validateUppercase(password) ? "text-green-500" : "text-red-500"} flex`}>
                                    Minimal 1 huruf kapital
                                </p>
                                <p className={`${validateNumber(password) ? "text-green-500" : "text-red-500"} flex`}>
                                    Minimal 1 angka
                                </p>
                                <p className={`${validateSpecialChar(password) ? "text-green-500" : "text-red-500"} flex`}>
                                    Minimal 1 karakter unik
                                </p>
                            </div>
                        )}
                        <InputPassword
                            label="Konfirmasi Kata Sandi"
                            value={passwordConfirm}
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                                setConfirmPasswordTouched(true);
                            }}
                            className={`border-b ${
                                confirmPasswordTouched
                                    ? isConfirmPasswordValid
                                        ? "border-green-500"
                                        : "border-red-500"
                                    : "border-gray-300"
                            } focus:outline-none`}
                        />
                        {confirmPasswordTouched && passwordConfirm.trim() === "" && (
                            <span className="flex text-red-500 text-sm">Konfirmasi kata sandi tidak boleh kosong</span>
                        )}
                        {confirmPasswordTouched && !isConfirmPasswordValid && (
                            <span className="flex text-red-500 text-sm">Kata sandi tidak cocok</span>
                        )}
                    </div>
                    <div className="mb-[24px]">
                        <button
                            className={`${
                                isButtonDisabled ? 'bg-[#005B96]' : 'bg-[#005B96]'
                            } w-full py-[8px] text-white text-[14px] font-[600] rounded-md`}
                            onClick={handlePasswordChange}
                        >
                            {isLoading ? "Loading..." : "Ubah Kata Sandi"}
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">
                                Anda sudah memiliki akun?{" "}
                                <a href="/login" className="text-revamp-error-300">
                                    Login
                                </a>
                            </span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
        <PopUpBerhasil 
            isOpen={showSuccessPopup} 
            onClose={handleClosePopup} 
            title={"Kata sandi berhasil diubah!"} 
            navigateTo={"/login"} 
            />
        <PopUpGagal isOpen={showErrorPopup} onClose={() => setShowErrorPopup(false)} />
        </>
    );
}