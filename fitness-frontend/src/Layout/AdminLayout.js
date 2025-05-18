import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div className="container-fluid px-4 mt-4">
        <Outlet /> {/* renders nested routes :) */}
      </div>
    </>
  );
}