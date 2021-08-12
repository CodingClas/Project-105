Webcam.attach('#camera');
camera = document.getElementById("camera");
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quanlity:90
});

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-l_u6oN9Q/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.log(error);
    } else {
        console.log(result);
        document.getElementById("result_face_name").innerHTML = result[0].label;
        document.getElementById("result_accuracy").innerHTML = result[0].confidence.toFixed(3);
    }
}