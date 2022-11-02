import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import style from './items.module.css'
import useFilter from '../../hooks/use-Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { product } from '../../store/productsstore';
const productActions=product.actions;
const Items=()=>{
    const dispatch=useDispatch();
    const data=useSelector<RootState,{reviews:string,rating:number,price:number[],genre:string[]}>(state=>{
        return{
            reviews:state.products.reviews.value,
            rating:state.products.rating.value,
            price:state.products.price.value,
            genre:state.products.genre.value
        }
    })
    const {paragraph,Handler,crossHandler}=useFilter();

    Handler(data.price,'price',`Price between ${data.price[0]},${data.price[1]}`)
    Handler(data.rating,'rating',`Rating more than ${data.rating}`)
    Handler(data.reviews,'reviews',`Reviews sort ${
        data.reviews==='max'
        ?'Maximum to Minimum'
        :'Minimum to Maximum'
    }`)

    const clickHandler=(value:string)=>{
        dispatch(productActions.intialproductState(value))
        crossHandler(value);
    }
    
    return(
        <div className={style.main}>
            <h1 className={style.heading}>Trending and intersting</h1>
            <h2 className={style.subheading}>Based on ratings and reviews</h2>

            {paragraph.length>0 &&
                <div className={style.filter}>
                    
                    <p>Filter:</p>
                    <div className={style.filtersused}>
                        {paragraph.map((el)=>{
                            return (
                                <div key={el.key} className={style.Singlefilterused}>
                                    <p>{el.para}</p>
                                    <FontAwesomeIcon icon={faXmark} onClick={clickHandler.bind(null,el.key)} className={style.icon}/>
                                </div>
                            )
                        })}
                    </div>  
                </div>
            }
        </div>
    )
}
export default Items;