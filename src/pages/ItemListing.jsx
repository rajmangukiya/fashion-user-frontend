import { Button, Card, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiPost } from '../utils/ApiData';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/reducer/authReducer';

const ItemListing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [activeCategory, setActiveCategory] = useState(location.state.categoryId);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const merchantId = process.env.REACT_APP_MERCHANT;
  const { isLogged } = useSelector((state) => state.authInfo);
  const cartData = useSelector((state) => state.cart);

  const fetchCategories = async () => {
    try {
        const {data} = await ApiPost('category/getCategories', { merchantId });
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
        setFilteredItems(data.filter(item => item.category == activeCategory))
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

  const handleTabChange = (categoryId) => () => {
    setActiveCategory(categoryId);
    setFilteredItems(items.filter(item => item.category == categoryId))
  };

  const openItem = (itemId) => () => {
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    fetchCategories()
    fetchItems()
  }, [])
  
  

  return (
    // <Tabs
    //   activeKey={activeTab}
    //   onSelect={handleTabSelect}
    //   id="justify-tab-example"
    //   className="mb-3 item-listing-tabs mt-5 pt-5 mb-5"
    //   variant='pills'
    //   justify
    //   style={{ whiteSpace: "nowrap" }}
    // >
    //   {
    //   categories.map(category => {
    //     return (
    //       <Tab eventKey={category._id} title={category.name}>
    //         <Container fluid >
    //           <Row className='justify-content-center'>
              // { 
              // items.map(item => {
              //   if(item.category == category._id) {
              //     return (
              //       <Card className='m-2' style={{ width: '18rem' , border: "none"}}>
              //         <Card.Img variant="top" src={item.images[0]} alt={item.name} style={{ cursor:"pointer",width: "100%",height: "100%",objectFit: "cover"}} onClick={() => navigate(`/item/${item._id}`,{state: {item, categoryName: category.name}})}/>
              //         <Card.Body>
              //           <Card.Title>{item.title}</Card.Title>
              //           <Card.Text>{item.price} Rs.</Card.Text>
              //           <Button variant="outline" onClick={addToCartHandler(item)} className='item-listing-add-to-cart'>Add To Cart</Button>
              //         </Card.Body>
              //       </Card>
              //     )
              //   }
              // })
            // }
    //         </Row>
    //         </Container>
    //       </Tab>
    //       )
    //   })
    //   }
    // </Tabs>
    <div className='mt-5 p-5 d-flex flex-column flex-grow-1'>
      <div className='d-flex mb-3'>
        {
          categories.map((category, index) => (
            <div 
              key={index} 
              onClick={handleTabChange(category?._id)} 
              style={{cursor: 'pointer'}} 
              className={`${category._id == activeCategory ? 'selected-tab' : 'border border-1'} px-5 py-2 mx-2`}
            >
              {category.name}
            </div>
          ))
        }
      </div>
      <div className='d-flex h-100 p-5 w-100 justify-content-between flex-wrap'>
          {
            filteredItems?.length
            ?
            filteredItems
              ?.map((item, index) => {
                return (
                  <div key={index} style={{cursor: 'pointer'}} onClick={openItem(item._id)} className="d-flex flex-column align-items-center my-4">
                    <img style={{width: '300px', height: '400px', objectFit: 'cover'}} className="" src={item.images[0]}/>
                    <div className='mt-2 text-black'>{item.title}</div>
                    <div className='opacity-75'>₹{item.discountedPrice}.00</div>
                  </div>
                )
            })
            :
            <h1 className='w-100 h-50 text-center'>No Products Available</h1>
          }
        </div>
    </div>
  );
}

export default ItemListing;
