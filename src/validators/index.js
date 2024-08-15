"use strict";
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
exports.RequestValidator = void 0;
const jsonConverter_1 = require("../helpers/jsonConverter");
const RequestValidator = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validateAsync(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json(jsonConverter_1.dataToJSON(err).details.map((item) => ({
            message: item.message.replaceAll('"', ''),
            key: item.context.key,
        })));
    }
});
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=index.js.map