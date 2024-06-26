import { z } from "zod"

import { AMENITIESTYPE } from "@prisma/client";


export const AMENITIESTYPESchema = z.enum(['HOTEL', 'ROOM']);

export type AMENITIESTYPEType = `${z.infer<typeof AMENITIESTYPESchema>}`

export const AmenitiesSchema = z.object({
    name: z.string().min(3, {
        message: "Name of Amenitiy must be at least 3 characters long",
    }),
    description: z.string().min(3, {
        message: "Amenitiy description must be at least 3 characters long",
    }).optional(),
    icon: z.string().min(3, {
        message: "Icon must be at least 3 characters long",
    }).optional(),
    image: z.string().min(3, {
        message: "Image must be at least 3 characters long",
    }).optional(),
    //amenitiestype: z.string()
    amenitiestype: AMENITIESTYPESchema,
})

export type AmenitiesSchemaType = z.infer<typeof AmenitiesSchema>;


export const AmenitiesDefaultValues = {
    name: "",
    description: "",
    amentities: [] as const,
    icon: "",
    amenitiestype: AMENITIESTYPE.HOTEL,
}

export const TmpValues = {
    name: "Wifi",
    description: "dsfsdfsdf",
    icon: "wifi",
    amenitiestype: AMENITIESTYPE.HOTEL,

}