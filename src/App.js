import React from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from "react-router";
import { createHashHistory } from "history";
import { HomePage } from "./pages/Home";
import { ReportPage } from "./pages/Report";

const history = createHashHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/report" component={ReportPage} />
    </Switch>
  </Router>
);

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
