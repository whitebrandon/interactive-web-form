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
    // ↓ This initially removes the selected attribute from any T-shirt color
    $('#color option').each(function () {
        if ($(this).attr('selected') === "selected") {
            $(this).attr('selected', false);
        }
    });
    // ↓ The 1st block sets the shirt colors in drop down to those that match JS Puns theme
    if ($('#design').val() === "js puns") {
         // ↓ Sets default shirt color for select element
        $('#color option[value="cornflowerblue"]').attr('selected', true);
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
      // ↓ The 2nd block sets the shirt colors in drop down to those that match I ♥ JS theme  
    } else if ($('#design').val() === "heart js") {
         // ↓ Sets default shirt color for select element
        $('#color option[value="tomato"]').attr('selected', true);
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
})