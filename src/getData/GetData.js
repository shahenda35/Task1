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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ApplicationForm_1 = require("../dataClass/ApplicationForm");
const apiUrl = "http://127.0.0.1:4010/api/887.7935644644983/programs/enim/application-form";
const MyComponent = () => {
    var _a, _b, _c;
    //ApplicationForm data = new ApplicationForm(); bel setters wel getters
    const [data, setData] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }
                else {
                    const jsonObject = yield response.json();
                    const appForm = new ApplicationForm_1.ApplicationForm(jsonObject["data"]);
                    setData(appForm);
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        });
        fetchData();
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Fetched Data"),
        data ? (react_1.default.createElement("ul", null, (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.customisedQuestions) === null || _c === void 0 ? void 0 : _c.map((item, index) => (react_1.default.createElement("ul", { key: index },
            react_1.default.createElement("li", null,
                "ID: ",
                item.id),
            react_1.default.createElement("li", null,
                "Disqualify: ",
                item.disqualify),
            react_1.default.createElement("li", null,
                "Max Choice: ",
                item.maxChoice),
            react_1.default.createElement("li", null,
                "Other: ",
                item.other),
            react_1.default.createElement("li", null,
                "Question: ",
                item.questions),
            react_1.default.createElement("li", null,
                "Type: ",
                item.type)))))) : (react_1.default.createElement("p", null, "Loading data..."))));
};
exports.default = MyComponent;
