import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from 'react';
import Receipe from './Receipe';



function App() {

  const App_Id = "ebb576ef";
  const App_Key = "0f2a626089e48196842e52652f3470b0";
  const exmapleRequest = `https://api.edamam.com/search?q=chicken&app_id=${App_Id}&app_key=${App_Key}`;

  const [receipies, setReceipies] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    getReceipies()
  }, [query])

  const getReceipies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`)
    const data = await response.json();
    setReceipies(data.hits);
    console.log(data.hits);
  }

  const updateSearch = (event) => {
    setSearch(event.target.value)
  }

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar ' type='text' value={search} onChange={updateSearch}></input>
        <button className='search-button ' type='submit'>Search</button>
        {exmapleRequest}
      </form>
      {receipies && Array.isArray(receipies) && receipies.length > 0 ? (
        receipies.map(receipe => (
          <Receipe key={receipe.recipe.title} title={receipe.recipe.title}
            calories={receipe.recipe.calories} image={receipe.recipe.image}
            ingredients={receipe.receipe.ingredients} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div >
  );
}

export default App;
