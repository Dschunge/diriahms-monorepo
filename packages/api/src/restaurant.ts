import { queryOptions, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const getRestaurants = () => {
  return useQuery({
    enabled: true,
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data } = await axios.get('http://172.16.8.123:3333/api/restaurant')
      return data
    },
  })
}
