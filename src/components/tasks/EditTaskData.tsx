import { Navigate, useParams, useSearchParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskApi"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

const params = useParams()
const projectId = params.projectId!
const [searchParams] = useSearchParams()
const editTaskId = searchParams.get("editTaskId")!



const { data, isError } = useQuery({
    queryKey: ['task', editTaskId],
    queryFn: () => getTaskById({
        projectId: projectId,
        taskId: editTaskId
    }),
    enabled: !!editTaskId,
    retry: false

})
  if(isError) return <Navigate to={'/404'} />
  if(data) return <EditTaskModal data={data} projectId={projectId} taskId={editTaskId} />

}
