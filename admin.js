let selectedUser = null;

function loadUserList() {
  const chat = JSON.parse(localStorage.getItem("chat")) || {};
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  Object.keys(chat).forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "chat_list";
    userDiv.innerHTML = `
      <div class="chat_people">
        <div class="chat_ib">
          <h5>${user}</h5>
        </div>
      </div>
    `;
    userDiv.onclick = () => {
      selectedUser = user;
      loadAdminChat();
    };
    userList.appendChild(userDiv);
  });
}

function loadAdminChat() {
  if (!selectedUser) return;
  const chat = JSON.parse(localStorage.getItem("chat")) || {};
  const messages = chat[selectedUser] || [];
  const chatBox = document.getElementById("adminChat");
  chatBox.innerHTML = "";

  messages.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = msg.from === selectedUser ? "incoming_msg" : "outgoing_msg";
    msgDiv.innerHTML = `
      <div class="${msg.from === selectedUser ? "received_msg" : "sent_msg"}">
        <p>${msg.message}</p>
      </div>
    `;
    chatBox.appendChild(msgDiv);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendAdminMessage() {
  if (!selectedUser) return;
  const messageInput = document.getElementById("adminMessageInput");
  const message = messageInput.value.trim();

  if (message !== "") {
    const chat = JSON.parse(localStorage.getItem("chat")) || {};
    if (!chat[selectedUser]) chat[selectedUser] = [];
    chat[selectedUser].push({ from: "admin", message });
    localStorage.setItem("chat", JSON.stringify(chat));
    messageInput.value = "";
    loadAdminChat();
  }
}

loadUserList();
setInterval(() => {
  loadUserList();
  loadAdminChat();
}, 1000);
