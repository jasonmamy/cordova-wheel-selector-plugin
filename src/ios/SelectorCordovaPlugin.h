#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface SelectorCordovaPlugin : CDVPlugin

- (void)showSelector:(CDVInvokedUrlCommand *)command;
- (void)hideSelector:(CDVInvokedUrlCommand *)command;

@end
