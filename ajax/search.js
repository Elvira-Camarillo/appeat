const API_URL = "https://appeateasier.autodev.studio/api/"

let myForm = document.querySelector('#formLogin')

var myModal1 = new bootstrap.Modal(document.getElementById('myModalLogin'), { keyboard: false })
myModal1._element.querySelector("#modal_continue").style.display = "none"
myModal1._element.querySelector("#modal_back").style.display = "none"

// Local Storage to reduce number of server´s requests
function saveUserProfile(myJSON) {
    localStorage.clear();

    for ([key, value] of Object.entries(myJSON)) {
        localStorage.setItem(key, value);
        console.log("mi item key is: " + key);
        console.log("my value is: " + value);
    }
}

function modalHandler() {

    if (localStorage.length > 1) {
        myModal1._element.querySelector('#modal_message').innerText = "BIENVENIDO !!! Por favor presiona siguiente"
        myModal1._element.querySelector("#modal_continue").style.display = "block"
    } else {
        myModal1._element.querySelector('#modal_message').innerText = "Por favor revisa tus datos de nuevo"
        myModal1._element.querySelector("#modal_back").style.display = "block"
    }

}

// Form Data Retrieve
function getFormData() {

    let user_profile = {}

    let username = myForm.querySelector('#myUserName').value
    let password = myForm.querySelector('#myPassword').value

    user_profile = {...user_profile, username }
    user_profile = {...user_profile, password }

    return user_profile

}


// AJAX Comms to End-Point
const postFetch = async(postData) => {

    const data = await fetch(`${API_URL}users/login/`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })

    const dataResult = await data.json()

    console.log(dataResult)
    saveUserProfile(dataResult)

    return dataResult
}


// Event Handler
myForm.addEventListener('submit', (e) => {

    e.preventDefault()
    e.stopPropagation()

    let userData = getFormData()
        // console.log("Form Data Result: ", userData)

    let myResponse = postFetch(userData)

    myResponse.then(console.log("Ajax Response Result: ", myResponse.data))
    myResponse.then(myModal1.show())
    myResponse.then(setTimeout(() => { modalHandler() }, 2000))
    myResponse.catch((error) => console.log(error))

    //myResponse.then(console.log("SUCESS"),console.log("Something Wrong"))
    //window.location.href = "people_amount.html" // If I enable this promise its interrupted and localStorage as well
})

/* 
-------------------------------------------------
    Algorithm description for this ajax 
-------------------------------------------------

1. user data introduction into form
2. user data validation
3. submit btn add event listener
4. prevent default
5. user data into json format
6. ajax comms to endpoint
7. catch BE response
8. store user ID into localstorage
9. redirect to the next page

*/
my_container.appendChild(newItem);

my_container.lastElementChild.outerHTML = my_item

}

const transfer_retrieve = async(search) => {
    let childs = document.querySelectorAll(".json_item")
    my_container = document.querySelector(".json_container")

    my_json_list = await getSearch(search, true);
    json_items_num = my_json_list.length

    if (json_items_num > 1) {

        for (i = 0; i < json_items_num; i++) {

            if (i > childs.length) {
                clone_html_item()
            }

            if (i === json_items_num - 1) {
                for (let j = 0; j < json_items_num; j++) {
                    populate_nodes(j)
                }
            }
        }

    } else {
        populate_nodes(0)
    }

    console.log("transfer retrieve")

}

let search = document.querySelector("#search-desk")
search.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("click")
    let searchDesk = document.querySelector("#input-search-desk").value
    busqueda = searchDesk
    getSearch(searchDesk)

    my_container = document.querySelector(".json_container")
        //my_container.innerHTML = ""

    my_template_item = my_container.children[0]

    user_profile_id =
        transfer_retrieve(searchDesk);

})


let searchMov = document.querySelector("#search-mov")
searchMov.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("click")
    let inputSearchMov = document.querySelector("#input-search-mov").value
    busquedaMv = inputSearchMov
    getSearch(inputSearchMov)

    my_container = document.querySelector(".json_container")
        //my_container.innerHTML = ""

    my_template_item = my_container.children[0]

    user_profile_id =
        transfer_retrieve(inputSearchMov);

})
$(document).ready(() => {

    //my_container = document.querySelector(".json_container")
    //my_template_item = my_container.children[0]

    //user_profile_id =
    //    transfer_retrieve();


});