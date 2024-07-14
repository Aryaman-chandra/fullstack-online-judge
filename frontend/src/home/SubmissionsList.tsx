import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getSubmissions } from '@/lib/api'
import { Loader } from '@/lib/utils/loader'

interface Submission {
  _id: number
  user: any,
  problem:{
      title: string,
  }
  source : string,
  verdict: 'ACCEPTED' | 'WRONG ANSWER' | 'COMPILATION_ERROR'
}

const SubmissionsList = () => {
    const navigate = useNavigate();

    const fetchSubmissions = async () =>{
        const data = await getSubmissions();
        return data;
    }
  const {data : submissions , isFetching }  = useQuery({
      queryKey: ["submissions"],
      queryFn: fetchSubmissions
  })
  const getVerdictColor = (verdict: Submission['verdict']) => {
    switch (verdict) {
      case 'ACCEPTED':
        return 'bg-green-500'
      case 'WRONG ANSWER':
        return 'bg-red-500'
      case 'COMPILATION_ERROR':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  if(isFetching) return <Loader isLoading={isFetching}/>
  else 
  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-primary">My Submissions</h1>
      <Table>
        <TableCaption>A list of your recent submissions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Problem</TableHead>
            <TableHead>Verdict</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell>{submission._id}</TableCell>
              <TableCell>{submission.problem.title || '-'}</TableCell>
              <TableCell>
                <Badge className={getVerdictColor(submission.verdict)}>
                  {submission.verdict}
                </Badge>
              </TableCell>
              <TableCell>{submission.time || '-'}</TableCell>
              <TableCell>{submission.memory || '-'}</TableCell>
              <TableCell>
                  <Button variant="outline" onClick={() => navigate(`${submission._id}`, { state: {submission : submission }}) }>
                      View Details
                    </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SubmissionsList
