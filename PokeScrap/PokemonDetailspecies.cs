using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PokeScrap
{
    public class PokemonDetailspecies
    {
         public List<Variety> varieties { get; set; }
        public class Pokemon
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
            public Pokemon pokemon { get; set; }
        }

    }

}