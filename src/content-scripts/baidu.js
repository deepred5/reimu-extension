class BaiduHelper {
    constructor() {
        this.btn = document.querySelector('.g-button');
        this.input = document.querySelector('input[type=text]');

        this.goDetailPage();
    }

    goDetailPage() {
        chrome.storage.local.get('baiduPassword', (result) => {
            if (result.baiduPassword && this.btn && this.input) {
                this.input.value = result.baiduPassword;
                this.btn.click();
                chrome.storage.local.set({'baiduPassword': ''});
            }
        }); 
    }
}

const baiduHelper = new BaiduHelper();