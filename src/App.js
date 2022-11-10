import FPoly, { useState, useEffect } from './lib/FPoly.js';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data.slice(0, 10)));
    }, []);

    useEffect(() => {
        console.log(todos);
    }, [todos]);

    const onAddTodo = (payload) => {
        setTodos([...todos, payload]);
    };

    const onDeleteTodo = (id) => {
        const newTodoList = todos.filter(
            (todo) => Number(todo.id) !== Number(id)
        );

        setTodos(newTodoList);
    };

    return `
        <div>
            ${TodoForm({
                onAddTodo,
            })}

            ${TodoList({
                todos,
                onDeleteTodo,
            })}
        </div>
    `;
};

FPoly.render(App, document.getElementById('root'));
