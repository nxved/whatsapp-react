import React, { useState, useEffect } from 'react';

const ViewResponsesPage = () => {
  const [messages, setMessages] = useState([]);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/getmessage');
//       const data = await response.json();
//       console.log(data)

//       if (Array.isArray(data.messages)) {
//         setMessages(prevMessages => [...prevMessages, ...data.messages]);
//       } else if (data.message) {
//         setMessages(prevMessages => [...prevMessages, data.message]);
//       } else {
//         console.error('Invalid server response:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

  useEffect(() => {
   const messageIdsSet = new Set(); // Set to keep track of unique message IDs
 
   const fetchMessages = async () => {
     try {
       const response = await fetch('https://whastapp-node.onrender.com/getmessage');
       const data = await response.json();
 
       if (Array.isArray(data.messages)) {
         // Filter out messages with duplicate IDs
         const uniqueMessages = data.messages.filter(message => !messageIdsSet.has(message.id._serialized));
 
         // Add unique messages to the state and update the set
         setMessages(prevMessages => [...prevMessages, ...uniqueMessages]);
         uniqueMessages.forEach(message => messageIdsSet.add(message.id._serialized));
       } else if (data.message && !messageIdsSet.has(data.message.id._serialized)) {
         // Add the single message to the state and update the set
         setMessages(prevMessages => [...prevMessages, data.message]);
         messageIdsSet.add(data.message.id._serialized);
       } else {
         console.error('Invalid server response:', data);
       }
     } catch (error) {
       console.error('Error fetching messages:', error);
     }
   };
 
   // Fetch messages initially
   fetchMessages();
 
   // Fetch messages every 10 seconds (adjust the interval as needed)
   const interval = setInterval(fetchMessages, 10000);
 
   // Clear the interval when the component is unmounted or dependencies change
   return () => clearInterval(interval);
 }, []); 
 

  const renderMessageRows = () => {
    return messages.map((message, index) => {
      if (message.type === 'image' || message.type === 'status') {
        return null;
      }

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{message.from}</td>
          <td>{message.body}</td>
        </tr>
      );
    }).filter(row => row !== null);  // Filter out null rows
  };

  return (
    <div>
      <h2>View Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Message Body</th>
          </tr>
        </thead>
        <tbody>
          {renderMessageRows()}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResponsesPage;
