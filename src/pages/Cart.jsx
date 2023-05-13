import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { remove } from '../store/cartSlice'

const Cart = () => {
    const cartedItems = useSelector(state => state.cart);
    const dispatch = useDispatch()
    console.log(":::::", cartedItems)

    const removeFromCart = (itemID) =>  {
        dispatch(remove(itemID))
    }

  return (
    <div className='d-flex flex-column align-items-center'>
        <h3>Cart</h3>
        <div className='d-flex w-100 justify-content-center flex-wrap'>
            {cartedItems.map(item => (
                <div className="cartCard" key={item.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" onClick={() => removeFromCart(item.id)}>Remove</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cart