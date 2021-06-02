import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface ButtonProps extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isSelected: boolean;
}

export function TypeButton({ type, title, isSelected, ...rest }: ButtonProps) {
  return (
    <Container {...rest} type={type} isSelected={isSelected}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  );
}
