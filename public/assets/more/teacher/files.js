function showClassFiles(){

    try {
        let urlStr = (window.location.href);
        let url = new URL(urlStr);
        let ownerId = url.searchParams.get("owner");
        let classId = url.searchParams.get("class");
        //console.log(id);
        getFiles(ownerId, classId);
    } catch (err) {
        console.log(err);
    }
}


function getFiles(ownerId, classId){
    waitAlert();

    db.collection("lessons").where('ownerId', '==', ownerId).where('classId', '==', classId).get().then(function (rs) {

        if (rs.docs.length > 0) {
            rs.docs.forEach(function (doc) {
                let lesson = doc.data();
                
                for (let i = 1; i <= 2; i++) {
                    
                    if (i === 1 && lesson.video1.length > 0) {

                        let div1 = document.createElement("div");
                        div1.className = "col-lg-3 col-md-4 col-sm-12";
            
                        let div2 = document.createElement("div");
                        div2.className = "card";
                        div1.appendChild(div2);
            
                        let div3 = document.createElement("div");
                        div3.className = "file";
                        div2.appendChild(div3);
                        //========================================== 
            
            
                        let div4 = document.createElement("div");
                        div4.style = "padding: 5px; padding-bottom: 0px";
                        div3.appendChild(div4);
                        //==========================================
            
                        let p1 = document.createElement("p");
                        p1.className = "align-center";
                        p1.style = "margin-bottom: 0;"
                        div4.appendChild(p1);
                        //==========================================
            
            
                        let video = document.createElement("video");
                        video.src = lesson.video1;
   
                        video.poster = "";
                        video.controls = true;
                        video.style = "box-sizing: border-box; width: 100%";
                        p1.appendChild(video);
                        //==========================================
            
                        let div5 = document.createElement("div");
                        div5.className = "file-name";
                        div3.appendChild(div5);
                        //==========================================
            
                        let p2 = document.createElement("p");
                        p2.className = "m-b-5 text-muted";
                        p2.innerText = lesson.tittle;
                        div5.appendChild(p2);
                        //==========================================
            
                        let span = document.createElement("span");
                        //span.innerText = "Tipo: .mp4";
            
                        let leftSpan = document.createElement("span");
                        leftSpan.className = "date text-muted";
                        leftSpan.style = "font-size: 10pt;"
                        leftSpan.innerText = "De: " + lesson.dateTime;
                        span.appendChild(leftSpan);
            
                        div5.appendChild(span);
            
                        bodyRow.appendChild(div1);
                    }

                    if (i === 2 && lesson.video2.length > 0) {

                        let div1 = document.createElement("div");
                        div1.className = "col-lg-3 col-md-4 col-sm-12";
            
                        let div2 = document.createElement("div");
                        div2.className = "card";
                        div1.appendChild(div2);
            
                        let div3 = document.createElement("div");
                        div3.className = "file";
                        div2.appendChild(div3);
                        //========================================== 
            
            
                        let div4 = document.createElement("div");
                        div4.style = "padding: 5px; padding-bottom: 0px";
                        div3.appendChild(div4);
                        //==========================================
            
                        let p1 = document.createElement("p");
                        p1.className = "align-center";
                        p1.style = "margin-bottom: 0;"
                        div4.appendChild(p1);
                        //==========================================
            
            
                        let video = document.createElement("video");
                        video.src = lesson.video2;
   
                        video.poster = "";
                        video.controls = true;
                        video.style = "box-sizing: border-box; width: 100%";
                        p1.appendChild(video);
                        //==========================================
            
                        let div5 = document.createElement("div");
                        div5.className = "file-name";
                        div3.appendChild(div5);
                        //==========================================
            
                        let p2 = document.createElement("p");
                        p2.className = "m-b-5 text-muted";
                        p2.innerText = lesson.tittle;
                        div5.appendChild(p2);
                        //==========================================
            
                        let span = document.createElement("span");
                        //span.innerText = "Tipo: .mp4";
            
                        let leftSpan = document.createElement("span");
                        leftSpan.className = "date text-muted";
                        leftSpan.style = "font-size: 10pt;"
                        leftSpan.innerText = "De: " + lesson.dateTime;
                        span.appendChild(leftSpan);
            
                        div5.appendChild(span);
            
                        bodyRow.appendChild(div1);
                    }
                }


                for (let x = 1; x <= 2; x++) {
                    
                    if (x === 1 && lesson.doc1.length > 0) {
                        let div1 = document.createElement("div");
                        div1.className = "col-lg-3 col-md-4 col-sm-12";
            
                        let div2 = document.createElement("div");
                        div2.className = "card";
                        div1.appendChild(div2);
            
                        let div3 = document.createElement("div");
                        div3.className = "file";
                        div2.appendChild(div3);
                        //========================================== 
            
                        let a = document.createElement("a");
                        a.href = lesson.doc1;

                        div3.appendChild(a);
                        //==========================================
            
                        let div4 = document.createElement("div");
                        div4.style = "margin: 20px;";
                        a.appendChild(div4);
                        //==========================================
            
                        let p1 = document.createElement("p");
                        p1.className = "align-center";
                        div4.appendChild(p1);
                        //==========================================
            
            
                        let i = document.createElement("i");
                        i.className = "fa fa-5x fa-file text-success";
                        p1.appendChild(i);
                        //==========================================
            
                        let div5 = document.createElement("div");
                        div5.className = "file-name";
                        a.appendChild(div5);
                        //==========================================
            
                        let p2 = document.createElement("p");
                        p2.className = "m-b-5 text-muted";
                        p2.innerText = lesson.tittle;
                        div5.appendChild(p2);
                        //==========================================
            
                        let span = document.createElement("span");
                        //span.innerText = "Enviado Em: ";
            
                        let leftSpan = document.createElement("span");
                        leftSpan.className = "date text-muted";
                        leftSpan.style = "font-size: 10pt;"
                        leftSpan.innerHTML = "De: " + lesson.dateTime;
                        span.appendChild(leftSpan);
            
                        div5.appendChild(span);
            
                        bodyRow.appendChild(div1);
                    }

                    if (x === 2 && lesson.doc2.length > 0) {
                        let div1 = document.createElement("div");
                        div1.className = "col-lg-3 col-md-4 col-sm-12";
            
                        let div2 = document.createElement("div");
                        div2.className = "card";
                        div1.appendChild(div2);
            
                        let div3 = document.createElement("div");
                        div3.className = "file";
                        div2.appendChild(div3);
                        //========================================== 
            
                        let a = document.createElement("a");
                        a.href = lesson.doc2;

                        div3.appendChild(a);
                        //==========================================
            
                        let div4 = document.createElement("div");
                        div4.style = "margin: 20px;";
                        a.appendChild(div4);
                        //==========================================
            
                        let p1 = document.createElement("p");
                        p1.className = "align-center";
                        div4.appendChild(p1);
                        //==========================================
            
            
                        let i = document.createElement("i");
                        i.className = "fa fa-5x fa-file text-success";
                        p1.appendChild(i);
                        //==========================================
            
                        let div5 = document.createElement("div");
                        div5.className = "file-name";
                        a.appendChild(div5);
                        //==========================================
            
                        let p2 = document.createElement("p");
                        p2.className = "m-b-5 text-muted";
                        p2.innerText = lesson.tittle;
                        div5.appendChild(p2);
                        //==========================================
            
                        let span = document.createElement("span");
                        //span.innerText = "Enviado Em: ";
            
                        let leftSpan = document.createElement("span");
                        leftSpan.className = "date text-muted";
                        leftSpan.style = "font-size: 10pt;"
                        leftSpan.innerHTML = "De: " + lesson.dateTime;
                        span.appendChild(leftSpan);
            
                        div5.appendChild(span);
            
                        bodyRow.appendChild(div1);
                    }
                }
                
            });
        } else {
            infoAlert("Dados não encontrados...");
        }

        
        let div1 = document.createElement("div");
        div1.className = "col-lg-3 col-md-4 col-sm-12";

        let div2 = document.createElement("div");
        div2.className = "card";
        div1.appendChild(div2);

        let div3 = document.createElement("div");
        div3.className = "file";
        div2.appendChild(div3);
        //========================================== 

        let a = document.createElement("a");
        a.href = "../add/?classId=" + classId;
        div3.appendChild(a);
        //==========================================

        let div4 = document.createElement("div");
        div4.style = "margin: 20px;";
        a.appendChild(div4);
        //==========================================

        let p1 = document.createElement("p");
        p1.className = "align-center";
        div4.appendChild(p1);
        //==========================================


        let i = document.createElement("i");
        i.className = "fa fa-5x fa-plus text-success";
        p1.appendChild(i);
        //==========================================

        let div5 = document.createElement("div");
        div5.className = "file-name";
        a.appendChild(div5);
        //==========================================

        let p2 = document.createElement("p");
        p2.className = "m-b-5 text-muted";
        p2.innerText = "Adicionar";
        div5.appendChild(p2);
        //==========================================



        bodyRow.appendChild(div1);
    }).catch(err => {
        console.log(err.message);
        //infoAlert("Verifique a sua conexão com a Internet.");
    }); 
}