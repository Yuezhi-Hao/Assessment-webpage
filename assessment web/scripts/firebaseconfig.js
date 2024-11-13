const firebaseConfig = {
    apiKey: "AIzaSyCEyEWpH0p1a884QCI1zWBdJMW5D6MqYl0",
    authDomain: "profile-aab48.firebaseapp.com",
    databaseURL: "https://profile-aab48-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "profile-aab48",
    storageBucket: "profile-aab48.firebasestorage.app",
    messagingSenderId: "5810591291",
    appId: "1:5810591291:web:6bc27338045b42adf9ae1e",
    measurementId: "G-W2WD0ETJWX"
  };
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const todoRef = database.ref("todos");

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
        li.classList.add(todoItem.completed ? 'completed' : '');

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
