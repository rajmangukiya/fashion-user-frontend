import { Button, Card, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiPost } from '../../utils/ApiData';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTabs } from '../../components/baseComponents/Utils'
import './styles.css'

const ItemListing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [activeCategory, setActiveCategory] = useState(location?.state?.categoryId ?? '');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const merchantId = process.env.REACT_APP_MERCHANT;
  const { isLogged } = useSelector((state) => state.authInfo);

  const fetchCategories = async () => {
    try {
        const {data} = await ApiPost('category/getCategories', { merchantId });
        setCategories(data);
        // if (activeCategory == '') {
        //   setActiveCategory(data[0]._id)
        // }
        fetchItems(data[0]._id)
    } catch (error) {
        console.log(error);
    }
  }

  const fetchItems = async (activeCategoryId) => {
    try {
        const {data} = await ApiPost("item/getItems", { merchantId });
        setItems(data);
        // setFilteredItems(data.filter(item => item.category == (activeCategory == '' ? activeCategoryId : activeCategory)))
    } catch (error) {
        console.log(error)
    }
  }

  const handleTabChange = (category) => {
    setActiveCategory(category?._id);
    setFilteredItems(items.filter(item => item.category == category?._id))
  };

  const openItem = (itemId) => () => {
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    fetchCategories()
  }, [])
  
  

  return (
    <div className='item-list-container mt-5 d-flex flex-column flex-grow-1'>
      <CustomTabs
        tabList = {categories} // element should have name key in it
        onTabChange = {handleTabChange}
        keyName = "name"
        defaultIndex = {0}
        reRenderOn = {[items]}
      />
      <div className='d-flex h-100 w-100 flex-wrap justify-content-center p-4'>
          {
            filteredItems?.length
            ?
            filteredItems
              ?.map((item, index) => {
                return (
                  <div key={index} onClick={openItem(item?._id)} className="item-list-card d-flex flex-column align-items-center my-4">
                    <img className="" src={item.images[0]}/>
                    <div className='mt-2 text-black'>{item?.title}</div>
                    <div className='opacity-75'>₹{item?.discountedPrice}.00</div>
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
