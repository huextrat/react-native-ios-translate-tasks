package com.iostranslatetasks

import android.graphics.Color
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.IOSTranslateTasksViewManagerInterface
import com.facebook.react.viewmanagers.IOSTranslateTasksViewManagerDelegate

@ReactModule(name = IOSTranslateTasksViewManager.NAME)
class IOSTranslateTasksViewManager : SimpleViewManager<IOSTranslateTasksView>(),
  IOSTranslateTasksViewManagerInterface<IOSTranslateTasksView> {
  private val mDelegate: ViewManagerDelegate<IOSTranslateTasksView>

  init {
    mDelegate = IOSTranslateTasksViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<IOSTranslateTasksView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): IOSTranslateTasksView {
    return IOSTranslateTasksView(context)
  }

  @ReactProp(name = "texts")
  override fun setTexts(view: IOSTranslateTasksView, texts: ReadableArray?) {
    // No-op implementation since this is iOS-only
  }

  @ReactProp(name = "shouldTranslate")
  override fun setShouldTranslate(view: IOSTranslateTasksView, value: Boolean) {
    // No-op implementation since this is iOS-only
  }

  @ReactProp(name = "sourceLanguage")
  override fun setSourceLanguage(view: IOSTranslateTasksView, value: String?) {
    // No-op implementation since this is iOS-only
  }

  @ReactProp(name = "targetLanguage")
  override fun setTargetLanguage(view: IOSTranslateTasksView, value: String?) {
    // No-op implementation since this is iOS-only
  }

  companion object {
    const val NAME = "IOSTranslateTasksView"
  }
}
