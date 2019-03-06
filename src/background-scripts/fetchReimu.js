import util from '../util/util';
import cheerio from 'cheerio';
import '@babel/polyfill';

class FetchReimuHelper {
  constructor() {
    this.URL = 'https://blog.reimu.net/feed';
    this.lastTitle = '';
    this.init();
  }

  init() {
    this.updateIcon();
    // 十分钟查一次最新文章
    setInterval(() => this.updateIcon(), 60 * 1000 * 10);
  }

  async updateIcon() {
    await this.fetchData();
    this.showMessageIcon();
  }

  async fetchData() {
    const content = await util.ajax({
      url: this.URL,
      method: 'POST'
    });
    const $ = cheerio.load(content, { 'xmlMode': true });

    const title = $('item').eq(0).find('title').text();

    if (title) {
      this.lastTitle = title;
    }
  }

  showMessageIcon() {
    const lastTitle = this.lastTitle;
    if (!lastTitle) {
      return;
    }
    chrome.storage.sync.get(['lastTitle'], function (result) {
      // 第一次初始化或有最新文章
      if (!result.lastTitle || (result.lastTitle !== lastTitle)) {
        // 显示带有红点的icon
        // browserAction.setIcon使用的图片需要小于128*128，否则报错
        chrome.storage.sync.set({ 'lastTitle': lastTitle }, () => {
          chrome.browserAction.setIcon({
            path: '/message.png'
          });
        });
      }

    });
  }
}

const fetchReimuHelper = new FetchReimuHelper();