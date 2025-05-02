async function validateSignup(req, res, next){
    
    
    try{
        if(!req.body.fullName) return res.status(400).json({ success:false, message: 'Full name is required'})
        if(!req.body.email) return res.status(400).json({ success:false, message: 'Email is required'})
        if(!req.body.password) return res.status(400).json({ success:false, message: 'Password is required'})
        
        const { fullName, email, password } = req.body
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(fullName.length < 3 ) return res.status(400).json({ success:false, message: 'Please provide a valid Full name'})
        if(!emailRegEx.test(email)) return res.status(400).json({ success:false, message: 'Please provide a valid Email'})
        if(password.length < 8 ) return res.status(400).json({ success:false, message: 'Please provide a valid Password'})
        
            next()
  }
  catch(ex){
    next(ex)
    console.log('Validate Signup', ex.message);
  }
}

export default validateSignup;