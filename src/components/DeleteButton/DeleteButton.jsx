import axios from 'axios'
import Swal from 'sweetalert2';

function DeleteButton({id, getShoppingList}) {
    const handleDelete = () => {
        Swal.fire({
            title: "Remove this item?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "No"
          }).then((result) => {
              if (result.isConfirmed) {
                axios.delete(`/api/list/${id}`)
                    .then(response => {
                        getShoppingList()
                    })
                    .catch(err => {
                        console.log(`Error Deleting item!`, err)
                    }) 
            }
        })
    }
return <button className="red" onClick={() => handleDelete(id)}>Delete</button>       

}

export default DeleteButton