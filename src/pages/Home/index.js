import "./style.css";

import { getAllGames } from '../../services/game-service'
import { useState, useEffect } from 'react'
import { Loader } from '../../components/Loader'
import { Card } from '../../components/Card'

export const Home = () => {

  const [games, setGames] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')

  const getGames = async () => {
    setIsLoading(true)
    try {
      let data = await getAllGames()
      if (data) {
        let result = await data.sort((a, b) => (a.title > b.title) ? 1 : -1)
        setGames(result)
        setFiltered(result)
      }
      setIsLoading(false)
    } catch (message) {
      await (async () => {
        setIsLoading(false)
        setTimeout(function () {
          alert(message)
        }, 500);
      })()
    }
  }

  const handleChange = async (event) => {
    if (event) {
      let value = event.target.value
      setQuery(value)
      setFiltered(games.filter((f) => f.title.toLowerCase().includes(value.toLowerCase())))
    } else {
      setFiltered(games)
    }
  }

  const handleGenreChange = (event) => {
    console.log('selected:', event.target.value)
    setSelectedGenre(event.target.value ?? null)
  };

  const genres = new Map([
    ...filtered.map(game => [game.genre])
  ]);

  const filteredGenres = () => {
    if (!selectedGenre) {
      return filtered;
    }
    return filtered.filter(game => String(game.genre) === selectedGenre);
  };

  useEffect(() => {
    getGames()
  }, [])

  return (
    <article className='article' id='home'>
      <header className="header">
        <h2>APP MASTERS (GAMES)</h2>
      </header>
      <section className='container'>
        <main>
          {isLoading &&
            <Loader />
          }
          {!isLoading &&
            <>
              <input className="search" type="text" value={query} onChange={handleChange} placeholder="search" />
              <select className="dropdown" onChange={handleGenreChange}>
                <option value=''>-- Select genre --</option>
                {[...genres].map(([genre]) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>

              <div className="grid">
                {filtered && filteredGenres().map(item => (
                  <Card key={item.id} data={item} />
                ))}
              </div>
            </>
          }
        </main>
      </section >
    </article >
  )
}
