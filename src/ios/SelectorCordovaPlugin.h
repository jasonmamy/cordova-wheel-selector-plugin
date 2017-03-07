#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface SelectorCordovaPlugin : CDVPlugin <UIActionSheetDelegate, UIPopoverControllerDelegate, UIPickerViewDelegate, UIPickerViewDataSource> {
}

#pragma mark - Properties

@property (nonatomic, copy) NSString* callbackId;
@property (nonatomic, strong) UIPickerView *pickerView;
@property (nonatomic, strong) UIPopoverController *popoverController;
@property (nonatomic, strong) UIView *modalView;
@property (nonatomic, strong) NSArray *items;
@property (nonatomic, strong) NSString* displayKey;
@property (nonatomic, strong) NSMutableDictionary *selectedValuesDict;

#pragma mark - Instance methods

- (void)showSelector:(CDVInvokedUrlCommand*)command;

@end

