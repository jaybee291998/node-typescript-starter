"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonBlocking = exports.blocking = void 0;
var readfile_1 = require("./readfile");
Object.defineProperty(exports, "blocking", { enumerable: true, get: function () { return readfile_1.blocking; } });
Object.defineProperty(exports, "nonBlocking", { enumerable: true, get: function () { return readfile_1.nonBlocking; } });
