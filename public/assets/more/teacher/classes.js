var myData = JSON.parse(localStorage.getItem("data"));

function getClasses() {
    if (myData !== null && typeof(myData) !== "undefined" && typeof(myData.classes) !== "undefined" && myData.classes.length > 0) {
        fillTableData(myData.classes);
    } else {
        let tableBody = document.getElementById("tClassesBody");
        tableBody.innerHTML = "";
        
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem turmas atribuidas...";
        td.colSpan = 3;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}


function fillTableData(classes) {

    let tableBody = document.getElementById("tClassesBody");
    if (classes.length > 0) {
        tableBody.innerHTML = "";

        for (let i = 0; i < classes.length; i++) {
            //console.log(doc.data())
    
            let tr = document.createElement("tr");
    
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
    
            td1.innerHTML = classes[i].rom;
            td2.innerHTML = classes[i].description;
            td3.innerHTML = classes[i].students;

            let button = document.createElement("button");
            button.innerHTML = "<i class='fa fa-minus'></i>";
            button.className = "btn btn-sm btn-success";
            button.onclick = function (){
                removeClass(i);
            }
            td4.appendChild(button);
    
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
    
            tableBody.appendChild(tr);
        }
    }
    else {
        tableBody.innerHTML = "";
        
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Ainda sem turmas atribuidas...";
        td.colSpan = 4;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
    
}



function removeClass(index) {

    let classes = myData.classes;
    classes.splice(index, 1);

    waitAlert();

    db.collection("teachers").doc(myData.id).update({classes: classes}).then(() => {
        myData.classes = classes;
        localStorage.setItem('data', JSON.stringify(myData));
        sucessAlert("Removido com sucesso!");
        getClasses();
    }).catch(error => {
        console.log(error.message);
    })
}