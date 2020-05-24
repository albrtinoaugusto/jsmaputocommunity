var sortDate = "x";
var sortRegex = "x";
var sortGrade = "x";
var sortStatus = "x";


function checkEverthing() {
    getInvoices();
}


const searchForm = document.getElementById("navbar-search");
searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    let regex = document.getElementById("regex").value.trim();
    if (regex.length > 0) {
        sortRegex = regex;
        getInvoices();
    }
});


function sort() {

    let date = document.getElementById("date").value;
    let grade = document.getElementById("grade").value;
    let status = document.getElementById("status").value;

    if (date !== "2020-01-10") {
        sortDate = date;
    }

    sortGrade = grade;

    if (status !== "x") {
        sortStatus = status;
    }

    //Do the djobe
    getInvoices();
}


function getInvoices() {
    db.collection('invoices').get().then(snapshot => {
        fillTableData(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}


function fillTableData(docs) {

    let tableBody = document.getElementById("tInvoicesBody");
    tableBody.innerHTML = "";

    if (docs.length > 0) {

        docs.forEach(doc => {
            //console.log(doc.data())
            let invoice = doc.data();

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td");
            let td7 = document.createElement("td");

            if (sortDate !== "x" || sortGrade !== "x" || sortRegex !== "x") {
                if (sortStatus === "x") {
                    if (invoice.date === sortDate && invoice.grade === sortGrade && invoice.status === 0) {
                        td1.innerHTML = invoice.counter;
                        td2.innerHTML = invoice.description;
                        td3.innerHTML = invoice.name;
                        td4.innerHTML = '<span><i class="icon-calendar m-r-10"></i>' + invoice.date + '</span>';
                        td5.innerHTML = invoice.method;
                        if (invoice.status === 0) {
                            td6.innerHTML = '<label class="badge badge-info">Não Pago</label>';
                        } else {
                            td6.innerHTML = '<label class="badge badge-success">Pago</label>';
                        }
                        td7.innerHTML = '<a class="btn btn-sm btn-success" href="../../../invoice/view/?key=' + invoice.id + '" target="_blanck">Ver Fatura</a>';
                    }
                } else {
                    if (sortStatus === invoice.status) {
                        if (invoice.date === sortDate && invoice.grade === sortGrade && invoice.status === 0) {
                            td1.innerHTML = invoice.counter;
                            td2.innerHTML = invoice.description;
                            td3.innerHTML = invoice.name;
                            td4.innerHTML = '<span><i class="icon-calendar m-r-10"></i>' + invoice.date + '</span>';
                            td5.innerHTML = invoice.method;
                            if (invoice.status === 0) {
                                td6.innerHTML = '<label class="badge badge-info">Não Pago</label>';
                            } else {
                                td6.innerHTML = '<label class="badge badge-success">Pago</label>';
                            }
                            td7.innerHTML = '<a class="btn btn-sm btn-success" href="../../../invoice/view/?key=' + invoice.id + '" target="_blanck">Ver Fatura</a>';
                        }
                    }
                }
            } else {
                td1.innerHTML = invoice.counter;
                td2.innerHTML = invoice.description;
                td3.innerHTML = invoice.name;
                td4.innerHTML = '<span><i class="icon-calendar m-r-10"></i>' + invoice.date + '</span>';
                td5.innerHTML = invoice.method;
                if (invoice.status === 0) {
                    td6.innerHTML = '<label class="badge badge-info">Não Pago</label>';
                } else {
                    td6.innerHTML = '<label class="badge badge-success">Pago</label>';
                }
                td7.innerHTML = '<a class="btn btn-sm btn-success" href="../../../invoice/view/?key=' + invoice.id + '" target="_blanck">Ver Fatura</a>';
            }

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);

            tableBody.appendChild(tr);
        });
    } else {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem Facturas geradas...";
        td.colSpan = 7;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}