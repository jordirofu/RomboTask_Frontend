import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function LoginView() {

    const navigate = useNavigate()

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: login,
        onSuccess: () => {  
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Iniciar sesión</h1>
            <p className="text-2xl font-light text-white mt-5">
                Introduce tus credenciales para{' '}
                <span className=" text-fuchsia-500 font-bold">iniciar sesión</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Introduce tu email registrado"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Introduce tu contraseña"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/register'} className="text-center text-gray-300 font-normal"
                >¿No tienes cuenta?{' '}
                    <span className="text-fuchsia-400 font-semibold">Crear una</span></Link>
                <Link to={'/auth/reset-password'} className="text-center text-gray-300 font-normal"
                >¿Olvidaste tu contraseña?{' '}
                    <span className="text-fuchsia-400 font-semibold">Restablecer</span></Link>


            </nav>
        </>
    )
}
