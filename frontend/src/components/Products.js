import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
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

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([10, 1000])
  const [category, setCategory] = useState('')
  const [rating,setRating] = useState(0);
  const [animal, setAnimal] = useState('');
  const [check,setCheck] = useState();  
  const categories = [
    'Medicines',
    'Accessories',
    'Food'
  ]
  const animals = [
    'Cat',
    'Dog',
    'Fish'
  ]
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, error, productsCount, resPerPage,filteredProductsCount } = useSelector(state => state.products)
  // console.log("?Helllllo",products);
  const params = useParams();
  const keyword = params.keyword;
  console.log(products);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price,category,animal,rating));

  }, [dispatch, alert, error, currentPage, keyword, price,category,animal,rating])

   let count = productsCount;
   if(animal||category||rating){
        count = products.length;
        console.log(products);
   }

  return (
    <Fragment>

      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Buy Best Pet Products Online'} />
          <section id="products" className="container mt-5">
            <div className="row">
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: '₹10',
                          1000: '₹1000'
                        }}
                        min={20}
                        max={2000}
                        defaultValue={[20, 2000]}
                        tipFormatter={value => `₹${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />

                        <hr className="my-5" />
                         <div className="mt-5">
                           <h4 className="mb-3 heading-subtile">
                            Categories
                           </h4>
                           <ul className = "pl-0">
                            {categories.map(category=>(
                              <li style = {{cursor:'pointer',
                              listStyleType : 'none'}}
                              key = {category}
                              onClick={() => setCategory(category) }
                            >
                             {category}
                            </li>
                            ))}
                           </ul>
                         </div>

                         <hr className="my-5" />
                         <div className="mt-5">
                           <h4 className="mb-3 heading-subtile">
                            Animals
                           </h4>
                           <ul className = "pl-0">
                            {animals.map(animal=>(
                              <li style = {{cursor:'pointer',
                              listStyleType : 'none'}}
                              key = {animal}
                              onClick={() => setAnimal(animal) }
                            >
                             {animal}
                            </li>
                            ))}
                           </ul>
                         </div>
                        {/* ////////////// */}


                        <hr className="my-5" />
                         <div className="mt-5">
                           <h4 className="mb-3 heading-subtile">
                            Ratings
                           </h4>
                           <ul className = "pl-0">
                            {[5,4,3,2,1].map(star=>(
                              <li style = {{cursor:'pointer',
                              listStyleType : 'none'}}
                              key = {star}
                              onClick={() => setRating(star) }
                            >
                             {category}
                             <div className="rating-outer">
                              <div className="rating-inner"
                              
                              style = {{
                                width : `${star*20}%`
                              }}
                              
                              >

                              </div>
                             </div>
                            </li>
                            ))}
                           </ul>
                         </div>

                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map(product => (
                        <Product key={product._id} product={product} size={5}/>
                      ))}
                    </div>
                  </div>
                </Fragment>

          
              


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

export default Products
