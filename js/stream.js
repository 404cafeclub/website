document.addEventListener("DOMContentLoaded", () => {
    //Get window theme and query DOM elements to set variables
    const themePreference = window.matchMedia("(prefers-color-scheme: dark)");
    const toggleTheaterBtn = document.querySelector("#theater-toggle");
    const toggleStreamBtn = document.querySelector("#stream-toggle");
    const streamBtnText = document.querySelector(".dstitle");
    const streamBtnImage = document.querySelector(".dsicon");
    const streamContainer = document.querySelector(".stream-container");
    const mainContainer = document.querySelector(".container");
    const video = document.querySelector("#video");
    const chat = document.querySelector("#chat");

    //Set variables for twitch embed parameters
    //const channel = "erwinsky"; /*testing*/
    const channel = "kkcyber";
    //const parent = "localhost&parent=127.0.0.1"; /*for testing purposes*/
    const parent = "kkcyber.neocities.org";

    //Toggles class on main container for theater mode styling
    function toggleTheaterMode() {
        mainContainer.classList.toggle("theater-mode");

        if (mainContainer.classList.contains("theater-mode")) {
            toggleTheaterBtn.textContent = "Exit Theater Mode";
        } else {
            toggleTheaterBtn.textContent = "Theater Mode";
        }
    }

    //Toggles source for video iframe
    function toggleStreamSelect() {
        var streamSource = "stream.kkcyber.io/embed/video";
        var streamText = "Watch<br>Twitch Livestream";
        var streamImgSrc = "../images/ds/twitch.png";

        streamContainer.classList.toggle("twitch");

        if (streamContainer.classList.contains("twitch")) {
            streamSource = `player.twitch.tv/?channel=${channel}&parent=${parent}&muted=true`;
            streamText = "Watch<br>Owncast Livestream";
            streamImgSrc = "../images/ds/owncast.png";
        }

        streamBtnText.innerHTML = streamText;
        streamBtnImage.setAttribute("src", streamImgSrc);
        video.setAttribute("src", `https://${streamSource}`);
    }

    //Toggles chat theme depending on window theme
    function toggleChatTheme(theme) {
        chat.setAttribute(
            "src",
            `https://www.twitch.tv/embed/${channel}/chat?${theme === "dark" ? "darkpopout&" : ""}parent=${parent}`
        );
    }

    //Add events for interactable theater mode and stream select buttons
    toggleTheaterBtn.addEventListener("click", () => {
        toggleTheaterMode()
    });
    toggleStreamBtn.addEventListener("click", () => {
        toggleStreamSelect()
    });
    //Add event to watch window state for theme changes
    themePreference.addEventListener('change', (e) => {
        toggleChatTheme(e.matches ? "dark" : "light")
    });
    //Intial call for setting chat theme on page load
    toggleChatTheme(themePreference.matches ? "dark" : "light");
});