var getParam = function (name) {
    var query = window.location.search.replace('?', ''),
        hashes = query.split('&');
    for (var i in hashes) {
        var hash = hashes[i].split('=');
        if (hash[0] === name && hash[1]) {
            return hash[1];
        }
    }
    return false;
};
var getBaseUrl = function (url) {
    var base = window.location.split('?');
    return base[0];
};
var lang = getParam('lang');
if (lang) {
    dojoConfig.locale = lang;
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        if (cls === 'key')
            return '<span class="' + cls + '">' + match + '</span>';
        else
            return '<span class="' + cls + '">' + match + '</span><br>';
    });
}

