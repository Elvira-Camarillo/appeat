const API_URL = "http://ec2-18-191-185-147.us-east-2.compute.amazonaws.com/api/";


const getUsers = async() => {
    const response = await fetch(`${API_URL}users/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    // console.log(data);

};

$(document).ready(() => {
    getUsers();
});