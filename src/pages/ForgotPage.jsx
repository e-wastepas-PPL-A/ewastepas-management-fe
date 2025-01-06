import { useEffect, useState } from "react";
import Logo from '../assets/logo.png'
import Slide1 from '../assets/lupaPassword.png'
import InputEmail from '../components/Input/InputEmail'
import FooterBar from '../components/Register/FooterBar'
import { changePassword, forgotpassword, verifyForgotPasswordOtp } from "../services";

export default function PageName() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); 

    useEffect(()=>{
        document.title = "E-Wastepas | Login"
    }, [])

    const handleSend = async () => {
        const payload = {
            email,
        };

        try {
            const response = await forgotpassword(payload);
            if (response.status === 200 && response.data.token) {
                setSuccess("OTP send successfully!");
                setError(null);
                localStorage.setItem('resetPasswordToken', response.data.token);
                window.location.href = "/forgot-password/verification?email=" + email;
            } else {
                setError("OTP verification failed. Please try again.");
                setSuccess(null);
            }
        } catch {
            setError("An error occurred during OTP verification. Please try again.");
            setSuccess(null);
        }
    };

    const isButtonDisabled = !email;

    return (
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide1} className="max-h-[90vh]" />
            </div>
            <div className="text-center w-full lg:w-1/2 px-[8px]">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Lupa kata sandi?</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Jangan khawatir, ini bisa terjadi pada siapa saja. Masukkan email Anda di bawah ini untuk memulihkan kata sandi Anda.</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    <div className="mb-[24px]">
                        <InputEmail label={'Email'} value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className="mb-[24px]">
                    <button
                        className={`${isButtonDisabled ? 'bg-[#005B96]' : 'bg-[#005B96]'} w-full py-[8px] text-white text-[14px] font-[600] rounded-md`}
                        onClick={handleSend}
                        disabled={!email} > Kirim
                    </button>

                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">Tidak memiliki akun? <a href="/register" className="text-revamp-error-300">Registrasi</a></span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
    );
  }
  