import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
	ApolloProvider,
	ApolloClient,
	NormalizedCacheObject,
	InMemoryCache
} from '@apollo/client';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import BookDetails from './pages/BookDetails';
import AddAuthor from './pages/AddAuthor';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache()
});

function App() {
	return (
		<Router>
			<ApolloProvider client={client}>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/add" component={AddBook} />
						<Route path="/:id/edit" component={EditBook} />
						<Route path="/:id/view" component={BookDetails} />
						<Route path="/author/add" component={AddAuthor} />
					</Switch>
				</Layout>
			</ApolloProvider>
		</Router>
	);
}

export default App;
