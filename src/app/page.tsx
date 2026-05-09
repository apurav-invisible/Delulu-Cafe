import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <main className="bg-brand-black min-h-screen">
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6">
        <Image 
                            src="/images/hero.png"
                            alt="Delulu Drinks Logo"
                            fill
                            className="object-cover opacity-40"
                            priority
                        />
        <div className="absolute inset-0 bg-brand-black/30" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 px-4 py-1 rounded-full border border-brand-pink/30 text-brand-pink text-sm">
          ✨ Now taking online orders! ✨
        </div>
        <h1 className="text-6xl font-bold text-brand-white mb-4 tracking-tight">
          Sip the <span className="text-brand-pink">Delulu</span>
        </h1>

        <p className="text-brand-chrome/70 text-xl max-w-xl mb-10">
          Order your favorite brew, manage your cafe, no reality check needed.
        </p>

        <div className="flex items-center gap-4">
          <Button className="rounded-full bg-brand-pink text-brand-black font-semibold px-8 py-6 text-base hover:bg-brand-pink/90">
            Order New
          </Button>
          <Button variant="outline" className="rounded-full border-brand-chrome/40 text-brand-chrome px-8 py-6 text-base hover:text-brand-pink hover:border-brand-pink">
            View Menu
          </Button>
        </div>
        </div>
        
        
      </section>

    </main>
  )}