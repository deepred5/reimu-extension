
var currentPosition = 0;
var timer = null;

function getTop(index) {
	var day = document.querySelector('[weekday="' + index + '"]');
	var distance = day.offsetTop;
	day = day.offsetParent;

	while(day) {
		distance += day.offsetTop;
		day = day.offsetParent;
	}

	return distance;
}

function runToTop(distance) {

	//周六的distance大于scrollTop的最大值，为避免定时器无法清除，限制distance最大值
	distance = distance > 1900 ? 1900 : distance;
	currentPosition = document.body.scrollTop;
	currentPosition += 15;

	if (currentPosition >= distance) {
		currentPosition = distance;
		clearInterval(timer);
	} 

	document.body.scrollTop = currentPosition;

}

if (document.querySelector('[weekday]')) {
	timer = setInterval(function() {
		runToTop(getTop(new Date().getDay()));
	}, 1);
}
