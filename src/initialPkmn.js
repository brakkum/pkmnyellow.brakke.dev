
const initialPkmn = [];

for (let i = 1; i <= 151; i ++) {
    initialPkmn[i - 1] = {
        "id": i,
        "sprite": `/images/${i.toString().padStart(3, '0')}.png`,
        "caught": false,
        "nickname": "",
    }
}

export default initialPkmn;
