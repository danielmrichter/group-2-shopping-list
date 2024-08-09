import axios from "axios"
import Swal from 'sweetalert2';

function ClearButton({ getShoppingList, shoppingList }) {
    const clearData = () => shoppingList.map(item => {
        Swal.fire({
            title: "This removes all items; Are you sure you want to delete?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "No"
          }).then((result) => {
              if (result.isConfirmed)
                axios.delete(`/api/list/${item.id}`)
                    .then(res => { getShoppingList() })
                    .catch(err => { console.log(`err in ClearButton: ${err}`) })})
            } )
            
    
    return (
        <button onClick={clearData}>Clear</button>
    )}

export default ClearButton
