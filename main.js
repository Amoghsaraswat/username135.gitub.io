img="";
status1="";
object=[];
function preload() {
    song=loadSound("babay.mp3");
}
function setup() {
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status :detecting objects ";
}
function draw() {
    image(video,0,0,300,300);
    if(status1!=""){
        objectDetector.detect(video,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for (i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="status :detected objects ";
            document.getElementById("numberofobject").innerHTML="objects detected are "+object.length;
fill(r,g,b);
percent=floor(object[i].confidence*100);
text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
noFill();
stroke(r,g,b);
rect(object[i].x,object[i].y,object[i].width,object[i].height)
if(object[i].label=='person'){
    song.stop();
    document.getElementById("numberofobject").innerHTML="baby found";
}
else{
    song.play();
    document.getElementById("numberofobject").innerHTML="baby not found";
}
        }
    }
}
function modelLoaded() {
    console.log("model Is Loaded");
    status1=true;
}
function gotResult(error,results) {
    if (error){
        console.error(error);
    }
    else{
        console.log(results)
object=results;
    }
}