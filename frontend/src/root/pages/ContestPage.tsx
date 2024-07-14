import { getContest, getContests } from '@/lib/api';
import { Loader } from '@/lib/utils/loader';
import { useQuery } from '@tanstack/react-query'
import ContestDescriptionPage from './ContestDescriptionPage';
import ContestLive from './ContestLive';

const ContestPage = () => {
    const c_id = window.location.pathname.split("/").pop();
    const cur =  new Date(Date.now());
    const contest_details = async () =>{
        const data = await getContest(c_id!); 
        return data
    }
    const {data , isFetching } = useQuery({
        queryKey: ["contests" ,c_id],
        queryFn: contest_details,
    })
    if(isFetching) return <Loader isLoading={isFetching} /> 
    if(data){
        const start_time = new Date(data.contest.start_time);
        if(start_time > cur) return <ContestDescriptionPage contestId={c_id}/>;
        else return <ContestLive contest={data.contest}/>
    }

}

export default ContestPage
