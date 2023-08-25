document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("pokemondata.json");
    const data = await response.json();

    const pokemonList = document.getElementById("pokemon-list");
    const pokemonInfo = document.getElementById("pokemon-info");

    displayGenerationPokemon(data[0].Pokemons); // Hiển thị thế hệ đầu tiên mặc định

    const menuLinks = document.querySelectorAll(".nav-link");
    menuLinks.forEach((link, index) => {
        link.addEventListener("click", function () {

            displayGenerationPokemon(data[index].Pokemons);
        });
    });

    function displayGenerationPokemon(pokemons) {
            pokemonList.innerHTML = ""; // Xóa thông tin cũ
            pokemons.forEach(pokemon => {
            const pokemonContainer = document.createElement("div");
            pokemonContainer.classList.add("content", "col-md-2", "text-center", "shadow-lg", "p-3", "mb-5", "rounded");

            const sprite = document.createElement("img");
            sprite.style.width = "80%";
            sprite.src = pokemon.Sprite;
            sprite.classList.add("img-fluid", "enlarge-image");
            sprite.addEventListener("click", function () {
                clearSelectedElements();
                sprite.classList.add("selected-pokemon");
                name.classList.add("selected-element");
                types.classList.add("selected-element");
                displayPokemonInfo(pokemon);
            });

            const name = document.createElement("span");
            name.textContent = `Name: ${pokemon.Name}`;
            name.style.fontSize = "15px";
            name.style.fontStyle = "Times New Roman";
            name.style.fontWeight = "bold";
            name.style.color = "#2769be";
            name.addEventListener("click", function () {
                clearSelectedElements();
                sprite.classList.add("selected-pokemon");
                name.classList.add("selected-element");
                types.classList.add("selected-element");
            });

            const types = document.createElement("span");
            types.textContent = `Types: ${pokemon.Types.join(", ")}`;
            types.style.fontSize = "15px";
            types.style.fontStyle = "Times New Roman";
            types.style.color = "#88447a";
            types.addEventListener("click", function () {
                clearSelectedElements();
                sprite.classList.add("selected-pokemon");
                name.classList.add("selected-element");
                types.classList.add("selected-element");
            });

            pokemonContainer.appendChild(sprite);
            pokemonContainer.appendChild(document.createElement("br"));
            pokemonContainer.appendChild(name);
            pokemonContainer.appendChild(document.createElement("br"));
            pokemonContainer.appendChild(types);
            pokemonContainer.appendChild(document.createElement("br"));
            pokemonList.appendChild(pokemonContainer);
        });
    }

    function clearSelectedElements() {
        const activeElements = document.querySelectorAll(".selected-element");
        activeElements.forEach(activeElement => {
            activeElement.classList.remove("selected-element");
        });
    
        const activeSprites = document.querySelectorAll(".selected-pokemon");
        activeSprites.forEach(activeSprite => {
            activeSprite.classList.remove("selected-pokemon");
        });
    }

    async function displayPokemonInfo(pokemon) {
        console.log(pokemon);
        pokemonInfo.innerHTML = ""; // Xóa thông tin cũ
        var a = pokemon.Url;
        var b = await fetch(a);
        var pokemonjson = await b.json();
        var movejson = pokemonjson.moves;
        var movearray = movejson.map(x => x.move.name);
        console.log(movearray);
        const sprite = document.createElement("img");
        sprite.src = pokemon.Sprite;
        sprite.classList.add("img-fluid");
        sprite.style.width = "100%";
        sprite.style.height = "5%";

        const name = document.createElement("span");
        name.textContent = `Name: ${pokemon.Name}`;
        name.style.fontSize = "15px";
        name.style.fontStyle = "Times New Roman";
        name.style.marginLeft = "70px";
        name.style.marginTop = "0px";
        name.style.fontWeight = "bold"
        name.style.color = "#2769be";

        const types = document.createElement("span");
        types.textContent = `Types: ${pokemon.Types.join(", ")}`;
        types.style.fontSize = "15px";
        types.style.fontStyle = "Times New Roman";
        types.style.marginLeft = "70px";
        types.style.marginTop = "0px";
        types.style.color = "#88447a";

        const moves = document.createElement("span");
        moves.textContent = "Moves:"
        moves.style.marginLeft = "70px";
        moves.style.marginTop = "0px";
        moves.style.color = "#5cb737";
        const moveList = document.createElement("div");
        moveList.style.maxHeight = "150px"; // Đặt chiều cao tối đa cho khung cuộn
        moveList.style.overflowY = "auto"; // Bật thanh cuộn khi danh sách dài
        moveList.style.marginLeft = "25%";

        movearray.forEach(moveName => {
            const moveItem = document.createElement("div");
            moveItem.textContent = moveName;
            moveList.appendChild(moveItem);
        });


        pokemonInfo.appendChild(sprite);
        pokemonInfo.appendChild(document.createElement("br"));
        pokemonInfo.appendChild(name);
        pokemonInfo.appendChild(document.createElement("br"));
        pokemonInfo.appendChild(types);
        pokemonInfo.appendChild(document.createElement("br"));
        pokemonInfo.appendChild(moves);
        pokemonInfo.appendChild(moveList); // Thêm danh sách động tác vào thông tin Pokemon

    }
});
