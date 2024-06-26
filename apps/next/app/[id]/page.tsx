'use client'

import { getQueryClient } from '@diriahms/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { HomeScreen } from 'app/features/home/screen'
import { hotels, getHotelById, HotelWithTVChannels } from '@diriahms/api'
import { useParams, useRouter } from 'solito/navigation'
import { Paragraph } from 'tamagui'
import { SpinnerCmp } from '@my/ui'

export default function HomePage() {
  const { id } = useParams()
  //const queryClient = getQueryClient()
  //const { data } = useSuspenseQuery(hotels)

  const hotel = getHotelById(String(id))

  const { data, isPending, error } = hotel

  if (isPending)
    return (
      <Paragraph col="$color10" ta="center">
        Loading Tv CHannels...
      </Paragraph>
    )

  if (error)
    return (
      <Paragraph col="$color10" ta="center">
        'An error has occurred: ' {error.message}{' '}
      </Paragraph>
    )

  return <HomeScreen hotel={data} />
}
