import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Home from './components/Home';
import AdminLayout from './Layout/AdminLayout'; 
import MemberTable from './components/Admin/MemberTable';
import RequireAuth from './components/Auth/RequireAuth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route path="dashboard" element={<MemberTable />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;