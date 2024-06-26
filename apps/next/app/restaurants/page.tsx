'use client'

import { RestaurantsScreen } from 'app/features/restaurants/restaurants-screen'

import { getRestaurants } from '@diriahms/api'

export default function Page() {
  const restaurants = getRestaurants()

  console.log(restaurants.data)
  return <RestaurantsScreen restaurants={restaurants.data} />
}
