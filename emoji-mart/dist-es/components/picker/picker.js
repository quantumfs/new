import _extends from '../../polyfills/extends';
import _Object$getPrototypeOf from '../../polyfills/objectGetPrototypeOf';
import _classCallCheck from '../../polyfills/classCallCheck';
import _createClass from '../../polyfills/createClass';
import _possibleConstructorReturn from '../../polyfills/possibleConstructorReturn';
import _inherits from '../../polyfills/inherits';
import React from 'react';

import data from '../../../data/all.json';
import NimblePicker from './nimble-picker';

import {
    PickerPropTypes
} from '../../utils/shared-props';
import {
    PickerDefaultProps
} from '../../utils/shared-default-props';

var Picker = function(_React$PureComponent) {
    _inherits(Picker, _React$PureComponent);

    function Picker() {
        _classCallCheck(this, Picker);

        return _possibleConstructorReturn(this, (Picker.__proto__ || _Object$getPrototypeOf(Picker)).apply(this, arguments));
    }

    _createClass(Picker, [{
        key: 'render',
        value: function render() {
            return React.createElement(NimblePicker, _extends({}, this.props, this.state));
        }
    }]);

    return Picker;
}(React.PureComponent);

export default Picker;


Picker.propTypes /* remove-proptypes */ = PickerPropTypes;
Picker.defaultProps = _extends({}, PickerDefaultProps, {
    data: data
});