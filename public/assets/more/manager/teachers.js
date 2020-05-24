var sortName = "";
var selectedTeacher = {};

function getTeachers() {
    db.collection('teachers').get().then(snapshot => {
        fillTableData(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}


function getClasses(){
    db.collection('classes').get().then(snapshot => {
        fillSelectItems(snapshot.docs);
    }).catch(err => {
        console.log(err.message);
    })
}



function fillSelectItems(docs){
    let select = document.getElementById("classes");
    docs.forEach((doc) => {
        let cla = doc.data();
        let option = document.createElement("option");
        option.value = cla.id;
        option.innerHTML = cla.description;
        select.appendChild(option);
    });
}



const addField = document.getElementById("add");
addField.addEventListener("click", function (){
    let classId = document.getElementById("classes").value;
    addClass(classId);
});



function addClass(classId){
    waitAlert();
    db.collection('classes').doc(classId).get().then(doc => {
        let cla = doc.data();

        let dataArray = [];
        if (typeof(selectedTeacher.classes) !== "undefined" && selectedTeacher.classes.length > 0) {
            dataArray = selectedTeacher.classes;
            dataArray.push(cla);
        } else {
            dataArray.push(cla);
        }

        let = obj = {classes: dataArray};
        return db.collection('teachers').doc(selectedTeacher.id).update(obj);
    }).then (() => {
        sucessAlert("Turma atribuida com sucesso!");
    }).catch(err => {
        console.log(err.message);
    })
}



function searchByName(input){
    if (input.value.length > 0) {
        sortName = input.value;
        waitAlert("A pesquisar...");
        getTeachers();
    } else {
        sortName = "";
        waitAlert("A buscar todos...");
        getTeachers();
    }
}



function fillTableData(docs) {

    let tableBody = document.getElementById("tSTeachersBody");
    tableBody.innerHTML = "";

    if (docs.length > 0) {

        for (let i = 0; i < docs.length; i++) {
            //console.log(doc.data())
            let teacher = docs[i].data();

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");

            if (sortName.length > 0) {
                if (teacher.name.includes(sortName)) {
                    td1.innerHTML = teacher.name + " " + teacher.surname;
                    td2.innerHTML = teacher.phone;

                    let button = document.createElement("button");
                    button.className = "btn btn-sm btn-success";
                    button.innerText = "Detalhes";
                    button.onclick = function (){
                        showTeacherDetails (teacher);
                    }
                    td3.appendChild(button);

                    let buttonx1 = document.createElement("button");
                    buttonx1.className = "btn btn-sm btn-success";
                    buttonx1.innerHTML = "Atribuir";
                    buttonx1.onclick = function (){
                        guiveClass(teacher);
                    }

                    td4.appendChild(buttonx1);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    
                    tableBody.appendChild(tr);
                }
                else {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.innerHTML = "Não encontrados...";
                    td.colSpan = 4;
                    tr.appendChild(td);
                    tableBody.appendChild(tr);
                }
            } else {

                td1.innerHTML = teacher.name + " " + teacher.surname;
                td2.innerHTML = teacher.phone;

                let button = document.createElement("button");
                button.className = "btn btn-sm btn-success";
                button.innerText = "Detalhes";
                button.onclick = function (){
                    showTeacherDetails (teacher);
                }
                td3.appendChild(button);

                let buttonx1 = document.createElement("button");
                buttonx1.className = "btn btn-sm btn-success";
                buttonx1.innerHTML = "Atribuir";
                buttonx1.onclick = function (){
                    guiveClass(teacher);
                }

                td4.appendChild(buttonx1);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                
                tableBody.appendChild(tr);
            }
        }
    } else {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem Professores cadastrados...";
        td.colSpan = 4;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}


function guiveClass(teacher) {
    $("#largeModal").modal();
    selectedTeacher = teacher;
}


function showTeacherDetails(teacher){
    
    if (typeof(teacher.avatar) !== "undefined" && teacher.avatar.length > 20) {
        document.getElementById("avatarTeacher").src = teacher.avatar;
    }

    document.getElementById("fullName").innerText = teacher.name + " " + teacher.surname;
    document.getElementById("emailView").innerText = teacher.email; 
    document.getElementById("addressView").innerText = teacher.address;
    document.getElementById("phoneView").innerText = teacher.phone;
    document.getElementById("subjectView").innerText = teacher.subject;

    if (typeof(teacher.classes) !== "undefined" && teacher.classes.length > 0){
        let bodyClasses = document.getElementById("bodyClasses");
        bodyClasses.innerHTML = "";

        for (let i = 0; i < teacher.classes.length; i++) {
            let cla = teacher.classes[i];

            let tr = document.createElement("tr");
            let dt = document.createElement("td");
            dt.innerHTML = cla.description;
            tr.appendChild(dt);
            bodyClasses.appendChild(tr);
        }
    }

    $("#view_info").modal();
}


