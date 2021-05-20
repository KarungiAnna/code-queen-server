    
	function togglePassword() {
		let x =document.getElementById("password");
		if (x.type === "password") {
			x.type ="text";
		} else {
			x.type = "password";
		}
	}
	
    function register()
	{

		let firstName= document.getElementById("firstname").value;
		let lastName= document.getElementById("lastname").value;
		let email= document.getElementById("email").value;
		let username= document.getElementById("username").value;
		let password= document.getElementById("password").value;			
		

		let password_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
		let letters = /^[A-Za-z]+$/;
		let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		 if(firstName==="")
	{
		alert("Please enter your First Name");
	}
	else if(!letters.test(firstName))
	{
		alert("Name field requires only alphabet characters"); 
	}
	else if(lastName==="")
	{
		alert("Please enter your Last Name");
	}
	else if(!letters.test(lastName))
	{
		alert("Name field requires only alphabet characters");
	}
	else if(username==="")
	{
		alert("Please enter your username");
	}
	else if(!letters.test(username))
	{
		alert("UserName field requires only alphabet characters"); 
	}
	else if(email==="")
	{
		alert("Please enter your user email");
	}
	else if (!filter.test(email))
	{
		alert("Invalid email");
	}
	
	else if(password==="")
	{
		alert("Please enter your Password");
	}
	
	else if(!password_expression.test(password))
	{
		alert ("Upper case, Lower case, Special character and Numeric letter are required in Password field");
	}
	
	else if(document.getElementById("password").value.length < 8)
	{
		alert ("Password minimum length is 8");
	}
	else if(document.getElementById("password").value.length > 12)
	{
		alert ('Password max length is 12');
	}
	else
	{				                            
		   alert("Thank You for signing up");
		    
   }
   //beginning

//ends
}


const form = document.getElementById("signupform");
form.addEventListener('submit', async (e) => {
	e.preventDefault();
 //get values
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
	const username = form.username.value;
	const email = form.email.value;
	const password = form.password.value;
    
 try {
	 const res = await fetch('/signup',{
	method: 'POST',
	body: JSON.stringify({ firstname, lastname, username, email, password }),	
	headers: {'Content-Type': 'application/json'}
	});
	const data = await res.json();
	console.log(data);
	if (data.user) {
		location.assign('/');
	  }
 }
 catch (error) {
	console.log(error);
  }
 });	
	