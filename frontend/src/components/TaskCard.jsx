const priorityColors = {
  low: { bg: '#dbeafe', text: '#1e40af' },
  medium: { bg: '#fef3c7', text: '#92400e' },
  high: { bg: '#fee2e2', text: '#991b1b' },
};

const statusColors = {
  todo: { bg: '#f3f4f6', text: '#374151' },
  in_progress: { bg: '#dbeafe', text: '#1e40af' },
  done: { bg: '#d1fae5', text: '#065f46' },
};

const TaskCard = ({ task, onStatusChange }) => {
  const priority = priorityColors[task.priority] || priorityColors.medium;
  const status = statusColors[task.status] || statusColors.todo;

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.5rem',
      padding: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '0.75rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ marginBottom: '0.25rem' }}>{task.title}</h4>
        <span style={{
          background: priority.bg,
          color: priority.text,
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
          fontSize: '0.7rem',
          fontWeight: 'bold',
        }}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
          {task.description}
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          style={{
            background: status.bg,
            color: status.text,
            border: 'none',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {task.dueDate && (
          <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;