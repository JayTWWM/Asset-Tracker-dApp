$.noConflict();

jQuery(document).ready(function($) {
    var assetCount;


    setTimeout(function() {
        AssetTrackerContract.methods.getFailureCount().call((error, response) => {
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
            AssetTrackerContract.methods.getFailure(k).call((error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response);
                    if (response[0] != "None") {
                        var row;
                            row =
                                "<li><tr><td><h2>Asset UID: " + response[0] + "</h2></td><h2>Owner's Name: " + response[1] + "</h2><td></td><td><h2>Owner's Email: " + response[2] + "</h2></td></tr></li>";
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