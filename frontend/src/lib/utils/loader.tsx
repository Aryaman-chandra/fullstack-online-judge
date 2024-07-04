import { CircleLoader } from 'react-spinners'
export const Loader = (props:{ isLoading:boolean }) => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <CircleLoader
        className="justify-self-center self-center"
        color="#e11d48"
        size={50}
        loading={props.isLoading}
      />
    </div>
  );
}

