import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/graphql'; 

export const fetchGraphQL = async (query, variables = {}) => {
    try {
        const response = await axios.post(API_BASE_URL, {
            query,
            variables,
        });
        return response.data.data; 
    } catch (error) {
        console.error('Erreur lors de la requête GraphQL:', error);
        throw error;
    }
};

export const getAllComptes = async () => {
    const query = `
        query {
            allComptes {
                id
                solde
                type
            }
        }
    `;
    return await fetchGraphQL(query);
};

export const addTransaction = async (transaction) => {
    const mutation = `
        mutation($transaction: TransactionRequest!) {
            addTransaction(transaction: $transaction) {
                id
                montant
                type
                date
            }
        }
    `;
    return await fetchGraphQL(mutation, { transaction });
};