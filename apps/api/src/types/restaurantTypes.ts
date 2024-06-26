import { Restaurant, Dish, MenuTerminal } from "@prisma/client";


export type RestaurantWithDishes = Restaurant & {
    dishes: Dish[];
};

export type RestaurantWithDishesAndMenuTerminal = Restaurant & {
    menuterminal: MenuTerminal,
    dishes: Dish[];
}


