"use strict";
// ['page', 'limit', 'sortBy', 'sortOrder']
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.default = pick;
// const paginationOptions = {
//   page: Number(req.query.page),
//   limit: Number(req.query.limit),
//   sortBy: req.query.sortBy,
//   sortOrder: req.query.sortOrder,
// };
