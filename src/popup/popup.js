import util from '../util/util';
import cheerio from 'cheerio';
import '@babel/polyfill';


class PopupHelper {
    constructor() {
        this.URL = 'https://blog.reimu.net/feed';
        this.container = document.querySelector('#reimu ul');
        this.data = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.render();
        this.addHandler();
        this.lazyLoad();
    }

    async fetchData() {
        const content = await util.ajax({
            url: this.URL,
            method: 'POST', // 防止缓存
        });
        // 开启xml模式，才能读取link标签
        const $ = cheerio.load(content, { 'xmlMode': true });
        const $2 = cheerio.load(content, { 'xmlMode': false });
        $('item').slice(0, 10).each((index, article) => {
            article = $(article);
            const title = article.find('title').text();
            const url = article.find('link').text();

            this.data.push({
                url,
                title
            })
        });

        $2('item').slice(0, 10).each((index, article) => {
            article = $(article);
            const img = article.find('img').attr('src');
            const description = article.find('description').text();
            this.data[index].img = img;
            this.data[index].description = description;
        });

    }

    renderTemplate(config) {

        const reg = /(继续阅读(\n|.)*)/g;

        config.description = config.description.replace(reg, '');


        const result =
            `<li class="article">
            <h4><a href=${config.url}>${config.title}</a></h4>
            <div class="content">
                <img src="./lazy.png" alt="reimu" data-src=${config.img}>
                <p>${config.description}</p>
            </div>
        </li>`;

        return result;
    }

    render() {
        let template = '';
        this.data.forEach((config) => {
            const result = this.renderTemplate(config);
            template += result;
        });

        this.container.innerHTML = template;
    }

    addHandler() {
        this.container.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.nodeName.toLowerCase() === 'a') {
                window.open(target.href);
            }
        })
    }

    lazyLoad() {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.src = item.target.dataset.src
                    intersectionObserver.unobserve(item.target)
                }
            })
          }, {
              root: this.container.parentNode,
              rootMargin: "150px 0px",
            });

        const imgs = document.querySelectorAll('[data-src]')
        imgs.forEach((item) => {
            intersectionObserver.observe(item)
        })
    }
    
}

const popupHelper = new PopupHelper();
    