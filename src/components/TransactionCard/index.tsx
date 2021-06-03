import React from 'react';
import { categories } from '../../utils/categories';
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryIcon,
  CategoryName,
  Date,
} from './style';

export type TransactionProps = {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
};

interface TransactionCardProps {
  data: TransactionProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const [category] = categories.filter(item => item.key === data.category);
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <CategoryIcon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
