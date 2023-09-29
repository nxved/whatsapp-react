import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

const AddAccountPage = () => {
  const [numbers, setNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddAccount = async () => {
    try {
      const response = await axios.get('https://whastapp-node.onrender.com/checkready');
      if (response.status === 200) {
        setNumbers([...numbers, { number: newNumber, dateAdded: new Date(), status: 'Active' }]);
        setNewNumber('');
        setQrCodeVisible(false);
      } else {
        console.log('Number Not Added');
      }
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get('https://whastapp-node.onrender.com/getqr');
        setQRCodeData(response.data.qr);
        setQrCodeVisible(true);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    if (qrCodeVisible) {
      fetchQRCode();
    }
  }, [qrCodeVisible]);

  return (
    <div className="container">
      <div className="section">
        <h2>Add Account</h2>
        <div className="input-group">
          <label htmlFor="number">WhatsApp Number:</label>
          <input
            type="text"
            id="number"
            value={newNumber}
            onChange={handleNumberChange}
          />
          <button onClick={() => setQrCodeVisible(true)}>Generate QR Code</button>
        </div>

        {qrCodeVisible && (
          <div className="qr-section">
            <h3>Scan the QR Code to link your WhatsApp app</h3>
            <div className="qr-code">
              <QRCode value={qrCodeData} />
            </div>
            <button onClick={handleAddAccount}>Add Account</button>
          </div>
        )}
      </div>

      <div className="section">
        <h3>Added Numbers:</h3>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Mobile Number</th>
              <th>Date Added</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((num, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{num.number}</td>
                <td>{num.dateAdded.toLocaleString()}</td>
                <td>{num.status}</td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAccountPage;
