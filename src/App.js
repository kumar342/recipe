import React, {useEffect, useState} from 'react';
import Recipe from './receipe';


export default function App() {
  const APP_ID = "e4034a17";
  const APP_KEY = "91e2b716d4a8cbb458ebc2199d3ffbc0";

  const [recipes, setRecipe] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(()=> {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const appCall = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await appCall.json();
    console.log(data);
    
    setRecipe(data.hits);
    console.log(data.hits);
   
    }
    const updateSearch = (e) => {
      setSearch(e.target.value);
       console.log(search);  
    };
  
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search)
  }

  return (
    <div className="App">
      <center>
         <form onSubmit={updateQuery} className="search-form" >
           <input  className="search-bar" type="text" value={search} onChange={updateSearch} />
           <button  className="search-button" type="submit" >Search</button>
                     
           </form>
           
           {recipes.map(recipe =>(
             <Recipe 
             key={recipe.recipe.label}
             title={recipe.recipe.label} 
             calories={recipe.recipe.calories} 
             image={recipe.recipe.image}/>
             
             ))};
      </center>
    </div>
  )
}

