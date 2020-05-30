import React from "react";
import useHover from "./hooks/useHover";


const Pokemon = ({pokemon, catchPokemon, spriteSize}) => {

    let dimension = spriteSize * 57;
    const [hoverRef, isHovered] = useHover();

    return <div
        className={
            "pokemon " +
            (pokemon.caught ? "caught " : "") +
            (isHovered ? "hovered" : "")
        }
        ref={hoverRef}
        onClick={() => catchPokemon(pokemon.id)}
    >
        <div
            className="sprite"
            style={{
                width: `${dimension}px`,
                height: `${dimension}px`,
                backgroundImage: `url(${pokemon.sprite})`,
            }}
        >
            <span className="pokemon-id">{pokemon.id}</span>
        </div>
    </div>
};

export default Pokemon;
