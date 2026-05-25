import React from 'react';

export default function StandardForm() {
  return (
    <form className="contact-form">
      <div className="form-group">
        <label htmlFor="name">
          Name <span className="required-asterisk">*</span>
        </label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required-asterisk">*</span>
        </label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="contactNumber">Contact number</label>
        <input type="tel" id="contactNumber" name="contactNumber" />
      </div>
      <div className="form-group">
        <label htmlFor="message">
          Message <span className="required-asterisk">*</span>
        </label>
        <textarea id="message" name="message" required />
      </div>
      <button type="submit" className="submit-btn">Send</button>
    </form>
  );
}

