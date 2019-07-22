const fs = require('fs');
const path = require('path');

module.exports = function(ctx) {
    copyTypeFiles(ctx);
    copyCDVAppDelegate(ctx);
};

function copyCDVAppDelegate(ctx) {
    if (ctx.opts.platforms.indexOf('ios') < 0) {
        return;
    }

    const fileName = 'AppDelegate.m';
    const projectRoot = ctx.opts.projectRoot;
    const pluginPath = ctx.opts.plugin.dir;
    const sourceFilePath = path.join(pluginPath, 'src', 'ios', fileName);
    const targetFilePath = path.join(projectRoot, 'platforms', 'ios', 'MyApp', 'Classes', fileName);

    fs.copyFileSync(sourceFilePath, targetFilePath);
}

function copyTypeFiles(ctx) {
    const fileName = 'app-native-code.d.ts';
    const projectRoot = ctx.opts.projectRoot;
    const pluginPath = ctx.opts.plugin.dir;
    const sourceFilePath = path.join(pluginPath, 'typings', fileName);
    const targetFilePath = path.join(projectRoot, 'src', 'app', fileName);

    fs.copyFileSync(sourceFilePath, targetFilePath);
}
