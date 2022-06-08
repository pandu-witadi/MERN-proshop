//
//
import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    // ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL
} from '../constants/order'


export const createOrder = (order) => async( dispatch, getState ) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userInfo.accessToken
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}

export const getOrderDetails = (id) => async( dispatch, getState ) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'x-access-token': userInfo.accessToken
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async( dispatch, getState ) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userInfo.accessToken
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}


export const listMyOrders = () => async( dispatch, getState ) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'x-access-token': userInfo.accessToken
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}
