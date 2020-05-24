// basla
$(".gambar").attr("src", "http://www.nedir.org/deniz/gunes.jpg").css('height', '140');
$(".gambar").attr("src", "http://www.nedir.org/deniz/gunes.jpg").css('width', '140');

var $uploadCrop, tempFilename, rawImg, imageId;

var counter;
var imageCrooped;

var imgWith = 140;
var imgHeight = 140;

function readFile(input, count) {
    counter = count;

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            if (!e.target.result.split(",")[0].includes("jpeg")) {
                infoAlert("Por favor carregue um arquivo em .JPG")
            } else {
                $('.upload-demo').addClass('ready');
                $('#cropImagePop').modal('show');
                rawImg = e.target.result;
                //console.log(e.target.result);
            }
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        swal("ÃœzgÃ¼nÃ¼m - browseriniz bu iÅŸlemi desteklemiyor: FileReader API");
    }
}


$uploadCrop = $('#upload-demo').croppie({
    viewport: {
        width: imgWith,
        height: imgHeight
    },
    enforceBoundary: false,
    enableExif: true
});


$('#cropImagePop').on('shown.bs.modal', function() {
    // alert('Shown pop');
    $uploadCrop.croppie('bind', {
        url: rawImg
    }).then(function() {
        console.log('Image imported and rendered!');
    });
});


$('.item-img').on('change', function() {
    imageId = $(this).data('id');
    tempFilename = $(this).val();
    $('#cancelCropBtn').data('id', imageId);
    readFile(this);
});



$('#cropImageBtn').on('click', function(ev) {
    $uploadCrop.croppie('result', {
        type: 'base64',
        format: 'jpeg',
        size: { width: imgWith, height: imgHeight }
    }).then(function(resp) {

        uploadAvatar(resp.split(",")[1])

        $('#avatar_img').attr('src', resp);
        $('#avatar_pic').attr('src', resp);
        $('#avatar_icon').attr('src', resp);

        $('#cropImagePop').modal('hide');

    });
});



function uploadAvatar(avatarBase64) {
 
    let theId = JSON.parse(localStorage.getItem("data")).id;
    let uploadBtn = document.getElementById("btn-upload");

    if (theId === null || theId.length === 0) {
        theId = "Avatar"
    }

    waitAlert("A enviar...");

    var uploadTask = bag.ref('avatars/' + theId + "/").child('avatar').putString(avatarBase64, 'base64', { contentType: 'image/jpg' });
    uploadTask.on('state_changed', function(snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        if (uploadBtn !== null && typeof(uploadBtn) !== "undefined") {
            uploadBtn.innerText = "Enviando " + progress + "%";
        }

    }, function(error) {
        console.log(error);
        infoAlert("Ocorreu um erro au carregar a imagem.")
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);

            let documentRef = "students";

            if (counter === 0) {
                documentRef = "admins";
            }

            if (counter === 1) {
                documentRef = "teachers";
            }

            db.collection(documentRef).doc(theId).update({
                avatar: downloadURL
            }).then(() => {
                var docRef = db.collection(documentRef).doc(theId);
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        localStorage.setItem('data', JSON.stringify(doc.data()));
                    } 

                    if (uploadBtn !== null && typeof(uploadBtn) !== "undefined") {
                        uploadBtn.innerText = "Imagem Carregada";
                    }

                    sucessAlert("Imagem carregada com sucesso!");
                }).catch(function(error) {
                    console.log({ message: "Erro ao buscar o documento!" })
                });
            });

        });
    });
}