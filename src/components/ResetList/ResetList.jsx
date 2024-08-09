import axios from "axios";
import Swal from 'sweetalert2';


function ResetList({shoppingList, getShoppingList}) {
    const updateList = () => 
        Swal.fire({
            title: "Change everything to unbought?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "No"
          }).then((result) => {
              if (result.isConfirmed){

                shoppingList.map(item => {
                    if(item.isBought===true){

                        axios({
                            method: 'PUT',
                            url: `/api/list/${item.id}`
                        })
                        .then((response) => {
                            getShoppingList();
                        })
                        .catch((error) => {
                            console.log('Error posting data:', error);
                        })
                    }
                })
              }})
    return (<button onClick={updateList}>Reset</button>
    )
}

export default ResetList;