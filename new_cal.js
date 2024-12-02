let wrapper = document.querySelector('.calendar');
let today = new Date();
let daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let spac_value = 90;
let prev_butn = document.querySelector(".prev-cal-button");
let next_butn = document.querySelector(".next-cal-button");

function formatDate(date) {
    return date.getDate().toString().padStart(2, '0');
}

function createWeek() {
    let existingWrapper = document.querySelector('.items-wrapper');
    if (existingWrapper) {
        existingWrapper.remove();
    }

    let itemsWrapper = document.createElement('div');
    itemsWrapper.classList.add('items-wrapper');

    for (let i = -10; i <= 10; i++) {
        let itemDate = new Date(today);
        itemDate.setDate(today.getDate() + i);

        let item = document.createElement('div');
        item.classList.add('item');

        if (i === 0) {
            item.classList.add('current');
        }

        let dateSpan = document.createElement('span');
        dateSpan.classList.add('date');
        dateSpan.textContent = formatDate(itemDate); 

        let daySpan = document.createElement('span');
        daySpan.classList.add('day');
        daySpan.textContent = daysOfWeek[itemDate.getDay()];

        item.appendChild(dateSpan);
        item.appendChild(daySpan);
        itemsWrapper.appendChild(item);
    }

    wrapper.appendChild(itemsWrapper);

    loadshow();
}


function loadshow() {
    let items = document.querySelectorAll(".items-wrapper .item");
    let active = Array.from(items).findIndex(item => item.classList.contains('current'));

    let stt = 0;

    items[active].style.transform = `translateX(0) scale(1) perspective(10px)`;

    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${spac_value * stt}%) scale(${1 - 0.09 * stt})`;
    }

    stt = 0;

    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-spac_value * stt}%) scale(${1 - 0.09 * stt})`;
    }
}
createWeek();


function togglePrev_item(){
    let currentItem = wrapper.querySelector(".current");
    let prevItem = currentItem.previousElementSibling;
    currentItem.classList.remove("current");
    prevItem.classList.add("current");
    loadshow();
    today.setDate(today.getDate() - 1);
    setTimeout(() => {createWeek()}, 7000);
    smoothScroll();
}

function toggleNext_item(){
    let currentItem = wrapper.querySelector(".current");
    let prevItem = currentItem.nextElementSibling;
    currentItem.classList.remove("current");
    prevItem.classList.add("current");
    loadshow();
    today.setDate(today.getDate() + 1);
    setTimeout(() => {createWeek()}, 7000);
    smoothScroll();
}

function smoothScroll() {
    const currentItem = wrapper.querySelector(".current");
    currentItem.scrollIntoView({ behavior: "smooth", block: "center" });
}

prev_butn.removeEventListener("click", togglePrev_item);
prev_butn.addEventListener("click", togglePrev_item);

next_butn.removeEventListener("click", toggleNext_item);
next_butn.addEventListener("click", toggleNext_item);


