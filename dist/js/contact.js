$(document).ready(function() {

    $("#contact-form").click(function() {
        $("#name-error").empty();
        $("#email-error").empty();
        $("#message-error").empty();
    });

    $("#contact-form-submit").click(function (e) {
        e.preventDefault(); // prevent page reload
        var formName = document.forms["contact-form"]["name"].value;
        var formEmail = document.forms["contact-form"]["email"].value;
        var formMessage = document.forms["contact-form"]["message"].value;
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

        if (formName == null || formName == "") {
            $("#name-error").html("Please enter your name");
            return false;
        } else if (formEmail == '' || !re.test(formEmail)) {
            $("#email-error").html("Please enter a valid email address");
            return false;
        } else if (formMessage == null || formMessage == "") {
            $("#message-error").html("Please enter a message");
            return false;
        } else {
        $.ajax({
            type: "POST",
            url: '/contact',
            data: $("#contact-form").serialize(),
            success: function (response) {
                $("#submit-response").html(response);
            },
            error: function (error) {
                $("#submit-response").html(error);
            }
        });}
    });
 
 
});