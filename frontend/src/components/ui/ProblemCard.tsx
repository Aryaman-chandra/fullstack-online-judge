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
  return (
        <>
        <Card className='bg-card p-2 w-[40%] h-max-1  '>
            <CardHeader className="flex-row justify-between items-center rounded-lg ">
                <CardTitle className="hover:text-primary" onClick={openProblem}>{props.title}</CardTitle>
                <div className=' mr-4'>
                    <div className={(props.difficulty==='Easy')? 'text-green-500':(props.difficulty==='Medium')?'text-yellow-500':'text-red-500'}>{props.difficulty}</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className='flex flex-row gap-1 '>
                    <ul className='flex  justify-start space-x-3 overflow-auto w-[80%] md:w-[100%]'  >{tagsList}</ul>
                    
                </div>
            </CardContent>
            
        </Card>
        <Separator/>
        
        </>
        )
}

export default ProblemCard
