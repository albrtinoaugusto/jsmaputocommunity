function getClasses() {
    db.collection('classes').get().then(snapshot => {
        fillTableData(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}


function fillTableData(docs) {

    let tableBody = document.getElementById("tClassesBody");
    tableBody.innerHTML = "";

    if (docs.length > 0) {

        docs.forEach(doc => {
            //console.log(doc.data())
            let invoice = doc.data();

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");

            td1.innerHTML = invoice.rom;
            td2.innerHTML = invoice.description;
            td3.innerHTML = invoice.students;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            tableBody.appendChild(tr);
        });
    } else {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem turmas adicionadas...";
        td.colSpan = 3;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}