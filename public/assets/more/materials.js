var myData = JSON.parse(localStorage.getItem("data"));

function startEverthing(){
    getSubjects()
}


function getSubjects() {
    db.collection('subjects').get().then(snapshot => {
        setSubjects(snapshot.docs);
    }).catch(err => {
        console.log(err.message);
    });
}


function setSubjects(subjects) {

    let bodyRow = document.getElementById("bodyRow");
    if (subjects !== null) {

        for (let i = 0; i < subjects.length; i++) {
            let subs = subjects.data();

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
            a.href = "show/?subject=" + subs.description + "&class=" + subs.class + "&grade=" + subs.grade;
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
            p2.className = "m-b-5 text-muted align-center";
            p2.innerText = subjects.description;
            div4.appendChild(p2);
            //==========================================

            bodyRow.appendChild(div1);
        }
    }
}