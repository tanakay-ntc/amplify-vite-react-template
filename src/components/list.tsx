import React, { useState, useEffect } from 'react';
import { list } from 'aws-amplify/storage';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await list({
          path: 'public/'
        });
        setFiles(result.items); 
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h1>File List</h1>
      {error && <p>Error fetching files: {error}</p>}
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.path} - Last modified: {new Date(file.lastModified).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;

