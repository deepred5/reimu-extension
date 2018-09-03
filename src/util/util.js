export default {
    clipboard(value) {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', value);
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
        }
        document.body.removeChild(input);
    },


    ajax(config) {
        return new Promise(function (resolve, reject) {
            const req = new XMLHttpRequest();
            req.open(config.method, config.url, true);
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(new Error(req.statusText));
            };
            req.send();
        });
    }
}