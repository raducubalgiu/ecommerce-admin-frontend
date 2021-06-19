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
import EditCategories from "./components/Categories/EditCategories";
import EditSubcategory from "./components/Subcategories/EditSubcategory";
import EditProduct from "./components/Products/EditProduct";

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

          <Route path={'/categories'} exact component={Categories} />

          <Route path="/categories/:id/edit">
              <EditCategories />
          </Route>

          <Route path="/subcategories" exact>
              <Subcategories />
          </Route>

          <Route path="/subcategories/:id/edit">
              <EditSubcategory />
          </Route>

          <Route path={"/brands"} exact component={Brands} />

          <Route path="/brands/:id/edit">
              <EditBrand />
          </Route>

          <Route path={'/products'} exact component={Products}/>

          <Route path="/products/:id/edit">
              <EditProduct />
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
