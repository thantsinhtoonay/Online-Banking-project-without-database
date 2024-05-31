id.focus();

function login() {
    var inputPhoneNo = document.getElementById('phoneNo').value;
    var inputPassword = document.getElementById('password').value;

    const username = 'Kyaw Gyi';
    const correctPhoneNo = 09123456789;
    const correctPassword = 1111;
    
    if (inputPhoneNo == correctPhoneNo && inputPassword == correctPassword) {
        window.location.href = 'index.html';
        alert('Welcome ' + username)
    } else {
        alert('Invalid Phone number or Password. Please try again.');
    }
}
