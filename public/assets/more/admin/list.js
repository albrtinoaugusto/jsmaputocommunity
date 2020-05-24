function getAdminsList() {
    db.collection('admins').get().then(snapshot => {
        fillAdminsTable(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}


function fillAdminsTable(docs) {
    let tableBody = document.getElementById("tAdminsBody");

    if (docs.length > 0) {
        tableBody.innerHTML = "";

        docs.forEach(doc => {
            //console.log(doc.data())
            let admin = doc.data();

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            td1.innerHTML = admin.name;

            let td2 = document.createElement("td");
            td2.innerHTML = admin.surname;

            let td3 = document.createElement("td");
            td3.innerHTML = admin.email;

            let td4 = document.createElement("td");

            let btn = document.createElement("button");
            btn.className = "btn btn-sm btn-danger";
            btn.innerHTML = "<i class='icon-trash'></i>";
            btn.onclick = function() {
                deleteAdmin(admin.id)
            };

            td4.appendChild(btn);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tableBody.appendChild(tr);
        });
    }
}


function deleteAdmin(adminId) {
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
            db.collection("admins").doc(adminId).delete().then(() => {
                sucessAlert("Administrador eliminado com sucesso.");
                getAdminsList();
            }).catch(function(err) {
                console.log(err.message)
            });
        } else {
            swal("Cancelado", "", "error");
        }
    });
}