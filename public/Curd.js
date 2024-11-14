
const addTodoBtn = document.getElementById('add-todo-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');


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


todoRef.on('value', (snapshot) => {
    todoList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const todoItem = childSnapshot.val();
        const todoKey = childSnapshot.key;
        
        const li = document.createElement('li');
        if (todoItem.completed) {
            li.classList.add('completed');
        };
        
      
        const todoTextSpan = document.createElement('span');
        todoTextSpan.textContent = todoItem.text;
        li.appendChild(todoTextSpan);

       
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

    
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            todoRef.child(todoKey).update({
                completed: !todoItem.completed
            });
        });
        li.appendChild(completeBtn);

     
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            todoRef.child(todoKey).remove();
        });
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
});
