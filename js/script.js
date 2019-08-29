/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
Name: Brandon White
Date of Last Modification: 28/08/2019
******************************************/

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /* ============================================
       ============ Basic Info Section ============
       ============================================ */
    
    $('#name').focus(); // ← Adds focus to name input on page load
    $('#other-title').hide(); // ← Hides other-title input on page load

    $('#title').on('change', function () { // ← Listens for change event on Job Role drop down
        // ↓ If user selects option "other", show Job Role text input,
        //   otherwise, hide Job Role text input if shown
        $(this).val() === "other" ? $('#other-title').fadeIn() : $('#other-title').fadeOut();
    });
    
    /* ============================================
       =========== T-Shirt Info Section ===========
       ============================================ */
    
    $('#design :first-child').hide(); // ← Hides 'Select Theme' from Design menu
    $("#colors-js-puns").hide(); // ← Hides 'Color:' label and corresponding drop down menu
    $('#color option').each((i) => $('#color option').eq(i).hide()); // ← Hides all options in color menu
    // ↓ Prepends a new option element to the color menu
    $('#color').prepend($('<option>').attr('selected', true).text('Please select a T-shirt theme'));

    // ↓ Listens for change event on Design menu and 
    //   makes sure none of the options have the selected attribute
    $('#design').on('change', () => {
        $("#colors-js-puns").show();
        $('#color option').each(function () {
            if ($(this).attr('selected')) {
                $(this).attr('selected', false);
            }
        });
        // ↓ Function that only shows T-shirt colors available for selected design theme
        const tshirtColorFilter = (color, design) => {
            // ↓ Sets arg passed in as color as default selection of T-shirt color
            $(`#color option[value=${color}]`).attr('selected', true);
            $('#color option').each(function () {
                const $theme = $(this).text();
                $theme.includes(design) ? $(this).show() : $(this).hide();
            });
        }
        if ($('#design').val() === "js puns") {
            tshirtColorFilter("cornflowerblue", "JS Pun");
        }   else if ($('#design').val() === "heart js") {
            tshirtColorFilter("tomato", "I ♥ JS");
        }
    });
    
    /* ============================================
       ============ Activities Section ============
       ============================================ */
    
    let totalCost = 0; // ← Holds cost for registered activities
    const $totalMsg = $('<p>'); // ← Creates paragraph that will hold running total

    $('.activities').append($totalMsg.hide()); //  Adds running total to bottom of fieldset, and hides it

    // ↓ Listens for change events that occur on inputs
    $('.activities').on('change', 'input', function () {
        const $currentInput = $(this); // ← Grabs the target of the event
        const $labelText = $currentInput.parent().text(); // ← Grabs text for target of event
        const $price = parseInt($labelText.slice($labelText.indexOf('$') + 1), 10); // ← Gets price from text
        // ↓ If target of event checked, add price to totalCost, otherwise subtract
        $currentInput.prop('checked') ? totalCost += $price : totalCost -= $price;
        // ↓ If totalCost gt 0 show totalMsg
        totalCost > 0 ? $totalMsg.html(`Your total is: <strong>$${totalCost}</strong>.`).show() : $totalMsg.hide();
        // ↓ Loops through each checkbox
        $('.activities input').each(function () {
            const $comparisonText = $(this).parent().text(); // ← Grabs text for each checkbox input 
            // ↓ An IEFE that stores a day of the week substring from the selected activity
            const $day = (() => {
                const $emdashIndex = $labelText.indexOf('—');
                return $labelText.slice($emdashIndex + 2);
            })();
            // ↓ An IEFE that stares a start time substring from the selected activity
            const $startTime = (() => {
                const $hypenIndex = $labelText.indexOf('-');
                return $labelText.slice($hypenIndex - 3, $hypenIndex);
            })();
            if ($comparisonText.includes($day) && 
                $comparisonText.includes($startTime)) {
                // ↓ Enables/RESETS all checkboxes that are disabled
                if ($(this).attr('disabled')) {
                    $(this).attr('disabled', false);
                    $(this).parent().css("text-decoration", "none");
                // ↓ Disables checkbox if it conflicts w/ day and time of selected activity
                } else if ($labelText !== $(this).parent().text()) {
                    $(this).attr("disabled", true);
                    $(this).parent().css("text-decoration", "line-through");
                }
            }
        })
    })
    
    /* ============================================
       =========== Payment Info Section ===========
       ============================================ */
    
    const $creditCard = $('#payment').next(); // ← Grabs credit card payment option
    const $paypal = $creditCard.next().first(); // ← Grabs paypal payment option
    const $bitcoin = $paypal.next().first(); // ← Grabs bitcoin payment option
    $creditCard.siblings('div').hide(); // ← Hides paypal & bitcoin payment options on load
    $('#payment :first-child').hide(); // ← Hides "Select Payment Method" from "...pay with:" menu    
    $('#payment option:eq(1)').attr("selected", true); // ← On page load, credit card *selected* by default

    // ↓ Adds eventListener to payment select element that shows/hides appropriate payment options
    $('#payment').on('change', function () {
        $(this).siblings('div').hide();
        if ($(this).val() === "paypal") {
            $paypal.show();
        } else if ($(this).val() === "bitcoin") {
            $bitcoin.show();
        } else if ($(this).val() === "credit card") {
            $creditCard.show();
        }
    });
    
    /* ============================================
       ================ Validation ================
       ============================================ */
    
    const errorMessages = [ // ← Array to store objects used as args for createTooltip function
        {prop: 'Before', el: '#name', msg: 'enter a name'},
        {prop: 'Before', el: '#mail', msg: 'enter an email address'},
        {prop: 'Before', el: '.activities label:eq(0)', msg: 'choose an activity'},
        {prop: 'After', el: '#cc-num', msg: 'enter a credit card number'},
        {prop: 'After', el: '#zip', msg: 'enter a zip code'},
        {prop: 'After', el: '#cvv', msg: 'enter a cvv'} 
    ];
    const regex = { // ← Object to hold regular expressions for validation
        name: /\w+/, 
        mail: /^[^@]+@[^@.]+\.[a-z]+$/i, 
        cc_num: /^\d{13,16}$/, 
        zip: /^\d{5}$/, 
        cvv: /^\d{3}$/
    };

    // ↓ Function that when called will create error message and add it to page
    const createTooltip = (preposition, element, message) => {
        $('<div>')[`insert${preposition}`](element).html(`<p>Please ${message}</p>`).css("color", "red").hide();
    }
    // ↓ Function that adds an eventListener to an [input] element
    const bindEvent = (element, regex, method, index, maxNumber) => {
        $(element).on('input blur', () => { // ← Listens for 'input' and 'blur' events
        $(element).attr("maxlength", maxNumber); // ← Sets a maxlength for input
        // ↓ An IEFE that creates the validation for the element passed into function
        (() => {
            let isValid = regex.test($(element).val()); // ← test regex stores bool into isValid
            // ↓ If isValid is false, show tooltip
            !isValid ? $(element).css("border", "2px solid red")[method]().slideDown() : $(element).css("border", "2px solid #b0d3e2")[method]().slideUp();
            if (index) {
                // ↓ Upon reaching max char limit, a keypress eventListener is added to input
                if ($(element).val().length === maxNumber) {
                    // ↓ If user attempts to key additional chars the tooltip message
                    //   is changed to one that states the max char limit for input
                    $(element).on('keypress', function () { 
                        $(this).next().html(`<p>Field cannot have more than ${maxNumber} characters</p>`)
                                      .slideDown().delay(2000).slideUp();
                    });
                } else { // ↓ If user deletes a char, the tooltip message reverts to orig version
                        //   and the keypress eventListener is removed from input
                    $(element).next().html(`<p>Please ${errorMessages[index].msg}</p>`);
                    $(element).off('keypress');
                };
            };
        })();
        })
    }
    // ↓ Creates validation for activities fieldset
    const isActivityChecked = () => {
        const activitiesBoolList = []; // ← Creates an empty array
        // ↓ Goes through each checkbox, checks if its checked property is true,
        //   and pushes whatever that value is into the actvitiesdBoolList
        $('.activities input').each(function () {
            activitiesBoolList.push($(this).prop('checked'))
        });
        // ↓ If any of the checkboxes were/are true, hide tooltip
        if (activitiesBoolList.includes(true)) {
            $('.activities label:eq(0)').prev().slideUp();
            return true; // ← Stores true into isActivityChecked
        // ↓ If none of the checkboxes were/are true, show tooltip
        } else {
            $('.activities label:eq(0)').prev().slideDown();
            return false; // ← Stores false into isActivityChecked
        };
    }

    // ↓ Loops through errorMessages array an creates tooltips for each errorMessage object
    for (let i = 0; i < errorMessages.length; i++) {
        createTooltip(errorMessages[i].prop, errorMessages[i].el, errorMessages[i].msg);
    };

    // ↓ Calls bindEvent function for each text input that requires validation
    bindEvent('#name', regex.name, 'prev');
    bindEvent('#mail', regex.mail, 'prev');
    bindEvent('#cc-num', regex.cc_num, 'next', 3, 16);
    bindEvent('#zip', regex.zip, 'next', 4, 5);
    bindEvent('#cvv', regex.cvv, 'next', 5, 3);

    // ↓ Listens for events on any of the checkboxes and calls isActivityChecked func when triggered 
    $('.activities').on('change blur', 'input', () => isActivityChecked());

    $('form').on('submit', (event) => {
        // ↓ If selected payment option is equal to credit card, or unchanaged from page load:
        if ($('#payment').val() === "credit card") {
            // ↓ then validate the credit card info: if false, prevent submission of form
            if (!regex.cc_num.test($('#cc-num').val()) ||
                !regex.zip.test($('#zip').val()) ||
                !regex.cvv.test($('#cvv').val())) {
                    event.preventDefault();
            }
        }
        // ↓ Validate the name, email, and activities fieldset inputs:
        //   And if false, prevent submission of form
        if (!regex.name.test($('#name').val()) ||
            !regex.mail.test($('#mail').val()) ||
            !isActivityChecked()) {
                event.preventDefault();
        }
        // ↓ Triggers event on all eventListeners just in case user has not
        $('input').each((i) => $('input').eq(i).blur());
    });
});