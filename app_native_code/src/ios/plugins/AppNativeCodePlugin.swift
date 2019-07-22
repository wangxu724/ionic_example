//
//

import Foundation

@available(iOS 8.0, *)
@objc(AppNativeCodePlugin) class AppNativeCodePlugin : CDVPlugin {

    @objc(initialize:)
    func initialize(command: CDVInvokedUrlCommand) {
        log(message: "Plugin initialization")

        commandDelegate!.run() {
            let result: CDVPluginResult
            // result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: "")

            // self.commandDelegate!.send(result, callbackId: command.callbackId)
        }
    }
}
