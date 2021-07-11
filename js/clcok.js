const clock_h = document.querySelector("#container__clock__hour");
const clock_m = document.querySelector("#container__clock__minute");
const clock_s = document.querySelector("#container__clock__second");
const clock_ampm = document.querySelector("#container__clock__ampm");

function getClock() {
    let ampm = "AM";
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM";
    }
    clock_h.innerText = (hours < 10 ? `0${hours}` : `${hours}`);
    clock_m.innerText = (minutes < 10 ? `0${minutes}` : `${minutes}`);
    clock_s.innerText = (seconds < 10 ? `0${seconds}` : `${seconds}`);
    clock_ampm.innerText = ampm;
}

getClock();
setInterval(getClock, 1000);