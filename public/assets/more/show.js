var myData = JSON.parse(localStorage.getItem("data"));

function startShowing() {

    try {
        let urlStr = (window.location.href).toLowerCase();
        let url = new URL(urlStr);
        let subject = url.searchParams.get("subject");
        let theClass = url.searchParams.get("class");
        let grade = url.searchParams.get("grade");
        //console.log(id);
        getContents(subject, theClass, grade);
    } catch (err) {
        console.log(err);
    }

}


function getContents(subject, theClass, grade) {
    db.collection('lessons').get().then(snapshot => {
        getMaterials(snapshot.data(), subject, theClass, grade);
    }).catch(err => {
        console.log(err.message);
    });
}


function getMaterials(lessons, subject, theClass, grade) {

    let bodyRow = document.getElementById("bodyRow");

    if (subject !== null && theClass !== null && grade !== null) {
        for (let i = 0; i > lessons.lenght; i++) {

            let lesson = lessons[i];
            if (lesson.subject === subject && lesson.grade === grade) {

                if (typeof(lesson.video1) !== "undefined" && lesson.video1.length > 0) {
                    // Single Video
                    //let li = document.createElement("li");
            
                    let div1 = document.createElement("div");
                    div1.className = "card";
            
                    let div2 = document.createElement("div");
                    div2.className = "file";
                    div1.appendChild(div2);
                    //========================================== 
            
                    let a = document.createElement("a");
                    a.href = "javascript:void(0)";
                    div2.appendChild(a);
                    //==========================================
            
                    let div3 = document.createElement("div");
                    div3.style = "padding: 5px; padding-bottom: 0px;";
                    a.appendChild(div3);
                    //==========================================
            
                    let p1 = document.createElement("p");
                    p1.className = "align-center";
                    p1.style = "margin-bottom: 0;";
                    div3.appendChild(p1);
                    //==========================================
            
            
                    let video = document.createElement("video");
                    video.src = lesson.video1;
                    video.poster = "#";
            
            
                    video.controls = true;
                    video.style = "box-sizing: border-box; width: 100%;"
                    p1.appendChild(video);
                    //==========================================
            
                    let div4 = document.createElement("div");
                    div4.className = "file-name";
                    a.appendChild(div4);
                    //==========================================
            
                    let p2 = document.createElement("p");
                    p2.className = "m-b-5 text-muted align-center";
                    p2.innerText = lesson.tittle;
                    div4.appendChild(p2);
                    //==========================================
            
                    //li.appendChild(div1);
                    materials.appendChild(div1);
                }
            
                if (typeof(lesson.video2) !== "undefined" && lesson.video2.length > 0) {
                    // Single Video
                    //let li = document.createElement("li");
            
                    let div1 = document.createElement("div");
                    div1.className = "card";
            
                    let div2 = document.createElement("div");
                    div2.className = "file";
                    div1.appendChild(div2);
                    //========================================== 
            
                    let a = document.createElement("a");
                    a.href = "javascript:void(0)";
                    div2.appendChild(a);
                    //==========================================
            
                    let div3 = document.createElement("div");
                    div3.style = "padding: 5px; padding-bottom: 0px;";
                    a.appendChild(div3);
                    //==========================================
            
                    let p1 = document.createElement("p");
                    p1.className = "align-center";
                    p1.style = "margin-bottom: 0;";
                    div3.appendChild(p1);
                    //==========================================
            
            
                    let video = document.createElement("video");
                    video.src = lesson.video2;
                    video.poster = "#";
            
            
                    video.controls = true;
                    video.style = "box-sizing: border-box; width: 100%;"
                    p1.appendChild(video);
                    //==========================================
            
                    let div4 = document.createElement("div");
                    div4.className = "file-name";
                    a.appendChild(div4);
                    //==========================================
            
                    let p2 = document.createElement("p");
                    p2.className = "m-b-5 text-muted align-center";
                    p2.innerText = lesson.tittle;
                    div4.appendChild(p2);
                    //==========================================
            
                    //li.appendChild(div1);
                    materials.appendChild(div1);
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

            }
        }
    }

}