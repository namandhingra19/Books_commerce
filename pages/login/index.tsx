import Auth from "../../components/Auth/Auth";
import {getSession, useSession} from 'next-auth/react'
const Login=(props)=>{
    return(
        <Auth p={props.p}/>
    )
}
export async function getServerSideProps(context){
    const session = await getSession({req:context.req});
    console.log(session,'hi');
    if (session) {
        return {
            // redirect: {
            //     destination: '/products',
            //     permanent: false,
            // },
            props:{
                p:'hello'
            }
        };
    }
    return{
        props:{
            p:'yellow'
        }
    }

}
export default Login;

