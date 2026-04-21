import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo"
import { NavMenu } from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

export default function AppLayout() {

    //Lo primero, para ver si hay usuario correctamente autenticado
    const { data, isError, isLoading } = useAuth()


    if (isLoading) return 'Cargando...'
    if (isError) {
        return <Navigate to='/auth/login' />
    }

    if (data) return (

        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 py-5">
                {/* <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center"> */}
                <div className="max-w-450 w-full mx-auto flex flex-col lg:flex-row justify-between items-center px-5">
                    {/* max-w-screen es para contenedores de página completa, como el layout. En este caso, 1536px */}
                    <div className="w-64">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <NavMenu data={data} />
                </div>
            </header>

            {/* <section className="max-w-screen-2xl mx-auto mt-10 p-5 flex-1"> */}
            {/* <section className="max-w-450 mx-auto mt-10 p-5 flex-1"> */}
                <section className="w-full max-w-450 mx-auto mt-10 p-5 flex-1">
 
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">
                    Rombo Co. Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                autoClose={3000}
                hideProgressBar={true}
            />
        </div>

    )
}
