"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
function Navbar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return(
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-brand-black/80 border-b border-brand-chrome/10 px-4 h-16">
            <div className="max-w-7xl mx-auto flex items-center h-full justify-between">
                <Link href="/" className="flex flex-row items-center">
                <Image 
                    src="/images/cafe2.png"
                    alt="Delulu Drinks Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                    <span className="text-brand-pink font-bold text-xl tracking-tight">
                        Delulu Drinks
                    </span>
                </Link>
                <div className="flex items-center gap-8">
                    <Link href ="/menu" className="text-sm text-brand-chrome/70 hover:text-brand-pink transition-colors duration-200"> 
                        Menu
                    </Link>
                    <Link href ="/memberships" className="text-sm text-brand-chrome/70 hover:text-brand-pink transition-colors duration-200">
                        Memberships
                    </Link>
                    <Link href ="/social-media" className="text-sm text-brand-chrome/70 hover:text-brand-pink transition-colors duration-200"> 
                        Social Media
                    </Link>
                    <Link href ="/contact" className="text-sm text-brand-chrome/70 hover:text-brand-pink transition-colors duration-200"> 
                        Contact
                    </Link>
                    <Link href ="/about" className="text-sm text-brand-chrome/70 hover:text-brand-pink transition-colors duration-200"> 
                        About
                    </Link>
                </div>
                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <span className="text-brand-chrome text-sm">Hey, Apurav 👋</span>
                                <Button 
                                    className="bg-brand-pink text-brand-black hover:bg-brand-pink/80"
                                    onClick={() => setIsLoggedIn(false)}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                        <div className="flex items-center gap-3">
                            <Button 
                                variant="outline" 
                                className="rounded-full border-brand-chrome/40 text-brand-chrome text-sm hover:text-brand-pink hover:border-brand-pink transition-all"
                                onClick={() => setIsLoggedIn(true)}>
                                    Login
                            </Button>
                            <Button className="rounded-full bg-brand-pink text-brand-black text-sm font-semibold hover:bg-brand-pink/90 transition-all">
                                Sign Up
                            </Button>
                        </div>
                        )}
                    </div>
            </div>
        </nav>
    )
}
export default Navbar