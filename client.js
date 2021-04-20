const socket = io.connect('http://localhost:3000');

//allows users to send message 
socket.on('message', function(message){
  console.log(message)
});

document.querySelector('#message-form').addEventListener('submit', function(error){
  error.preventDefault()

  const message = error.target.elements.chat.value

  socket.emit('sendMessage', message)
});


//elements for form phone number
const Phone_Number = document.querySelector('#phone_number');
const message = document.querySelector('#message');

function getData() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Phone_Number: Phone_Number.value }),
    };
    fetch('/api', options)
      .then((res) => res.json())
      .then(function(data) {
        if (data.status === 'success') {
          message.textContent = 'NOT TRUSTED!';
          message.className = 'red-text';
        } else {
          message.textContent = 'TRUSTED';
          message.className = 'green-text';
        }
    })
    .catch(function(error) {
        console.log(error);
    });
};

document.querySelector('#btn_submit').addEventListener('click', function (error) {
    error.preventDefault();
    getData();
});

