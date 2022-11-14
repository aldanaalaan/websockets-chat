const socket = io();

// DOM Elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", () => {
    if (username.value.trim() != "" && message.value.trim() != "") {
        socket.emit("chat:message", {
            username: username.value,
            message: message.value,
        });
        message.value = "";
    }
});

message.addEventListener("focus", () => {
    if (username.value.trim() != "") {
        socket.emit("chat:escribiendo", {
            username: username.value,
        });
    }
});
message.addEventListener("blur", () => {
    socket.emit("chat:escribiendo:stop", {
        username: username.value,
    });
});
message.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if (username.value.trim() != "" && message.value.trim() != "") {
            socket.emit("chat:message", {
                username: username.value,
                message: message.value,
            });
            message.value = "";
            message.blur();
        }
    }
});

socket.on("chat:message", (data) => {
    output.innerHTML += `<p ${
        data.username == username.value ? 'class="mine"' : 'class="other"'
    }>
        <strong>${data.username}: </strong> ${data.message}
    </p>`;
});

socket.on("chat:escribiendo", (data) => {
    actions.innerHTML += `<p><strong>${data.username} </strong>está escribiendo\.\.\.</p>`;
});

socket.on("chat:escribiendo:stop", (data) => {
    actions.innerHTML = null;
});

const Prueba = (Numero) => {
    for (let index = 0; index < Numero; index++) {
        socket.emit("chat:message", {
            username: "Test",
            message: "Hello World!",
        });
    }
};
