import api from "@/lib/axios"
import type { UpdatePasswordForm, UserProfileForm } from "../types";


export async function updateProfile(formData: UserProfileForm) {
        const { data } = await api.put<string>('/auth/profile', formData)
        return data
}

export async function updatePassword(formData: UpdatePasswordForm) {
        const { data } = await api.put<string>('/auth/update-password', formData)
        return data
}