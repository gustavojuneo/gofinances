import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../contexts/hooks/useAuth';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn() {
  const theme = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível conectar com a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível conectar com a conta Apple');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              svg={AppleSvg}
              title="Entrar com Apple"
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="small"
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
