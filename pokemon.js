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
            let htmlPkm = `
                <a id="pokemon-${pokemon.Id}" class="m-3 nav-link btn btn-outline btn-flex btn-color-muted flex-column overflow-hidden w-100px h-110px pt-5 active border-hover-primary" data-bs-toggle="pill" aria-selected="true" role="tab">
                    <span class="nav-text text-gray-800 fw-bold fs-6 lh-1">${pokemon.Name}</span>
                    <img src="${pokemon.Sprite}" id="pokemon-image-${pokemon.Id}" class="enlarge-image"/>
                </a>
            `;

            const pokemonElement = document.createElement("div");
            pokemonElement.classList.add("content", "col-md-2", "text-center",  "p-3", "mb-5", "rounded");
            pokemonElement.innerHTML += htmlPkm;
            const  imgElement = pokemonElement.querySelector('img');
            imgElement.style.width = '100%';
            imgElement.style.height = '100% !important';
            const pokemonLink = pokemonElement.querySelector(`#pokemon-${pokemon.Id}`);
    
            // Thêm sự kiện click cho mỗi Pokemon để hiển thị thông tin chi tiết
            pokemonLink.addEventListener("click", function () {
                clearSelectedElements(); // Xóa lựa chọn trước đó
                displayPokemonInfo(pokemon);
             
                this.classList.add("selected-element");
            });

            pokemonList.appendChild(pokemonElement);
        });
    }

    const aLinks = document.querySelectorAll("ul li a");

    aLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            clearSelectedPokemons();
        });
    });

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

    function clearSelectedPokemons() {
        const activeElements = document.getElementById("pokemon-info");
            activeElements.innerHTML = '';
      
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
        sprite.style.maxWidth  = "100% !important";
        sprite.style.height = "50%";

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
        moveList.style.marginLeft = "22%";
        moveList.style.marginTop = "5px"
      
        movearray.forEach(moveName => {
            let htmlmoves= `<div class="flex-column flex-lg-row-auto w-100 ml-0 ">      
                    <p>${moveName}</p>
                    </div>`;
        moveList.insertAdjacentHTML('beforeend', htmlmoves);
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
