var myData = JSON.parse(localStorage.getItem("data"));

function studentDashboard() {
    countNotification();
}

function countNotification() {
    let count = 0;

    if (myData !== null && typeof(myData.surname) !== "undefined" && myData.surname.length === 0) {
        document.getElementById("noti-list").appendChild(incompleteData());
        count++;
    }

    if (myData !== null && typeof(myData.avatar) !== "undefined" && myData.avatar.length === 0) {
        document.getElementById("noti-list").appendChild(profilePhoto());
        count++;
    }

    if (count > 0) {
        document.getElementById("noti-status").classList.add("notification-dot");
        document.getElementById("my-notis").value = "Voce tem " + count + " notificações";
    }
}


function incompleteData() {
    let li = document.createElement("li");
    li.innerHTML = '<li>' +
        '<a href="profile/?action=do">' +
        '<div class="media">' +
        '<div class="media-left">' +
        '<i class="icon-info text-warning"></i>' +
        '</div>' +
        '<div class="media-body">' +
        '<p class="text">Albertino seus dados estão imcompletos.</p>' +
        '<span class="timestamp">10:20:45 - 20-10-2020</span>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>';
    return li;
}



function profilePhoto() {
    let li = document.createElement("li");
    li.innerHTML = '<li>' +
        '<a href="profile/">' +
        '<div class="media">' +
        '<div class="media-left">' +
        '<i class="icon-info text-warning"></i>' +
        '</div>' +
        '<div class="media-body">' +
        '<p class="text">Albertino carregue foto de perfil.</p>' +
        '  <span class="timestamp">10:20:45 - 20-10-2020</span>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>';
    return li;
}


function payMonthly() {
    let li = document.createElement("li");
    li.innerHTML = '<li>' +
        '<a href="../payment/?grade=mon-<%out.print(dateTime.getMonthInt());%>-<%out.print(dateTime.getYear());%>&source=Xxxihhifysd0445sdxbf64bxfx4&code=MarTeXPI558">' +
        '<div class="media">' +
        '<div class="media-left">' +
        '<i class="icon-info text-warning"></i>' +
        '</div>' +
        '<div class="media-body">' +
        '<p class="text">Pague a mensalidade de Junho.</p>' +
        '<span class="timestamp">10:20:45 - 20-10-2020</span>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>';
}


function payTaxOne() {
    let li = document.createElement("li");
    li.innerHTML = '<li>' +
        '<a href="../payment/?grade=tax1&source=Xxxihhifysd0445sdxbf64bxfx4&code=MarTeXPI558">' +
        '<div class="media">' +
        '<div class="media-left">' +
        '<i class="icon-info text-warning"></i>' +
        '</div>' +
        '<div class="media-body">' +
        '<p class="text">Page a taxa de Exame da 1ª época.</p>' +
        '<span class="timestamp">10:20:45 - 20-10-2020</span>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>';
}