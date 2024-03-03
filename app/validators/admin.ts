import vine from '@vinejs/vine'

export const validateAdmin = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(5),
        password: vine.string().minLength(5),
    })
)