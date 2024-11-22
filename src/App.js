import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import './App.css';
import CompteForm from './components/CompteForm';
import CompteList from './components/CompteList';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql', 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* Section Gestion des Comptes */}
        <div className="section">
          <h2>Gestion des Comptes</h2>
          <CompteForm />
          <CompteList />
        </div>

        {/* Section Gestion des Transactions */}
        <div className="section">
          <h2>Gestion des Transactions</h2>
          <TransactionForm />
          <TransactionList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
