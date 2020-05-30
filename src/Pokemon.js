import React from "react";
import useHover from "./hooks/useHover";


const Pokemon = ({pokemon, catchPokemon, spriteSize}) => {

    let dimension = spriteSize * 57;
    const [hoverRef, isHovered] = useHover();

    return (
        <div className={"background " + (isHovered ? "hovered" : "")}>
            <div
                className={
                    "pokemon " +
                    (pokemon.caught ? "caught " : "not-caught ")
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
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
