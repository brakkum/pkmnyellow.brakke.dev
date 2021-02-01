import useLocalStorage from "./hooks/useLocalStorage";
import initialPkmn from "./initialPkmn";
import React, {useState} from 'react';
import "bulma/css/bulma.min.css";
import Pokemon from "./Pokemon";
import pkmnNames from "./pkmnNames";
import {useInterval} from "./hooks/useInterval";

function PkmnYellowApp() {

    const [pkmn, setPkmn] = useLocalStorage("pkmn", initialPkmn);
    // const [pkmn, setPkmn] = useState(initialPkmn);
    const [spriteSize, setSpriteSize] = useLocalStorage("sprite-size", 2);
    const [backgroundColor, setBackgroundColor] = useLocalStorage("background-color", "#00ff00");
    const [showOptions, setShowOptions] = useLocalStorage("show-options", true);
    const [fontSize, setFontSize] = useLocalStorage("font-size", 16);
    const [dataKey, setDataKey] = useLocalStorage("data-key", "");
    const [isSpectator, setIsSpectator] = useState(false);

    const getDKeyParam = () => {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        return params.get("dkey");
    };

    const isProd = () => window.location.href.includes("pkmnyellow");
    const hasDatabaseRecord = dataKey !== "";
    const apiBaseUrl = isProd() ? "" : "http://pkmndev:8888";
    const dKey = getDKeyParam();
    if (!isSpectator && dKey) {
        let key = !dataKey ? getDKeyParam() : dataKey;
        fetch(`${apiBaseUrl}/get_pokemon_data.php?key=${key}`, {
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setPkmn(json.data);
                }
            })
            .catch(e => console.log(e))
        setIsSpectator(true);
    }

    useInterval(() => {
        if (isSpectator) {
            let key = !dataKey ? getDKeyParam() : dataKey;
            fetch(`${apiBaseUrl}/get_pokemon_data.php?key=${key}`, {
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        setPkmn(json.data);
                    }
                })
                .catch(e => console.log(e))
        }
    }, 1_000);

    const updateRecord = () => {
        fetch(`${apiBaseUrl}/set_pokemon_data.php`, {
            method: "post",
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "key": dataKey,
                "data": pkmn,
            }),
        }).then().catch(e => console.log(e))
    };

    const catchPokemon = id => {
        let p = pkmn[id - 1];
        p.caught = !p.caught;
        let newPkmn = pkmn;
        newPkmn[id - 1] = p;
        setPkmn([...newPkmn]);
        if (hasDatabaseRecord) {
            updateRecord();
        }
    };

    const resetState = () => {
        if (window.confirm("You sure, dawg?")) {
            setPkmn(JSON.parse(JSON.stringify(initialPkmn)));
            setDataKey("");
        }
    };

    const nicknamePokemon = id => {
        let p = pkmn[id - 1];
        let name = window.prompt(`Set name for ${pkmnNames[id - 1]}`, p.nickname);
        p.nickname = name ? name : "";
        let newPkmn = pkmn;
        newPkmn[id - 1] = p;
        setPkmn([...newPkmn]);
        if (hasDatabaseRecord) {
            updateRecord();
        }
    };

    // const downloadData = async () => {
    //     let output = `\n`;
    //     pkmn.forEach((p, i) => {
    //         output += `${pkmnNames[i]}\n`;
    //         if (p.nickname) {
    //             output += `Nickname: ${p.nickname}\n`;
    //         }
    //         output += `Caught: ${p.caught}\n`;
    //         output += `\n`;
    //     });
    //     await save(output, "pkmn-yellow.txt");
    // };

    const getDataKeyInfo = () => {
        fetch(`${apiBaseUrl}/get_new_data_key.php`)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setDataKey(json.key);
                }
            }).catch(e => console.log(e))
    }

    // let pkmnCaught = 0;

    if (!pkmn) {
        return (
            <h1>One sec...</h1>
        )
    }

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
                    {!isSpectator && <div className="option">
                        <button
                            className="button is-small"
                            onClick={resetState}
                        >
                            Reset
                        </button>
                    </div>}
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
                    {!isSpectator && <div className="option">
                        {
                            dataKey ?
                                `Shareable Tracker: https://pkmnyellow.brakke.dev/?dkey=${dataKey}`
                                :
                                <button
                                    className="button is-small"
                                    onClick={getDataKeyInfo}
                                >
                                    Share Tracker Data
                                </button>
                        }
                    </div>}
                </div>
            }
            <div className="pkmn-container section">
                {pkmn && pkmn.map(pokemon => {
                    if (!pokemon) return null;
                    return <Pokemon
                        key={pokemon.id}
                        pokemon={pokemon}
                        catchPokemon={catchPokemon}
                        nicknamePokemon={nicknamePokemon}
                        spriteSize={spriteSize}
                        isSpectator={isSpectator}
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
