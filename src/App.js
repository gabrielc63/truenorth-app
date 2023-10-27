import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Logout from "./features/auth/Logout";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import RecordsList from "./features/records/recordsList";
import OperationsForm from "./features/operations/operationsForm";
import CustomNavbar from "./components/Navbar";

function App() {
  return (
    <>
      <CustomNavbar />
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="welcome" element={<Welcome />} />
              <Route path="users/:user_id/records" element={<RecordsList />} />
              <Route path="operations" element={<OperationsForm />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
