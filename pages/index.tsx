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
// function generateRandom(min = 0, max = 100) {
//     let difference = max - min;
//     let rand = Math.random();
//     rand = Math.floor( rand * difference);
//     rand = rand + min;
//     return rand*10;
//   }
// function capitalize(input) {  
//     input=input.replace(/\s+/g, ' ').trim()
//     var words = input.split(' ');  
//     var CapitalizedWords = [];  
//     words.forEach(element => {  
//         CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length).toLowerCase());  
//     });  
//     var s=CapitalizedWords.join(' ');  
//     return s
// }  


// (await Books.find().limit(20)).forEach(async (book)=>{
//     await BooksCategory.findOneAndUpdate({title:book.category[0]},{
//       $push:{
//         books:book._id
//       }
//     },{ upsert: true, new: true, setDefaultsOnInsert: true })
// });
//  const data=await BooksCategory.findOne({title:'Fiction'});
// console.log(data);
// data?.books.forEach(book=>{
//   const s=Books.findById(book,function (err, docs) {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("Result : ", docs);
//     }
// });
//   console.log(s);
// })


// for(let i=0; i<=4; i++){
//   let bookItems=await axios.get(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=p63ODY1boadAf776suWhYwCXNgl2B3qs&offset=${i*20}`);

//   for(let item of bookItems.data.results) {
//     if(item.isbns && item.isbns.length > 0 && item.isbns[0].isbn10){
//       console.log(item.isbns[0].isbn10);
//       let booksDetailsAPI=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${item.isbns[0].isbn10}`);
//       // let booksPriceAPI = await axios.get(`https://booksrun.com/api/v3/price/buy/${item.isbns[0].isbn10}?key=pnkqtvnusbmf6xivwdcu`);
//       if(booksDetailsAPI.data.items && booksDetailsAPI.data.items.length>0){
//         console.log('ff');
        
//         let bookDetail=booksDetailsAPI.data.items[0]; 
//         // let priceDetail=booksPriceAPI.data?.offers?.booksrun?.new?.price || 23;
//         let priceDetail=23;

//         if(bookDetail && bookDetail.title && bookDetail.volumeInfo.imageLinks && bookDetail.volumeInfo.authors && bookDetail.volumeInfo.description && bookDetail.volumeInfo.categories && bookDetail.volumeInfo.averageRating && bookDetail.volumeInfo.ratingsCount){
//           console.log('ggg');
//           const newBook=new Books({
//             title:bookDetail.volumeInfo.title,  
//             cover:bookDetail.volumeInfo.imageLinks.thumbnail,  
//             author:bookDetail.volumeInfo.authors,            
//             description:bookDetail.volumeInfo.description,
//             category:bookDetail.volumeInfo.categories[0],
//             price:priceDetail,
//             rating:bookDetail.volumeInfo.averageRating,
//             ratingcount:bookDetail.volumeInfo.ratingsCount,
//           })
//           const ressave=await newBook.save();
//           console.log(ressave);
//         }
//       }
//     }
//   }
// }

// try{
//   let k=0;
//     for(let i=11; i<=15; i++){
//       const bookItems=await axios.get(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=p63ODY1boadAf776suWhYwCXNgl2B3qs&offset=${i*20}`);
//       for(let item of bookItems.data.results){
//         if(item.isbns && item.isbns.length > 0 && item.isbns[0].isbn10){
//           const data2=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${item.isbns[0].isbn10}`);
//           let booksPriceAPI = await axios.get(`https://booksrun.com/api/v3/price/buy/${item.isbns[0].isbn10}?key=pnkqtvnusbmf6xivwdcu`);
//           console.log(booksPriceAPI.data?.result?.offers?.booksrun?.new?.price);
//           let priceDetail=booksPriceAPI.data?.result?.offers?.booksrun?.new?.price;
//           if(priceDetail!==undefined) {
//             priceDetail*=10;
//             priceDetail=Math.round(priceDetail * 100) / 100;
//           }
//           if(data2.data.items && data2.data.items.length>0){
//             const bookDetail=data2.data.items[0];
//             if(bookDetail.volumeInfo.title && bookDetail.volumeInfo.imageLinks && bookDetail.volumeInfo.description &&  bookDetail.volumeInfo.categories && (priceDetail!==undefined || (bookDetail.volumeInfo.averageRating && bookDetail.volumeInfo.ratingsCount))){
//               let category=capitalize(bookDetail.volumeInfo.categories[0]);
//               const newBook=new Books({
//                 title:bookDetail.volumeInfo.title,  
//                 cover:bookDetail.volumeInfo.imageLinks.thumbnail,
//                 author:bookDetail.volumeInfo.authors,              
//                 description:bookDetail.volumeInfo.description,
//                 category:category,
//                 rating:bookDetail.volumeInfo.averageRating || 0,
//                 price: priceDetail || generateRandom(10,50),
//                 ratingcount:bookDetail.volumeInfo.ratingsCount || 0
//               })
//               const bookSave=await newBook.save();
//               await BooksCategory.findOneAndUpdate({title:bookSave.category},{
//                   $push:{
//                     books:{
//                       _id:bookSave._id,
//                       price:bookSave.price,
//                       rating:bookSave.rating,
//                       ratingcount:bookSave.ratingcount
//                     }
//                   }
//               },{ upsert: true, new: true, setDefaultsOnInsert: true })
//               console.log(bookSave);
//               console.log(k++);
//             }
//           }
//         }
//       }
//     }

// }catch(e){
//   console.log(e)
// }

return{
      props:{
        sampledata:{
          booksArray:data.items
        }
      }
  }
}

  