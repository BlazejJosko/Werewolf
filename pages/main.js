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

function divUpdate(){
    var htmlRoleObj = [];
    // Loop through the amount of children id=roles has
    console.log('Updating Roles')
    for(let i = 0; i < $('#roles').children().length; i++){
        console.log('Role:', i);

        // get the active div
        let child = $('#roles').children()[i].innerText;
        console.log('Changing:', child);

        child = filterRole(child).role;

        // push it into an array
        htmlRoleObj[i] = `<div class="role">${i+1}. ${child} <button type="button" class="roleButton" onclick="removeDiv(this)">X</button></div>`;
    }

    $('#roles').html('');
    console.log('Cleared Roles... updating for ', htmlRoleObj.length, 'roles');
    for(let z = 0; z < htmlRoleObj.length; z++){
        console.log('Role', z);
        $('#roles').html($('#roles').html() + htmlRoleObj[z]);
    }
}
/**
 * 
 * @param {string} role //takes the role and extracts the number and the Name
 */
function filterRole(role){
    // read the number of the div so we can assign the search value
    let number = parseInt(role.substr(0,1));

    // replace the first whitespace and then assign the search borders
    role = role.replace(' ', ''); // remove the whitespace because then there will be no change that a role starting with X will be detected as the end
    let start = role.search(`${number}.`) + 2;
    let end = role.search(' X') - 2;

    // create a substring only containing the role
    role = role.substr(start, end);
    console.log("Trimmed at", start, end);
    console.log(role);

    return {number: number, role: role};
}


var serverForm = $('#serverForm');
function sendForm(){
    console.log('Form used');
    let data = '';
    
    // get Role Number and Name put it in Array
    for(let i = 0; i < $('#roles').children().length; i++){
        let role = $('#roles').children()[i].innerText;

        let trimmer = filterRole(role)

        data += `&nr=${trimmer.number}&role=${trimmer.role}`;
    }

    console.log(serverForm.serialize()+data)

    $.ajax({
        type: "POST",
        url: serverForm.attr('action'),
        data: serverForm.serialize()+data,
        success: (data) => {
            console.log(data);
            //success function
            // Create Lobby
        },
        error: (err) => {
            console.log(err);
            //error function
            // 
        }
    })

    document.getElementById('ServerLobby').style.display = 'block';
    document.getElementById('ServerCreation').style.display = 'none';

}


$(document).ready(() => {

    serverForm.submit((e) => {
        e.preventDefault();
        sendForm();
    })

    var roleForm = $('#roleForm');

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