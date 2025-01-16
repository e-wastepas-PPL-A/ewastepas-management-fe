import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide2 from '../assets/login.png';
import InputName from '../components/Input/InputName';
import InputPhone from '../components/Input/InputPhone';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import FooterBar from '../components/Register/FooterBar';
import PopUpBerhasil from "../components/PopUpBerhasil";
import PopUpGagal from "../components/PopUpGagal";
import { registration, sendOtp } from "../services";
import PopUpGagal from '../components/PopUpGagal';
import PopUpBerhasil from '../components/PopUpBerhasil';


export default function PageName() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        document.title = "E-Wastepas | Register";
    }, []);

      const handleClosePopup = () => {
        setShowSuccessPopup(false);
      };

    const handleRegister = async () => {
        if (!email || !password  || !confirmPassword) {
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
            name,
            email,
            phone,
            password
        };

        setIsLoading(true);
        try {
            const response = await registration(payload);
            if (response.status === 201) {
                setSuccess("Pendaftaran berhasil! Silakan periksa email Anda untuk memverifikasi akun.");
                setEmail(email);
                setShowSuccessPopup(true);
            } else if(response.response.data.error === "Your account has not been verified") {
                sendOtp({email: email})
                window.location.href = "/register/verification?email=" + email;
                setShowSuccessPopup(true);
            } else {
                setError(response.response.data.error);
                setSuccess(null);
                setShowErrorPopup(true);
            }
        } catch (err) {
            setError("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.");
            setShowErrorPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateName = (name) => {
        return name.trim().length > 0;
    };

    const validatePhone = (phone) => {  
        const re = /^[0-9]+$/;
        return re.test(phone.trim());
    };  
    
    const validatePassword = (password) => { return validateMinLength(password) && validateUppercase(password) && validateNumber(password) && validateSpecialChar(password); };
    const validateMinLength = (password) => /.{8,}/.test(password); 
    const validateUppercase = (password) => /[A-Z]/.test(password); 
    const validateNumber = (password) => /[0-9]/.test(password); 
    const validateSpecialChar = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password); 

    const isPasswordValid = validatePassword(password);

    const isConfirmPasswordValid = password === confirmPassword;

    const isButtonDisabled = !name|| !email || !phone || !password || !confirmPassword || isLoading;

    return (
        <>
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide2} className="max-h-[90vh]" alt="Slide" />
            </div>
            <div className="text-center w-full lg:w-1/2 h-[100dvh] px-[8px]">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Registrasi Management</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Mari siapkan semuanya agar dapat mengakses akun Anda</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    
                        <div className="space-y-4 mt-4">
                        <InputName label={'Nama'} value={name} onChange={(e) => {
                                    setName(e.target.value);
                                    setNameTouched(true);
                                }}  className={`border-b ${validateName(name) ? "border-gray-300" : "border-red-500"} focus:outline-none`}
                                />
                                {nameTouched && name.trim() === '' && <span className="flex text-red-500 text-sm">Kolom Tidak Boleh Kosong</span>}
                        <InputEmail label={'Email'} value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailTouched(true);
                                }}  className={`border-b ${validateEmail(email) ? "border-gray-300" : "border-red-500"} focus:outline-none`}
                                />
                                {emailTouched && email.trim() === '' && <span className="text-red-500 text-sm flex">Kolom Tidak Boleh Kosong</span>}
                                {!validateEmail(email) && email && <span className="text-red-500 text-sm flex">Email tidak valid</span>}
                        <InputPhone label={'Nomer Handphone'} value={phone} onChange={(e) => {
                                    setPhone(e.target.value);
                                    setPhoneTouched(true);
                                }}  className={`border-b ${validatePhone(phone) ? "border-gray-300" : "border-red-500"} focus:outline-none`}
                                />
                                {phoneTouched && phone.trim() === '' && <span className="flex text-red-500 text-sm">Nomor Telpon Tidak Boleh Kosong</span>}
                                {!validatePhone(phone) && phone && <span className="text-red-500 text-sm flex">Nomor Telpon tidak valid</span>}
                        <InputPassword label={'Kata Sandi'} value={password} onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordTouched(true);
                            }}
                            className={`border-b ${
                            passwordTouched
                                ? isPasswordValid
                                ? 'border-green-500'
                                : 'border-red-500'
                                : 'border-gray-300'
                            } focus:outline-none`}/>
                            
                            {passwordTouched && (
                                    <div className="text-sm mt-2">
                                    <li
                                        className={`${
                                        validateMinLength(password) ? 'text-green-500' : 'text-red-500'
                                        } flex `}
                                    >
                                        8 Karakter, Maksimal (20 karakter) 
                                    </li>
                                    <p
                                        className={`${
                                        validateUppercase(password) ? 'text-green-500' : 'text-red-500'
                                        } flex `}
                                    >
                                        1 huruf kapital
                                    </p>
                                    <p
                                        className={`${
                                        validateNumber(password) ? 'text-green-500' : 'text-red-500'
                                        } flex `}
                                    >
                                        1 angka
                                    </p>
                                    <p
                                        className={`${
                                        validateSpecialChar(password) ? 'text-green-500' : 'text-red-500'
                                        } flex `}
                                    >
                                        1 karakter unik
                                    </p>
                                    </div>
                                )}

                        <InputPassword label={'Konfirmasi Kata Sandi'} value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordTouched(true);
                                }} className={`border-b ${
                                    confirmPasswordTouched
                                      ? isConfirmPasswordValid
                                        ? 'border-gray-300'
                                        : 'border-red-500'
                                      : 'border-gray-300'
                                  } focus:outline-none focus:ring-0 focus:border-none`}
                                />
                                {confirmPasswordTouched && confirmPassword.trim() === '' && <span className="flex text-red-500 text-sm">Kata Sandi Tidak Boleh Kosong</span>}
                                {confirmPasswordTouched && confirmPassword.trim() !== '' && !isConfirmPasswordValid && (<span className="flex text-red-500 text-sm">Kata sandi tidak cocok</span> 
                            )}

                        <div className="flex justify-between items-start pb-[10px]">
                            <InputCheck 
                                label={<span>Saya menyetujui semua <a href="#" className="text-revamp-red-700 font-[500]">Syarat</a> dan <a href="#" className="text-revamp-red-700 font-[500]">Kebijakan Privasi</a></span>} 
                                value={agreeToTerms} 
                                onChange={(e) => setAgreeToTerms(e.target.checked)} 
                            />
                        </div>
                    </div>
                    <div className="mb-[24px]">
                        <button 
                            className={`${isButtonDisabled ? 'bg-[#005B96]' : 'bg-[#005B96]'} w-full py-[8px] text-white text-[14px] font-[600] rounded-md`}
                            onClick={handleRegister}
                            disabled={isButtonDisabled}
                        >
                            {isLoading ? 'Loading...' : 'Buat Akun'}
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
        </div>
        <PopUpBerhasil
        isOpen={showSuccessPopup}
        onClose={handleClosePopup}
        title={"Akun anda berhasil di daftarkan, silahkan masuk."}
        email={email}
        navigateTo={`/register/verification?email=${email}`}
        />
        <PopUpGagal
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        />
        </>
    );
}
