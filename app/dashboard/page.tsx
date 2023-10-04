"use client"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

import QRCode from 'qrcode'
import React, { useEffect, useState } from 'react';

import useSWR from 'swr'

const fetcher = (...args:any) => fetch(...args:any).then(res => res.json())

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { resolveAny } from "dns";
 



export default function DemoPage() {

    const [qrDataURL, setQRDataURL] = useState('');
    const [text, settext] = useState('');
    const [name, setname] = useState('');
    const [shee, setshee] = useState(false);
    const [show, setshow] = useState(false);
    const [content, setcontent] = useState('');
    const [dbdata, setdbdata] = useState([]);
    const [activeid,setactiveid]=useState("")
    const datem = [text,name,content]

    const res = function resetter(item){
        settext(item.id) 
        setname(item.name) 
        setcontent(item.content)
    }

    const setem = [settext,setname,setcontent,res]
 

    useEffect(() => {
        generateQR(text);
      }, [text]);

      useEffect(() => {
        Initialfetch()
      }, []);

    async function Initialfetch(){
        const res = await fetch('/api/posts',{headers: {
            'Content-Type': 'application/json',
        }},)
        // const { datas, error, isLoading } = useSWR('/api/posts', fetcher)
        var t = await res.json()
        setdbdata(prevdbdata => t.ddf)
        console.log("init",t.ddf)

    }


    async function handledb(){

        const res = await fetch('/api/posts', {
            method: 'POST',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify({target:text,content:content,name:name}),
          })
        if (res.status){
            Initialfetch()
        }
    }

   



function Page ({datem,setem}) {
 


    const { data, error, isLoading } = useSWR('/api/posts', fetcher)

 
    if (isLoading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error: {error.message}</div>
    } else {
      console.log(data.ddf)
    //   setdbdata([1,23,4])
      console.log(dbdata)
    return (data.ddf.map((item) =><div  onClick={(e) => { e.stopPropagation(); setem[3](item); }}>
        <AccordionItem key={item.id} value={"item"+item.id}>
      <AccordionTrigger><p>QrCode-{item.id}:{item.name}</p></AccordionTrigger>
      <AccordionContent>
      
      
      </AccordionContent>
    </AccordionItem></div>))
    }
  }

  async function generateQR (text) {
    try {
      setQRDataURL(await QRCode.toDataURL("https://google.com/"+text))
    } catch (err) {
      console.error(err)
    }
  }

function f1(item){
    // setactiveid(previd =>id)
    settext(previd =>item.id) 
        setname(previd =>item.name) 
        setcontent(previd =>item.content)
    console.log(item)

    setshee(true)

}

function f2(item){
    // setactiveid(previd =>id)
    settext(previd =>item.id) 
        setname(previd =>item.name) 
        setcontent(previd =>item.content)
    console.log(item)

    setshow(true)

}

const funccs = [f1,f2]

  

  return (
    <main>
    {shee&&
    <Sheet defaultOpen="true" onOpenChange={()=>setshee(!shee)}>
          
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit QR code</SheetTitle>
              <SheetDescription>
                Make changes to your QR here. Click save when youre done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={name} onChange={(e)=>setname(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Input id="content" value={content} onChange={(e)=>setcontent(e.target.value)} className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={handledb}>Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>}



        {show &&
    
              <Dialog open={show} onOpenChange={setshow}>
<button className="bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 mx-4 h-9 rounded-md px-3" onClick={()=>setshee(true)}>Edit</button>
<DialogContent>
  <DialogHeader>
    <DialogTitle></DialogTitle>
    <img
    src={qrDataURL}  alt="QR Code" id="qr"
  />

  </DialogHeader>
  <CardFooter className="flex justify-around">
  <button onClick={()=>setshee(true)}>Edit</button>
      <Button><a href={qrDataURL} download={name+".png"}>Download</a></Button>
    </CardFooter>
</DialogContent>
</Dialog>}
    
    {/* <div className="mx-9 flex justify-center items-center">
    <Accordion type="single" collapsible className="w-1/2">
    <Page datem={datem} setem={setem}></Page>
        </Accordion>
    
        </div> */}
        
        <div className="container mx-auto py-10">
        <h1 className="my-2 mx-auto ">Manage QR</h1>
      <DataTable columns={columns} funccs={funccs} data={dbdata} />
    </div>
    
    
    
         
        </main>
   
  )
}
