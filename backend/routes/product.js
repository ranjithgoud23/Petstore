const express =require('express')
const router=express.Router();


const { 
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview

} = require('../controllers/productConrtroller')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 */

/**
 * @swagger
 * /api/v1/products
 *  get: 
 *   summary: Returns the list of products
 *   responses:
 *      200:
 *      description: The list of products 
 */




router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(newProduct);

router.route('/admin/product/:id').
    put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)

router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;

