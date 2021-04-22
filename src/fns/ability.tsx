import { INamedApiResourceList, IPokemon, INamedApiResource, IAbility } from "pokeapi-typescript";

function getEntriesEn(ability: IAbility) : Array<any> {
  return ability
    .effect_entries
    .filter(entry =>
      "en" == entry
        .language
        .name)
}

export default {
  getEntriesEn
};