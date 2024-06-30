import { BarLoader } from 'react-spinners'
export const Loader = (props:{height:string  , isLoading:boolean }) => {
  return (
      <BarLoader height={props.height} className='fixed top-[w/2] left-[h/2]' color={"e11d48"} loading={props.isLoading}/>
  )
}

