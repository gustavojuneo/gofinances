import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Category, Icon } from './styles'

interface CategorySelectProps extends RectButtonProps {
  title: string
}

export function CategorySelectButton({
  title,
  onPress,
  testID,
}: CategorySelectProps) {
  return (
    <Container testID={testID} onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
