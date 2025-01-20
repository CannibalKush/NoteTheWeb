document.getElementById('show-toolbar').addEventListener('click', () => {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: 'show-toolbar',
        });
    });
});