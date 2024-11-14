// Select DOM Elements
const addTodoBtn = document.getElementById('add-todo-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Add TODO Item to Firebase
addTodoBtn.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const newTodoRef = todoRef.push();
        newTodoRef.set({
            text: todoText,
            completed: false,
            date: new Date().toLocaleString()
        });
        todoInput.value = '';
    }
});

// Listen for Data and Display
todoRef.on('value', (snapshot) => {
    todoList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const todoItem = childSnapshot.val();
        const todoKey = childSnapshot.key;
        
        const li = document.createElement('li');
        if (todoItem.completed) {
            li.classList.add('completed');
        };
        
        // Display the task text
        const todoTextSpan = document.createElement('span');
        todoTextSpan.textContent = todoItem.text;
        li.appendChild(todoTextSpan);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            const newText = prompt("Edit your task:", todoItem.text);
            if (newText) {
                todoRef.child(todoKey).update({
                    text: newText,
                    date: new Date().toLocaleString()
                });
            }
        });
        li.appendChild(editBtn);

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            todoRef.child(todoKey).update({
                completed: !todoItem.completed
            });
        });
        li.appendChild(completeBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            todoRef.child(todoKey).remove();
        });
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
});
