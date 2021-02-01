import React, {useState} from "react";


const Pokemon = ({pokemon, catchPokemon, nicknamePokemon, spriteSize, isSpectator}) => {

    let dimension = spriteSize * 57;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={"background " + (isHovered ? "hovered" : "")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={
                    "pokemon " +
                    (pokemon.caught ? "caught " : "not-caught ")
                }
            >
                {!isSpectator && isHovered ?
                    <div
                        className="pokemon-items"
                    >
                        <div
                            className="pokemon-item catch"
                            onClick={() => catchPokemon(pokemon.id)}
                        >
                            {pokemon.caught ? "Release" : "Catch"}
                        </div>
                        <div
                            className="pokemon-item nickname"
                            onClick={() => nicknamePokemon(pokemon.id)}
                        >
                            {pokemon.nickname ? "Name" : "Name"}
                        </div>
                    </div>
                    :
                    ""
                }
                {pokemon.nickname ?
                    <div className="pokemon-nickname" style={{fontSize: `${spriteSize*9}px`}}>
                        {pokemon.nickname}
                    </div>
                    :
                    ""
                }
                <div
                    className="sprite"
                    style={{
                        width: `${dimension}px`,
                        height: `${dimension}px`,
                        backgroundImage: `url(${pokemon.sprite})`,
                    }}
                >
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
