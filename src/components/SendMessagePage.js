import React, { useState } from 'react';

const SendMessagePage = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');

  const handleNumberChange = (event) => {
    setRecipients(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
   const numbers = recipients.split('\n').map(number => number.trim());
 
   numbers.forEach(async number => {
     try {
       const response = await fetch('https://whastapp-node.onrender.com/sendmessage', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           number,
           message
         })
       });
 
       const data = await response.json();
       console.log('Message sent to:', number);
       console.log('Response:', data.msg);
     } catch (error) {
       console.error('Error sending message to', number, error);
     }
   });
 };
 

  return (
    <div>
      <h2>Send Message</h2>

      <div>
        <label htmlFor="recipients">Recipients (numbers separated by line break):</label>
        <textarea
          id="recipients"
          value={recipients}
          onChange={handleNumberChange}
          rows={5}
          cols={30}
        />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          rows={5}
          cols={30}
        />
      </div>

      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default SendMessagePage;
