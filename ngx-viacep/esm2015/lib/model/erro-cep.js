/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ErrorValues } from './error-values.enum';
export class ErroCep extends Error {
    /**
     * @param {?} errorCode
     */
    constructor(errorCode) {
        super(ErrorValues[errorCode]);
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, ErroCep.prototype);
    }
    /**
     * Returns the Error code
     * @return {?}
     */
    getCode() {
        return this.errorCode;
    }
    /**
     * Compares the thrown error type with an ErrorValues enum item
     * @param {?} type
     * @return {?}
     */
    ofType(type) {
        return this.getCode() === type;
    }
}
if (false) {
    /** @type {?} */
    ErroCep.prototype.errorCode;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyby1jZXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYnJ1bm9jL25neC12aWFjZXAvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvZXJyby1jZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxNQUFNLGNBQWUsU0FBUSxLQUFLOzs7O0lBRWhDLFlBQXFCLFNBQXNCO1FBRXpDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUZYLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFJekMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2hEOzs7OztJQUtNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7SUFPakIsTUFBTSxDQUFDLElBQWlCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQzs7Q0FFbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Vycm9yVmFsdWVzfSBmcm9tICcuL2Vycm9yLXZhbHVlcy5lbnVtJztcblxuZXhwb3J0IGNsYXNzIEVycm9DZXAgZXh0ZW5kcyBFcnJvciB7XG5cbiAgY29uc3RydWN0b3IoIHByaXZhdGUgZXJyb3JDb2RlOiBFcnJvclZhbHVlcyApIHtcblxuICAgIHN1cGVyKEVycm9yVmFsdWVzW2Vycm9yQ29kZV0pO1xuXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEVycm9DZXAucHJvdG90eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBFcnJvciBjb2RlXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29kZSgpOiBFcnJvclZhbHVlcyB7XG4gICAgcmV0dXJuIHRoaXMuZXJyb3JDb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSB0aHJvd24gZXJyb3IgdHlwZSB3aXRoIGFuIEVycm9yVmFsdWVzIGVudW0gaXRlbVxuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgcHVibGljIG9mVHlwZSh0eXBlOiBFcnJvclZhbHVlcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldENvZGUoKSA9PT0gdHlwZTtcbiAgfVxufVxuIl19