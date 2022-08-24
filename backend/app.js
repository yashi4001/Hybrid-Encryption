
/*Function*/
async function submitForm(e){
    e.preventDefault();
    
    const formData = {
        T_name: document.getElementById('fname').value+document.getElementById('lname').value,
        T_email: document.getElementById('email').value,
        password: document.getElementById('pass').value,
        T_dob: document.getElementById('dob').value,
        T_gender: document.getElementById('gender').value,
        T_phone: document.getElementById('phn').value
    }
    console.log(formData);

    const headers = buildHeaders();
    const rawResponse = await fetch("http://localhost:5000/adduser", {
        method: "POST",
        headers:headers,
        mode:'cors',
        body: JSON.stringify(formData)
    });

    window.open(main.html);
}

async function submitPass(e){
    e.preventDefault();
    
    const formData = {
        user: document.getElementById('email').value,
        label: document.getElementById('label').value
    }

    const headers = buildHeaders();
    const rawResponse = await fetch("http://localhost:5000/createPass", {
        method: "POST",
        headers:headers,
        mode:'cors',
        body: JSON.stringify(formData)
    });

    window.open(main.html);
}

async function login(e){
    e.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        pass: document.getElementById('pass').value
    }

    const headers = buildHeaders();
    const rawResponse = await fetch("http://localhost:5000/loginUser", {
        method: "POST",
        headers:headers,
        mode:'cors',
        body: JSON.stringify(formData)
    });
    window.open(home.html);
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin":"http://localhost:5000"
    };
    return headers;
}
function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}

