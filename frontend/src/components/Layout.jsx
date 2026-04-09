import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';


const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const {theme, toggleTheme} = useTheme();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const isDark = theme ==='dark';
   
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: isDark ? '#111827' : '#f9fafb', color: isDark ? '#f9fafb' : '#111827', }}>
      <nav style={{
        background: isDark ? '#1f2937' : '#6366f1',
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
                onClick={toggleTheme}
                style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '0.4rem 0.75rem', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem'}}
            >
                {isDark ? 'Light' : 'Dark'}
            </button>
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