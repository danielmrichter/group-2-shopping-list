import { useState, useEffect } from 'react';
import axios from 'axios'
import AddItemForm from '../AddItemForm/AddItemForm.jsx';
import Header from '../Header/Header.jsx'
import ShoppingList from '../ShoppingList/ShoppingList.jsx';
import './App.css';
import ResetList from '../ResetList/ResetList.jsx'
import ClearButton from '../DeleteButton/ClearButton.jsx';



function App() {
    const [shoppingList, setShoppingList] = useState([]);
    useEffect(() => {
        getShoppingList()
    }, []
    )
    const getShoppingList = () => {
        axios.get('/api/list')

            .then((response) => {
                setShoppingList(response.data);
            })
            .catch((error) => {
                console.log("error getting shopping list", error);
            })
    }
    return (
        <div className="App">
            <Header />
            <main>
                <AddItemForm getShoppingList={getShoppingList}/>
                <h1>Shopping List</h1>
                <ResetList shoppingList={shoppingList} getShoppingList={getShoppingList}/>
                <ClearButton shoppingList={shoppingList} getShoppingList={getShoppingList}/>
                <ShoppingList shoppingList={shoppingList} getShoppingList={getShoppingList} />                

            </main>
        </div>
    );
}

export default App;
