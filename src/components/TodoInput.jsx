import { useState } from 'react';

const TodoInput = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form className="todo-input-group" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                aria-label="New todo text"
            />
            <button type="submit" className="add-btn">
                Add
            </button>
        </form>
    );
};

export default TodoInput;
