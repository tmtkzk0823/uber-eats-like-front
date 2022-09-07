import React from 'react';
// import logo from './logo.svg';
import './App.css';
import  { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Restaurants } from './containers/Restaurants';
import { Foods } from './containers/Foods';
import { Orders } from './containers/Orders';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/restaurants">
          <Restaurants />
        </ Route>
        <Route exact path="/foods">
          <Foods />
        </ Route>
        <Route exact path="/orders">
          <Orders />
        </ Route>
        {/* コンポーネントにmatchというpropsを渡して、設定したPATHに対応するリクエストがあった場合、コンポーネントをリダイレクトする */}
        {/* パラメータとして設定したい部分は:paramsNameという風に : をつける */}
        <Route exact path="/restaurants/:restaurantsId/foods" render = {( {match} ) => <Foods match={match}/> } />
      </Switch>
    </Router>
  );
}

export default App;
