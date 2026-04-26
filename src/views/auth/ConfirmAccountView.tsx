import { Link, useNavigate } from "react-router-dom"
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react"
import type { ConfirmToken } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { confirmAccount } from "@/api/AuthApi"
import { toast } from "react-toastify"

export default function ConfirmAccountView() {

    const navigate = useNavigate()

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const handlePinInputChange = (token: ConfirmToken['token']) => { 
        setToken(token)
    }

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onSuccess: (data) => {
            toast.success(data),
                navigate('/auth/login')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handlePinInputComplete = (token: ConfirmToken['token']) => {
        mutate(token)
    }


    return (
        <>
            <h1 className="text-2xl md:text-5xl font-black text-white">Confirma tu cuenta</h1>
            <p className="text-xl md:text-2xl font-light text-white mt-5">
                Introduce el <span className=" text-fuchsia-500 font-bold">código</span> que has recibido {''}
                por email
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-3 md:gap-5">
                    <PinInput value={token} onChange={handlePinInputChange} onComplete={handlePinInputComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>

            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar <span className="text-fuchsia-400 font-semibold">un nuevo código</span>
                </Link>
            </nav>

        </>
    )
}
