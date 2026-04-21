import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getProjectbyId } from "@/api/ProjectApi"
import EditProjectForm from "@/components/projects/EditProjectForm"
import Loading from "@/components/Loading"



export default function EditProjectView() {

const params = useParams()
const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId], 
        queryFn: () => getProjectbyId(projectId), 
        retry: false
    })

   if (isLoading) return (<Loading />)
   if (isError) return <Navigate to='/404'/> 
   if (data) return <EditProjectForm data={data} />

}
