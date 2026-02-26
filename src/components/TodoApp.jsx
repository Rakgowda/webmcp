import { useState, useEffect, useRef } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoApp = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Enable WebMCP flag in Chrome', completed: true },
        { id: 2, text: 'Explore the Model Context API', completed: false },
    ]);

    // Use refs to always have the latest state in the WebMCP callbacks
    const todosRef = useRef(todos);
    useEffect(() => {
        todosRef.current = todos;
    }, [todos]);

    const addTodo = (text) => {
        if (!text.trim()) return;
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos(prev => [...prev, newTodo]);
        return newTodo;
    };

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    // WebMCP Integration
    useEffect(() => {
        if (window.navigator.modelContext) {
            console.log('WebMCP detected, registering tools...');

            window.navigator.modelContext.provideContext({
                tools: [
                    {
                        name: 'add_todo_item',
                        description: 'Adds a new task to the todo list.',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                text: { type: 'string', description: 'The text content of the todo item' }
                            },
                            required: ['text']
                        },
                        execute: ({ text }) => {
                            const item = addTodo(text);
                            return {
                                content: [{ type: 'text', text: `Successfully added todo: "${text}"` }]
                            };
                        }
                    },
                    {
                        name: 'toggle_todo_completion',
                        description: 'Toggles the completion status of a todo item by its ID.',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                id: { type: 'number', description: 'The unique ID of the todo item' }
                            },
                            required: ['id']
                        },
                        execute: ({ id }) => {
                            toggleTodo(id);
                            return {
                                content: [{ type: 'text', text: `Toggled completion for todo with ID ${id}` }]
                            };
                        }
                    },
                    {
                        name: 'delete_todo_item',
                        description: 'Removes a todo item from the list by its ID.',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                id: { type: 'number', description: 'The unique ID of the todo item to delete' }
                            },
                            required: ['id']
                        },
                        execute: ({ id }) => {
                            deleteTodo(id);
                            return {
                                content: [{ type: 'text', text: `Deleted todo with ID ${id}` }]
                            };
                        }
                    }
                ]
            });

            // Cleanup on unmount
            return () => {
                if (window.navigator.modelContext.clearContext) {
                    window.navigator.modelContext.clearContext();
                }
            };
        } else {
            console.warn('WebMCP API not found. Please ensure you are in Chrome 146+ with the experimental flag enabled.');
        }
    }, []);

    return (
        <div className="card">
            <h1>WebMCP Tasks</h1>
            <TodoInput onAdd={addTodo} />
            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
            {todos.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                    No tasks yet. Create one above!
                </p>
            )}
        </div>
    );
};

export default TodoApp;
