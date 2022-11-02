import React, { Fragment } from "react"
import Navigation from "../components/Navigation/Navigation"
import LayoutMainpage from "../components/utilities/LayoutMainpage"
import Banner from "../components/Banner/Banner"
import Homebooks from "../components/HomeBooks/Homebooks"
import axios from "axios"
import Books,{BooksCategory} from '../utils/seeds'
import connect from "../lib/database";



type data={
  volumeInfo:{
    imageLinks:{
      thumbnail:string},
    title:string,description:string,
    categories:string[]}
}[]
const Home:React.FC<{sampledata:{booksArray:data}}> =(props) => 
{
  // if(props?.sampledata==null)
  // console.log(props.sampledata.booksArray);
  return (
    <Fragment>
      <LayoutMainpage>
        <Banner/>
      </LayoutMainpage> 
      {
        <Homebooks data={props.sampledata.booksArray}/>
      }
      
    </Fragment>
  )
}

export default Home

export async function getStaticProps(){
  connect();
  // const resd=await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:SCIENCE&maxResults=20`)
  const resd=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=30`);
  const data=await resd.data;


return{
      props:{
        sampledata:{
          booksArray:data.items
        }
      }
  }
}

  