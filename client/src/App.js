import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import { Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Userprofile from "./component/Userprofile";
import ErrorMessage from "./component/ErrorMessage";
import About from "./component/About";
import Admin from "./component/Admin";
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
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/admin" component={Admin} exact />
          <Route path="/*" component={ErrorMessage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
