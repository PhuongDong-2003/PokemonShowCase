using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PokeScrap
{
    public class GenerationResponse
    {   
        [JsonPropertyName("results")]
        public List<GenerationDetail> Results { get; set; }
    }
}