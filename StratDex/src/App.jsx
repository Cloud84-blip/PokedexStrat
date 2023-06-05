import './styles/App.css'
import React, { useEffect } from 'react'
import { callPokemonapi } from './apiCalls'
import { useState } from 'react'
import Pokemon from './Pokemon'

function App() {
  const [count, setCount] = useState(0)
  const [pokemon, setPokemon] = useState([])
  const [current_gen, setCurrentGen] = useState("generation-i")
  const genMap = {
    "generation-i": "https://pokeapi.co/api/v2/pokemon?limit=151",
    "generation-ii": "https://pokeapi.co/api/v2/pokemon?limit=100&offset=151",
    "generation-iii": "https://pokeapi.co/api/v2/pokemon?limit=135&offset=251",
    "generation-iv": "https://pokeapi.co/api/v2/pokemon?limit=107&offset=386",
    "generation-v": "https://pokeapi.co/api/v2/pokemon?limit=156&offset=493",
    "generation-vi": "https://pokeapi.co/api/v2/pokemon?limit=72&offset=649",
    "generation-vii": "https://pokeapi.co/api/v2/pokemon?limit=88&offset=721",
    "generation-viii": "https://pokeapi.co/api/v2/pokemon?limit=89&offset=809"
  }

  const handleClick = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    console.log("useEffect")
    const LoadFirstGen = async () => {
      console.log(genMap[current_gen])
      const pokemon = await callPokemonapi(genMap[current_gen])
      setPokemon(pokemon)
    }
    LoadFirstGen()
  }, [])

  const handleChange = () => {
    const gen = document.getElementById("Select").value
    setCurrentGen(gen)
    const url = genMap[current_gen]
    const LoadGenClick = async () => {
      const pokemon = await callPokemonapi(url)      
      setPokemon(pokemon)
    }
    LoadGenClick()
  }
  return (
    <>
      <div className="App">
        <h1>Count: {count}</h1>
        <button onClick={handleClick}>Click Me</button>
        <select name='Gen' onChange={handleChange} id="Select">
          <option value="generation-i">Gen 1</option>
          <option value="generation-ii">Gen 2</option>
          <option value="generation-iii">Gen 3</option>
          <option value="generation-iv">Gen 4</option>
          <option value="generation-v">Gen 5</option>
          <option value="generation-vi">Gen 6</option>
          <option value="generation-vii">Gen 7</option>
          <option value="generation-viii">Gen 8</option>
        </select>
        <ul>
          {pokemon.map((pokemon, index) => {
            return <Pokemon key={pokemon.name} index={index+1} name={pokemon.name} url={pokemon.url} gen={current_gen} />
          })}
        </ul>
      </div>
    </>
  )
}

export default App
