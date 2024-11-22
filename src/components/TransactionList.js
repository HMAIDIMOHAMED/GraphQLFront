import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionList = () => {
  const { data, loading, error } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p>Chargement des transactions...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div style={styles.container}>
      <h2>Liste des Transactions</h2>
      <ul>
        {data.allTransactions.map((transaction) => (
          <li key={transaction.id} style={styles.item}>
            <p>Montant : {transaction.montant} €</p>
            <p>Type : {transaction.type}</p>
            <p>Date : {transaction.date}</p>
            <p>Compte associé : {transaction.compte.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f7f7f7',
  },
  item: {
    marginBottom: '10px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default TransactionList;
