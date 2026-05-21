import React from 'react';

export default function WorkWithUsForm() {
  return (
    <form>
      <h2>Work with us</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="profession">Profession</label>
        <select id="profession" name="profession">
          <option value="">Select a profession</option>
        </select>
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
      </div>
      <div>
        <label htmlFor="reelLink">Reel link</label>
        <input type="url" id="reelLink" name="reelLink" />
      </div>
      <div>
        <label htmlFor="cvUpload">CV file upload</label>
        <input type="file" id="cvUpload" name="cvUpload" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
