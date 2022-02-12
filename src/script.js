var capture;
var song = "";
var srw = 0;
var slw = 0;
var rwx = 0;
var rwy = 0;
var lwx = 0;
var lwy = 0;

function preload(){
    song = loadSound("src/sounds/music.mp3");
}

function setup(){
    createCanvas(640,480).position(650,100);
    capture = createCapture(VIDEO);
    capture.hide();

    pose = ml5.poseNet(capture, modelLoaded);
    pose.on("pose", gotPoses);
}
function playSong(){
    song.play();
    document.getElementById("speed").innerHTML = "Speed: 0x";
    document.getElementById("volume").innerHTML = "Volume: 0x";
}
function keyPressed(){
    if(key = "shift"){
        song.stop();
        song.setVolume(1);
        song.rate(1);
    }
}
function modelLoaded(){
    console.log("FINALLY... \n IT WORK'S\n anyway back to my divorce papers")
}
function gotPoses(r){
    if(r.length > 0){
        srw = r[0].pose.keypoints[10].score;
        slw = r[0].pose.keypoints[9].score;
        console.log(r, srw, slw)

        rwx = r[0].pose.rightWrist.x;
        rwy = r[0].pose.rightWrist.y;
        console.log(rwx,rwy)

        lwx = r[0].pose.leftWrist.x;
        lwy = r[0].pose.leftWrist.y;
        console.log(rwx,rwy)
    }
}
function draw(){
    image(capture,0,0,640,480);
    if(srw > 0.2){
        circle(rwx,rwy,20);
        document.getElementById("speed").innerHTML = "Speed: "+(rwy/200).toFixed(1)+"x";
        song.rate(rwy/200);
    }
    if(slw > 0.2){
        circle(lwx,lwy,20);
        document.getElementById("volume").innerHTML = "Speed: "+(rwy/200).toFixed(1)+"x";
        song.rate(lwy/500);
    }
}
