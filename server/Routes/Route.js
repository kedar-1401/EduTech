const express =require('express')

const router=express.Router();
const controller=require('../controllers/controller')
const contactController=require('../controllers/ContactController')
const validatemiddleware=require('../middlewares/validate-middleware');
const authmiddleware=require('../middlewares/auth-middleware')
const signupSchema=require('../validators/auth-validator')
router.route('/').get(controller.home)

router.route('/signup').post(controller.reg)
router.route('/login').post(controller.login)
router.route('/contact').post(contactController.Contact)

router.route('/user').get(authmiddleware,controller.user)
router.route('/services').get(contactController.services)

module.exports=router