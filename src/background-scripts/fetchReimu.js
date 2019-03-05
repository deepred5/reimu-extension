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
    chrome.storage.sync.get(['lastTitle'], function (result) {
      // 第一次初始化，还没有本地数据
      if (!result.lastTitle && lastTitle) {
        return chrome.storage.sync.set({ 'lastTitle': lastTitle });
      }

      if (result.lastTitle !== lastTitle) {
        // 有新文章，显示带有红点的icon
        chrome.browserAction.setIcon({
          path: '/message.png'
        });
        chrome.storage.sync.set({ 'lastTitle': lastTitle });
      }

    });
  }
}

const fetchReimuHelper = new FetchReimuHelper();