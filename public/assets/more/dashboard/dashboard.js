var myData = JSON.parse(localStorage.getItem("data"));

function dashboard() {
    setAvatarPhoto();
    setUserName();
    setUserEmail();
}

function setAvatarPhoto() {
    if (myData !== null && typeof(myData.avatar) !== "undefined" && myData.avatar.length > 20) {
        document.getElementById("avatar_pic").src = myData.avatar;
        document.getElementById("avatar_icon").src = myData.avatar;
    }
}

function setUserName() {
    if (myData !== null && typeof(myData.avatar) !== "undefined" && myData.name.length > 15) {
        document.getElementById("uName").innerText = myData.name.substring(0, 13) + "...";
    } else {
        document.getElementById("uName").innerText = myData.name;
    }
}

function setUserEmail() {
    if (myData !== null && typeof(myData.avatar) !== "undefined" && myData.email.length > 23) {
        document.getElementById("uEmail").innerText = myData.email.substring(0, 20) + "...";
    } else {
        document.getElementById("uEmail").innerText = myData.email;
    }
}