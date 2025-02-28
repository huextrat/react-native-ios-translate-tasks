#ifdef RCT_NEW_ARCH_ENABLED
#import "IOSTranslateTasksView.h"
#import <React/RCTConvert.h>
#import <React/RCTFabricComponentsPlugins.h>

#if __has_include("IOSTranslateTasks/IOSTranslateTasks-Swift.h")
#import "IOSTranslateTasks/IOSTranslateTasks-Swift.h"
#else
#import "IOSTranslateTasks-Swift.h"
#endif

#import "generated/RNIOSTranslateTasksViewSpec/ComponentDescriptors.h"
#import "generated/RNIOSTranslateTasksViewSpec/EventEmitters.h"
#import "generated/RNIOSTranslateTasksViewSpec/Props.h"
#import "generated/RNIOSTranslateTasksViewSpec/RCTComponentViewHelpers.h"

using namespace facebook::react;

@interface IOSTranslateTasksView () <RCTIOSTranslateTasksViewViewProtocol>
@end

@implementation IOSTranslateTasksView {
    IOSTranslateTasksProvider *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<IOSTranslateTasksViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const IOSTranslateTasksViewProps>();
        _props = defaultProps;
        _view = [[IOSTranslateTasksProvider alloc] init];

        __weak __typeof__(self) weakSelf = self;
        
        _view.onSuccess = ^(NSDictionary *translationResult) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                NSArray *translatedTexts = translationResult[@"translatedTexts"];
                std::vector<std::string> translatedTextsVector;
                
                for (NSString *text in translatedTexts) {
                    translatedTextsVector.push_back([text UTF8String]);
                }
                
                std::dynamic_pointer_cast<const IOSTranslateTasksViewEventEmitter>(strongSelf->_eventEmitter)
                    ->onSuccess({.translatedTexts = translatedTextsVector});
            }
        };

        _view.onError = ^(NSDictionary *error) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                std::dynamic_pointer_cast<const IOSTranslateTasksViewEventEmitter>(strongSelf->_eventEmitter)
                    ->onError({.error = [error[@"error"] UTF8String]});
            }
        };

        self.contentView = _view;
    }
    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<const IOSTranslateTasksViewProps>(_props);
    const auto &newViewProps = *std::static_pointer_cast<const IOSTranslateTasksViewProps>(props);

    if (oldViewProps.texts != newViewProps.texts) {
        NSMutableArray *textsArray = [NSMutableArray array];
        for (const auto &text : newViewProps.texts) {
            NSString *nsText = [NSString stringWithUTF8String:text.c_str()];
            [textsArray addObject:nsText];
        }
        _view.texts = textsArray;
    }

    if (oldViewProps.shouldTranslate != newViewProps.shouldTranslate) {
        _view.shouldTranslate = newViewProps.shouldTranslate;
    }

    if (oldViewProps.sourceLanguage != newViewProps.sourceLanguage) {
        if (newViewProps.sourceLanguage.empty()) {
            _view.sourceLanguage = nil;
        } else {
            _view.sourceLanguage = [NSString stringWithUTF8String:newViewProps.sourceLanguage.c_str()];
        }
    }

    if (oldViewProps.targetLanguage != newViewProps.targetLanguage) {
        if (newViewProps.targetLanguage.empty()) {
            _view.targetLanguage = nil;
        } else {
            _view.targetLanguage = [NSString stringWithUTF8String:newViewProps.targetLanguage.c_str()];
        }
    }

    [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> IOSTranslateTasksViewCls(void)
{
    return IOSTranslateTasksView.class;
}
#endif