import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_COMPTE, GET_ALL_COMPTES } from '../graphql/queries';

const CompteForm = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState('COURANT');
  const [message, setMessage] = useState('');

  const [dateCreation, setDateCreation] = useState(new Date().toISOString());

  const [saveCompte] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
    onCompleted: (data) => {
      console.log('Compte ajouté avec succès:', data.saveCompte);
      setMessage('Compte ajouté avec succès !');
      setSolde('');
      setType('COURANT');
      setDateCreation(new Date().toISOString());  
    },
    onError: (error) => {
      console.error('Erreur lors de l’ajout du compte:', error);
      setMessage('Erreur lors de l’ajout du compte.');
    },
  });

  const { data, loading, error } = useQuery(GET_ALL_COMPTES);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formattedDate = new Date(dateCreation).toISOString(); 
      console.log("Date de création envoyée:", formattedDate);  
  
      const { data } = await saveCompte({
        variables: {
          compte: {
            solde: parseFloat(solde),
            dateCreation: formattedDate,  
            type: type,
          },
        },
      });
      console.log('Compte créé:', data.saveCompte);
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Ajouter un Nouveau Compte</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Solde :</label>
          <input
            type="number"
            placeholder="Entrez le solde"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Type de compte :</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.select}
          >
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Ajouter
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <h3>Liste des Comptes</h3>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur: {error.message}</p>
      ) : (
        data && data.allComptes && data.allComptes.length > 0 ? (
          <ul>
            {data.allComptes.map((compte) => (
              <li key={compte.id}>
                {compte.type} - {compte.solde} (Créé le : {compte.dateCreation})
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun compte trouvé.</p>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    maxWidth: '500px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
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

export default CompteForm;
