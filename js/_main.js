
( function( $ ) {
	$window = $(window);
	$slide = $('.homeSlide');
	$body = $('body');
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      adjustWindow();
			  $body.removeClass('loading').addClass('loaded');

		}, 800);
	});

	function adjustWindow(){
		var s = skrollr.init({
		    forceHeight: false
		});
	    winH = $window.height();
	    if(winH <= 550) {
			winH = 550;
		}
	    $slide.height(winH);
	    s.refresh($('.homeSlide'));
	}
} )( jQuery );


$(window).ready(function() {
    sessionStorage.SessionName = "SessionData";
    var firstCall = sessionStorage.getItem("firstCall");
    console.log(firstCall);
    if(firstCall != "isFirstCall"){
        $('#myModal').modal('show');
        sessionStorage.setItem("firstCall","isFirstCall");
    }
});

function getExif(imageId) {
    var img1 = document.getElementById(imageId);
    var myMap = new Map();
    EXIF.getData(img1, function() {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        var exposure = EXIF.getTag(this, "ExposureTime");
        var fNumber = EXIF.getTag(this, "FNumber");
        var isoSpeed = EXIF.getTag(this, "ISOSpeedRatings");
        var flash = EXIF.getTag(this, "Flash");
        var description = EXIF.getTag(this, "ImageDescription");
        var orientation = EXIF.getTag(this, "Orientation");
        var software = EXIF.getTag(this, "Software");
        var date = EXIF.getTag(this, "DateTimeOriginal");
        var imageWidth = EXIF.getTag(this, "ImageWidth");
        var imageHeight = EXIF.getTag(this, "ImageHeight");
        var compression = EXIF.getTag(this, "Compression");

        if (!description.replace(/\s/g, '').length) {
            description="-";
        }

        myMap.set("Make", make);
        myMap.set("Model", model);
        myMap.set("ExposureTime", exposure);
        myMap.set("FNumber", fNumber);
        myMap.set("ISOSpeedRatings", isoSpeed);
        myMap.set("Flash", flash);
        myMap.set("ImageDescription", description);
        myMap.set("Orientation", orientation);
        myMap.set("Software", software);
        myMap.set("DateTimeOriginal", date);
        myMap.set("ImageWidth", imageWidth);
        myMap.set("ImageHeight", imageHeight);
        myMap.set("Compression", compression);

    });
    return myMap;
}

function showExifUpload(imageId){
    var exifMap = getExif(imageId);
    var makeElement = document.getElementById("make");
    var modelElement = document.getElementById("model");
    var exposureElement = document.getElementById("exposure");
    var fNumberElement = document.getElementById("fNumber");
    var isoSpeedElement = document.getElementById("isoSpeed");
    var flashElement = document.getElementById("flash");
    var descriptionElement = document.getElementById("description");
    var orientationElement = document.getElementById("orientation");
    var softwareElement = document.getElementById("software");
    var dateElement = document.getElementById("date");
    var imageWidthElement = document.getElementById("imageWidth");
    var imageHeightElement = document.getElementById("imageHeight");
    var compressionElement = document.getElementById("compression");
    var card = document.getElementById("exifCard1");
    var card2 = document.getElementById("exifCard2");

    card.style.display = "flex";
    card2.style.display = "flex";

    makeElement.innerHTML = exifMap.get("Make");
    modelElement.innerHTML = exifMap.get("Model");
    exposureElement.innerHTML = exifMap.get("ExposureTime");
    fNumberElement.innerHTML = exifMap.get("FNumber");
    isoSpeedElement.innerHTML = exifMap.get("ISOSpeedRatings");
    flashElement.innerHTML = exifMap.get("Flash");
    descriptionElement.innerHTML = exifMap.get("ImageDescription");;
    orientationElement.innerHTML = exifMap.get("Orientation");
    softwareElement.innerHTML = exifMap.get("Software");
    dateElement.innerHTML = exifMap.get("DateTimeOriginal");
    imageWidthElement.innerHTML = exifMap.get("ImageWidth");
    imageHeightElement.innerHTML = exifMap.get("ImageHeight");
    compressionElement.innerHTML = exifMap.get("Compression");

}


function uploadPicForExif(){
    $('#upload').click();
}

function readURLforExif(input)
{
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        var output = document.getElementById('hiddenImage');
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
    getExif("hiddenImage")
}




var imageLoader = document.getElementById('filePhoto');
if(imageLoader != null) {
    imageLoader.addEventListener('change', handleImage, false);
}

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = document.getElementById('hiddenImage');
        $('.uploader img').attr('src',event.target.result);
        $('.cameraImage').attr('src',event.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
}

function showExifHome(divId){
    var bgDiv = $("#slide4Div").css("background-image");
    res = divId.substring(5, divId.length);

    var cameraSettings = '{ "settings" : [' +
        '{"make":"Nikon", "model":"EOS 70d", "exposure":"0.5s", "fNumber":"22", "isoSpeed":"1600", "flash":"Did not fire", "description":"Herbsfotografie im Wald", "orientation":"landscape", "software":"Lightroom", "date":"05.11.2017", "imageWidth":"5472 px", "imageHeight":"3648 px", "compression":"-" },' +
        '{"make":"Nikon", "model":"EOS 70d", "exposure":"1/25s", "fNumber":"5.6", "isoSpeed":"1600", "flash":"Did not fire", "description":"Kaminfeuer", "orientation":"landscape", "software":"Lightroom", "date":"05.11.2017", "imageWidth":"5472 px", "imageHeight":"3648 px", "compression":"-" },' +
        '{"make":"Nikon", "model":"EOS 70d", "exposure":"1/8.0s", "fNumber":"5.6", "isoSpeed":"1600", "flash":"Did not fire", "description":"Regentropfen auf Fensterscheibe", "orientation":"landscape", "software":"Lightroom", "date":"05.11.2017", "imageWidth":"5472 px", "imageHeight":"3648 px", "compression":"-" },' +
        '{"make":"Nikon", "model":"EOS 70d", "exposure":"30.0s", "fNumber":"13", "isoSpeed":"1600", "flash":"Did not fire", "description":"Bach im Wald", "orientation":"landscape", "software":"Lightroom", "date":"05.11.2017", "imageWidth":"5472 px", "imageHeight":"3648 px", "compression":"-" } ]}';

    var obj = JSON.parse(cameraSettings);

    var makeElement = document.getElementById("makeMain");
    var modelElement = document.getElementById("modelMain");
    var exposureElement = document.getElementById("exposureMain");
    var fNumberElement = document.getElementById("fNumberMain");
    var isoSpeedElement = document.getElementById("isoSpeedMain");
    var flashElement = document.getElementById("flashMain");
    var descriptionElement = document.getElementById("descriptionMain");
    var orientationElement = document.getElementById("orientationMain");
    var softwareElement = document.getElementById("softwareMain");
    var dateElement = document.getElementById("dateMain");
    var imageWidthElement = document.getElementById("imageWidthMain");
    var imageHeightElement = document.getElementById("imageHeightMain");
    var compressionElement = document.getElementById("compressionMain");

    makeElement.innerHTML = obj.settings[res-1].make;
    modelElement.innerHTML = obj.settings[res-1].model;
    exposureElement.innerHTML = obj.settings[res-1].exposure;
    fNumberElement.innerHTML = obj.settings[res-1].fNumber;
    isoSpeedElement.innerHTML = obj.settings[res-1].isoSpeed;
    flashElement.innerHTML = obj.settings[res-1].flash;
    descriptionElement.innerHTML = obj.settings[res-1].description;
    orientationElement.innerHTML = obj.settings[res-1].orientation;
    softwareElement.innerHTML = obj.settings[res-1].software;
    dateElement.innerHTML = obj.settings[res-1].date;
    imageWidthElement.innerHTML = obj.settings[res-1].imageWidth;
    imageHeightElement.innerHTML = obj.settings[res-1].imageHeight;
    compressionElement.innerHTML = obj.settings[res-1].compression;

    $('#exifModal').modal('show');


}



var volume = 0.7;
var counter = 0;
var audioForest = new Audio('sounds/forest.mp3');
var audioFire = new Audio('sounds/feuer.mp3');
var audioThunder = new Audio('sounds/thunder.mp3');
var audioBach = new Audio('sounds/bach.mp3');

audioForest.volume = volume;
audioThunder.volume = volume;
audioBach.volume = volume;

$(window).scroll(function() {
    var scrollPos = $(this).scrollTop();
    var firstTop = $('.slide1').offset().top;
    var secondTop = $('.slide2').offset().top;
    var thirdTop = $('.slide3').offset().top;
    var fourthTop = $('.slide4').offset().top;


    console.log("scrollPos: " + scrollPos);
    console.log("offsetTop: " + firstTop);

    //First Element
    if(scrollPos > firstTop && scrollPos < secondTop){
        if(counter == 0){
            audioForest.play();
            counter++;
            console.log("Counter: " + counter);
        }
        console.log("First");
    }
    else{
        console.log("AudioForest pause");
        audioForest.pause();
        counter = 0;
    }

    //Second Element
    if(scrollPos > secondTop && scrollPos < thirdTop){
        if(counter == 0){
            audioFire.play();
            counter++;
            console.log("Counter: " + counter);
        }
        console.log("Third");
    }
    else{
        console.log("CreekForest pause");
        audioFire.pause();
        counter = 0;
    }

    //Third Element
    if(scrollPos > thirdTop && scrollPos < fourthTop){
        if(counter == 0){
            audioThunder.play();
            counter++;
            console.log("Counter: " + counter);
        }
        console.log("Third");
    }
    else{
        console.log("CreekForest pause");
        audioThunder.pause();
        counter = 0;
    }

    //Fourth Element
    if(scrollPos + 10 > fourthTop){
        if(counter == 0){
            audioBach.play();
            counter++;
            console.log("Counter: " + counter);
        }
        console.log("Third");
    }
    else{
        console.log("CreekForest pause");
        audioBach.pause();
        counter = 0;
    }

});


var playHobbitSoundClicked = 0;
var audioHobbit = new Audio('sounds/hobbit.mp3');
function playHobbitSound() {
    if(playHobbitSoundClicked == 0){
        audioHobbit.play()
        playHobbitSoundClicked = 1;
        document.getElementById("playSoundButton").innerHTML = "Pause backround music";
    }
    else{
        audioHobbit.pause()
        playHobbitSoundClicked = 0;
        document.getElementById("playSoundButton").innerHTML = "Play backround music";

    }

}

function printSite() {
    window.print();
}


