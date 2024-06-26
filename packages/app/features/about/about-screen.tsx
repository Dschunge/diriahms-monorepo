import { Button, H3, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useParams, useRouter } from 'solito/navigation'

export function AboutScreen() {
  const router = useRouter()
  const { id } = useParams()

  return (
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
      <H3 ta="center" col="$color12">
        About Hotel Diria.
      </H3>
      {/* <Paragraph ta="center" fow="700" col="$blue10">{`User ID: ${id}`}</Paragraph> */}

      <Button icon={ChevronLeft} onPress={() => router.back()}>
        Go Home
      </Button>
    </YStack>
  )
}
