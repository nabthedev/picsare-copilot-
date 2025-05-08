import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/photos');
        setPhotos(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h1>PicShare</h1>
      {photos.map((photo) => (
        <div key={photo.id}>
          <h2>{photo.title}</h2>
          <img src={`http://localhost:3000/${photo.photoUrl}`} alt={photo.title} />
          <p>Author: {photo.user?.username}</p>
          <p>Uploaded on: {new Date(photo.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MainPage;
