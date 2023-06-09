import { Button, Card, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
import { ApiPost } from '../utils/ApiData';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/reducer/authReducer';

const ItemListing = () => {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const merchantId = process.env.REACT_APP_MERCHANT;
  const { isLogged } = useSelector((state) => state.authInfo);
  const cartData = useSelector((state) => state.cart);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
        const {data} = await ApiPost('category/getCategories', { merchantId });
        console.log("categories", data);
        setCategories(data);
    } catch (error) {
        console.log(error);
    }
  }

  const fetchItems = async () => {
    try {
        const {data} = await ApiPost("item/getItems", { merchantId });
        console.log("items", data);
        setItems(data);
    } catch (error) {
        console.log(error)
    }
  }

  const addToCartHandler = (item) => async () => {
    try {
      if (isLogged) {
        dispatch(addToCart(item));
        await ApiPost("item/addToCart", { itemId: item._id, quantity: 1 });
      }
      else {
        navigate('/sign-in')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchItems()
  }, [])
  

  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3 item-listing-tabs mt-5"
      variant='pills'
      justify
      style={{ whiteSpace: "nowrap" }}
    >
      {
      categories.map(category => {
        return (
          <Tab eventKey={category.name} title={category.name}>
            <Container fluid >
              <Row className='justify-content-center'>
              { 
              items.map(item => {
                // console.log(item.category, );
                if(item.category == category._id) {
                  return (
                    <Card className='m-2' style={{ width: '18rem' , border: "none"}}>
                      <Card.Img variant="top" src={item.images[0]} alt={item.name} style={{ cursor:"pointer" }} onClick={() => {navigate(`/item/${item._id}`)}}/>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.price} Rs.</Card.Text>
                        <Button variant="outline" onClick={addToCartHandler(item)} className='item-listing-add-to-cart'>Add To Cart</Button>
                      </Card.Body>
                    </Card>  
                  )
                }
              })
            }
            </Row>
            </Container>
          </Tab>
          )
      })
      }
    </Tabs>
  );
}

export default ItemListing;