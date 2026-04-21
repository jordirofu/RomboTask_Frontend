import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

type EditProjectProps = {
    data: ProjectFormData
}

export default function EditProjectForm({ data }: EditProjectProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data });

    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => { //lo que devuelve la función si hay error
            toast.error(error.message)
        },
        onSuccess: (data) => { //data es lo que devuelve la función si no hay error
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data);
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Completa el siguiente formulario para editar el proyecto</p>

                <nav className="my-5">
                    <Link to="/" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-sl font-bold cursor-pointer transition-colors">
                        Volver a proyectos</Link>
                </nav>

                <form
                    noValidate 
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-xl text-white font-bold cursor-pointer transition-colors"
                        type="submit"
                        value='Guardar cambios'
                    />


                </form>
            </div>
        </>
    )
}
