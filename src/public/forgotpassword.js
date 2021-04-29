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
} //end
  
//
const form = document.getElementById("myform");

form.addEventListener('submit', async (e) => {
	//console.log(e.window.location)
	e.preventDefault();
//get values
const email = form.email.value;
 console.log(email,"******")
/*try {
		const res = await fetch('/forgotpassword',{
	   method: 'POST',
	   body: JSON.stringify({ email }),	
	   headers: {'Content-Type': 'application/json'}
	   });
	   const data = await res.json()
	   console.log(data);
	}
	catch (error) {
	  // console.log(error);
	  throw new Error(error.toString())
	 }*/
	 const res = await fetch('/forgotpassword',{
		method: 'POST',
		body: JSON.stringify({ email }),	
		headers: {'Content-Type': 'application/json'}
		});
		const data = await res.json()
		if(data.error){
			console.error(data.error)
		}

  });
	
 
