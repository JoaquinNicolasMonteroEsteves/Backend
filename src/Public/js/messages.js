const socket = io()

const chatBox = document.getElementById("chatBox")
const chatBoxForm = document.getElementById("chatBoxForm")
const messageLogs = document.getElementById("messageLogs")

chatBoxForm.addEventListener('submit', e => {
    e.preventDefault()
    if(chatBox.value.trim().length > 0){
    let userMail = chatBoxForm.title
    let msg = chatBox.value.trim()
    
    fetch(`/api/messages/${userMail}/${msg}`, {
        method: "POST",
        headrs: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.ok) {
            result.json()
            .then(user => {
                socket.emit('message', {user: user.first_name, msg: msg})
                chatBox.value = ''
            })
        }
    })
    
    }
})

socket.on('messageLogs', data => {
    let logs = ''
    data.forEach(m => {
        logs += `${m.user}: ${m.msg}<br/>`
    })
    messageLogs.innerHTML = logs
})