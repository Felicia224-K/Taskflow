import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { useTheme } from '../context/ThemeContext'
import api from '../services/api';

const Dashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', color: '#6366f1' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, statsRes] = await Promise.all([
        api.get('/api/projects'),
        api.get('/api/dashboard'),
      ]);
      setProjects(projectsRes.data.projects);
      setStats(statsRes.data.stats);
    } catch  {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/projects', newProject);
      setProjects([res.data.project, ...projects]);
      setNewProject({ name: '', description: '', color: '#6366f1' });
      setShowForm(false);
      fetchData();
    } catch (_err) {
      setError(_err.response?.data?.error || 'Failed to create project');
    }
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/api/projects/${projectId}`);
    setProjects(projects.filter(p => p.id !== projectId));
    fetchData();
    } catch {
      setError('Failed to delete project');
    }
  };

  return (
    <Layout>
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Total Projects', value: stats.totalProjects, color: '#6366f1' },
            { label: 'Active Projects', value: stats.activeProjects, color: '#10b981' },
            { label: 'Total Tasks', value: stats.totalTasks, color: '#f59e0b' },
            { label: 'In Progress', value: stats.inProgressTasks, color: '#3b82f6' },
            { label: 'Done', value: stats.doneTasks, color: '#10b981' },
            { label: 'High Priority', value: stats.highPriorityTasks, color: '#ef4444' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: isDark ? '#1f2937' : 'white',
              padding: '1.25rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderTop: `3px solid ${stat.color}`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>My Projects</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateProject} style={{
          background: isDark ? '#1f2937' : 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Project Name</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
            <input
              type="text"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Color</label>
            <input
              type="color"
              value={newProject.color}
              onChange={(e) => setNewProject({ ...newProject, color: e.target.value })}
              style={{ width: '60px', height: '40px', cursor: 'pointer', border: 'none' }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: '#6366f1',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Create Project
          </button>
        </form>
      )}

      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#991b1b',
          padding: '0.75rem',
          borderRadius: '0.375rem',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '3rem' }}>
          No projects yet. Create your first project!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;