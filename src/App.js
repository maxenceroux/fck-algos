import { useEffect, useState } from "react";
import Album from "./components/Album";
import Genres from "./components/Genres";
import Filters from "./components/Filters";
import axios from 'axios'


function App() {
  const [album, setAlbum] = useState([])

  const [styles, setStyles] = useState([])
  const [filters, setFilters] = useState([])
  const genreFilters = (newFilter) => {
    // setFilters(genrefiltersdata);
    if (filters.includes(newFilter)) {
      var array = [...filters];
      var index = array.indexOf(newFilter)
      if (index !== -1) {
        array.splice(index, 1);
        setFilters(array)
      }
    }
    else {
      setFilters(filters => [...filters, newFilter])
    }
  }
  useEffect(() => {
    const url = 'http://localhost:8000/random_album';
    fetch(url).then(resp => resp.json()).then(resp => setAlbum(resp))
  }, []
  )
  useEffect(() => {
    console.log(album)
    const url = 'http://localhost:8000/album_style_genre?album_id=' + album.id;
    fetch(url).then(resp => resp.json()).then(resp => setStyles(resp["style"]));
  }, []
  )
  const handleClick = async () => {
    const data = await axios.get('http://localhost:8000/random_album')
    setAlbum(data.data)
    console.log(album)
    const url = 'http://localhost:8000/album_style_genre?album_id=' + album.id;
    fetch(url).then(resp => resp.json()).then(resp => setStyles(resp["style"]));
  }
  console.log(filters)
  return (
    <div className="App">
      <header className="App-header">
        <h1> Hello </h1>
        <button onClick={handleClick}>get albums</button>
        <Album album={album} />
        <Genres styles={styles} filters={genreFilters} />
        <Filters filters={filters} />
      </header>
    </div>
  );
}

export default App;
