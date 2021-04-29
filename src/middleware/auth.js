
require("dotenv").config();

//middleware for finding userId

 
    const isAuth = (req, res, next) => {
        if(req.session.isAuth){
          next()
        } else {
          res.redirect('/login')
        }
      
    

};
export default isAuth;