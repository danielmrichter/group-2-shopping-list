import '../App/App.css';
import ShoppingItems from '../ShoppingItems/ShoppingItems';



function ShoppingList ({shoppingList, getShoppingList}) {
    return(
        <div className='itemArea'>
            {shoppingList.map((item) => {
            return (
            <ShoppingItems
            key={item.id} 
            item={item}
            getShoppingList={getShoppingList} 
            />
            )})}
        </div>
    )
}

export default ShoppingList;