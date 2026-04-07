import { useAuth } from '../context/AuthContext';
const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        background: '#6366f1',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
      }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>TaskFlow</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: "1rem"}}>
            <span>Hello, {user?.name} </span>
            <button
                onClick={handleLogout}
                style={{
                    background: 'white',
                    color: '#6366f1',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}
                >
                    Logout
            </button>

        </div>
      </nav>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;