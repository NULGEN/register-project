import { useState } from 'react'
import './App.css'
import Register from './components/Register.jsx'
import Success from './components/Success.jsx'
import Login from './components/Login.jsx';
import { Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <div>
    <Switch>
      <Route exact path= "/">
      <Login/>
      </Route>
      <Route path ="/success">
        <Success/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
