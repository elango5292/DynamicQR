
import { NextResponse } from 'next/server'

import prisma from "@/prisma/client"
export async function GET(req, res) {
    
    try {
      const posts = await prisma.Post.findMany(
        );
  
   var ddf = await posts
   
      return NextResponse.json({ddf})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


export async function POST(req) {

  var inno = await req.json()
  let target = inno.target
  await prisma.Post.update({
    where: {
      id: inno.target,
    },
    data: {
        name:inno.name,
        content:inno.content,
    },
  })
  

  return new Response("OK")
  
}