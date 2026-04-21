import { Fragment, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getTaskById, updateTaskStatus } from '@/api/TaskApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { formatDate } from '@/utils/utils'
import { statusTranslations } from '@/locales/es'
import type { TaskStatus } from '@/types/index'
import NotesPanel from '../notes/NotesPanel'



export default function TaskModalDetails() {

    const params = useParams()
    const projectId = params.projectId!
    const [searchParams] = useSearchParams()
    const taskId = searchParams.get('viewTaskId')!
    const show = !!taskId

    const location = useLocation()
    const navigate = useNavigate()
    const closeModal = () => navigate(location.pathname, { replace: true })

    const queryClient = useQueryClient()

    const { data, isError, error } = useQuery({
        queryKey: ['viewTask', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false //si no, esta tarda mucho
    })

    //LA FORMA COMENTADA, MAL... TRATAS DE HACER EL RENDER DE UN "SIDE EFFECT" EN EL CÓDIGO DEL RENDER...
    //REACT SE LÍA

    //si hemos metido un taskId inválido en url, p. ej.. no quiero ir a otra pantalla, simplemente
    //que salga un toast, se quite el queryString y listos...
    // if (isError) {
    //     //en este caso, al quitar la queryString con navigate... en consola navegador aparecía este error:
    //     //Cannot update a component (`Lt`) while rendering a different component (`TaskModalDetails`). To locate the bad setState() call inside `TaskModalDetails`
    //     //navigate(location.pathname, {replace: true}) //el "navigate" es para eventos (onClick) y USEeFFECT
    //     toast.error(error.message, {toastId: 'error'})
    //     return <Navigate to={`/projects/${projectId}`} /> //esto es... volver a la página del proyecto, pero sin queryString, sin modal
    // }

    //Lo de arriba: es... si hay un error... return: renderizo el <Navigate> que de hecho es una acción y navego.
    //si no hay error: siguiente return, el de abajo... pinto la modal.


    //OJO, SI NO HUBIERA QUE PINTAR TOAST Y SOLO FUERA NAVEGACIÓN SÍ PODRÍAS HACER UN: (RENDERIZAS DIRECTAMENTE UNA NAVEGACIÓN)
    // if (isError) {

    //     return <Navigate to={`/projects/${projectId}`} /> //esto es... volver a la página del proyecto, pero sin queryString, sin modal
    // }

    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId] })
            queryClient.invalidateQueries({ queryKey: ['projectDetails', projectId] })
            //navigate(location.pathname, {replace: true})
        }
    })

    const handleOnChangeStatus = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        mutate({ status: e.target.value as TaskStatus, projectId, taskId })

    }


    useEffect(() => {
        if (isError) {
            // console.log('entró en isError');
            //const errorMessage = (error as any).message //si no... para TS siempre es never
            toast.error(error.message, { toastId: 'error' }) //el segundo parámetro es una forma de hacer que la toast no aparezca
            navigate(location.pathname, { replace: true })//dos veces debido al doble render de React
        }
    }, [isError, error])

    if (data) return (    //si hay datos, pintas, si no, no... (igualmente, no pintará cuando show sea false)
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el:{' '}{formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización:{' '}{formatDate(data.updatedAt)}</p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description} </p>
                                    {(data.statusModifiedBy && data.statusModifiedBy.length) ? (
                                        <>
                                            <p className='font-bold text-2xl text-slate-600 my-5'>Historial cambios:</p>
                                            <ul className='list-decimal list-inside pl-5'>
                                                {data.statusModifiedBy?.map((change) => (
                                                    <li key={change._id}>
                                                        <span className='font-bold text-slate-600'>{statusTranslations[change.status]}</span>{' - '}
                                                        {change.user.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : null
                                    }

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select
                                            onChange={handleOnChangeStatus}
                                            defaultValue={data.status}
                                            className='w-full p-3 bg-white border border-gray-300 mt-2'>
                                            {Object.entries(statusTranslations).map(([status, translation]) => (
                                                <option key={status} value={status}>{translation}</option>
                                            )

                                            )}

                                        </select>
                                    </div>
                                    <NotesPanel notes={data.notes} />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
