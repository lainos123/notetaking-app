class Todo {
    constructor(title) {
        this.title = title;
        this.completed = false;
        this.date = new Date().toLocaleString();
    }
}

class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoTitle = document.getElementById('todoTitle');
        this.saveButton = document.getElementById('saveTodo');
        this.todoList = document.getElementById('todoList');
        
        this.saveButton.addEventListener('click', () => this.addTodo());
        this.todoTitle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.displayTodos();
    }

    addTodo() {
        if (this.todoTitle.value.trim() === '') {
            alert('Please enter a task!');
            return;
        }

        const newTodo = new Todo(this.todoTitle.value);
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        this.displayTodos();
        
        // Clear input field
        this.todoTitle.value = '';
    }

    toggleTodo(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveToLocalStorage();
        this.displayTodos();
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.saveToLocalStorage();
        this.displayTodos();
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    displayTodos() {
        this.todoList.innerHTML = '';
        this.todos.forEach((todo, index) => {
            const todoCard = document.createElement('div');
            todoCard.className = `todo-card ${todo.completed ? 'completed' : ''}`;
            todoCard.innerHTML = `
                <h3>${todo.title}</h3>
                <div class="todo-actions">
                    <button onclick="app.toggleTodo(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn" onclick="app.deleteTodo(${index})">Delete</button>
                </div>
            `;
            this.todoList.appendChild(todoCard);
        });
    }
}

// Initialize the app
const app = new TodoApp();
