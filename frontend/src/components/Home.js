import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import { Link } from 'react-router-dom'
import '../App.css'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/product';
import Loader from './layouts/Loader';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([10, 1000])
  const [category, setCategory] = useState('')
  const [rating,setRating] = useState(0);
  const [animal, setAnimal] = useState('');
  const categories = [
    'Medicines',
    'Accessories',
    'Food'
  ]
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, error, productsCount, resPerPage,filteredProductsCount } = useSelector(state => state.products)
  console.log(products);
  const params = useParams();
  const keyword = params.keyword;
  console.log(keyword);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price,category,animal,rating));

  }, [dispatch, alert, error, currentPage, keyword, price,category,animal,rating])

   let count = productsCount;
   if(keyword){
        count = filteredProductsCount;
   }

  return (
    <Fragment>

      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Buy Best Pet Products Online'} />


          <div className="row" id = "home1">
            <div className="col-6">
                <h1>Our Products Will Make Your Pet Happy<br/>Belive US!</h1>
                <p>Animals are sentient, intelligent, perceptive, funny and entertaining. We owe them a duty of care as we do to children.</p>
                <Link to="/products" class="btn">Explore Now &#8594;</Link>
            </div>
            <div className="col-6">
                <img src="images/products.avif"/>
            </div>
        </div>


          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              
                {products && products.slice(0, 4).map(product => (
                  <Product key={product._id} product={product} size={3}/>
                ))}
              
              

            </div>
          </section>
        </Fragment>
      )

      }
      {resPerPage <= count && (
        <div className="d-flex justify-content-centre mt-5">
          <Pagination activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
          >

          </Pagination>

        </div>)}



    </Fragment>
  )
}

export default Home
