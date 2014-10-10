// Inject pop-up HTML code into page
injectHTML();

// On pop-up open
    // Center pop-up

// On page scroll
    // Center pop-up

function injectHTML() {
    chrome.runtime.sendMessage({cmd: 'load-html', componentName: 'quote-tweet-dialog'}, null, function(html) {
        console.group("injectHTML()");

        $(document.body).prepend($(html).get(0));

        console.groupEnd();
        initializeDialog();
    });
}

function initializeDialog() {
    console.group("initializeDialog()");

    $('#quote-tweet-dialog').dialog({
        autoOpen: false,
        closeOnEscape: true,
        hide: 250,
        modal: true,
        resizable: true,
        show: 150
    });

    $('#quote-tweet-dialog').dialog("open");
    console.groupEnd();
}
