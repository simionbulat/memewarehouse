function voting(direction) {
    var postId = $(this).data("id");
    $.ajax({
        type: "PUT",
        url: "vote/" + postId + "/" + direction,
        success: function (data) {
            console.log("voted up!");
        },
        error: function (err) {
            console.log(err.messsage);
        }
    });
}


$(document).ready(function () {
    $(".vote-up").submit(function (e) {
        e.preventDefault();
        voting("vote-up");
    });

    $(".vote-down").submit(function (e) {
        e.preventDefault();
        voting('vote-down');
    });

});

