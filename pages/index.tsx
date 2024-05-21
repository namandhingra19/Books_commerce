import React, { Fragment, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import LayoutMainpage from "../components/utilities/LayoutMainpage";
import Banner from "../components/Banner/Banner";
import Homebooks from "../components/HomeBooks/Homebooks";
import axios from "axios";
import Books, { BooksCategory } from "../utils/seeds";
import connect from "../lib/database";
import User from "../modals/User";
import useApi from "../hooks/use-api";

type data = {
  volumeInfo: {
    imageLinks: {
      thumbnail: string;
    };
    title: string;
    description: string;
    categories: string[];
  };
}[];
const Home: React.FC<{ sampledata: { booksArray: data } }> = (props) => {
  const { isLoading, error, sendRequest, setErrorNull } = useApi();
  const [data, setData] = useState([]);
  function applyData(data: any) {}

  const getBooks = async () => {
    const response = await fetch("/api/books/getall");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <Fragment>
      <LayoutMainpage>
        <Banner />
      </LayoutMainpage>
      {<Homebooks data={data} />}
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  connect();
  // const resd = await fetch(
  //   `https://www.googleapis.com/books/v1/volumes?q=subject:SCIENCE&maxResults=20`
  // );
  const resd = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=self+help:keyes&key=AIzaSyBLpkFwG7wX7dapLT8Vkx7e23TIwcrg8kk`
  );
  const data = await resd.data;

  return {
    props: {
      sampledata: {
        booksArray: data.items,
      },
    },
  };
}
