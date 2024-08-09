import '../App/App.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import { useState } from 'react';
import MarkAsBoughtButton from '../MarkAsBoughtButton/MarkAsBoughtButton';
import axios from 'axios';
import './ShoppingItems.css'


function ShoppingItems({ item, getShoppingList }) {
    // useEffect to set the 
    const [currentQuant, setCurrentQuant] = useState(item.itemQuantity)
    const [currentName, setCurrentName] = useState(item.itemName)
    const [currentUnit, setCurrentUnit] = useState(item.itemUnit)

    const handleNameChange = (e) => {
        axios({
            method: `PATCH`,
            url: `/api/list/${item.id}`,
            data: {
                itemName: e.target.value,
                itemQuantity: currentQuant,
                itemUnit: currentUnit
            }
        })
            .then(res => {
                setCurrentName(e.target.value)
            })
            .catch(err => {
                console.log(`Err in handleNameChange: ${err}`)
            })
    }
    const handleChangeQuant = (e) => {
        axios({
            method: `PATCH`,
            url: `/api/list/${item.id}`,
            data: {
                itemName: currentName,
                itemQuantity: e.target.value,
                itemUnit: currentUnit
            }
        })
            .then(res => {
                setCurrentQuant(e.target.value)
            })
            .catch(err => {
                console.log(`Err in handleChangeQuant: ${err}`)
            })
    }
    const handleUnitChange = (e) => {
        axios({
            method: `PATCH`,
            url: `/api/list/${item.id}`,
            data: {
                itemName: currentName,
                itemQuantity: currentQuant,
                itemUnit: e.target.value
            }
        })
            .then(res => {
                setCurrentUnit(e.target.value)
            })
            .catch(err => {
                console.log(`Err in handleUnitChange: ${err}`)
            })
    }
    const markAsBought = () => {
        axios.put(`/api/list/${item.id}`)
        .then(res => getShoppingList())
        .catch(err => console.log(`Error in markAsBought ${err}`))
    }
    return(
        <div key={item.id} className={item.isBought === false ? "card" : "graycard"}>
            <p><input
                value={currentName}
                onBlur={handleNameChange}
                onChange={(e) => setCurrentName(e.target.value)} /></p>
            <p>
                <input
                    value={currentQuant}
                    onChange={(e) => setCurrentQuant(e.target.value)}
                    onBlur={handleChangeQuant} />
                <input
                    onBlur={handleUnitChange}
                    value={currentUnit}
                    onChange={(e) => setCurrentUnit(e.target.value)} />
            </p>
            <span className={item.isBought === false ? 'buttonContainer' : 'noDisplay'}>
                <MarkAsBoughtButton id={item.id} getShoppingList={getShoppingList} markAsBought={markAsBought}/>
                <DeleteButton id={item.id} getShoppingList={getShoppingList} />
            </span>
            <span className={item.isBought === false ? 'noDisplay' : ''}>
                Item Purchased
                <button className='unmarkButton' onClick={markAsBought}>Unmark As Purchased</button>
            </span>
        </div>
    )
}

export default ShoppingItems;