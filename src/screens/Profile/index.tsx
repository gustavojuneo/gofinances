import React from 'react'
import { View, TextInput, Button } from 'react-native'

export function Profile() {
  return (
    <View>
      <TextInput placeholder="Nome" autoCorrect={false} />
      <TextInput placeholder="Sobrenome" autoCorrect={false} />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  )
}
