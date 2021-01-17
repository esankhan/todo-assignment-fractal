import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Links from "./Components/Links";
import Home from "./Components/Home";
import List from "./Components/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Links />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/lists" exact component={List} />
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default App;
