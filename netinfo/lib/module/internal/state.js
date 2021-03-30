import _regeneratorRuntime from"@babel/runtime/regenerator";import _objectSpread from"@babel/runtime/helpers/objectSpread";import _classCallCheck from"@babel/runtime/helpers/classCallCheck";import NativeInterface from'./nativeInterface';import InternetReachability from'./internetReachability';import*as PrivateTypes from'./privateTypes';var State=function State(configuration){var _this=this;_classCallCheck(this,State);this._nativeEventSubscription=null;this._subscriptions=new Set();this._latestState=null;this._handleNativeStateUpdate=function(state){_this._internetReachability.update(state);var convertedState=_this._convertState(state);_this._latestState=convertedState;_this._subscriptions.forEach(function(handler){return handler(convertedState);});};this._handleInternetReachabilityUpdate=function(isInternetReachable){if(!_this._latestState){return;}var nextState=_objectSpread({},_this._latestState,{isInternetReachable:isInternetReachable});_this._latestState=nextState;_this._subscriptions.forEach(function(handler){return handler(nextState);});};this._fetchCurrentState=function _callee(requestedInterface){var state,convertedState;return _regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return _regeneratorRuntime.awrap(NativeInterface.getCurrentState(requestedInterface));case 2:state=_context.sent;_this._internetReachability.update(state);convertedState=_this._convertState(state);if(!requestedInterface){_this._latestState=convertedState;}return _context.abrupt("return",convertedState);case 7:case"end":return _context.stop();}}},null,this);};this._convertState=function(input){if(typeof input.isInternetReachable==='boolean'){return input;}else{return _objectSpread({},input,{isInternetReachable:_this._internetReachability.currentState()});}};this.latest=function(requestedInterface){if(requestedInterface){return _this._fetchCurrentState(requestedInterface);}else if(_this._latestState){return Promise.resolve(_this._latestState);}else{return _this._fetchCurrentState();}};this.add=function(handler){_this._subscriptions.add(handler);if(_this._latestState){handler(_this._latestState);}else{_this.latest().then(handler);}};this.remove=function(handler){_this._subscriptions.delete(handler);};this.tearDown=function(){if(_this._internetReachability){_this._internetReachability.tearDown();}if(_this._nativeEventSubscription){_this._nativeEventSubscription.remove();}_this._subscriptions.clear();};this._internetReachability=new InternetReachability(configuration,this._handleInternetReachabilityUpdate);this._nativeEventSubscription=NativeInterface.eventEmitter.addListener(PrivateTypes.DEVICE_CONNECTIVITY_EVENT,this._handleNativeStateUpdate);this._fetchCurrentState();};export{State as default};
//# sourceMappingURL=state.js.map