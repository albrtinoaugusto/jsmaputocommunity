var myData = JSON.parse(localStorage.getItem("data"));

getDate("month");
var month = dateTimeResponse;

getDate("year");
var year = dateTimeResponse;

getDate("year");
var day = dateTimeResponse;


function getInvoices() {
    db.collection('invoices').where('ownerId', '==', myData.id).get().then(snapshot => {
        fillTableData(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}



function fillTableData(docs) {

    document.getElementById("year").value = year;
    let tBody = document.getElementById("tbody");

    if (docs.length > 0) {
        tBody.innerHTML = "";
    }

    docs.forEach(doc => {

        let myInvoices = doc.data();

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            td1.innerHTML = myInvoices.id;
            tr.appendChild(td1);

            let td2 = document.createElement("td");
            td2.innerHTML = myInvoices.description;
            tr.appendChild(td2);

            let td3 = document.createElement("td");
            td3.innerHTML = myInvoices.name;
            tr.appendChild(td3);

            let td4 = document.createElement("td");
            td4.innerHTML = "<span> <i class ='icon-calendar m-r-10'></i>" + myInvoices.date + "</span >";
            tr.appendChild(td4);

            let td6 = document.createElement("td");
            td6.innerHTML = myInvoices.method;
            tr.appendChild(td6);

            let td7 = document.createElement("td");
            td7.innerHTML = myInvoices.status;
            tr.appendChild(td7);

            let td8 = document.createElement("td");

            let a = document.createElement("a");
            a.href = "../../invoice/view/?key=" + myInvoices.id;
            a.innerHTML = "Ver Fatura";
            a.className = "btn btn-success btn-sm";

            td8.appendChild(a);
            tr.appendChild(td8);

            tBody.appendChild(tr);
            
        }); 
}