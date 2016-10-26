$ = jQuery;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function equalheight(container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = [],
        $el,
        topPosition = 0;

    $(container).each(function() {
        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

function JointheteamVerticalPositioning() {
    var el1 = $("#block-jointheteam > div > .row > .col-sm-6:first-of-type");
    var el1Height = $("#block-jointheteam > div > .row > .col-sm-6:first-of-type").height();
    var el2Height = $("#block-jointheteam > div > .row > .col-sm-6:last-of-type").height();
    if ($(window).width() > 740) {
        $(el1).css("margin-top", (el2Height - el1Height)/2 );
    }
    else {
        $(el1).css("margin-top" , "0px");
    }
}

function stickyMenu() {
    // Sticky menu
    if ($(window).width() > 730) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 250) {
                $('.container.menu-container').addClass('sticky');
            } else {
                $('.container.menu-container').removeClass('sticky');
            }
        });
    }// End sticky menu
}

$(document).ready(function() {
    var
      handleRegisterForm = true,
      handleError,
      newsletterRegisterForm = $('#newsletter-register'),
      emailField = $('[name=EMAIL]', newsletterRegisterForm),
      confirmElement = $('.confirm', newsletterRegisterForm),
      emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      cnil = $('.cnil');

    // init code highlighting
    if (hljs) {
        hljs.initHighlighting();
    }

    // init cnil bar
    if (!getCookie('cnil-browsing')) {
        cnil.removeClass('hidden');

        $('.dismiss', cnil).on('click', function(e) {
            e.preventDefault();

            setCookie('cnil-browsing', true, 365);
            cnil.addClass('hidden');

            return false;
        });
    }

    // init newsletter registration form
    handleError = function () {
        handleRegisterForm = false;
        newsletterRegisterForm.attr(
          'action',
          newsletterRegisterForm.attr('action').replace('-json', '')
        );

        newsletterRegisterForm.submit();
    };

    newsletterRegisterForm.on('submit', function (e) {
        var
          ajaxRequestOptions,
          email = emailField.val();

        if (!handleRegisterForm) {
            return true;
        }
        else {
            e.preventDefault();

            if (email == "" || !emailReg.test(email)) {
                emailField.focus();
                return false;
            }

            ajaxRequestOptions = {
                method: newsletterRegisterForm.attr('method'),
                url: newsletterRegisterForm.attr('action'),
                data: newsletterRegisterForm.serialize(),
                cache: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8"
            };

            $.ajax(ajaxRequestOptions)
              .done(function (data) {
                  if (data.result && data.result === "success") {
                      emailField.parent().remove();
                      confirmElement.removeClass('hidden');
                  }
                  else {
                      // if an error occurs, let the default behaviour occurs
                      handleError();
                  }
              })
              .fail(function () {
                  // if an error occurs, let the default behaviour occurs
                  handleError();
              });


            return false;
        }
    });

    // executes when HTML-Document is loaded and DOM is ready
    $(".mobile-menu").click(function(){
        $(this).toggleClass("selected");
        $(".region-navigation").slideToggle("fast");
    });
});


$(window).load(function() {
    // executes when complete page is fully loaded, including all frames, objects and images

    //Vertical align the left element on #joinTheTeam block
    JointheteamVerticalPositioning();

    //equalize the two elements on a row of Get In Touch with Kuzzle block
    if ($(window).width() > 740) {
        equalheight('#block-getintouchwithkuzzle .col-sm-6 > pre');
    }
    else {
        $('#block-getintouchwithkuzzle .col-sm-6 > pre').css("height" , "auto");
    }

    //sticky menu function
    stickyMenu();
});

$( window ).resize(function() {
    // executes when the viewport is resized

    //Vertical align the left element on #joinTheTeam block
    JointheteamVerticalPositioning();

    //equalize the two elements on a row of Get In Touch with Kuzzle block
    if ($(window).width() > 740) {
        equalheight('#block-getintouchwithkuzzle .col-sm-6 > pre');
    }
    else {
        $('#block-getintouchwithkuzzle .col-sm-6 > pre').css("height" , "auto");
    }

    //sticky menu function
    stickyMenu();
});


(function () {
    var
      l = console.log,
      r = [
        "      ▄▄▄▄▄      ▄███▄      ▄▄▄▄\n" +
        "   ▄█████████▄▄█████████▄▄████████▄\n" +
        "  ██████████████████████████████████\n" +
        "   ▀██████████████████████████████▀\n" +
        "    ▄███████████████████████████▄\n" +
        "  ▄███████████████████████████████▄\n" +
        " ▀█████████████████████████████████▀\n" +
        "   ▀██▀        ▀██████▀       ▀██▀\n" +
        "                 ████\n" +
        "                ▄████▄\n" +
        "                ▀████▀\n" +
        "                  ▀▀\n\n",
        "Damn! You have killed this raccoon !",
        "If you like raccoons, apply at job@kuzzle.io !"
      ];
    
    window.killTheRaccoon = function () {for (var j = 0; j < r.length; j++) {l(r[j])}}
})();