const textarea = document.getElementById("rules");

// 保存処理
document.getElementById("save").addEventListener("click", () => {
    const rawRules = textarea.value;
    const rules = rawRules.split("\n").reduce((acc, line) => {
        const [from, to] = line.split("=>");
        if (from && to) acc[from.trim()] = to.trim();
        return acc;
    }, {});
    chrome.storage.local.set({ replacements: rules }, () => {
        alert("保存しました");
    });
});

// 初期表示で保存済みルールを読み込む
chrome.storage.local.get("replacements", (data) => {
    const rules = data.replacements || {};
    const text = Object.entries(rules)
        .map(([from, to]) => `${from}=>${to}`)
        .join("\n");
    textarea.value = text;
});
