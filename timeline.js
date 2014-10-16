// Get all the "··· More" menus
var menus = getMenusArray();

addQuoteButton(menus);
addMutationListener();

/**
 ** FUNCTIONS
 **/

function addMutationListener() {
    $('#stream-items-id').arrive('li[data-item-type=tweet]', function() {
        addQuoteButton($(this).find('li.more-tweet-actions .dropdown-menu > ul').toArray());
    });
}

function addQuoteButton(menus) {
    for (var index in menus) {
        var newItem = $(document.createElement('li'));
        var innerButton = $(document.createElement('button'));
        var menu = $(menus[index]);
        var quoteButtonText = chrome.i18n.getMessage("quote");

        // Set up the button
        innerButton.attr('class', 'dropdown-link');
        innerButton.attr('role', 'menuitem');
        innerButton.attr('type', 'button');
        // Attach it the click listener
        innerButton.click(onClickQuoteButton);
        // Set the button's text
        innerButton.text(quoteButtonText);
        // Add the "Quote" button
        newItem.prepend(innerButton);
        // Add the item to the list
        menu.prepend(newItem);
    }
}

function getMenusArray() {
    return [].filter.call(
                document.querySelectorAll("li.more-tweet-actions .dropdown-menu > ul"),
                function(value, index, array) {
                    return true;
                },
                []);
}

function getTweetAuthor(element) {
    return $(element).closest('.tweet').find('.username').text();
}

function getTweetText(element) {
    return $(element).closest('.tweet').find('.tweet-text').text();
}

function onClickQuoteButton(event) {
    // Get the btn's parent tweet's author
    var author = getTweetAuthor(event.currentTarget);
    // Get the btn's parent tweet's text
    var text = getTweetText(event.currentTarget);
    // Set the focus on the text field first (so the tweet form will be expanded)
    $('#tweet-box-mini-home-profile').focus();
    // Set the tweet text as its value
    $('#tweet-box-mini-home-profile').first().text('RT ' + author + ': ' + text);
    // Set the scroll bar at the top of the page
    $(document).scrollTop(0);
    // Close the dropdown menu
    $(event.currentTarget).closest('.tweet').find('.dropdown-toggle').click();
}
