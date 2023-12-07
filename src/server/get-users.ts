import { cache } from "react"
import "server-only"
import prisma from "../utils/prisma";



export const revalidate = 1_800 // revalidate the data at most every 30 minute

export const getUserById = cache(async (id:number) =>{
  return await prisma.user.findUnique({
    where: {
      id: id, 
    },
  }).catch((err)=>{
    return null
  })
})