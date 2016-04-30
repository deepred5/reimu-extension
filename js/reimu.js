chrome.storage.local.set({'finalPassword': '8酱'});

var pre = document.getElementsByTagName('pre')[0];
if (pre && window.getComputedStyle(pre, null).display === 'none') {
	pre.style.display = 'block';
}

if (pre) {
	var pwd = getPwd(pre.innerText);
	if (pwd) {
		chrome.storage.local.set({'finalPassword': pwd});
	}
} else {
	var pwd = getPwd(document.body.innerText);
	if (pwd) {
		chrome.storage.local.set({'finalPassword': pwd});
	}
}

function getPwd(str) {
	var index1 = str.indexOf('提取码');
	var index2 = str.indexOf('\n', index1);
	if (index1 !== -1 && index2 !== -1) {
		return str.slice(index1 + 4, index2).trim();
	}
	return '';
}
