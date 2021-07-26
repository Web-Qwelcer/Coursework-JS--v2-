const menu_button = document.querySelector('.menu_button');

const menu_button_span_1 = document.querySelector('.header > .menu_button > span:nth-child(1)');
const menu_button_span_2 = document.querySelector('.header > .menu_button > span:nth-child(2)');
const menu_button_span_3 = document.querySelector('.header > .menu_button > span:nth-child(3)');

const nav = document.querySelector('.nav');

menu_button.addEventListener('click', () => {
    menu_button_span_1.classList.toggle('menu_button_span_1');
    menu_button_span_2.classList.toggle('menu_button_span_2');
    menu_button_span_3.classList.toggle('menu_button_span_3');
    
    nav.classList.toggle('active');
})

// section 1, 2

const btn_more = document.querySelectorAll('.btn_more');

for (let i = 0; i < btn_more.length; i++) {
    btn_more[i].addEventListener('mouseenter', () => {
        btn_more[i].classList.add('btn_more_hover');
    })
    btn_more[i].addEventListener('mouseleave', () => {
        btn_more[i].classList.remove('btn_more_hover');
    })
}

// section 3

const button_prev_next = document.querySelectorAll('.button_prev_next');

for (let i = 0; i < button_prev_next.length; i++) {
    button_prev_next[i].addEventListener('mouseenter', () => {
        button_prev_next[i].classList.add('button_prev_next_hover');
    })
    button_prev_next[i].addEventListener('mouseleave', () => {
        button_prev_next[i].classList.remove('button_prev_next_hover');
    })
}

const link = document.querySelectorAll('.link');

for (let i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseenter', () => {
        link[i].classList.add('link_hover');
    })
    link[i].addEventListener('mouseleave', () => {
        link[i].classList.remove('link_hover');
    })
}

//

const backgrounds = document.querySelectorAll('.list_item');
const backgroundsCount = backgrounds.length;
let currentBackground = 1;

function setBackground(number) {
    currentBackground = number;
    
    backgrounds.forEach(element => {
        element.classList.remove('active');

        if (element.classList.contains(`item_${number}`)) {
            element.classList.add('active');
        }
    })
}

document.querySelectorAll('.link').forEach(element => {
    element.addEventListener('click', () => {
        const item_number = element.dataset.item;
        setBackground(item_number);
    })
}) 

button_prev_next.forEach(element => {
    element.addEventListener("click", () => {
        let backgroundNumber = currentBackground;

        if (element.classList.contains(`prev`)) {
            backgroundNumber = --backgroundNumber ? backgroundNumber : backgroundsCount;
        }
        else {
            backgroundNumber = ++backgroundNumber > backgroundsCount ? 1 : backgroundNumber;
        }

        setBackground(backgroundNumber);
    })
})

// section 4

// footer

const btn_pearlabyss = document.querySelector('.btn_pearlabyss');
const sitemap_country = document.querySelector('.sitemap_country');

btn_pearlabyss.addEventListener('mouseenter', () => {
    btn_pearlabyss.classList.add('btn_pearlabyss_hover');
})
btn_pearlabyss.addEventListener('mouseleave', () => {
    btn_pearlabyss.classList.remove('btn_pearlabyss_hover');
})

btn_pearlabyss.addEventListener('click', () => {
    sitemap_country.classList.toggle('active');
})

// scroll

const scroll_button = document.querySelector('.scroll_button');
const scroll_up = document.querySelector('section[name="top"]');

scroll_button.addEventListener('click', () => {
    scroll_up.scrollIntoView({behavior: 'smooth'});
})

window.addEventListener('scroll', () => {
    let scrollWin = window.scrollY;

    if (scrollWin > 90) {
        scroll_button.classList.add('active');
    }
    else {
        scroll_button.classList.remove('active');
    }
})

//

async function downloadImage(imageSrc, imageName) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageName;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

function createVideoPreview(url, bImage, fileName) {
    const container = document.createElement(`div`);
    container.classList.add('video_preview');

    const wrap = document.createElement(`div`);
    wrap.classList.add('preview_wrap');

    const preview_header = document.createElement(`div`);
    preview_header.classList.add('preview_header');

    // const download = document.createElement(`span`);
    // download.classList.add('download');

    // download.addEventListener('click', () => {
    //     downloadImage(url, fileName);
    // })

    const close = document.createElement(`span`);
    close.classList.add('close');
    
    close.append(document.createElement('span'), document.createElement('span'));

    const main = document.createElement(`div`);
    main.classList.add('main');

    const nav = document.createElement(`div`);
    nav.classList.add('nav');

    // header.append(download, close);

    preview_header.append(close);

    wrap.append(preview_header, main, nav);

    container.append(wrap);

    const iframe = document.createElement('iframe');

    iframe.setAttribute("width", "100%");

    iframe.setAttribute("height", "100%");

    iframe.setAttribute("frameborder", "0");

    iframe.setAttribute("scrolling", "no");

    if (bImage) {
        iframe.style.backgroundImage = `url(${url})`;
        iframe.style.backgroundRepeat = "no-repeat";
        iframe.style.backgroundSize = `cover`;
    } else {
        iframe.setAttribute("src", url);
    }

    main.append(iframe);
    

    close.addEventListener('click', () => {
        container.remove();
    });

    document.body.append(container);
}

document.querySelectorAll('.media').forEach(element => {
    element.addEventListener('click', () => {
        createVideoPreview(element.dataset.url, element.classList.contains('image'), element.dataset.download);
    })
})
