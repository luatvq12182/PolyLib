import FPoly, { useState, useEffect } from './lib/FPoly.js';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        // setTimeout(() => {
        //     setCount(count + 1);
        //     setCount(count + 1);
        //     setCount(count + 1);
        // }, 3000);
        // => count sẽ = 2

        setTimeout(() => {
            setCount((count) => count + 1);
            setCount((count) => count + 1);
            setCount((count) => count + 1);
        }, 2000);
        // => count sẽ = 4
    }, []);

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
            <h1>Count: ${count}</h1> 

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
