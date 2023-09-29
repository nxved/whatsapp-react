import React, { useState, useEffect } from 'react';
import styles from '../styles/styles'


const Dashboard = () => {
  const [accountsCount, setAccountsCount] = useState(0);
  const [messagesSentCount, setMessagesSentCount] = useState(0);
  const [messagesReceivedCount, setMessagesReceivedCount] = useState(0);

  // Simulated data fetching and setting counts
  useEffect(() => {
    // Simulate fetching data from an API or database
    const fetchCounts = () => {
      // Simulated counts
      setAccountsCount(0); // Replace with your actual data
      setMessagesSentCount(0); // Replace with your actual data
      setMessagesReceivedCount(0); // Replace with your actual data
    };

    fetchCounts();
  }, []);

  useEffect(() => { 
   const fetchCounts = async () => {
     try {
       const response = await fetch('https://whastapp-node.onrender.com/count');
       const data = await response.json();
       console.log(data)
       setAccountsCount(data.accountCount);
      setMessagesSentCount(data.receivedMsgCount);
      setMessagesReceivedCount(data.sendMsgCount); 
     } catch (error) {
       console.error('Error fetching messages:', error);
     }
   };
 
   fetchCounts();
 
   const interval = setInterval(fetchCounts, 10000);
 
   // Clear the interval when the component is unmounted or dependencies change
   return () => clearInterval(interval);
 }, []); 
  return (
   <div style={styles.container}>
     <h2 style={styles.heading}>Dashboard</h2>
    {!accountsCount && <p style={styles.infoItem}>Add Account to See Stats</p> }

     <div style={styles.info}>
       <p style={styles.infoItem}>Count of Accounts / Numbers added: {accountsCount ? accountsCount : "Loading"}</p>
       <p style={styles.infoItem}>Total count of messages sent: {messagesSentCount ? messagesSentCount: "Loading"}</p>
       <p style={styles.infoItem}>Total count of messages received: {messagesReceivedCount ? messagesReceivedCount : "Loading"}</p>
     </div>
   </div>
 );
 
};

export default Dashboard;
