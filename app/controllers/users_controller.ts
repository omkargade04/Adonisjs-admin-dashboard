import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';



export default class UserController {
    public async login ({request, auth, response}: HttpContext){

        const data = request.all();
        const token = request.csrfToken;
        console.log(token)
        console.log(data)
        const user = await User.findByOrFail('email', data.email);
        console.log("initial logging user", user);
        if (!user) {
            response.abort('Invalid credentials')
          }
          console.log("This is user password",user.password)
        const isHash = await hash.verify(user.password, data.password)
        console.log("This is isHash ", isHash);
        
        if(isHash){
            const authh = await auth.use('web').login(user);
            console.log(authh)
            console.log("After authentication",user)
            response.redirect('/dashboard')
        }else{
            console.log("Wrong Password");
            return response.redirect("/");
        }

    }
}
