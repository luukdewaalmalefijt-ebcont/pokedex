// The following file was taken from here:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-lazyload/index.d.ts
// and adjusted to account for react-lazyload v3.2.0 which added 'className' support.
// TODO: proper fork or pull-request with fix

// Type definitions for react-lazyload ver 3.1
// Project: https://github.com/jasonslyvia/react-lazyload
// Definitions by: m0a <https://github.com/m0a>
//                 svobik7 <https://github.com/svobik7>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

// import { Component, ReactNode, CSSProperties } from 'react';

declare module 'react-lazyload';

// declare module 'react-lazyload' {
//   export interface LazyLoadProps {
//       once?: boolean;
//       height?: number | string;
//       offset?: number | number[];
//       overflow?: boolean;
//       resize?: boolean;
//       scroll?: boolean;
//       children?: ReactNode;
//       throttle?: number | boolean;
//       debounce?: number | boolean;
//       placeholder?: ReactNode;
//       scrollContainer?: string | Element;
//       unmountIfInvisible?: boolean;
//       preventLoading?: boolean;
//       classNamePrefix?: string;
//       className?: string;
//       style?: CSSProperties;
//   }
//
//   export default class LazyLoad extends Component<LazyLoadProps> {
//       constructor(props: LazyLoad);
//   }
//
//   export function lazyload(option: {}): LazyLoad;
//
//   export function forceCheck(): void;
//
//   export function forceVisible(): void;
// }