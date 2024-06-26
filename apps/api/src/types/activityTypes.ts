import { Activity, Hotel } from "@prisma/client";
import moment from "moment";
import { z } from "zod";

/* export type Activity1 = {
    id: string;
    name: string;
    name_esp: string;
    description: string;
    desctiption_esp: string;
    image: string;
    profileImage?: string;
    hotelId: string;
    type: string;
    price: number;
    chashOnly: boolean;
    freeOfCharge: boolean;
    location: string;
    start: string | Date;
    end: string | Date;
}; */

export const activityFormSchema = z.object({
    id: z.string(),
    name: z.string().min(3, {
        message: "Name of the Actvity must be at least 3 characters long",
    }),
    name_esp: z.string().min(3, {
        message: "Name of the Actvity in spanish must be at least 3 characters long",
    }),
    description: z.string().min(5, {
        message: "Description  must be at least 5 characters long",
    }),
    description_esp: z.string().min(5, {
        message: "Description in spanish must be at least 5 characters long",
    }),
    image: z.string().min(1, {
        message: "Image is required",
    }),
    profileImage: z.string(),
    hotelId: z.string().min(1, {
        message: "Hotel Id is required",
    }),
    type: z.string().min(2, {
        message: "Activity type is required",
    }),
    price: z.coerce.number(),
    cashOnly: z.boolean(),
    freeOfCharge: z.boolean(),
    location: z.string().min(2, {
        message: "Location is required",
    }),
    start: z.date({
        required_error: "A start date is required.",
    }),
    end: z.date({
        required_error: "An end date is required.",
    }),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type ActivityType = z.infer<typeof activityFormSchema>

export type EventItem = {
    //id: string;
    start: Date;
    end: Date;
    data: { activity?: Activity };
    //isDraggable?: boolean;
};

export type HotelWithActivities = Hotel & {
    activities: Activity[];
};

export const defaultValues = {
    id: "",
    name: "",
    name_esp: "Yoga",
    description: "",
    description_esp: "Yoga para primeras",
    image: "image",
    profileImage: "image",
    hotelId: " ",
    type: "Sport",
    start: moment().toDate(),
    end: moment().add().toDate(),
    price: 15,
    cashOnly: true,
    freeOfCharge: false,
    location: "Beachfront",
    createdAt: moment().toDate().toDateString(),
    updatedAt: moment().toDate().toDateString()
}
