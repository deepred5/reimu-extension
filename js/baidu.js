var oBtn = document.getElementById('submitBtn');
var oText = document.getElementById('accessCode');

chrome.storage.local.get('finalPassword', function (result) {
	if (result.finalPassword.length > 0 && oBtn && oText) {
		oText.value = result.finalPassword;
		oBtn.click();
	}
}); 

