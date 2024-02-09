import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, Link } from "react-router-dom";
import "./Form.css";

import ele from  "../assets/images/hi.png"


function RegistrationForm() {
  // State to manage the form submission status and the registered username
  const [submitBool, setSubmitBool] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState("");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Function to handle form submission
  const onFormSubmit = (data) => {
    setRegisteredUsername(data.firstName); // Set the registered username
    setSubmitBool(true);
  };

  // Function to render form fields with labels and error messages
  function renderFormField(labelText, name, rules) {
    return (
      <div>
        <label htmlFor={name} className="input-box">
          {labelText}
        </label>
        <br />
        <input
          type={name.includes("password") ? "password" : "text"}
          placeholder={labelText}
          id={name}
          className="input-field"
          {...register(name, rules)}
        />
        {errors[name] && (
          <p className="error-message">
            {errors[name].type === "required" && `${labelText} is required`}
            {errors[name].type === "minLength" &&
              `${labelText} should have a minimum of ${rules.minLength} characters`}
            {errors[name].type === "maxLength" &&
              `${labelText} can only have a maximum of ${rules.maxLength} characters`}
            {errors[name].type === "pattern" &&
              `Enter a valid ${labelText.toLowerCase()}`}
            {errors[name].type === "validate" && "Passwords must match"}
            {name === "password" &&
              errors[name]?.type === "pattern" &&
              "Password must contain at least one number"}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="registration-form">
      <div className="registration-header">
        {/* Logo and link to home */}
        <NavLink to="/" className="home-logo">
          <h2>Kalvium Books</h2>
        </NavLink>
      </div>
      <div className="main-content">
        {submitBool ? (
          <div className="registration-message">
            <h2 className="registration-success">Hi! {registeredUsername}</h2>
            {/* <img
              src="https://assets.stickpng.com/thumbs/5c17903444f5fd02b8cd3b67.png"  // Use the imported image variable
              alt="User Imag"
              className="user-image"
            /> */}
            <img src={ele}/>
            <button id="home">
              <Link to="/" id="link">
                Home
              </Link>
            </button>
          </div>
        ) : (
          // Display the registration form
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="form-container"
          >
            {renderFormField("Name", "firstName", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            {renderFormField("Email", "email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            {renderFormField("Password", "password", {
              required: true,
              minLength: 10,
              pattern: /.*[\W]+.*/i,
            })}
            {renderFormField("Confirm password", "confirmPassword", {
              validate: (value) => value === watch("password"),
            })}
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
