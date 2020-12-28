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
    const [backgroundColor, setBackgroundColor] = useLocalStorage("background-color", "#00ff00");
    const [showOptions, setShowOptions] = useLocalStorage("show-options", true);
    const [fontSize, setFontSize] = useLocalStorage("font-size", 16);

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
        <div className="pkmn-app" style={{backgroundColor: backgroundColor}}>
            <div className="has-text-centered">
                <span onClick={() => setShowOptions(!showOptions)} style={{cursor: "pointer"}}>
                    {showOptions ? "Hide" : "Show"} options
                </span>
            </div>
            {showOptions &&
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
                        <label style={{display: "block", textAlign: "center"}} htmlFor="points">Sprite Size</label>
                        <input
                            type="number"
                            className="input is-small is-fullwidth"
                            id="sprite-size"
                            name="sprite-size"
                            min=".25"
                            max="10"
                            step=".01"
                            value={spriteSize}
                            onChange={e => setSpriteSize(e.target.value)}
                        />
                    </div>
                    <div className="option">
                        <label style={{display: "block", textAlign: "center"}} htmlFor="font-size">Font Size</label>
                        <input
                            type="number"
                            className="input is-small is-fullwidth"
                            id="font-size"
                            name="font-size"
                            min="10"
                            step="1"
                            value={fontSize}
                            onChange={e => setFontSize(e.target.value)}
                        />
                    </div>
                    <div className="option">
                        <label style={{display: "block", textAlign: "center"}} htmlFor="color">Background Color</label>
                        <input
                            type="color"
                            className="input is-small is-fullwidth"
                            id="color-picker"
                            value={backgroundColor}
                            onChange={e => setBackgroundColor(e.target.value)}
                        />
                    </div>
                </div>
            }
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
                <div
                    className="pokemon"
                    style={{margin: "auto"}}
                >
                    <div className="sprite" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // width: `${(spriteSize * 57) * 2}px`,
                        height: `${spriteSize * 57}px`,
                        padding: "3px",
                        textAlign: "center",
                        fontSize: `${fontSize}px`,
                    }}>
                        {pkmnCaught} of {pkmn.length}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PkmnYellowApp;
