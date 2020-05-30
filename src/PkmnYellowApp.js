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
        let p = pkmn[id - 1];
        p.caught = !p.caught;
        let newPkmn = pkmn;
        newPkmn[id - 1] = p;
        setPkmn([...newPkmn]);
    };

    const resetState = () => {
        if (window.confirm("You sure, dawg?")) {
            setPkmn(JSON.parse(JSON.stringify(initialPkmn)));
        }
    };

    // let pkmnCaught = 0;
    let pkmnCaught = pkmn.reduce((pkmnCaught, pokemon) => {
        if (!pokemon) return 0;
        return pokemon.caught === true ? pkmnCaught + 1 : pkmnCaught;
    }, 0);

    return (
        <div className="pkmn-app">
            <div className="controls">
                <div className="option">
                    {pkmnCaught} of {pkmn.length}
                </div>
                <div className="option">
                    <button
                        className="button is-small"
                        onClick={resetState}
                    >
                        Reset
                    </button>
                </div>
                <div className="option">
                    <label style={{display: "block", textAlign: "center"}} htmlFor="points">Sprite Size: {spriteSize}</label>
                    <input
                        type="range"
                        className="slider is-fullwidth"
                        id="sprite-size"
                        name="sprite-size"
                        min=".25"
                        max="10"
                        step=".25"
                        value={spriteSize}
                        onChange={e => setSpriteSize(e.target.value)}
                    />
                </div>
            </div>
            <div className="pkmn-container section">
                {pkmn && pkmn.map(pokemon => {
                    if (!pokemon) return null;
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
