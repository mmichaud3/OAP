import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Home from './Pages/Home';

const client = new ApolloClient({
    uri: 'https://api.graphqlplaceholder.com'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    );
}

export default App;
