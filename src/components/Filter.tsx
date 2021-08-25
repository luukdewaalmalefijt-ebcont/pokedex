interface FilterProps {
  value: string,
  onChange: any, // todo: typing
}

export default function Filter(props : FilterProps) {
  return <input
     className="input is-large name-filter"
     type="text"
     placeholder="Pokemon name..."
     value={props.value}
     onChange={props.onChange}
   />
}