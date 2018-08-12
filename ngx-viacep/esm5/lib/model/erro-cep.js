/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ErrorValues } from './error-values.enum';
var ErroCep = /** @class */ (function (_super) {
    tslib_1.__extends(ErroCep, _super);
    function ErroCep(errorCode) {
        var _this = _super.call(this, ErrorValues[errorCode]) || this;
        _this.errorCode = errorCode;
        Object.setPrototypeOf(_this, ErroCep.prototype);
        return _this;
    }
    /**
     * Returns the Error code
     * @return {?}
     */
    ErroCep.prototype.getCode = /**
     * Returns the Error code
     * @return {?}
     */
    function () {
        return this.errorCode;
    };
    /**
     * Compares the thrown error type with an ErrorValues enum item
     * @param {?} type
     * @return {?}
     */
    ErroCep.prototype.ofType = /**
     * Compares the thrown error type with an ErrorValues enum item
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.getCode() === type;
    };
    return ErroCep;
}(Error));
export { ErroCep };
if (false) {
    /** @type {?} */
    ErroCep.prototype.errorCode;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyby1jZXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYnJ1bm9jL25neC12aWFjZXAvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvZXJyby1jZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsSUFBQTtJQUE2QixtQ0FBSztJQUVoQyxpQkFBcUIsU0FBc0I7UUFBM0MsWUFFRSxrQkFBTSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsU0FHOUI7UUFMb0IsZUFBUyxHQUFULFNBQVMsQ0FBYTtRQUl6QyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O0tBQ2hEOzs7OztJQUtNLHlCQUFPOzs7OztRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7OztJQU9qQix3QkFBTTs7Ozs7Y0FBQyxJQUFpQjtRQUM3QixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUM7O2tCQXZCbkM7RUFFNkIsS0FBSyxFQXVCakMsQ0FBQTtBQXZCRCxtQkF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Vycm9yVmFsdWVzfSBmcm9tICcuL2Vycm9yLXZhbHVlcy5lbnVtJztcblxuZXhwb3J0IGNsYXNzIEVycm9DZXAgZXh0ZW5kcyBFcnJvciB7XG5cbiAgY29uc3RydWN0b3IoIHByaXZhdGUgZXJyb3JDb2RlOiBFcnJvclZhbHVlcyApIHtcblxuICAgIHN1cGVyKEVycm9yVmFsdWVzW2Vycm9yQ29kZV0pO1xuXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEVycm9DZXAucHJvdG90eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBFcnJvciBjb2RlXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29kZSgpOiBFcnJvclZhbHVlcyB7XG4gICAgcmV0dXJuIHRoaXMuZXJyb3JDb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSB0aHJvd24gZXJyb3IgdHlwZSB3aXRoIGFuIEVycm9yVmFsdWVzIGVudW0gaXRlbVxuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgcHVibGljIG9mVHlwZSh0eXBlOiBFcnJvclZhbHVlcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldENvZGUoKSA9PT0gdHlwZTtcbiAgfVxufVxuIl19