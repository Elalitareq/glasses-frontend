import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./pages/login";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import Dashboard from "./pages/dashboard";

function App() {
  return (
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
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
