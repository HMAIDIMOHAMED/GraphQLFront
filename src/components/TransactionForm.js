import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_COMPTES, ADD_TRANSACTION } from '../graphql/queries';

const TransactionForm = () => {
  const [compteId, setCompteId] = useState('');
  const [montant, setMontant] = useState('');
  const [type, setType] = useState('Depot');
  const [message, setMessage] = useState('');

  const { data: comptesData, loading: comptesLoading } = useQuery(GET_ALL_COMPTES);
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    onCompleted: () => {
      setMessage('Transaction ajoutée avec succès !');
      setCompteId('');
      setMontant('');
      setType('Depot');
    },
    onError: () => {
      setMessage('Erreur lors de l’ajout de la transaction.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      variables: {
        transaction: {
          compteId,
          montant: parseFloat(montant),
          date: new Date().toISOString(),
          type,
        },
      },
    });
  };

  if (comptesLoading) return <p>Chargement des comptes...</p>;

  return (
    <div style={styles.container}>
      <h2>Ajouter une Transaction</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Compte :</label>
          <select
            value={compteId}
            onChange={(e) => setCompteId(e.target.value)}
            style={styles.select}
          >
            <option value="">Sélectionner un compte</option>
            {comptesData.allComptes.map((compte) => (
              <option key={compte.id} value={compte.id}>
                {compte.type} - {compte.solde} €
              </option>
            ))}
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Montant :</label>
          <input
            type="number"
            placeholder="Entrez le montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Type :</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.select}
          >
            <option value="Depot">Dépôt</option>
            <option value="Retrait">Retrait</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Ajouter
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: 'green',
  },
};

export default TransactionForm;
