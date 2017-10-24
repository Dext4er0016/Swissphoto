
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

window.onload=getExif;

function getExif() {
	alert("Start EXIF")
    var img1 = document.getElementById("hiddenImage");
    EXIF.getData(img1, function() {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        var dateTime = EXIF.getTag(this, "Flash");
        var makeAndModel = document.getElementById("makeAndModel");
        makeAndModel.innerHTML = `${make} ${model}`;
        alert(`${make} ${dateTime}`);
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
