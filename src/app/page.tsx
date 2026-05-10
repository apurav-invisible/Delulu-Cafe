"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { FaInstagram, FaXTwitter, FaYoutube ,FaFacebook } from "react-icons/fa6"
import OrderDrawer  from "@/components/shared/orderdrawer"
import { useState } from "react";

const topDrinks = [
  {
    id: 1,
    name: "Emotional Damage Espresso",
    price: 299,
    image: "https://placehold.co/400x400/111111/FF4FA3?text=Espresso",
    tag: "🔥 Best Seller",
    flavors: "Bold/Bitter/Intense"
  },
  {
    id: 2,
    name: "Situationship Shake",
    price: 349,
    image: "https://placehold.co/400x400/111111/FF4FA3?text=Shake",
    tag: "💔 Fan Favourite",
    flavors: "Bold/Bitter/Intense"
  },
  {
    id: 3,
    name: "Red Flag Latte",
    price: 279,
    image: "https://placehold.co/400x400/111111/FF4FA3?text=Latte",
    tag: "🚩 Trending",
    flavors: "Bold/Bitter/Intense"
  },
  {
    id: 4,
    name: "Ghosted Cold Brew",
    price: 319,
    image: "https://placehold.co/400x400/111111/FF4FA3?text=Cold+Brew",
    tag: "👻 New",
    flavors: "Bold/Bitter/Intense"
  },
  {
    id: 5,
    name: "Main Character Matcha",
    price: 329,
    image: "https://placehold.co/400x400/111111/FF4FA3?text=Matcha",
    tag: "✨ Staff Pick",
    flavors: "Bold/Bitter/Intense"
  },
]
export default function Home() {
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [DrawerOpen, setDrawerOpen] = useState(false)
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
          <Button asChild className="rounded-full bg-brand-pink text-brand-black font-semibold px-8 py-6 text-base hover:bg-brand-pink/90">
            <Link href="/order">Order Now</Link>
          </Button>
          <Button  asChild variant="outline" className="rounded-full border-brand-chrome/40 text-brand-chrome px-8 py-6 text-base hover:text-brand-pink hover:border-brand-pink">
            <Link href="/menu">View Menu</Link>
          </Button>
        </div>
        <div className="mt-8 flex items-center gap-6">
          <Link href="https://instagram.com/deluludrinks" target="_blank">
          <FaInstagram className="text-brand-chrome/70 hover:text-brand-pink text-xl cursor-pointer transition-colors duration-200" />
          </Link>
          <Link href="https://twitter.com/deluludrinks" target="_blank">
          <FaXTwitter className="text-brand-chrome/70 hover:text-brand-pink text-xl cursor-pointer transition-colors duration-200" />
          </Link>
          <Link href="https://youtube.com/@deluludrinks" target="_blank">
          <FaYoutube className="text-brand-chrome/70 hover:text-brand-pink text-xl cursor-pointer transition-colors duration-200" />
          </Link>
          <Link href="https://facebook.com/deluludrinks" target="_blank">
          <FaFacebook className="text-brand-chrome/70 hover:text-brand-pink text-xl cursor-pointer transition-colors duration-200" />
          </Link>
        </div>
        </div>
      </section>
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-brand-white tracking-tight">
              Top Picks for the Delulu Soul
            </h2>
              <p className="text-brand-chrome/70 text-sm mt-1">
                Our most popular drinks, loved by the delulu community.
              </p>
            </div>
            <Link href="/menu" className="ml-auto self-end text-sm text-brand-chrome/70 hover:text-brand-pink transition-colors duration-200 underline">
              View Full Menu
            </Link>
          </div>
          <div className=" grid grid-cols-5 gap-6 pb-4 ">
            {topDrinks.map((drink) => {
              const qty = quantities[drink.id] || 0;
              return (
                <div key={drink.id} className="bg-brand-black  border border-brand-chrome/10 rounded-2xl justify-between overflow-hidden flex flex-col pt-2 px-4 pb-2">
                  <Image 
                    src={drink.image}
                    alt={drink.name}
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
                <span className="text-xs text-brand-chrome/70">{drink.tag}</span>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-brand-chrome text-base font-semibold leading-tight">{drink.name}</h3>
                  <span className="text-brand-chrome text-base font-semibold whitespace-nowrap shrink-0">
                    ₹{drink.price}
                  </span>
                </div>
                <p className="text-sm text-brand-chrome/70">{drink.flavors}</p>
                {qty ===0 ? (
                <Button className="mt-4 bg-brand-pink text-brand-black hover:bg-brand-pink/20 hover:text-brand-chrome transition-colors duration-200"
                  onClick={() => {
                    setQuantities({...quantities, [drink.id]: 1})
                  }}>
                  Order Now
                </Button>
                ) :(
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Button onClick={() => setQuantities({...quantities, [drink.id]: Math.max(0, qty - 1)})}>−</Button>
                      <span className="text-brand-white">{qty}</span>
                      <Button onClick={() => setQuantities({...quantities, [drink.id]: qty + 1})}>+</Button>
                    </div>
                    
                                </div>
                  )}

                </div>  )
            })}
              </div>  
        
        {Object.values(quantities).some(q=>q>0) && (
          <div className=" bottom-0 flex justify-between w-full rounded-lg left-1/2  z-50 bg-brand-black border border-brand-chrome/20 px-6 py-4 items-center gap-4 ">
            <span className="text-brand-chrome text-sm">
      {Object.values(quantities).reduce((a, b) => a + b, 0)} items added
    </span>
            <Button 
              className="bg-brand-pink text-brand-black font-semibold px-8 py-4  shadow-xl hover:bg-brand-pink/90"
              onClick={() => setDrawerOpen(true)}>
              Go to Cart 🛒
          </Button>
          </div>
          )}
          </section>
              
              
            <OrderDrawer 
              drinks={topDrinks}
              quantities={quantities}
              open={DrawerOpen}
              onClose={() => setDrawerOpen(false)}
              onQuantityChange={(id, newQty) => setQuantities({...quantities, [id]: newQty})}
              onCancel={() => setQuantities({})}
            />
            
    </main>
  )}