import { useEffect } from '../lib/FPoly.js';

const TodoList = ({ todos, onDeleteTodo }) => {
    useEffect(() => {
        const btns = document.querySelectorAll('.btn-delete');

        [...btns].forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');

                onDeleteTodo(id);
            });
        });
    });

    return `
        <ul id="todo-list">
            ${todos
                .map((todo) => {
                    return `
                        <li>
                            <span>${todo.title}</span> <button class="btn-delete" data-id="${todo.id}">Delete</button>
                        </li>
                    `;
                })
                .join('')}
        </ul>
    `;
};

export default TodoList;
