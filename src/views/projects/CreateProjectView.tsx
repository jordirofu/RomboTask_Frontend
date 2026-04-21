import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectApi"
import { toast } from "react-toastify"


export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({ 
        mutationFn: createProject, 
        onError: (error) => { 
            toast.error(error.message)
        },
        onSuccess: (data: string) => { 
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => mutate(formData) 

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Completa el siguiente formulario para crear un proyecto</p>

                <nav className="my-5">
                    <Link to="/" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-sl font-bold cursor-pointer transition-colors">
                        Volver a proyectos</Link>
                </nav>

                <form
                    noValidate //para que deshabilite validación de html5
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        type="submit"
                        value='Crear proyecto'
                    />


                </form>
            </div>
        </>
    )
}
