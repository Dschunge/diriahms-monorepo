'use client'

import { getQueryClient } from '@diriahms/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { HomeScreen } from 'app/features/home/screen'
import { hotels } from '@diriahms/api'
import { useParams, useRouter } from 'solito/navigation'

export default function HomePage() {
  const { id } = useParams()
  const queryClient = getQueryClient()
  const { data } = useSuspenseQuery(hotels)

  console.log({ id })

  //return <HomeScreen />
}
