var theStudent = {};

window.onload = function() {
    try {
        let urlStr = (window.location.href);
        let url = new URL(urlStr);
        let id = url.searchParams.get("id");
        //console.log(id);
        getInformation(id);
    } catch (err) {
        console.log(err.message);
    }
}

function getInformation(id){
    db.collection("students").doc(id).get().then(doc => {
        let student = doc.data();
        showInformation(student);
    }).catch((err) => {
        console.log(err.message)
    });
}


function showInformation(student){

    theStudent = student;

    if (theStudent !== null){
        document.getElementById("name").innerHTML = theStudent.name;
        document.getElementById("surname").innerHTML = theStudent.surname;
        document.getElementById("grade").innerHTML = theStudent.grade + "ª Classe";
        document.getElementById("class").innerHTML = theStudent.class;

        document.getElementById("age").innerHTML = parseInt(getDate("year")) - parseInt(theStudent.born.split("-")[0]);
        document.getElementById("address").innerHTML = theStudent.address;
        document.getElementById("details").innerHTML = theStudent.details;
    }
    else {
        infoAlert("Estudante não encontrado.");
    }
}



function showDocument(){
    if (theStudent !== null && typeof(theStudent.doc) !== "undefined" && theStudent.doc.length > 20){
        document.location = theStudent.doc;
    }
    else {
        infoAlert("Este estudante não tem o documento carregado.");
    }
}

function showCertificate(){
    if (theStudent !== null && typeof(theStudent.certificate) !== "undefined" && theStudent.certificate.length > 20){
        document.location = theStudent.certificate;
    }
    else {
        infoAlert("Este estudante não tem o Certificado carregado.");
    }
}


function showSimilar(){

    /*
        <li class="online">
            <a href="../../student/about/?id=dkgrhbgdrbdjrb">
                <div class="media">
                    <img class="media-object" src="../../../_assets/as2/images/user-small.png" alt="Avatar">
                    <div class="media-body">
                        <span class="name">Albertino</span>
                        <span class="message">Marrengula</span>
                    </div>
                </div>
            </a>
        </li>
    */
}

