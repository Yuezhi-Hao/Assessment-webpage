
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("successful");
        })
        .catch((error) => {
            alert("false：" + error.message);
        });
}


function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("login successful");
        })
        .catch((error) => {
            alert("login false：" + error.message);
        });
}


function logout() {
    firebase.auth().signOut().then(() => {
        alert("logout");
    }).catch((error) => {
        alert("logout false：" + error.message);
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
       
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("comment-section").style.display = "block";
        loadComments();
    } else {
       
        document.getElementById("auth-container").style.display = "block";
        document.getElementById("comment-section").style.display = "none";
    }
});


function postComment() {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("Please login");
        return;
    }

    const commentText = document.getElementById("comment-text").value;
    if (commentText.trim() === "") {
        alert("Not empty");
        return;
    }

    const commentData = {
        uid: user.uid,
        username: user.email,
        text: commentText,
        timestamp: new Date().toISOString()
    };

    firebase.database().ref("comments").push(commentData)
        .then(() => {
            document.getElementById("comment-text").value = "";
            alert("successful");
        })
        .catch((error) => {
            alert("False：" + error.message);
        });
}


function loadComments() {
    const commentsRef = firebase.database().ref("comments");
    commentsRef.on("value", (snapshot) => {
        const commentsDiv = document.getElementById("comments");
        commentsDiv.innerHTML = "";

        snapshot.forEach((childSnapshot) => {
            const comment = childSnapshot.val();
            const commentElement = document.createElement("div");
            commentElement.innerHTML = `<strong>${comment.username}</strong>: ${comment.text}`;
            commentsDiv.appendChild(commentElement);
        });
    });
}