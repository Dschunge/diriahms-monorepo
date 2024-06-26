import { Hotel, Restaurant } from '@diriahms/database'
import { Button, H3, ListItem, Paragraph, YGroup, YStack, List } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'
import { Restaurants } from './restaurants-list'

interface Props {
  restaurants: Restaurant[]
}

export function RestaurantsScreen({ restaurants }: Props) {
  const router = useRouter()

  return (
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background" width={'100%'}>
      <H3 ta="center" col="$color12">
        Restaurants.
      </H3>
      {/* <Paragraph ta="center" fow="700" col="$blue10">{`User ID: ${id}`}</Paragraph> */}
      <Button icon={ChevronLeft} onPress={() => router.back()}>
        Go Home
      </Button>
      {/*  <List /> */}
      <Restaurants restaurants={restaurants} />
    </YStack>
  )
}
