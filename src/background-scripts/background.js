import util from '../util/util';

class BackgroundHelper {
    constructor() {
        this.init();
    }

    goReimu() {
        window.open('https://blog.reimu.net');
    }

    setMagnet(info, tab) {
        const magent = `magnet:?xt=urn:btih:${info.selectionText.toString().trim()}`
        util.clipboard(magent);
    }

    setBaiduPan(info, tab) {
        // 把selectionText自带的/s去掉
        // 把selectionText开头的/去掉
        // example: /s/abc  s/abc  /abc   =>  abc
        const magent = `https://pan.baidu.com/s/${info.selectionText.toString().trim().replace(/(\/?)s\//ig, '').replace(/^\//ig, '')}`
        util.clipboard(magent);
    }

    pixiv(type, info) {
        let url = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id';
        if (type === 'member') {
            url = 'https://www.pixiv.net/member.php?id';
        }

        window.open(`${url}=${info.selectionText.toString().trim()}`);
    }

    createMenu(config) {
        config.forEach((menu) => {
            const children = menu.children;
            delete menu.children;
            chrome.contextMenus.create(menu);
            if (children) {
                this.createMenu(children)
            }
        });
    }

    init() {

        this.createMenu([
            {
                type: 'normal',
                title: '前往灵梦御所',
                id: 'a',
                onclick: this.goReimu,
            },
            {
                type: 'normal',
                title: '老司机的工具箱',
                id: 'b',
                contexts: ['selection'],
                children: [
                    {
                        type: 'normal',
                        title: '补全百度网盘',
                        id: 'c',
                        parentId: 'b',
                        contexts: ['selection'],
                        onclick: this.setBaiduPan
                    },
                    {
                        type: 'normal',
                        title: '补全磁力链接',
                        id: 'd',
                        parentId: 'b',
                        contexts: ['selection'],
                        onclick: this.setMagnet
                    },
                    {
                        type: 'normal',
                        title: 'pixiv-作品ID',
                        id: 'e',
                        parentId: 'b',
                        contexts: ['selection'],
                        onclick: (info, tab) => this.pixiv('work', info)
                    },
                    {
                        type: 'normal',
                        title: 'pixiv-画师ID',
                        id: 'f',
                        parentId: 'b',
                        contexts: ['selection'],
                        onclick: (info, tab) => this.pixiv('member', info)
                    }

                ]
            }
        ])

    }
}

const backgroundHelper = new BackgroundHelper();