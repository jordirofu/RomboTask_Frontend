import api from "@/lib/axios"
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "@/types/index"


export async function findUserByEmail({ projectId, formData }: { projectId: Project['_id'], formData: TeamMemberForm }) {

    const { data } = await api.post(`/projects/${projectId}/team/find`, formData) 
    return data
}

export async function addMemberToProject({ projectId, id }: { projectId: Project['_id'], id: TeamMember['_id'] }) {

    const { data } = await api.post(`/projects/${projectId}/team`, { id })
    return data
}

export async function getProjectTeam(projectId: Project['_id']) {
    const { data } = await api(`/projects/${projectId}/team/find-all`)
    const response = teamMembersSchema.safeParse(data)
    if (response.success) {

        return response.data
    }
}

export async function removeMemberFromProject({ projectId, memberId }: { projectId: Project['_id'], memberId: TeamMember['_id'] }) {

    const { data } = await api.delete<string>(`/projects/${projectId}/team/${memberId}`)
    return data
}