var assetId;

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
                window.location.href = "./asset_list.html";
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
                window.location.href = "./asset_list.html";
            }
        });
    return false;
}

function sellToEnd(res) {
    AssetTrackerContract.methods.sellToEndConsumer(res)
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success");
                console.log(result);
                window.location.href = "./asset_list.html";
            }
        });
}

function transferSetUp(res) {
    window.location.href = "./transfer_ownership.html?assetId=" + res;
}

function verifySetUp(res) {
    window.location.href = "./verify_asset.html?assetId=" + res;
}

function splitSetUp(res) {
    window.location.href = "./split_asset.html?assetId=" + res;
}

function keySetUp(res) {
    window.location.href = "./get_key.html?assetId=" + res;
}

function transferOwnership() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    assetId = queries[0].split("=")[1];
    var signin_form = document.getElementById("asset_transfer_form");
    var email = signin_form['email_transfer'];
    console.log(assetId);
    console.log(email.value);
    AssetTrackerContract.methods.transferOwnership(assetId, email.value)
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success");
                console.log(result);
                window.location.href = "./asset_list.html";
            }
        });
    return false;
}

function get_key() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    assetId = queries[0].split("=")[1];
    console.log(assetId);
    AssetTrackerContract.methods.getAssetKey(assetId)
        .call((error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
                let img = "<img src='https://chart.googleapis.com/chart?cht=qr&chl=" + response + "&choe=UTF-8&chs=177x177'>";
                document.getElementById("test").innerHTML = img;
            }
        });
    return false;
}

function asset_split() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    assetId = queries[0].split("=")[1];
    var asset_creation_form = document.getElementById("asset_split_form");
    var asset_name = asset_creation_form['asset_name'];
    var asset_quantity = asset_creation_form['asset_quantity'];
    console.log(assetId);
    console.log(asset_name.value);
    console.log(asset_quantity.value);
    if (assetId != 'None') {
        AssetTrackerContract.methods.splitAsset(assetId, asset_quantity.value, asset_name.value, Math.random().toString(36).substring(7))
            .send()
            .then(result => {
                if (result.status === true) {
                    alert("Success");
                    console.log(result);
                    window.location.href = "./asset_list.html";
                }
            });
    } else {
        alert("Use different name!");
    }
    return false;
}

function asset_creation() {
    var asset_creation_form = document.getElementById("asset_creation_form");
    var asset_name = asset_creation_form['asset_name'];
    var asset_number = asset_creation_form['asset_number'];
    console.log(asset_name.value);
    console.log(asset_number.value);
    if (asset_name.value != "None") {
        AssetTrackerContract.methods.createAsset(asset_number.value, asset_name.value, Math.random().toString(36).substring(7))
            .send()
            .then(result => {
                if (result.status === true) {
                    alert("Success");
                    console.log(result);
                    window.location.href = "./asset_list.html";
                }
            });
    } else {
        alert("Use different name!");
    }
    return false;
}

function verify_key() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    assetId = queries[0].split("=")[1];
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.getElementById('output');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    var myData = context.getImageData(0, 0, img.width, img.height);
    const code = window.jsQR(myData.data, myData.width, myData.height);
    if (code) {
        console.log("Found QR code", code);
        AssetTrackerContract.methods.verifyAsset(assetId, code.data, Math.random().toString(36).substring(7)).send()
            .then(result => {
                if (result.status === true) {
                    alert("Success");
                    console.log(result);
                    window.location.href = "./asset_list.html";
                }
            });
    } else {
        throw "Faulty QR Code!";
    }
    return false;
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}