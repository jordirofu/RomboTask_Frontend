import type { Task, TaskStatus } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"

type TaskListProps = {
    tasks: Task[]
    isCollaborator: boolean
}

type GroupedTasks = {
    [key in TaskStatus]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}



const statusColors: Record<TaskStatus, string> = {
    pending: "border-t-slate-500",
    onHold: "border-t-rose-700",
    inProgress: "border-t-blue-700",
    underReview: "border-t-amber-600",
    completed: "border-t-emerald-700"
}




export default function TaskList({ tasks, isCollaborator }: TaskListProps) {

    //Esto... sin type GroupedTasks y sin initialStatusGroups... TS chirría... no sabe
    //de qué tipo van a ser los arrays que se van a formar al vuelo. Entonces...
    //Cres un valor inicial (objeto de arrays) que tiene un tipo concreto que has creado
    // const groupedTasks = tasks.reduce((acc, task) => {
    //     let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    //     currentGroup = [...currentGroup, task]
    //     return { ...acc, [task.status]: currentGroup };
    // }, initialStatusGroups/*[]*/);
    const groupedTasks = tasks.reduce((acc, task) => {
        const currentGroup = [...acc[task.status], task];
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups/*[]*/);


    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            {/* <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'> */}
             <div className='flex gap-4 overflow-x-auto md:overflow-x-visible pb-32 w-full'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    // <div key={status} className='min-w-75 2xl:min-w-0 2xl:w-1/5'>
                    <div key={status} className='min-w-75 md:min-w-0 md:flex-1'>
                        <h3 className={`text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusColors[status as TaskStatus]}`}>{statusTranslations[status as TaskStatus]}</h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} isCollaborator={isCollaborator} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>


        </>
    )
}
