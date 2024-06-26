import { Button, Circle, H3, H6, Paragraph, XStack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useParams, useRouter } from 'solito/navigation'
import { HotelWithTVChannels } from '@diriahms/api'
import { List } from './List'
import { UsersTableSample } from './table-sample'
import { TVChannelsPage } from './table-tvchannels'
import { useNetworkState } from '@react-hookz/web'

interface Props {
  hotel: HotelWithTVChannels
}

export function TVChannelsScreen({ hotel }: Props) {
  const router = useRouter()
  const { id } = useParams()

  console.log(hotel.tvchannels)

  const backgroundColor = '#d8af6d'
  //const backgroundColor = 'blue'

  const onlineState = useNetworkState()

  return (
    <YStack
      //f={1}
      //ai="center"
      gap="$0"
      backgroundColor={backgroundColor}
      paddingTop={'$2'}
      height={'100%'}
    >
      <XStack
        flex={1}
        alignItems="center"
        justifyContent="flex-end"
        gap="$2"
        paddingHorizontal={'$2'}
        //backgroundColor={'orange'}
        width={'100%'}
      >
        <H6 fontSize={12} fow="800" color={'#444438'}>
          {onlineState.online ? 'Online' : 'Offline'}
        </H6>
        <Circle size={15} backgroundColor={onlineState.online ? 'green' : 'red'} elevation="$4" />
      </XStack>
      <XStack flex={1} alignItems="center" justifyContent="center" gap="$3">
        <H3 ta="center" col="$color12">
          {hotel.name}
        </H3>
      </XStack>

      <H6 ta="center" fow="800" color={'#444438'} paddingTop={20}>
        {`TV Channels (${hotel.tvchannels.length})`}
      </H6>

      <TVChannelsPage tvchannels={hotel.tvchannels} />
    </YStack>
  )
}
