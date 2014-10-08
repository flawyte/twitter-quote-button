// Get all the "··· More" menus
var menus = getMenusArray();

for (var index in menus) {
    var newItem = $(document.createElement('li'));
    var innerButton = $(document.createElement('button'));
    var menu = $(menus[index]);
    var quoteButtonText = chrome.i18n.getMessage("quote");

    // Sets up the button
    innerButton.attr('class', 'dropdown-link');
    innerButton.attr('role', 'menuitem');
    innerButton.attr('type', 'button');
    // Set the button's text
    innerButton.text(quoteButtonText);
    // Add the "Quote" button
    newItem.prepend(innerButton);
    // Add the item to the list
    menu.prepend(newItem);
}

/**
 ** FUNCTIONS
 **/

function getMenusArray() {
    return [].filter.call(
                document.querySelectorAll("li.more-tweet-actions .dropdown-menu > ul"),
                function(value, index, array) {
                    return true;
                },
                []);
}