// start logout coding
var username = sessionStorage.getItem("username");
if(username == null){
    document.body.innerHTML = "<h1>Illegal action perform</h1>"
    document.body.classList.add("illegal");
}


var logout_btn = document.getElementById("logout-btn");
var welcome_ele = document.getElementById("welcome");


logout_btn.onclick = function(){
    window.location = "../index.html";
    sessionStorage.removeItem("username");
}

var user_data = JSON.parse(localStorage.getItem(username));
welcome_ele.innerHTML = "Welcome Mr./Mrs. " + user_data.fName + " " + user_data.lName;

// Start contact list coding

var create_btn = document.querySelector(".create-btn"); 
var update_btn = document.querySelector(".update-btn"); 
var contact_details = document.querySelector(".contact-details");
var input_name = document.querySelector(".name");
var input_number = document.querySelector(".number");

create_btn.onclick = function(){
    
    if(input_name.value != "" && input_number.value != ""){
        newContactApp();
        updateLocalStorage();
    }
    else{
        alert("Input fields are empty");
    }
} 

if(localStorage.getItem(username + "_list") != null){
    var array_list = JSON.parse(localStorage.getItem(username+"_list"));

    array_list.forEach(task => {
        newContactApp(task);   
    });
}

function newContactApp(task){
    var i;
    var name = input_name.value;
    var number = input_number.value;

    if(task){
        name = task.co_name;
        number = task.co_number;
    }

    var accordion = document.createElement("div");
    accordion.classList = "accordion mb-3";

    var all_accordians = contact_details.getElementsByClassName("accordion");
   for(i = 0 ; i < all_accordians.length ; i++ ){}

    var accordian_item = document.createElement("div");
    accordian_item.classList = "accordion-item";
    accordion.append(accordian_item);

    var accordian_header = document.createElement("h5");
    accordian_header.classList = "accordion-header";
    accordian_item.append(accordian_header);

    var button = document.createElement("button");
    button.innerHTML = name;
    button.classList = "accordion-button";
    button.setAttribute("data-bs-toggle","collapse");
    button.setAttribute("data-bs-target","#collapse-"+i);
    accordian_header.append(button);

    var accordian_collpase = document.createElement("div");
    accordian_collpase.classList = "accordion-collapse collapse";
    accordian_collpase.id = "collapse-"+i; //So that accordion have different id so that they collapse differently
    accordian_item.append(accordian_collpase);

    var accordian_body = document.createElement("div");
    accordian_body.classList = "accordion-body";
    accordian_collpase.append(accordian_body);

    var row = document.createElement("div");
    row.classList = "row";
    accordian_body.append(row);

    var col_one = document.createElement("div");
    col_one.classList = "col-md-6";
    row.append(col_one);

    var h5 = document.createElement("h5");
    h5.innerHTML = name;
    h5.id = "contact-"+i;
    col_one.append(h5);
    var p = document.createElement("p");
    p.innerText = number;
    col_one.append(p);

    var col_two = document.createElement("div");
    col_two.classList = "col-md-6 d-flex justify-content-around align-items-center position-relative";
    col_two.innerHTML = '<i class="fa-regular fa-message" style="font-size: 25px;"></i><i class="fa-solid fa-square-phone" style="font-size: 25px;"></i> <i class="fa-solid fa-ellipsis-vertical op-btn" style="font-size: 25px;"></i> '
    row.append(col_two);

    var option_box = document.createElement("div");
    option_box.classList = "option-box";
    option_box.innerHTML = '<i class="fa-regular fa-pen-to-square mb-2"style="font-size: 20px;"></i><i class="fa-solid fa-trash"style="font-size: 20px;"></i>'
    col_two.append(option_box);

    contact_details.append(accordion);

    input_name.value = "";
    input_number.value = "";

    var i_tag = option_box.getElementsByTagName("I");

// Start edit coding
    i_tag[0].onclick = function(){
        var parent = this.parentElement.parentElement.parentElement;
        var h5 = parent.getElementsByTagName("h5");
        var p = parent.getElementsByTagName("p");

        var edited_name = h5[0].innerHTML;
        var edited_num = p[0].innerHTML;
        
        input_name.value = edited_name;
        input_number.value = edited_num;

        input_name.focus();

        create_btn.classList.add("d-none");
        update_btn.classList.remove("d-none");

        update_btn.onclick = function(){
            var id = h5[0].getAttribute("id").replace("contact-","");
            var co_name = input_name.value;
            var co_number = input_number.value;
            updateLocalStorage(co_name , co_number , id);
            location.reload();
        }

    }

// Start delete coding
    i_tag[1].onclick = function(){
        var cnf = window.confirm("Do you wanna delete ?");
        if(cnf){
            accordion.remove();
            updateLocalStorage();
        }
        else{
            alert("Your data is safe")
        }
    }

    // Start option Box Coding
    var op_btn = document.querySelectorAll(".op-btn");

    for(i = 0 ; i < op_btn.length ; i++){
        op_btn[i].onclick = function(){
            var parent = this.parentElement;
            var op_box = parent.querySelector(".option-box")
            op_box.classList.toggle("active");
        }
    }

}

function updateLocalStorage(name , number , id){
    
  //  if(name != "" && number != ""){
  //       array_list[id] = {
  //           co_name : name,
  //           co_number : number
  //       }
  //   }

  // else{
        // console.log("heey");
        var i;
        array_list = [];
        var accordion_el = contact_details.querySelectorAll(".accordion");
        
        for( i = 0 ; i < accordion_el.length ; i++){
            var h5 = accordion_el[i].getElementsByTagName("h5");
            var p = accordion_el[i].getElementsByTagName("p");
            array_list.push({
                co_name : h5[1].innerHTML,
                co_number : p[0].innerHTML
            });
        }
  // }

    localStorage.setItem(username+"_list",JSON.stringify(array_list));
}

//start search coding

function mysearch(){
    var i,btn, textValue;
    var input = document.querySelector("#search").value;
    var filter = input.toUpperCase();
    var accordion = contact_details.querySelectorAll(".accordion");
    for(i = 0 ; i < accordion.length ; i++){
        btn = accordion[i].getElementsByTagName("BUTTON")[0];
        textValue = btn.innerText;
        if(textValue.toUpperCase().indexOf(filter) > -1){
            accordion[i].style.display = "";
        }
        else{
            accordion[i].style.display = "none";
        }
    }

}
