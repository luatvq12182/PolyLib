import { useEffect } from '../lib/FPoly.js';

const TodoForm = ({ onAddTodo }) => {
    useEffect(() => {
        const form = document.getElementById('form');
        const input = document.getElementById('input');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!input.value) {
                alert('Không được để trống!');
                return;
            }

            onAddTodo({
                id: Date.now(),
                title: input.value,
            });
        });
    });

    return `
        <form id='form'>
            <input id='input' />
            <button>Add to list</button>
        </form>
    `;
};

export default TodoForm;
