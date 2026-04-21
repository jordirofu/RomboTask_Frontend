import type { Project, User } from "../types";

export const isManager = (managerId: Project['manager'], userId: User['_id']) => managerId === userId

export const isNoteCreator = (userId: User['_id'] , noteCreatorId: User['_id'] ) =>  userId === noteCreatorId