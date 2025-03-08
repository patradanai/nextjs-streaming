import { z, ZodType } from 'zod'

export interface UserFormData {
    user: string
    password: string
}

export const UserSchema: ZodType<UserFormData> = z.object({
    user: z.string(),
    password: z
        .string()
        .min(8, { message: 'Password is too short' })
        .max(20, { message: 'Password is too long' }),
})
