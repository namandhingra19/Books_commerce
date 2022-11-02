import { useState } from 'react'
import styles from './Navigation.module.css'
import { faSearch ,faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession,signOut } from 'next-auth/react'
import Link from 'next/link'
const Navigation=()=>{
    const [isActive,setisActive]=useState(false)
    console.log('2nd time');
    const searchfocusHandler=()=>{
        setisActive(true);
    }
    const searchblurHandler=()=>{
        setisActive(false)
    }
    const classes=`${styles.searchdiv} ${isActive?styles.searchactive:''}`
    const {data:session,status}=useSession();
    console.log(status,session);
    return(
        <div className={styles.main}>
            <div className={styles.navigator}>
                <div className={styles.logo}>
                    <p className={styles.logoname}>B</p>
                    <img src="/logo3.png" alt="books" className={styles.logoimg}></img>
                    <p className={styles.logoname}>ks</p>
                </div>
                <div className={styles.homeproducts}>
                    <p className={styles.home}>Home</p>
                    <p className={styles.products}>Products</p>
                </div>
            </div>
            <div className={styles.users}>
                <div className={classes}>
                    <input className={styles.searchinput} placeholder='Search' onFocus={searchfocusHandler} onBlur={searchblurHandler}></input>
                    <FontAwesomeIcon icon={faSearch} className={styles.searchlogo}/>
                </div>
                <div className={styles.usercart}>
                    <FontAwesomeIcon className={styles.cart} icon={faCartShopping}/>
                    {
                        status==='authenticated' &&
                        <button className={styles.user} onClick={async()=>await signOut({redirect:false})}>Logout</button>
                    }
                    {
                        status==='unauthenticated' &&
                        <button className={styles.user}><Link href={"/login"}>LOGIN</Link></button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navigation;