import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const Profile = () => {
  const { user, login, token } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [form, setForm] = useState({ name: user?.name || '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const updates = {};
      if (form.name) updates.name = form.name;
      if (form.password) updates.password = form.password;

      const res = await api.put('/api/auth/profile', updates);
      login(token, res.data.user);
      setSuccess('Profile updated successfully!');
      setForm({ name: res.data.user.name, password: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: `1px solid ${isDark ? '#374151' : '#d1d5db'}`,
    borderRadius: '0.375rem',
    fontSize: '1rem',
    boxSizing: 'border-box',
    background: isDark ? '#111827' : 'white',
    color: isDark ? '#f9fafb' : '#111827',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: isDark ? '#f9fafb' : '#111827',
  };

  return (
    <Layout>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: isDark ? '#f9fafb' : '#111827',
        }}>
           
          My Profile
        </h1>
           
           <a href="/dashboard"
          style={{
              background: '#f3f4f6',
              color: '#374151',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              marginLeft: '25rem',
              
          }}
           >
            Back
          </a>
        <div style={{
          background: isDark ? '#1f2937' : 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem',
            background: isDark ? '#111827' : '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: isDark ? '#f9fafb' : '#111827' }}>
                {user?.name}
              </div>
              <div style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>
                {user?.email}
              </div>
            </div>
          </div>

          {success && (
            <div style={{
              background: '#d1fae5',
              color: '#065f46',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '0.875rem',
            }}>
              {success}
            </div>
          )}

          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#991b1b',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '0.875rem',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Change Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Change Your Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your new password"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;