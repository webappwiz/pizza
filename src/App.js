import React, { useState } from 'react'; // Importing React and useState hook      
import axios from 'axios'

function App() {
  const [name, setName] = useState('');    // State for name input
  const [email, setEmail] = useState('');  // State for email input
  const [phone, setPhone] = useState('');  // State for phone input

  // Function to handle form submission
  const handleForm = async (event) => {
    event.preventDefault(); // Prevent page reload
    // Add your form submission logic here
    try{
      const response = await axios.post('http://localhost:3000/register', {name, email,phone});
      console.log(response.data);
    }
    catch(error){console.error(error);

    }
  };
  

  return (
    
      <form onSubmit={handleForm} style={{
          margin: '20% auto',
          padding: '20px',
          maxWidth: '50%',
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#0B5602',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        <label htmlFor="name" style={{ 
          display: 'block', 
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          Name
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            style={{ 
              width: '90%',
              height: '20px',
              padding: '3px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginLeft: '5%',
            }}
          />
        </label>
        
        <label htmlFor="email" style={{ 
          display: 'block', 
          fontWeight: 'bold'
        }}>
          Email
          <input
            id="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            style={{ 
              width: '90%',
              height: '20px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginLeft: '5%',
            }}
          />
        </label>
        
        <label htmlFor="phone" style={{ 
          display: 'block', 
          fontWeight: 'bold'
        }}>
          Phone
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
            style={{ 
              width: '90%',
              height: '20px',
              padding: '3px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginLeft: '5%',
            }}
          />
        </label>
        
        <button 
          type="submit" 
          style={{ 
            width: '80%',
            borderRadius: '10px',
            backgroundColor: 'black',
            border: '1px solid white',
            color: 'white',
            margin: '5px auto',
          }}>
          Send
        </button>
      </form>

  );
}



export default App; // Exporting App as default