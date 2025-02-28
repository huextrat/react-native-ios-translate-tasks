#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTComponent.h>
#import "RCTBridge.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConvert.h>
#import <ReactCommon/RCTTurboModule.h>
#import "RCTFabricComponentsPlugins.h"
#endif

#if __has_include("IOSTranslateTasks/IOSTranslateTasks-Swift.h")
#import "IOSTranslateTasks/IOSTranslateTasks-Swift.h"
#else
#import "IOSTranslateTasks-Swift.h"
#endif

@interface IOSTranslateTasksViewManager : RCTViewManager
@end

@implementation IOSTranslateTasksViewManager

RCT_EXPORT_MODULE(IOSTranslateTasksView)

- (UIView *)view
{
    IOSTranslateTasksProvider *view = [[IOSTranslateTasksProvider alloc] init];
    return view;
}

RCT_EXPORT_VIEW_PROPERTY(texts, NSArray)
RCT_EXPORT_VIEW_PROPERTY(shouldTranslate, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTDirectEventBlock)

#ifdef RCT_NEW_ARCH_ENABLED
+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
#endif

@end