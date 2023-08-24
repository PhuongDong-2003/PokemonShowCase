using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokeScrap
{
        public class Generation
        {
            public string Name { get; set; }

            public string Url  { get; set; }
            public List<Pokemon> Pokemons { get; set; }
            public class Pokemon
            {
                public int Id { get; set; }
                public string Name { get; set; }
                public string Url { get; set; }
                public string Sprite { get; set; }
                public List<string> Types { get; set; }
            }
        }
}