import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Submission {
  _id: string
  user: string
  problem: {
    _id: string
    title: string
  }
  source: string
  verdict: string
}

const SubmissionPage = () => {
  const location = useLocation()
  const submission: Submission = location.state?.submission

  if (!submission) {
    return <div>No submission data found.</div>
  }

  const getVerdictColor = (verdict: string) => {
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

  return (
    <div className="container mx-auto p-4 bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-primary">Submission Details</h1>
      <Card className="bg-gray-800 text-white mb-4">
        <CardHeader>
          <CardTitle>Problem: {submission.problem.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Submission ID: {submission._id}</p>
          <p>User ID: {submission.user}</p>
          <p>
            Verdict: <Badge className={getVerdictColor(submission.verdict)}>{submission.verdict}</Badge>
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Source Code</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-zinc-900 p-4 rounded-md overflow-x-auto">
            <code>{submission.source}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

export default SubmissionPage
