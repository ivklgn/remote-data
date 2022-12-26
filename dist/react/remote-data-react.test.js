"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@testing-library/react");
var RD = __importStar(require("../core/index"));
var RDR = __importStar(require("./index"));
afterEach(react_2.cleanup);
var MyComponent = function (_a) {
    var data = _a.data;
    return RDR.fold(data, {
        notAsked: function () { return react_1.default.createElement("div", null, "no-data"); },
        loading: function () { return react_1.default.createElement("div", null, "loading.."); },
        success: function (n) { return react_1.default.createElement("div", null,
            "Count: ",
            n); },
        failure: function (e) { return react_1.default.createElement("div", null,
            "App Error: ",
            e.message); },
    });
};
describe('RemoteData react', function () {
    test('...', function () {
        var _a = (0, react_2.render)(react_1.default.createElement(MyComponent, { data: RD.notAsked() })), getByText = _a.getByText, rerender = _a.rerender;
        expect(getByText('no-data')).toBeDefined();
        rerender(react_1.default.createElement(MyComponent, { data: RD.loading() }));
        expect(getByText('loading..')).toBeDefined();
        rerender(react_1.default.createElement(MyComponent, { data: RD.success(1) }));
        expect(getByText('Count: 1')).toBeDefined();
        rerender(react_1.default.createElement(MyComponent, { data: RD.failure(new Error('Something went wrong')) }));
        expect(getByText('App Error: Something went wrong')).toBeDefined();
    });
});
//# sourceMappingURL=remote-data-react.test.js.map