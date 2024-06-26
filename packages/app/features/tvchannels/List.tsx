import { randAvatar, randFullName, randUuid } from '@ngneat/falso'
import { TVChannels } from '@prisma/client'
import { Phone } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import type { ColorTokens } from 'tamagui'
import { Avatar, Button, Circle, Separator, Text, View, YGroup } from 'tamagui'

// Define more descriptive status options
const statusOptions = [
  {
    status: 'Available',
    color: 'green',
  },
  {
    status: 'Offline',
    color: 'gray',
  },
  {
    status: 'In a Meeting',
    color: 'orange',
  },
  {
    status: 'On Vacation',
    color: 'pink',
  },
  {
    status: 'Do Not Disturb',
    color: 'red',
  },
  {
    status: 'Working Remotely',
    color: 'purple',
  },
  {
    status: 'Out for Lunch',
    color: 'blue',
  },
  {
    status: 'Away from Desk',
    color: 'gray',
  },
  {
    status: 'On a Call',
    color: 'blue',
  },
  {
    status: 'Taking a Break',
    color: 'yellow',
  },
]

// Function to generate a person with a random descriptive status
const getPersonList = () => {
  const personsList = Array.from({ length: 10 }, () => ({
    id: randUuid(),
    name: randFullName(),
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    image: `${randAvatar()}?id=${randUuid()}`,
  }))
  return personsList
}

type PersonList = ReturnType<typeof getPersonList>

interface Props {
  tvchannels: TVChannels[]
}

export const List = ({ tvchannels }: Props) => {
  const [personsList, setPersonsList] = useState<PersonList>([])
  const [tvchannellist, setTVChannelList] = useState<TVChannels[]>([])

  useEffect(() => {
    setPersonsList(getPersonList())
    setTVChannelList(tvchannels)
  }, [])
  return (
    <YGroup
      width="100%"
      justifyContent="center"
      alignItems="center"
      $sm={{
        paddingHorizontal: '$4',
        paddingVertical: '$6',
      }}
    >
      <View
        $gtXs={{
          padding: '$3',
          width: 600,
        }}
        gap="$1.5"
        minWidth="100%"
      >
        {tvchannellist.map((tvchannel, i) => (
          <View key={tvchannel.id}>
            <Item tvchannel={tvchannel} />
            {i < tvchannellist.length - 1 && <Separator />}
          </View>
        ))}
      </View>
    </YGroup>
  )
}

function Item({ tvchannel }: { tvchannel: TVChannels }) {
  return (
    <YGroup.Item>
      <View
        flexDirection="row"
        paddingVertical="$2"
        gap="$2"
        $gtXs={{
          padding: '$4',
          gap: '$4',
        }}
        backgroundColor="$color1"
        alignItems="center"
      >
        <View>
          <Avatar circular size="$4">
            <Avatar.Image objectFit="cover" src={tvchannel?.logo ? tvchannel.logo : ''} />
            <Avatar.Fallback backgroundColor="$background" />
          </Avatar>
          <Circle
            borderWidth={1}
            borderColor="$borderColor"
            right="3%"
            bottom="3%"
            zIndex={1}
            size={12}
            position="absolute"
            //backgroundColor={`$${person.status.color}10` as ColorTokens}
          />
        </View>
        <View flexDirection="column" flexShrink={1} justifyContent="center">
          <Text>{tvchannel.name}</Text>
          <Text fontSize="$2" lineHeight="$2" fontWeight="$2" theme="alt1">
            {tvchannel.description}
          </Text>
        </View>
        <View
          marginLeft="auto"
          flexDirection="row"
          flexShrink={1}
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Text>{tvchannel.channelNo}</Text>
        </View>
        {/* <Button marginLeft="auto" circular size="$4" scaleIcon={1.5}>
          <Button.Icon>
            <Phone color="$green10" />
          </Button.Icon>
        </Button> */}
      </View>
    </YGroup.Item>
  )
}
