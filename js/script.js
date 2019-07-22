$('input[id="name"]').focus(); // Adds focus to name input on page load
$('input[id="other-title"]').hide(); // Hides other-title input
$('#design option').first().hide(); // Hides 'Select Theme' from the design drop down menu
$('#color option').each(function () { // Hides all of the options in the T-shirt color menu
    $(this).hide();
});
// ↓ Prepends a new option element to the Color select element 
const $option = $('<option>').attr('selected', true).text('Please select a T-shirt theme');
$('#color').prepend($option);

$('#design').on('change', () => {
    if ($('#design').val() === "js puns") {
        $('#color option').each(function () {
            const $shirtColor = $(this).attr('value');
            if ($shirtColor === "cornflowerblue" | 
                $shirtColor === "darkslategrey" | 
                $shirtColor === "gold") {
            $(this).show();
            } else {
                $(this).hide();
            }
        });
    } else if ($('#design').val() === "heart js") {
        $('#color option').each(function () {
            const $shirtColor = $(this).attr('value');
            if ($shirtColor === "tomato" | 
                $shirtColor === "steelblue" | 
                $shirtColor === "dimgrey") {
            $(this).show();
            } else {
                $(this).hide();
            }
        });        
    }
    // $option.hide();
})