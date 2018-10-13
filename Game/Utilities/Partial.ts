import { NextScreenChoices } from "../ScreenDisplay";

type __ = undefined;

type Function0<R> = () => R;
type Function1<T1, R> = (t1: T1) => R;
type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;
type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
type Function4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;

// interface Partial {
//     // arity 0
//     <R>(func: Function0<R>): Function0<R>;
//     // arity 1
//     <T1, R>(func: Function1<T1, R>): Function1<T1, R>;
//     <T1, R>(func: Function1<T1, R>, arg1: T1): Function0<R>;
//     // arity 2
//     <T1, T2, R>(func: Function2<T1, T2, R>): Function2<T1, T2, R>;
//     <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1): Function1<T2, R>;
//     <T1, T2, R>(func: Function2<T1, T2, R>, plc1: __, arg2: T2): Function1<T1, R>;
//     <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1, arg2: T2): Function0<R>;
//     // arity 3
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>): Function3<T1, T2, T3, R>;
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1): Function2<T2, T3, R>;
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: __, arg2: T2): Function2<T1, T3, R>;
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2): Function1<T3, R>;
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: __, plc2: __, arg3: T3): Function2<T1, T2, R>;
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, plc2: __, arg3: T3): Function1<T2, R>;
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: __, arg2: T2, arg3: T3): Function1<T1, R>;
//     <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2, arg3: T3): Function0<R>;
//     // arity 4
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>): Function4<T1, T2, T3, T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1): Function3<T2, T3, T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: __, arg2: T2): Function3<T1, T3, T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2): Function2<T3, T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: __, plc2: __, arg3: T3): Function3<T1, T2, T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: __, arg3: T3): Function2<T2, T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: __, arg2: T2, arg3: T3): Function2<T1, T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3): Function1<T4, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: __, plc2: __, plc3: __, arg4: T4): Function3<T1, T2, T3, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: __, plc3: __, arg4: T4): Function2<T2, T3, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: __, arg2: T2, plc3: __, arg4: T4): Function2<T1, T3, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, plc3: __, arg4: T4): Function1<T3, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: __, plc2: __, arg3: T3, arg4: T4): Function2<T1, T2, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: __, arg3: T3, arg4: T4): Function1<T2, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: __, arg2: T2, arg3: T3, arg4: T4): Function1<T1, R>;
//     <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3, arg4: T4): Function0<R>;
// }

interface Partial {
    <R>(func: Function0<R>): Function0<R>;
    <T1, R>(func: Function1<T1, R>, arg1: T1): Function0<R>;
    <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1, arg2: T2): Function0<R>;
    <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2, arg3: T3): Function0<R>;
    <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3, arg4: T4): Function0<R>;
}

export const partial: Partial = (func: (...args: any[]) => any, ...args: any[]): (...args: any[]) => any => {
    const wrapper = (...wrapperArgs: any[]): any => {
        return func(args);
    };
    Object.defineProperty(wrapper, "name", { value: func.name });
    return wrapper;
};
