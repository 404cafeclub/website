document.addEventListener("DOMContentLoaded", () => {
    //Get window theme and query DOM elements to set variables
    const themePreference = window.matchMedia("(prefers-color-scheme: dark)");
    const toggleNavBtn = document.querySelector("#nav-toggle");
    const toggleBigTheaterBtn = document.querySelector("#big-theater-toggle");    
    const toggleChatBtn = document.querySelector("#chat-toggle");    
    const toggleStreamBtn = document.querySelector("#stream-toggle");

    const mainContainer = document.querySelector("body");
    const navContainer = document.querySelector(".nav");
    const chatContainer = document.querySelector(".chat-container");
    const popoutChatBtn = document.querySelector("#popout-chat-link");

    const video = document.querySelector("#video");
    const chat = document.querySelector("#chat");

    //Set variables for twitch embed parameters
    //const channel = "erwinsky"; /*testing*/
    const channel = "kkcyber";
    //const parent = "localhost&parent=127.0.0.1"; /*for testing purposes*/
    const parent = "kkcyber.neocities.org";

    function toggleNavVisible() {
        const navCompressSvg = document.querySelector("#nav-compress");
        const navExpandSvg = document.querySelector("#nav-expand");
        const dsBtnContainer = document.querySelector(".dsButton-ContainerOuter");
        const isNavHidden = navContainer.classList.contains("hide");
        const isBigTheater = mainContainer.classList.contains("big-theater-mode");

        if (isBigTheater || !isNavHidden) {
            navContainer.classList.add("hide");
            navCompressSvg.classList.add("hide");
            navExpandSvg.classList.remove("hide");
            dsBtnContainer.classList.add("hide");
        } else {
            navContainer.classList.remove("hide");
            navCompressSvg.classList.remove("hide");
            navExpandSvg.classList.add("hide");
            dsBtnContainer.classList.remove("hide");
        }
    }

    // Toggles class on main container for big theater mode styling
    function toggleBigTheaterMode() {
        const streamCompressSvg = document.querySelector("#stream-compress");
        const streamExpandSvg = document.querySelector("#stream-expand");
        mainContainer.classList.toggle("big-theater-mode");
        streamExpandSvg.classList.toggle("hide");
        streamCompressSvg.classList.toggle("hide");
        toggleNavVisible();
        toggleNavBtn.toggleAttribute("disabled");
    }

    function toggleChatVisible() { 
        const chatCompressSvg = document.querySelector("#chat-compress");
        const chatExpandSvg = document.querySelector("#chat-expand");
        chatContainer.classList.toggle("hide");
        chatExpandSvg.classList.toggle("hide");
        chatCompressSvg.classList.toggle("hide");
    }

    //Toggles source for video iframe
    function toggleStreamSelect() {
        const streamContainer = document.querySelector(".stream-container");
        const streamBtnText = document.querySelector("#stream-toggle .dstitle");
        const streamBtnImage = document.querySelector("#stream-toggle .dsicon");
        const isTwitch = streamContainer.classList.toggle("twitch");
        video.setAttribute(
            "src",
            `https://${isTwitch ? `player.twitch.tv/?channel=${channel}&parent=${parent}&muted=true` : "stream.kkcyber.io/embed/video"}`
        );
        streamBtnText.innerHTML = isTwitch ? "Watch<br>Owncast Livestream" : "Watch<br>Twitch Livestream";
        streamBtnImage.setAttribute("src", isTwitch ? "../images/ds/owncast.png" : "../images/ds/twitch.png");
    }

    //Toggles chat theme depending on window theme
    function toggleChatTheme(theme) {
        chat.setAttribute(
            "src",
            `https://www.twitch.tv/embed/${channel}/chat?${theme === "dark" ? "darkpopout&" : ""}parent=${parent}`
        );
    }

    //Unused, found out the CSS property aspect ratio exists
    function adjustVideoHeight() {
        var width = video.offsetWidth;
        if (width >= 1408) {
            height = 792;
        } else {
            height = (width * 9) / 16;
        }
        video.style.height = `${height}px`;
    }

    //Adjust chat height to fit inside the screen when in big theater mode and on smaller viewports
    function adjustChatHeight() {
        const theaterChat = document.querySelector('.big-theater-mode #chat');  
        const headerHeight = document.querySelector('.big-theater-mode .header')?.offsetHeight || 0;
        const videoHeight = document.querySelector('.big-theater-mode .video-container')?.offsetHeight || 0;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
    
        // Calculate the remaining height for the chat container
        const chatHeight = viewportHeight - headerHeight - videoHeight - 34;
    
        // Apply the calculated height to the chat container      
        if (theaterChat) {
            if (viewportWidth <= 784) {
                theaterChat.style.height = `${chatHeight}px`;
            } else if (viewportWidth > 784) {
                theaterChat.style.height = "827px";
            }
        } else {
            chat.style.height = "550px"
        }
    }

    function popoutChat(event) {
        event.preventDefault(); // Prevent the default link behavior

        const url = popoutChatBtn.href;
        const windowFeatures = "width=400,height=600,scrollbars=yes,resizable=yes";

        // Open the link in a new window with specified dimensions
        window.open(url, "PopoutChat", windowFeatures);
    }

    // Put both resize functions together to save a few lines of code
    function resizeChatAndVideo() {
        adjustChatHeight();
        //adjustVideoHeight();
    }

    // Adjust chat and video height on page load and window resize
    resizeChatAndVideo();
    window.addEventListener('resize', () => {
        resizeChatAndVideo();
    });

    // Attach functions to various buttons on the page
    popoutChatBtn.addEventListener("click", (e) => {
        popoutChat(e);
    });
    toggleNavBtn.addEventListener("click", () => {
        toggleNavVisible();
        resizeChatAndVideo();
    });
    toggleBigTheaterBtn.addEventListener("click", () => {
        toggleBigTheaterMode()
        resizeChatAndVideo();
    });
    toggleChatBtn.addEventListener("click", () => {
        toggleChatVisible();
        resizeChatAndVideo();
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