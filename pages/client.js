$(document).ready(() => {

    var loginForm = $('#loginForm');

    loginForm.submit((e) => {
        e.preventDefault();
        console.log('Form used');

        console.log(loginForm.serialize());

        $.ajax({
            type: "POST",
            //url: form.attr('action') or '',
            data: loginForm.serialize(),
            success: (data) => {
                console.log(data);
            },
            error: (err) => {
                console.log(err);
            }
        });
    })
});