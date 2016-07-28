let phantom = require('phantom');

function get(url, callback) {
    let sitepage = null;
    let phInstance = null;
    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            sitepage = page;
            return page.open(url);
        })
        .then(status => {
            if (status !== 'success') {
                return callback(`Status is not success, but is '${status}'`)
            }
            return sitepage.property('content');
        })
        .then(content => {
            sitepage.close();
            phInstance.exit();
            return callback(null, content);
        })
        .catch(error => {
            phInstance.exit();
            callback(error);
        });
}

exports.get = get;
