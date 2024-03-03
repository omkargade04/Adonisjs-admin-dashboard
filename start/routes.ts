import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const adminController = () => import('#controllers/admins_controller')
const userController = () => import('#controllers/users_controller')

router.on('/').render('pages/home')
router.on('/createUser').render('auth/createUser')
router.on('/adminLogin').render('auth/adminLogin')
router.on('/userLogin').render('auth/userLogin')
router.on('/editUser').render('dashboard/editUser')
router.post('/createUser', [adminController, 'createUser'])
router.post('/adminLogin', [adminController, 'login'])
router.get('/editUser/:id', [adminController, 'editUser']);
router.get('/editUserInfo/:id', [adminController, 'editUserInfo']);
router.get('/getUsers', [adminController, 'getAllUsers']);
router.get('/deleteUser/:id', [adminController, 'deleteUser'])
router.post('/userLogin', [userController, 'login'] )
router
 .get('dashboard', async ({auth, view}) => {
    await auth.authenticate()
    const user = auth.getUserOrFail()
    await user.$attributes.name
    return view.render('dashboard/userDash')
 })
 .use(middleware.auth())

 router
  .post('/logout', async ({ auth, response }) => {
    console.log("Entered")
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())

router.post('/adminLogout', async({response}) => {
  return response.redirect('/');
})
