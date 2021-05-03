function back_to_top_button_push() {
    document.documentElement.scroll({ top: 0, behavior: "smooth" });

}

window.onscroll = function () {

    if (window.pageYOffset >= 500) {
        document.getElementById('scroll-to-top').style.visibility = "visible"
    } else {
        document.getElementById('scroll-to-top').style.visibility = "hidden";
    }
};

