import SwiftUI
import Translation

class Props: ObservableObject {
    @Published var texts: [String] = []
    @Published var onSuccess: (([String]) -> Void)?
    @Published var onError: ((String) -> Void)?
    @Published var shouldTranslate: Bool = false
    @Published var sourceLanguage: String?
    @Published var targetLanguage: String?
}

@available(iOS 18.0, *)
struct IOSTranslateTasks: View {
    @ObservedObject var props: Props
    @State private var configuration: TranslationSession.Configuration?
    
    var body: some View {
        Color.clear
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .translationTask(configuration) { session in
                    await translateSequence(session)
                }
                .onChange(of: props.shouldTranslate) { newValue in
                    if newValue {
                        triggerTranslation()
                        // Reset the flag after triggering
                        props.shouldTranslate = false
                    }
                }
                .onChange(of: [props.sourceLanguage, props.targetLanguage]) { _ in
                    configuration = .init(
                      source: props.sourceLanguage.map { Locale.Language(identifier: $0) },
                      target: props.targetLanguage.map { Locale.Language(identifier: $0) }
                    )
                }
    }

    private func triggerTranslation() {
        guard configuration == nil else {
            configuration?.invalidate()
            return
        }
        configuration = .init(
          source: props.sourceLanguage.map { Locale.Language(identifier: $0) },
          target: props.targetLanguage.map { Locale.Language(identifier: $0) }
        )
    }

    private func translateSequence(_ session: TranslationSession) async {
        Task { @MainActor in
            let texts: [TranslationSession.Request] =  props.texts.enumerated().map { (index, text) in
                .init(sourceText: text, clientIdentifier: "\(index)")
            }

            do {
                var translatedTexts = Array(repeating: "", count: props.texts.count)

                for try await response in session.translate(batch: texts) {
                    guard let index = Int(response.clientIdentifier ?? "") else { continue }
                    translatedTexts[index] = response.targetText
                }

                props.onSuccess?(translatedTexts)
            } catch let error {
                props.onError?(error.localizedDescription)
            }
        }
    }
}
