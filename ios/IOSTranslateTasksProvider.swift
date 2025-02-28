import UIKit
import React
import SwiftUI

extension UIView {
    func pinEdges(to view: UIView) {
        translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            leadingAnchor.constraint(equalTo: view.leadingAnchor),
            trailingAnchor.constraint(equalTo: view.trailingAnchor),
            topAnchor.constraint(equalTo: view.topAnchor),
            bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
}

public typealias RCTBubblingEventBlock = @convention(block) (_ body: [AnyHashable: Any]?) -> Void

@objc public class IOSTranslateTasksProvider: UIView {
    private var props = Props()
    private var hostingController: UIHostingController<AnyView>?
    
    @objc public var texts: [String] = [] {
        didSet {
            props.texts = texts
        }
    }

    @objc public var sourceLanguage: String? {
        didSet {
            props.sourceLanguage = sourceLanguage
        }
    }

    @objc public var targetLanguage: String? {
        didSet {
            props.targetLanguage = targetLanguage
        }
    }

    @objc public var onSuccess: RCTBubblingEventBlock? {
        didSet {
            props.onSuccess = { [weak self] translatedTexts in
                self?.onSuccess?(["translatedTexts": translatedTexts])
            }
        }
    }

    @objc public var onError: RCTBubblingEventBlock? {
        didSet {
            props.onError = { [weak self] error in
                self?.onError?(["error": error])
            }
        }
    }

    @objc public var shouldTranslate: Bool = false {
        didSet {
            if #available(iOS 18.0, *) {
                props.shouldTranslate = shouldTranslate
                hostingController?.view.isHidden = !shouldTranslate
            } else {
                onError?(["error": "iOS 18 or higher is required for translation functionality"])
            }
        }
    }

    public override func layoutSubviews() {
        super.layoutSubviews()
        setupView()
    }
    
    private func setupView() {
        if self.hostingController != nil {
            return
        }
        
        if #available(iOS 18.0, *) {
          let translateTasks = IOSTranslateTasks(props: props)
          self.hostingController = UIHostingController(rootView: AnyView(translateTasks))

          if let hostingController = self.hostingController {
              hostingController.view.isHidden = !shouldTranslate
              addSubview(hostingController.view)
              hostingController.view.pinEdges(to: self)
              reactAddController(toClosestParent: hostingController)
          }
        }
    }
}
