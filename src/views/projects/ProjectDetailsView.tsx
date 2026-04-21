import { getProjectbyId } from "@/api/ProjectApi"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"
import Loading from "@/components/Loading"


export default function ProjectDetailsView() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data: userData, isLoading: isUserDataLoading } = useAuth() //añadimos esto para gestionar lo que no ve el colaborador

    const { data, isLoading, isError } = useQuery(
        {
            queryFn: () => getProjectbyId(projectId),
            queryKey: ['projectDetails', projectId]
        }
    )

    const isCollaborator = useMemo(()=> data?.manager.toString() !== userData?._id.toString(), [data, userData])

    if (isLoading || isUserDataLoading) return (<Loading />)
    if (isError) return <Navigate to='/404' />
    if (data && userData) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            {isManager(data.manager, userData._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate('?newTask=true')}
                    >Añadir tarea
                    </button>
                    <Link
                        className="bg-fuchsia-600 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to={'team'} 
                    >Colaboradores</Link>

                </nav>
            )}

            <TaskList
                tasks={data.tasks} isCollaborator={isCollaborator} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
