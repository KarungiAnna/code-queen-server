function validateform()
{
 let username= document.getElementById("username").value;
 let password= document.getElementById("password").value;

 let password_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
 let letters = /^[A-Za-z]+$/;
 

 if (username==="")
 {  
    alert("Username can't be blank");   
 }
 else if(!letters.test(username))
	{
		alert("UserName field requires only alphabet characters"); 
	}
 else if(password==="")
	{
		alert("Please enter your Password");
	}
 else if(!password_expression.test(password))
	{
		alert ("Upper case, Lower case, Special character and Numeric letter are required in Password field");
	}
 else if(password.length<8)
   {  
    alert("Password must be at least 8characters long.");  
      
    }  
 else
	{				                            
		   alert("Thank You! You have successfully logged in.");
		   // Redirecting to the studentprofile page. 
		  // window.location = "studentprofile.html"; 
	}//begins
	
//ends	
} 

const form =document.getElementById("loginform");
form.addEventListener('submit', async (e) => {
    e.preventDefault();
	
	 
	 // get values
	 const username = form.username.value;
	 const password = form.password.value;
	 try {
		 const res = await fetch('/login',{
		method: 'POST',
		body: JSON.stringify({ username, password }),	
		headers: {'Content-Type': 'application/json'}
		});
		const data = await res.json();
		console.log(data);
		if (data.user) {
			//location.assign('/profile');
			
		  }
	
	 }
	 catch (error) {
		console.log(error);
	  }
});
	