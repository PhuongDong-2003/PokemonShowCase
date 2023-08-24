// See https://aka.ms/new-console-template for more information
using System.Text.Json;
using PokeScrap;
using System.Linq;
using System.Text.Json.Serialization;

namespace PokeScrap;


public class Program
{
    public static async Task Main(string[] args)
    {
        var l = await SlowWay();
        string data = JsonSerializer.Serialize(l);
        File.WriteAllText("../data.json", data);
    }

    private static async Task<List<Generation>> SlowWay()
    {
        List<Generation> generations = new List<Generation>();
        var listTask = new List<Task>();
        string generationApiUrl = "https://pokeapi.co/api/v2/generation/";

        using (HttpClient client = new HttpClient())
        {
            HttpResponseMessage generationResponse = await client.GetAsync(generationApiUrl);
            if (generationResponse.IsSuccessStatusCode)
            {
                var stringdata = await generationResponse.Content.ReadAsStringAsync();
                GenerationResponse generationrep = JsonSerializer.Deserialize<GenerationResponse>(stringdata);

                foreach (var generation in generationrep.Results)
                {

                    generations.Add(new Generation { Name = generation.Name, Url = generation.Url, Pokemons = new List<Generation.Pokemon>() });



                }


                foreach (var generation in generations)
                {
                    var generationUrl = generation.Url;
                    var response = await client.GetAsync(generationUrl);
                    var result = await response.Content.ReadAsStringAsync();
                    GenerationDetail generationDetail = JsonSerializer.Deserialize<GenerationDetail>(result);

                    for (int i = 0; i < generationDetail.PokemonSpecies.Count; i++)
                    {
                        var stringlist = generationDetail.PokemonSpecies[i];
                        var task =  Task.Run(async () => {
                            try
                            {
                                using var c2 = new HttpClient();
                                var pokemonpeciesUrl = stringlist.Url;
                                var res = await c2.GetAsync(pokemonpeciesUrl);
                                var pokomonresult = await res.Content.ReadAsStringAsync();
                                PokemonDetailspecies pokemonDetailspecies = JsonSerializer.Deserialize<PokemonDetailspecies>(pokomonresult);

                                var x = pokemonDetailspecies.varieties.Where(x => x.Is_default).ToList().First();

                                var p = new Generation.Pokemon { 
                                    Id = int.Parse(x.pokemon.Url.TrimEnd('/').Split('/').Last()), 
                                    Name = x.pokemon.Name, 
                                    Url = x.pokemon.Url,
                                };
                                generation.Pokemons.Add(p);
                                Console.WriteLine(p.Id);
                            }
                            catch (System.Exception e)
                            {
                                Console.WriteLine(e.Message);
                            }
                            
                        });
                        listTask.Add(task);
                        if (listTask.Count > 20)
                        {
                            await Task.WhenAll(listTask);
                            listTask.Clear();
                        }
                    }
                    await Task.WhenAll(listTask);
                    listTask.Clear();

                    for (int i = 0; i < generation.Pokemons.Count; i++)
                    {
                        var url = generation.Pokemons[i].Url;
                        using var httpClient = new HttpClient();
                        var pkmResponse = httpClient.GetAsync(url).Result;
                        var pkmDetailJson = JsonSerializer.Deserialize<PokemonDetail>(pkmResponse.Content.ReadAsStringAsync().Result);
                        var frontSprite = pkmDetailJson.Sprite.FrontDefault;
                        generation.Pokemons[i].Sprite = frontSprite;
                        generation.Pokemons[i].Types = pkmDetailJson.TypeList.Select(e => e.Type.Name).ToList();
                    }
                    Console.WriteLine("done gen");
                }
                
                await Task.WhenAll(listTask);
            }
            else
            {
                Console.WriteLine("Failed to retrieve generation data.");
            }
        }
        return generations;
    }
}

public class PokemonDetail
{
    [JsonPropertyName("sprites")]
    public Sprites Sprite { get; set; }

    [JsonPropertyName("types")]
    public List<Types> TypeList { get; set; }
    public class Sprites
    {
        [JsonPropertyName("front_default")]
        public string FrontDefault { get; set; }
    }
    public class PokemonType
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
    public class Types
    {
        [JsonPropertyName("type")]
        public PokemonType Type { get; set; }
    }
}