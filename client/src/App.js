import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import ResultsMap from "./pages/ResultsMap";
import Search from "./pages/Search";
import SearchAddressCreate from "./pages/SearchAddressCreate";
import Signup from "./pages/Signup";
import SingleListing from "./pages/SingleListing";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          minHeight="100vh"
        >
          <Header />
          {/* <Container maxW="container.lg" centerContent> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/map" component={ResultsMap} />
            <Route exact path="/createListing" component={CreateListing} />
            <Route exact path="/editListing/:id" component={EditListing} />
            <Route exact path="/listing/:id" component={SingleListing} />
            <Route exact path="/searchCreate" component={SearchAddressCreate} />

            <Route component={NoMatch} />
          </Switch>
        </Flex>
      </Router>
    </ApolloProvider>
  );
}

export default App;
