import useLocalStorage from "./hooks/useLocalStorage";
import initialPkmn from "./initialPkmn";
import React from 'react';
import "bulma/css/bulma.min.css";
import Pokemon from "./Pokemon";
import './App.css';

function PkmnYellowApp() {

  const [pkmn, setPkmn] = useLocalStorage("pkmn", initialPkmn);
  // const [pkmn, setPkmn] = useState(initialPkmn);
  const [spriteSize, setSpriteSize] = useLocalStorage("sprite-size", 2);

  const catchPokemon = id => {
      let p = pkmn[id];
      p.caught = !p.caught;
      setPkmn({[id]: p, ...pkmn});
  };

  const resetState = () => {
      if (window.confirm("You sure, dawg?")) {
          setPkmn(JSON.parse(JSON.stringify(initialPkmn)));
      }
  };

  return (
      <div className="pkmn-app">
          <div className="controls">
              <div className="option">
                  <button
                      className="button is-small"
                      onClick={resetState}
                  >
                      Reset
                  </button>
              </div>
              <div className="option">
                  <label htmlFor="points">Sprite Size: {spriteSize}</label>
                  <input
                      type="range"
                      className="slider is-fullwidth"
                      id="sprite-size"
                      name="sprite-size"
                      min="1"
                      max="10"
                      value={spriteSize}
                      onChange={e => setSpriteSize(e.target.value)}
                  />
              </div>
          </div>
          <div className="pkmn-container section">
              {Object.keys(pkmn).map(pokemonId => {
                  let pokemon = pkmn[pokemonId];
                  return <Pokemon
                      key={pokemon.id}
                      pokemon={pokemon}
                      catchPokemon={catchPokemon}
                      spriteSize={spriteSize}
                  />
              })}
          </div>
      </div>
  );
}

export default PkmnYellowApp;
