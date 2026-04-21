import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import type { NoteFormData } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/api/NoteApi'
import { toast } from 'react-toastify'
import { useParams, useSearchParams } from 'react-router-dom'

export default function AddNoteForm() {

    const params = useParams()
    const projectId = params.projectId!
    const [searchParams] = useSearchParams()
    const taskId = searchParams.get("viewTaskId")!
    const queryClient = useQueryClient() 

    const initialValues = {
        content: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })



    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            toast.success(data)
            reset(),
            queryClient.invalidateQueries({queryKey: ['viewTask', taskId]})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ projectId, taskId, formData })
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3 mt-7">
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">Añadir nota</label>
                <input
                    type="text"
                    id="content"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                    {...register('content', {
                        required: 'El contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </div>
            <input
                type="submit"
                value="Crear nota"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-xl text-white font-bold cursor-pointer"
            />
        </form>
    )
}
