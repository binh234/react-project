import React from "react";
import { Link } from 'react-router-dom';
import user from "../images/user.png";

const ContactCard = (props) => {
    let {id, name, email} = props.contact;
    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link to={`/contact/${id}`} state={{contact:props.contact}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <div className="right floated">
                <i 
                className="trash alternate outline icon" 
                style={{color: "red", marginTop: "7px", marginLeft: "10px", display: "inline-block"}}
                onClick={() => props.clickHandler(id)}
                ></i>
                <Link to={`/contact/edit/${id}`} state={{contact:props.contact}}>
                    <i 
                    className="edit alternate outline icon" 
                    style={{color: "blue", marginTop: "7px", display: "inline-block"}}
                    ></i>
                </Link>
            </div>
        </div>
    );
}

export default ContactCard;