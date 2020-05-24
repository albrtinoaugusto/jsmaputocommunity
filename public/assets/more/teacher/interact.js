var myData = JSON.parse(localStorage.getItem("data"));
var theLesson = {};

function startEverthing(){
    // cwidget scroll
    $('.chat-list').slimScroll({
        height: 'calc(100vh - 220px)',
        wheelStep: 10,
        touchScrollStep: 50,
        color: '#2b2e33',
        size: '4px',
        borderRadius: '3px',
        alwaysVisible: true,
        position: 'right',
    });
    
    // cwidget scroll
    $('.chat-history ul').slimScroll({
        height: 'calc(100vh - 340px)',
        wheelStep: 10,
        touchScrollStep: 50,
        color: '#2b2e33',
        size: '4px',
        borderRadius: '3px',
        alwaysVisible: false,
        position: 'right',
    });

    getLessons();

    try {
        let urlStr = (window.location.href);
        let url = new URL(urlStr);
        let lessonId = url.searchParams.get("lessonId");
        setConverssation(lessonId);
    } catch (err) {
        console.log(err);
    } 
}


function setConverssation(lessonId){
    db.collection("lessons").doc(lessonId).get().then(function (doc){
        if (doc.exists){
            theLesson = doc.data();
            showMaterials();
            showChatHistory();
        }
    }).catch(function(err){
        console.log(err.message);
    });
}


function showMaterials() {

    let lesson = theLesson;

    let materials = document.getElementById("materials");
    materials.innerHTML = "";

    for (let x = 1; x <= 2; x++) {
        // Single Document
        //let li = document.createElement("li");

        let div1 = document.createElement("div");
        div1.className = "card";

        let div2 = document.createElement("div");
        div2.className = "file";
        div1.appendChild(div2);
        //========================================== 
    
        let a = document.createElement("a");
        if (x === 1) {
            a.href = lesson.doc1;
        }
        else {
            a.href = lesson.doc2;
        }

        div2.appendChild(a);
        //==========================================

        
        let div3 = document.createElement("div");
        div3.style = "margin: 20px;";
        a.appendChild(div3);
        //==========================================
        
        let p1 = document.createElement("p");
        p1.className = "align-center";
        div3.appendChild(p1);
        //==========================================

        
        let i = document.createElement("i");
        i.className = "fa fa-5x fa-file text-success";
        p1.appendChild(i);
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

}




function showChatHistory() {
 
    let lesson = theLesson;

    if (lesson.comments !== "undefined" && lesson.comments !== null) {

        let chatBody = document.getElementById("chatBody");
        chatBody.innerHTML = "";

        //let count = lesson.comments.length;
        for (let i = 0; i < lesson.comments.length; i++) {
      
            let comment = lesson.comments[i];
            let yourName = "";

            let li = document.createElement("li");
            li.className = "clearfix";

            let divAvatar = document.createElement("div");
            if (comment.ownerId === myData.id) {
                yourName = "Eu ";
                divAvatar.className = "message-data float-left"; // Without *float-left* to others
            } else {
                divAvatar.className = "message-data";
                yourName = comment.ownerName;
            }
            li.appendChild(divAvatar);

            let avatar = document.createElement("img");
            avatar.src = comment.ownerAvatar;

            avatar.alt = "Avatar";
            divAvatar.appendChild(avatar);

            let divDetails = document.createElement("div");
            divDetails.className = "detail-right";
            li.appendChild(divDetails);


            let divMessage = document.createElement("div");
            if (comment.ownerId === myData.id) {
                divMessage.className = "message my-message"; //Without *my-message* and adding *other-message* & *float-right*
            } else {
                divMessage.className = "message other-message float-right";
            }
            divDetails.appendChild(divMessage);


            let span = document.createElement("span");
            span.className = "message-data-time d-block mt-1";
            span.innerText = yourName + " as " + comment.dateTime.split(" - ")[1];
            divMessage.appendChild(span);

            let p = document.createElement("p");
            p.innerText = comment.comment;
            divMessage.appendChild(p);

            /*    
            // Black 2
            let divMessage2 = document.createElement("div");
            divMessage2.className = "message my-message"; //Without *my-message* and adding *other-message* & *float-right*
            divDetails.appendChild(divMessage2);

            let span2 = document.createElement("span");
            span2.className = "message-data-time d-block mt-1";
            span2.innerText = "Albertino as 10:12 PM";
            divMessage2.appendChild(span2);

            let p2 = document.createElement("p");
            p2.innerText = "Are we meeting today?";
            divMessage2.appendChild(p2);
            */

            chatBody.appendChild(li);
        }
    }

    setTimeout(showChatHistory, Math.ceil(Math.random()*3000));
}


function sendComment() {

    let avatar = myData.avatar;
    if (typeof(myData.avatar) === "undefined" || myData.avatar === null) {
        avatar = "../../../_assets/as2/images/user-small.png";
    }

    getDate(); //Get updated time
    let date = dateTimeResponse;

    let typedComment = document.getElementById("commentField").value;
    
    let comment = {
        counter: 0,
        ownerId: myData.id,	
        ownerName: myData.name,
        ownerAvatar: avatar,
        dateTime: dateTimeResponse,
        comment: typedComment
    };
    

    let dataArray = [];
    if (typeof(theLesson.comments) !== "undefined" && theLesson.comments.length > 0) {
        comment.counter = theLesson.comments.length;

        dataArray = theLesson.comments;
        dataArray.push(comment);
    } else {
        dataArray.push(comment);
    }


    if (typedComment.length > 0) {
        
        db.collection("lessons").doc(theLesson.id).update({comments: dataArray}).then(function(){
            
            let li = document.createElement("li");
            li.className = "clearfix";

            let divAvatar = document.createElement("div");
            divAvatar.className = "message-data float-left"; // Without *float-left* to others

            li.appendChild(divAvatar);

            let avatarImg = document.createElement("img");
            avatarImg.src = avatar;
            
            avatarImg.alt = "Avatar";
            divAvatar.appendChild(avatarImg);

            let divDetails = document.createElement("div");
            divDetails.className = "detail-right";
            li.appendChild(divDetails);

            let divMessage = document.createElement("div");
            divMessage.className = "message my-message"; //Without *my-message* and adding *other-message* & *float-right*

            divDetails.appendChild(divMessage);

            let span = document.createElement("span");
            span.className = "message-data-time d-block mt-1";
            span.innerText = date;
            divMessage.appendChild(span);

            let p = document.createElement("p");
            p.innerText = typedComment;
            divMessage.appendChild(p);

            let chatBody = document.getElementById("chatBody");
            chatBody.appendChild(li);

            document.getElementById("commentField").value = "";

        }).catch(function(err){
            console.log(err.message);
        });
    }
}



function setMainLesson(lesson){
    theLesson = lesson;
}



function getLessons(){
    db.collection("lessons").where('ownerId', '==', myData.id).get().then(function (rs){
        rs.docs.forEach(element => {
            let lesson = element.data();

            let option = document.createElement("option");
            option.innerHTML = lesson.tittle;
            option.value = lesson.id;

            document.getElementById("lesson_drop").appendChild(option);
        });
    }).catch(function(err){
        console.log(err.message);
    });
}


const lessonDrop = document.getElementById("lesson_drop");
lessonDrop.addEventListener("change", function(){
    let val = this.value;

    if (val !== "- selecione a aula -") {
        document.location = "?lessonId=" + val;
    }
});




