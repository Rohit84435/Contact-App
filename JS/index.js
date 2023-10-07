// Start active code
var lActive = document.getElementById("l-active-btn");
var sActive = document.getElementById("s-active-btn");
var l_active_el = document.querySelector(".l-active");
var s_active_el = document.querySelector(".s-active");

sActive.onclick = function(){
    s_active_el.style.opacity = "0";
    s_active_el.classList = "animate__animated animate__fadeOutUp active-box s-active";
    l_active_el.style.zIndex = "1";
    l_active_el.classList = "animate__animated animate__fadeInDown active-box l-active";
}

lActive.onclick = function(){
    l_active_el.style.opacity = "0";
    l_active_el.classList = "animate__animated animate__fadeOutUp active-box s-active";
    // s_active_el.style.zIndex = "1";
    s_active_el.classList = "animate__animated animate__fadeInDown active-box l-active";

}


// Start signup coding
var signup_btn = document.querySelector(".signup-btn");
var fName = document.getElementById("f_name");
var lName = document.getElementById("l_name");
var sUsername = document.getElementById("s_username");
var sPassword = document.getElementById("s_password");
var noti = document.querySelector(".s-notification");

signup_btn.onclick = function(){
    
    if(fName.value != "" && lName.value != "" && sUsername.value != "" && sPassword.value != ""){
        if(localStorage.getItem(sUsername.value) == null){
            var data = {
                fName : fName.value,
                lName : lName.value,
                sUsername : sUsername.value,
                sPassword : sPassword.value
            }
            var s_string = JSON.stringify(data);
            localStorage.setItem(sUsername.value , s_string);

            noti.innerHTML = "SignUp Successfully !";
            noti.style.color = "green";
            setTimeout(function(){
                noti.innerHTML = ""; 
            },3000)
        }
        else{
            noti.innerHTML = "User already exist !";
            noti.style.color = "red";

            setTimeout(function(){
                noti.innerHTML = "";
            },3000)
        }
        fName.value = "";
        lName.value = "";
        sPassword.value = "";
        sUsername.value = "";
    }
    else{
        noti.innerHTML = "Please fill all the fields";
        noti.style.color = "red";
        setTimeout(function(){
            noti.innerHTML = "";
        },3000)
    }
    console.log(data);
}

// start login coding

var signin_btn = document.getElementById("login-btn");
var lUsername = document.getElementById("username");
var lpassword = document.getElementById("password");
var l_notice = document.getElementById("l-noti");

signin_btn.onclick = function(){
    
    if(lUsername.value != "" || lpassword.value != ""){
        if(localStorage.getItem(lUsername.value) != null){
            var data = localStorage.getItem(lUsername.value);
            var l_obj = JSON.parse(data); // parse use to convert string into object
            var password = l_obj.sPassword;
            if(lpassword.value == password){
               window.location = "contacts/contact.html";
               sessionStorage.setItem("username",lUsername.value);
            }
            else{
                l_notice.innerHTML = "Incorrect password !!"
                l_notice.style.color = "red";
                setTimeout(function(){
                    l_notice.innerHTML = "";
                },3000)
            }
        }
        else{
            l_notice.innerHTML = "User name not found !!";
            l_notice.style.color = "red";
            setTimeout(function(){
                l_notice.innerHTML = "";
            },3000)
        }
    }
    else{
        l_notice.innerHTML = "Input fields are empty !!";
        l_notice.style.color = "red";
        setTimeout(function(){
            l_notice.innerHTML ="";
        },3000)
    }
}