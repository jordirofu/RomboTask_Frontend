import api from "@/lib/axios"
import { taskDetailsSchema, type Project, type Task, type TaskFormData, type TaskStatus } from "../types";


type TaskApiType = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: TaskStatus
}


export async function createTask({ formData, projectId }: Pick<TaskApiType, 'projectId' | 'formData'>) {

    const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData)
    return (data);
}

export async function getTaskById({ projectId, taskId }: Pick<TaskApiType, 'projectId' | 'taskId'>) {

    const { data } = await api(`/projects/${projectId}/tasks/${taskId}`)
    const response = taskDetailsSchema.safeParse(data)
    if (response.success) {
        return response.data
    }
}

export async function updateTask({ formData, projectId, taskId }: Pick<TaskApiType, 'formData' | 'projectId' | 'taskId'>) {

    const { data } = await api.put<string>(`/projects/${projectId}/tasks/${taskId}`, formData)
    return (data);
}

export async function updateTaskStatus({ status, projectId, taskId }: Pick<TaskApiType, 'status' | 'projectId' | 'taskId'>) {

    const { data } = await api.patch<string>(`/projects/${projectId}/tasks/${taskId}/status`, { status })
    return (data);
}

export async function deleteTask({ projectId, taskId }: Pick<TaskApiType, 'projectId' | 'taskId'>) {

    const { data } = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}`)
    return data

}