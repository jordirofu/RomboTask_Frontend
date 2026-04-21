import { dashboardProjectSchema, projectSchema, type Project, type ProjectFormData } from "@/types/index";
import api from "@/lib/axios";



export async function createProject(formData: ProjectFormData) {

    const { data } = await api.post<string>('/projects', formData)
    return data;
}

export async function getProjects() {

    const { data } = await api('/projects')

    const response = dashboardProjectSchema.safeParse(data)
    if (response.success) {
        return response.data
    }
}

export async function getProjectbyId(projectId: Project['_id']) {

    const { data } = await api.get(`/projects/${projectId}`)
    const response = projectSchema.safeParse(data)
    if (response.success) {
        return response.data
    }
}

type UpdateProjectPropsType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export async function updateProject({ formData, projectId }: UpdateProjectPropsType) {

    const { data } = await api.put<string>(`/projects/${projectId}`, formData)
    return data
}

export async function deleteProject(projectId: Project['_id']) {

    const { data } = await api.delete<string>(`/projects/${projectId}`)
    return data
}


