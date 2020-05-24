var myData = JSON.parse(localStorage.getItem("data"));

var classId = "";
var document1 = "";
var document2 = "";
var theVideo1 = "";
var theVideo2 = "";

function getClassId(){
    try {
        let urlStr = (window.location.href);
        let url = new URL(urlStr);
        classId = url.searchParams.get("classId");
    } catch (err) {
        console.log(err);
    }
}



function getSubjects() {
    db.collection("subjects").get().then(function (snapshot){
        if (snapshot.docs.length > 0) {
            snapshot.docs.forEach((doc) => {
                let subject = doc.data();

                let opt = document.createElement("option");
                opt.value = subject.id;
                opt.innerHTML = subject.grade + "ª Classe - " + subject.description;
                document.getElementById("subject").appendChild(opt);
            })
        }
    }).catch(function(err){
        console.log(err.message);
    });
}


function setVideo1(downloadURL){
    theVideo1 = downloadURL;
}


function setVideo2(downloadURL){
    theVideo2 = downloadURL;
}


function setDocument1(downloadURL){
    document1 = downloadURL;
}


function setDocument2(downloadURL){
    document2 = downloadURL;
}

const form = document.querySelector("#asign");
form.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let theme = document.getElementById("theme");
    let subject = document.getElementById("subject");
    let date = document.getElementById("date");
    let link = document.getElementById("video1");

    let doc1 = document.getElementById("doc1");
    let doc2 = document.getElementById("doc2");
    let video1 = document.getElementById("video1");
    let video2 = document.getElementById("video2");



    let theSubject = subject.options[subject.selectedIndex].text;

    let msg = "";
    let count = 0;

    if (theme.value === null || theme.value.length === 0 && count === 0) {
        count++;
        msg = "Esqueceu de informar o Tema da Aula.";
    }

    if (theSubject === null || theSubject.length === 0 && count === 0) {
        if (theSubject === "- selecione -") {
            count++;
            msg = "Esqueceu de informar a Disciplina.";
        }
    }

    if (date.value === null || date.value.length === 0 && count === 0) {
        count++;
        msg = "Não esqueça de informar a Data.";
    }


    if (document1.length === 0 && count === 0) {
        count++;
        msg = "Carregue um arquivo com o resumo da Aula.";
        document.getElementById("doc1Desc").innerText = "Click Neste Botão";
    }


    if (document2.length === 0 && count === 0) {
        count++;
        msg = "Carregue um arquivo com o exercícios da Aula.";
        document.getElementById("doc2Desc").innerText = "Click Neste Botão";
    }

    /*
    if (link.value.length === 0 && count === 0 || link.value === "Informe um link aque..." && count === 0) {
        count++;
        msg = "Informe um link com mais detalhes da aula.";
        document.getElementById("video1").value = "Informe um link aque...";
    }
    else {
        setVideo1(link.value);
    }
    

    if (theVideo2.length === 0 && count === 0) {
        count++;
        msg = "Obrigatório carregar um video da aula.";
        document.getElementById("video2Desc").innerText = "Click Neste Botão";
    }
    */


    if (count > 0) {
        emptyFieldAlert(msg);
    } else {
        waitAlert();
        
        let onlyDate = date.value.split("T")[0];
        let time = date.value.split("T")[1];

        let formatedDateAndTime = onlyDate.split("-")[2] + "-" + onlyDate.split("-")[1] + "-" + onlyDate.split("-")[0] + " - " + time;

        let avatarImgLink = "";
        if (typeof(myData.avatar) !== "undefined" && myData.avatar !== null){
            avatarImgLink = myData.avatar;
        } 

        let video1Link = "";
        if (link.value.length > 0){
            video1Link = link.value;
        }
     
        let grade = parseInt(theSubject.split(" ")[0].split("ª")[0]);

        getDate();
        let obj = {
            tittle: theme.value,
            subject: theSubject,
            grade: grade,
            classId: classId,
            ownerId: myData.id,
            ownerName: myData.name, 
            ownerAvatar: avatarImgLink,
            doc1: document1, 
            doc2: document2,
            video1: video1Link, 
            video2: theVideo2,
            dateTime: formatedDateAndTime
        };

        db.collection("lessons").add(obj).then((docRef) => {
            let generatedId = docRef.id;
            return db.collection("lessons").doc(generatedId).update({
                id: generatedId
            })    
        }).then(() => {
            document1 = "";
            document2 = "";
            theVideo1 = "";
            theVideo2 = "";

            document.getElementById("theme").value = "";
            document.getElementById("date").value = "";
            document.getElementById("video1").value = "";

            sucessAlert("Aula agendada com sucesso.");
        }).catch(err => {
            infoAlert("Erro ao cadastrar.");
        });
    }

    count = 0;
});



function uploadDocument(input, count) {
    db.collection("lessons").get().then(snapshot => {
        let countFile = snapshot.docs.length;
        countFile = countFile + 1;
        uploadFile(input, countFile, count);
    }).catch(err => {
        console.log(err.message);
    })
}



function uploadFile(input, countFile, simpleCount) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function () {

            let base64 = reader.result;
            if (!base64.split(",")[0].includes("pdf")) {
                infoAlert("Por favor carregue um arquivo em .PDF")
            } else {
                base64 = base64.split(",")[1];

                waitAlert("A enviar...");

                let docName = simpleCount + "-" + dateTimeString;

                var uploadTask = bag.ref('lessons/documents/').child('Arquivo' + docName + '.pdf').putString(base64, 'base64', { contentType: 'application/pdf' });
                uploadTask.on('state_changed', function (snapshot) {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                    if (simpleCount == 1) {
                        document.getElementById("doc1Desc").innerText = progress + "%";
                    } else {
                        document.getElementById("doc2Desc").innerText = progress + "%";
                    }

                }, function (error) {
                    console.log(error);
                    infoAlert("Ocorreu um erro au carregar o documento.")
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        if (simpleCount == 1) {
                            setDocument1(downloadURL);
                            document.getElementById("doc1Desc").innerText = "Arquivo carregado!";
                        } else {
                            setDocument2(downloadURL);
                            document.getElementById("doc2Desc").innerText = "Arquivo carregado!";
                        }

                        sucessAlert("Documento carregado com sucesso!");
                    });
                });
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}



function uploadVideo(input) {
    db.collection("lessons").get().then(snapshot => {
        let countFile = snapshot.docs.length;
        countFile = countFile + 1;
        uploadFile(input, countFile);
    }).catch(err => {
        console.log(err.message);
    })
}



function uploadVideo(input, countFile) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function () {

            let base64 = reader.result;
          
            if (!base64.split(",")[0].includes("mp4")) {
                infoAlert("Por favor carregue um arquivo no formato .MP4")
            } else {
                base64 = base64.split(",")[1];

                waitAlert("A enviar...");

                let docName = countFile + "-" + dateTimeString;

                var uploadTask = bag.ref('lessons/videos/').child('Video' + docName + '.mp4').putString(base64, 'base64', { contentType: 'video/mp4' });
                uploadTask.on('state_changed', function (snapshot) {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                    document.getElementById("video2Desc").innerText = "A enviar " + parseInt(progress) + "%...";

                }, function (error) {
                    console.log(error);
                    infoAlert("Ocorreu um erro au carregar o documento.")
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        
                        setVideo2(downloadURL);
                        document.getElementById("video2Desc").innerText = "Arquivo carregado!";
                        
                        sucessAlert("Video enviado com sucesso!");
                    });
                });
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}