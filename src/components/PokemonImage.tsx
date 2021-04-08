import PokemonFn from "../fns/pokemon";

export default function PokemonImage(props : any) {
  const src = props.placeholder ? "/placeholder-pokeball.jpg" : props.src;
  return <img src={src} loading="lazy" height={150}/>
}