import React from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const src = "https://pokeapi.co/api/v2/pokemon";
  const [pokelist, setPokelist] = React.useState([]);

  React.useEffect(() => {
    const pokelistInterceptor = axios.interceptors.request.use(
      function (conf) {
      if (conf.url === src) {
        conf.params = conf.params ? conf.params : {};
        conf.params.limit = 151;
      }
      return conf;
    });
  }, [src]);

  React.useEffect(() => {
    axios.get(src)
      .then(response => {
        setPokelist(response.data.results);
      });
  }, [src]);

  return (
    <div className="App">
      {pokelist.map((pokelist, index) => (
        <div key={index}>
            <div>
              <p>{pokelist.name}</p>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
            </div>
        </div>
      ))}
    </div>
  );
}