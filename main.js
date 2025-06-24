$(document).ready(function() {
    // Smooth scroll for nav links
    $('.nav-links a').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 700);
        }
    });

    // Back to top button
    var backToTop = $('#back-to-top');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });
    backToTop.on('click', function() {
        $('html, body').animate({scrollTop: 0}, 700);
    });

    // Sticky navbar effect (add shadow)
    $(window).scroll(function() {
        if ($(window).scrollTop() > 10) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Contact form validation and AJAX submit
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('input[name="name"]').val().trim();
        var email = $('input[name="email"]').val().trim();
        var message = $('textarea[name="message"]').val().trim();
        var valid = true;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        $('#form-messages').removeClass('error success').text('');
        if (name.length < 2) {
            valid = false;
            $('#form-messages').addClass('error').text('Please enter your name.');
        } else if (!emailPattern.test(email)) {
            valid = false;
            $('#form-messages').addClass('error').text('Please enter a valid email.');
        } else if (message.length < 5) {
            valid = false;
            $('#form-messages').addClass('error').text('Please enter a message.');
        }
        if (valid) {
            var formData = $(this).serialize();
            $.ajax({
                url: 'contact.php',
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        $('#form-messages').addClass('success').text(response.message);
                        $('#contact-form')[0].reset();
                    } else {
                        $('#form-messages').addClass('error').text(response.message);
                    }
                },
                error: function() {
                    $('#form-messages').addClass('error').text('An error occurred. Please try again.');
                }
            });
        }
    });
}); 