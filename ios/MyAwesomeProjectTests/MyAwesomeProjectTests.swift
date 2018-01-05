/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import UIKit
import XCTest

private let timeoutSeconds = 600
private let textToLookFor = "Welcome to React Native!"

class MyAwesomeProjectTests: XCTestCase {
  func findSubview(in view: UIView, matching test: @escaping (UIView) -> Bool) -> Bool {
    if test(view) {
      return true
    }
    for subview in view.subviews {
      if findSubview(in: subview, matching: test) {
        return true
      }
    }
    return false
  }
  
  func testRendersWelcomeScreen() {
    guard let vc = RCTSharedApplication()?.delegate?.window??.rootViewController else {
      XCTFail("Root view controller was nil")
      return
    }
    let date = Date(timeIntervalSinceNow: TimeInterval(timeoutSeconds))
    var foundElement = false
    
    var redboxError: String? = nil
    RCTSetLogFunction { level, source, fileName, lineNumber, message in
      if level.rawValue >= RCTLogLevel.error.rawValue {
        redboxError = message
      }
    }
    
    while date.timeIntervalSinceNow > 0 && !foundElement && redboxError == nil {
      RunLoop.main.run(mode: .defaultRunLoopMode, before: Date(timeIntervalSinceNow: 0.1))
      RunLoop.main.run(mode: .commonModes, before: Date(timeIntervalSinceNow: 0.1))
      
      foundElement = findSubview(in: vc.view) { $0.accessibilityLabel == textToLookFor }
    }
    
    RCTSetLogFunction(RCTDefaultLogFunction)
    
    XCTAssertNil(redboxError, "RedBox error: \(redboxError!)")
    XCTAssertTrue(foundElement, "Couldn't find element with text '\(textToLookFor)' in \(timeoutSeconds) seconds")
  }
}
