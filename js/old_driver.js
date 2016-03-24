var oClear = document.getElementById('clear'),
	oText = document.getElementById('text'),
	aChoices = document.getElementById('choices').getElementsByTagName('input'),
	oSelect = document.getElementById('option'),
	aBtn = document.getElementsByTagName('button'),
	aExtra = document.getElementsByTagName('a'),
	localPassword = [],
	password = '',
	option = '',
	arrUrl = ['http://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
			  'http://www.pixiv.net/member.php?id='];
	
oText.placeholder = (localStorage.user || '') + '老司机好。。。';


chrome.tabs.getSelected(null, function(tab) { 
    	var url = tab.url;
    	if (url.indexOf('www.hacg.li') != -1 || url.indexOf('blog.reimu.net') != -1) {
    		chrome.storage.local.set({'finalPassword': '8酱'});
    	} else {
    		chrome.storage.local.set({'finalPassword': ''});
    	}
    	
});



if (!localStorage.initialise) {
		chrome.storage.local.set({'localPassword': ['8酱', '扶她奶茶']});
		localStorage.initialise = true;
}


function updateSelect() {
	chrome.storage.local.get('localPassword', function (result) {
	        localPassword = result.localPassword;
	        option = '';
	        for (var i=0; i<localPassword.length; i++) {
	        	option += '<option>' + localPassword[i] + '</option>';
	        }
	        oSelect.innerHTML = option;
	        oSelect.value = '';
	}); 
}


updateSelect();

oSelect.onchange = function() {
	if (this.value !== '') {
		password = this.value;
		chrome.storage.local.set({'finalPassword': password});
		aChoices[2].value = this.value;
	}
};

oClear.onclick = function() {
	oText.value = '';
};

aChoices[0].onclick = function() {


	if (password.length > 0) {
		chrome.storage.local.set({'finalPassword': password});
	}
 
	var message = oText.value.trim();

	
	if (message.length === 0) {
		oText.value = '什么也没写...';
	} else if(message.indexOf('/') === -1) {
		window.open('http://pan.baidu.com/s/' + message);
	} else {
		window.open('http://pan.baidu.com/s/' + message.slice(message.lastIndexOf('/') + 1));
	}
};


aChoices[1].onclick = function() {
	var message = oText.value.trim();
	if (message.length === 0) {
		oText.value = '什么也没写...';
	} else {
		oText.value = 'magnet:?xt=urn:btih:' + message;
	}
};

aChoices[2].onblur = function() {
	password = this.value.trim();
	chrome.storage.local.set({'finalPassword': password});

};

aBtn[0].onclick = function() {
	var newPassword = aChoices[3].value.trim();
	if (newPassword == '') {
		aChoices[3].value = '什么都没写';
	} else if (localPassword.indexOf(newPassword) != -1) {
		aChoices[3].value = '该密码已经存在了';
	} else {
		localPassword.push(newPassword);
		chrome.storage.local.set({'localPassword': localPassword});
		aChoices[3].value = '更新成功!';
		updateSelect();
	}
};

aBtn[1].onclick = function() {
	var deletePassword = aChoices[3].value.trim();
	if (deletePassword == '') {
		aChoices[3].value = '什么都没写';
	} else if (localPassword.indexOf(deletePassword) == -1) {
	 	aChoices[3].value = '并没有保存该密码'	
	} else {
		localPassword.splice(localPassword.indexOf(deletePassword), 1);
		chrome.storage.local.set({'localPassword': localPassword});
		aChoices[3].value = '删除成功!';
		updateSelect();
	}
}

for (var i=0; i<aExtra.length-1; i++) {
	aExtra[i].index = i;
	aExtra[i].onclick = function() {
		var id = oText.value.trim();
		if (isNaN(Number(id))) {
			oText.value = '请写纯数字ID';
		} else if (id.length > 0) {
			window.open(arrUrl[this.index] + id);
		} else {
			oText.value = '请写ID';
		}
	}
}

aExtra[2].onclick = function() {
	localStorage.removeItem('initialise');
	chrome.storage.local.set({'localPassword': ['8酱', '扶她奶茶']});
	chrome.storage.local.set({'finalPassword': ''});
	updateSelect();
}


