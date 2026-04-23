import { useQuery } from "@tanstack/react-query"
import { getAuthorizedUser } from "@/api/AuthApi"

export const useAuth = () => {
    const {data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getAuthorizedUser,
        retry: 1,
        refetchOnWindowFocus: false 
    })

    return {data, isError, isLoading}
}