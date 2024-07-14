import React from 'react'
import { useAuth } from "@/hooks/useAuth"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const LandingPage = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    if(user) navigate("/home", { replace: true })

    return (
        <div className=" min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-16 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
                            Elevate Your Coding Journey
                        </h1>
                        <p className="text-xl mb-6">
                            Embark on a path of growth and excellence. Solve challenging problems, 
                            visualize your progress with interactive graphs, and compete in 
                            thrilling contests. Your coding adventure starts here.
                        </p>
                        <div className="space-x-4">
                            <Button className="bg-primary hover:bg-red-600" onClick={()=> navigate("/auth/sign-up")}>
                                Get Started
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                     <svg
                        viewBox="0 0 400 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                      >
                        <rect width="400" height="300" rx="10" fill="#1E1E1E" />
                        <rect x="10" y="10" width="380" height="30" rx="5" fill="#2D2D2D" />
                        <circle cx="25" cy="25" r="5" fill="#FF5F56" />
                        <circle cx="45" cy="25" r="5" fill="#FFBD2E" />
                        <circle cx="65" cy="25" r="5" fill="#27C93F" />
                        <rect x="10" y="50" width="380" height="240" rx="5" fill="#000000" />
                        <text x="20" y="80" fill="#00FF00" fontFamily="monospace" fontSize="14">
                          $ cd CodeNexus 
                        </text>
                        <text x="20" y="110" fill="#00FF00" fontFamily="monospace" fontSize="14">
                         $ nvim $(fzf) 
                        </text>
                        <text x="20" y="140" fill="#FFFFFF" fontFamily="monospace" fontSize="14">
                         ...picking hardest problem
                        </text>
                        <text x="20" y="170" fill="#FFFFFF" fontFamily="monospace" fontSize="14">
                        ...solve
                        </text>
                        <text x="20" y="200" fill="#00FF00" fontFamily="monospace" fontSize="14">
                        $ g++ hardest-problem -o optimal_solution
                        </text>
                        <text x="20" y="230" fill="#006400" fontFamily="monospace" fontSize="14">
                           Accepted
                        </text>
                      </svg>
                    </div>
                </div>
            </main>
        </div>
    )
}
