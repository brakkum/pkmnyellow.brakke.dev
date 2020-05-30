
const initialPkmn = {};

for (let i = 1; i <= 151; i ++) {
    initialPkmn[i] = {
        "id": i,
        "sprite": `/images/${i.toString().padStart(3, '0')}.png`,
        "caught": false
    }
}

export default initialPkmn;
