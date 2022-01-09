import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CreateSpace from "./pages/CreateSpace";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyListings from "./pages/MyListings";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import ResultsMap from "./pages/ResultsMap";
import Search from "./pages/Search";
import SearchAddressCreate from "./pages/SearchAddressCreate";
import Signup from "./pages/Signup";
import SingleListing from "./pages/SingleListing";
import Space from "./pages/Space";

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
          <Container maxW="container.lg" centerContent>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/results" component={Results} />
              <Route exact path="/map" component={ResultsMap} />
              <Route exact path="/space" component={Space} />
              <Route exact path="/createSpace" component={CreateSpace} />
              <Route exact path="/listing/:id" component={SingleListing} />
              <Route
                exact
                path="/searchCreate"
                component={SearchAddressCreate}
              />
              <Route exact path="/myListings" component={MyListings} />

              <Route component={NoMatch} />
            </Switch>
          </Container>
          <Footer />
        </Flex>
      </Router>
    </ApolloProvider>
  );
}

export default App;
