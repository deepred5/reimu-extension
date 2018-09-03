import util from '../util/util';

class ReimuHelper {
    constructor() {
        this.init();
    }

    init() {
        this.addAlertContainer();
        this.showDownload();
        this.observerDomChange();
    }

    showDownload() {
        const downloadDom = document.querySelector('pre');
        if (downloadDom) {
            downloadDom.classList.add('show-pre');

            const regTorrent = /magnet:\?xt=urn:btih:([a-zA-Z0-9_]+)/g;
            const regPassword = /提取码.*([a-zA-Z0-9_]{4})/;

            const content = downloadDom.innerText.trim();
            const torrentUrl = content.match(regTorrent) ? content.match(regTorrent)[0] : '';
            const password = content.match(regPassword) ? content.match(regPassword)[1] : '';

            if (torrentUrl) {
                const copyTorrent = document.createElement('span');
                copyTorrent.innerText = '复制磁力链接';
                copyTorrent.classList.add('copy-torrent');
                downloadDom.appendChild(copyTorrent);

                copyTorrent.addEventListener('click', () => {
                    util.clipboard(torrentUrl);
                    this.alert('复制磁力链接成功');
                });
            }

            if (password) {
                const copyPass = document.createElement('span');
                copyPass.innerText = '复制提取码';
                copyPass.classList.add('copy-password');
                downloadDom.appendChild(copyPass);

                copyPass.addEventListener('click', () => {
                    util.clipboard(password);
                    this.alert('复制提取码成功');
                    chrome.storage.local.set({ 'baiduPassword': password });

                });
            }

        }
    }

    addAlertContainer() {
        const alertList = document.createElement('div');
        alertList.classList.add('alert-list');
        document.body.appendChild(alertList);
    }

    alert(text) {
        const alertList = document.querySelector('.alert-list');

        if (alertList) {
            const alert = document.createElement('div');
            alert.classList.add('alert');
            alert.innerText = text;
            alertList.appendChild(alert);

            setTimeout(() => alertList.removeChild(alert), 2000);
        }
    }

    observerDomChange() {
        if (document.getElementById('main')) {
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

            const observer = new MutationObserver((mutations, observer) => {
                this.showDownload();
            })

            observer.observe(document.getElementById('main'), {
                childList: true
            });
        }

    }
}


const reimuHelper = new ReimuHelper();
