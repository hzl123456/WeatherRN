//
//  CalendarManager.swift
//  WeatherRN
//
//  Created by hzl on 2017/5/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  @objc func addEvent() -> Void {
    UIAlertView.init(title: "title",message: "message",delegate: nil,cancelButtonTitle:"cancel").show()
  
  }
  
}
