"use server";
import { z } from "zod";
import prisma from "./prisma";
import { hash } from "bcrypt";

const registerUserSchema = z.object({
    username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
    password: z.string().min(5, 'Password should be minimum 5 characters'),
  });

  
export const createUser = async (data: FormData) => {
    // const session = await getSession();
    // if (!session?.user.id) {
    //   return {
    //     error: "Not authenticated",
    //   };
    // }
    const usernameInput = data.get("username") as string;
    const passwordInput = data.get("password") as string;
    const email = data.get("email") as string;
    const name = data.get("name") as string;


    const { username, password } = registerUserSchema.parse({username:usernameInput,password:passwordInput});
    const user = await prisma.user.findFirst({
      where: { username },
    });
  
    if (user !== null) {
      return {
        error: 'User already exists'
    }
    }

    const hashedPassword = await hash(password, 10);
    
  
    try {
      const response = await prisma.user.create({
        data: {
            email,
            name,
            username,
            password: hashedPassword,
        },
      })
   
      return response;
    } catch (error: any) {
    
        return {
          error: error.message
      }
    }
  };
  