import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { useMedia } from 'tamagui'
import { Avatar, Separator, Text, View, XStack, Image } from 'tamagui'
import { Table } from './tableParts'
import { Circle } from 'tamagui'
import { TVCHANNELTYPE, TVChannels, TVChannelLanguages } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { useForwardFocus } from './hooks/useForwardFocus'
import { TextInput } from 'react-native'
import { Input } from './inputParts'
import { Antenna, Search } from '@tamagui/lucide-icons'
import { ScrollView } from '@my/ui'
import { useDebouncedEffect } from '@react-hookz/web'

const columnHelper = createColumnHelper<TVChannels>()

//const cardBackground = '#d6c4a7'
const cardBackground = 'white'
const backgroundColor = '#d8af6d'

const columns = [
  columnHelper.accessor(
    (row) => ({
      name: row.name,
      category: row.category,
      image: row.logo ? row.logo : '',
    }),
    {
      cell: (info) => {
        const { name, category, image } = info.getValue()
        return (
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="$3"
            ml="$2"
            width={'$13'}
            //backgroundColor={'blue'}
          >
            <Image
              source={{
                uri: image,
              }}
              width={50}
              aspectRatio={1}
              contain="contain"
            />
            <View flexDirection="column">
              <Text>{name}</Text>
              <Text fontSize="$2" lineHeight="$2" fontWeight="$2" theme="alt2">
                {category}
              </Text>
            </View>
          </View>
        )
      },
      header: () => 'Channel-Name',
      id: 'user_base',
    }
  ),
  columnHelper.accessor('channelNo', {
    header: () => 'Channel',
    // cell: (info) => info.renderValue(),
    cell: (info) => {
      const val = info.renderValue()
      return (
        <View width={'$6'}>
          <Text fontSize={18} textAlign="right">
            {val}
          </Text>
        </View>
      )
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('channeltype', {
    header: 'Quality',
    footer: (info) => info.column.id,
    cell: (info) => {
      const val = info.renderValue() as TVCHANNELTYPE
      return <StatusButton status={val} />
    },
  }),
  columnHelper.accessor('languages', {
    header: 'LANG',
    footer: (info) => info.column.id,
    cell: (info) => {
      const val = info.renderValue() as TVChannelLanguages
      return (
        <View>
          <Text>{val === TVChannelLanguages.BOTH ? 'ENGLISH / SPANISH' : val}</Text>
        </View>
      )
    },
  }),
]

const StatusButton = ({ status }: { status: TVCHANNELTYPE }) => {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap="$2"
      paddingHorizontal="$2"
      theme={status === TVCHANNELTYPE.HD ? 'orange' : 'gray'}
      //theme={'blue_surface1'}
      backgroundColor="$color6"
      borderRadius={1000_000_000}
      width={'$8'}
    >
      {/* <Circle size={10} backgroundColor="$color10" /> */}
      <Text
        color="$color10"
        $gtXs={{
          fontSize: '$2',
          lineHeight: '$1',
          fontWeight: '$2',
        }}
        fontSize="$1"
        fontWeight="$2"
        lineHeight="$1"
        paddingVertical="$1"
      >
        {status}
      </Text>
    </View>
  )
}

interface Props {
  tvchannels: TVChannels[]
}

/** ------ EXAMPLE ------ */
export function TVChannelsPage({ tvchannels }: Props) {
  const [data, setData] = useState<TVChannels[] | []>(tvchannels)
  const inputRef = useRef<TextInput>(null)
  const focusTrigger = useForwardFocus(inputRef)
  const [state, setState] = useState('')

  const [filteredlist, setFilteredList] = useState<TVChannels[]>([])

  const filter = (value: string) => {
    if (value !== '') {
      const results = tvchannels.filter((tvchannels: TVChannels) => {
        return (
          tvchannels.name.toLowerCase().startsWith(value.toLowerCase()) ||
          tvchannels.category.toLowerCase().startsWith(value.toLowerCase())
        )
      })

      setFilteredList(results)
    } else {
      setFilteredList(tvchannels)
    }
  }

  const table = useReactTable({
    data: filteredlist,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const headerGroups = table.getHeaderGroups()
  const tableRows = table.getRowModel().rows
  const footerGroups = table.getFooterGroups()

  //console.log({ tableRows })

  const allRowsLength = tableRows.length + headerGroups.length + footerGroups.length
  const rowCounter = React.useRef(-1)
  rowCounter.current = -1
  const { sm, xs } = useMedia()

  useEffect(() => {
    setFilteredList(tvchannels)
  }, [tvchannels])

  useDebouncedEffect(
    () => {
      filter(state)
      console.log('debounce')
    },
    [state],
    300,
    500
  )

  if (xs) {
    return (
      <View
        width="100%"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        gap="$5"
        paddingHorizontal="$3"
        paddingVertical="$0"
        backgroundColor={backgroundColor}
      >
        <View flexDirection="row" justifyContent="flex-end" alignItems="flex-end" width="90%">
          <Input w={200} size="$3">
            <Input.Box>
              <Input.Section>
                <Input.Icon>
                  <Search />
                </Input.Icon>
              </Input.Section>
              <Input.Section>
                <Input.Area
                  paddingLeft={0}
                  onChangeText={(val) => {
                    //filter(val)
                    setState(val)
                  }}
                />
              </Input.Section>
            </Input.Box>
          </Input>
        </View>

        <ScrollView
          maxHeight={750}
          width="100%"
          //backgroundColor="$background"
          //padding="$4"
          //borderRadius="$4"
        >
          <XStack flexWrap="wrap" alignItems="center" justifyContent="center" gap="$3">
            {filteredlist.map((row, i) => {
              return (
                <View
                  key={i}
                  borderRadius="$4"
                  /* borderWidth="$1"
                borderColor="$borderColor" */
                  flex={1}
                  //alignSelf="stretch"
                  //width="$20"
                  maxWidth="100%"
                  //gap="$4"
                  padding="$4"
                  backgroundColor={cardBackground}
                  //backgroundColor={'red'}
                >
                  <XStack alignItems="center" paddingVertical="$4" marginLeft="$1" gap="$4" h={70}>
                    <Image
                      source={{
                        //uri: 'https://res.cloudinary.com/dgfgt8hwr/image/upload/v1717078056/diriahms/cqv6rztv24tudlpxjc7i.png',
                        uri: row.logo ? row.logo : '',
                      }}
                      width={50}
                      aspectRatio={1 / 1}
                      contain="contain"
                      marginLeft={5}
                    />
                    <View h="100%" justifyContent="center">
                      <Text fontSize="$6">{row.name.slice(0, 25)}</Text>
                      <Text fontSize="$4" color="$gray10">
                        {row.category}
                      </Text>
                    </View>
                    {/* <Text
                  fontSize={'$5'}
                  fontWeight={'bold'}
                  color="$gray10"
                  marginLeft={'auto'}
                  paddingRight={'$2'}
                >
                  CH: {String(row.channelNo).trim()}
                </Text> */}
                  </XStack>

                  <View height={2} backgroundColor="$borderColor" />

                  <View gap="$2">
                    <View>
                      <View
                        flexDirection="row"
                        justifyContent="space-between"
                        marginHorizontal="$3"
                        paddingBottom="$2"
                        paddingTop="$2"
                      >
                        <Text>{'Channel:'}</Text>
                        <Text>{row.channelNo}</Text>
                      </View>
                      <Separator />
                      <View
                        flexDirection="row"
                        justifyContent="space-between"
                        marginHorizontal="$3"
                        paddingBottom="$2"
                        paddingTop="$2"
                      >
                        <Text>{'Quality:'}</Text>
                        <StatusButton status={row.channeltype} />
                      </View>
                      <Separator />
                      <View
                        flexDirection="row"
                        justifyContent="space-between"
                        marginHorizontal="$3"
                        paddingBottom="$2"
                        paddingTop="$2"
                      >
                        <Text>{'Languages:'}</Text>

                        <Text color="$gray10">
                          {row.languages === TVChannelLanguages.BOTH
                            ? 'ENGLISH / SPANISH'
                            : row.languages}
                        </Text>
                      </View>
                      <Separator />
                    </View>
                  </View>
                </View>
              )
            })}
          </XStack>
        </ScrollView>
      </View>
    )
  }

  return (
    <>
      <View flexDirection="row" justifyContent="flex-end" alignItems="flex-end" marginRight={'$4'}>
        <Input w={200} size="$3">
          <Input.Box>
            <Input.Section>
              <Input.Icon>
                <Search />
              </Input.Icon>
            </Input.Section>
            <Input.Section>
              <Input.Area
                paddingLeft={0}
                onChangeText={(val) => {
                  setState(val)
                }}
              />
            </Input.Section>
          </Input.Box>
        </Input>
      </View>
      <Table
        /* alignCells={{ x: 'center', y: 'end' }}
        alignHeaderCells={{ y: 'center', x: 'end' }} */
        cellWidth="$18"
        cellHeight="$7"
        //borderWidth={3}
        //padding="$2"
        paddingHorizontal={'$4'}
        maxWidth="100%"
        width={'100%'}
        //maxHeight={600}
        gap="$5"
        backgroundColor={backgroundColor}
        borderWidth={0}
      >
        <Table.Head>
          {headerGroups.map((headerGroup) => {
            rowCounter.current++
            return (
              <Table.Row
                rowLocation={
                  rowCounter.current === 0
                    ? 'first'
                    : rowCounter.current === allRowsLength - 1
                      ? 'last'
                      : 'middle'
                }
                //rowLocation={'last'}
                key={headerGroup.id}
                //flex={1}
                justifyContent="flex-end"
                alignContent="flex-end"
                //backgroundColor={'red'}
              >
                {headerGroup.headers.map((header) => (
                  <Table.HeaderCell
                    /* cellLocation={
                      header.id === 'fullName' ? 'first' : header.id === 'role' ? 'last' : 'middle'
                    } */
                    //alignHeaderCells={{ y: 'center', x: 'end' }}
                    key={header.id}
                    borderWidth={0}
                    justifyContent="flex-end"

                    /*  {...(header.column.id === 'user_base'
                      ? {
                          flexShrink: 1,
                        }
                      : {
                          flexShrink: 3,
                        })} */
                  >
                    <Text>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Head>
        <Table.Body>
          {tableRows.map((row) => {
            rowCounter.current++
            return (
              <Table.Row
                /*  rowLocation={
                  rowCounter.current === 0
                    ? 'first'
                    : rowCounter.current === allRowsLength - 1
                      ? 'last'
                      : 'middle'
                } */
                key={row.id}
                backgroundColor={cardBackground}
                paddingRight={5}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    /* cellLocation={
                      cell.column.id === 'fullName'
                        ? 'first'
                        : cell.column.id === 'role'
                          ? 'last'
                          : 'middle'
                    } */
                    key={cell.id}
                    //borderWidth={0}
                    justifyContent="flex-end"
                    /*  {...(cell.column.id === 'user_base'
                      ? {
                          flexShrink: 1,
                        }
                      : {
                          flexShrink: 3,
                        })} */
                  >
                    {cell.column.id === 'user_base' ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <Text theme="alt1" color={'orange'}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Text>
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}
