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
}

function generateWeekNum(start_date) {

    let now = new Date(start_date);
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7) - 1;

    //console.log(week);
    return week
}

function generateEndDate(period, start_date) {

    let myDate = new Date(start_date)

    if (period == "semanal") {
        myDate.setDate(myDate.getDate() + 7)
    } else if (period == "quincenal") {
        myDate.setDate(myDate.getDate() + 14)
    }
    return myDate.toISOString().substr(0, 10)
}

function generateJSON() {

    let myMenuDict = {
        "user_profile": localStorage.id,
        "plan_title": myForm.querySelector('#inputTitle').value,
        "week_num": generateWeekNum(user_period_start),
        "period": myForm.querySelector('#selectPeriod').value,
        "start_date": user_period_start,
        "end_date": "",
        "saved": false
    }

    myMenuDict.end_date = generateEndDate(myMenuDict.period, myMenuDict.start_date)

    //console.log("Generated JSON: ", myMenuDict)
    return myMenuDict
}

function modalHandler() {

    if (localStorage.length > 1) {
        myModal1._element.querySelector('#modal_message').innerText = "LISTO !!! Por favor presiona siguiente"
        myModal1._element.querySelector("#modal_continue").style.display = "block"
    } else {
        myModal1._element.querySelector('#modal_message').innerText = "Por favor revisa tus datos de nuevo"
        myModal1._element.querySelector("#modal_back").style.display = "block"
    }

}

myForm.addEventListener('submit', (e) => {

    e.preventDefault()

    let jsonPOST = generateJSON()
        //console.log("My JSON to be Posted: ", jsonPOST)

    let myResponse = postFetch(jsonPOST)
    setTimeout(() => { modalHandler() }, 2000)

    myModal1.show()
    myResponse.then((dataResult) => { console.log("AJAX POST Result from Event Listener its", dataResult) })
    myResponse.catch((error) => { console.log("Ajax Catch Error is: ", error) })


})


$(document).ready(() => {

    my_container = document.querySelector(".json_container")
    my_template_item = my_container.children[0]

    transfer_retrieve();

    $('#myDatePicker').datepicker({
        format: "yyyy-mm-dd",
        language: "es",
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    })

    $('#myDatePicker').datepicker().on('changeDate', function(e) {
        user_period_start = $('#myDatePicker').datepicker('getFormattedDate')
            //console.log(user_period_start.toString())
    })

});