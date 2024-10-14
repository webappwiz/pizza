import React from "react";
import "./App.css";
import Navigation from "./navigation/Navigation";
import Modal from "react-modal"; // 'Modal' should start with a capital 'M'
import { AuthProvider } from "./Authcontext";

// Set the app element for accessibility (required for react-modal)
Modal.setAppElement('#root');

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Modal isOpen={false}> {/* Add props to the Modal component */}
        {/* Modal content goes here */}
      </Modal>
    </AuthProvider>
  );
}

export default App;