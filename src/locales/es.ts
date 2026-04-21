import type { TaskStatus } from "../types";

export const statusTranslations: Record<TaskStatus, string> = {
    pending: "Pendiente",
    onHold: "En espera",
    inProgress: "En progreso",
    underReview: "En revisión",
    completed: "Completada"
}