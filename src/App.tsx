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
import Users from "./pages/Users";
import SuperCategories from './pages/SuperCategories';
import EditSuperCategories from "./components/SuperCategories/EditSuperCategories";
import Orders from "./pages/Orders";
import OrderItem from "./components/Orders/OrderItem";

function App() {
  return (
      <Switch>
        {/* Home */}
            <Route path={"/"} exact component={Home} />
        {/* Users */}
            <Route path={"/login"} component={Login}/>
            <Route path={"/register"} component={Register}/>
            <Route path={"/profile"} component={Profile} />
            <Route path={"/users"} component={Users}/>
        {/* Super Categories */}
            <Route path={"/supercategories"} exact component={SuperCategories} />
            <Route path={"/supercategories/:id/edit"} component={EditSuperCategories}/>
        {/* Categories */}
            <Route path={"/categories"} exact component={Categories}/>
            <Route path={"/categories/:id/edit"} component={EditCategories}/>
        {/* SubCategories */}
            <Route path={"/subcategories"} exact component={Subcategories}/>
            <Route path={"/subcategories/:id/edit"} component={EditSubcategory}/>
        {/* Brands */}
            <Route path={"/brands"} exact component={Brands} />
            <Route path={"/brands/:id/edit"} component={EditBrand} />
        {/* Products*/}
            <Route path={'/products'} exact component={Products}/>
            <Route path={"/products/:id/edit"} component={EditProduct}/>
            <Route path={"/add-product"} component={AddProduct}/>
          {/* Orders */}
          <Route path={'/orders'} exact component={Orders} />
          <Route path={"/orders/:id/order"} component={OrderItem}/>

      {/* Not Found Page */}
            <Route path={"*"} component={NotFoundPage}/>
      </Switch>
  );
}

export default App;
