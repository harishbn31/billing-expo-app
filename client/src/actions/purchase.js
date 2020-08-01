import axios from '../config/axios'
import Swal from 'sweetalert2'
import { UpdateStockQtyPurchase } from './stock'

const getPurchase = (purchases) => {
    return {
        type: 'PURCHASES_LIST', payload: purchases
    }
}
const addPurchase=(purchase)=>{
    return {
        type: "ADD_PURCHASE", payload: purchase
    }
}

export const getPurchasesList = () => {
    return (dispatch) => {
        axios.get('/purchases')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getPurchase(response.data))
                }
            })
            .catch(err => {
                console.log('error purchases', err)
                // history.push('/')
            })
    }
}
export const startAddPurchase = (data) => {
    return (dispatch) => {
        axios.post('/purchases',data)
            .then(response => {
                // console.log(response)
                if(response.data.errors){
                    Swal.fire({
                        type: 'info',
                        text: "Check the fileds"
                    })
                }else{
                    const purchase = response.data;
                    dispatch(addPurchase(purchase));
                    purchase.products.map( product => {
                        const data = {};
                        data.quantity = product.quantity;
                        dispatch(UpdateStockQtyPurchase(product.stock, data))
                        return null
                    })
                }
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    text: err
                })
            })
    }
}