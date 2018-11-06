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

    var form = $('#loginForm');
    form.submit((e) => {
        e.preventDefault();

        console.log(form.serialize());

        $.ajax({
            type: "POST",
            //url: form.attr('action') or '',
            data: form.serialize(),
            success: (data) => {
                console.log(data);
            }
        });
    })
});