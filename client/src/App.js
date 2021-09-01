import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import Landing from "./components/Landing"
import Home from "./components/Home"
import NewDog from "./components/NewDog"
import DogDetails from "./components/DogDetail"


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/dog" component={NewDog}/>
        <Route exact path="/home/:id" component={DogDetails}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
