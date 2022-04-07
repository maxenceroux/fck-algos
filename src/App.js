import { useEffect, useState } from "react";
import Album from "./components/Album";
import Genres from "./components/Genres";
import axios from 'axios'
import Curators from "./components/Curators";
import Sidebar from "./components/Sidebar";
import './App.css';
import Header from "./components/Header";

function App() {
  const [album, setAlbum] = useState([])

  const [styles, setStyles] = useState([])
  const [filters, setFilters] = useState([])
  const [curators, setCurators] = useState([])
  const [curatorsFilter, setCuratorsFilters] = useState([])
  const [albumEmbedUrl, setAlbumEmbedUrl] = useState([])
  const genreFilters = (newFilter) => {

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
  const genreCuratorsFilters = (newCuratorFilter) => {

    if (curatorsFilter.includes(newCuratorFilter)) {
      var array = [...curatorsFilter];
      var index = array.indexOf(newCuratorFilter)
      if (index !== -1) {
        array.splice(index, 1);
        setCuratorsFilters(array)
      }
    }
    else {
      setCuratorsFilters(curatorsFilter => [...curatorsFilter, newCuratorFilter])
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const album_url = 'http://localhost:8000/random_album';
      const album_data = await axios.get(album_url)
      setAlbum(album_data.data)
      const album_embed_url = "https://open.spotify.com/embed/album/" + album_data.data.spotify_id + "?utm_source=generator"
      setAlbumEmbedUrl(album_embed_url)
      setAlbum(album_data.data)
      const style_url = 'http://localhost:8000/album_style_genre?album_id=' + album_data.data.id
      const style_data = await axios.get(style_url)
      setStyles(style_data.data["style"])
      const curator_url = 'http://localhost:8000/album_curators?album_id=' + album_data.data.spotify_id
      const curator_data = await axios.get(curator_url)
      setCurators(curator_data.data)
    }
    fetchData()
  }, []
  )

  const handleClick = async () => {
    const params = { 'styles': filters.join(",") }
    const album_data = await axios.get('http://localhost:8000/random_album', { params })
    setAlbum(album_data.data)
    const album_embed_url = "https://open.spotify.com/embed/album/" + album_data.data.spotify_id + "?utm_source=generator"
    setAlbumEmbedUrl(album_embed_url)
    const style_url = 'http://localhost:8000/album_style_genre?album_id=' + album_data.data.id
    const style_data = await axios.get(style_url)
    setStyles(style_data.data["style"])
    const curator_url = 'http://localhost:8000/album_curators?album_id=' + album_data.data.spotify_id
    const curator_data = await axios.get(curator_url)
    setCurators(curator_data.data)
    console.log(albumEmbedUrl)
    console.log(album_data.data.dominant_color)
  }

  return (

    <div style={{ color: album.dominant_color }} className="App">
      <header className="App-header">
        <Header albumColor={album.dominant_color} />
      </header>
      <div className="page">
        <div className="sidebar">
          <Sidebar filters={filters} filtersSelection={genreFilters} curatorFilters={curatorsFilter} curatorFiltersSelection={genreCuratorsFilters} clickBehavior={handleClick} albumColor={album.dominant_color} />
        </div>
        <div className="content">
          <Album album={album} albumEmbedUrl={albumEmbedUrl} />
          <Genres styles={styles} filters={genreFilters} albumColor={album.dominant_color} />
          <Curators curators={curators} curatorFilters={genreCuratorsFilters} />
        </div>
      </div>


    </div>
  );
}

export default App;
