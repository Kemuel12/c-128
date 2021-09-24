song=""
leftWristX=0
rightWristX=0
leftWristY=0
rightWristY=0
scoreLeftWrist=0

function preload()
{
    song= loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(500,500);
    canvas.center()
    video=createCapture(VIDEO);
    video.size(500,500);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("Posenet is Initialised");
}

function gotPoses(results)
{
  if (results.length>0)
  {
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist= "+ scoreLeftWrist);
    
    leftWristX= results[0].pose.leftWrist.x;
    rightWristX= results[0].pose.rightWrist.x;
    console.log("leftWristX = " + leftWristX +" leftWristY = " + leftWristY);
    

    leftWristY= results[0].pose.leftWrist.y;
    rightWristY= results[0].pose.leftWrist.y;
    console.log("rightWristY = " + rightWristY +" rightWristY = " + rightWristY);
  
  }
}
function draw()
{
    image(video,0,0,500,500);
    fill("#0099ff");
    stroke("#0099ff");

    circle(leftWristX,leftWristY,70);
    InNumberVolume=Number(leftWristY);
    remove_decimals=floor(InNumberVolume);
    volume=remove_decimals/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="Volume= "+volume;
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}