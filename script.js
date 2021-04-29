//Utility Functions
//1. utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//Initialize the param variable
let paramCounter = 0;

//Hide the parameter box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';

//If user clicks on params box, hide the json box
let paramsBox = document.getElementById('params');
paramsBox.addEventListener('click', () => {

    document.getElementById('jsonRequestbox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

//Ifr user clicks on json box , hide the params box
let jsonBox = document.getElementById('json');
jsonBox.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('jsonRequestbox').style.display = 'block';
})

//If user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener("click", () => {
    let prm = document.getElementById('prm');
    // console.log(prm);
    let string = `<div class="row g-2 my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${paramCounter + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey ${paramCounter + 2}" placeholder="Enter ${paramCounter + 2}  Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue ${paramCounter + 2}" placeholder="Enter ${paramCounter + 2} Value">
    </div>
    <div class="col-md-2">
        <button class="btn btn-primary deleteParam">-</button>
    </div>
</div>`;
    //  paramCounter++;

    //convert the element string to DOM node
    let paramElement = getElementFromString(string);
    //console.log(paramElement);
    prm.appendChild(paramElement);

    //Add an eventListener to remove a parameter by clicking -
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.parentElement.remove();
        })
    }
    paramCounter++;
})

//If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response";
    //  console.log("submit is clicked");

    //Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='request-type']:checked").value;
    let contentType = document.querySelector("input[name='content-type']:checked").value;

    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'Params') {
        data = {};
        for (let i = 0; i < paramCounter + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonRequesText').value;
        // console.log(data);
    }

    //log all the values in the console for debugging
    console.log("url is", url);
    console.log("content type is", contentType);
    console.log("request type is", requestType);
    console.log("data is", data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                //  document.getElementById('response').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                //   document.getElementById('response').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }

})