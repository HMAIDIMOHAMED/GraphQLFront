import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPTES } from '../graphql/queries';

const CompteList = () => {
  const { data, loading, error } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p>Chargement des comptes...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div style={styles.container}>
      <h2>Liste des Comptes</h2>
      <ul>
        {data.allComptes.map((compte) => (
          <li key={compte.id} style={styles.item}>
            <p>Type : {compte.type}</p>
            <p>Solde : {compte.solde} €</p>
            <p>Date de création : {compte.dateCreation}</p>
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

export default CompteList;
