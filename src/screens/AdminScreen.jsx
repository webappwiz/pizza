// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminScreen() {
  const [name, setName] = useState('');        // State for name input
  const [email, setEmail] = useState('');      // State for email input
  const [phone, setPhone] = useState('');      // State for phone input
  const [users, setUsers] = useState([]);      // State for fetched users
  const [showUsers, setShowUsers] = useState(false); // State to toggle user list visibility
  const [message, setMessage] = useState('');  // State for feedback messages

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      console.log('Fetched Users Response:', response.data); // Debugging log
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users');
    }
  };

  // Form submission handler
  const handleForm = async (event) => {
    event.preventDefault();

    // Simple client-side validation
    if (!name || !email || !phone) {
      setMessage('Please fill in all the fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        email,
        phone,
      });

      if (response.status === 201) {
        setMessage('User registered successfully!');
        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
        // Refresh users list
        fetchUsers();
      }
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error registering user');
      }
    }
  };

  // Handlers for hover and click events
  const handleMouseEnter = () => {
    setShowUsers(true);
  };

  const handleMouseLeave = () => {
    setShowUsers(false);
  };

  const handleToggleClick = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Registration Form</h1>

      {message && <p style={messageStyle}>{message}</p>}

      <form onSubmit={handleForm} style={formStyle}>
        <label style={labelStyle}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={inputStyle}
            required
          />
        </label>

        <label style={labelStyle}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={inputStyle}
            required
          />
        </label>

        <label style={labelStyle}>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            style={inputStyle}
            required
          />
        </label>

        <button type="submit" style={submitButtonStyle}>
          Register
        </button>
      </form>

      <div
        style={userToggleContainerStyle}
        onMouseEnter={handleMouseEnter}   // Show users on hover
        onMouseLeave={handleMouseLeave}   // Hide users when not hovering
      >
        <button onClick={handleToggleClick} style={toggleButtonStyle}>
          {showUsers ? 'Hide Users' : 'Show Users'}
        </button>

        {showUsers && (
          <div style={userListStyle}>
            <h2 style={subHeaderStyle}>Registered Users</h2>
            <ul style={listStyle}>
              {users.length > 0 ? (
                users.map((user) => (
                  <li key={user._id} style={listItemStyle}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <hr />
                  </li>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  width: '60%',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
  textAlign: 'center',
  fontSize: '28px',
  marginBottom: '20px',
};

const subHeaderStyle = {
  textAlign: 'center',
  fontSize: '22px',
  marginBottom: '15px',
};

const messageStyle = {
  textAlign: 'center',
  color: 'green',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const labelStyle = {
  width: '80%',
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '16px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginTop: '5px',
  fontSize: '16px',
};

const submitButtonStyle = {
  width: '50%',
  padding: '12px',
  borderRadius: '5px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '18px',
  transition: 'background-color 0.3s ease',
};

const toggleButtonStyle = {
  width: '50%',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

const userToggleContainerStyle = {
  textAlign: 'center',
  marginTop: '30px',
  position: 'relative',
};

const userListStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  marginTop: '15px',
  maxHeight: '400px',
  overflowY: 'auto',
};

const listStyle = {
  listStyle: 'none',
  padding: '0',
};

const listItemStyle = {
  padding: '10px 0',
  borderBottom: '1px solid #ddd',
};

export default AdminScreen;