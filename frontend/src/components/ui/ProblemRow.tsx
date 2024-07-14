import { TableRow, TableCell } from '@/components/ui/table';
import { Separator } from '@radix-ui/react-separator';
import { useNavigate } from 'react-router-dom';
const ProblemRow = ({ _id, title, tags, difficulty }) => {
const navigate = useNavigate();
const tagsList = tags.map((value, index) => {
return (
<span
key={index}
className="bg-secondary text-sm font-bold py-1 px-2 rounded-full mr-2"
>
{value}
</span>
);
});
const openProblem = () => {
return navigate(`./${_id}`, { state: { p_id: _id } });
};
return (
<>
<TableRow className="bg-card p-1 w-[40%] rounded-lg h-max-1">
<TableCell className="flex-row justify-between items-center rounded-lg w-full">
<div className="hover:text-primary text-lg font-bold" onClick={openProblem}>{title}</div>
<div className="mr-4">
<div
className={
difficulty === 'Easy'
? 'text-green-500'
: difficulty === 'Medium'
? 'text-yellow-500'
: 'text-red-500'
}
>
{difficulty}
</div>
</div>
<TableCell>
<ul className="flex justify-start space-x-3 overflow-auto w-[80%] md:w-[100%]">
{tagsList}
</ul>
</TableCell>
</TableCell>
</TableRow>
<Separator />
</>
);
};
export default ProblemRow;
