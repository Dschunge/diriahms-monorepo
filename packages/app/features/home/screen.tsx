'use client'
import {
  Anchor,
  Button,
  H1,
  H5,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchThemeButton,
  SwitchRouterButton,
  XStack,
  YStack,
  SizableText,
  isWeb,
  Tabs,
  H3,
  Image,
  H4,
} from '@my/ui'
import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import type { TabsContentProps } from 'tamagui'
import { Hotel, PrismaClient } from '@diriahms/database'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'solito/link'

const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}

interface Props {
  hotel: Hotel
}

export function HomeScreen({ hotel }: Props) {
  console.log({ hotel })

  const getLink = (linkTarget: string, id: string) => {
    return useLink({
      href: `${linkTarget}/${id}`,
    })
  }

  const [demoIndex, setDemoIndex] = useState(0)
  const demo = demos[demoIndex]

  return (
    // web only fix for position relative
    <YStack f={1} jc="flex-start" ai="center" gap="$3" p="$6" backgroundColor={'#d8af6d'}>
      <Image
        source={{
          //uri: 'https://res.cloudinary.com/dgfgt8hwr/image/upload/v1717078056/diriahms/cqv6rztv24tudlpxjc7i.png',
          uri: hotel.image,
          width: 200,
          height: 200,
        }}
      />

      <H3 ta="center" col="$color12">
        Welcome to {hotel.name}.
      </H3>
      <Paragraph col="$color10" ta="center">
        Here you get all the Information you need
      </Paragraph>
      <Button width="90%" size="$5" theme="blue">
        <Link href={'/hotel/infos'}>
          <H4>Hotel Infos</H4>
        </Link>
      </Button>
      <Button width="90%" size="$5" theme="blue">
        <Link href={'/restaurants'}>
          <H4>Restaurants</H4>
        </Link>
      </Button>
      <Button width="90%" size="$5" theme="blue">
        <Link href={`/tvchannels/${hotel.id}`}>
          <H4>TV Channels</H4>
        </Link>
      </Button>
    </YStack>

    /*  <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <XStack
        pos="absolute"
        w="100%"
        t="$6"
        gap="$6"
        jc="center"
        fw="wrap"
        $sm={{ pos: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && (
          <>
            <SwitchRouterButton pagesMode={pagesMode} />
            <SwitchThemeButton />
          </>
        )}
      </XStack>

      <YStack gap="$4">
        <H1 ta="center" col="$color12">
          Welcome to Tamagui.
        </H1>
        <Paragraph col="$color10" ta="center">
          Here's a basic starter to show navigating from one screen to another.
        </Paragraph>
        <Separator />
        <Paragraph ta="center">
          This screen uses the same code on Next.js and React Native.
        </Paragraph>
        <Separator />
      </YStack>

      <Button {...linkProps}>Link to user</Button>
      
      <Button width="100%" size="$3" chromeless>
        Test
      </Button>

      <SheetDemo />
    </YStack> */
  )
}

function SheetDemo() {
  const toast = useToastController()

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle bg="$gray8" />
        <Sheet.Frame ai="center" jc="center" gap="$10" bg="$color2">
          <XStack gap="$2">
            <Paragraph ta="center">Made by</Paragraph>
            <Anchor col="$blue10" href="https://twitter.com/natebirdman" target="_blank">
              @natebirdman,
            </Anchor>
            <Anchor
              color="$purple10"
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              rel="noreferrer"
            >
              give it a ⭐️
            </Anchor>
          </XStack>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

const HorizontalTabs = () => {
  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={400}
      height={150}
      borderRadius="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
    >
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >
        <Tabs.Tab flex={1} value="tab1">
          <SizableText fontFamily="$body">Profile</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="tab2">
          <SizableText fontFamily="$body">Connections</SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="tab3">
          <SizableText fontFamily="$body">Notifications</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <TabsContent value="tab1">
        <H5>Profile</H5>
      </TabsContent>

      <TabsContent value="tab2">
        <H5>Connections</H5>
      </TabsContent>

      <TabsContent value="tab3">
        <H5>Notifications</H5>
      </TabsContent>
    </Tabs>
  )
}

const VerticalTabs = () => {
  return (
    <Tabs
      defaultValue="tab1"
      flexDirection="row"
      orientation="vertical"
      width={400}
      borderRadius="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
    >
      <Tabs.List
        disablePassBorderRadius="end"
        aria-label="Manage your account"
        separator={<Separator />}
      >
        <Tabs.Tab value="tab1">
          <SizableText>Profile</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="tab2">
          <SizableText>Connections</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="tab3">
          <SizableText>Notifications</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator vertical />
      <TabsContent value="tab1">
        <H5 textAlign="center">Profile</H5>
      </TabsContent>
      <TabsContent value="tab2">
        <H5 textAlign="center">Connections</H5>
      </TabsContent>
      <TabsContent value="tab3">
        <H5 textAlign="center">Notifications</H5>
      </TabsContent>
    </Tabs>
  )
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >
      {props.children}
    </Tabs.Content>
  )
}
