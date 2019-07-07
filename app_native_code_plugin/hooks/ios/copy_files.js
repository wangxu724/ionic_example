const fs = require('fs');
const path = require('path');

module.exports = function(ctx) {
    copyCDVAppDelegate(ctx);
};

function copyCDVAppDelegate(ctx) {
    const fileName = 'AppDelegate.m';

    const projectRoot = ctx.opts.projectRoot;
    const pluginId = ctx.opts.plugin.id;
    const pluginPath = ctx.opts.plugin.dir;

    const sourceFilePath = path.join(pluginPath, 'src', 'ios', fileName);
    const targetFilePath = path.join(projectRoot, 'platforms', 'ios', 'MyApp', 'Classes', fileName);

    fs.copyFileSync(sourceFilePath, targetFilePath);
}
