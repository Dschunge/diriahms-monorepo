import { z } from "zod"


export const RoomSchema = z.object({
    name: z.string().min(3, {
        message: "Name of Room must be at least 3 characters long",
    }),
    description: z.string().min(3, {
        message: "Room description must be at least 3 characters long",
    }),
    roomnumber: z.coerce.number().min(1, {
        message: "Room Number is required",
    }),
    categoryId: z.string().min(3, {
        message: "",
    }),

})

export type RoomType = z.infer<typeof RoomSchema>

export const RoomDefaultValues = {
    name: "",
    description: ")",
    roomnumber: 800,
    bedCount: 1,
    categoryId: ""
}

export const emptyDefaultValues = {
    name: "",
    description: "",
    roomnumber: 0,
    categoryId: ""
}