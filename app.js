window.onload = function() {
  const form  = document.getElementById('message-form')
  const messageField = document.getElementById('message')
  const messageList = document.getElementById('messages')
  const socketStatus = document.getElementById('status')
  const closeBtn = document.getElementById('close')

  let socket = new WebSocket('ws://echo.websocket.org')

  console.log(socket)

  socket.onopen = function(event) {
    console.log(event);
    socketStatus.innerHTML = 'Conneted to: ' + event.currentTarget.url
    socketStatus.className - 'open'
  }

  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error)
  }

  form.onsubmit = function(event) {
    event.preventDefault()

    let message = messageField.value

    socket.send(message)
    messageList.innerHTML +=
      '<li class="sent"><span>Sent: </span>'
        + message + ' at: ' + Date.now()
      '</li>'
    messageField.value = ''

    return false
  }

  socket.onmessage = function(event) {
    let message = event.data

    messageList.innerHTML +=
      '<li class="received"><span>Received: </span>'
        + message + ' at: ' + Date.now()
      '</li>'
  }

  closeBtn.onclick = function(event) {
    event.preventDefault()
    socket.close()

    return false
  }
}
