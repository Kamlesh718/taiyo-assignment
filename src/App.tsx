import { Link, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ContactsPage from "./pages/ContactsPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ContactsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="p-6">
            Not found.{" "}
            <Link to="/" className="text-blue-600">
              Go home
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
