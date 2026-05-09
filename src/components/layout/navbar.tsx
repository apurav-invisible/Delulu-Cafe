"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function Navbar(){
    return(
        <nav className=" bg-brand-black border-b border-brand-chrome/20 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-brand-pink font-bold text-xl">
                Delulu Drinks ☕
                </Link>
                
            </div>
                
        </nav>
    )
}

export default Navbar