import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./pages/login";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import Dashboard from "./pages/dashboard";
import CustomersPage from "./pages/customers";
import SupliersPage from "./pages/suppliers";
import UserPage from "./pages/users";
import ProductsPage from "./pages/products";
import SalesPage from "./pages/sales";
import { Toaster } from "react-hot-toast";
import TestPage from "./pages/test";
import Product from "./pages/product";
import Invoice from "./pages/Invoice/invoice";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <div className="bg-[#eee] h-screen">
      <div>
        <Toaster position="bottom-right" />
      </div>
      <BrowserRouter>
        <AuthProvider
          authType={"localstorage"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === "https:"}
        >
          <Routes>
            <Route
              path={"/"}
              element={
                <RequireAuth loginPath={"/login"}>
                  <Layout>
                    <Outlet />
                  </Layout>
                </RequireAuth>
              }
            >
              <Route path="/" element={<Dashboard/>} />
              <Route path="/admin" element={<Admin/>} />

              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/suppliers" element={<SupliersPage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/invoice/:saleId" element={<Invoice />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/test" element={<TestPage />} />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
