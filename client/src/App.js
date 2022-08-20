import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import { Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Userprofile from "./component/Userprofile";
import ErrorMessage from "./component/ErrorMessage";
import About from "./component/About";
import Contact from "./component/Contact";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/profile" component={Userprofile} exact />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/*" component={ErrorMessage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
