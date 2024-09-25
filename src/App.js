import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please upload a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAudioData(response.data.audio_data);
      setError('');
    } catch (err) {
      setError('Failed to upload file');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Upload a Music File</h1>
      <input type="file" accept=".mp3,.wav" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {audioData && (
        <div>
          <h3>Audio Data:</h3>
          <pre>{JSON.stringify(audioData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
