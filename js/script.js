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

/* ============================================
   ============ Activities Section ============
   ============================================ */

/* ============================================
   =========== Payment Info Section ===========
   ============================================ */

/* ============================================
   ================ Validation ================
   ============================================ */
