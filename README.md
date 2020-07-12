# INTERACTIVE WEB FORM

## Objective:
The objective of this project was to enhance a form so that it’s engaging, interactive, and easy to use.

## Summary of Results:
* In the "Basic Info" section focus has been added to the "Name:" field on the initial DOM load, and the "other-title" text input has been hidden so that it's only visible if the user selects the "Other" option from the Job Role menu (or if JavaScript is disabled on the user's browser). 
* In the "T-Shirt Info" section I dynamically added an option to the "Color:" drop down menu that reads: 'Please select a T-shirt theme'. Also, I hid all options in the "Color:" drop down menu (sans the aforemention dynamically created option) so that only a specific set of T-shirt colors show for a given design theme. 
* With the "Register for Activities" section, a running total of the registered activities's cost has been added to the bottom of the 'Activities' fieldset, and selecting an activity automatically results in the disabling of any conflicting activities (assuming one or more exist). 
* For the "Payment Info" section, I programmed the "credit card" payment option to be selected by default on the initial DOM load, and additionally input functionality that hides the payment options that are not selected.  
* Form validation has been added that prevents the form from being submitted if: the "Name:" & "Email:" fields are invalid, no activities have been selected, and/or the "Card Number:", "Zip Code:" & "CVV:" fields are empty (when "credit card" is the selected payment option). Moreover, I dynamically added maximum character lengths to the "credit card" text input fields so that a user cannot enter more characters than would be valid for any of those fields. 
* Error indications are provided on both the form submission and when a user types/inputs text into—or moves focus off—any of the appropriate fields. Furthermore, an error indication is provided for the "Register for Activities" section on either form submission, or when the user selects a checkbox and then deselects it (if deselecting the checkbox returns the 'Activities' fieldset back to its initial state of having no checkboxes selected). 
* If/when JavaScript is disabled, all form fields and payment information is displayed. 

* Finally, additional functionality has been added in an effort to receive a grade of "Exceeeds Expectations". They are as follows: 
    - The "Color:" label and drop down menu have been hidden on the initial DOM load so that they are only visible after a T-shirt design has been selected.
    - All text input fields (sans the dynamically created "other-title" text input) offer real-time error messages that disappear once validly formated text has been input.
    - An **alternate message** has been added to the **"credit card"** text input fields. If the user attempts to key characters into the field **past** the maximum character limit accepted, a two second message prompts the user that the field will not accept additional characters.

## Explanation of Techniques Used:
1. JQuery has been used extensively in this project (to show & hide as well as to add fading and sliding animations to elements). I would wager that over 80% of this project utilizes JQuery objects, selectors/filtering, methods and chaining to write more sparse and cleaner code.
2. The code is split into five sections: Basic Info, T-Shirt Info, Activities, Payment Info, and Validation.
3. Both arrow functions and regular function expressions have been used (as well as IEFEs), with the function expressions used primarily because of their own bindings to the 'this' keyword.
4. There are three functions defined within the global scope:
    - The **createTooltip()** function accepts three parameters, and creates & appends a hidden error message to the DOM.
    - The **bindEvent()** function accepts up to five parameters, and adds input and blur event listeners to text inputs which would then trigger a callback function that checks if the value of the text inputs are properly formatted. 
    - The **isActivityChecked()** function performs validation for the 'Activities' fieldset. It works by checking if each individiual checkbox is selected and pushing the true or false value of that check into an Array. Then the Array, itself, is checked to determine if one of its values is true. If so no error message is shown and true is returned to the function. If not, an error message is shown and false is returned to the function.
5. An Array of objects was created to store the property/value pairs of the arguments for the **createTooltip()** function.
6. An object literal was created to bind the regular expressions to properties.
