function back_to_top_button_push() {
    document.documentElement.scroll({ top: 0, behavior: "smooth" });

}

window.onscroll = function () {

    if (window.pageYOffset >= 500) {
        console.log("toggle it visible", window.pageOffset);
        document.getElementById('scroll-to-top').style.visibility = "visible"
    } else {
        console.log("toggle it hidden");
        document.getElementById('scroll-to-top').style.visibility = "hidden";
    }
};

