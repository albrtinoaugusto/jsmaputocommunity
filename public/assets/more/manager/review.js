function reviewEverthing() {
    getLastTen();
    getRefreshes();
}


function getLastTen() {
    db.collection('students').get().then(snapshot => {
        fillTableSubscribe(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}


function fillTableSubscribe(docs) {
    let tableBody = document.getElementById("tStudentsBody");

    if (docs.length > 0) {
        tableBody.innerHTML = "";

        docs.forEach(doc => {
            //console.log(doc.data())
            let student = doc.data();

   
                let tr = document.createElement("tr");

                let td1 = document.createElement("td");
                let avatar = student.avatar;
                if (typeof(avatar) === "undefined" || avatar === null) {
                    avatar = "../../../_assets/as2/images/user-small.png";
                }

                let someHtml = '<img src="' + avatar + '" class="rounded-circle avatar" alt="Avatar">';
                someHtml += '<p class="c_name">' + student.name + '</p>';
                td1.innerHTML = someHtml;

                let phone = "Não Definido";
                if (typeof(student.phone) !== "undefined" && student.phone !== null) {
                    phone = student.phone[0];
                }

                let td2 = document.createElement("td");
                td2.innerHTML = '<span class="phone"><i class="fa fa-phone m-r-10"></i>' + phone + '</span>';

                let td3 = document.createElement("td");
                td3.innerHTML = '<span class="phone"><i class="fa fa-briefcase m-r-10"></i> ' + student.grade + 'ª Classe</span>';

                let td4 = document.createElement("td");
                td4.innerHTML = '<span><i class="icon-calendar m-r-10"></i>' + student.date + '</span>';

                let td5 = document.createElement("td");
                td5.innerHTML = '<span><a href="../../student/about/?id=' + student.id + '&goon=sye" class="btn btn-sm btn-success"><i class="fa fa-eye"></i></a></span>';

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                tableBody.appendChild(tr);
            
        });
    } else {
        tableBody.innerHTML = "";
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem Estudantes matriculados...";
        td.colSpan = 5;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}


//Count Refreshes
function getRefreshes() {
    db.collection('refreshes').doc("A9lDah36qjNXcWCfMmMU").get().then(doc => {
        document.getElementById("winsText").innerText = doc.data().wins + ",00 MT";    
        document.getElementById("viewsText").innerText = doc.data().views;
    }).catch(err => {
        console.log(err.message);
    });

    db.collection('students').get().then(snapshot => {
        document.getElementById("studentsText").innerText = snapshot.docs.length;
    }).catch(err => {
        console.log(err.message);
    });

    db.collection('classes').get().then(snapshot => {
        document.getElementById("classesText").innerText = snapshot.docs.length;
    }).catch(err => {
        console.log(err.message);
    });
}





function setStudents(docs) {
    let length = 0;
    if (typeof(docs) !== "undefined" && docs.length > 0) {
        length = docs.length;
    }
    document.getElementById("studentsText").innerText = length;
}



//Count Views
function setViews() {
    document.getElementById("viewsText");
}