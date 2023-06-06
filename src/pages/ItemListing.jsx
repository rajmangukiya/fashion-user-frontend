import { Button, Card, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
function ItemListing() {
  const categories = [
    {
      id: 1,
      name: "ABC"
    },
    {
      id: 2,
      name: "1"
    },
    {
      id: 3,
      name: "2"
    },
    {
      id: 4,
      name: "3"
    },
    {
      id: 5,
      name: "4"
    }
  ]
  const items = [
    {
      id: "1",
      name: "Produxt 1",
      images: ["https://www.jiomart.com/images/product/500x630/rvshlv2qz5/amira-s-india-ethnic-wear-womens-rayon-printed-flared-gown-orange-product-images-rvshlv2qz5-0-202211172145.jpg"],
      price: 3000,
      discountedPrice: 2000,
      category: "5",
      details: "XYZ",
      isDisabled: false,
      merchant: "",
    },
    {
      id: "2",
      name: "Produxt 2",
      images: ["https://www.jiomart.com/images/product/500x630/rvshlv2qz5/amira-s-india-ethnic-wear-womens-rayon-printed-flared-gown-orange-product-images-rvshlv2qz5-0-202211172145.jpg"],
      price: 3000,
      discountedPrice: 2000,
      category: "1",
      details: "XYZ",
      isDisabled: false,
      merchant: "",
    },
    {
      id: "3",
      name: "Produxt 3",
      images: ["https://www.jiomart.com/images/product/500x630/rvshlv2qz5/amira-s-india-ethnic-wear-womens-rayon-printed-flared-gown-orange-product-images-rvshlv2qz5-0-202211172145.jpg"],
      price: 3000,
      discountedPrice: 2000,
      category: "2",
      details: "XYZ",
      isDisabled: false,
      merchant: "",
    },
    {
      id: "4",
      name: "Produxt 4",
      images: ["https://www.jiomart.com/images/product/500x630/rvshlv2qz5/amira-s-india-ethnic-wear-womens-rayon-printed-flared-gown-orange-product-images-rvshlv2qz5-0-202211172145.jpg"],
      price: 3000,
      discountedPrice: 2000,
      category: "3",
      details: "XYZ",
      isDisabled: false,
      merchant: "",
    },
    {
      id: "5",
      name: "Produxt 5",
      images: ["https://www.jiomart.com/images/product/500x630/rvshlv2qz5/amira-s-india-ethnic-wear-womens-rayon-printed-flared-gown-orange-product-images-rvshlv2qz5-0-202211172145.jpg"],
      price: 3000,
      discountedPrice: 2000,
      category: "4",
      details: "XYZ",
      isDisabled: false,
      merchant: "",
    },
  ]
  const navigate = useNavigate()
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3 item-listing-tabs"
      variant='pills'
      justify
    >
      {
      categories.map(category => {
        return (
          <Tab eventKey={category.name} title={category.name}>
            <Container fluid >
              <Row className='justify-content-center'>
              { 
              items.map(item => {
                if(item.category == category.id) {
                  return (
                    <Card className='m-2' style={{ width: '18rem' , border: "none"}}>
                      <Card.Img variant="top" src={item.images[0]} alt={item.name} style={{ cursor:"pointer" }} onClick={() => {navigate(`/item/${item.id}`)}}/>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.price} Rs.</Card.Text>
                        <Button variant="outline" className='item-listing-add-to-cart'>Add To Cart</Button>
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