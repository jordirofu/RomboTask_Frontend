import { z } from 'zod'


/** Auth & Users **/

const authSchema = z.object ({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
    current_password: z.string()
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' |'password'>

export type UserRegistrationForm = Pick<Auth, 'name' |'email' |'password' | 'password_confirmation'>

export type ConfirmToken = Pick<Auth, 'token'>

export type RequestConfirmationCodeForm = Pick<Auth, 'email'>

export type ResetPasswordForm = Pick<Auth, 'email'> 

export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'> 

export type UpdatePasswordForm = Pick<Auth, 'password' | 'password_confirmation' | 'current_password'>

export type DeleteCheckPasswordForm = Pick<Auth, 'password'>

/** Users **/

 export const userSchema = authSchema.pick({
    name: true,
    email: true
 }).extend({
    _id: z.string()
 })

 export type User = z.infer<typeof userSchema>
 export type UserProfileForm = Pick<User, 'name' | 'email'>

 /** Team **/
 export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
 })
 export type TeamMember = z.infer<typeof teamMemberSchema>

 export const teamMembersSchema = z.array(teamMemberSchema)
 export type teamMembersSchema = z.infer<typeof teamMembersSchema>
 
 export type TeamMemberForm = Pick<TeamMember, 'email'>


/**Notes**/
const noteSchema = z.object({  
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>

export type NoteFormData = Pick<Note, 'content'>


/**Tasks**/

export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export const taskDetailsSchema = taskSchema.extend({
    statusModifiedBy: z.array(z.object({
        user: userSchema,
        status: taskStatusSchema,
        _id: z.string()
    })).default([]),
    notes: z.array(noteSchema).default([])
})


export type TaskStatus = z.infer<typeof taskStatusSchema>
export type Task = z.infer<typeof taskSchema>
export type TaskWithStatusDetails = z.infer<typeof taskDetailsSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>


/**Projects**/
export const projectSchema = z.object({
    _id: z.string(),
    projectName:  z.string(),
    clientName:  z.string(),
    description:  z.string(),
    tasks: z.array(taskSchema),
    manager: z.string() 
})

export const dashboardProjectSchema = z.array( 
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true 
    })

)

export type Project = z.infer<typeof projectSchema> //para cuando traigas datos de base datos

export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

