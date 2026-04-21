import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { isNoteCreator } from "@/utils/policies"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useParams, useSearchParams } from "react-router-dom"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const { data, isLoading } = useAuth()
    const params = useParams()
    const [searchParams] = useSearchParams()
    const projectId = params.projectId!
    const taskId = searchParams.get("viewTaskId")!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            toast.success(data),
            queryClient.invalidateQueries({queryKey: ['viewTask', taskId]})
        },
        onError: (error) => {
            toast.error(error.message)
        }

    })

    const handleDeleteButtonClick = () => {
        mutate({projectId, taskId, noteId: note._id})
    }


    if (isLoading) return 'Cargando...'

    return (
        <div className="pl-5 pb-2 flex justify-between items-center ">
            <div>
                <p>
                    {note.content}
                </p>
                <p className="text-xs text-slate-500">
                    <span className="font-bold">{note.createdBy.name}</span>, {formatDate(note.createdAt)}
                </p>
            </div>
            {  isNoteCreator(data!._id, note.createdBy._id) && (
                <button
                type="button"
                className="text-red-700 hover:text-red-500 p-2 text-xs font-bold cursor-pointer transition-colors"
                onClick={handleDeleteButtonClick}>Eliminar</button> 
            )}
        </div>
    )
}
