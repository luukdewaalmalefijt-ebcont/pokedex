import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";

// alternatively: fork this into /public: https://github.com/jnovack/pokemon-svg
// TODO: this resolving logic is temporary until we collect
// all images in our own public folder
function getImageUrl(pokemon : INamedApiResource<IPokemon>) : string {
  const index = getIndex(pokemon);
  if (index < 650) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ index }.svg`;
  }
  else if (index < 10061) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ index }.png`;
  }
  else {
    let name = pokemon
      .name
      // the Amped variation cannot be found in Gigantamax format
      .replace("-amped-gmax", "-amped")

      // other gigantamax variations are known
      .replace("-gmax", "-gigantamax")

      // other modifiers
      .replace("-galar", "")
      .replace("-alola", "")
      .replace("-low-key", "")
      .replace("-totem", "")
      .replace("-disguised", "")
      .replace("-busted", "")
      .replace("-original", "")
      .replace("-zen", "")
      .replace("-eternal", "")
      .replace("-cosplay", "")
      .replace("-eternamax", "")
      .replace("-dusk", "")
      .replace("-dawn", "")
      .replace("-own-tempo", "")
      ;

    // color path adjustments
    const colors = [
      "violet", "green", "indigo", "blue", "yellow", "orange", "red"
    ];

    // adjust Minior color paths.
    // as an extra special case, the minior images are PNG
    colors.forEach((color) => {
      name = name
        .replace(`-${color}-meteor`, "-meteor");

      if (name.includes(color)) {
        name = "/vector/" + name.replace(`-${color}`, `-${color}-core.png`);
      }
    })

    return (name.endsWith(".png"))
      ? `https://img.pokemondb.net/artwork/${ name }`
      : `https://img.pokemondb.net/artwork/${ name }.jpg`
  }
}

function getIndex(pokemon : INamedApiResource<IPokemon>) : number {
  const parts = pokemon.url.split("/");
  return parseInt(parts[parts.length-2]) // 2 due to trailing slash
}

export default { getImageUrl, getIndex };