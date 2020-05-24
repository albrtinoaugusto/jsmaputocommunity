function getSubjects() {
    db.collection('subjects').get().then(snapshot => {
        fillTableData(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}


function fillTableData(docs) {

    let tableBody = document.getElementById("tSubjectsBody");
    tableBody.innerHTML = "";

    if (docs.length > 0) {

        docs.forEach(doc => {
            //console.log(doc.data())
            let subjects = doc.data();

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");

            td1.innerHTML = subjects.grade + "ª Classe";
            td2.innerHTML = subjects.description;

            tr.appendChild(td1);
            tr.appendChild(td2);

            tableBody.appendChild(tr);
        });
    } else {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem Disciplinas adicionadas...";
        td.colSpan = 2;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}