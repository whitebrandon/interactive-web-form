/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
Name: Brandon White
Date of Last Modification: 30/07/2019
******************************************/

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /* ============================================
       ============ Basic Info Section ============
       ============================================ */
    
    $('#name').focus(); // ← Adds focus to name input on page load
    $('#other-title').hide(); // ← Hides other-title input on page load

    $('#title').on('change', function () { // ← Listens for change event on Job Role drop down
        // ↓ If client selects option "other", show Job Role text input,
        //   otherwise, hide Job Role text input if shown
        if ($(this).val() === "other") {
            $('#other-title').fadeIn();
        } else {
            $('#other-title').fadeOut();
        }
    });
    
    /* ============================================
       =========== T-Shirt Info Section ===========
       ============================================ */
    
    $('#design :first-child').hide(); // ← Hides 'Select Theme' from Design drop down
    $("#colors-js-puns").hide(); // ← Hides 'Color:' label and corresponding drop down menu
    $('#color option').each(function () { // ← Hides all options in T-shirt color menu
        $(this).hide();
    });
    // ↓ Prepends a new option element to the T-shirt color menu
    $('#color').prepend($('<option>').attr('selected', true).text('Please select a T-shirt theme'));

    // ↓ Listens for change event on Design menu and 
    //   makes sure none of the options have the selected attribute
    $('#design').on('change', function () {
        $("#colors-js-puns").show();
        $('#color option').each(function () {
            if ($(this).attr('selected') === "selected") {
                $(this).attr('selected', false);
            }
        });
        // ↓ Shows T-shirt colors that match the JS Puns theme and hides all others
        if ($('#design').val() === "js puns") {
            // ↓ Sets Cornflower Blue T-shirt color as default selection
            $('#color option[value="cornflowerblue"]').attr('selected', true);
            $('#color option').each(function () {
                const $index = $(this).text().indexOf('(');
                const $theme = $(this).text().slice($index + 1, $index + 7);
                if ($theme === "JS Pun") {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
            // ↓ Shows T-shirt colors that match the I ♥ JS theme and hides all others
        }   else if ($('#design').val() === "heart js") {
            // ↓ Sets Tomato T-shirt color as default selection
            $('#color option[value="tomato"]').attr('selected', true);
            $('#color option').each(function () {
                const $index = $(this).text().indexOf('(');
                const $theme = $(this).text().slice($index + 1, $index + 7);
                if ($theme === "I ♥ JS") {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
    
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
        const $currencyIndex = $labelText.indexOf('$'); // ← Finds $ in text, and ↓ Gets price
        const $price = parseInt($labelText.slice($currencyIndex + 1, $currencyIndex + 4), 10);
        if ($(this).prop('checked') === true) { // ← If target of event checked, add price to totalCost
            totalCost += $price;
        } else { // ← If target of event not checked, subtract price from totalCost
            totalCost -= $price;
        }
        if (totalCost > 0) { // ← If totalCost gt 0 ↓ show totalMsg
            $totalMsg.html(`Your total is: <strong>$${totalCost}</strong>.`).show();
        } else { // ← otherwise, hide totalMsg
            $totalMsg.hide();
        }
        // ↓ Loops through each checkbox
        $('.activities input').each(function () {
            const $comparisonText = $(this).parent().text(); // ← Grabs text for each checkbox input 
            // ↓ An IEFE that stores a day of the week substring from the selected activity
            const $day = (function () {
                const $emdashIndex = $labelText.indexOf('—');
                const $day = $labelText.slice($emdashIndex + 2, $emdashIndex + 12);
                const $eodIndex = $day.indexOf(' ');
                return $day.substring(0, $eodIndex);
            })();
            // ↓ An IEFE that stares a start time substring from the selected activity
            const $startTime = (function () {
                const $hypenIndex = $labelText.indexOf('-');
                return $labelText.slice($hypenIndex - 3, $hypenIndex);
            })();
            if ($comparisonText.includes($day) && 
                $comparisonText.includes($startTime)) {
                // ↓ Enables/RESETS all checkboxes that are disabled
                if ($(this).prop('disabled') === true) {
                    $(this).removeAttr('disabled');
                    $(this).parent().css("text-decoration", "none");
                // ↓ Disables checkbox if it conflicts w/ day and time of selected activity
                } else if ($currentInput.parent().text() !== $(this).parent().text()) {
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
    const $paypal = $('#payment').next().next().first(); // ← Grabs paypal payment option
    const $bitcoin = $('#payment').next().next().next().first(); // ← Grabs bitcoin payment option

    // ↓ Function that—when called—toggles display of the payment options
    const togglePayDisplay = (showEl, hideEl_1, hideEl_2) => {
        showEl['show']();
        hideEl_1['hide']();
        hideEl_2['hide']();
    }

    $paypal.hide(); // ← Hides paypal payment option on load
    $bitcoin.hide(); // ← Hides bitcoin payment option on load
    $('#payment :first-child').hide(); // ← Hides "Select Payment Method" from "...pay with:" drop down
    // ↓ On Card Number focus, the value of the payment select element auto changes to credit card
    $('#cc-num').focus(() => { 
        $('#payment option[value="credit card"]').attr("selected", true);
    });

    // ↓ Adds eventListener to payment select element that calls the 
    //   togglePayDisplay function and shows/hides appropriate payment options
    $('#payment').on('change', function () {
        if ($(this).val() === "paypal") {
            togglePayDisplay($paypal, $bitcoin, $creditCard);
        } else if ($(this).val() === "bitcoin") {
            togglePayDisplay($bitcoin, $paypal, $creditCard);
        } else if ($(this).val() === "credit card") {
            togglePayDisplay($creditCard, $paypal, $bitcoin);
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
    const createTooltip = (befOrAft, element, message) => {
        $('<div>')['insert' + befOrAft](element).html(`<p>Please ${message}</p>`).css("color", "red").hide();
    }
    // ↓ Function that adds an eventListener to an [input] element
    const bindEvent = (element, regex, method, index, maxNumber) => {
        $(element).on('input blur', () => { // ← Listens for 'input' and 'blur' events
        if (maxNumber) { // ← Adds a maxlength attribute if a maxNumber arg is passed into function
            $(element).attr("maxlength", maxNumber);
        }
        // ↓ An IEFE that creates the validation for the element passed into function
        (function () {
            let isValid = regex.test($(element).val()); // ← test regex stores bool into isValid
            if (!isValid) { // ↓ If isValid is false, show tootlip
                $(element).css("border", "2px solid red")[method]().slideDown();
            } else { // ↓ If isValid is true, hide tooltip
                $(element).css("border", "2px solid #b0d3e2")[method]().slideUp();
            }
            // ↓ Upon reaching max char limit, a keypress eventListener is added to input
            if ($(element).val().length === maxNumber) {
                // ↓ If user attempts to key additional chars the tooltip message
                //   is changed to one that states the max char limit for input
                $(element).on('keypress', function () { 
                    $(this).next()
                              .html(`<p>Field can not be longer than ${maxNumber} characters</p>`)
                              .slideDown().delay(2000).slideUp();
                });
            } else { // ↓ If user deletes a char, the tooltip message reverts to orig version
                     //   and the keypress eventListener is removed from input
                $(element).next().html(`<p>Please ${errorMessages[index].msg}</p>`);
                $(element).off('keypress');
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
    bindEvent('#name', regex.name, 'prev', 0);
    bindEvent('#mail', regex.mail, 'prev', 1);
    bindEvent('#cc-num', regex.cc_num, 'next', 3, 16);
    bindEvent('#zip', regex.zip, 'next', 4, 5);
    bindEvent('#cvv', regex.cvv, 'next', 5, 3);

    // ↓ Listens for events on any of the checkboxes and calls isActivityChecked func when triggered 
    $('.activities').on('change blur', 'input', () => {
        isActivityChecked();
    });

    $('form').on('submit', (event) => {
        // ↓ If selected payment option is equal to credit card, or unchanaged from page load:
        if ($('#payment').val() === "credit card" ||
            $('#payment').val() === "select_method") {
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
        $('input[id]').each(function () {
            $(this).blur();                           
        });
        $('.activities input').blur();
    });
});