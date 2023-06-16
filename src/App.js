
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

function App() {
  return (
    <>
    <div><Toaster   position="bottom-right"/></div>
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersPage/>} />
            <Route path="/suppliers" element={<SupliersPage/>} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/sales" element={<SalesPage />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
