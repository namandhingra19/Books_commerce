import Auth from "../../components/Auth/Auth";
import { getSession, useSession } from "next-auth/react";
const Login = (props) => {
  return <Auth p={props.p} />;
};
export default Login;
