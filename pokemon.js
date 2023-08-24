document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("data.json"); 
    const data = await response.json();

    const pokemonList = document.getElementById("pokemon-list");
    const pokemonInfo = document.getElementById("pokemon-info");

    displayGenerationPokemon(data[0].Pokemons); // Hiển thị thế hệ đầu tiên mặc định

    const menuLinks = document.querySelectorAll(".nav-link");
    menuLinks.forEach((link, index) => {
        link.addEventListener("click", function() {
            displayGenerationPokemon(data[index].Pokemons);
        });
    });

    function displayGenerationPokemon(pokemons) {
        pokemonList.innerHTML = ""; // Xóa thông tin cũ

        pokemons.forEach(pokemon => {
            const pokemonContainer = document.createElement("div");
            pokemonContainer.classList.add("content", "col-md-2", "text-center", "shadow-lg", "p-3", "mb-5", "rounded");

            const sprite = document.createElement("img");
            sprite.src = pokemon.Sprite;
            sprite.classList.add("img-fluid");
            sprite.addEventListener("click", function() {
                displayPokemonInfo(pokemon);
            });

            pokemonContainer.appendChild(sprite);
            pokemonContainer.appendChild(document.createElement("br"));

            pokemonList.appendChild(pokemonContainer);
        });
    }

    function displayPokemonInfo(pokemon) {
        
        pokemonInfo.innerHTML = ""; // Xóa thông tin cũ

        const sprite = document.createElement("img");
        sprite.src = pokemon.Sprite;
        sprite.classList.add("img-fluid");

        const name = document.createElement("span");
        name.textContent = `Name: ${pokemon.Name}`;
        name.style.fontSize = "15px";
        name.style.fontStyle = "Times New Roman";

        const types = document.createElement("span");
        types.textContent = `Types: ${pokemon.Types.join(", ")}`;
        types.style.fontSize = "15px";
        types.style.fontStyle = "Times New Roman";

        pokemonInfo.appendChild(sprite);
        pokemonInfo.appendChild(document.createElement("br"));
        pokemonInfo.appendChild(name);
        pokemonInfo.appendChild(document.createElement("br"));
        pokemonInfo.appendChild(types);
    }
});
