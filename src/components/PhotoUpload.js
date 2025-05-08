import React, { useState } from 'react';
import axios from 'axios';

function PhotoUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photo', photo);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/photos/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Photo uploaded successfully!');
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert('Photo upload failed!');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload Photo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default PhotoUpload;
