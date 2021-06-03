import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Button, Icon, Title } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface ButtonProps extends RectButtonProps {
  type: 'up' | 'down';
  title: string;
  isSelected: boolean;
}

export function TypeButton({ type, title, isSelected, ...rest }: ButtonProps) {
  return (
    <Container type={type} isSelected={isSelected}>
      <Button {...rest}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
