
import api from "@/lib/axios"
import type { ConfirmToken, UserRegistrationForm, RequestConfirmationCodeForm, UserLoginForm, ResetPasswordForm, NewPasswordForm, DeleteCheckPasswordForm } from "@/types/index"
import { userSchema } from "@/types/index"


export async function createAccount(formData: UserRegistrationForm) {
        const { data } = await api.post<string>('/auth/create-account', formData)
        return data
}

export async function confirmAccount(token: ConfirmToken['token']) {
        const { data } = await api.post<string>('/auth/confirm-account', { token })
        return data
}

export async function requestNewCode(formData: RequestConfirmationCodeForm) {
        const { data } = await api.post<string>('/auth/request-code', formData)
        return data
}

export async function login(formData: UserLoginForm) {
        const { data } = await api.post<string>('/auth/login', formData)
        localStorage.setItem('AUTH-TOKEN', data)
        return data
}

export async function resetPassword(formData: ResetPasswordForm) {
        const { data } = await api.post<string>('/auth/reset-password', formData)
        return data

}

export async function validateRenewalToken(token: ConfirmToken['token']) {
        const { data } = await api.post<string>('/auth/validate-token', { token })
        return data
}

export async function updatePassword({ formData, token }: { formData: NewPasswordForm, token: ConfirmToken['token'] }) {
        const { data } = await api.post<string>(`/auth/update-password/${token}`, formData)
        return data
}

export async function deleteCheckPassword(formData: DeleteCheckPasswordForm) {
        const { data } = await api.post<string>('/auth/delete-check-password', formData)
        return data
}


export async function getAuthorizedUser() {
        const { data } = await api('/auth/user')
        const response = userSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
}

