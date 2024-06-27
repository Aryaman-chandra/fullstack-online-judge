import { Separator } from '@radix-ui/react-separator'
import { Button } from './button'
import { Card, CardContent,  CardHeader, CardTitle } from './card'

const ProblemCard = ( props:{title: string , tags: string[] , difficulty : string} ) => {
    const tagsList = props.tags.map((value, index)=>{
        return <li key={index}>
            <Button >{value}</Button>
        </li>
    })
  return (
        <>
        <Card className='bg-card p-3 w-[80%] h-max-1  '>
            <CardHeader className="flex-row justify-between items-center rounded-lg ">
                <CardTitle>{props.title}</CardTitle>
                <div className=' text-accent-foreground mr-4'>
                    <div className='text-yellow-500'>{props.difficulty}</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className='flex flex-row gap-2 '>
                    <ul className='flex  justify-start space-x-3 overflow-auto w-[100%]'  >{tagsList}</ul>
                    
                </div>
            </CardContent>
            
        </Card>
        <Separator/>
        
        </>
        )
}

export default ProblemCard
