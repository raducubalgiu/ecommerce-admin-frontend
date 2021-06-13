import { Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Subcategories from "./pages/Subcatgories";
import NotFoundPage from "./components/Layout/NotFoundPage";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import EditBrand from "./components/Brands/EditBrand";
import AddProduct from "./components/Products/AddProduct";

function App() {
  return (
      <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

          <Route path="/login">
              <Login />
          </Route>

          <Route path="/register">
              <Register />
          </Route>

          <Route path="/categories">
              <Categories />
          </Route>

          <Route path="/subcategories">
              <Subcategories />
          </Route>

          <Route path="/brands" exact>
              <Brands />
          </Route>

          <Route path="/brands/:id/edit">
              <EditBrand />
          </Route>

          <Route path="/products" exact>
              <Products />
          </Route>

          <Route path="/add-product">
              <AddProduct />
          </Route>

          <Route path="/profile">
              <Profile />
          </Route>

          <Route path="*">
              <NotFoundPage />
          </Route>
      </Switch>
  );
}

export default App;
