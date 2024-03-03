import type { HttpContext } from '@adonisjs/core/http'
import {validateAdmin} from '#validators/admin'
import Admin from '#models/admin';
import User from '#models/user';

export default class AdminsController {
    public async createUser ({request, response}: HttpContext) {
        try{
            const token = request.csrfToken;
            console.log(token)
            const data = request.all();
            const payload = await validateAdmin.validate(data);
            console.log(payload)
    
            const user = new User();
            const verifyUser = await User.find(data.email);
            if(verifyUser){
                response.json({message: "User with this email already exists"});
                return response.redirect('/getUsers');
            }
            user.name = data.name;
            user.email = data.email;
            user.password = data.password;
            await user.save();
            return response.redirect('/getUsers');
        }catch(err){
            return `Error creating User: ${err.message}`;
        }
    }

    public async login ({request, response}: HttpContext) {
        const data = request.all();
        try{
            const token = request.csrfToken;
            console.log(token)
            const payload = await validateAdmin.validate(data);
            console.log(payload)
    
            const admin = await Admin.findByOrFail('name', data.name);
            console.log(admin)
            response.redirect('/getUsers');
        }catch(err){
            return `Error logging in: ${err.message}`;
        }

    }

    public async getAllUsers ({view}: HttpContext) {
        try{
            const users = await User.all();
            // console.log(users);
            return view.render('dashboard/adminDash', { users });
        }catch(err){
            return `Error retriving Users: ${err.message}`;
        }
      }

    public async editUser ({ params, view }: HttpContext){
        const userId = params.id;
        try{
            const user = await User.find(userId);
            // console.log("Edit user", user);
            return view.render('dashboard/editUser', { user });
        }catch(err){
            return `Error editing user: ${err.message}`;
        }

    }

    public async editUserInfo({params, view, request}: HttpContext){
        const userId = params.id
        const userData = request.only(['name', 'email']);
        // console.log("Updated User Info", userData);
        try{
            const user = await User.findOrFail(userId);
            // console.log("Earlier User Info", user);
            user.merge(userData);
            await user.save();
            const users = await User.all();
            return view.render('dashboard/adminDash', {users});
        }catch(err){
            return `Error updating user: ${err.message}`;
        }
    }

    public async deleteUser({params, view}: HttpContext){
        const userId = params.id;
        try{
            const user = await User.findOrFail(userId);
            await user.delete()
            const users = await User.all();
            return view.render('dashboard/adminDash', {users});
        }catch(err){
            return `Error deleting user: ${err.message}`;
        }
    }
}