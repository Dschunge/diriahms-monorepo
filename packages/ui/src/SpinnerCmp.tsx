import { Paragraph, Spinner, YStack } from 'tamagui'
export const SpinnerCmp = () => {
  return (
    <YStack padding="$3" space="$4" alignItems="center">
      {/*  <TamaSpinner size="small" color="$green10" /> */}
      <Paragraph>Loading....</Paragraph>
      {/*  <Spinner size="large" color="$orange10" /> */}
    </YStack>
  )
}
