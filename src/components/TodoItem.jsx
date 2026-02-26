const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className="todo-text">{todo.text}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
                ID: {todo.id}
            </span>
            <button
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete "${todo.text}"`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
            </button>
        </li>
    );
};

export default TodoItem;
