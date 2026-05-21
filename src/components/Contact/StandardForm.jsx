import React from 'react';

export default function StandardForm() {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact number</label>
        <input type="tel" id="contactNumber" name="contactNumber" />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
