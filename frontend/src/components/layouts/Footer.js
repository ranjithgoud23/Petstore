import React from 'react'
import { Fragment } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <Fragment>
      <footer className="footer-distributed">

<div className="footer-left">

  <h3>Pet<span>Store</span></h3>
  <p className="footer-company-name">Group15 © 2022</p>
  <p className="footer-company-about">
  At Natural Remedies we recognize that pet parents are increasingly looking out for natural & safe solutions. Using our years of expertise and knowledge of herbs and animal needs we have a range of ‘All Natural & Safe’ products customized
                        specially for Dogs, Cats, Pups and Kittens of all breeds
  </p>
</div>

<div className="footer-center">

  <div>
    <i className="fa fa-map-marker"></i>
    <p><span>IIIT SriCity</span>Chittor, Andhra Pradesh</p>
  </div>

  <div>
    <i className="fa fa-phone"></i>
    <p>9492382807</p>
  </div>

  <div>
    <i className="fa fa-envelope"></i>
    <p><a to="mailto:mohansaikrishna.m20@iiits.in">group15@iiits.in</a></p>
  </div>

</div>

<div className="footer-right">



<div className="footer-icons">

<a href="https://www.facebook.com/akshaya.teegela"><i className="fa fa-facebook"></i></a>
<a href="https://twitter.com/Mohansa24823899?t=1kp19RFlkiVqLwptLn4Pcw&s=09"><i className="fa fa-twitter"></i></a>
<a href="https://www.instagram.com/ranjith._.goud/?utm_medium=copy_link"><i className="fa fa-instagram"></i></a>
<a href="https://github.com/Mohan0006"><i className="fa fa-github"></i></a>

</div>

</div>

</footer>
    </Fragment>
  )
}

export default Footer
