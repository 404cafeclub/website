window.addEventListener("message", (event) => {
    if (event.data.calendarHeight) {
        const calendarIframe = document.querySelector(".calendar");
        calendarIframe.style.height = `${event.data.calendarHeight}px`;
    }
});