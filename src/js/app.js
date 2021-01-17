function signin() {
    var signin_form = document.getElementById("sign-in-form");
    var password = signin_form['signin_password'];
    console.log(password.value);
    AssetTrackerContract.methods.logInIdentity(password.value)
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success");
                console.log(result);
                window.location.href = "./dashboard.html";
            }
        });
    return false;
}

function signup() {
    var signup_form = document.getElementById("sign-up-form");
    var name = signup_form['name'];
    var email = signup_form['email'];
    var password = signup_form['password'];
    var position = signup_form['position'];
    console.log(name.value);
    console.log(email.value);
    console.log(password.value);
    console.log(position.value);
    AssetTrackerContract.methods.createIdentity(name.value, email.value, password.value, position.value)
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success");
                console.log(result);
                window.location.href = "./dashboard.html";
            }
        });
    return false;
}