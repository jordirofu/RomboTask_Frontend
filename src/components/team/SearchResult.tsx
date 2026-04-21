import { addMemberToProject } from "@/api/TeamApi";
import type { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember
    resetData: () => void
}

export default function SearchResult({ user, resetData }: SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const location = useLocation()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addMemberToProject,
        onSuccess: (data) => {
            toast.success(data),
            resetData(),
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]}),
            navigate(location.pathname, {replace: true})
        },
        onError: (error) => {
            toast.error(error.message)
        } 
    })
    
    const handleButtonClick = () => {
        mutate({projectId, id: user._id})
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleButtonClick}
                >Añadir al proyecto</button>
            </div>
        </>
    )
}
