import { TransactionListProps } from '../screens/Dashboard';

export function getLastTransactionDate(
  collection: TransactionListProps[],
  type: 'positive' | 'negative',
) {
  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime()),
    ),
  );

  return lastTransaction.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
  });
}
