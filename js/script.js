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
$("#colors-js-puns").hide();
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
const $totalMsg = $('<p>'); // ← Creates paragraph that will hold message that displays running total
// ↓ Adds total message paragraph to bottom of fieldset, and hides it
$('.activities').append($totalMsg.hide());
// ↓ A function that returns a day of the week substring from the selected activity
const getDay = (string) => {
    const $emdashIndex = string.indexOf('—');
    const $day = string.slice($emdashIndex + 2, $emdashIndex + 12);
    const $eodIndex = $day.indexOf(' ');
    return $day.substring(0, $eodIndex);
}
// ↓ A function that returns a start time substring from the selected activity
const getTime = (string) => {
    const $hypenIndex = string.indexOf('-');
    return string.slice($hypenIndex - 3, $hypenIndex);
}
// ↓ Listens for change events that occur on inputs
$('.activities').on('change', 'input', function () {
    const $currentInput = $(this); // Grabs the target of the event
    // ↓ The next three variables collectively extract the price of the selected activity
    const $labelText = $currentInput.parent().text();
    const $currencyIndex = $labelText.indexOf('$');
    const $price = parseInt($labelText.slice($currencyIndex + 1, $currencyIndex + 4), 10);
    // ↓ If the current input is checked add the price of its connected activity to the total cost
    //   otherwise, subtract the price of its connected activity from the total cost
    if ($(this).prop('checked') === true) {
        totalCost += $price;
    } else {
        totalCost -= $price;
    }
    // ↓ If the total cost is gt 0, show the running total
    //   otherwise, hide the running total
    if (totalCost > 0) {
        $totalMsg.html(`Your total is: <strong>$${totalCost}</strong>.`).show();
    } else {
        $totalMsg.hide();
    }
    const $dayOf = getDay($labelText); // ← Stores "day" of selected activity
    const $timeOf = getTime($labelText); // ← Stores "start time" of selected activity
    $('.activities input').each(function () {
        const $comparisonText = $(this).parent().text();
        const $dayToCompare = getDay($comparisonText); // ← Stores day of activity to be compared
        const $timeToCompare = getTime($comparisonText); // ← Stores time of activity to be compared
        if ($dayOf === $dayToCompare && 
            $timeOf === $timeToCompare) {
            // ↓ Enables iteration of comparison activity, if disabled -- RESET
            if ($(this).prop('disabled') === true) {
                $(this).removeAttr('disabled');
                $(this).parent().css("text-decoration", "none");
            // ↓ Disables iteration of comparison activity if it conflicts with 
            //   day and time of selected activity
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
// ↓ Shows the payment method selected and hides the others
$('#cc-num').focus(() => {
    $('#payment option[value="credit card"]').attr("selected", true);
});
// ↓ Add eventListener to payment select, that calls the 
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

// ↓ Array to hold a series of object, which will be used as arguments for createTooltip function
const errorMessages = [ 
    {prop: 'Before', el: '#name', msg: 'enter a name'},
    {prop: 'Before', el: '#mail', msg: 'enter an email address'},
    {prop: 'Before', el: '.activities label:eq(0)', msg: 'choose an activity'},
    {prop: 'After', el: '#cc-num', msg: 'enter a credit card number'},
    {prop: 'After', el: '#zip', msg: 'enter a zip code'},
    {prop: 'After', el: '#cvv', msg: 'enter a cvv'} 
];
// ↓ Object to hold regular expressions for validation
regex = {
    name: /\w+/, 
    mail: /^[^@]+@[^@.]+\.[a-z]+$/i, 
    cc_num: /^\d{13,16}$/, 
    zip: /^\d{5}$/, 
    cvv: /^\d{3}$/
};
// ↓ Function that when called will create error message and adds it to page
const createTooltip = (befOrAft, element, message) => {
    $('<div>')['insert' + befOrAft](element).html(`<p>Please ${message}</p>`).css("color", "red").hide();
}
// ↓ Function that adds an eventListener to an [input] element
const bindEvent = (element, regex, method, maxNumber) => {
    $(element).on('input blur', () => { // ← Listens for 'input' and 'blur' events
    if (maxNumber) { // ← Adds a maxlength attribute if a maxNumber arg is passed into function
        $(element).attr("maxlength", maxNumber);
    }
    // ↓ This IEFE creates the actual function that validates the text input
    (function () {
        let isValid = regex.test($(element).val()); // ← test regex stores bool into isValid
        if (!isValid) { // ↓ If isValid is false, show tootlip
            $(element).css("border", "2px solid red")[method]().slideDown();
        } else { // ↓ If isValid is true, hide tooltip
            $(element).css("border", "2px solid #b0d3e2")[method]().slideUp();
        }
    })();
    })
}
// ↓ Creates validation for activities fieldset
const isActivityChecked = () => {
    const activitiesBoolList = []; // ← Creates an empty array

    // ↓ Goes through each checkbox in the activities fieldset,
    //   checks if it is checked property is true, and pushes
    //   whatever that value is into the actvitiesdBoolList
    $('.activities input').each(function () {
        activitiesBoolList.push($(this).prop('checked'))
    });
    // ↓ If any of the checkboxes were/are true, hide tooltip
    if (activitiesBoolList.includes(true)) {
        $('.activities label:eq(0)').prev().slideUp();
        return true;
    // ↓ If none of the checkboxes were/are true, show tooltip
    } else {
        $('.activities label:eq(0)').prev().slideDown();
        return false;
    };
}
// ↓ Loops through errorMessages array an creates tooltips for each errorMessage object
for (let i = 0; i < errorMessages.length; i++) {
    createTooltip(errorMessages[i].prop, errorMessages[i].el, errorMessages[i].msg);
};
// ↓ Calls bindEvent function for each text input that requires validation
bindEvent('#name', regex.name, 'prev');
bindEvent('#mail', regex.mail, 'prev');
bindEvent('#cc-num', regex.cc_num, 'next', 16);
bindEvent('#zip', regex.zip, 'next', 5);
bindEvent('#cvv', regex.cvv, 'next', 3);
// ↓ Listens for 'change' and/or 'blur' on any of the checkboxes in the activities fieldset,
//   and when triggered calls the isActivityChecked (validation) function
$('.activities').on('change blur', 'input', () => {
    isActivityChecked();
});

$('form').submit((event) => {
    // ↓ Triggers event on all eventListeners just in case user has not
    $('input[id]').each(function () {
        $(this).blur();                           
    });
    $('.activities input').blur();
    // ↓ If selected payment option is equal to credit card, or unchanaged from page load:
    if ($('#payment').val() === "credit card" ||
        $('#payment').val() === "select_method") {
        // ↓ then validate the credit card info: if false, prevent submission of form
        if (!regex.cc_num.test($('#cc-num').val()) ||
            !regex.zip.text($('#zip').val()) ||
            !regex.cvv.text($('#cvv').val())) {
                event.preventDefault();
        }
    }
    // ↓ Validate the name, email, and activities fieldset inputs:
    //   And if false, prevent submission of form
    if (!regex.name.test($('#name').val()) ||
        !regex.mail.text($('#mail').val()) ||
        !isActivityChecked()) {
            event.preventDefault();
    }
});