// 注册新用户
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("注册成功！");
        })
        .catch((error) => {
            alert("注册失败：" + error.message);
        });
}

// 用户登录
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("登录成功！");
        })
        .catch((error) => {
            alert("登录失败：" + error.message);
        });
}

// 用户登出
function logout() {
    firebase.auth().signOut().then(() => {
        alert("已登出");
    }).catch((error) => {
        alert("登出失败：" + error.message);
    });
}

// 监听用户登录状态变化
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // 用户已登录
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("comment-section").style.display = "block";
        loadComments();
    } else {
        // 用户未登录
        document.getElementById("auth-container").style.display = "block";
        document.getElementById("comment-section").style.display = "none";
    }
});

// 发表评论
function postComment() {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("请先登录！");
        return;
    }

    const commentText = document.getElementById("comment-text").value;
    if (commentText.trim() === "") {
        alert("评论内容不能为空！");
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
            alert("评论发布成功！");
        })
        .catch((error) => {
            alert("发布失败：" + error.message);
        });
}

// 加载评论
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