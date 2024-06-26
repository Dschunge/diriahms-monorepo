import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { useMedia } from 'tamagui'
import { Avatar, Separator, Text, View, XStack } from 'tamagui'
import { Table } from './tableParts'
import { Circle } from 'tamagui'
import { TVCHANNELTYPE, TVChannels } from '@prisma/client'

const columnHelper = createColumnHelper<TVChannels>()

const columns = [
  columnHelper.accessor(
    (row) => ({
      name: row.name,
      description: row.description,
      image: row.logo ? row.logo : '',
    }),
    {
      cell: (info) => {
        const { name, description, image } = info.getValue()
        return (
          <View flexDirection="row" alignItems="center" gap="$3" ml="$0">
            <Avatar circular size="$4">
              <Avatar.Image accessibilityLabel="Profile image" src={image} />
              <Avatar.Fallback backgroundColor="$gray6" />
            </Avatar>
            <View flexDirection="column">
              <Text>{name}</Text>
              <Text fontSize="$2" lineHeight="$2" fontWeight="$2" theme="alt2">
                {description}
              </Text>
            </View>
          </View>
        )
      },
      header: () => 'Channel',
      id: 'user_base',
    }
  ),
  columnHelper.accessor('channelNo', {
    header: () => 'CH-No.',
    /* cell: (info) => info.renderValue(), */
    cell: (info) => {
      const val = info.renderValue()

      return (
        <View flexDirection="row">
          <Text fontSize={14} fontWeight={'bold'} textAlign="right">
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
      const val = info.renderValue() as TVCHANNELTYPE
      return (
        <View>
          <Text>ENG/ESP</Text>
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
      gap="$0"
      //paddingHorizontal="$3"
      theme={status === TVCHANNELTYPE.STANDARD ? 'orange' : 'green'}
      backgroundColor="$color6"
      borderRadius={1000_000_000}
      width={'$4'}
      pr={'$0'}
      mr="$0"
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
        textAlign="center"
      >
        {status === TVCHANNELTYPE.STANDARD ? 'STD' : 'HD'}
      </Text>
    </View>
  )
}

interface Props {
  tvchannels: TVChannels[]
}

/** ------ EXAMPLE ------ */
export function UsersTable({ tvchannels }: Props) {
  const [data, setData] = React.useState<TVChannels[] | []>(tvchannels)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const headerGroups = table.getHeaderGroups()
  const tableRows = table.getRowModel().rows
  const footerGroups = table.getFooterGroups()

  console.log({ tableRows })

  const allRowsLenght = tableRows.length + headerGroups.length + footerGroups.length
  const rowCounter = React.useRef(-1)
  rowCounter.current = -1
  const { sm, xs } = useMedia()

  return (
    <Table
      alignCells={{ x: 'center', y: 'center' }}
      alignHeaderCells={{ y: 'center', x: 'center' }}
      cellWidth="$15"
      cellHeight="$6"
      borderWidth={0}
      //padding="$0"
      paddingHorizontal="$2"
      /* marginRight={'$5'} */
      //marginHorizontal="$5"
      maxWidth="100%"
      maxHeight={600}
      gap="$0"
    >
      <Table.Head>
        {headerGroups.map((headerGroup) => {
          rowCounter.current++
          return (
            <Table.Row
              rowLocation={
                rowCounter.current === 0
                  ? 'first'
                  : rowCounter.current === allRowsLenght - 1
                    ? 'last'
                    : 'middle'
              }
              key={headerGroup.id}
              justifyContent="flex-start"
            >
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell
                  /* cellLocation={
                    header.id === 'fullName' ? 'first' : header.id === 'role' ? 'last' : 'middle'
                  } */
                  cellLocation={'middle'}
                  key={header.id}
                  borderWidth={0}
                  justifyContent="space-around"
                  {...(header.column.id === 'user_base'
                    ? {
                        flexShrink: 1,
                      }
                    : {
                        flexShrink: 3,
                      })}
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
              hoverStyle={{
                backgroundColor: '$color2',
              }}
              rowLocation={
                rowCounter.current === 0
                  ? 'first'
                  : rowCounter.current === allRowsLenght - 1
                    ? 'last'
                    : 'middle'
              }
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  /* cellLocation={
                     cell.column.id === 'name'
                       ? 'first'
                       : cell.column.id === 'role'
                         ? 'last'
                         : 'middle'
                   } */
                  cellLocation={cell.column.id === 'channelNo' ? 'last' : 'first'}
                  key={cell.id}
                  borderWidth={0}
                  justifyContent={cell.column.id === 'channelNo' ? 'center' : 'flex-start'}
                  {...(cell.column.id === 'user_base'
                    ? {
                        flexShrink: 1,
                      }
                    : {
                        flexShrink: 3,
                      })}
                >
                  {cell.column.id === 'user_base' ? (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  ) : (
                    <Text theme="alt1">
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
  )
}
