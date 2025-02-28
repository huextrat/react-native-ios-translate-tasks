#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface IOSTranslateTasksViewManager : RCTViewManager
@end

@implementation IOSTranslateTasksViewManager

RCT_EXPORT_MODULE(IOSTranslateTasksView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
