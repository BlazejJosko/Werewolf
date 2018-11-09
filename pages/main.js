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

var clicker = false;
function addAdder(){
    clicker = !clicker;

    if(clicker){
        document.getElementById('roleAdder').style.display = 'block';
    } else {
        document.getElementById('roleAdder').style.display = 'none';
    }
}
/**
 * 
 * @param {element} elem - An element which parent Div will be removed 
 */
function removeDiv(elem){
    $(elem).parent('div').remove();
    divUpdate();
}
/**
 * It looks for role updates in the create Server section
 */

function divUpdate(length){
    var htmlRoleObj = [];
    // Loop through the amount of children id=roles has
    console.log('Updating Roles')
    for(let i = 0; i < $('#roles').children().length; i++){
        console.log('Role:', i);

        // get the active div
        let child = $('#roles').children()[i].innerText;
        console.log('Changing:', child);
        
        // read the number of the div so we can assign the search value
        let number = parseInt(child.substr(0,1));

        // replace the first whitespace and then assign the search borders
        child = child.replace(' ', ''); // remove the whitespace because then there will be no change that a role starting with X will be detected as the end
        let start = child.search(`${number}.`) + 2;
        let end = child.search(' X') - 2;
        console.log(child);

        // create a substring only containing the role
        child = child.substr(start, end);
        console.log("Trimmed at", start, end);
        console.log(child);

        // push it into an array
        htmlRoleObj[i] = `<div class="role">${i+1}. ${child} <button type="button" class="roleButton" onclick="removeDiv(this)">X</button></div>`;
    }

    $('#roles').html('');
    console.log('Cleared Roles... updating for ', htmlRoleObj.length, 'roles');
    for(let z = 0; z < htmlRoleObj.length; z++){
        console.log('Role', z);
        $('#roles').html($('#roles').html() + htmlRoleObj[z]);
    }

    //filter the role from the number

    //add the number infront of the div
}

var serverForm = $('#serverForm');
function sendForm(){
    console.log('Form used');
    
    $.ajax({
        type: "POST",
        url: serverForm.attr('action'),
        data: serverForm.serialize(),
        success: (data) => {
            console.log(data);
            //success function
        },
        error: (err) => {
            console.log(err);
            //error function
        }
    })
}


$(document).ready(() => {

    var roleForm = $('#roleForm');
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

    roleForm.submit((e) => {
        e.preventDefault();

        // get the new added role
        let addedRole = $('#roleAdder').val();
        if(addedRole.search(/[A-Za-z]/) === -1){
            //any character that is not a letter will trigger this
            console.log(addedRole, 'is not a accepted value')

        } else {
            // add the role as a div
            console.log('New role added:', addedRole);
            let htmlSyntax = `<div class="role">${$('#roles').children().length + 1}. ${addedRole} <button type="button" class="roleButton" onclick="removeDiv(this)">X</button></div>`
            $('#roles').html( $('#roles').html() + htmlSyntax);
            $('#roleAdder').val('');
        }
    })
});