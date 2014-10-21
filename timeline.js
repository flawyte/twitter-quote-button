addDelegateMenusClickListeners();
addDelegateButtonsClickListeners();

/**
 ** FUNCTIONS
 **/

function addDelegateButtonsClickListeners() {
    $('#stream-items-id .dropdown-menu > ul').on('click', '.quote-button', onClickQuoteButton);
}

function addDelegateMenusClickListeners() {
    document.querySelector('#stream-items-id').addEventListener('click', function(event) {
        if ($(event.target).is('.Icon--dots')) {
            var menu = $(event.target).closest('.dropdown-toggle').siblings('.dropdown-menu');

            onClickMenu(menu);
        }
    }, true);
}

function addQuoteButton(menu) {
    var newItem = $(document.createElement('li'));
    var innerButton = $(document.createElement('button'));
    var quoteButtonText = chrome.i18n.getMessage("quote");

    // Set up the button
    innerButton.attr('class', 'dropdown-link quote-button');
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

function getTweetAuthor(element) {
    return $(element).closest('.tweet').find('.username').text();
}

function getTweetText(element) {
    return $(element).closest('.tweet').find('.tweet-text').text();
}

function onClickMenu(menu) {
    menu = menu.find('ul');

    if (menu.hasClass('quote-inserted'))
        return;

    menu.addClass('quote-inserted');
    addQuoteButton(menu);
}

function onClickQuoteButton() {
    var self = $(this);

    // Get the btn's parent tweet's author
    var author = getTweetAuthor(this);
    // Get the btn's parent tweet's text
    var text = getTweetText(this);
    // Set the focus on the text field first (so the tweet form will be expanded)
    $('#tweet-box-mini-home-profile').focus();
    // Set the tweet text as its value
    $('#tweet-box-mini-home-profile').first().text('RT ' + author + ': ' + text);
    // Set the scroll bar at the top of the page
    $(document).scrollTop(0);
    // Close the dropdown menu
    self.closest('.dropdown.open').find('.dropdown-toggle').click();
}
