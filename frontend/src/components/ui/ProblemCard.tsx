import { Separator } from '@radix-ui/react-separator'
import { Button } from './button'
import { Card, CardContent,  CardHeader, CardTitle } from './card'
import { useNavigate } from 'react-router-dom'

const ProblemCard = ( props:{_id: string , title: string , tags: string[] , difficulty : string} ) => {
    const navigate = useNavigate(); 
    const tagsList = props.tags.map((value, index)=>{
        return <li key={index}>
            <Button >{value}</Button>
        </li>
    })
    const  openProblem = ()=>{
        return navigate(`./${props._id}`,{state : {p_id : props._id}})
    }
    const color = {
        Easy : "green",
        Medium : "yellow",
        Hard : "red"
    }
    const textColor:string = `text-${color[props.difficulty]}-500`;
  return (
        <>
        <Card className='bg-card p-3 w-[80%] h-max-1  '>
            <CardHeader className="flex-row justify-between items-center rounded-lg ">
                <CardTitle className="hover:text-primary" onClick={openProblem}>{props.title}</CardTitle>
                <div className=' text-accent-foreground mr-4'>
                    <div className={textColor}>{props.difficulty}</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className='flex flex-row gap-2 '>
                    <ul className='flex  justify-start space-x-3 overflow-auto w-[80%] md:w-[100%]'  >{tagsList}</ul>
                    
                </div>
            </CardContent>
            
        </Card>
        <Separator/>
        
        </>
        )
}

export default ProblemCard
