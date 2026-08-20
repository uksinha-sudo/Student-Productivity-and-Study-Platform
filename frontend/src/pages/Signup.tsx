import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useRef, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from '../config'
import { Bounce, ToastContainer, toast } from 'react-toastify';


export const SignUp = () => {

    const [loading, setLoading] = useState(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const signUp = async () => {
        setLoading(true);
        const username = usernameRef.current?.value?.trim() ?? "";
        const email = emailRef.current?.value?.trim() ?? "";
        const password = passwordRef.current?.value?.trim() ?? "";

        if(!username || !email || !password) {
            toast("All fields are Required, Please fill them out.");
            return;
        }

        if(password.length < 6){
            toast("Password too small, Minimum 6 letters are required.");
            return;
        }

        try {

            const response = await axios.post(`${BACKEND_URL}/user/signup`, {
                username,
                email,
                password
            });
            toast(response.data.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, draggable: true, pauseOnHover: true, theme: "light", transition: Bounce });
        } catch (error) {
            // 1. Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // TypeScript now knows 'error' has response and message properties
                const serverMessage = error.response?.data?.message || error.message;
                toast(`${serverMessage}`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, draggable: true, pauseOnHover: true, theme: "light", transition: Bounce });
            } else {
                // 2. Handle non-Axios / generic JavaScript errors
                const genericError = error instanceof Error ? error.message : "An unexpected error occurred";
                toast(genericError, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, draggable: true, pauseOnHover: true, theme: "light", transition: Bounce });
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="bg-[#cadcea] h-screen flex items-center justify-center">
                <div className="bg-[#d1e4f3] shadow-2xl rounded-2xl h-[60vh] w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw] flex flex-col">
                    <div className="flex justify-center font-bold text-[#1A3F75] mt-5">
                        <p className="text-3xl">Sign Up</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input reference={usernameRef} lable="Username" placeholder="John Doe" styles="p-2 bg-[#cadcea]" type="text" />
                        <Input reference={emailRef} lable="Email" placeholder="John@example.com" styles="p-2 bg-[#cadcea]" type="email" />
                        <Input reference={passwordRef} lable="Password" styles="p-2 bg-[#cadcea]" type="password" />
                    </div>
                    <div className="flex h-20 items-center justify-center">
                        <Button lable="SUBMIT" style="p-2 px-4 rounded" disable={loading === true ? true : false} onClick={signUp} />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
}