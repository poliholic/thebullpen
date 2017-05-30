console.log("Bueller? Bueller? Bueller?");

$(function() {
// Get page title
  var pageTitle = $("title").text();

// Change page title  and favicon on blur
$(window).blur(function() {
  $("title").text("Where are you!?!");
  $("#favicon").attr("href","images/wtf.ico");
});

// Change page title back on focus
$(window).focus(function() {
  $("title").text(pageTitle);
  $("#favicon").attr("href","images/supe_favicon.ico");
});
});



//trying the pop up
$(function() {
    //----- OPEN
    $('[data-popup-open]').on('mousemove', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
});


///end of popup



function renderAllNudates() {
    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/api/nudates',
        success: function(responseData){
            let source   = $("#handlebars-template").html();
            let template = Handlebars.compile(source); // turn it into HTML.
            let html = template({nudates: responseData}); // put the data into HTML.
            $('main').html(html);
        }
    })
}

function renderOneNudate(nudateId) {
    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: `/api/nudates/${nudateId}`,
        success: function(responseData){
            let source   = $("#one-nudate-template").html();
            let template = Handlebars.compile(source); // turn it into HTML.
            let html = template(responseData); // put the data into HTML.
            $('main').html(html);
        }
    })
}
function showOneNudate() {
    $('main').on('click', 'button.show', function(e) {
        let nudateId = $(e.target).attr('data-id');
        renderOneNudate(nudateId);
    })
}

function rerenderHome() {
    $('main').on('click', 'button.home', function(e) {
        renderAllNudates();
    })
}

function addNewNudate() {
    $('main').on('click', 'button.submitAdd', function(e) {
        e.preventDefault();
        let addedNudateObj = {};
        $('form.addNudateForm').serializeArray().forEach(function(attr) {
            addedNudateObj[attr.name] = attr.value;
        })

        // Now send the added Nudate object to the database via the server.
        $.ajax({
            method: 'POST',
            data: addedNudateObj,
            dataType: 'json',
            url: '/api/nudates',
            success: function(responseData) {
                renderAllNudates();
            }
        })
    })
}

function deleteNudate() {
    $('main').on('click', 'button.delete', function(e) {
        let nudateId = $(e.target).attr('data-id');
        $.ajax({
            method: 'DELETE',
            dataType: 'json',
            url: `/api/nudates/${nudateId}`,
            success: function(responseData) {
                renderAllNudates();
            }
        })
    })
}

function editNudate() {
    $('main').on('click', 'button.submitEdit', function(e) {
        e.preventDefault();
        let btnDataId = $(e.target).attr('data-id');
        let edittedNudateObj = {};
        $('form.editNudateForm').serializeArray().forEach(function(attr) {
            edittedNudateObj[attr.name] = attr.value;
        })
        console.log(edittedNudateObj);

        // Now send the added nudate object to the database via the server.
        $.ajax({
            method: 'PUT',
            data: edittedNudateObj,
            dataType: 'json',
            url: `/api/nudates/${btnDataId}`,
            success: function(responseData) {
                renderOneNudate(btnDataId);
            }
        })
    })
}


$(document).ready(function(){

    renderAllNudates();
    showOneNudate();
    rerenderHome();
    addNewNudate();
    deleteNudate();
    editNudate();

});
