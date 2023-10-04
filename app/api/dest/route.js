import { NextResponse } from 'next/server';
import prisma from "@/prisma/client";

export async function POST(req, res) {
    try {
        var body= await req.json()
        const { id } = body.id; // Assuming the ID is provided in the request body
        const post = await prisma.Post.findUnique({
            where: {
                id: id,
            },
        }); 
        var ddf = await posts
   
        return NextResponse.json({ ddf })
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
