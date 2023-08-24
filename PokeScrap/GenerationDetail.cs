using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PokeScrap
{
    public class PokemonSpecy
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }
    public class Variety
    {
        [JsonPropertyName("is_default")]
        public bool Is_default { get; set; }
        public PokemonSpecy pokemon { get; set; }
    }

    public class GenerationDetail
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("pokemon_species")]
        public List<PokemonSpecy> PokemonSpecies { get; set; }
        [JsonPropertyName("varieties")]
        public List<Variety> Varieties { get; set; }   


    }
}