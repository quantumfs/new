"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.RGB = function(imageData) {
    var data = imageData.data,
        nPixels = data.length,
        red = this.red(),
        green = this.green(),
        blue = this.blue(),
        i, brightness;
    for (i = 0; i < nPixels; i += 4) {
        brightness =
            (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
        data[i] = brightness * red;
        data[i + 1] = brightness * green;
        data[i + 2] = brightness * blue;
        data[i + 3] = data[i + 3];
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'red', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    } else if (val < 0) {
        return 0;
    } else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'green', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    } else if (val < 0) {
        return 0;
    } else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'blue', 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);