function replaceText(node, rules) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        for (const key in rules) {
            const value = rules[key];
            text = text.replaceAll(key, value);
        }
        node.nodeValue = text;
    } else {
        for (const child of node.childNodes) {
            replaceText(child, rules);
        }
    }
}

chrome.storage.local.get("replacements", function(data) {
    const rules = data.replacements || {};
    replaceText(document.body, rules);
});
