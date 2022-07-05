const express = require("express");
const { getAllProducts,
    createProduct,
    updateProduct, 
    deleteProduct,
    getProductDetails, 
    createProductReview,
    getProductReviews,
    getAdminProducts,
    getUserProduct,
    deleteReview,
 } = require("../controllers/productController");
const { isAuthenticationUser,authorizeRoles } = require("../middleware/authen");

const router = express.Router();

//making route and giving path of allproducts
router.route("/products").get( getAllProducts);

//making path for admin to get the produts details
router.route("/admin/products").get(isAuthenticationUser, getAdminProducts)

router.route("/user/products").get(isAuthenticationUser, getUserProduct)

router.route("/admin/product/new").post(isAuthenticationUser,createProduct);
router.route("/user/product/new").post(isAuthenticationUser,createProduct);


router.route("/admin/product/:id")
.put(isAuthenticationUser, authorizeRoles("admin"),updateProduct)
.delete(isAuthenticationUser, authorizeRoles("admin"),deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticationUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticationUser,deleteReview);

//exporting router
module.exports = router