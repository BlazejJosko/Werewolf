function joinroom() {
    document.getElementById('MainMenu').style.display = 'none';
    document.getElementById('Server').style.display = 'none';
    document.getElementById('Client').style.display = 'block';
}
function createServer(){
    document.getElementById('MainMenu').style.display = 'none';
    document.getElementById('Server').style.display = 'block';
    document.getElementById('Client').style.display = 'none';
}
$(document).ready(() => {

    var serverForm = $('#serverForm');
    var loginForm = $('#loginForm');

    loginForm.submit((e) => {
        e.preventDefault();

        console.log(loginForm.serialize());

        $.ajax({
            type: "POST",
            //url: form.attr('action') or '',
            data: loginForm.serialize(),
            success: (data) => {
                console.log(data);
            }
        });
    })

    serverForm.submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: serverForm.attr('action'),
            data: serverForm.serialize(),
            success: (data) => {
                //success function
            },
            error: (err) => {
                //error function
            }
        })
    })
});