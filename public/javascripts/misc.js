


$(document).ready(function () {
    $(".vote-up").submit(function (e) {
        e.preventDefault();
        var postId = $(this).data("id");
        console.log('pressed upVote');
        console.log(postId);
        $.ajax({
            type: "PUT",
            url: "vote/" + postId + "/vote-up",
            success: function (data) {
                console.log("voted up!");
            },
            error: function (err) {
                console.log(err.messsage);
            }
        });
    });

    $(".vote-down").submit(function (e) {
        e.preventDefault();
        var postId = $(this).data("id");
        console.log('pressed downVote');
        console.log(postId);
        $.ajax({
            type: "PUT",
            url: "vote/" + postId + "/vote-down",
            success: function (data) {
                console.log("voted down!");
            },
            error: function (err) {
                console.log(err.messsage);
            }
        });
    });



});

