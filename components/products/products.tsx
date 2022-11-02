import Filters from './filters';
import Items from './items';
import style from './products.module.css'

const Products=()=>{
    console.log('2nd time');
    return(
    <div className={style.main}>
        <Filters/>
        <Items/>
    </div>
    )
}

export default Products;