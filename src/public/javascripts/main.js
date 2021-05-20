$(function(){
    // dashboard

    $("#sidebarCollapse").click(function(){
    $("#sidebar").toggleClass('active');
    $(".content-wrapper").toggleClass('content-toggle')
    });

    //managing user registration code
    let users =[
    //     {
    //     id: 1,
    //     Name: "Kamatsiko Brenda",
    //     Sex: 'Female',
    //     Email: 'jah@gmail.com',
    //     PhoneNumber: 789056643,
    //     Role: 'Facilitator',
    // }
]
    
    // Delete user by id
    const deleteUser = (id) => {
        const UserIndex = users.findIndex((user) => user.id === id)
        // renderUserDOM(newUsers)

        if (userIndex > -1) {
            users.splice(userIndex, 1)
        }else{
            alert('failed to delete user')
        }
        renderUserDOM(users)
    }

    let renderUserDOM = (user)=>{
        let tableRow = $('<tr>' , {class: 'tableRow'});
        let deleteButton = $('<button>Delete</button>').click(function(){
            deleteUser(user.id);
            
        });

        deleteButton.addClass('delete-user-btn btn btn-danger');

        $('.user-display-area').append(tableRow);
        
        let userId = $(`<td>${user.id}</td>`);
        let userName = $(`<td>${user.Name}</td>`);
        let userSex = $(`<td>${user.Sex}</td>`);
        let userEmail = $(`<td>${user.Email}</td>`);
        let userPhoneNumber = $(`<td>${user.PhoneNumber}</td>`);
        let userRole = $(`<td>${user.Role}</td>`);
       
    
        $(tableRow).append(userId, userName, userSex, userEmail, userPhoneNumber, userRole, deleteButton);
        
    };
    for(let user of users){
        renderUserDOM(user)
    };


    $('#register-user-btn').click( async (e)=>{
        e.preventDefault();
        let nameInput = $('#user-name');
        let sexInput = $('#user-sex');
        let emailInput = $('#user-email');
        let phoneInput = $('#user-phone');
        let roleInput = $('#user-role');
        
        
        if(nameInput.val()=== '' || sexInput.val()=== '' || emailInput.val()==='' || phoneInput.val() === '' || roleInput.val()===''){
            alert("Fill out all fields");
        } else {
            const userItem = (
                {
                    id: users.length + 1,
                    Name: nameInput.val(),
                    Sex: sexInput.val(),
                    Email: emailInput.val(),
                    PhoneNumber: phoneInput.val(),
                    Role: roleInput.val()
                }
            );
            
    
            users.push(userItem);
            renderUserDOM(userItem);
    
            nameInput.val('');
            sexInput.val('');
            emailInput.val('');
            phoneInput.val('');
            roleInput.val('');
        };
        
        
    })
});