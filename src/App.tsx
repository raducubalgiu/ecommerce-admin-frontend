import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './pages/Home/Index';
import LoginAdmin from "./pages/Admin/LoginAdmin";
import RegisterAdmin from "./pages/Admin/RegisterAdmin";
import IndexAdmin from "./pages/Admin/IndexAdmin";

function App() {
  return (
    <div className="App">
      <Switch>
            <Route path="/" exact>
              <Index />
            </Route>

          <Route path="/admin" exact>
              <IndexAdmin />
          </Route>

          <Route path="/admin/login">
              <LoginAdmin />
          </Route>

          <Route path="/admin/register">
              <RegisterAdmin />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
