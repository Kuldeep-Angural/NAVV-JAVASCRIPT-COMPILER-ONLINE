import React from 'react';

const SaveModal = ({ setShowSaveModal, saveAsFile, saveToBrowserStorage }) => {
  return (
    <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h3>Save options</h3>
        <p>Choose where to keep your code.</p>
        <div className="modal-actions">
          <button onClick={saveAsFile}>Save as file</button>
          <button onClick={saveToBrowserStorage}>Save in browser</button>
          <button className="secondary" onClick={() => setShowSaveModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
