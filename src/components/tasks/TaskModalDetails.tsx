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
import { XMarkIcon } from '@heroicons/react/24/outline'



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
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId] })
            queryClient.invalidateQueries({ queryKey: ['projectDetails', projectId] })
        }
    })

    const handleOnChangeStatus = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        mutate({ status: e.target.value as TaskStatus, projectId, taskId })

    }


    useEffect(() => {
        if (isError) {
            toast.error(error.message, { toastId: 'error' })
            navigate(location.pathname, { replace: true })
        }
    }, [isError, error])

    if (data) return (
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
                                <DialogPanel className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-100 transition"
                                    >
                                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                                    </button>
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
