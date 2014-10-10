chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.cmd == 'load-html') {
        $.get(
            chrome.runtime.getURL(message.componentName + '.html'),
            function(html) {
                sendResponse(html);
            }
        );

        return true;
    }
});