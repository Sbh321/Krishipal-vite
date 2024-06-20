import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { Provider } from "react-redux";
import store from "./store.js";

import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShopScreen from "./screens/ShopScreen.jsx";
import ProductsScreen from "./screens/ProductsScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";

import UserListScreen from "./screens/admin/UserListScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";

import AdminHome from "./dashboard/components/AdminHome.jsx";
import UserList from "./dashboard/components/UserList.jsx";
import ProductList from "./dashboard/components/ProductList.jsx";
import OrderList from "./dashboard/components/OrderList.jsx";

import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import DashboardRoute from "./routes/DashboardRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
        <Route path="/shop/products" element={<ProductsScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          {/* <Route path="/profile" element={<ProfileScreen />} /> */}
        </Route>

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route
            path="/admin/productlist/:pageNumber"
            element={<ProductListScreen />}
          />
          {/* <Route path="/admin/addproduct" element={<AddProductScreen />} /> */}
          {/* <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          /> */}
          <Route path="/admin/userlist" element={<UserListScreen />} />
          {/* <Route path="/admin/user/:id/edit" element={<UserEditScreen />} /> */}
        </Route>

        <Route path="" element={<DashboardRoute />}>
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route path="/admin/dashboard/users" element={<UserList />} />
          <Route path="/admin/dashboard/products" element={<ProductList />} />
          <Route path="/admin/dashboard/orders" element={<OrderList />} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
