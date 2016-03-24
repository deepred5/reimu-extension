chrome.contextMenus.create({
    type: 'normal',
    title: '下载B站视频',
    id: 'a',
    onclick: download,
    documentUrlPatterns: ["*://www.bilibili.com/video/av*"]
});

function download(info, tab) {
	var url = info.pageUrl;
	window.open('http://www.bilibilijj.com/video/av' + parseInt(url.slice(url.search(/av/) + 2)));
}


chrome.contextMenus.create({
    type: 'normal',
    title: '老司机的工具箱',
    id: 'b',
    contexts: ['selection']
});



chrome.contextMenus.create({
    type: 'normal',
    title: '百度网盘地址',
    id: 'd',
    parentId:'b',
    contexts: ['selection'],
    onclick: setUrl
});

chrome.contextMenus.create({
    type: 'normal',
    title: '百度网盘密码',
    id: 'c',
    parentId:'b',
    contexts: ['selection'],
    onclick: setPassword
});

chrome.contextMenus.create({
    type: 'normal',
    title: '磁力链接',
    id: 'e',
    parentId:'b',
    contexts: ['selection'],
    onclick: setMagnet
});

chrome.contextMenus.create({
    type: 'normal',
    title: '设置密码为8酱',
    id: 'g',
    parentId:'b',
    contexts: ['selection'],
    onclick: set8
});

chrome.contextMenus.create({
    type: 'normal',
    title: '清空默认密码',
    id: 'h',
    parentId:'b',
    contexts: ['selection'],
    onclick: empty
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'pixiv-作品ID',
    id: 'i',
    parentId:'b',
    contexts: ['selection'],
    onclick: workId
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'pixiv-画师ID',
    id: 'j',
    parentId:'b',
    contexts: ['selection'],
    onclick: memberId
});

chrome.contextMenus.create({
    type: 'normal',
    title: '前往百度网盘',
    id: 'f',
    onclick: go
});

function examId(id, url) {
    if (isNaN(Number(id))) {
        alert('请写纯数字ID');
    } else if (id.length > 0) {
        window.open(url + id);
    } else {
        alert('什么也没选中');
    }
}

function workId(info, tab) {
    var url = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=';
    var id = info.selectionText.toString().trim();
    examId(id, url);
}

function memberId(info, tab) {
    var url = 'http://www.pixiv.net/member.php?id=';
    var id = info.selectionText.toString().trim();
    examId(id, url);
}

function set8(info, tab) {
	chrome.storage.local.set({'finalPassword': '8酱'});
}

function empty(info, tab) {
	chrome.storage.local.set({'finalPassword': ''});
}

function setMagnet(info, tab) {
	if (info.selectionText.length === 0) {
		alert('什么也没选中')
	} else {
		var magent = 'magnet:?xt=urn:btih:' + info.selectionText.toString().trim();
		prompt('补全磁力链接', magent);
	}
	
}

function setPassword(info, tab) {
	var pw = info.selectionText.toString().trim();
	if (pw.length === 0) {
		alert('什么也没选中');
	} else {
		chrome.storage.local.set({'finalPassword': pw});
	}
}

function setUrl(info, tab) {
	var URL = info.selectionText.toString().trim();

	if (URL.length === 0) {
		alert('什么也没选中');
	} else if(URL.indexOf('/') === -1) {
		chrome.storage.local.set({'url': URL});
	} else {
		chrome.storage.local.set({'url': URL.slice(URL.lastIndexOf('/') + 1)});
	}
}

function go(info, tab) {
	chrome.storage.local.get('url', function (result) {
		if (result.url.length === 0) {
			alert('没有可用的百度网盘地址');
		} else {
			var url = 'http://pan.baidu.com/s/' + result.url;
			window.open(url);
			chrome.storage.local.set({'url': ''});
		}
	});
}

