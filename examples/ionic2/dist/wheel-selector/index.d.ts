import { IonicNativePlugin } from '@ionic-native/core';
export interface WheelSelectorOptions {
    /**
     * The title of the selector's input box
     */
    title: string;
    /**
     * The items to display (array of items).
     * Example, 2 wheels:
     * [{description: "1", description: "2", description: "3"},
     * {description: "Apple", description: "Pear", description: "Banana"}]
     */
    items: {};
    /**
     * Which items to display by default, example ["2","Apple"] (if items.length is 2 for instance)
     */
    defaultItems?: any;
    /**
     * The 'ok' button text
     */
    positiveButtonText?: string;
    /**
     * The 'cancel' button text
     */
    negativeButtonText?: string;
    /**
     * Android only - theme color, 'light' or 'dark'.
     */
    theme?: string;
    /**
     * Whether to have the wheels 'wrap' (Android only)
     */
    wrapWheelText?: boolean;
    /**
     * The json key to display, by default it is description, this allows for setting any
     * key/value to be displayed
     */
    displayKey?: string;
}
export interface WheelSelectorData {
    data: any;
}
/**
 * @name WheelSelector Plugin
 * @description Native wheel selector for Cordova (Android/iOS).
 *
 * @usage
 * ```
 * import { WheelSelector } from 'ionic-native';
 *
 *
 * constructor(private selector: WheelSelector) { }
 *
 * ...
 *
 *
 * ```
 */
export declare class WheelSelector extends IonicNativePlugin {
    show(options: WheelSelectorOptions): Promise<WheelSelectorData>;
}
