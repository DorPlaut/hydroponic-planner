import React from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';

const ListActions = ({ materials }) => {
  // Function to copy the list to the clipboard
  const handleCopy = () => {
    const text = materials
      .map(
        (section) =>
          `${section.title}:\n` +
          section.items
            .map((item, index) => `  ${index + 1}. ${item}`)
            .join('\n')
      )
      .join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Materials list copied to clipboard!');
    });
  };

  // Function to download the list as a text file
  const handleDownload = () => {
    const text = materials
      .map(
        (section) =>
          `${section.title}:\n` +
          section.items
            .map((item, index) => `  ${index + 1}. ${item}`)
            .join('\n')
      )
      .join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'materials-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="list-actions">
      <button className="btn list-btn" onClick={handleCopy}>
        <FiCopy />
      </button>
      <button className="btn list-btn" onClick={handleDownload}>
        <FiDownload />
      </button>
    </div>
  );
};

export default ListActions;
