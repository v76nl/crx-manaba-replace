chrome.storage.local.get("replacements", (data) => {
    const replacements = data.replacements || {};
    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.nodeValue;
            for (const [key, value] of Object.entries(replacements)) {
                text = text.replaceAll(key, value);
            }
            node.nodeValue = text;
        } else {
            for (const child of node.childNodes) {
                replaceText(child);
            }
        }
    }
    replaceText(document.body);
});
