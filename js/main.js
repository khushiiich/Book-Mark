var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var allSites = [];

if(localStorage.getItem("sites") !==null){
  allSites = JSON.parse(localStorage.getItem("sites"))
  displayData()
}

function addWebsite() {

    if(nameValidation() , urlValidation()){
        var website = {
            name: siteName.value,
            url: siteUrl.value,
        };
        allSites.push(website);
        localStorage.setItem("sites" , JSON.stringify(allSites)  )
        displayData();
        clearData()
        console.log(allSites);
    } else{
        alert("invalid input!!")
    } 
}

function clearData(){
    siteName.value = null;
    siteUrl.value = null;

    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');
}

function displayData(){
    var cartona ="";
    for (var i=0 ; i<allSites.length ; i++){
        cartona+=`
        <tr>
        <td>${i}</td>
        <td>${allSites[i].name}</td>
        <td><button onclick="visitSite(${i})" class="btn btn-outline-success btn-sm">Visit</button></td>
        <td><button onclick="deleteData(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
        `
    }
    document.getElementById("tableData").innerHTML=cartona;
}

function deleteData(index){
 console.log(index)
 allSites.splice(index , 1)
 displayData();
 localStorage.setItem("sites" , JSON.stringify(allSites)  )
}

function visitSite(index){
  window.open(allSites[index].url , "_blank")
}

/////////////////////validation///////////////////////


function nameValidation(){
    var regex = /(^[a-zA-Z][a-zA-Z\s]{2,20}[a-zA-Z]$)/;
    var text = siteName.value;
    var alertmsg = document.getElementById("alertmsg")

    if(regex.test (text)){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        alertmsg.classList.add("d-none")
        return true;
    }else{
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        alertmsg.classList.remove("d-none")
        return false;
    }
}

function urlValidation(){
    var regex = /(?:http[s]?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gm;
    var text = siteUrl.value;
    var alertm = document.getElementById("alertm")

    if(regex.test (text)){
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        alertm.classList.add("d-none")
        return true;
    }else{
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        alertm.classList.remove("d-none")
        return false;
    }
}