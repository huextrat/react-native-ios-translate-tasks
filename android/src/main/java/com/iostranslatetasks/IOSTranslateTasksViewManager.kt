package com.iostranslatetasks

import android.graphics.Color
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

  @ReactProp(name = "color")
  override fun setColor(view: IOSTranslateTasksView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "IOSTranslateTasksView"
  }
}
