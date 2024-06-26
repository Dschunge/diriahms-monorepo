'use client'

import { getHotelById } from '@diriahms/api'
import { TVChannelsScreen } from 'app/features/tvchannels/tvchannels-screen'
import { useParams } from 'solito/navigation'
import { H3, Paragraph, YStack } from 'tamagui'

export default function TVChannelsPage() {
  const { id } = useParams()
  //const queryClient = getQueryClient()
  //const { data } = useSuspenseQuery(hotels)
  console.log('get tvchannelss data id: ', id)

  const hotel = getHotelById(String(id))

  const { data, isPending, error } = hotel

  console.log(data)

  if (isPending)
    return (
      <YStack f={1} jc="center" ai="center" gap="$3" p="$6" backgroundColor={'#d8af6d'}>
        <H3 col="$color10" ta="center">
          Loading TV Channels...
        </H3>
      </YStack>
    )

  if (error)
    return (
      <Paragraph col="$color10" ta="center">
        'An error has occurred: ' {error.message}{' '}
      </Paragraph>
    )

  return <TVChannelsScreen hotel={data} />
}
