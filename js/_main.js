
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


function getExif(imageId) {
    alert("GetExif ImageId " + imageId);
    var img1 = document.getElementById(imageId);
    var myMap = new Map();
    alert("Actual ImageID: " + img1.id);
    EXIF.getData(img1, function() {
        alert("Inside of Method");
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

function showExifHome(divId, imageId){
    alert(divId);
    var bgDiv = $("#slide4Div").css("background-image");
    res = bgDiv.substring(4, bgDiv.length -1);
    $("#hiddenImage").attr("src",res);
    //var output = document.getElementById('hiddenImage');
    //output.src = res;

    alert("Image: " + bgDiv);
    alert("Result: " + res);
    alert("Attribute: " + $("#hiddenImage").attr("src"));

    var exifMap = getExif("hiddenImage");
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

    alert(exifMap.get("Make"));

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