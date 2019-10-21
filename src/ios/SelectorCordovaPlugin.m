#import "SelectorCordovaPlugin.h"

#import <Cordova/CDVAvailability.h>


#define IS_WIDESCREEN ( fabs( ( double )[ [ UIScreen mainScreen ] bounds ].size.height - ( double )568 ) < DBL_EPSILON )
#define IS_IPAD UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad
#define DEVICE_ORIENTATION [UIDevice currentDevice].orientation

// UIInterfaceOrientationMask vs. UIInterfaceOrientation
// A function like this isn't available in the API. It is derived from the enum def for
// UIInterfaceOrientationMask.
#define OrientationMaskSupportsOrientation(mask, orientation)   ((mask & (1 << orientation)) != 0)

typedef NS_ENUM(NSInteger, SelectorResultType) {
  SelectorResultTypeCanceled = 0,
  SelectorResultTypeDone = 1
};

@interface SelectorCordovaPlugin () <UIActionSheetDelegate, UIPopoverControllerDelegate, UIPickerViewDelegate, UIPickerViewDataSource>

@property (nonatomic, copy) NSString* callbackId;
@property (nonatomic, strong) NSMutableDictionary *options;
@property (nonatomic, strong) UIPickerView *pickerView;
@property (nonatomic, strong) UIPopoverController *popoverController;
@property (nonatomic, strong) UIView *modalView;
@property (nonatomic, strong) NSArray *items;
@property (nonatomic, strong) NSMutableDictionary *itemsSelectedIndexes;

@end

@implementation SelectorCordovaPlugin

- (void)showSelector:(CDVInvokedUrlCommand *)command {
  _callbackId = command.callbackId;

  // NOTE: All default options are assumed to be set in JS code
  _options = [command.arguments objectAtIndex:0];
  _items = [_options objectForKey:@"displayItems"];

  UIView *view = [self createPickerView];

  NSDictionary *defaultItems = [_options objectForKey:@"defaultItems"];
  _itemsSelectedIndexes = [@{} mutableCopy];

  for (int columnIndex = 0; columnIndex < _items.count; columnIndex++) {
    NSString *columnIndexString = [NSString stringWithFormat:@"%i", columnIndex];
    NSInteger initialValueIndex = 0;

    if (defaultItems) {
      NSString *value = [defaultItems objectForKey:columnIndexString];
      NSUInteger index = [[_items objectAtIndex:columnIndex] indexOfObject:value];
      if (NSNotFound != index) {
        initialValueIndex = index;
      }
    }
    [_itemsSelectedIndexes setValue:@(initialValueIndex) forKey:columnIndexString];
    [_pickerView selectRow:initialValueIndex inComponent:columnIndex animated:NO];
  }

  if (IS_IPAD) {
    return [self presentPopoverForView:view];
  } else {
    return [self presentModalViewForView:view];
  }
}

- (void)hideSelector:(CDVInvokedUrlCommand *)command {
  if (_callbackId) {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR] callbackId:_callbackId];
    _callbackId = nil;
  }

  _callbackId = command.callbackId;
  [self didDismissWithCancelButton:self];
}

- (UIView *)createPickerView {
  // Initialize container view
  UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, [self getSafeBottomPadding], self.viewSize.width, 260 + [self getSafeBottomPadding])];
  if (@available(iOS 13, *)) {
      [view setBackgroundColor:[UIColor systemBackgroundColor]];
  }
  else if (NSFoundationVersionNumber > NSFoundationVersionNumber_iOS_6_1) {
    [view setBackgroundColor:[UIColor colorWithRed:0.97 green:0.97 blue:0.97 alpha:1.0]];
  }

  // Initialize toolbar
  UIToolbar *toolbar = [self createToolbar];
  [view addSubview:toolbar];

  // Initialize picker
  _pickerView = [[UIPickerView alloc] initWithFrame:CGRectMake(0, 40.0f, self.viewSize.width, 260 - [self getSafeBottomPadding])];
  [_pickerView setShowsSelectionIndicator:YES];
  [_pickerView setDelegate:self];

  // iOS7 picker draws a darkened alpha-only region on the first and last 8 pixels horizontally, but blurs the rest of its background.
  // To make the whole popup appear to be edge-to-edge, add blurring to the remaining left and right edges.
  if (NSFoundationVersionNumber > NSFoundationVersionNumber_iOS_6_1) {
    CGRect f = CGRectMake(0, toolbar.frame.origin.y, 8, view.frame.size.height - toolbar.frame.origin.y);

    UIToolbar *leftEdge = [[UIToolbar alloc] initWithFrame:f];
    f.origin.x = view.frame.size.width - 8;

    UIToolbar *rightEdge = [[UIToolbar alloc] initWithFrame:f];
    [view insertSubview:leftEdge atIndex:0];
    [view insertSubview:rightEdge atIndex:0];
  }

  [view addSubview:self.pickerView];

  return view;
}

- (UIToolbar *)createToolbar {
  UIToolbar *toolbar = [[UIToolbar alloc] initWithFrame: CGRectMake(0, 0, self.viewSize.width, 44)];
  toolbar.barStyle = (NSFoundationVersionNumber > NSFoundationVersionNumber_iOS_6_1) ? UIBarStyleDefault : UIBarStyleBlackTranslucent;
  NSMutableArray *buttons =[[NSMutableArray alloc] init];

  // Create Cancel button
  UIBarButtonItem *cancelButton = [[UIBarButtonItem alloc] initWithTitle:[_options objectForKey:@"negativeButtonText"] style:UIBarButtonItemStylePlain target:self action:@selector(didDismissWithCancelButton:)];
  [buttons addObject:cancelButton];

  // Create title label aligned to center and appropriate spacers
  UILabel *label =[[UILabel alloc] initWithFrame:CGRectMake(0, 0, 180, 30)];
  [label setTextAlignment:NSTextAlignmentCenter];
  [label setTextColor:(NSFoundationVersionNumber > NSFoundationVersionNumber_iOS_6_1) ? [UIColor blackColor] : [UIColor whiteColor]];
  [label setFont:[UIFont boldSystemFontOfSize:[[_options objectForKey:@"fontSize"] floatValue]]];
  [label setBackgroundColor:[UIColor clearColor]];
  [label setText:[_options objectForKey:@"title"]];

  UIBarButtonItem *labelButton = [[UIBarButtonItem alloc] initWithCustomView:label];
  UIBarButtonItem *flexSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
  [buttons addObject:flexSpace];
  [buttons addObject:labelButton];
  [buttons addObject:flexSpace];

  // Create Done button
  UIBarButtonItem *doneButton = [[UIBarButtonItem alloc] initWithTitle:[_options objectForKey:@"positiveButtonText"] style:UIBarButtonItemStyleDone target:self action:@selector(didDismissWithDoneButton:)];
  [buttons addObject:doneButton];
  [toolbar setItems:buttons animated:YES];

  return toolbar;
}

- (void)sendResultsFromPickerView:(UIPickerView *)pickerView resultType:(SelectorResultType)resultType {
  CDVPluginResult *pluginResult;

  if (resultType == SelectorResultTypeDone) {
    NSMutableArray *arr = [[NSMutableArray alloc] init];
    NSArray *sortedKeys = [[_itemsSelectedIndexes allKeys] sortedArrayUsingSelector: @selector(compare:)];

    for (NSString *key in sortedKeys) {
      NSString *theKey = key;
      NSInteger indexInDict = [theKey integerValue];
      NSInteger index = [[_itemsSelectedIndexes objectForKey:key] integerValue];
      NSString *indexAsString = [@(index) stringValue];

      NSString *valueFound = _items[indexInDict][index];
      NSDictionary *tmpDictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                                     indexAsString, @"index",
                                     valueFound, [_options objectForKey:@"displayKey"], nil];

      [arr addObject:tmpDictionary];
    }

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:arr];
  }

  if (resultType == SelectorResultTypeCanceled) {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
  }

  [self.commandDelegate sendPluginResult:pluginResult callbackId:_callbackId];
  _callbackId = nil;
}

#pragma mark - Show picker

- (void)presentModalViewForView:(UIView *)view {
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(didRotate:)
                                               name:UIApplicationWillChangeStatusBarOrientationNotification
                                             object:nil];

  CGRect viewFrame = CGRectMake(0, [self getSafeBottomPadding], self.viewSize.width, self.viewSize.height);
  [view setFrame:CGRectMake(0, viewFrame.size.height, viewFrame.size.width, 260 + [self getSafeBottomPadding])];

  _modalView = [[UIView alloc] initWithFrame:viewFrame];
  [_modalView setBackgroundColor:[UIColor clearColor]];
  [_modalView addSubview:view];

  // Add the modal view to current controller
  [self.webView.superview addSubview:self.modalView];
  [self.webView.superview bringSubviewToFront:self.modalView];

  // Present the view animated
  [UIView animateWithDuration:0.3
                        delay:0.0
                      options: 0
                   animations:^{
                     [_modalView.subviews[0] setFrame: CGRectOffset(viewFrame, 0, viewFrame.size.height - (260 + [self getSafeBottomPadding]) - [self getSafeBottomPadding])];
                     [_modalView setBackgroundColor:[UIColor colorWithWhite:0.0 alpha:0.5]];
                   }
                   completion:nil];
}

- (void)presentPopoverForView:(UIView *)view {
  UIViewController *popoverContent = [[UIViewController alloc] initWithNibName:nil bundle:nil];
  popoverContent.view = view;
  popoverContent.preferredContentSize = view.frame.size;

  self.popoverController = [[UIPopoverController alloc] initWithContentViewController:popoverContent];
  self.popoverController.delegate = self;

  // Present the popover view non-modal with a refrence to the button pressed within the current view
  // Display picker at the center of the view
  CGRect sourceRect = CGRectMake(self.webView.superview.center.x, self.webView.superview.center.y, 1, 1);
  [self.popoverController presentPopoverFromRect:sourceRect
                                          inView:self.webView.superview
                        permittedArrowDirections: 0
                                        animated:YES];
}

# pragma mark - Dismiss picker

- (void)didRotate:(NSNotification *)notification {
  UIInterfaceOrientationMask supportedInterfaceOrientations = (UIInterfaceOrientationMask) [[UIApplication sharedApplication] supportedInterfaceOrientationsForWindow:[UIApplication sharedApplication].keyWindow];

  if (OrientationMaskSupportsOrientation(supportedInterfaceOrientations, DEVICE_ORIENTATION)) {
    if (IS_IPAD) {
      [self dismissPopoverController:_popoverController animated:YES];
    } else {
      [self dismissModalView:_modalView animated:YES];
    }

    [self sendResultsFromPickerView:_pickerView resultType:SelectorResultTypeCanceled];
  }
}

- (IBAction)didDismissWithDoneButton:(id)sender {
  if (IS_IPAD) {
    [self dismissPopoverController:_popoverController animated:YES];
  } else {
    [self dismissModalView:_modalView animated:YES];
  }

  [self sendResultsFromPickerView:_pickerView resultType:SelectorResultTypeDone];
}

- (IBAction)didDismissWithCancelButton:(id)sender {
  if (IS_IPAD) {
    [self dismissPopoverController:_popoverController animated:YES];
  } else {
    [self dismissModalView:_modalView animated:YES];
  }

  [self sendResultsFromPickerView:_pickerView resultType:SelectorResultTypeCanceled];
}

- (void)popoverControllerDidDismissPopover:(UIPopoverController *)popoverController {
  [self sendResultsFromPickerView:_pickerView resultType:SelectorResultTypeCanceled];
}

- (void)dismissPopoverController:(UIPopoverController *)popoverController animated:(Boolean)animated {
  [popoverController dismissPopoverAnimated:animated];
}

- (void)dismissModalView:(UIView *)modalView animated:(Boolean)animated {
  [[NSNotificationCenter defaultCenter] removeObserver:self name:UIApplicationWillChangeStatusBarOrientationNotification object:nil];

  // Hide the view animated
  [UIView animateWithDuration:0.3
                        delay:0.0
                      options: 0
                   animations:^{
                     CGRect viewFrame = CGRectMake(0, 0, self.viewSize.width, self.viewSize.height);
                     [_modalView.subviews[0] setFrame: CGRectOffset(viewFrame, 0, viewFrame.size.height)];
                     [_modalView setBackgroundColor:[UIColor clearColor]];
                   }
                   completion:^(BOOL finished) {
                     [_modalView removeFromSuperview];
                   }];
}

#pragma mark - UIPickerViewDelegate

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component {
  // The parameters named row and component represents what was selected.
  NSString* key = [NSString stringWithFormat:@"%li", (long)component];
  [_itemsSelectedIndexes setValue:@(row) forKey:key];
}

- (UIView *)pickerView:(UIPickerView *)pickerView viewForRow:(NSInteger)row forComponent:(NSInteger)component reusingView:(UIView *)view {
  UILabel* pickerLabel = (UILabel*)view;
  if (!pickerLabel) {
    pickerLabel = [[UILabel alloc] init];
    pickerLabel.font = [UIFont fontWithName:@"SourceSansPro-Semibold" size:[[_options objectForKey:@"fontSize"] floatValue]];
    pickerLabel.textAlignment=NSTextAlignmentCenter;
  }
  [pickerLabel setText:_items[component][row]];
  return pickerLabel;
}

- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component {
  return [_items[component] count];
}

- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView {
  return _items.count;
}

- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
  return _items[component][row];
}

- (CGFloat)pickerView:(UIPickerView *)pickerView widthForComponent:(NSInteger)component {
  if (self.items.count >= 2) {
    return (pickerView.frame.size.width) / self.items.count;
  } else {
    return pickerView.frame.size.width - 20;
  }
}

#pragma mark - Uitilities

- (CGSize)viewSize {
  if (IS_IPAD) {
    return CGSizeMake(500, 320);
  }

#if defined(__IPHONE_8_0)
  if (floor(NSFoundationVersionNumber) <= NSFoundationVersionNumber_iOS_7_1) {
    //iOS 7.1 or earlier
    if ([self isViewPortrait])
      return CGSizeMake(320 , IS_WIDESCREEN ? 568 : 480);
    return CGSizeMake(IS_WIDESCREEN ? 568 : 480, 320);
  } else {
    //iOS 8 or later
    return [[UIScreen mainScreen] bounds].size;
  }
#else
  if ([self isViewPortrait]) {
    return CGSizeMake(320 , IS_WIDESCREEN ? 568 : 480);
  }
  return CGSizeMake(IS_WIDESCREEN ? 568 : 480, 320);
#endif
}

- (CGFloat) getSafeBottomPadding {
    CGFloat bottomPadding = 0.0f;
    if (@available(iOS 11.0, *)) {
        UIWindow *window = UIApplication.sharedApplication.keyWindow;
        bottomPadding = window.safeAreaInsets.bottom;
    }

    return bottomPadding;
}

- (BOOL)isViewPortrait {
  return UIInterfaceOrientationIsPortrait([UIApplication sharedApplication].statusBarOrientation);
}

@end
