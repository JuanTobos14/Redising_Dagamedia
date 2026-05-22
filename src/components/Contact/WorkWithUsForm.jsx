import React, { useState } from 'react';

export default function WorkWithUsForm() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

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
        <label htmlFor="profession">What do you do for a living?</label>
        <select id="profession" name="profession">
          <option value="">Select an option</option>
          <option value="2d-animator">2D Animator</option>
          <option value="3d-animator">3D Animator</option>
          <option value="illustrator">Illustrator</option>
          <option value="modeler">Modeler</option>
          <option value="composer">Composer / Sound Designer</option>
          <option value="voice-actor">Voice Actor</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="message">
          Message <span className="required-asterisk">*</span>
        </label>
        <textarea id="message" name="message" required />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="reelLink">
            Link de Reel <span className="required-asterisk">*</span>
          </label>
          <input type="url" id="reelLink" name="reelLink" required />
        </div>
        
        <div className="form-group file-upload-container">
          <label htmlFor="cvUpload">
            Attach your CV in PDF format <span className="required-asterisk">*</span>
          </label>
          <div className="file-upload-wrapper">
            <label htmlFor="cvUpload" className="custom-file-upload">
              Select file
            </label>
            <input 
              type="file" 
              id="cvUpload" 
              name="cvUpload" 
              accept=".pdf"
              style={{ display: 'none' }} 
              onChange={handleFileChange}
              required
            />
            {fileName && <span className="file-name-display">{fileName}</span>}
          </div>
        </div>
      </div>
      
      <button type="submit" className="submit-btn">Send</button>
    </form>
  );
}

