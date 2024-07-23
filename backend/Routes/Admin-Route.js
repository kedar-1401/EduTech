const express =require('express')

const router=express.Router();
const adminController=require('../controllers/AdminController')
const authmiddleware=require('../middlewares/auth-middleware')
const adminmiddleware=require('../middlewares/admin-middleware')
router.route('/users').get(authmiddleware,adminmiddleware,adminController.getUserData)
router.route('/contacts').get(authmiddleware,adminmiddleware,adminController.getContactData)
router.route('/users/delete/:id').delete(authmiddleware,adminmiddleware,adminController.deleteuser)
router.route('/users/:id').get(authmiddleware,adminmiddleware,adminController.getuser)
router.route('/users/update/:id').patch(authmiddleware,adminmiddleware,adminController.updateuser);
router.route('/contacts/delete/:id').delete(authmiddleware,adminmiddleware,adminController.deletecontact)
router.route('/services').get(authmiddleware,adminmiddleware,adminController.getservicedata)
router.route('/services/:id').get(authmiddleware,adminmiddleware,adminController.getservice)
router.route('/services/delete/:id').delete(authmiddleware,adminmiddleware,adminController.deleteservices)
router.route('/services/update/:id').patch(authmiddleware,adminmiddleware,adminController.updateservice);
router.route('/services/add').post(authmiddleware,adminmiddleware, adminController.addService)
module.exports=router