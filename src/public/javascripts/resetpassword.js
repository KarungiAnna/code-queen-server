function resetpassword()
{
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cfmpassword").value;

    let password_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    let letters = /^[A-Za-z]+$/;
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    

    
    if(password==="")
	{
		alert("Please enter your new Password");
	}
	else if(confirmPassword==="")
	{
		alert("Confirm your Password");
	}
	else if(!password_expression.test(password))
	{
		alert ("Upper case, Lower case, Special character and Numeric letter are required in Password field");
	}
	else if(password!= confirmPassword)
	{
		alert ("Passwords do not Match");
	}
	else if(document.getElementById("cfmpassword").value.length < 8)
	{
		alert ("Password minimum length is 8");
	}
	else if(document.getElementById("cfmpassword").value.length > 12)
	{
		alert ('Password max length is 12');
	}
    else
    {
        alert ( "You have successfully reset your password")
    }
	

   const form =document.getElementById("myform")
    
   form.addEventListener("submit",function(e){
       e.preventDefault()
   })
    
   fetch("https://localhost:3000/resetpassword",{
    method: "POST",
    body:JSON.stringify({
        body:Email,
    })
      .then (function(response){
          return response.json()
      })
      .then(function(data){
          console.log(data)       
        })
 
   })


}
