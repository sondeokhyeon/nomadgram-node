import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo-hooks"
import client from "./Apollo/Client";
import App from './Components/App';

ReactDOM.render(
<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
