var oText = document.getElementById('text');
var aBtn = document.getElementById('choices').getElementsByTagName('input');


if (localStorage.user) {
	aBtn[0].value = '已经签订契约';
	oText.placeholder = localStorage.user + ', 你已经签订契约';
}

aBtn[0].onclick = function() {
	if (!localStorage.user) {
		if (oText.value.trim().length > 0) {
			localStorage.user = oText.value.trim();
			oText.value = localStorage.user +  ', 你已经签订契约';
			this.value = '已经签订契约';
		} else {
			oText.value = '你没名字吗？';
		}
	}
}

aBtn[1].onclick = function() {
	if (!localStorage.user) {
		oText.value = '汝还没签订契约！';
	} else {
		if (oText.value.trim().length > 0) {
			localStorage.user = oText.value.trim();
			oText.value = localStorage.user + ',契约名修改完毕';
		} else {
			oText.value = '你没名字吗？';
		}
	}
}

aBtn[2].onclick = function() {
	if (localStorage.user) {
		localStorage.removeItem('user');
		oText.value = '汝之姓名。。。';
		aBtn[0].value = '签订契约';
	} else {
		oText.value = '汝还没签订契约！';
	}

}