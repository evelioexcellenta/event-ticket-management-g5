import Axios from 'axios'
import { API_URL } from '../../constants/API'

export const getCartData = (userId) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/carts/get`, {
                params: {
                    userId,
                }
            })
            .then((result) => {
                //dispatch to cart reducer dengan payload => result data
                dispatch({
                    type: "FAIL_CART",
                    payload: result.data,
                })
            })
            .catch(() => {
                alert("Terjadi kesalahan di server")
            })
    }
}