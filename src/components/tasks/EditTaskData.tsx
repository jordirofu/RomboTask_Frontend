import { Navigate, useParams, useSearchParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskApi"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

const params = useParams()
const projectId = params.projectId!
const [searchParams] = useSearchParams()
const editTaskId = searchParams.get("editTaskId")!


//Cuando se renderiza ProjectDetailsView, que contiene EditTaskData. Si en la url hay "taskId",
//se renderiza EditTaskData... si no, no... gracias a "enebled"
const { data, isError } = useQuery({
    queryKey: ['task', editTaskId],
    queryFn: () => getTaskById({
        projectId: projectId,
        taskId: editTaskId
    }),
    enabled: !!editTaskId, //enabled: para determinar cuándo ha de ejecutarse la query o cuando no.
    retry: false//!! si es un valor truthy, devuelve true"; si es un valor falsy, devuelve false.

})
  if(isError) return <Navigate to={'/404'} />
  if(data) return <EditTaskModal data={data} projectId={projectId} taskId={editTaskId} />

}
