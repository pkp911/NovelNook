import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; // Import Form for better structure
import "./Buynow.css"; // Import the CSS file for styling

function Buynow() {
  const [name, setname] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add any form validation or additional logic here
    toast.success("Book has been successfully booked"); // Show toast notification
    setTimeout(() => {
      navigate("/search"); // Redirect to homepage after 2 seconds
    }, 2000);
  };

  return (
    <div className="buy-now-container">
      <h3>Enter Delivery Details</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="pinCode">Pin Code</Form.Label>
          <Form.Control
            type="text"
            id="pinCode"
            placeholder="Enter your Pin Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
          <Form.Control
            type="tel"
            id="phoneNumber"
            placeholder="Enter your Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="address">Address</Form.Label>
          <Form.Control
            as="textarea"
            id="address"
            placeholder="Enter your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="state">State</Form.Label>
          <Form.Control
            type="text"
            id="state"
            placeholder="Enter your State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="confirm-button">
          Confirm Purchase
        </Button>
      </Form>
    </div>
  );
}

export default Buynow;
