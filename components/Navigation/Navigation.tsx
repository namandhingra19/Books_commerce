import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { BooksData } from "../HomeBooks/Homebooks";
import CartItem from "./CartItem";
import { userCart } from "../../store/userCart";
const userCartActions = userCart.actions;
// import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const [isActive, setisActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  //   const navigate = useNavigate();
  const searchfocusHandler = () => {
    setisActive(true);
  };
  const searchblurHandler = () => {
    setisActive(false);
  };
  async function getuserCartItems() {
    const res = await axios.get("/api/user/getCartItems");
  }
  const classes = `${styles.searchdiv} ${isActive ? styles.searchactive : ""}`;
  const { data: session, status } = useSession();
  const userItems = useSelector<RootState, BooksData[]>((state) => {
    return state.userCart.items;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) console.log(session.user);
  }, [session]);

  async function addToCarthandler() {
    if (session && session.user) {
      dispatch(userCartActions.removeAllproducts());
      const yy = await axios.post("/api/user/postBooks", {
        emailId: session.user.email,
        bookItems: userItems,
      });
      const data = await yy.data;
      console.log(data);
      showNotification({
        message: "Order Placed Successfully",
      });
      setShowModal(false);
    } else {
      showNotification({
        message: "You need to first login",
      });
    }
  }
  return (
    <>
      <div className={styles.main}>
        <div className={styles.navigator}>
          <div className={styles.logo}>
            <p className={styles.logoname}>B</p>
            <img src="/logo3.png" alt="books" className={styles.logoimg}></img>
            <p className={styles.logoname}>ks</p>
          </div>
          <div className={styles.homeproducts}>
            <p
              className={styles.home}
              onClick={() => {
                window.location.href = "/";
                //   navigate("/products");
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Home
            </p>
            <p
              className={styles.products}
              onClick={() => {
                window.location.href = "/products";
                //   navigate("/products");
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Products
            </p>
            <p
              className={styles.products}
              onClick={() => {
                window.location.href = "/adminPanel";
                // navigate("/products");
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Admin Panel
            </p>
            <p
              className={styles.products}
              onClick={() => {
                window.location.href = "/myorders";
                // navigate("/products");
              }}
              style={{
                cursor: "pointer",
              }}
            >
              My Orders
            </p>
          </div>
        </div>
        <div className={styles.users}>
          <div className={classes}>
            <input
              className={styles.searchinput}
              placeholder="Search"
              onFocus={searchfocusHandler}
              onBlur={searchblurHandler}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  window.location.href = `/products?q=${searchQuery}`;
                }
              }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            ></input>
            <FontAwesomeIcon icon={faSearch} className={styles.searchlogo} />
          </div>
          <div className={styles.usercart}>
            <div
              style={{
                position: "relative",
              }}
            >
              <FontAwesomeIcon
                className={styles.cart}
                icon={faCartShopping}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (session && session.user) {
                    setShowModal(true);
                  } else {
                    showNotification({
                      message: "Please login to view cart items",
                    });
                  }
                }}
              />
              <div
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: -10,
                  background: "red",
                  height: 20,
                  width: 20,
                  borderRadius: "50%",
                  fontSize: 12,
                  right: 20,
                }}
              >
                <Center>{userItems.length}</Center>
              </div>
            </div>
            {status === "authenticated" && (
              <button
                className={styles.user}
                onClick={async () => await signOut({ redirect: false })}
              >
                Logout
              </button>
            )}
            {status === "unauthenticated" && (
              <button className={styles.user}>
                <Link href={"/login"}>LOGIN</Link>
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        title="User's Cart"
        size="md"
      >
        <Stack>
          {userItems.length === 0 && (
            <Center w="100%" h="100%">
              <Text>No items in cart</Text>
            </Center>
          )}
          {userItems.map((useritem) => {
            return (
              <CartItem
                item={useritem}
                onIncrease={() => {
                  dispatch(userCartActions.addproduct(useritem));
                }}
                key={useritem._id}
              />
            );
          })}
          <Button
            onClick={() => {
              addToCarthandler();
            }}
          >
            Order Now!
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Navigation;
