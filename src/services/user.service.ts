import { prismaAdapter } from "../../lib/prismaAdapter.js"


class UserService{

    getUserById= async (id:number)=>{
        try{
            const user = await prismaAdapter.user.findUnique({
            where:({id})
             })
        return user
        }catch(error){
             throw error
        }
     
    }
}
export const userService = new UserService()

