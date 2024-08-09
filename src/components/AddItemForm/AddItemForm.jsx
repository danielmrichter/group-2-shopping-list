import { useState } from 'react'
import axios from 'axios'

function AddItemForm({getShoppingList}) {
    // state to track the three inputs...
    const [itemName, setitemName] = useState(``)
    const [itemQuantity, setItemQuantity] = useState(``)
    const [itemUnit, setItemUnit] = useState(``)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // console.log(`Consider your form submit HANDLED!`)
        axios({
            method: `POST`,
            url: `/api/list`,
            data: {
                itemName: itemName,
                itemQuantity: itemQuantity,
                itemUnit: itemUnit
            }
        })
        .then((response) => {
            // console.log(`Postied!`)
            getShoppingList()
            setitemName(``)
            setItemQuantity(``)
            setItemUnit(``)
        }).catch((err) => {
            console.log(`Error in POST/api/list!`, err)
        })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Item:
                <input 
                className='formField'
                required type="text" 
                placeholder="Item"
                value={itemName} 
                onChange={(e) => setitemName(e.target.value)}/>
            </label>
            <label>
                Quantity:
                <input
                className='formField' required type="Number"
                placeholder="Quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}/>
            </label>
            <label>
                Unit:
                <input required 
                className='formField'
                type="text" 
                placeholder="Unit"
                value={itemUnit}
                onChange={(e) => setItemUnit(e.target.value)} />
            </label>
            <button className="green">Submit</button>
        </form>
    )
}

export default AddItemForm