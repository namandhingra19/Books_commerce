import style from './Homebooks.module.css'
import LayoutMainpage from '../utilities/LayoutMainpage'
import Item from '../utilities/item'
import React from 'react';
type data={
    volumeInfo:{
      imageLinks:{
        thumbnail:string},
      title:string,description:string,
      categories:string[]}
}[]

const Homebooks:React.FC<{data:data}>=(props)=>{
    return(
        <div className={style.main}>
            <div>
                <h1>Best Seller Books</h1>
                <p>Different genres,different world</p>
            </div>
            <div className={style.items}>
                {
                    props.data.map((el)=>{
                        const g=(el.volumeInfo.categories && el.volumeInfo.categories.length>0) ?  el.volumeInfo.categories.join(','): ' ';
                        return(
                            <Item 
                                key='a1'
                                image={el.volumeInfo.imageLinks.thumbnail}
                                name={el.volumeInfo.title}
                                price='23' 
                                description={el.volumeInfo.description.slice(0,100).concat('...')}
                                genre={g}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Homebooks;