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

/* ============================================
   =========== Payment Info Section ===========
   ============================================ */

/* ============================================
   ================ Validation ================
   ============================================ */
