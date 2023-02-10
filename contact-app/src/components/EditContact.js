import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContactDetail = (props) => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    id: state.contact.id,
    name: state.contact.name,
    email: state.contact.email
  });
  console.log(state);
  console.log(contact);

  const update = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
        alert("All the fields are mandatory");
        return;
    }
    console.log(contact);
    props.updateContactHandler(contact);
    setContact({id: contact.id, name: "", email: ""});
    navigate("/");
  }

  return (
    <div className="ui main">
      <h2>Update Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ id: contact.id, name: e.target.value, email:contact.email })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({id: contact.id, name: contact.name, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default ContactDetail;
