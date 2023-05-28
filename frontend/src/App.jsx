// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>OtterBit</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [artistSongs, setArtistSongs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:1200/api/v1/songs/${searchInput}`);
      setArtistSongs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>OtterBeat</h1>
      <input
        type="text"
        placeholder="Enter artist's name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h2>Songs</h2>
        {artistSongs.map((song) => (
          <div key={song.song_id}>
            <p>ID: {song.song_id}</p>
            <p>Title: {song.song_title}</p>
            <p>Duration: {song.song_duration}</p>
            <p>Release Year: {song.song_releaseYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
