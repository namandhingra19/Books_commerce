import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../modals/User";
import NextAuth from "next-auth"
import bcrypt from "bcryptjs"
import { errorHandler } from "../../../utils/common";
export default NextAuth(
{
    providers:[
        CredentialsProvider({
            name: "Credentials",
            
            credentials: {
              
            },
            async authorize(credentials, req) {
                const { email, password } = req.body;
                const user=await User.findOne({email}).exec()
                if(!user) throw new Error('Invalid user')
                const userDoc=user._doc;
                const isMatched =await bcrypt.compare(password,userDoc.password)
                if (user && isMatched) {
                    delete userDoc.password
                    return userDoc
                } 
                else {
                    throw new Error('Invalid user')
                }
             }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            if(user){
                console.log('hi');
            }
            if(token && token.id){
                session.user.id=token.id; 
            }
            // console.log('session',{session,user});
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('kk');      
            if(user && user._id){
                token.id=user._id; 
            }
        console.log('jwt',{token,user});
          return token
        }
    }
})
