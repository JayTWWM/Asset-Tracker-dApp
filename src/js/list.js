$.noConflict();

jQuery(document).ready(function($) {
    var assetCount;


    setTimeout(function() {
        AssetTrackerContract.methods.getUserAssetCount().call((error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
                assetCount = response;
            }
        });
    }, 1000);


    setTimeout(function() {
        for (let k = 1; k <= assetCount; k++) {
            AssetTrackerContract.methods.getAsset(k).call((error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response);
                    if (response[0] != "None") {
                        var row;
                        if (response[1] && response[2]) {
                            row =
                                "<li><div class='product-details'> <span class='product-compare'><i class='fa fa-check-circle fa-lg' style='color:green'></i></span><span class='product-compare'><i class='fa fa-check-circle fa-lg' style='color:green'></i></span><h2>" + response[0] + "</h2><tr><td><button onClick='transferSetUp(\"" + response[0] + "\")'>Transfer</button></td><td><button>Split</button></td><td><button>Key</button></td></tr><p class='product-price'>" + response[3] + "</p></div></li>";
                        } else if (response[1]) {
                            row =
                                "<li><div class='product-details'> <span class='product-compare'><i class='fa fa-check-circle fa-lg' style='color:green'></i></span><span class='product-compare'><i class='fa fa-times-circle fa-lg' style='color:red'></i></span><h2>" + response[0] + "</h2><tr><td><button onClick='transferSetUp(\"" + response[0] + "\")'>Transfer</button></td><td><button>Split</button></td><td><button>Key</button></td></tr><p class='product-price'>" + response[3] + "</p></div></li>";
                        } else if (response[2]) {
                            row =
                                "<li><div class='product-details'> <span class='product-compare'><i class='fa fa-times-circle fa-lg' style='color:red'></i></span><span class='product-compare'><i class='fa fa-check-circle fa-lg' style='color:green'></i></span><h2>" + response[0] + "</h2><tr><td><button onClick='transferSetUp(\"" + response[0] + "\")'>Transfer</button></td><td><button>Split</button></td><td><button>Verify</button></td></tr><p class='product-price'>" + response[3] + "</p></div></li>";
                        } else {
                            row =
                                "<li><div class='product-details'> <span class='product-compare'><i class='fa fa-times-circle fa-lg' style='color:red'></i></span><span class='product-compare'><i class='fa fa-times-circle fa-lg' style='color:red'></i></span><h2>" + response[0] + "</h2><tr><td><button onClick='transferSetUp(\"" + response[0] + "\")'>Transfer</button></td><td><button>Split</button></td><td><button>Verify</button></td></tr><p class='product-price'>" + response[3] + "</p></div></li>";
                        }
                        $("#product-list-vertical").append(row);
                    }
                }
            });
        }
    }, 2000);

    // "use strict";

    // [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
    //     new SelectFx(el);
    // });

    // jQuery('.selectpicker').selectpicker;


    // $('#menuToggle').on('click', function(event) {
    //     $('body').toggleClass('open');
    // });

    // $('.search-trigger').on('click', function(event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     $('.search-trigger').parent('.header-left').addClass('open');
    // });

    // $('.search-close').on('click', function(event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     $('.search-trigger').parent('.header-left').removeClass('open');
    // });


});