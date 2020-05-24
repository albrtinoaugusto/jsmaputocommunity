var myData = JSON.parse(localStorage.getItem("data"));

function dataOne() {
    // Center info preview
    setProfileImage();
    setSomePreviewData();
    showViewId();
}


function setProfileImage() {
    if (myData !== null && typeof(myData.avatar) !== "undefined" && myData.avatar.length > 20) {
        document.getElementById("avatar_img").src = myData.avatar;
    } else {
        document.getElementById("avatar_img").src = "../../../_assets/as2/images/user-small.png";
    }
}

function setSomePreviewData() {
    if (myData !== null) {
        document.getElementById("showName").innerText = myData.name;

        if (typeof(myData.grade) !== "undefined" && myData.grade !== null) {
            document.getElementById("showGrade").innerText = myData.grade + "ª Classe";
        }

        if (typeof(myData.details) !== "undefined" && myData.details !== null) {
            document.getElementById("showMoreInfo").innerHTML = myData.details;
        }
    }
}


function showViewId() {
    if (myData !== null) {
        if (typeof(myData.id) !== "undefined" && myData.id !== null && myData.id.length > 20) {
            document.getElementById("id-link").href = myData.id;
        } else {
            document.getElementById("view-div").style.display = "none";
        }

        if (typeof(myData.certificate) !== "undefined" && myData.certificate !== null && myData.certificate.length > 20) {
            document.getElementById("certificate-link").href = myData.certificate;
        } else {
            document.getElementById("view-div-2").style.display = "none";
        }
    }
}