import { useQuery } from "@tanstack/react-query"
import { getAuthorizedUser } from "@/api/AuthApi"

export const useAuth = () => {
    const {data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getAuthorizedUser,
        retry: 1,
        refetchOnWindowFocus: false //si no le pones esto, por defecto hace una llamada cuando vuelves (true) a la pestaña donde esta esto cargado, desde otras pestañas del navegador
    })

    return {data, isError, isLoading}
}