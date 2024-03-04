import vine from '@vinejs/vine'

export const validateUser = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(5),
        username: vine.string().trim().minLength(5),
        email: vine.string().trim(),
        password: vine.string().minLength(5),
    })
)