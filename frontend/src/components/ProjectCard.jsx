import { useTheme } from '../context/ThemeContext';
const ProjectCard = ({ project }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div
        onClick={() => window.location.href = `projects/${project.id}`}
      style={{
        background: isDark ? '#1f2937'  : 'white',
        color: isDark ? '#f9fafb' : '#111827', 
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        borderLeft: `4px solid ${project.color || '#31acee'}`,
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <h3 style={{ marginBottom: '0.5rem' }}>{project.name}</h3>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
        {project.description || 'No description'}
      </p>
      <span style={{
        background: project.status === 'active' ? '#d1fae5' : '#f3f4f6',
        color: project.status === 'active' ? '#065f46' : '#6b7280',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
      }}>
        {project.status}
      </span>
    </div>
  );
};

export default ProjectCard;