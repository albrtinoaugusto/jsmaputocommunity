var sortName = "";


function getStudents() {
    db.collection('students').get().then(snapshot => {
        if (snapshot.docs.length > 0) {
            fillTableData(snapshot.docs);
        }   
    }).catch(err => {
        console.log(err.message)
    });
}

function searchByName(input){
    if (input.value.length > 0) {
        sortName = input.value;
        waitAlert("A pesquisar...");
        getStudents();
    } else {
        sortName = "";
        waitAlert("A buscar todos...");
        getStudents();
    }
}

function fillTableData(docs) {

    let tableBody = document.getElementById("tStudentsBody");
    tableBody.innerHTML = "";

    if (docs.length > 0) {
        
        for(let index = 0; index < docs.length; index++) {
            //console.log(doc.data())
            let student = docs[index].data();

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td");
            let td7 = document.createElement("td");

            if (sortName.length > 0 && student.name.includes(sortName)) {
     
                let avatar = student.avatar;
                if (typeof(avatar) === "undefined" || avatar === null) {
                    avatar = "../../../../../_assets/as2/images/user-small.png";
                }

                let someHtml = '<img src="' + avatar + '" class="rounded-circle avatar" alt="Avatar">';
                someHtml += '<p class="c_name">' + student.name + '</p>';
                td1.innerHTML = someHtml;
                
                let phone = "Não Definido";
                if (typeof(student.phone) !== "undefined" && student.phone !== null) {
                    phone = student.phone[0];
                }
                
                // Phone
                td2.innerHTML = '<span class="phone"><i class="fa fa-phone m-r-10"></i>' + phone + '</span>';

                //Grade
                td3.innerHTML = '<span class="phone"><i class="fa fa-briefcase m-r-10"></i> ' + student.grade + 'ª Classe</span>';

                //Classe
                let select = document.createElement("select");
                select.className = "form-control";
                select.id = "classDrop" + index;
                select.onchange = function(){
                    submitClass("classDrop" + index, student.id);
                }

                let option = document.createElement("option");
                option.value = "x";
                option.innerHTML = "- selecione -";
                select.appendChild(option);

                db.collection('classes').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        let clas = doc.data();

                        let op = document.createElement("option");
                        op.value = clas.id;
                        op.innerHTML = clas.description;

                        if (clas.id === student.classId){
                            op.selected = true;
                        }
                        select.appendChild(op);
                    });

                    td4.appendChild(select);
                }).catch(err => {
                    console.log(err.message)
                })             
                    

                //status
                if (typeof(student.status) !== "undefined" && student.status === 1){   
                    td5.innerHTML = "<span class='badge badge-success'>Matriculado</span>";
                } else {
                    td5.innerHTML = "<span class='badge badge-info'>Não Matriculado</span>";
                }

                // Profile
                let a1 = document.createElement("a");
                a1.className = "btn btn-success btn-sm";
                a1.style = "margin-right: 14px";
                a1.href = "../../../../student/about/?id="+ student.id +"&goon=sye";
                a1.innerHTML = "Perfil";
                    
                td6.appendChild(a1);

                //Acction
                let a2 = document.createElement("button");
                a2.className = "btn btn-sm btn-danger";
                a2.innerHTML = "<i class='icon-trash'></i>";
                a2.onclick = function(){
                    deleteStudent(student.id);
                }
                
                td7.appendChild(a2);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                    
                tableBody.appendChild(tr);
            } else {
     
                let avatar = student.avatar;
                if (typeof(avatar) === "undefined" || avatar === null) {
                    avatar = "../../../../../_assets/as2/images/user-small.png";
                }

                let someHtml = '<img src="' + avatar + '" class="rounded-circle avatar" alt="Avatar">';
                someHtml += '<p class="c_name">' + student.name + '</p>';
                td1.innerHTML = someHtml;
                
                let phone = "";
                if (typeof(student.phone) !== "undefined" && student.phone !== null) {
                    phone = student.phone[0];
                }
                
                // Phone
                td2.innerHTML = '<span class="phone"><i class="fa fa-phone m-r-10"></i>' + phone + '</span>';

                //Grade
                td3.innerHTML = '<span class="phone"><i class="fa fa-briefcase m-r-10"></i> ' + student.grade + 'ª Classe</span>';

                //Classe
                let select = document.createElement("select");
                select.className = "form-control";
                select.id = "classDrop" + index;
                select.onchange = function(){
                    submitClass("classDrop" + index, student.id);
                }

                let option = document.createElement("option");
                option.value = "x";
                option.innerHTML = "- selecione -";
                select.appendChild(option);

                db.collection('classes').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        let clas = doc.data();
                  
                        let op = document.createElement("option");
                        op.value = clas.id;
                        op.innerHTML = clas.description;

                        if (clas.id === student.classId){
                            op.selected = true;
                        }
                        select.appendChild(op);
                    });

                    td4.appendChild(select);
                }).catch(err => {
                    console.log(err.message)
                })             
                    

                //status
                if (typeof(student.status) !== "undefined" && student.status === 1){
                    td5.innerHTML = "<span class='badge badge-success'>Matriculado</span>";
                } else {
                    td5.innerHTML = "<span class='badge badge-info'>Não Matriculado</span>";
                }

                // Profile
                let a1 = document.createElement("a");
                a1.className = "btn btn-success btn-sm";
                a1.style = "margin-right: 14px";
                a1.href = "../../../../student/about/?id="+ student.id +"&goon=sye";
                a1.innerHTML = "Perfil";
                    
                td6.appendChild(a1);

                //Acction
                let a2 = document.createElement("button");
                a2.className = "btn btn-sm btn-danger";
                a2.innerHTML = "<i class='icon-trash'></i>";
                a2.onclick = function(){
                    deleteStudent(student.id);
                }
                
                td7.appendChild(a2);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                    
                tableBody.appendChild(tr);
            }
        }
    } else {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem Estudantes cadastrados...";
        td.colSpan = 7;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}



function deleteStudent(studentId){
    swal({
        title: "Tem certeza?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Sim, apaga",
        cancelButtonText: "Não, cancela",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            db.collection("students").doc(studentId).delete().then(() => {
                sucessAlert("Estudante apagado com sucesso.");
            }).catch(err =>{
                console.log(err.message);
                infoAlert("Ocorreu um erro a deletar o estudante.")
            });
        } else {
            swal("Cancelado", "", "error");
        }
    });
}


function submitClass(selectId, studentId){
    waitAlert();

    db.collection("students").doc(studentId).update({
        classId: document.getElementById(selectId).value
    }).then(() => {
        sucessAlert("Turma actualizada com sucesso!");
    }).catch(err => {
        console.log(err.message);
    });
}