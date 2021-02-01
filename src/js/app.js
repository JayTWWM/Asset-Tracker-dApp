var assetCount = 0;

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
                window.location.href = "./asset_creation.html";
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
                window.location.href = "./asset_creation.html";
            }
        });
    return false;
}

function asset_creation() {
    var asset_creation_form = document.getElementById("asset_creation_form");
    var asset_name = asset_creation_form['asset_name'];
    var asset_number = asset_creation_form['asset_number'];
    console.log(asset_name.value);
    console.log(asset_number.value);
    AssetTrackerContract.methods.createAsset(asset_number.value, asset_name.value, 'Random')
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success");
                console.log(result);
                window.location.href = "./sample.html";
            }
        });
    return false;
}

function get_assets() {
    AssetTrackerContract.methods.getUserAssetCount().call((error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
            assetCount = response;
        }
    });
    return false;
}