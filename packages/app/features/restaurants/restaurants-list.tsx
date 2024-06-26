import { Restaurant } from '@diriahms/database'
import { useState } from 'react'
import { FlatList } from 'react-native'
import {
  Avatar,
  Button,
  Image,
  Paragraph,
  Separator,
  Text,
  View,
  styled,
  useWindowDimensions as useDimensions,
} from 'tamagui'
import { useWindowDimensions } from 'tamagui'

//const items = Array.from({ length: 100 }).map((_, index) => index)

const List = styled(FlatList<Restaurant>, {})

const renderItem = ({ item, index }: { item: Restaurant; index: number }) => {
  return <Item restaurant={item} key={index} />
}

interface Props {
  restaurants: Restaurant[]
}

export function Restaurants({ restaurants }: Props) {
  const [baseWidth, setBaseWidth] = useState(300)
  const [padding, setPadding] = useState(20)

  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions()

  const numberOfColumns = Math.round((deviceWidth - padding) / baseWidth)

  return (
    <List
      {...(numberOfColumns > 1 && {
        columnWrapperStyle: {
          gap: 22,
        },
      })}
      paddingHorizontal="$4"
      paddingVertical="$6"
      $gtXs={{
        padding,
        height: 700,
      }}
      numColumns={numberOfColumns}
      key={numberOfColumns}
      data={restaurants}
      renderItem={renderItem}
      height={deviceHeight}
    />
  )
}

function Item({ restaurant }: { restaurant: Restaurant }) {
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions()
  const { id } = restaurant
  const PADDING = 16
  return (
    <View
      flexDirection="column"
      backgroundColor="$background"
      overflow="hidden"
      borderRadius="$9"
      borderWidth={1}
      borderColor="$borderColor"
      padding={PADDING}
      gap="$3"
      flexShrink={1}
      flexGrow={1}
      elevation={1}
      hoverStyle={{
        shadowColor: '$shadowColor',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        //@ts-ignore
        elevationAndroid: 8,
      }}
      height="100%"
      marginBottom={12}
    >
      {/* minus margin can cancel padding */}
      <View height="$14" marginHorizontal={-PADDING} marginTop={-PADDING}>
        <Image
          height="100%"
          width={'100%'}
          backgroundColor="$backgroundPress"
          source={{
            /*  uri: `https://res.cloudinary.com/dgfgt8hwr/image/upload/v1717500425/diriahms/quaz79sfbdh7531dmfdz.png`, */
            uri: restaurant.image,
          }}
          //aspectRatio={1}
          contain="contain"
        />
      </View>
      <Paragraph size="$2" lh="$1" theme="alt1">
        {restaurant.descriptionshort.slice(0, 70)}
      </Paragraph>
      <Separator marginHorizontal={-PADDING} />
      <View
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        gap="$4"
        padding="$2"
      >
        <Button size="$5">
          {/* <Avatar circular>
            <Avatar.Image
              accessibilityLabel="Cam"
              src={`https://i.pravatar.cc/150?img=${index + 1}`}
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar> */}
          Menu
        </Button>
        {/* <View flexDirection="column">
          <Text fontSize="$3" lineHeight="$2" fontWeight="$8">
            Photo posted by
          </Text>
          <Text color="$color9" fontSize="$2">
            someperson@something.com
          </Text>
        </View> */}
      </View>
    </View>
  )
}
