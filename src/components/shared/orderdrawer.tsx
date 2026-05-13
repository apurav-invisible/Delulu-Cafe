"use client"
import { useState } from "react"
import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { X } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Tag } from 'lucide-react';
import { useRouter} from "next/navigation"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

type Drink ={
    id: number;
    name: string;
    price: number;
    tag: string;
    flavors: string;
    image: string;
}
const coupons: Record<string, number> = {
  "DELULU10": 10,
  "SLAY20": 20,
  "GHOSTED50": 50,
}

type OrderDrawerProps = {
    drinks: Drink[];
    open: boolean;
    onClose: () => void;
    quantities: Record<number, number>
    onQuantityChange: (id: number, newQty: number) => void;
    onCancel: () => void;
}
export default function OrderDrawer({ drinks, open, onClose, quantities, onQuantityChange, onCancel }: OrderDrawerProps) {
    
    const[ordertype, setOrderType] = useState<"Dine-in" | "Delivery">("Dine-in")
    const[tableNo, setTableNo] = useState("")
    const[address, setAddress] = useState("")
    const[coupon, setCoupon] = useState("")
    const[discount, setDiscount] = useState(0)
    const[couponError, setCouponError] = useState("")
    const[couponSuccess, setCouponSuccess] = useState("")
    const [step, setStep] = useState<"cart" | "summary">("cart")
    const cartItems = drinks.filter(d => (quantities[d.id] || 0) > 0)
    const deliveryCharge = ordertype === "Delivery" ? 80 : 0
    const router = useRouter()
  
  const total = cartItems.reduce((sum, d) => sum + d.price * quantities[d.id], 0)
  const gst = Math.round(total * 0.05)
  const applyCoupon = () => {
    const code = coupon.toUpperCase()
    if (coupons[code]) {
      setDiscount(coupons[code])
      setCouponSuccess(`yass! ${coupons[code]}% off applied 🎉`)
      setCouponError("")
    }else{
      setCouponError("bestie that code is a red flag 🚩")
      setCouponSuccess("")
      setDiscount(0)
    }
  }
  const discountAmount = Math.round(total * discount / 100)
  const grandTotal = total + gst + deliveryCharge - discountAmount
  return (
    <Drawer open={open} onOpenChange={(isOpen) => {
    if (!isOpen) {
      setStep("cart")
      onClose()
    }
  }}  direction="right">

      <DrawerContent className="bg-brand-black h-full backdrop-blur-md border-l border-brand-chrome/20 overflow-y-auto no-scrollbar">
      {step === "cart" ? (
        <>
        <DrawerHeader>
          <DrawerTitle className="text-brand-white text-2xl">
              Ur bag 🛍️
            </DrawerTitle>
                      <DrawerDescription>bestie check what u copped</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 flex flex-col gap-2">
                      <div className="bg-brand-chrome/5 px-4 py-4 rounded-lg border border-brand-chrome/20">
                        <p className="text-brand-chrome text-xs mb-2">ITEMS U GRABBED 👇</p>
                        {cartItems.map((drink) => (
              <div key={drink.id} className="flex items-center justify-between border-b border-brand-chrome/10 pb-4 py-2">
                <div>
                  <p className="text-brand-white text-sm font-semibold">{drink.name}</p>
                  <p className="text-brand-chrome/70 text-xs">₹{drink.price} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="w-7 h-7 p-0"
                    onClick={() => onQuantityChange(drink.id, Math.max(0, (quantities[drink.id] || 0) - 1))}>−</Button>
                  <span className="text-brand-white">{quantities[drink.id]}</span>
                  <Button variant="outline" className="w-7 h-7 p-0"
                    onClick={() => onQuantityChange(drink.id, (quantities[drink.id] || 0) + 1)}>+</Button>
                  <span className="text-brand-white text-sm">₹{drink.price * quantities[drink.id]}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-brand-chrome/5 px-4 py-4 rounded-lg border border-brand-chrome/20">
            <p className="text-brand-chrome text-xs mb-2">HOW U VIBING TODAY? 🤔</p>
            <div className="flex justify-between">
              <Button
              onClick={()=> setOrderType("Dine-in")}
              className={` px-8 py-2 rounder-lg text-sm border transition-all
                ${ordertype === "Dine-in" ? "bg-brand-pink text-brand-black border-brand-pink" 
                  : "border-brand-chrome/40 text-brand-chrome hover:bg-brand-pink/10 hover:border-brand-pink"  }`}>🪑 stay & slay</Button>
              <Button
              onClick={()=> setOrderType("Delivery")}
              className={` px-8 py-2 rounder-lg text-sm border transition-all
                ${ordertype === "Delivery" ? "bg-brand-pink text-brand-black border-brand-pink" 
                  : "border-brand-chrome/40 text-brand-chrome hover:bg-brand-pink/10 hover:border-brand-pink"  }`}>🛵 send it home</Button>
                  </div>
            </div>
            {ordertype === "Dine-in" && (
              <div className="bg-brand-chrome/5 px-4 py-4 rounded-lg border border-brand-chrome/20">
                <p className="text-brand-chrome text-xs mb-2"> UR TABLE NO. BESTIE 🪑 </p>
                <input
                type="text"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
                placeholder="which table u at? (e.g.7)"
                className="w-full bg-transparent border border-brand-chrome/30 rounded-lg px-3 py-2 text-brand-white text-xm outline-none focus:border-brand-pink transition-colors placeholder:text-xs"/>

              </div>
            )}
            {ordertype === "Delivery" && (
              <div className="bg-brand-chrome/5 px-4 py-4 rounded-lg border border-brand-chrome/20">
                <p className="text-brand-chrome text-xs mb-2">DROP UR LOCATION 📍</p>
                <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="where we pullin up to bestie?"
                rows={3}
                className="w-full bg-transparent border border-brand-chrome/30 rounded-lg px-3 py-2 text-brand-white text-xm outline-none focus:border-brand-pink transition-colors placeholder:text-xs"/>
              </div>
            )}
            <div className="bg-brand-chrome/5 px-4 py-3 rounded-lg border border-brand-chrome/20">
            <p className="text-brand-chrome text-xs mb-2">GOT A CHEAT CODE? 🎟️</p>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={coupon}
                  disabled={discount > 0}
                  onChange={(e) => discount === 0 && setCoupon(e.target.value)}
                  placeholder="drop ur code here for secret discounts"
                  className={`w-full uppercase bg-transparent border border-brand-chrome/30 rounded-lg px-3 py-2  text-xm outline-none focus:border-brand-pink transition-colors placeholder:text-xs ${
                    discount > 0 ? "border-green-500/50 text-brand-chrome cursor-not-allowed" : "text-brand-white"
                  }`}
                />  
                <Button 
                onClick={discount >0?() =>{
                  setDiscount(0)
                  setCoupon("")
                  setCouponSuccess("")
                  setCouponError("")
                }: applyCoupon}
                className={`ml-4 px-6 py-2 bg-brand-pink text-brand-black font-bold rounded-lg hover:bg-brand-pink/90 transition-all ${
                  discount > 0 
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-brand-pink text-brand-black hover:bg-brand-pink/90" }`
                }>{discount > 0 ? "remove ✕" : "apply fr"}</Button>
                
              </div>
              {couponError && <p className="text-red-400 text-xs mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-green-400 text-xs mt-1">{couponSuccess}</p>}
            </div>
            {ordertype === "Dine-in" && (
            <div className=" items-center bg-brand-chrome/5 px-4 py-2 rounded-lg border border-brand-chrome/20">
              <p className="text-brand-chrome text-xs">THE BILL BREAKDOWN 💸</p>
              <div className="my-2 border-b border-brand-chrome/10 pb-1">
                <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                <p className="text-xs">Subtotal</p>
                <p className="ml-2 text-xs">₹{total.toFixed(2)}</p>
              </div>
              <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                <p className="text-xs">GST (govt. taxes)</p>
                <p className="ml-2 text-xs">₹{gst.toFixed(2)}</p>
              </div>
              <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                <p className="text-xs">Discounts</p>
                <p className="ml-2 text-xs">- ₹{discountAmount.toFixed(2)}</p>
              </div>
              </div>
              <div className="text-brand-chrome text-sm font-semibold flex justify-between">
                <p className="text-sm">total damage 💀</p>
                <p className="ml-2 text-sm">₹{grandTotal.toFixed(2)}</p>
              </div>

            </div>
            )}
            {ordertype === "Delivery" && (
              <div className=" items-center bg-brand-chrome/5 px-4 py-2 rounded-lg border border-brand-chrome/20">
              <p className="text-brand-chrome text-xs">THE BILL BREAKDOWN 💸</p>
              <div className="my-2 border-b border-brand-chrome/10 pb-1">
                <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                <p className="text-xs">Subtotal</p>
                <p className="ml-2 text-xs">₹{total.toFixed(2)}</p>
              </div>
              <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                <p className="text-xs">GST (govt. taxes)</p>
                <p className="ml-2 text-xs">₹{gst.toFixed(2)}</p>
              </div>
              <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                <p className="text-xs">Discounts</p>
                <p className="ml-2 text-xs">- ₹{discountAmount.toFixed(2)}</p>
              </div>
              <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                <p className="text-xs">Delivery</p>
                <p className="ml-2 text-xs">₹{deliveryCharge.toFixed(2)}</p>
              </div>
              </div>
              <div className="text-brand-chrome text-sm font-semibold flex justify-between">
                <p className="text-sm">total damage 💀</p>
                <p className="ml-2 text-sm">₹{grandTotal.toFixed(2)}</p>
              </div>

            </div>
            )}
            </div>    
            
        <DrawerFooter>
          <Button
          onClick={() => {
            if (ordertype === "Dine-in" && tableNo.trim() === "") {
              toast.error("bro table number?? 💀")
              return
            }
            if (ordertype === "Delivery" && address.trim() === "") {
              toast.error("addy drop karo bestie 📍")
              return
            }
            setStep("summary")
          }}>
           next era 💳<ArrowRight />
          </Button>
          <DrawerClose asChild>
            <Button
            onClick={() => {
                    onCancel()
            }}
            variant="outline" ><X/>nah, ghost it</Button>
          </DrawerClose>
        </DrawerFooter>
        </>
      ):(
        <>
        <DrawerHeader>
          <DrawerTitle className="text-brand-white text-2xl">
              payment 💸
            </DrawerTitle>
                      <DrawerDescription>almost there bestie, last step fr</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 flex flex-col gap-2">
                      <div className=" flex items-center justify-between bg-brand-chrome/5 px-4 py-3 rounded-lg border border-brand-chrome/20">
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-lg">
                        💵
                      </div>
                      <div> 
                        <h3 className="text-brand-white font-semibold ml-3 text-base">cash on delivery</h3>
                        <p className="text-brand-chrome text-xs ml-3">pay when we pull up, no stress 🤙</p>
                      </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      </div>
                      <div className="bg-brand-chrome/5 px-4 py-3 rounded-lg border border-brand-chrome/20">
                        <p className="text-brand-chrome text-sm mb-2">ORDER RECAP 🧾</p>
                        {cartItems.map((drink) => (
                          <div key={drink.id} className="flex items-center justify-between">
                            <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                              <p className="text-xs">{drink.name}</p>
                              <p className="ml-2 text-xs text-brand-chrome/70"> × {quantities[drink.id]}</p>
                            </div>
                            <div className="text-brand-chrome text-xm font-semibold flex">
                              <p className="ml-2 text-xs">₹{drink.price * quantities[drink.id]}</p>
                            </div>
                          </div>
                        ))}
                        {ordertype === "Dine-in" && (
                          <div>
                            <div className=" border-b border-brand-chrome/10 pb-1">
                            <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                                <p className="text-xs">GST (govt. taxes)</p>
                                <p className="ml-2 text-xs">₹{gst.toFixed(2)}</p>
                              </div>
                              <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                                <p className="text-xs">Discounts</p>
                                <p className="ml-2 text-xs">- ₹{discountAmount.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="text-brand-chrome text-sm font-semibold flex justify-between pt-1">
                              <p className="text-sm">total damage 💀</p>
                              <p className="ml-2 text-sm">₹{grandTotal.toFixed(2)}</p>
                            </div>
                          </div>
                        )}
                        {ordertype === "Delivery" && (
                          <div>
                            <div className="border-b border-brand-chrome/10 pb-1">
                            <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                              <p className="text-xs">GST (govt. taxes)</p>
                              <p className="ml-2 text-xs">₹{gst.toFixed(2)}</p>
                            </div>
                            <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                              <p className="text-xs">Discounts</p>
                              <p className="ml-2 text-xs">- ₹{discountAmount.toFixed(2)}</p>
                            </div>
                            <div className="text-brand-chrome text-xm font-semibold flex justify-between">
                              <p className="text-xs">Delivery</p>
                              <p className="ml-2 text-xs">₹{deliveryCharge.toFixed(2)}</p>
                            </div>
                            </div>
                            <div className="text-brand-chrome text-sm font-semibold flex justify-between pt-1">
                              <p className="text-sm">total damage 💀</p>
                              <p className="ml-2 text-sm">₹{grandTotal.toFixed(2)}</p>
                            </div>
                          </div>
                        )}
                      </div>
          {discount > 0 && (
            <div className="bg-brand-chrome/5 px-3 py-2 rounded-lg border border-brand-chrome/20">
          <div className="flex items-center gap-3">
              <div>
                <h3 className="text-xl text-brand-chrome"><Tag /></h3>
              </div>
              <div>
                <div>
                  <p className="text-[0.8rem] text-brand-chrome">financial glow-up activated 💸</p>
                  <p className="text-sm text-green-400 gap-2">{coupon.toUpperCase()} really said “lemme help” 🫶</p>
                </div>
              </div>
              
            </div>
          </div>
        )}
          <div className="bg-brand-chrome/5 px-3 py-2 rounded-lg border border-brand-chrome/20">
          {ordertype === "Dine-in" && (
            <div className="flex items-center gap-2">
              <div>
                <h3 className="text-xl">🪑</h3>
              </div>
              <div>
                <div>
                  <p className="text-[0.8rem] text-brand-chrome">Stay & Slay ☕</p>
                  <p className="text-sm text-brand-white">table {tableNo} got the vibes ready ✨</p>
                </div>
              </div>
              
            </div>
          )}
          {ordertype === "Delivery" && (
            <div className="flex items-center gap-2">
              <div>
                <h3 className="text-xl">📍</h3>
              </div>
              <div>
                <div>
                  <p className="text-[0.8rem] text-brand-chrome">pulling up to</p>
                  <p className="text-sm text-brand-white">{address} 💀</p>
                </div>
              </div>
              
            </div>
          )}
            </div>
            <div className="bg-brand-chrome/5 px-3 py-2 rounded-lg border border-brand-chrome/20">
          {ordertype === "Dine-in" && (
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-xl text-brand-chrome"><Clock /></h3>
              </div>
              <div>
                <div>
                  <p className="text-sm text-brand-chrome gap-2">eta: 12–15 mins, hold tight bestie ⏳</p>
                </div>
              </div>
              
            </div>
          )}
          {ordertype === "Delivery" && (
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-xl text-brand-chrome"><Clock /></h3>
              </div>
                <div>
                  <p className="text-sm text-brand-chrome gap-2">eta: 50-55 mins, hold tight bestie ⏳</p>
                </div>
            </div>
          )}
            </div>
            </div>    

        <DrawerFooter>
          <Button
          onClick={() => {
            toast.success("order placed bestie! 🎉")
            setTimeout(() => {
              onClose()
            router.push("/order") , 15000})
          }}>
            No cap, send it Fr fr <ArrowRight />
          </Button>
            <Button
            onClick={() => {setStep("cart")}}
            variant="outline"><ArrowLeft /> Back</Button>
        </DrawerFooter>
        </>)}
      </DrawerContent>
    </Drawer>
  )
}
