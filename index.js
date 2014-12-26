addDelegateMenusClickListeners();
addDelegateButtonsClickListeners();

/**
 ** FUNCTIONS
 **/

function addDelegateButtonsClickListeners() {
    $('#page-container').on('click', '.dropdown-menu > ul .quote-button', onClickQuoteButton);
}

function addDelegateMenusClickListeners() {
    document.querySelector('#page-container').addEventListener('click', function(event) {
        // Using the 'not()' selector to prevent the button to appear on profile pages
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
    return $(element).closest('.tweet').find('.username').text()
        || $(element).closest('.ProfileTweet').find('.ProfileTweet-screenname').text();
}

function getTweetText(element) {
    return $(element).closest('.tweet').find('.tweet-text').html()
        || $(element).closest('.ProfileTweet').find('.ProfileTweet-text').html();
}

function onClickMenu(menu) {
    menu = menu.find('ul');

    if (menu.hasClass('quote-inserted'))
        return;

    menu.addClass('quote-inserted');
    addQuoteButton(menu);
}

function onClickQuoteButton() {
    // Get the btn's parent tweet's author
    var author = getTweetAuthor(this);
    // Get the btn's parent tweet's text
    var text = getTweetText(this);

    // Simulate a click on the top right button to open the tweet dialog
    $('#global-new-tweet-button').click();
    // Close the dropdown menu
    $(this).closest('.dropdown.open').find('.dropdown-toggle').click();
    // Set the focus on the text area first
    $('#tweet-box-global').focus();
    // Set the tweet text as its value
    $('#tweet-box-global').html('RT ' + author.trim() + ': ' + text.trim().replace(/\n/g, '<br />'));
}
