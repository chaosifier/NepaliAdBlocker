$.getJSON(chrome.runtime.getURL('blocklist.json'), function (data) {
    var blockList = data;

    blockList.forEach(entry => {
        if (entry.domain.indexOf(document.domain) > -1 || entry.domain === "*") {
            let blockerStyle = getBlockerHeaderStyle(entry.selector);
            console.log(blockerStyle, 'blockerStyle');
            $(`<style type='text/css'>${blockerStyle}</style>`).appendTo("body");
            $(entry.selector).hide();
        }
    });
});

// setTimeout(() => {
//     blockList.forEach(entry => {
//         if (entry.domain === document.domain) {
//             console.log('hiding', entry.selector);
//             $(entry.selector).hide();
//         }
//     });
// }, 1000);

function getBlockerHeaderStyle(selector) {
    let parts = selector.split(',');
    let output = '';
    parts.forEach(itm => {
        if (itm[0] === '.' || itm[0] === '#')
            output += `${itm}{display:none;} `;
    });
    return output;
}