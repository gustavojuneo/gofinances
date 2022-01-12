import React, { useState } from 'react'
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/useAuth'

import { InputForm } from '../../components/Form/InputForm'
import { Button } from '../../components/Form/Button'
import { TypeButton } from '../../components/Form/TypeButton'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'

import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles'

interface FormData {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um preço')
    .positive('O preço não pode ser negativo')
    .required('O Preço é obrigatório'),
})

export function Register() {
  const { user } = useAuth()
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) })

  function handleTransactionType(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleCloseModalSelectCategory() {
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []
      const formattedData = [...currentData, newTransaction]

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData))
      reset()
      setTransactionType('')
      setCategory({ key: 'category', name: 'Categoria' })
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionType('positive')}
                isSelected={transactionType === 'positive'}
              />
              <TypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionType('negative')}
                isSelected={transactionType === 'negative'}
              />
            </TransactionTypes>
            <CategorySelectButton
              testID="button-category"
              title={category.name}
              onPress={() => setCategoryModalOpen(true)}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal
          testID="modal-category"
          statusBarTranslucent={true}
          visible={categoryModalOpen}
        >
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
