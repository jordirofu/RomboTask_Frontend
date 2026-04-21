import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import type { TeamMemberForm } from "@/types/index"
import { findUserByEmail } from "@/api/TeamApi"
import SearchResult from "./SearchResult"
import Loading from "@/components/Loading"


export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        mutation.mutate({ projectId, formData })
    }

    const resetData = () => {
        reset(), //limpia el formulario
        mutation.reset() //limpia el contenido que tiene mutation de la última mutation ejecutada
    }

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >Email de usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Email del usuario a añadir"
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

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar usuario'
                />
            </form>
            <div className="mt-10">
                {mutation.isPending && (<Loading />)}
                {mutation.error && <p className="text-center">{mutation.error.message}</p> }
                {mutation.data && <SearchResult user={mutation.data} resetData={resetData} />}
            </div>
        </>
    )
}