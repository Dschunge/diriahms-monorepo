import { Hotel, TVChannels } from '@prisma/client'
import { queryOptions, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type HotelWithTVChannels = Hotel & {
  tvchannels: TVChannels[]
}

export const hotels = queryOptions({
  queryKey: ['pokemon'],
  queryFn: async () => {
    const response = await fetch('http://172.16.8.123:3333/api/hotel')

    return response.json()
  },
})

export const getHotels = () => {
  return useQuery({
    enabled: true,
    queryKey: ['hotels'],
    queryFn: async () => {
      const { data } = await axios.get('http://172.16.8.123:3333/api/hotel')
      return data
    },
  })
}

export const getHotelById = (id: string) => {
  return useQuery({
    enabled: true,
    queryKey: ['hotel', id],
    queryFn: async () => {
      const { data } = await axios.get(`http://172.16.8.123:3333/api/hotel/${id}`)

      return data as HotelWithTVChannels
    },
  })
}

export const getTVCHannelsByHotelId = (id: string) => {
  return useQuery({
    enabled: true,
    queryKey: ['tvchannels', id],
    queryFn: async () => {
      const { data } = await axios.get(`http://172.16.8.123:3333/api/hotel/${id}`)

      return data
    },
  })
}
