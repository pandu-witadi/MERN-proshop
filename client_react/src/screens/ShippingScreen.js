//
//
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button} from 'react-bootstrap'

// import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../store/actions/cart'


const ShippingScreen = ({ history }) => {
    const cart = useSelector( state => state.cart )
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        // console.log('submit')
        dispatch( saveShippingAddress({address, city, country}) )
        history.push('/payment')
    }

    return (
        <div>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        onChange={ (e) => setAddress(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        onChange={ (e) => setCity(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='texts'
                        placeholder='Enter country'
                        value={country}
                        onChange={ (e) => setCountry(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </div>
    )
}

export default ShippingScreen
