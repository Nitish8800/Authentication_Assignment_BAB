import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import { Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Userprofile from "./component/Userprofile";
import ErrorMessage from "./component/ErrorMessage";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Userprofile} />
          <Route path="*" component={ErrorMessage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
