/* ============================================
   ============= Global Variables =============
   ============================================ */
    let totalCost = 0; // ← Holds cost for registered activities
    const $totalMsg = $('<p>'); // ← Creates paragraph that will hold message that displays running total
    const $creditCard = $('#payment').next(); // ← Grabs credit card payment option
    const $paypal = $('#payment').next().next().first(); // ← Grabs paypal payment option
    const $bitcoin = $('#payment').next().next().next().first(); // ← Grabs bitcoin payment option

/* ============================================
   ============= Global Functions =============
   ============================================ */
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
    $('#color option').each(function () { // ← Hides all options in T-shirt color menu
        $(this).hide();
    });
    // ↓ Prepends a new option element to the T-shirt color menu
    $('#color').prepend($('<option>').attr('selected', true).text('Please select a T-shirt theme'));
    // ↓ Listens for change event on Design menu and 
    //   makes sure none of the options have the selected attribute
    $('#design').on('change', function () {
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
    // ↓ Adds total message paragraph to bottom of fieldset, and hides it
    $('.activities').append($totalMsg.hide());
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
    $paypal.hide(); // ← Hides paypal payment option on load
    $bitcoin.hide(); // ← Hides bitcoin payment option on load
    $('#payment :first-child').hide(); // ← Hides "Select Payment Method" from "...pay with:" drop down
    // ↓ Shows the payment method selected and hides the others
    $('#payment').on('change', function () {
        if ($(this).val() === "paypal") {
            $paypal.show()
            $bitcoin.hide();
            $creditCard.hide();
        } else if ($(this).val() === "bitcoin") {
            $bitcoin.show();
            $paypal.hide();
            $creditCard.hide();
        } else if ($(this).val() === "credit card") {
            $creditCard.show();
            $paypal.hide();
            $bitcoin.hide();
        }
    })

/* ============================================
   ================ Validation ================
   ============================================ */
