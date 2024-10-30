import { useState } from 'react'
import './App.css'
import Register from './components/Register.jsx'
import Success from './components/Success.jsx'
//import { Switch, Route} from 'react-router-dom';

function App() {
  

  return (
    <>
    <Register />
    </>
  );
}

export default App


/* <Switch>
      <Route exact path= "/">
      <Register/>
      </Route>
      <Route exact path ="/main">
        <Success/>
      </Route>
    </Switch>*/