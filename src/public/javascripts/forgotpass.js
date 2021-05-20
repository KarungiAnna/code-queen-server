function sendlink()
{
    const Email = document.getElementById("email").value;

    let letters = /^[A-Za-z]+$/;
	let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

     if(Email==="")
	{
		alert("Please enter your user email");
	}
	else if (!filter.test(Email))
	{
		alert("Invalid email");
    }
    else
    {				                            
        alert("An email will be sent to you shortly!");
    }

   const form =document.getElementById("myform")
    
   form.addEventListener("submit",function(e){
       e.preventDefault()
   })
    
   fetch("https://localhost:3000/forgotpass",{
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
