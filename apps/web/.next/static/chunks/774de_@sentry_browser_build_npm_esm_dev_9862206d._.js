(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventFromException",
    ()=>eventFromException,
    "eventFromMessage",
    ()=>eventFromMessage,
    "eventFromUnknownInput",
    ()=>eventFromUnknownInput,
    "exceptionFromError",
    ()=>exceptionFromError,
    "extractMessage",
    ()=>extractMessage,
    "extractType",
    ()=>extractType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$enhanceErrorWithSentryInfo__as__$5f$INTERNAL_enhanceErrorWithSentryInfo$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/eventbuilder.js [app-client] (ecmascript) <export _enhanceErrorWithSentryInfo as _INTERNAL_enhanceErrorWithSentryInfo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/syncpromise.js [app-client] (ecmascript)");
;
/**
 * This function creates an exception from a JavaScript Error
 */ function exceptionFromError(stackParser, ex) {
    // Get the frames first since Opera can lose the stack if we touch anything else first
    const frames = parseStackFrames(stackParser, ex);
    const exception = {
        type: extractType(ex),
        value: extractMessage(ex)
    };
    if (frames.length) {
        exception.stacktrace = {
            frames
        };
    }
    if (exception.type === undefined && exception.value === '') {
        exception.value = 'Unrecoverable error caught';
    }
    return exception;
}
function eventFromPlainObject(stackParser, exception, syntheticException, isUnhandledRejection) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    const normalizeDepth = client === null || client === void 0 ? void 0 : client.getOptions().normalizeDepth;
    // If we can, we extract an exception from the object properties
    const errorFromProp = getErrorPropertyFromObject(exception);
    const extra = {
        __serialized__: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeToSize"])(exception, normalizeDepth)
    };
    if (errorFromProp) {
        return {
            exception: {
                values: [
                    exceptionFromError(stackParser, errorFromProp)
                ]
            },
            extra
        };
    }
    const event = {
        exception: {
            values: [
                {
                    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEvent"])(exception) ? exception.constructor.name : isUnhandledRejection ? 'UnhandledRejection' : 'Error',
                    value: getNonErrorObjectExceptionValue(exception, {
                        isUnhandledRejection
                    })
                }
            ]
        },
        extra
    };
    if (syntheticException) {
        const frames = parseStackFrames(stackParser, syntheticException);
        if (frames.length) {
            // event.exception.values[0] has been set above
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            event.exception.values[0].stacktrace = {
                frames
            };
        }
    }
    return event;
}
function eventFromError(stackParser, ex) {
    return {
        exception: {
            values: [
                exceptionFromError(stackParser, ex)
            ]
        }
    };
}
/** Parses stack frames from an error */ function parseStackFrames(stackParser, ex) {
    // Access and store the stacktrace property before doing ANYTHING
    // else to it because Opera is not very good at providing it
    // reliably in other circumstances.
    const stacktrace = ex.stacktrace || ex.stack || '';
    const skipLines = getSkipFirstStackStringLines(ex);
    const framesToPop = getPopFirstTopFrames(ex);
    try {
        return stackParser(stacktrace, skipLines, framesToPop);
    } catch (e) {
    // no-empty
    }
    return [];
}
// Based on our own mapping pattern - https://github.com/getsentry/sentry/blob/9f08305e09866c8bd6d0c24f5b0aabdd7dd6c59c/src/sentry/lang/javascript/errormapping.py#L83-L108
const reactMinifiedRegexp = /Minified React error #\d+;/i;
/**
 * Certain known React errors contain links that would be falsely
 * parsed as frames. This function check for these errors and
 * returns number of the stack string lines to skip.
 */ function getSkipFirstStackStringLines(ex) {
    if (ex && reactMinifiedRegexp.test(ex.message)) {
        return 1;
    }
    return 0;
}
/**
 * If error has `framesToPop` property, it means that the
 * creator tells us the first x frames will be useless
 * and should be discarded. Typically error from wrapper function
 * which don't point to the actual location in the developer's code.
 *
 * Example: https://github.com/zertosh/invariant/blob/master/invariant.js#L46
 */ function getPopFirstTopFrames(ex) {
    if (typeof ex.framesToPop === 'number') {
        return ex.framesToPop;
    }
    return 0;
}
// https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Exception
// @ts-expect-error - WebAssembly.Exception is a valid class
function isWebAssemblyException(exception) {
    // Check for support
    // @ts-expect-error - WebAssembly.Exception is a valid class
    // oxlint-disable-next-line typescript/prefer-optional-chain
    if (typeof WebAssembly !== 'undefined' && typeof WebAssembly.Exception !== 'undefined') {
        // @ts-expect-error - WebAssembly.Exception is a valid class
        return exception instanceof WebAssembly.Exception;
    } else {
        return false;
    }
}
/**
 * Extracts from errors what we use as the exception `type` in error events.
 *
 * Usually, this is the `name` property on Error objects but WASM errors need to be treated differently.
 */ function extractType(ex) {
    const name = ex === null || ex === void 0 ? void 0 : ex.name;
    // The name for WebAssembly.Exception Errors needs to be extracted differently.
    // Context: https://github.com/getsentry/sentry-javascript/issues/13787
    if (!name && isWebAssemblyException(ex)) {
        // Emscripten sets array[type, message] to the "message" property on the WebAssembly.Exception object
        const hasTypeInMessage = ex.message && Array.isArray(ex.message) && ex.message.length == 2;
        return hasTypeInMessage ? ex.message[0] : 'WebAssembly.Exception';
    }
    return name;
}
/**
 * There are cases where stacktrace.message is an Event object
 * https://github.com/getsentry/sentry-javascript/issues/1949
 * In this specific case we try to extract stacktrace.message.error.message
 */ function extractMessage(ex) {
    const message = ex === null || ex === void 0 ? void 0 : ex.message;
    if (isWebAssemblyException(ex)) {
        // For Node 18, Emscripten sets array[type, message] to the "message" property on the WebAssembly.Exception object
        if (Array.isArray(ex.message) && ex.message.length == 2) {
            return ex.message[1];
        }
        return 'wasm exception';
    }
    if (!message) {
        return 'No error message';
    }
    if (message.error && typeof message.error.message === 'string') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$enhanceErrorWithSentryInfo__as__$5f$INTERNAL_enhanceErrorWithSentryInfo$3e$__["_INTERNAL_enhanceErrorWithSentryInfo"])(message.error);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$enhanceErrorWithSentryInfo__as__$5f$INTERNAL_enhanceErrorWithSentryInfo$3e$__["_INTERNAL_enhanceErrorWithSentryInfo"])(ex);
}
/**
 * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
 * @hidden
 */ function eventFromException(stackParser, exception, hint, attachStacktrace) {
    const syntheticException = (hint === null || hint === void 0 ? void 0 : hint.syntheticException) || undefined;
    const event = eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event); // defaults to { type: 'generic', handled: true }
    event.level = 'error';
    if (hint === null || hint === void 0 ? void 0 : hint.event_id) {
        event.event_id = hint.event_id;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvedSyncPromise"])(event);
}
/**
 * Builds and Event from a Message
 * @hidden
 */ function eventFromMessage(stackParser, message) {
    let level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 'info', hint = arguments.length > 3 ? arguments[3] : void 0, attachStacktrace = arguments.length > 4 ? arguments[4] : void 0;
    const syntheticException = (hint === null || hint === void 0 ? void 0 : hint.syntheticException) || undefined;
    const event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
    event.level = level;
    if (hint === null || hint === void 0 ? void 0 : hint.event_id) {
        event.event_id = hint.event_id;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvedSyncPromise"])(event);
}
/**
 * @hidden
 */ function eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace, isUnhandledRejection) {
    let event;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isErrorEvent"])(exception) && exception.error) {
        // If it is an ErrorEvent with `error` property, extract it to get actual Error
        const errorEvent = exception;
        return eventFromError(stackParser, errorEvent.error);
    }
    // If it is a `DOMError` (which is a legacy API, but still supported in some browsers) then we just extract the name
    // and message, as it doesn't provide anything else. According to the spec, all `DOMExceptions` should also be
    // `Error`s, but that's not the case in IE11, so in that case we treat it the same as we do a `DOMError`.
    //
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    // https://webidl.spec.whatwg.org/#es-DOMException-specialness
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDOMError"])(exception) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDOMException"])(exception)) {
        const domException = exception;
        if ('stack' in exception) {
            event = eventFromError(stackParser, exception);
        } else {
            const name = domException.name || ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDOMError"])(domException) ? 'DOMError' : 'DOMException');
            const message = domException.message ? "".concat(name, ": ").concat(domException.message) : name;
            event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionTypeValue"])(event, message);
        }
        if ('code' in domException) {
            // eslint-disable-next-line deprecation/deprecation
            event.tags = {
                ...event.tags,
                'DOMException.code': "".concat(domException.code)
            };
        }
        return event;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(exception)) {
        // we have a real Error object, do nothing
        return eventFromError(stackParser, exception);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlainObject"])(exception) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEvent"])(exception)) {
        // If it's a plain object or an instance of `Event` (the built-in JS kind, not this SDK's `Event` type), serialize
        // it manually. This will allow us to group events based on top-level keys which is much better than creating a new
        // group on any key/value change.
        const objectException = exception;
        event = eventFromPlainObject(stackParser, objectException, syntheticException, isUnhandledRejection);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
            synthetic: true
        });
        return event;
    }
    // If none of previous checks were valid, then it means that it's not:
    // - an instance of DOMError
    // - an instance of DOMException
    // - an instance of Event
    // - an instance of Error
    // - a valid ErrorEvent (one with an error property)
    // - a plain Object
    //
    // So bail out and capture it as a simple message:
    event = eventFromString(stackParser, exception, syntheticException, attachStacktrace);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionTypeValue"])(event, "".concat(exception), undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
        synthetic: true
    });
    return event;
}
function eventFromString(stackParser, message, syntheticException, attachStacktrace) {
    const event = {};
    if (attachStacktrace && syntheticException) {
        const frames = parseStackFrames(stackParser, syntheticException);
        if (frames.length) {
            event.exception = {
                values: [
                    {
                        value: message,
                        stacktrace: {
                            frames
                        }
                    }
                ]
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
            synthetic: true
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isParameterizedString"])(message)) {
        const { __sentry_template_string__, __sentry_template_values__ } = message;
        event.logentry = {
            message: __sentry_template_string__,
            params: __sentry_template_values__
        };
        return event;
    }
    event.message = message;
    return event;
}
function getNonErrorObjectExceptionValue(exception, param) {
    let { isUnhandledRejection } = param;
    const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractExceptionKeysForMessage"])(exception);
    const captureType = isUnhandledRejection ? 'promise rejection' : 'exception';
    // Some ErrorEvent instances do not have an `error` property, which is why they are not handled before
    // We still want to try to get a decent message for these cases
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isErrorEvent"])(exception)) {
        return "Event `ErrorEvent` captured as ".concat(captureType, " with message `").concat(exception.message, "`");
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEvent"])(exception)) {
        const className = getObjectClassName(exception);
        return "Event `".concat(className, "` (type=").concat(exception.type, ") captured as ").concat(captureType);
    }
    return "Object captured as ".concat(captureType, " with keys: ").concat(keys);
}
function getObjectClassName(obj) {
    try {
        const prototype = Object.getPrototypeOf(obj);
        return prototype ? prototype.constructor.name : undefined;
    } catch (e) {
    // ignore errors here
    }
}
/** If a plain object has a property that is an `Error`, return this error. */ function getErrorPropertyFromObject(obj) {
    return Object.values(obj).find((v)=>v instanceof Error);
}
;
 //# sourceMappingURL=eventbuilder.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WINDOW",
    ()=>WINDOW,
    "getHttpRequestData",
    ()=>getHttpRequestData,
    "ignoreNextOnError",
    ()=>ignoreNextOnError,
    "shouldIgnoreOnError",
    ()=>shouldIgnoreOnError,
    "wrap",
    ()=>wrap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/browser.js [app-client] (ecmascript)");
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
let ignoreOnError = 0;
/**
 * @hidden
 */ function shouldIgnoreOnError() {
    return ignoreOnError > 0;
}
/**
 * @hidden
 */ function ignoreNextOnError() {
    // onerror should trigger before setTimeout
    ignoreOnError++;
    setTimeout(()=>{
        ignoreOnError--;
    });
}
// eslint-disable-next-line @typescript-eslint/ban-types
/**
 * Instruments the given function and sends an event to Sentry every time the
 * function throws an exception.
 *
 * @param fn A function to wrap. It is generally safe to pass an unbound function, because the returned wrapper always
 * has a correct `this` context.
 * @returns The wrapped function.
 * @hidden
 */ function wrap(fn) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    // for future readers what this does is wrap a function and then create
    // a bi-directional wrapping between them.
    //
    // example: wrapped = wrap(original);
    //  original.__sentry_wrapped__ -> wrapped
    //  wrapped.__sentry_original__ -> original
    function isFunction(fn) {
        return typeof fn === 'function';
    }
    if (!isFunction(fn)) {
        return fn;
    }
    try {
        // if we're dealing with a function that was previously wrapped, return
        // the original wrapper.
        const wrapper = fn.__sentry_wrapped__;
        if (wrapper) {
            if (typeof wrapper === 'function') {
                return wrapper;
            } else {
                // If we find that the `__sentry_wrapped__` function is not a function at the time of accessing it, it means
                // that something messed with it. In that case we want to return the originally passed function.
                return fn;
            }
        }
        // We don't wanna wrap it twice
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOriginalFunction"])(fn)) {
            return fn;
        }
    } catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        // Bail on wrapping and return the function as-is (defers to window.onerror).
        return fn;
    }
    // Wrap the function itself
    // It is important that `sentryWrapped` is not an arrow function to preserve the context of `this`
    const sentryWrapped = function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        try {
            // Also wrap arguments that are themselves functions
            const wrappedArguments = args.map((arg)=>wrap(arg, options));
            // Attempt to invoke user-land function
            // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
            //       means the sentry.javascript SDK caught an error invoking your application code. This
            //       is expected behavior and NOT indicative of a bug with sentry.javascript.
            return fn.apply(this, wrappedArguments);
        } catch (ex) {
            ignoreNextOnError();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
                scope.addEventProcessor((event)=>{
                    if (options.mechanism) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionTypeValue"])(event, undefined, undefined);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, options.mechanism);
                    }
                    event.extra = {
                        ...event.extra,
                        arguments: args
                    };
                    return event;
                });
                // no need to add a mechanism here, we already add it via an event processor above
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(ex);
            });
            throw ex;
        }
    };
    // Wrap the wrapped function in a proxy, to ensure any other properties of the original function remain available
    try {
        for(const property in fn){
            if (Object.prototype.hasOwnProperty.call(fn, property)) {
                sentryWrapped[property] = fn[property];
            }
        }
    } catch (e) {
    // Accessing some objects may throw
    // ref: https://github.com/getsentry/sentry-javascript/issues/1168
    }
    // Signal that this function has been wrapped/filled already
    // for both debugging and to prevent it to being wrapped/filled twice
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markFunctionWrapped"])(sentryWrapped, fn);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(fn, '__sentry_wrapped__', sentryWrapped);
    // Restore original function name (not all browsers allow that)
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name');
        if (descriptor.configurable) {
            Object.defineProperty(sentryWrapped, 'name', {
                get () {
                    return fn.name;
                }
            });
        }
    } catch (e) {
    // This may throw if e.g. the descriptor does not exist, or a browser does not allow redefining `name`.
    // to save some bytes we simply try-catch this
    }
    return sentryWrapped;
}
/**
 * Get HTTP request data from the current page.
 */ function getHttpRequestData() {
    // grab as much info as exists and add it to the event
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocationHref"])();
    const { referrer } = WINDOW.document || {};
    const { userAgent } = WINDOW.navigator || {};
    const headers = {
        ...referrer && {
            Referer: referrer
        },
        ...userAgent && {
            'User-Agent': userAgent
        }
    };
    const request = {
        url,
        headers
    };
    return request;
}
;
 //# sourceMappingURL=helpers.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrowserClient",
    ()=>BrowserClient,
    "applyDefaultOptions",
    ()=>applyDefaultOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/env.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$sdkMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/sdkMetadata.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/logs/internal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/metrics/internal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$ipAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/ipAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
;
/**
 * A magic string that build tooling can leverage in order to inject a release value into the SDK.
 */ /**
 * The Sentry Browser SDK Client.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */ class BrowserClient extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Client"] {
    /**
   * @inheritDoc
   */ eventFromException(exception, hint) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromException"])(this._options.stackParser, exception, hint, this._options.attachStacktrace);
    }
    /**
   * @inheritDoc
   */ eventFromMessage(message) {
        let level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'info', hint = arguments.length > 2 ? arguments[2] : void 0;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromMessage"])(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
    }
    /**
   * @inheritDoc
   */ _prepareEvent(event, hint, currentScope, isolationScope) {
        event.platform = event.platform || 'javascript';
        return super._prepareEvent(event, hint, currentScope, isolationScope);
    }
    /**
   * Creates a new Browser SDK instance.
   *
   * @param options Configuration options for this SDK.
   */ constructor(options){
        var _opts__metadata;
        const opts = applyDefaultOptions(options);
        const sdkSource = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].SENTRY_SDK_SOURCE || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSDKSource"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$sdkMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applySdkMetadata"])(opts, 'browser', [
            'browser'
        ], sdkSource);
        // Only allow IP inferral by Relay if sendDefaultPii is true
        if ((_opts__metadata = opts._metadata) === null || _opts__metadata === void 0 ? void 0 : _opts__metadata.sdk) {
            opts._metadata.sdk.settings = {
                infer_ip: opts.sendDefaultPii ? 'auto' : 'never',
                // purposefully allowing already passed settings to override the default
                ...opts._metadata.sdk.settings
            };
        }
        super(opts);
        const { sendDefaultPii, sendClientReports, enableLogs, _experiments, enableMetrics: enableMetricsOption } = this._options;
        var _ref;
        // todo(v11): Remove the experimental flag
        // eslint-disable-next-line deprecation/deprecation
        const enableMetrics = (_ref = enableMetricsOption !== null && enableMetricsOption !== void 0 ? enableMetricsOption : _experiments === null || _experiments === void 0 ? void 0 : _experiments.enableMetrics) !== null && _ref !== void 0 ? _ref : true;
        // Flush logs and metrics when page becomes hidden (e.g., tab switch, navigation)
        // todo(v11): Remove the experimental flag
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document && (sendClientReports || enableLogs || enableMetrics)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document.addEventListener('visibilitychange', ()=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document.visibilityState === 'hidden') {
                    if (sendClientReports) {
                        this._flushOutcomes();
                    }
                    if (enableLogs) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_flushLogsBuffer"])(this);
                    }
                    if (enableMetrics) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_flushMetricsBuffer"])(this);
                    }
                }
            });
        }
        if (sendDefaultPii) {
            this.on('beforeSendSession', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$ipAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addAutoIpAddressToSession"]);
        }
    }
}
/** Exported only for tests. */ function applyDefaultOptions(optionsArg) {
    var _WINDOW_SENTRY_RELEASE;
    return {
        release: typeof __SENTRY_RELEASE__ === 'string' // This allows build tooling to find-and-replace __SENTRY_RELEASE__ to inject a release value
         ? __SENTRY_RELEASE__ : (_WINDOW_SENTRY_RELEASE = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].SENTRY_RELEASE) === null || _WINDOW_SENTRY_RELEASE === void 0 ? void 0 : _WINDOW_SENTRY_RELEASE.id,
        sendClientReports: true,
        // We default this to true, as it is the safer scenario
        parentSpanIsAlwaysRootSpan: true,
        ...optionsArg
    };
}
;
 //# sourceMappingURL=client.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * This serves as a build time flag that will be true by default, but false in non-debug builds or if users replace `__SENTRY_DEBUG__` in their generated code.
 *
 * ATTENTION: This constant must never cross package boundaries (i.e. be exported) to guarantee that it can be used for tree shaking.
 */ __turbopack_context__.s([
    "DEBUG_BUILD",
    ()=>DEBUG_BUILD
]);
const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__;
;
 //# sourceMappingURL=debug-build.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/breadcrumbs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "breadcrumbsIntegration",
    ()=>breadcrumbsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/instrument/console.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/instrument/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/severity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/breadcrumbs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$breadcrumb$2d$log$2d$level$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry-internal+browser-utils@10.53.1/node_modules/@sentry-internal/browser-utils/build/esm/instrument/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry-internal+browser-utils@10.53.1/node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry-internal+browser-utils@10.53.1/node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
;
;
/** maxStringLength gets capped to prevent 100 breadcrumbs exceeding 1MB event payload size */ const MAX_ALLOWED_STRING_LENGTH = 1024;
const INTEGRATION_NAME = 'Breadcrumbs';
const _breadcrumbsIntegration = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const _options = {
        console: true,
        dom: true,
        fetch: true,
        history: true,
        sentry: true,
        xhr: true,
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            // TODO(v11): Remove this functionality and use `consoleIntegration` from @sentry/core instead.
            if (_options.console) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addConsoleInstrumentationHandler"])(_getConsoleBreadcrumbHandler(client));
            }
            if (_options.dom) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addClickKeypressInstrumentationHandler"])(_getDomBreadcrumbHandler(client, _options.dom));
            }
            if (_options.xhr) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addXhrInstrumentationHandler"])(_getXhrBreadcrumbHandler(client));
            }
            if (_options.fetch) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addFetchInstrumentationHandler"])(_getFetchBreadcrumbHandler(client));
            }
            if (_options.history) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addHistoryInstrumentationHandler"])(_getHistoryBreadcrumbHandler(client));
            }
            if (_options.sentry) {
                client.on('beforeSendEvent', _getSentryBreadcrumbHandler(client));
            }
        }
    };
};
const breadcrumbsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_breadcrumbsIntegration);
/**
 * Adds a breadcrumb for Sentry events or transactions if this option is enabled.
 */ function _getSentryBreadcrumbHandler(client) {
    return function addSentryBreadcrumb(event) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])({
            category: "sentry.".concat(event.type === 'transaction' ? 'transaction' : 'event'),
            event_id: event.event_id,
            level: event.level,
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)
        }, {
            event
        });
    };
}
/**
 * A HOC that creates a function that creates breadcrumbs from DOM API calls.
 * This is a HOC so that we get access to dom options in the closure.
 */ function _getDomBreadcrumbHandler(client, dom) {
    return function _innerDomBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        let target;
        let componentName;
        let keyAttrs = typeof dom === 'object' ? dom.serializeAttribute : undefined;
        let maxStringLength = typeof dom === 'object' && typeof dom.maxStringLength === 'number' ? dom.maxStringLength : undefined;
        if (maxStringLength && maxStringLength > MAX_ALLOWED_STRING_LENGTH) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn("`dom.maxStringLength` cannot exceed ".concat(MAX_ALLOWED_STRING_LENGTH, ", but a value of ").concat(maxStringLength, " was configured. Sentry will use ").concat(MAX_ALLOWED_STRING_LENGTH, " instead."));
            maxStringLength = MAX_ALLOWED_STRING_LENGTH;
        }
        if (typeof keyAttrs === 'string') {
            keyAttrs = [
                keyAttrs
            ];
        }
        // Accessing event.target can throw (see getsentry/raven-js#838, #768)
        try {
            const event = handlerData.event;
            const element = _isEvent(event) ? event.target : event;
            target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["htmlTreeAsString"])(element, {
                keyAttrs,
                maxStringLength
            });
            componentName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComponentName"])(element);
        } catch (e) {
            target = '<unknown>';
        }
        if (target.length === 0) {
            return;
        }
        const breadcrumb = {
            category: "ui.".concat(handlerData.name),
            message: target
        };
        if (componentName) {
            breadcrumb.data = {
                'ui.component_name': componentName
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, {
            event: handlerData.event,
            name: handlerData.name,
            global: handlerData.global
        });
    };
}
/**
 * Creates breadcrumbs from console API calls
 */ function _getConsoleBreadcrumbHandler(client) {
    return function _consoleBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const breadcrumb = {
            category: 'console',
            data: {
                arguments: handlerData.args,
                logger: 'console'
            },
            level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["severityLevelFromString"])(handlerData.level),
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJoin"])(handlerData.args, ' ')
        };
        if (handlerData.level === 'assert') {
            if (handlerData.args[0] === false) {
                breadcrumb.message = "Assertion failed: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJoin"])(handlerData.args.slice(1), ' ') || 'console.assert');
                breadcrumb.data.arguments = handlerData.args.slice(1);
            } else {
                // Don't capture a breadcrumb for passed assertions
                return;
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, {
            input: handlerData.args,
            level: handlerData.level
        });
    };
}
/**
 * Creates breadcrumbs from XHR API calls
 */ function _getXhrBreadcrumbHandler(client) {
    return function _xhrBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { startTimestamp, endTimestamp } = handlerData;
        const sentryXhrData = handlerData.xhr[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SENTRY_XHR_DATA_KEY"]];
        // We only capture complete, non-sentry requests
        if (!startTimestamp || !endTimestamp || !sentryXhrData) {
            return;
        }
        const { method, url, status_code, body } = sentryXhrData;
        const data = {
            method,
            url,
            status_code
        };
        const hint = {
            xhr: handlerData.xhr,
            input: body,
            startTimestamp,
            endTimestamp
        };
        const breadcrumb = {
            category: 'xhr',
            data,
            type: 'http',
            level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$breadcrumb$2d$log$2d$level$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBreadcrumbLogLevelFromHttpStatusCode"])(status_code)
        };
        client.emit('beforeOutgoingRequestBreadcrumb', breadcrumb, hint);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, hint);
    };
}
/**
 * Creates breadcrumbs from fetch API calls
 */ function _getFetchBreadcrumbHandler(client) {
    return function _fetchBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { startTimestamp, endTimestamp } = handlerData;
        // We only capture complete fetch requests
        if (!endTimestamp) {
            return;
        }
        if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === 'POST') {
            // We will not create breadcrumbs for fetch requests that contain `sentry_key` (internal sentry requests)
            return;
        }
        if (handlerData.error) {
            const hint = {
                data: handlerData.error,
                input: handlerData.args,
                startTimestamp,
                endTimestamp
            };
            const breadcrumb = {
                category: 'fetch',
                data: handlerData.fetchData,
                level: 'error',
                type: 'http'
            };
            client.emit('beforeOutgoingRequestBreadcrumb', breadcrumb, hint);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, hint);
        } else {
            const response = handlerData.response;
            const data = {
                ...handlerData.fetchData,
                status_code: response === null || response === void 0 ? void 0 : response.status
            };
            const hint = {
                input: handlerData.args,
                response,
                startTimestamp,
                endTimestamp
            };
            const breadcrumb = {
                category: 'fetch',
                data,
                type: 'http',
                level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$breadcrumb$2d$log$2d$level$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBreadcrumbLogLevelFromHttpStatusCode"])(data.status_code)
            };
            client.emit('beforeOutgoingRequestBreadcrumb', breadcrumb, hint);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, hint);
        }
    };
}
/**
 * Creates breadcrumbs from history API calls
 */ function _getHistoryBreadcrumbHandler(client) {
    return function _historyBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        let from = handlerData.from;
        let to = handlerData.to;
        const parsedLoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].location.href);
        let parsedFrom = from ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUrl"])(from) : undefined;
        const parsedTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUrl"])(to);
        // Initial pushState doesn't provide `from` information
        if (!(parsedFrom === null || parsedFrom === void 0 ? void 0 : parsedFrom.path)) {
            parsedFrom = parsedLoc;
        }
        // Use only the path component of the URL if the URL matches the current
        // document (almost all the time when using pushState)
        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
            to = parsedTo.relative;
        }
        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
            from = parsedFrom.relative;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])({
            category: 'navigation',
            data: {
                from,
                to
            }
        });
    };
}
function _isEvent(event) {
    return !!event && !!event.target;
}
;
 //# sourceMappingURL=breadcrumbs.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browserapierrors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserApiErrorsIntegration",
    ()=>browserApiErrorsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
// Using a comma-separated string and split for smaller bundle size vs an array literal
const DEFAULT_EVENT_TARGET = 'EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload'.split(',');
const INTEGRATION_NAME = 'BrowserApiErrors';
const _browserApiErrorsIntegration = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const _options = {
        XMLHttpRequest: true,
        eventTarget: true,
        requestAnimationFrame: true,
        setInterval: true,
        setTimeout: true,
        unregisterOriginalCallbacks: false,
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        // TODO: This currently only works for the first client this is setup
        // We may want to adjust this to check for client etc.
        setupOnce () {
            if (_options.setTimeout) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"], 'setTimeout', _wrapTimeFunction);
            }
            if (_options.setInterval) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"], 'setInterval', _wrapTimeFunction);
            }
            if (_options.requestAnimationFrame) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"], 'requestAnimationFrame', _wrapRAF);
            }
            if (_options.XMLHttpRequest && 'XMLHttpRequest' in __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(XMLHttpRequest.prototype, 'send', _wrapXHR);
            }
            const eventTargetOption = _options.eventTarget;
            if (eventTargetOption) {
                const eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
                eventTarget.forEach((target)=>_wrapEventTarget(target, _options));
            }
        }
    };
};
/**
 * Wrap timer functions and event targets to catch errors and provide better meta data.
 */ const browserApiErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_browserApiErrorsIntegration);
function _wrapTimeFunction(original) {
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        const originalCallback = args[0];
        args[0] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrap"])(originalCallback, {
            mechanism: {
                handled: false,
                type: "auto.browser.browserapierrors.".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(original))
            }
        });
        return original.apply(this, args);
    };
}
function _wrapRAF(original) {
    return function(callback) {
        return original.apply(this, [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrap"])(callback, {
                mechanism: {
                    data: {
                        handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(original)
                    },
                    handled: false,
                    type: 'auto.browser.browserapierrors.requestAnimationFrame'
                }
            })
        ]);
    };
}
function _wrapXHR(originalSend) {
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const xhr = this;
        const xmlHttpRequestProps = [
            'onload',
            'onerror',
            'onprogress',
            'onreadystatechange'
        ];
        xmlHttpRequestProps.forEach((prop)=>{
            if (prop in xhr && typeof xhr[prop] === 'function') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(xhr, prop, function(original) {
                    const wrapOptions = {
                        mechanism: {
                            data: {
                                handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(original)
                            },
                            handled: false,
                            type: "auto.browser.browserapierrors.xhr.".concat(prop)
                        }
                    };
                    // If Instrument integration has been called before BrowserApiErrors, get the name of original function
                    const originalFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOriginalFunction"])(original);
                    if (originalFunction) {
                        wrapOptions.mechanism.data.handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(originalFunction);
                    }
                    // Otherwise wrap directly
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrap"])(original, wrapOptions);
                });
            }
        });
        return originalSend.apply(this, args);
    };
}
function _wrapEventTarget(target, integrationOptions) {
    var _globalObject_target, _proto_hasOwnProperty;
    const globalObject = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"];
    const proto = (_globalObject_target = globalObject[target]) === null || _globalObject_target === void 0 ? void 0 : _globalObject_target.prototype;
    // eslint-disable-next-line no-prototype-builtins
    if (!(proto === null || proto === void 0 ? void 0 : (_proto_hasOwnProperty = proto.hasOwnProperty) === null || _proto_hasOwnProperty === void 0 ? void 0 : _proto_hasOwnProperty.call(proto, 'addEventListener'))) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'addEventListener', function(original) {
        return function(eventName, fn, options) {
            try {
                if (isEventListenerObject(fn)) {
                    // ESlint disable explanation:
                    //  First, it is generally safe to call `wrap` with an unbound function. Furthermore, using `.bind()` would
                    //  introduce a bug here, because bind returns a new function that doesn't have our
                    //  flags(like __sentry_original__) attached. `wrap` checks for those flags to avoid unnecessary wrapping.
                    //  Without those flags, every call to addEventListener wraps the function again, causing a memory leak.
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    fn.handleEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrap"])(fn.handleEvent, {
                        mechanism: {
                            data: {
                                handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(fn),
                                target
                            },
                            handled: false,
                            type: 'auto.browser.browserapierrors.handleEvent'
                        }
                    });
                }
            } catch (e) {
            // can sometimes get 'Permission denied to access property "handle Event'
            }
            if (integrationOptions.unregisterOriginalCallbacks) {
                unregisterOriginalCallback(this, eventName, fn);
            }
            return original.apply(this, [
                eventName,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrap"])(fn, {
                    mechanism: {
                        data: {
                            handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(fn),
                            target
                        },
                        handled: false,
                        type: 'auto.browser.browserapierrors.addEventListener'
                    }
                }),
                options
            ]);
        };
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'removeEventListener', function(originalRemoveEventListener) {
        return function(eventName, fn, options) {
            /**
       * There are 2 possible scenarios here:
       *
       * 1. Someone passes a callback, which was attached prior to Sentry initialization, or by using unmodified
       * method, eg. `document.addEventListener.call(el, name, handler). In this case, we treat this function
       * as a pass-through, and call original `removeEventListener` with it.
       *
       * 2. Someone passes a callback, which was attached after Sentry was initialized, which means that it was using
       * our wrapped version of `addEventListener`, which internally calls `wrap` helper.
       * This helper "wraps" whole callback inside a try/catch statement, and attached appropriate metadata to it,
       * in order for us to make a distinction between wrapped/non-wrapped functions possible.
       * If a function was wrapped, it has additional property of `__sentry_wrapped__`, holding the handler.
       *
       * When someone adds a handler prior to initialization, and then do it again, but after,
       * then we have to detach both of them. Otherwise, if we'd detach only wrapped one, it'd be impossible
       * to get rid of the initial handler and it'd stick there forever.
       */ try {
                const originalEventHandler = fn.__sentry_wrapped__;
                if (originalEventHandler) {
                    originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
                }
            } catch (e) {
            // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
            }
            return originalRemoveEventListener.call(this, eventName, fn, options);
        };
    });
}
function isEventListenerObject(obj) {
    return typeof obj.handleEvent === 'function';
}
function unregisterOriginalCallback(target, eventName, fn) {
    if (target && typeof target === 'object' && 'removeEventListener' in target && typeof target.removeEventListener === 'function') {
        target.removeEventListener(eventName, fn);
    }
}
;
 //# sourceMappingURL=browserapierrors.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browsersession.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserSessionIntegration",
    ()=>browserSessionIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry-internal+browser-utils@10.53.1/node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
;
;
/**
 * When added, automatically creates sessions which allow you to track adoption and crashes (crash free rate) in your Releases in Sentry.
 * More information: https://docs.sentry.io/product/releases/health/
 *
 * Note: In order for session tracking to work, you need to set up Releases: https://docs.sentry.io/product/releases/
 */ const browserSessionIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var _options_lifecycle;
    const lifecycle = (_options_lifecycle = options.lifecycle) !== null && _options_lifecycle !== void 0 ? _options_lifecycle : 'route';
    return {
        name: 'BrowserSession',
        setupOnce () {
            if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document === 'undefined') {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('Using the `browserSessionIntegration` in non-browser environments is not supported.');
                return;
            }
            // The session duration for browser sessions does not track a meaningful
            // concept that can be used as a metric.
            // Automatically captured sessions are akin to page views, and thus we
            // discard their duration.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSession"])({
                ignoreDuration: true
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureSession"])();
            // User data can be set at any time, for example async after Sentry.init has run and the initial session
            // envelope was already sent, but still on the initial page.
            // Therefore, we have to update the ongoing session with the new user data if it exists, to send the `did`.
            // In theory, sessions, as well as user data is always put onto the isolation scope. So we listen to the
            // isolation scope for changes and update the session with the new user data if it exists.
            // This will not catch users set onto other scopes, like the current scope. For now, we'll accept this limitation.
            // The alternative is to update and capture the session from within the scope. This could be too costly or would not
            // play well with session aggregates on the server side. Since this happens in the scope class, we'd need change
            // scope behaviour in the browser.
            const isolationScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsolationScope"])();
            let previousUser = isolationScope.getUser();
            isolationScope.addScopeListener((scope)=>{
                const maybeNewUser = scope.getUser();
                // sessions only care about user id and ip address, so we only need to capture the session if the user has changed
                if ((previousUser === null || previousUser === void 0 ? void 0 : previousUser.id) !== (maybeNewUser === null || maybeNewUser === void 0 ? void 0 : maybeNewUser.id) || (previousUser === null || previousUser === void 0 ? void 0 : previousUser.ip_address) !== (maybeNewUser === null || maybeNewUser === void 0 ? void 0 : maybeNewUser.ip_address)) {
                    // the scope class already writes the user to its session, so we only need to capture the session here
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureSession"])();
                    previousUser = maybeNewUser;
                }
            });
            if (lifecycle === 'route') {
                // We want to create a session for every navigation as well
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addHistoryInstrumentationHandler"])((param)=>{
                    let { from, to } = param;
                    // Don't create an additional session for the initial route or if the location did not change
                    if (from !== to) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSession"])({
                            ignoreDuration: true
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureSession"])();
                    }
                });
            }
        }
    };
});
;
 //# sourceMappingURL=browsersession.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/culturecontext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cultureContextIntegration",
    ()=>cultureContextIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spans$2f$captureSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/tracing/spans/captureSpan.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
const INTEGRATION_NAME = 'CultureContext';
const _cultureContextIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        preprocessEvent (event) {
            const culture = getCultureContext();
            if (culture) {
                var _event_contexts;
                event.contexts = {
                    ...event.contexts,
                    culture: {
                        ...culture,
                        ...(_event_contexts = event.contexts) === null || _event_contexts === void 0 ? void 0 : _event_contexts.culture
                    }
                };
            }
        },
        processSegmentSpan (span) {
            const culture = getCultureContext();
            if (culture) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spans$2f$captureSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeSetSpanJSONAttributes"])(span, {
                    'culture.locale': culture.locale,
                    'culture.timezone': culture.timezone,
                    'culture.calendar': culture.calendar
                });
            }
        }
    };
};
/**
 * Captures culture context from the browser.
 *
 * Enabled by default.
 *
 * @example
 * ```js
 * import * as Sentry from '@sentry/browser';
 *
 * Sentry.init({
 *   integrations: [Sentry.cultureContextIntegration()],
 * });
 * ```
 */ const cultureContextIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_cultureContextIntegration);
/**
 * Returns the culture context from the browser's Intl API.
 */ function getCultureContext() {
    try {
        const intl = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].Intl;
        if (!intl) {
            return undefined;
        }
        const options = intl.DateTimeFormat().resolvedOptions();
        return {
            locale: options.locale,
            timezone: options.timeZone,
            calendar: options.calendar
        };
    } catch (e) {
        // Ignore errors
        return undefined;
    }
}
;
 //# sourceMappingURL=culturecontext.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_eventFromRejectionWithPrimitive",
    ()=>_eventFromRejectionWithPrimitive,
    "_getUnhandledRejectionError",
    ()=>_getUnhandledRejectionError,
    "globalHandlersIntegration",
    ()=>globalHandlersIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/instrument/globalError.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalUnhandledRejection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
;
;
const INTEGRATION_NAME = 'GlobalHandlers';
const _globalHandlersIntegration = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const _options = {
        onerror: true,
        onunhandledrejection: true,
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setupOnce () {
            Error.stackTraceLimit = 50;
        },
        setup (client) {
            if (_options.onerror) {
                _installGlobalOnErrorHandler(client);
                globalHandlerLog('onerror');
            }
            if (_options.onunhandledrejection) {
                _installGlobalOnUnhandledRejectionHandler(client);
                globalHandlerLog('onunhandledrejection');
            }
        }
    };
};
const globalHandlersIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_globalHandlersIntegration);
function _installGlobalOnErrorHandler(client) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addGlobalErrorInstrumentationHandler"])((data)=>{
        const { stackParser, attachStacktrace } = getOptions();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldIgnoreOnError"])()) {
            return;
        }
        const { msg, url, line, column, error } = data;
        const event = _enhanceEventWithInitialFrame((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromUnknownInput"])(stackParser, error || msg, undefined, attachStacktrace, false), url, line, column);
        event.level = 'error';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureEvent"])(event, {
            originalException: error,
            mechanism: {
                handled: false,
                type: 'auto.browser.global_handlers.onerror'
            }
        });
    });
}
function _installGlobalOnUnhandledRejectionHandler(client) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalUnhandledRejection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addGlobalUnhandledRejectionInstrumentationHandler"])((e)=>{
        const { stackParser, attachStacktrace } = getOptions();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldIgnoreOnError"])()) {
            return;
        }
        const error = _getUnhandledRejectionError(e);
        const event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimitive"])(error) ? _eventFromRejectionWithPrimitive(error) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromUnknownInput"])(stackParser, error, undefined, attachStacktrace, true);
        event.level = 'error';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureEvent"])(event, {
            originalException: error,
            mechanism: {
                handled: false,
                type: 'auto.browser.global_handlers.onunhandledrejection'
            }
        });
    });
}
/**
 *
 */ function _getUnhandledRejectionError(error) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimitive"])(error)) {
        return error;
    }
    // dig the object of the rejection out of known event types
    try {
        // PromiseRejectionEvents store the object of the rejection under 'reason'
        // see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
        if ('reason' in error) {
            return error.reason;
        }
        // something, somewhere, (likely a browser extension) effectively casts PromiseRejectionEvents
        // to CustomEvents, moving the `promise` and `reason` attributes of the PRE into
        // the CustomEvent's `detail` attribute, since they're not part of CustomEvent's spec
        // see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent and
        // https://github.com/getsentry/sentry-javascript/issues/2380
        if ('detail' in error && 'reason' in error.detail) {
            return error.detail.reason;
        }
    } catch (e) {} // eslint-disable-line no-empty
    return error;
}
/**
 * Create an event from a promise rejection where the `reason` is a primitive.
 *
 * @param reason: The `reason` property of the promise rejection
 * @returns An Event object with an appropriate `exception` value
 */ function _eventFromRejectionWithPrimitive(reason) {
    return {
        exception: {
            values: [
                {
                    type: 'UnhandledRejection',
                    // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
                    value: "Non-Error promise rejection captured with value: ".concat(String(reason))
                }
            ]
        }
    };
}
function _enhanceEventWithInitialFrame(event, url, lineno, colno) {
    // event.exception
    const e = event.exception = event.exception || {};
    // event.exception.values
    const ev = e.values = e.values || [];
    // event.exception.values[0]
    const ev0 = ev[0] = ev[0] || {};
    // event.exception.values[0].stacktrace
    const ev0s = ev0.stacktrace = ev0.stacktrace || {};
    // event.exception.values[0].stacktrace.frames
    const ev0sf = ev0s.frames = ev0s.frames || [];
    if (ev0sf.length === 0) {
        var _getFilenameFromUrl;
        ev0sf.push({
            colno,
            lineno,
            filename: (_getFilenameFromUrl = getFilenameFromUrl(url)) !== null && _getFilenameFromUrl !== void 0 ? _getFilenameFromUrl : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocationHref"])(),
            function: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"],
            in_app: true
        });
    }
    return event;
}
function globalHandlerLog(type) {
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log("Global Handler attached: ".concat(type));
}
function getOptions() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    const options = (client === null || client === void 0 ? void 0 : client.getOptions()) || {
        stackParser: ()=>[],
        attachStacktrace: false
    };
    return options;
}
function getFilenameFromUrl(url) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isString"])(url) || url.length === 0) {
        return undefined;
    }
    // Strip data URL content to avoid long base64 strings in stack frames
    // (e.g. when initializing a Worker with a base64 encoded script)
    // Don't include data prefix for filenames as it's not useful for stack traces
    // Wrap with < > to indicate it's a placeholder
    if (url.startsWith('data:')) {
        return "<".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripDataUrlContent"])(url, false), ">");
    }
    return url;
}
;
 //# sourceMappingURL=globalhandlers.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpcontext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "httpContextIntegration",
    ()=>httpContextIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spans$2f$captureSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/tracing/spans/captureSpan.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
/**
 * Collects information about HTTP request headers and
 * attaches them to the event.
 */ const httpContextIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'HttpContext',
        preprocessEvent (event) {
            var _event_request;
            // if none of the information we want exists, don't bother
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].navigator && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].location && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document) {
                return;
            }
            const reqData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHttpRequestData"])();
            const headers = {
                ...reqData.headers,
                ...(_event_request = event.request) === null || _event_request === void 0 ? void 0 : _event_request.headers
            };
            event.request = {
                ...reqData,
                ...event.request,
                headers
            };
        },
        processSegmentSpan (span) {
            // if none of the information we want exists, don't bother
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].navigator && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].location && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document) {
                return;
            }
            const reqData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHttpRequestData"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spans$2f$captureSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeSetSpanJSONAttributes"])(span, {
                // Coerce empty string to undefined so the helper's nullish check drops it,
                // rather than writing an empty `url.full` attribute onto the span.
                'url.full': reqData.url || undefined,
                'http.request.header.user_agent': reqData.headers['User-Agent'],
                'http.request.header.referer': reqData.headers['Referer']
            });
        }
    };
});
;
 //# sourceMappingURL=httpcontext.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/linkederrors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linkedErrorsIntegration",
    ()=>linkedErrorsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$aggregate$2d$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/aggregate-errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [app-client] (ecmascript)");
;
;
const DEFAULT_KEY = 'cause';
const DEFAULT_LIMIT = 5;
const INTEGRATION_NAME = 'LinkedErrors';
const _linkedErrorsIntegration = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const limit = options.limit || DEFAULT_LIMIT;
    const key = options.key || DEFAULT_KEY;
    return {
        name: INTEGRATION_NAME,
        preprocessEvent (event, hint, client) {
            const options = client.getOptions();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$aggregate$2d$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyAggregateErrorsToEvent"])(// This differs from the LinkedErrors integration in core by using a different exceptionFromError function
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exceptionFromError"], options.stackParser, key, limit, event, hint);
        }
    };
};
/**
 * Aggregrate linked errors in an event.
 */ const linkedErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_linkedErrorsIntegration);
;
 //# sourceMappingURL=linkederrors.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/spotlight.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTEGRATION_NAME",
    ()=>INTEGRATION_NAME,
    "SPOTLIGHT_IGNORE_SPANS",
    ()=>SPOTLIGHT_IGNORE_SPANS,
    "spotlightBrowserIntegration",
    ()=>spotlightBrowserIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry-internal+browser-utils@10.53.1/node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'SpotlightBrowser';
const SPOTLIGHT_IGNORE_SPANS = [
    {
        op: 'ui.interaction.click',
        name: '#sentry-spotlight'
    }
];
const _spotlightIntegration = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const sidecarUrl = options.sidecarUrl || 'http://localhost:8969/stream';
    return {
        name: INTEGRATION_NAME,
        setup: ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Using Sidecar URL', sidecarUrl);
        },
        beforeSetup (client) {
            const opts = client.getOptions();
            opts.ignoreSpans = [
                ...opts.ignoreSpans || [],
                ...SPOTLIGHT_IGNORE_SPANS
            ];
        },
        afterAllSetup: (client)=>{
            setupSidecarForwarding(client, sidecarUrl);
        }
    };
};
function setupSidecarForwarding(client, sidecarUrl) {
    const makeFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNativeImplementation"])('fetch');
    let failCount = 0;
    client.on('beforeEnvelope', (envelope)=>{
        if (failCount > 3) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests:', failCount);
            return;
        }
        makeFetch(sidecarUrl, {
            method: 'POST',
            body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeEnvelope"])(envelope),
            headers: {
                'Content-Type': 'application/x-sentry-envelope'
            },
            mode: 'cors'
        }).then((res)=>{
            if (res.status >= 200 && res.status < 400) {
                // Reset failed requests counter on success
                failCount = 0;
            }
        }, (err)=>{
            failCount++;
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error("Sentry SDK can't connect to Sidecar is it running? See: https://spotlightjs.com/sidecar/npx/", err);
        });
    });
}
/**
 * Use this integration to send errors and transactions to Spotlight.
 *
 * Learn more about spotlight at https://spotlightjs.com
 */ const spotlightBrowserIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_spotlightIntegration);
;
 //# sourceMappingURL=spotlight.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/stack-parsers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chromeStackLineParser",
    ()=>chromeStackLineParser,
    "defaultStackLineParsers",
    ()=>defaultStackLineParsers,
    "defaultStackParser",
    ()=>defaultStackParser,
    "geckoStackLineParser",
    ()=>geckoStackLineParser,
    "opera10StackLineParser",
    ()=>opera10StackLineParser,
    "opera11StackLineParser",
    ()=>opera11StackLineParser,
    "winjsStackLineParser",
    ()=>winjsStackLineParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
;
const OPERA10_PRIORITY = 10;
const OPERA11_PRIORITY = 20;
const CHROME_PRIORITY = 30;
const WINJS_PRIORITY = 40;
const GECKO_PRIORITY = 50;
function createFrame(filename, func, lineno, colno) {
    const frame = {
        filename,
        function: func === '<anonymous>' ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"] : func,
        in_app: true
    };
    if (lineno !== undefined) {
        frame.lineno = lineno;
    }
    if (colno !== undefined) {
        frame.colno = colno;
    }
    return frame;
}
// This regex matches frames that have no function name (ie. are at the top level of a module).
// For example "at http://localhost:5000//script.js:1:126"
// Frames _with_ function names usually look as follows: "at commitLayoutEffects (react-dom.development.js:23426:1)"
const chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
// This regex matches all the frames that have a function name.
const chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
// Matches stack frames with data URIs instead of filename so we can still get the function name
// Example: "at dynamicFn (data:application/javascript,export function dynamicFn() {..."
const chromeDataUriRegex = /at (.+?) ?\(data:(.+?),/;
// Chromium based browsers: Chrome, Brave, new Opera, new Edge
// We cannot call this variable `chrome` because it can conflict with global `chrome` variable in certain environments
// See: https://github.com/getsentry/sentry-javascript/issues/6880
const chromeStackParserFn = (line)=>{
    const dataUriMatch = line.match(chromeDataUriRegex);
    if (dataUriMatch) {
        return {
            filename: "<data:".concat(dataUriMatch[2], ">"),
            function: dataUriMatch[1]
        };
    }
    // If the stack line has no function name, we need to parse it differently
    const noFnParts = chromeRegexNoFnName.exec(line);
    if (noFnParts) {
        const [, filename, line, col] = noFnParts;
        return createFrame(filename, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +line, +col);
    }
    const parts = chromeRegex.exec(line);
    if (parts) {
        var _parts_;
        const isEval = ((_parts_ = parts[2]) === null || _parts_ === void 0 ? void 0 : _parts_.indexOf('eval')) === 0; // start of line
        if (isEval) {
            const subMatch = chromeEvalRegex.exec(parts[2]);
            if (subMatch) {
                // throw out eval line/column and use top-most line/column number
                parts[2] = subMatch[1]; // url
                parts[3] = subMatch[2]; // line
                parts[4] = subMatch[3]; // column
            }
        }
        // Kamil: One more hack won't hurt us right? Understanding and adding more rules on top of these regexps right now
        // would be way too time consuming. (TODO: Rewrite whole RegExp to be more readable)
        const [func, filename] = extractSafariExtensionDetails(parts[1] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], parts[2]);
        return createFrame(filename, func, parts[3] ? +parts[3] : undefined, parts[4] ? +parts[4] : undefined);
    }
    return;
};
const chromeStackLineParser = [
    CHROME_PRIORITY,
    chromeStackParserFn
];
// gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
// generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
// We need this specific case for now because we want no other regex to match.
const geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
const gecko = (line)=>{
    const parts = geckoREgex.exec(line);
    if (parts) {
        const isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        if (isEval) {
            const subMatch = geckoEvalRegex.exec(parts[3]);
            if (subMatch) {
                // throw out eval line/column and use top-most line number
                parts[1] = parts[1] || 'eval';
                parts[3] = subMatch[1];
                parts[4] = subMatch[2];
                parts[5] = ''; // no column when eval
            }
        }
        let filename = parts[3];
        let func = parts[1] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"];
        [func, filename] = extractSafariExtensionDetails(func, filename);
        return createFrame(filename, func, parts[4] ? +parts[4] : undefined, parts[5] ? +parts[5] : undefined);
    }
    return;
};
const geckoStackLineParser = [
    GECKO_PRIORITY,
    gecko
];
const winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
const winjs = (line)=>{
    const parts = winjsRegex.exec(line);
    return parts ? createFrame(parts[2], parts[1] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +parts[3], parts[4] ? +parts[4] : undefined) : undefined;
};
const winjsStackLineParser = [
    WINJS_PRIORITY,
    winjs
];
const opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
const opera10 = (line)=>{
    const parts = opera10Regex.exec(line);
    return parts ? createFrame(parts[2], parts[3] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +parts[1]) : undefined;
};
const opera10StackLineParser = [
    OPERA10_PRIORITY,
    opera10
];
const opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;
const opera11 = (line)=>{
    const parts = opera11Regex.exec(line);
    return parts ? createFrame(parts[5], parts[3] || parts[4] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +parts[1], +parts[2]) : undefined;
};
const opera11StackLineParser = [
    OPERA11_PRIORITY,
    opera11
];
const defaultStackLineParsers = [
    chromeStackLineParser,
    geckoStackLineParser
];
const defaultStackParser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStackParser"])(...defaultStackLineParsers);
/**
 * Safari web extensions, starting version unknown, can produce "frames-only" stacktraces.
 * What it means, is that instead of format like:
 *
 * Error: wat
 *   at function@url:row:col
 *   at function@url:row:col
 *   at function@url:row:col
 *
 * it produces something like:
 *
 *   function@url:row:col
 *   function@url:row:col
 *   function@url:row:col
 *
 * Because of that, it won't be captured by `chrome` RegExp and will fall into `Gecko` branch.
 * This function is extracted so that we can use it in both places without duplicating the logic.
 * Unfortunately "just" changing RegExp is too complicated now and making it pass all tests
 * and fix this case seems like an impossible, or at least way too time-consuming task.
 */ const extractSafariExtensionDetails = (func, filename)=>{
    const isSafariExtension = func.indexOf('safari-extension') !== -1;
    const isSafariWebExtension = func.indexOf('safari-web-extension') !== -1;
    return isSafariExtension || isSafariWebExtension ? [
        func.indexOf('@') !== -1 ? func.split('@')[0] : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"],
        isSafariExtension ? "safari-extension:".concat(filename) : "safari-web-extension:".concat(filename)
    ] : [
        func,
        filename
    ];
};
;
 //# sourceMappingURL=stack-parsers.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeFetchTransport",
    ()=>makeFetchTransport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/transports/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$promisebuffer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/promisebuffer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry-internal+browser-utils@10.53.1/node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js [app-client] (ecmascript)");
;
;
const DEFAULT_BROWSER_TRANSPORT_BUFFER_SIZE = 40;
/**
 * Creates a Transport that uses the Fetch API to send events to Sentry.
 */ function makeFetchTransport(options) {
    let nativeFetch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNativeImplementation"])('fetch');
    let pendingBodySize = 0;
    let pendingCount = 0;
    async function makeRequest(request) {
        const requestSize = request.body.length;
        pendingBodySize += requestSize;
        pendingCount++;
        const requestOptions = {
            body: request.body,
            method: 'POST',
            referrerPolicy: 'strict-origin',
            headers: options.headers,
            // Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
            // fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
            // The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
            // frequently sending events right before the user is switching pages (eg. when finishing navigation transactions).
            // Gotchas:
            // - `keepalive` isn't supported by Firefox
            // - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
            //   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
            //   We will therefore only activate the flag when we're below that limit.
            // There is also a limit of requests that can be open at the same time, so we also limit this to 15
            // See https://github.com/getsentry/sentry-javascript/pull/7553 for details
            keepalive: pendingBodySize <= 60000 && pendingCount < 15,
            ...options.fetchOptions
        };
        try {
            // Note: We do not need to suppress tracing here, because we are using the native fetch, instead of our wrapped one.
            const response = await nativeFetch(options.url, requestOptions);
            return {
                statusCode: response.status,
                headers: {
                    'x-sentry-rate-limits': response.headers.get('X-Sentry-Rate-Limits'),
                    'retry-after': response.headers.get('Retry-After')
                }
            };
        } catch (e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearCachedImplementation"])('fetch');
            throw e;
        } finally{
            pendingBodySize -= requestSize;
            pendingCount--;
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTransport"])(options, makeRequest, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$promisebuffer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makePromiseBuffer"])(options.bufferSize || DEFAULT_BROWSER_TRANSPORT_BUFFER_SIZE));
}
;
 //# sourceMappingURL=fetch.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/utils/detectBrowserExtension.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAndWarnIfIsEmbeddedBrowserExtension",
    ()=>checkAndWarnIfIsEmbeddedBrowserExtension
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
;
/**
 * Returns true if the SDK is running in an embedded browser extension.
 * Stand-alone browser extensions (which do not share the same data as the main browser page) are fine.
 */ function checkAndWarnIfIsEmbeddedBrowserExtension() {
    if (_isEmbeddedBrowserExtension()) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["consoleSandbox"])(()=>{
                // eslint-disable-next-line no-console
                console.error('[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/');
            });
        }
        return true;
    }
    return false;
}
function _isEmbeddedBrowserExtension() {
    var _extensionObject_runtime;
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].window === 'undefined') {
        // No need to show the error if we're not in a browser window environment (e.g. service workers)
        return false;
    }
    const _window = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"];
    // Running the SDK in NW.js, which appears like a browser extension but isn't, is also fine
    // see: https://github.com/getsentry/sentry-javascript/issues/12668
    if (_window.nw) {
        return false;
    }
    const extensionObject = _window['chrome'] || _window['browser'];
    if (!(extensionObject === null || extensionObject === void 0 ? void 0 : (_extensionObject_runtime = extensionObject.runtime) === null || _extensionObject_runtime === void 0 ? void 0 : _extensionObject_runtime.id)) {
        return false;
    }
    const href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocationHref"])();
    // Running the SDK in a dedicated extension page and calling Sentry.init is fine; no risk of data leakage
    const isDedicatedExtensionPage = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"] === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].top && /^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(href);
    return !isDedicatedExtensionPage;
}
;
 //# sourceMappingURL=detectBrowserExtension.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/sdk.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "forceLoad",
    ()=>forceLoad,
    "getDefaultIntegrations",
    ()=>getDefaultIntegrations,
    "init",
    ()=>init,
    "onLoad",
    ()=>onLoad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integrations/eventFilters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integrations/functiontostring.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$conversationId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integrations/conversationId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integrations/dedupe.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+core@10.53.1/node_modules/@sentry/core/build/esm/sdk.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/breadcrumbs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browserapierrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browsersession.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$culturecontext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/culturecontext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpcontext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/linkederrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/integrations/spotlight.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/stack-parsers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$detectBrowserExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@sentry+browser@10.53.1/node_modules/@sentry/browser/build/npm/esm/dev/utils/detectBrowserExtension.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
/** Get the default integrations for the browser SDK. */ function getDefaultIntegrations(_options) {
    /**
   * Note: Please make sure this stays in sync with Angular SDK, which re-exports
   * `getDefaultIntegrations` but with an adjusted set of integrations.
   */ return [
        // TODO(v11): Replace with `eventFiltersIntegration` once we remove the deprecated `inboundFiltersIntegration`
        // eslint-disable-next-line deprecation/deprecation
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inboundFiltersIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionToStringIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$conversationId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["conversationIdIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserApiErrorsIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breadcrumbsIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalHandlersIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkedErrorsIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dedupeIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpContextIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$culturecontext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cultureContextIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserSessionIntegration"])()
    ];
}
/**
 * The Sentry Browser SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * loading the web page. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 *
 * ```
 *
 * import { init } from '@sentry/browser';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { addBreadcrumb } from '@sentry/browser';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 *
 * ```
 *
 * import * as Sentry from '@sentry/browser';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link BrowserOptions} for documentation on configuration options.
 */ function init() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const shouldDisableBecauseIsBrowserExtenstion = !options.skipBrowserExtensionCheck && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$detectBrowserExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkAndWarnIfIsEmbeddedBrowserExtension"])();
    let defaultIntegrations = options.defaultIntegrations == null ? getDefaultIntegrations() : options.defaultIntegrations;
    /* rollup-include-development-only */ if (options.spotlight) {
        if (!defaultIntegrations) {
            defaultIntegrations = [];
        }
        const args = typeof options.spotlight === 'string' ? {
            sidecarUrl: options.spotlight
        } : undefined;
        defaultIntegrations.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spotlightBrowserIntegration"])(args));
    }
    /* rollup-include-development-only-end */ const clientOptions = {
        ...options,
        enabled: shouldDisableBecauseIsBrowserExtenstion ? false : options.enabled,
        stackParser: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stackParserFromStackParserOptions"])(options.stackParser || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultStackParser"]),
        integrations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIntegrationsToSetup"])({
            integrations: options.integrations,
            defaultIntegrations
        }),
        transport: options.transport || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeFetchTransport"]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initAndBind"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$53$2e$1$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserClient"], clientOptions);
}
/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */ function forceLoad() {
// Noop
}
/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */ function onLoad(callback) {
    callback();
}
;
 //# sourceMappingURL=sdk.js.map
}),
]);

//# sourceMappingURL=774de_%40sentry_browser_build_npm_esm_dev_9862206d._.js.map