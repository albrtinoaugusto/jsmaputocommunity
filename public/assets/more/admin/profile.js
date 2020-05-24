var myData = JSON.parse(localStorage.getItem("data"));

function previewEverthing() {
    previewData()
}


function previewData() {
    if (myData != null && typeof(myData) !== "undefined") {
        if (typeof(myData.avatar) === "undefined"){
            document.getElementById("avatar_img").src = "../../../../_assets/as2/images/user-small.png";
        }
        else{
            document.getElementById("avatar_img").src = myData.avatar;
        }
        
        document.getElementById("previewEmail").innerHTML = myData.email;
    }
}