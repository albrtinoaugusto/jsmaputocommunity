var myData = JSON.parse(localStorage.getItem("data"));

function previewData() {
    // Center info preview
    setProfileImage();
    setSomePreviewData();
}


function setProfileImage() {
    if (myData !== null && typeof(myData.avatar) !== "undefined" && myData.avatar.length > 20) {
        document.getElementById("avatar_img").src = myData.avatar;
    }
}



function setSomePreviewData() {
    if (myData !== null) {
        document.getElementById("showName").innerText = myData.name;

        if (myData.subject !== null && typeof(myData.subject) !== "undefined") {
            document.getElementById("showSubject").innerText = myData.subject;
        }
    }
}
