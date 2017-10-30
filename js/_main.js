
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


function getExif() {
    var img1 = document.getElementById("hiddenImage");
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

        if (!description.replace(/\s/g, '').length) {
            description="-";
        }

        makeElement.innerHTML = make;
        modelElement.innerHTML = model;
        exposureElement.innerHTML = exposure;
        fNumberElement.innerHTML = fNumber;
        isoSpeedElement.innerHTML = isoSpeed;
        flashElement.innerHTML = flash;
        descriptionElement.innerHTML = description;
        orientationElement.innerHTML = orientation;
        softwareElement.innerHTML = software;
        dateElement.innerHTML = date;
        imageWidthElement.innerHTML = imageWidth;
        imageHeightElement.innerHTML = imageHeight;
        compressionElement.innerHTML = compression;

    });
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
    getExif()

}




var imageLoader = document.getElementById('filePhoto');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = document.getElementById('hiddenImage');
        $('.uploader img').attr('src',event.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
}