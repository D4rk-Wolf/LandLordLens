module.exports = [
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/types.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Base error for Supabase Edge Function invocations.
 *
 * @example
 * ```ts
 * import { FunctionsError } from '@supabase/functions-js'
 *
 * throw new FunctionsError('Unexpected error invoking function', 'FunctionsError', {
 *   requestId: 'abc123',
 * })
 * ```
 */ __turbopack_context__.s([
    "FunctionRegion",
    ()=>FunctionRegion,
    "FunctionsError",
    ()=>FunctionsError,
    "FunctionsFetchError",
    ()=>FunctionsFetchError,
    "FunctionsHttpError",
    ()=>FunctionsHttpError,
    "FunctionsRelayError",
    ()=>FunctionsRelayError
]);
class FunctionsError extends Error {
    constructor(message, name = 'FunctionsError', context){
        super(message);
        this.name = name;
        this.context = context;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            context: this.context
        };
    }
}
class FunctionsFetchError extends FunctionsError {
    constructor(context){
        super('Failed to send a request to the Edge Function', 'FunctionsFetchError', context);
    }
}
class FunctionsRelayError extends FunctionsError {
    constructor(context){
        super('Relay Error invoking the Edge Function', 'FunctionsRelayError', context);
    }
}
class FunctionsHttpError extends FunctionsError {
    constructor(context){
        super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', context);
    }
}
var FunctionRegion;
(function(FunctionRegion) {
    FunctionRegion["Any"] = "any";
    FunctionRegion["ApNortheast1"] = "ap-northeast-1";
    FunctionRegion["ApNortheast2"] = "ap-northeast-2";
    FunctionRegion["ApSouth1"] = "ap-south-1";
    FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
    FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
    FunctionRegion["CaCentral1"] = "ca-central-1";
    FunctionRegion["EuCentral1"] = "eu-central-1";
    FunctionRegion["EuWest1"] = "eu-west-1";
    FunctionRegion["EuWest2"] = "eu-west-2";
    FunctionRegion["EuWest3"] = "eu-west-3";
    FunctionRegion["SaEast1"] = "sa-east-1";
    FunctionRegion["UsEast1"] = "us-east-1";
    FunctionRegion["UsWest1"] = "us-west-1";
    FunctionRegion["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {})); //# sourceMappingURL=types.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/helper.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveFetch",
    ()=>resolveFetch
]);
const resolveFetch = (customFetch)=>{
    if (customFetch) {
        return (...args)=>customFetch(...args);
    }
    return (...args)=>fetch(...args);
}; //# sourceMappingURL=helper.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FunctionsClient",
    ()=>FunctionsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$tslib$40$2$2e$8$2e$1$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$helper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/helper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/types.js [app-rsc] (ecmascript)");
;
;
;
class FunctionsClient {
    /**
     * Creates a new Functions client bound to an Edge Functions URL.
     *
     * @example Using supabase-js (recommended)
     * ```ts
     * import { createClient } from '@supabase/supabase-js'
     *
     * const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
     * const { data, error } = await supabase.functions.invoke('hello-world')
     * ```
     *
     * @category Edge Functions
     *
     * @example Standalone import for bundle-sensitive environments
     * ```ts
     * import { FunctionsClient, FunctionRegion } from '@supabase/functions-js'
     *
     * const functions = new FunctionsClient('https://xyzcompany.supabase.co/functions/v1', {
     *   headers: { apikey: 'your-publishable-key' },
     *   region: FunctionRegion.UsEast1,
     * })
     * ```
     */ constructor(url, { headers = {}, customFetch, region = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionRegion"].Any } = {}){
        this.url = url;
        this.headers = headers;
        this.region = region;
        this.fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$helper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveFetch"])(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     *
     * @category Edge Functions
     *
     * @example Setting the authorization header
     * ```ts
     * functions.setAuth(session.access_token)
     * ```
     */ setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     * @example
     * ```ts
     * const { data, error } = await functions.invoke('hello-world', {
     *   body: { name: 'Ada' },
     * })
     * ```
     *
     * @category Edge Functions
     *
     * @remarks
     * - Requires an Authorization header.
     * - Invoke params generally match the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) spec.
     * - When you pass in a body to your function, we automatically attach the Content-Type header for `Blob`, `ArrayBuffer`, `File`, `FormData` and `String`. If it doesn't match any of these types we assume the payload is `json`, serialize it and attach the `Content-Type` header as `application/json`. You can override this behavior by passing in a `Content-Type` header of your own.
     * - Responses are automatically parsed as `json`, `blob` and `form-data` depending on the `Content-Type` header sent by your function. Responses are parsed as `text` by default.
     *
     * @example Basic invocation
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   body: { foo: 'bar' }
     * })
     * ```
     *
     * @exampleDescription Error handling
     * A `FunctionsHttpError` error is returned if your function throws an error, `FunctionsRelayError` if the Supabase Relay has an error processing your function and `FunctionsFetchError` if there is a network error in calling your function.
     *
     * @example Error handling
     * ```js
     * import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from "@supabase/supabase-js";
     *
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   body: { foo: 'bar' }
     * })
     *
     * if (error instanceof FunctionsHttpError) {
     *   const errorMessage = await error.context.json()
     *   console.log('Function returned an error', errorMessage)
     * } else if (error instanceof FunctionsRelayError) {
     *   console.log('Relay error:', error.message)
     * } else if (error instanceof FunctionsFetchError) {
     *   console.log('Fetch error:', error.message)
     * }
     * ```
     *
     * @exampleDescription Passing custom headers
     * You can pass custom headers to your function. Note: supabase-js automatically passes the `Authorization` header with the signed in user's JWT.
     *
     * @example Passing custom headers
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   body: { foo: 'bar' }
     * })
     * ```
     *
     * @exampleDescription Calling with DELETE HTTP verb
     * You can also set the HTTP verb to `DELETE` when calling your Edge Function.
     *
     * @example Calling with DELETE HTTP verb
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   body: { foo: 'bar' },
     *   method: 'DELETE'
     * })
     * ```
     *
     * @exampleDescription Invoking a Function in the UsEast1 region
     * Here are the available regions:
     * - `FunctionRegion.Any`
     * - `FunctionRegion.ApNortheast1`
     * - `FunctionRegion.ApNortheast2`
     * - `FunctionRegion.ApSouth1`
     * - `FunctionRegion.ApSoutheast1`
     * - `FunctionRegion.ApSoutheast2`
     * - `FunctionRegion.CaCentral1`
     * - `FunctionRegion.EuCentral1`
     * - `FunctionRegion.EuWest1`
     * - `FunctionRegion.EuWest2`
     * - `FunctionRegion.EuWest3`
     * - `FunctionRegion.SaEast1`
     * - `FunctionRegion.UsEast1`
     * - `FunctionRegion.UsWest1`
     * - `FunctionRegion.UsWest2`
     *
     * @example Invoking a Function in the UsEast1 region
     * ```js
     * import { createClient, FunctionRegion } from '@supabase/supabase-js'
     *
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   body: { foo: 'bar' },
     *   region: FunctionRegion.UsEast1
     * })
     * ```
     *
     * @exampleDescription Calling with GET HTTP verb
     * You can also set the HTTP verb to `GET` when calling your Edge Function.
     *
     * @example Calling with GET HTTP verb
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   method: 'GET'
     * })
     * ```
     *
     * @example Standalone client invoke
     * ```ts
     * const { data, error } = await functions.invoke('hello-world', {
     *   body: { name: 'Ada' },
     * })
     * ```
     */ invoke(functionName_1) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$tslib$40$2$2e$8$2e$1$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function*(functionName, options = {}) {
            var _a;
            let timeoutId;
            let timeoutController;
            try {
                const { headers, method, body: functionArgs, signal, timeout } = options;
                let _headers = {};
                let { region } = options;
                if (!region) {
                    region = this.region;
                }
                // Add region as query parameter using URL API
                const url = new URL(`${this.url}/${functionName}`);
                if (region && region !== 'any') {
                    _headers['x-region'] = region;
                    url.searchParams.set('forceFunctionRegion', region);
                }
                let body;
                if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, 'Content-Type') || !headers)) {
                    if (typeof Blob !== 'undefined' && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                        // will work for File as File inherits Blob
                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                        _headers['Content-Type'] = 'application/octet-stream';
                        body = functionArgs;
                    } else if (typeof functionArgs === 'string') {
                        // plain string
                        _headers['Content-Type'] = 'text/plain';
                        body = functionArgs;
                    } else if (typeof FormData !== 'undefined' && functionArgs instanceof FormData) {
                        // don't set content-type headers
                        // Request will automatically add the right boundary value
                        body = functionArgs;
                    } else {
                        // default, assume this is JSON
                        _headers['Content-Type'] = 'application/json';
                        body = JSON.stringify(functionArgs);
                    }
                } else {
                    if (functionArgs && typeof functionArgs !== 'string' && !(typeof Blob !== 'undefined' && functionArgs instanceof Blob) && !(functionArgs instanceof ArrayBuffer) && !(typeof FormData !== 'undefined' && functionArgs instanceof FormData)) {
                        body = JSON.stringify(functionArgs);
                    } else {
                        body = functionArgs;
                    }
                }
                // Handle timeout by creating an AbortController
                let effectiveSignal = signal;
                if (timeout) {
                    timeoutController = new AbortController();
                    timeoutId = setTimeout(()=>timeoutController.abort(), timeout);
                    // If user provided their own signal, we need to respect both
                    if (signal) {
                        effectiveSignal = timeoutController.signal;
                        // If the user's signal is aborted, abort our timeout controller too
                        signal.addEventListener('abort', ()=>timeoutController.abort());
                    } else {
                        effectiveSignal = timeoutController.signal;
                    }
                }
                const response = yield this.fetch(url.toString(), {
                    method: method || 'POST',
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                    body,
                    signal: effectiveSignal
                }).catch((fetchError)=>{
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsFetchError"](fetchError);
                });
                const isRelayError = response.headers.get('x-relay-error');
                if (isRelayError && isRelayError === 'true') {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsRelayError"](response);
                }
                if (!response.ok) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsHttpError"](response);
                }
                let responseType = ((_a = response.headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'text/plain').split(';')[0].trim();
                let data;
                if (responseType === 'application/json') {
                    data = yield response.json();
                } else if (responseType === 'application/octet-stream' || responseType === 'application/pdf') {
                    data = yield response.blob();
                } else if (responseType === 'text/event-stream') {
                    data = response;
                } else if (responseType === 'multipart/form-data') {
                    data = yield response.formData();
                } else {
                    // default to text
                    data = yield response.text();
                }
                return {
                    data,
                    error: null,
                    response
                };
            } catch (error) {
                return {
                    data: null,
                    error,
                    response: error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsHttpError"] || error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsRelayError"] ? error.context : undefined
                };
            } finally{
                // Clear the timeout if it was set
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        });
    }
} //# sourceMappingURL=FunctionsClient.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FunctionRegion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionRegion"],
    "FunctionsClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsClient"],
    "FunctionsError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsError"],
    "FunctionsFetchError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsFetchError"],
    "FunctionsHttpError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsHttpError"],
    "FunctionsRelayError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsRelayError"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/types.js [app-rsc] (ecmascript)");
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ __turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+phoenix@0.4.2/node_modules/@supabase/phoenix/priv/static/phoenix.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// js/phoenix/utils.js
__turbopack_context__.s([
    "Channel",
    ()=>Channel,
    "LongPoll",
    ()=>LongPoll,
    "Presence",
    ()=>Presence,
    "Push",
    ()=>Push,
    "Serializer",
    ()=>serializer_default,
    "Socket",
    ()=>Socket,
    "Timer",
    ()=>Timer
]);
var closure = (value)=>{
    if (typeof value === "function") {
        return /** @type {() => T} */ value;
    } else {
        let closure2 = function() {
            return value;
        };
        return closure2;
    }
};
// js/phoenix/constants.js
var globalSelf = typeof self !== "undefined" ? self : null;
var phxWindow = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
var global = globalSelf || phxWindow || globalThis;
var DEFAULT_VSN = "2.0.0";
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var SOCKET_STATES = /** @type {const} */ {
    connecting: 0,
    open: 1,
    closing: 2,
    closed: 3
};
var CHANNEL_STATES = /** @type {const} */ {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
};
var CHANNEL_EVENTS = /** @type {const} */ {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
};
var TRANSPORTS = /** @type {const} */ {
    longpoll: "longpoll",
    websocket: "websocket"
};
var XHR_STATES = /** @type {const} */ {
    complete: 4
};
var AUTH_TOKEN_PREFIX = "base64url.bearer.phx.";
// js/phoenix/push.js
var Push = class {
    /**
   * Initializes the Push
   * @param {Channel} channel - The Channel
   * @param {ChannelEvent} event - The event, for example `"phx_join"`
   * @param {() => Record<string, unknown>} payload - The payload, for example `{user_id: 123}`
   * @param {number} timeout - The push timeout in milliseconds
   */ constructor(channel, event, payload, timeout){
        this.channel = channel;
        this.event = event;
        this.payload = payload || function() {
            return {};
        };
        this.receivedResp = null;
        this.timeout = timeout;
        this.timeoutTimer = null;
        this.recHooks = [];
        this.sent = false;
        this.ref = void 0;
    }
    /**
   *
   * @param {number} timeout
   */ resend(timeout) {
        this.timeout = timeout;
        this.reset();
        this.send();
    }
    /**
   *
   */ send() {
        if (this.hasReceived("timeout")) {
            return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload(),
            ref: this.ref,
            join_ref: this.channel.joinRef()
        });
    }
    /**
   *
   * @param {string} status
   * @param {(response: any) => void} callback
   */ receive(status, callback) {
        if (this.hasReceived(status)) {
            callback(this.receivedResp.response);
        }
        this.recHooks.push({
            status,
            callback
        });
        return this;
    }
    reset() {
        this.cancelRefEvent();
        this.ref = null;
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
    }
    destroy() {
        this.cancelRefEvent();
        this.cancelTimeout();
    }
    /**
   * @private
   */ matchReceive({ status, response, _ref }) {
        this.recHooks.filter((h)=>h.status === status).forEach((h)=>h.callback(response));
    }
    /**
   * @private
   */ cancelRefEvent() {
        if (!this.refEvent) {
            return;
        }
        this.channel.off(this.refEvent);
    }
    cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
    }
    startTimeout() {
        if (this.timeoutTimer) {
            this.cancelTimeout();
        }
        this.ref = this.channel.socket.makeRef();
        this.refEvent = this.channel.replyEventName(this.ref);
        this.channel.on(this.refEvent, (payload)=>{
            this.cancelRefEvent();
            this.cancelTimeout();
            this.receivedResp = payload;
            this.matchReceive(payload);
        });
        this.timeoutTimer = setTimeout(()=>{
            this.trigger("timeout", {});
        }, this.timeout);
    }
    /**
   * @private
   */ hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
        this.channel.trigger(this.refEvent, {
            status,
            response
        });
    }
};
// js/phoenix/timer.js
var Timer = class {
    /**
  * @param {() => void} callback
  * @param {(tries: number) => number} timerCalc
  */ constructor(callback, timerCalc){
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = void 0;
        this.tries = 0;
    }
    reset() {
        this.tries = 0;
        clearTimeout(this.timer);
    }
    /**
   * Cancels any previous scheduleTimeout and schedules callback
   */ scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.tries = this.tries + 1;
            this.callback();
        }, this.timerCalc(this.tries + 1));
    }
};
// js/phoenix/channel.js
var Channel = class {
    /**
   * @param {string} topic
   * @param {Params | (() => Params)} params
   * @param {Socket} socket
   */ constructor(topic, params, socket){
        this.state = CHANNEL_STATES.closed;
        this.topic = topic;
        this.params = closure(params || {});
        this.socket = socket;
        this.bindings = [];
        this.bindingRef = 0;
        this.timeout = this.socket.timeout;
        this.joinedOnce = false;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.pushBuffer = [];
        this.stateChangeRefs = [];
        this.rejoinTimer = new Timer(()=>{
            if (this.socket.isConnected()) {
                this.rejoin();
            }
        }, this.socket.rejoinAfterMs);
        this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset()));
        this.stateChangeRefs.push(this.socket.onOpen(()=>{
            this.rejoinTimer.reset();
            if (this.isErrored()) {
                this.rejoin();
            }
        }));
        this.joinPush.receive("ok", ()=>{
            this.state = CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent)=>pushEvent.send());
            this.pushBuffer = [];
        });
        this.joinPush.receive("error", (reason)=>{
            this.state = CHANNEL_STATES.errored;
            if (this.socket.hasLogger()) this.socket.log("channel", `error ${this.topic}`, reason);
            if (this.socket.isConnected()) {
                this.rejoinTimer.scheduleTimeout();
            }
        });
        this.onClose(()=>{
            this.rejoinTimer.reset();
            if (this.socket.hasLogger()) this.socket.log("channel", `close ${this.topic}`);
            this.state = CHANNEL_STATES.closed;
            this.socket.remove(this);
        });
        this.onError((reason)=>{
            if (this.socket.hasLogger()) this.socket.log("channel", `error ${this.topic}`, reason);
            if (this.isJoining()) {
                this.joinPush.reset();
            }
            this.state = CHANNEL_STATES.errored;
            if (this.socket.isConnected()) {
                this.rejoinTimer.scheduleTimeout();
            }
        });
        this.joinPush.receive("timeout", ()=>{
            if (this.socket.hasLogger()) this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
            let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
            leavePush.send();
            this.state = CHANNEL_STATES.errored;
            this.joinPush.reset();
            if (this.socket.isConnected()) {
                this.rejoinTimer.scheduleTimeout();
            }
        });
        this.on(CHANNEL_EVENTS.reply, (payload, ref)=>{
            this.trigger(this.replyEventName(ref), payload);
        });
    }
    /**
   * Join the channel
   * @param {number} timeout
   * @returns {Push}
   */ join(timeout = this.timeout) {
        if (this.joinedOnce) {
            throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        } else {
            this.timeout = timeout;
            this.joinedOnce = true;
            this.rejoin();
            return this.joinPush;
        }
    }
    /**
   * Teardown the channel.
   *
   * Destroys and stops related timers.
   */ teardown() {
        this.pushBuffer.forEach((push)=>push.destroy());
        this.pushBuffer = [];
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        this.state = CHANNEL_STATES.closed;
        this.bindings = [];
    }
    /**
   * Hook into channel close
   * @param {ChannelBindingCallback} callback
   */ onClose(callback) {
        this.on(CHANNEL_EVENTS.close, callback);
    }
    /**
   * Hook into channel errors
   * @param {ChannelOnErrorCallback} callback
   * @return {number}
   */ onError(callback) {
        return this.on(CHANNEL_EVENTS.error, (reason)=>callback(reason));
    }
    /**
   * Subscribes on channel events
   *
   * Subscription returns a ref counter, which can be used later to
   * unsubscribe the exact event listener
   *
   * @example
   * const ref1 = channel.on("event", do_stuff)
   * const ref2 = channel.on("event", do_other_stuff)
   * channel.off("event", ref1)
   * // Since unsubscription, do_stuff won't fire,
   * // while do_other_stuff will keep firing on the "event"
   *
   * @param {string} event
   * @param {ChannelBindingCallback} callback
   * @returns {number} ref
   */ on(event, callback) {
        let ref = this.bindingRef++;
        this.bindings.push({
            event,
            ref,
            callback
        });
        return ref;
    }
    /**
   * Unsubscribes off of channel events
   *
   * Use the ref returned from a channel.on() to unsubscribe one
   * handler, or pass nothing for the ref to unsubscribe all
   * handlers for the given event.
   *
   * @example
   * // Unsubscribe the do_stuff handler
   * const ref1 = channel.on("event", do_stuff)
   * channel.off("event", ref1)
   *
   * // Unsubscribe all handlers from event
   * channel.off("event")
   *
   * @param {string} event
   * @param {number} [ref]
   */ off(event, ref) {
        this.bindings = this.bindings.filter((bind)=>{
            return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
        });
    }
    /**
   * @private
   */ canPush() {
        return this.socket.isConnected() && this.isJoined();
    }
    /**
   * Sends a message `event` to phoenix with the payload `payload`.
   * Phoenix receives this in the `handle_in(event, payload, socket)`
   * function. if phoenix replies or it times out (default 10000ms),
   * then optionally the reply can be received.
   *
   * @example
   * channel.push("event")
   *   .receive("ok", payload => console.log("phoenix replied:", payload))
   *   .receive("error", err => console.log("phoenix errored", err))
   *   .receive("timeout", () => console.log("timed out pushing"))
   * @param {string} event
   * @param {Object} payload
   * @param {number} [timeout]
   * @returns {Push}
   */ push(event, payload, timeout = this.timeout) {
        payload = payload || {};
        if (!this.joinedOnce) {
            throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
        }
        let pushEvent = new Push(this, event, function() {
            return payload;
        }, timeout);
        if (this.canPush()) {
            pushEvent.send();
        } else {
            pushEvent.startTimeout();
            this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
    }
    /** Leaves the channel
   *
   * Unsubscribes from server events, and
   * instructs channel to terminate on server
   *
   * Triggers onClose() hooks
   *
   * To receive leave acknowledgements, use the `receive`
   * hook to bind to the server ack, ie:
   *
   * @example
   * channel.leave().receive("ok", () => alert("left!") )
   *
   * @param {number} timeout
   * @returns {Push}
   */ leave(timeout = this.timeout) {
        this.rejoinTimer.reset();
        this.joinPush.cancelTimeout();
        this.state = CHANNEL_STATES.leaving;
        let onClose = ()=>{
            if (this.socket.hasLogger()) this.socket.log("channel", `leave ${this.topic}`);
            this.trigger(CHANNEL_EVENTS.close, "leave");
        };
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
        leavePush.receive("ok", ()=>onClose()).receive("timeout", ()=>onClose());
        leavePush.send();
        if (!this.canPush()) {
            leavePush.trigger("ok", {});
        }
        return leavePush;
    }
    /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling
   * before dispatching to the channel callbacks.
   *
   * Must return the payload, modified or unmodified
   * @type{ChannelOnMessage}
   */ onMessage(_event, payload, _ref) {
        return payload;
    }
    /**
   * Overridable filter hook
   *
   * If this function returns `true`, `binding`'s callback will be called.
   *
   * @type{ChannelFilterBindings}
   */ filterBindings(_binding, _payload, _ref) {
        return true;
    }
    isMember(topic, event, payload, joinRef) {
        if (this.topic !== topic) {
            return false;
        }
        if (joinRef && joinRef !== this.joinRef()) {
            if (this.socket.hasLogger()) this.socket.log("channel", "dropping outdated message", {
                topic,
                event,
                payload,
                joinRef
            });
            return false;
        } else {
            return true;
        }
    }
    joinRef() {
        return this.joinPush.ref;
    }
    /**
   * @private
   */ rejoin(timeout = this.timeout) {
        if (this.isLeaving()) {
            return;
        }
        this.socket.leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
    }
    /**
   * @param {string} event
   * @param {unknown} [payload]
   * @param {?string} [ref]
   * @param {?string} [joinRef]
   */ trigger(event, payload, ref, joinRef) {
        let handledPayload = this.onMessage(event, payload, ref, joinRef);
        if (payload && !handledPayload) {
            throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
        }
        let eventBindings = this.bindings.filter((bind)=>bind.event === event && this.filterBindings(bind, payload, ref));
        for(let i = 0; i < eventBindings.length; i++){
            let bind = eventBindings[i];
            bind.callback(handledPayload, ref, joinRef || this.joinRef());
        }
    }
    /**
  * @param {string} ref
  */ replyEventName(ref) {
        return `chan_reply_${ref}`;
    }
    isClosed() {
        return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
        return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
        return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
        return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
    }
};
// js/phoenix/ajax.js
var Ajax = class {
    static request(method, endPoint, headers, body, timeout, ontimeout, callback) {
        if (global.XDomainRequest) {
            let req = new global.XDomainRequest();
            return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
        } else if (global.XMLHttpRequest) {
            let req = new global.XMLHttpRequest();
            return this.xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback);
        } else if (global.fetch && global.AbortController) {
            return this.fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback);
        } else {
            throw new Error("No suitable XMLHttpRequest implementation found");
        }
    }
    static fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback) {
        let options = {
            method,
            headers,
            body
        };
        let controller = null;
        if (timeout) {
            controller = new AbortController();
            const _timeoutId = setTimeout(()=>controller.abort(), timeout);
            options.signal = controller.signal;
        }
        global.fetch(endPoint, options).then((response)=>response.text()).then((data)=>this.parseJSON(data)).then((data)=>callback && callback(data)).catch((err)=>{
            if (err.name === "AbortError" && ontimeout) {
                ontimeout();
            } else {
                callback && callback(null);
            }
        });
        return controller;
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
        req.timeout = timeout;
        req.open(method, endPoint);
        req.onload = ()=>{
            let response = this.parseJSON(req.responseText);
            callback && callback(response);
        };
        if (ontimeout) {
            req.ontimeout = ontimeout;
        }
        req.onprogress = ()=>{};
        req.send(body);
        return req;
    }
    static xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback) {
        req.open(method, endPoint, true);
        req.timeout = timeout;
        for (let [key, value] of Object.entries(headers)){
            req.setRequestHeader(key, value);
        }
        req.onerror = ()=>callback && callback(null);
        req.onreadystatechange = ()=>{
            if (req.readyState === XHR_STATES.complete && callback) {
                let response = this.parseJSON(req.responseText);
                callback(response);
            }
        };
        if (ontimeout) {
            req.ontimeout = ontimeout;
        }
        req.send(body);
        return req;
    }
    static parseJSON(resp) {
        if (!resp || resp === "") {
            return null;
        }
        try {
            return JSON.parse(resp);
        } catch  {
            console && console.log("failed to parse JSON response", resp);
            return null;
        }
    }
    static serialize(obj, parentKey) {
        let queryStr = [];
        for(var key in obj){
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            let paramKey = parentKey ? `${parentKey}[${key}]` : key;
            let paramVal = obj[key];
            if (typeof paramVal === "object") {
                queryStr.push(this.serialize(paramVal, paramKey));
            } else {
                queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
            }
        }
        return queryStr.join("&");
    }
    static appendParams(url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        let prefix = url.match(/\?/) ? "&" : "?";
        return `${url}${prefix}${this.serialize(params)}`;
    }
};
// js/phoenix/longpoll.js
var arrayBufferToBase64 = (buffer)=>{
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for(let i = 0; i < len; i++){
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};
var LongPoll = class {
    constructor(endPoint, protocols){
        if (protocols && protocols.length === 2 && protocols[1].startsWith(AUTH_TOKEN_PREFIX)) {
            this.authToken = atob(protocols[1].slice(AUTH_TOKEN_PREFIX.length));
        }
        this.endPoint = null;
        this.token = null;
        this.skipHeartbeat = true;
        this.reqs = /* @__PURE__ */ new Set();
        this.awaitingBatchAck = false;
        this.currentBatch = null;
        this.currentBatchTimer = null;
        this.batchBuffer = [];
        this.onopen = function() {};
        this.onerror = function() {};
        this.onmessage = function() {};
        this.onclose = function() {};
        this.pollEndpoint = this.normalizeEndpoint(endPoint);
        this.readyState = SOCKET_STATES.connecting;
        setTimeout(()=>this.poll(), 0);
    }
    normalizeEndpoint(endPoint) {
        return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
        return Ajax.appendParams(this.pollEndpoint, {
            token: this.token
        });
    }
    closeAndRetry(code, reason, wasClean) {
        this.close(code, reason, wasClean);
        this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
        this.onerror("timeout");
        this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
        return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
        const headers = {
            "Accept": "application/json"
        };
        if (this.authToken) {
            headers["X-Phoenix-AuthToken"] = this.authToken;
        }
        this.ajax("GET", headers, null, ()=>this.ontimeout(), (resp)=>{
            if (resp) {
                var { status, token, messages } = resp;
                if (status === 410 && this.token !== null) {
                    this.onerror(410);
                    this.closeAndRetry(3410, "session_gone", false);
                    return;
                }
                this.token = token;
            } else {
                status = 0;
            }
            switch(status){
                case 200:
                    messages.forEach((msg)=>{
                        setTimeout(()=>this.onmessage({
                                data: msg
                            }), 0);
                    });
                    this.poll();
                    break;
                case 204:
                    this.poll();
                    break;
                case 410:
                    this.readyState = SOCKET_STATES.open;
                    this.onopen({});
                    this.poll();
                    break;
                case 403:
                    this.onerror(403);
                    this.close(1008, "forbidden", false);
                    break;
                case 0:
                case 500:
                    this.onerror(500);
                    this.closeAndRetry(1011, "internal server error", 500);
                    break;
                default:
                    throw new Error(`unhandled poll status ${status}`);
            }
        });
    }
    // we collect all pushes within the current event loop by
    // setTimeout 0, which optimizes back-to-back procedural
    // pushes against an empty buffer
    send(body) {
        if (typeof body !== "string") {
            body = arrayBufferToBase64(body);
        }
        if (this.currentBatch) {
            this.currentBatch.push(body);
        } else if (this.awaitingBatchAck) {
            this.batchBuffer.push(body);
        } else {
            this.currentBatch = [
                body
            ];
            this.currentBatchTimer = setTimeout(()=>{
                this.batchSend(this.currentBatch);
                this.currentBatch = null;
            }, 0);
        }
    }
    batchSend(messages) {
        this.awaitingBatchAck = true;
        this.ajax("POST", {
            "Content-Type": "application/x-ndjson"
        }, messages.join("\n"), ()=>this.onerror("timeout"), (resp)=>{
            this.awaitingBatchAck = false;
            if (!resp || resp.status !== 200) {
                this.onerror(resp && resp.status);
                this.closeAndRetry(1011, "internal server error", false);
            } else if (this.batchBuffer.length > 0) {
                this.batchSend(this.batchBuffer);
                this.batchBuffer = [];
            }
        });
    }
    close(code, reason, wasClean) {
        for (let req of this.reqs){
            req.abort();
        }
        this.readyState = SOCKET_STATES.closed;
        let opts = Object.assign({
            code: 1e3,
            reason: void 0,
            wasClean: true
        }, {
            code,
            reason,
            wasClean
        });
        this.batchBuffer = [];
        clearTimeout(this.currentBatchTimer);
        this.currentBatchTimer = null;
        if (typeof CloseEvent !== "undefined") {
            this.onclose(new CloseEvent("close", opts));
        } else {
            this.onclose(opts);
        }
    }
    ajax(method, headers, body, onCallerTimeout, callback) {
        let req;
        let ontimeout = ()=>{
            this.reqs.delete(req);
            onCallerTimeout();
        };
        req = Ajax.request(method, this.endpointURL(), headers, body, this.timeout, ontimeout, (resp)=>{
            this.reqs.delete(req);
            if (this.isActive()) {
                callback(resp);
            }
        });
        this.reqs.add(req);
    }
};
// js/phoenix/presence.js
var Presence = class _Presence {
    /**
   * Initializes the Presence
   * @param {Channel} channel - The Channel
   * @param {PresenceOptions} [opts] - The options, for example `{events: {state: "state", diff: "diff"}}`
   */ constructor(channel, opts = {}){
        let events = opts.events || /** @type {PresenceEvents} */ {
            state: "presence_state",
            diff: "presence_diff"
        };
        this.state = {};
        this.pendingDiffs = [];
        this.channel = channel;
        this.joinRef = null;
        this.caller = {
            onJoin: function() {},
            onLeave: function() {},
            onSync: function() {}
        };
        this.channel.on(events.state, (newState)=>{
            let { onJoin, onLeave, onSync } = this.caller;
            this.joinRef = this.channel.joinRef();
            this.state = _Presence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff)=>{
                this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
        });
        this.channel.on(events.diff, (diff)=>{
            let { onJoin, onLeave, onSync } = this.caller;
            if (this.inPendingSyncState()) {
                this.pendingDiffs.push(diff);
            } else {
                this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
                onSync();
            }
        });
    }
    /**
   * @param {PresenceOnJoin} callback
   */ onJoin(callback) {
        this.caller.onJoin = callback;
    }
    /**
   * @param {PresenceOnLeave} callback
   */ onLeave(callback) {
        this.caller.onLeave = callback;
    }
    /**
   * @param {PresenceOnSync} callback
   */ onSync(callback) {
        this.caller.onSync = callback;
    }
    /**
   * Returns the array of presences, with selected metadata.
   *
   * @template [T=PresenceState]
   * @param {((key: string, obj: PresenceState) => T)} [by]
   *
   * @returns {T[]}
   */ list(by) {
        return _Presence.list(this.state, by);
    }
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel.joinRef();
    }
    // lower-level public static API
    /**
   * Used to sync the list of presences on the server
   * with the client's state. An optional `onJoin` and `onLeave` callback can
   * be provided to react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @param {Record<string, PresenceState>} currentState
   * @param {Record<string, PresenceState>} newState
   * @param {PresenceOnJoin} onJoin
   * @param {PresenceOnLeave} onLeave
   *
   * @returns {Record<string, PresenceState>}
   */ static syncState(currentState, newState, onJoin, onLeave) {
        let state = this.clone(currentState);
        let joins = {};
        let leaves = {};
        this.map(state, (key, presence)=>{
            if (!newState[key]) {
                leaves[key] = presence;
            }
        });
        this.map(newState, (key, newPresence)=>{
            let currentPresence = state[key];
            if (currentPresence) {
                let newRefs = newPresence.metas.map((m)=>m.phx_ref);
                let curRefs = currentPresence.metas.map((m)=>m.phx_ref);
                let joinedMetas = newPresence.metas.filter((m)=>curRefs.indexOf(m.phx_ref) < 0);
                let leftMetas = currentPresence.metas.filter((m)=>newRefs.indexOf(m.phx_ref) < 0);
                if (joinedMetas.length > 0) {
                    joins[key] = newPresence;
                    joins[key].metas = joinedMetas;
                }
                if (leftMetas.length > 0) {
                    leaves[key] = this.clone(currentPresence);
                    leaves[key].metas = leftMetas;
                }
            } else {
                joins[key] = newPresence;
            }
        });
        return this.syncDiff(state, {
            joins,
            leaves
        }, onJoin, onLeave);
    }
    /**
   *
   * Used to sync a diff of presence join and leave
   * events from the server, as they happen. Like `syncState`, `syncDiff`
   * accepts optional `onJoin` and `onLeave` callbacks to react to a user
   * joining or leaving from a device.
   *
   * @param {Record<string, PresenceState>} state
   * @param {PresenceDiff} diff
   * @param {PresenceOnJoin} onJoin
   * @param {PresenceOnLeave} onLeave
   *
   * @returns {Record<string, PresenceState>}
   */ static syncDiff(state, diff, onJoin, onLeave) {
        let { joins, leaves } = this.clone(diff);
        if (!onJoin) {
            onJoin = function() {};
        }
        if (!onLeave) {
            onLeave = function() {};
        }
        this.map(joins, (key, newPresence)=>{
            let currentPresence = state[key];
            state[key] = this.clone(newPresence);
            if (currentPresence) {
                let joinedRefs = state[key].metas.map((m)=>m.phx_ref);
                let curMetas = currentPresence.metas.filter((m)=>joinedRefs.indexOf(m.phx_ref) < 0);
                state[key].metas.unshift(...curMetas);
            }
            onJoin(key, currentPresence, newPresence);
        });
        this.map(leaves, (key, leftPresence)=>{
            let currentPresence = state[key];
            if (!currentPresence) {
                return;
            }
            let refsToRemove = leftPresence.metas.map((m)=>m.phx_ref);
            currentPresence.metas = currentPresence.metas.filter((p)=>{
                return refsToRemove.indexOf(p.phx_ref) < 0;
            });
            onLeave(key, currentPresence, leftPresence);
            if (currentPresence.metas.length === 0) {
                delete state[key];
            }
        });
        return state;
    }
    /**
   * Returns the array of presences, with selected metadata.
   *
   * @template [T=PresenceState]
   * @param {Record<string, PresenceState>} presences
   * @param {((key: string, obj: PresenceState) => T)} [chooser]
   *
   * @returns {T[]}
   */ static list(presences, chooser) {
        if (!chooser) {
            chooser = function(key, pres) {
                return pres;
            };
        }
        return this.map(presences, (key, presence)=>{
            return chooser(key, presence);
        });
    }
    // private
    /**
  * @template T
  * @param {Record<string, PresenceState>} obj
  * @param {(key: string, obj: PresenceState) => T} func
  */ static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key)=>func(key, obj[key]));
    }
    /**
  * @template T
  * @param {T} obj
  * @returns {T}
  */ static clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
};
// js/phoenix/serializer.js
var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: {
        push: 0,
        reply: 1,
        broadcast: 2
    },
    /**
  * @template T
  * @param {Message<Record<string, any>>} msg
  * @param {(msg: ArrayBuffer | string) => T} callback
  * @returns {T}
  */ encode (msg, callback) {
        if (msg.payload.constructor === ArrayBuffer) {
            return callback(this.binaryEncode(msg));
        } else {
            let payload = [
                msg.join_ref,
                msg.ref,
                msg.topic,
                msg.event,
                msg.payload
            ];
            return callback(JSON.stringify(payload));
        }
    },
    /**
  * @template T
  * @param {ArrayBuffer | string} rawPayload
  * @param {(msg: Message<unknown>) => T} callback
  * @returns {T}
  */ decode (rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
            return callback(this.binaryDecode(rawPayload));
        } else {
            let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
            return callback({
                join_ref,
                ref,
                topic,
                event,
                payload
            });
        }
    },
    /** @private */ binaryEncode (message) {
        let { join_ref, ref, event, topic, payload } = message;
        let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
        let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
        let view = new DataView(header);
        let offset = 0;
        view.setUint8(offset++, this.KINDS.push);
        view.setUint8(offset++, join_ref.length);
        view.setUint8(offset++, ref.length);
        view.setUint8(offset++, topic.length);
        view.setUint8(offset++, event.length);
        Array.from(join_ref, (char)=>view.setUint8(offset++, char.charCodeAt(0)));
        Array.from(ref, (char)=>view.setUint8(offset++, char.charCodeAt(0)));
        Array.from(topic, (char)=>view.setUint8(offset++, char.charCodeAt(0)));
        Array.from(event, (char)=>view.setUint8(offset++, char.charCodeAt(0)));
        var combined = new Uint8Array(header.byteLength + payload.byteLength);
        combined.set(new Uint8Array(header), 0);
        combined.set(new Uint8Array(payload), header.byteLength);
        return combined.buffer;
    },
    /**
  * @private
  */ binaryDecode (buffer) {
        let view = new DataView(buffer);
        let kind = view.getUint8(0);
        let decoder = new TextDecoder();
        switch(kind){
            case this.KINDS.push:
                return this.decodePush(buffer, view, decoder);
            case this.KINDS.reply:
                return this.decodeReply(buffer, view, decoder);
            case this.KINDS.broadcast:
                return this.decodeBroadcast(buffer, view, decoder);
        }
    },
    /** @private */ decodePush (buffer, view, decoder) {
        let joinRefSize = view.getUint8(1);
        let topicSize = view.getUint8(2);
        let eventSize = view.getUint8(3);
        let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
        let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
        offset = offset + joinRefSize;
        let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        let event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        let data = buffer.slice(offset, buffer.byteLength);
        return {
            join_ref: joinRef,
            ref: null,
            topic,
            event,
            payload: data
        };
    },
    /** @private */ decodeReply (buffer, view, decoder) {
        let joinRefSize = view.getUint8(1);
        let refSize = view.getUint8(2);
        let topicSize = view.getUint8(3);
        let eventSize = view.getUint8(4);
        let offset = this.HEADER_LENGTH + this.META_LENGTH;
        let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
        offset = offset + joinRefSize;
        let ref = decoder.decode(buffer.slice(offset, offset + refSize));
        offset = offset + refSize;
        let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        let event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        let data = buffer.slice(offset, buffer.byteLength);
        let payload = {
            status: event,
            response: data
        };
        return {
            join_ref: joinRef,
            ref,
            topic,
            event: CHANNEL_EVENTS.reply,
            payload
        };
    },
    /** @private */ decodeBroadcast (buffer, view, decoder) {
        let topicSize = view.getUint8(1);
        let eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        let event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        let data = buffer.slice(offset, buffer.byteLength);
        return {
            join_ref: null,
            ref: null,
            topic,
            event,
            payload: data
        };
    }
};
// js/phoenix/socket.js
var Socket = class {
    /** Initializes the Socket *
   *
   * For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
   *
   * @constructor
   * @param {string} endPoint - The string WebSocket endpoint, ie, `"ws://example.com/socket"`,
   *                                               `"wss://example.com"`
   *                                               `"/socket"` (inherited host & protocol)
   * @param {SocketOptions} [opts] - Optional configuration
   */ constructor(endPoint, opts = {}){
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        };
        this.channels = [];
        this.sendBuffer = [];
        this.ref = 0;
        this.fallbackRef = null;
        this.timeout = opts.timeout || DEFAULT_TIMEOUT;
        this.transport = opts.transport || global.WebSocket || LongPoll;
        this.conn = void 0;
        this.primaryPassedHealthCheck = false;
        this.longPollFallbackMs = opts.longPollFallbackMs;
        this.fallbackTimer = null;
        let envSessionStorage = null;
        try {
            envSessionStorage = global && global.sessionStorage;
        } catch  {}
        this.sessionStore = opts.sessionStorage || envSessionStorage;
        this.establishedConnections = 0;
        this.defaultEncoder = serializer_default.encode.bind(serializer_default);
        this.defaultDecoder = serializer_default.decode.bind(serializer_default);
        this.closeWasClean = true;
        this.disconnecting = false;
        this.binaryType = opts.binaryType || "arraybuffer";
        this.connectClock = 1;
        this.pageHidden = false;
        this.encode = void 0;
        this.decode = void 0;
        if (this.transport !== LongPoll) {
            this.encode = opts.encode || this.defaultEncoder;
            this.decode = opts.decode || this.defaultDecoder;
        } else {
            this.encode = this.defaultEncoder;
            this.decode = this.defaultDecoder;
        }
        let awaitingConnectionOnPageShow = null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
        this.autoSendHeartbeat = opts.autoSendHeartbeat ?? true;
        this.heartbeatCallback = opts.heartbeatCallback ?? (()=>{});
        this.rejoinAfterMs = (tries)=>{
            if (opts.rejoinAfterMs) {
                return opts.rejoinAfterMs(tries);
            } else {
                return [
                    1e3,
                    2e3,
                    5e3
                ][tries - 1] || 1e4;
            }
        };
        this.reconnectAfterMs = (tries)=>{
            if (opts.reconnectAfterMs) {
                return opts.reconnectAfterMs(tries);
            } else {
                return [
                    10,
                    50,
                    100,
                    150,
                    200,
                    250,
                    500,
                    1e3,
                    2e3
                ][tries - 1] || 5e3;
            }
        };
        this.logger = opts.logger || null;
        if (!this.logger && opts.debug) {
            this.logger = (kind, msg, data)=>{
                console.log(`${kind}: ${msg}`, data);
            };
        }
        this.longpollerTimeout = opts.longpollerTimeout || 2e4;
        this.params = closure(opts.params || {});
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        this.vsn = opts.vsn || DEFAULT_VSN;
        this.heartbeatTimeoutTimer = null;
        this.heartbeatTimer = null;
        this.heartbeatSentAt = null;
        this.pendingHeartbeatRef = null;
        this.reconnectTimer = new Timer(()=>{
            if (this.pageHidden) {
                this.log("Not reconnecting as page is hidden!");
                this.teardown();
                return;
            }
            this.teardown(async ()=>{
                if (opts.beforeReconnect) await opts.beforeReconnect();
                this.connect();
            });
        }, this.reconnectAfterMs);
        this.authToken = opts.authToken;
    }
    /**
   * Returns the LongPoll transport reference
   */ getLongPollTransport() {
        return LongPoll;
    }
    /**
   * Disconnects and replaces the active transport
   *
   * @param {SocketTransport} newTransport - The new transport class to instantiate
   *
   */ replaceTransport(newTransport) {
        this.connectClock++;
        this.closeWasClean = true;
        clearTimeout(this.fallbackTimer);
        this.reconnectTimer.reset();
        if (this.conn) {
            this.conn.close();
            this.conn = null;
        }
        this.transport = newTransport;
    }
    /**
   * Returns the socket protocol
   *
   * @returns {"wss" | "ws"}
   */ protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    /**
   * The fully qualified socket url
   *
   * @returns {string}
   */ endPointURL() {
        let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), {
            vsn: this.vsn
        });
        if (uri.charAt(0) !== "/") {
            return uri;
        }
        if (uri.charAt(1) === "/") {
            return `${this.protocol()}:${uri}`;
        }
        return `${this.protocol()}://${location.host}${uri}`;
    }
    /**
   * Disconnects the socket
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
   *
   * @param {() => void} [callback] - Optional callback which is called after socket is disconnected.
   * @param {number} [code] - A status code for disconnection (Optional).
   * @param {string} [reason] - A textual description of the reason to disconnect. (Optional)
   */ disconnect(callback, code, reason) {
        this.connectClock++;
        this.disconnecting = true;
        this.closeWasClean = true;
        clearTimeout(this.fallbackTimer);
        this.reconnectTimer.reset();
        this.teardown(()=>{
            this.disconnecting = false;
            callback && callback();
        }, code, reason);
    }
    /**
   * @param {Params} [params] - [DEPRECATED] The params to send when connecting, for example `{user_id: userToken}`
   *
   * Passing params to connect is deprecated; pass them in the Socket constructor instead:
   * `new Socket("/socket", {params: {user_id: userToken}})`.
   */ connect(params) {
        if (params) {
            console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
            this.params = closure(params);
        }
        if (this.conn && !this.disconnecting) {
            return;
        }
        if (this.longPollFallbackMs && this.transport !== LongPoll) {
            this.connectWithFallback(LongPoll, this.longPollFallbackMs);
        } else {
            this.transportConnect();
        }
    }
    /**
   * Logs the message. Override `this.logger` for specialized logging. noops by default
   * @param {string} kind
   * @param {string} msg
   * @param {Object} data
   */ log(kind, msg, data) {
        this.logger && this.logger(kind, msg, data);
    }
    /**
   * Returns true if a logger has been set on this socket.
   */ hasLogger() {
        return this.logger !== null;
    }
    /**
   * Registers callbacks for connection open events
   *
   * @example socket.onOpen(function(){ console.info("the socket was opened") })
   *
   * @param {SocketOnOpen} callback
   */ onOpen(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.open.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Registers callbacks for connection close events
   * @param {SocketOnClose} callback
   * @returns {string}
   */ onClose(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.close.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Registers callbacks for connection error events
   *
   * @example socket.onError(function(error){ alert("An error occurred") })
   *
   * @param {SocketOnError} callback
   * @returns {string}
   */ onError(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.error.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Registers callbacks for connection message events
   * @param {SocketOnMessage} callback
   * @returns {string}
   */ onMessage(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.message.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Sets a callback that receives lifecycle events for internal heartbeat messages.
   * Useful for instrumenting connection health (e.g. sent/ok/timeout/disconnected).
   * @param {HeartbeatCallback} callback
   */ onHeartbeat(callback) {
        this.heartbeatCallback = callback;
    }
    /**
   * Pings the server and invokes the callback with the RTT in milliseconds
   * @param {(timeDelta: number) => void} callback
   *
   * Returns true if the ping was pushed or false if unable to be pushed.
   */ ping(callback) {
        if (!this.isConnected()) {
            return false;
        }
        let ref = this.makeRef();
        let startTime = Date.now();
        this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref
        });
        let onMsgRef = this.onMessage((msg)=>{
            if (msg.ref === ref) {
                this.off([
                    onMsgRef
                ]);
                callback(Date.now() - startTime);
            }
        });
        return true;
    }
    /**
   * @private
   *
   * @param {Function}
   */ transportName(transport) {
        switch(transport){
            case LongPoll:
                return "LongPoll";
            default:
                return transport.name;
        }
    }
    /**
   * @private
   */ transportConnect() {
        this.connectClock++;
        this.closeWasClean = false;
        let protocols = void 0;
        if (this.authToken) {
            protocols = [
                "phoenix",
                `${AUTH_TOKEN_PREFIX}${btoa(this.authToken).replace(/=/g, "")}`
            ];
        }
        this.conn = new this.transport(this.endPointURL(), protocols);
        this.conn.binaryType = this.binaryType;
        this.conn.timeout = this.longpollerTimeout;
        this.conn.onopen = ()=>this.onConnOpen();
        this.conn.onerror = (error)=>this.onConnError(error);
        this.conn.onmessage = (event)=>this.onConnMessage(event);
        this.conn.onclose = (event)=>this.onConnClose(event);
    }
    getSession(key) {
        return this.sessionStore && this.sessionStore.getItem(key);
    }
    storeSession(key, val) {
        this.sessionStore && this.sessionStore.setItem(key, val);
    }
    connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
        clearTimeout(this.fallbackTimer);
        let established = false;
        let primaryTransport = true;
        let openRef, errorRef;
        let fallbackTransportName = this.transportName(fallbackTransport);
        let fallback = (reason)=>{
            this.log("transport", `falling back to ${fallbackTransportName}...`, reason);
            this.off([
                openRef,
                errorRef
            ]);
            primaryTransport = false;
            this.replaceTransport(fallbackTransport);
            this.transportConnect();
        };
        if (this.getSession(`phx:fallback:${fallbackTransportName}`)) {
            return fallback("memorized");
        }
        this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
        errorRef = this.onError((reason)=>{
            this.log("transport", "error", reason);
            if (primaryTransport && !established) {
                clearTimeout(this.fallbackTimer);
                fallback(reason);
            }
        });
        if (this.fallbackRef) {
            this.off([
                this.fallbackRef
            ]);
        }
        this.fallbackRef = this.onOpen(()=>{
            established = true;
            if (!primaryTransport) {
                let fallbackTransportName2 = this.transportName(fallbackTransport);
                if (!this.primaryPassedHealthCheck) {
                    this.storeSession(`phx:fallback:${fallbackTransportName2}`, "true");
                }
                return this.log("transport", `established ${fallbackTransportName2} fallback`);
            }
            clearTimeout(this.fallbackTimer);
            this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
            this.ping((rtt)=>{
                this.log("transport", "connected to primary after", rtt);
                this.primaryPassedHealthCheck = true;
                clearTimeout(this.fallbackTimer);
            });
        });
        this.transportConnect();
    }
    clearHeartbeats() {
        clearTimeout(this.heartbeatTimer);
        clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
        if (this.hasLogger()) this.log("transport", `connected to ${this.endPointURL()}`);
        this.closeWasClean = false;
        this.disconnecting = false;
        this.establishedConnections++;
        this.flushSendBuffer();
        this.reconnectTimer.reset();
        if (this.autoSendHeartbeat) {
            this.resetHeartbeat();
        }
        this.triggerStateCallbacks("open");
    }
    /**
   * @private
   */ heartbeatTimeout() {
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.heartbeatSentAt = null;
            if (this.hasLogger()) {
                this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            }
            try {
                this.heartbeatCallback("timeout");
            } catch (e) {
                this.log("error", "error in heartbeat callback", e);
            }
            this.triggerChanError(new Error("heartbeat timeout"));
            this.closeWasClean = false;
            this.teardown(()=>this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
        }
    }
    resetHeartbeat() {
        if (this.conn && this.conn.skipHeartbeat) {
            return;
        }
        this.pendingHeartbeatRef = null;
        this.clearHeartbeats();
        this.heartbeatTimer = setTimeout(()=>this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
        if (!this.conn) {
            return callback && callback();
        }
        const connToClose = this.conn;
        this.waitForBufferDone(connToClose, ()=>{
            if (code) {
                connToClose.close(code, reason || "");
            } else {
                connToClose.close();
            }
            this.waitForSocketClosed(connToClose, ()=>{
                if (this.conn === connToClose) {
                    this.conn.onopen = function() {};
                    this.conn.onerror = function() {};
                    this.conn.onmessage = function() {};
                    this.conn.onclose = function() {};
                    this.conn = null;
                }
                callback && callback();
            });
        });
    }
    waitForBufferDone(conn, callback, tries = 1) {
        if (tries === 5 || !conn.bufferedAmount) {
            callback();
            return;
        }
        setTimeout(()=>{
            this.waitForBufferDone(conn, callback, tries + 1);
        }, 150 * tries);
    }
    waitForSocketClosed(conn, callback, tries = 1) {
        if (tries === 5 || conn.readyState === SOCKET_STATES.closed) {
            callback();
            return;
        }
        setTimeout(()=>{
            this.waitForSocketClosed(conn, callback, tries + 1);
        }, 150 * tries);
    }
    /**
  * @param {CloseEvent} event
  */ onConnClose(event) {
        if (this.conn) this.conn.onclose = ()=>{};
        if (this.hasLogger()) this.log("transport", "close", event);
        this.triggerChanError(event);
        this.clearHeartbeats();
        if (!this.closeWasClean) {
            this.reconnectTimer.scheduleTimeout();
        }
        this.triggerStateCallbacks("close", event);
    }
    /**
   * @private
   * @param {Event} error
   */ onConnError(error) {
        if (this.hasLogger()) this.log("transport", "error", error);
        let transportBefore = this.transport;
        let establishedBefore = this.establishedConnections;
        this.triggerStateCallbacks("error", error, transportBefore, establishedBefore);
        if (transportBefore === this.transport || establishedBefore > 0) {
            this.triggerChanError(error);
        }
    }
    /**
   * @private
   * @param {unknown} [reason] underlying close/error event forwarded to channel error listeners
   */ triggerChanError(reason) {
        this.channels.forEach((channel)=>{
            if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
                channel.trigger(CHANNEL_EVENTS.error, reason);
            }
        });
    }
    /**
   * @returns {string}
   */ connectionState() {
        switch(this.conn && this.conn.readyState){
            case SOCKET_STATES.connecting:
                return "connecting";
            case SOCKET_STATES.open:
                return "open";
            case SOCKET_STATES.closing:
                return "closing";
            default:
                return "closed";
        }
    }
    /**
   * @returns {boolean}
   */ isConnected() {
        return this.connectionState() === "open";
    }
    /**
   *
   * @param {Channel} channel
   */ remove(channel) {
        this.off(channel.stateChangeRefs);
        this.channels = this.channels.filter((c)=>c !== channel);
    }
    /**
   * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
   *
   * @param {string[]} refs - list of refs returned by calls to
   *                 `onOpen`, `onClose`, `onError,` and `onMessage`
   */ off(refs) {
        for(let key in this.stateChangeCallbacks){
            this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref])=>{
                return refs.indexOf(ref) === -1;
            });
        }
    }
    /**
   * Initiates a new channel for the given topic
   *
   * @param {string} topic
   * @param {Params | (() => Params)} [chanParams]- Parameters for the channel
   * @returns {Channel}
   */ channel(topic, chanParams = {}) {
        let chan = new Channel(topic, chanParams, this);
        this.channels.push(chan);
        return chan;
    }
    /**
   * @param {Message<Record<string, any>>} data
   */ push(data) {
        if (this.hasLogger()) {
            let { topic, event, payload, ref, join_ref } = data;
            this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
        }
        if (this.isConnected()) {
            this.encode(data, (result)=>this.conn.send(result));
        } else {
            this.sendBuffer.push(()=>this.encode(data, (result)=>this.conn.send(result)));
        }
    }
    /**
   * Return the next message ref, accounting for overflows
   * @returns {string}
   */ makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
            this.ref = 0;
        } else {
            this.ref = newRef;
        }
        return this.ref.toString();
    }
    sendHeartbeat() {
        if (!this.isConnected()) {
            try {
                this.heartbeatCallback("disconnected");
            } catch (e) {
                this.log("error", "error in heartbeat callback", e);
            }
            return;
        }
        if (this.pendingHeartbeatRef) {
            this.heartbeatTimeout();
            return;
        }
        this.pendingHeartbeatRef = this.makeRef();
        this.heartbeatSentAt = Date.now();
        this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef
        });
        try {
            this.heartbeatCallback("sent");
        } catch (e) {
            this.log("error", "error in heartbeat callback", e);
        }
        this.heartbeatTimeoutTimer = setTimeout(()=>this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback)=>callback());
            this.sendBuffer = [];
        }
    }
    /**
  * @param {MessageEvent<any>} rawMessage
  */ onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg)=>{
            let { topic, event, payload, ref, join_ref } = msg;
            if (ref && ref === this.pendingHeartbeatRef) {
                const latency = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
                this.clearHeartbeats();
                try {
                    this.heartbeatCallback(payload.status === "ok" ? "ok" : "error", latency);
                } catch (e) {
                    this.log("error", "error in heartbeat callback", e);
                }
                this.pendingHeartbeatRef = null;
                this.heartbeatSentAt = null;
                if (this.autoSendHeartbeat) {
                    this.heartbeatTimer = setTimeout(()=>this.sendHeartbeat(), this.heartbeatIntervalMs);
                }
            }
            if (this.hasLogger()) this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`.trim(), payload);
            for(let i = 0; i < this.channels.length; i++){
                const channel = this.channels[i];
                if (!channel.isMember(topic, event, payload, join_ref)) {
                    continue;
                }
                channel.trigger(event, payload, ref, join_ref);
            }
            this.triggerStateCallbacks("message", msg);
        });
    }
    /**
   * @private
   * @template {keyof SocketStateChangeCallbacks} K
   * @param {K} event
   * @param {...Parameters<SocketStateChangeCallbacks[K][number][1]>} args
   * @returns {void}
   */ triggerStateCallbacks(event, ...args) {
        try {
            this.stateChangeCallbacks[event].forEach(([_, callback])=>{
                try {
                    callback(...args);
                } catch (e) {
                    this.log("error", `error in ${event} callback`, e);
                }
            });
        } catch (e) {
            this.log("error", `error triggering ${event} callbacks`, e);
        }
    }
    leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c)=>c.topic === topic && (c.isJoined() || c.isJoining()));
        if (dupChannel) {
            if (this.hasLogger()) this.log("transport", `leaving duplicate topic "${topic}"`);
            dupChannel.leave();
        }
    }
};
;
 //# sourceMappingURL=phoenix.mjs.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/iceberg-js@0.8.1/node_modules/iceberg-js/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/errors/IcebergError.ts
__turbopack_context__.s([
    "IcebergError",
    ()=>IcebergError,
    "IcebergRestCatalog",
    ()=>IcebergRestCatalog,
    "getCurrentSchema",
    ()=>getCurrentSchema,
    "isDecimalType",
    ()=>isDecimalType,
    "isFixedType",
    ()=>isFixedType,
    "parseDecimalType",
    ()=>parseDecimalType,
    "parseFixedType",
    ()=>parseFixedType,
    "typesEqual",
    ()=>typesEqual
]);
var IcebergError = class extends Error {
    constructor(message, opts){
        super(message);
        this.name = "IcebergError";
        this.status = opts.status;
        this.icebergType = opts.icebergType;
        this.icebergCode = opts.icebergCode;
        this.details = opts.details;
        this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [
            500,
            502,
            504
        ].includes(opts.status) && opts.icebergType?.includes("CommitState") === true;
    }
    /**
   * Returns true if the error is a 404 Not Found error.
   */ isNotFound() {
        return this.status === 404;
    }
    /**
   * Returns true if the error is a 409 Conflict error.
   */ isConflict() {
        return this.status === 409;
    }
    /**
   * Returns true if the error is a 419 Authentication Timeout error.
   */ isAuthenticationTimeout() {
        return this.status === 419;
    }
};
// src/utils/url.ts
function buildUrl(baseUrl, path, query) {
    const url = new URL(path, baseUrl);
    if (query) {
        for (const [key, value] of Object.entries(query)){
            if (value !== void 0) {
                url.searchParams.set(key, value);
            }
        }
    }
    return url.toString();
}
// src/http/createFetchClient.ts
async function buildAuthHeaders(auth) {
    if (!auth || auth.type === "none") {
        return {};
    }
    if (auth.type === "bearer") {
        return {
            Authorization: `Bearer ${auth.token}`
        };
    }
    if (auth.type === "header") {
        return {
            [auth.name]: auth.value
        };
    }
    if (auth.type === "custom") {
        return await auth.getHeaders();
    }
    return {};
}
function createFetchClient(options) {
    const fetchFn = options.fetchImpl ?? globalThis.fetch;
    return {
        async request ({ method, path, query, body, headers }) {
            const url = buildUrl(options.baseUrl, path, query);
            const authHeaders = await buildAuthHeaders(options.auth);
            const res = await fetchFn(url, {
                method,
                headers: {
                    ...body ? {
                        "Content-Type": "application/json"
                    } : {},
                    ...authHeaders,
                    ...headers
                },
                body: body ? JSON.stringify(body) : void 0
            });
            const text = await res.text();
            const isJson = (res.headers.get("content-type") || "").includes("application/json");
            const data = isJson && text ? JSON.parse(text) : text;
            if (!res.ok) {
                const errBody = isJson ? data : void 0;
                const errorDetail = errBody?.error;
                throw new IcebergError(errorDetail?.message ?? `Request failed with status ${res.status}`, {
                    status: res.status,
                    icebergType: errorDetail?.type,
                    icebergCode: errorDetail?.code,
                    details: errBody
                });
            }
            return {
                status: res.status,
                headers: res.headers,
                data
            };
        }
    };
}
// src/catalog/namespaces.ts
function namespaceToPath(namespace) {
    return namespace.join("");
}
var NamespaceOperations = class {
    constructor(client, prefix = ""){
        this.client = client;
        this.prefix = prefix;
    }
    async listNamespaces(parent) {
        const query = parent ? {
            parent: namespaceToPath(parent.namespace)
        } : void 0;
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces`,
            query
        });
        return response.data.namespaces.map((ns)=>({
                namespace: ns
            }));
    }
    async createNamespace(id, metadata) {
        const request = {
            namespace: id.namespace,
            properties: metadata?.properties
        };
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces`,
            body: request
        });
        return response.data;
    }
    async dropNamespace(id) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
    }
    async loadNamespaceMetadata(id) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
        return {
            properties: response.data.properties
        };
    }
    async namespaceExists(id) {
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createNamespaceIfNotExists(id, metadata) {
        try {
            return await this.createNamespace(id, metadata);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return;
            }
            throw error;
        }
    }
};
// src/catalog/tables.ts
function namespaceToPath2(namespace) {
    return namespace.join("");
}
var TableOperations = class {
    constructor(client, prefix = "", accessDelegation){
        this.client = client;
        this.prefix = prefix;
        this.accessDelegation = accessDelegation;
    }
    async listTables(namespace) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`
        });
        return response.data.identifiers;
    }
    async createTable(namespace, request) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`,
            body: request,
            headers
        });
        return response.data.metadata;
    }
    async updateTable(id, request) {
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            body: request
        });
        return {
            "metadata-location": response.data["metadata-location"],
            metadata: response.data.metadata
        };
    }
    async dropTable(id, options) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            query: {
                purgeRequested: String(options?.purge ?? false)
            }
        });
    }
    async loadTable(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            headers
        });
        return response.data.metadata;
    }
    async tableExists(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
                headers
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createTableIfNotExists(namespace, request) {
        try {
            return await this.createTable(namespace, request);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return await this.loadTable({
                    namespace: namespace.namespace,
                    name: request.name
                });
            }
            throw error;
        }
    }
};
// src/catalog/IcebergRestCatalog.ts
var IcebergRestCatalog = class {
    /**
   * Creates a new Iceberg REST Catalog client.
   *
   * @param options - Configuration options for the catalog client
   */ constructor(options){
        let prefix = "v1";
        if (options.catalogName) {
            prefix += `/${options.catalogName}`;
        }
        const baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl : `${options.baseUrl}/`;
        this.client = createFetchClient({
            baseUrl,
            auth: options.auth,
            fetchImpl: options.fetch
        });
        this.accessDelegation = options.accessDelegation?.join(",");
        this.namespaceOps = new NamespaceOperations(this.client, prefix);
        this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
    }
    /**
   * Lists all namespaces in the catalog.
   *
   * @param parent - Optional parent namespace to list children under
   * @returns Array of namespace identifiers
   *
   * @example
   * ```typescript
   * // List all top-level namespaces
   * const namespaces = await catalog.listNamespaces();
   *
   * // List namespaces under a parent
   * const children = await catalog.listNamespaces({ namespace: ['analytics'] });
   * ```
   */ async listNamespaces(parent) {
        return this.namespaceOps.listNamespaces(parent);
    }
    /**
   * Creates a new namespace in the catalog.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespace(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * console.log(response.namespace); // ['analytics']
   * console.log(response.properties); // { owner: 'data-team', ... }
   * ```
   */ async createNamespace(id, metadata) {
        return this.namespaceOps.createNamespace(id, metadata);
    }
    /**
   * Drops a namespace from the catalog.
   *
   * The namespace must be empty (contain no tables) before it can be dropped.
   *
   * @param id - Namespace identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropNamespace({ namespace: ['analytics'] });
   * ```
   */ async dropNamespace(id) {
        await this.namespaceOps.dropNamespace(id);
    }
    /**
   * Loads metadata for a namespace.
   *
   * @param id - Namespace identifier to load
   * @returns Namespace metadata including properties
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadNamespaceMetadata({ namespace: ['analytics'] });
   * console.log(metadata.properties);
   * ```
   */ async loadNamespaceMetadata(id) {
        return this.namespaceOps.loadNamespaceMetadata(id);
    }
    /**
   * Lists all tables in a namespace.
   *
   * @param namespace - Namespace identifier to list tables from
   * @returns Array of table identifiers
   *
   * @example
   * ```typescript
   * const tables = await catalog.listTables({ namespace: ['analytics'] });
   * console.log(tables); // [{ namespace: ['analytics'], name: 'events' }, ...]
   * ```
   */ async listTables(namespace) {
        return this.tableOps.listTables(namespace);
    }
    /**
   * Creates a new table in the catalog.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTable(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     },
   *     'partition-spec': {
   *       'spec-id': 0,
   *       fields: [
   *         { source_id: 2, field_id: 1000, name: 'ts_day', transform: 'day' }
   *       ]
   *     }
   *   }
   * );
   * ```
   */ async createTable(namespace, request) {
        return this.tableOps.createTable(namespace, request);
    }
    /**
   * Updates an existing table's metadata.
   *
   * Can update the schema, partition spec, or properties of a table.
   *
   * @param id - Table identifier to update
   * @param request - Update request with fields to modify
   * @returns Response containing the metadata location and updated table metadata
   *
   * @example
   * ```typescript
   * const response = await catalog.updateTable(
   *   { namespace: ['analytics'], name: 'events' },
   *   {
   *     properties: { 'read.split.target-size': '134217728' }
   *   }
   * );
   * console.log(response['metadata-location']); // s3://...
   * console.log(response.metadata); // TableMetadata object
   * ```
   */ async updateTable(id, request) {
        return this.tableOps.updateTable(id, request);
    }
    /**
   * Drops a table from the catalog.
   *
   * @param id - Table identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropTable({ namespace: ['analytics'], name: 'events' });
   * ```
   */ async dropTable(id, options) {
        await this.tableOps.dropTable(id, options);
    }
    /**
   * Loads metadata for a table.
   *
   * @param id - Table identifier to load
   * @returns Table metadata including schema, partition spec, location, etc.
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadTable({ namespace: ['analytics'], name: 'events' });
   * console.log(metadata.schema);
   * console.log(metadata.location);
   * ```
   */ async loadTable(id) {
        return this.tableOps.loadTable(id);
    }
    /**
   * Checks if a namespace exists in the catalog.
   *
   * @param id - Namespace identifier to check
   * @returns True if the namespace exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.namespaceExists({ namespace: ['analytics'] });
   * console.log(exists); // true or false
   * ```
   */ async namespaceExists(id) {
        return this.namespaceOps.namespaceExists(id);
    }
    /**
   * Checks if a table exists in the catalog.
   *
   * @param id - Table identifier to check
   * @returns True if the table exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.tableExists({ namespace: ['analytics'], name: 'events' });
   * console.log(exists); // true or false
   * ```
   */ async tableExists(id) {
        return this.tableOps.tableExists(id);
    }
    /**
   * Creates a namespace if it does not exist.
   *
   * If the namespace already exists, returns void. If created, returns the response.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties, or void if it already exists
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespaceIfNotExists(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * if (response) {
   *   console.log('Created:', response.namespace);
   * } else {
   *   console.log('Already exists');
   * }
   * ```
   */ async createNamespaceIfNotExists(id, metadata) {
        return this.namespaceOps.createNamespaceIfNotExists(id, metadata);
    }
    /**
   * Creates a table if it does not exist.
   *
   * If the table already exists, returns its metadata instead.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created or existing table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTableIfNotExists(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     }
   *   }
   * );
   * ```
   */ async createTableIfNotExists(namespace, request) {
        return this.tableOps.createTableIfNotExists(namespace, request);
    }
};
// src/catalog/types.ts
var DECIMAL_REGEX = /^decimal\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)$/;
var FIXED_REGEX = /^fixed\s*\[\s*(\d+)\s*\]$/;
function parseDecimalType(type) {
    const match = type.match(DECIMAL_REGEX);
    if (!match) return null;
    return {
        precision: parseInt(match[1], 10),
        scale: parseInt(match[2], 10)
    };
}
function parseFixedType(type) {
    const match = type.match(FIXED_REGEX);
    if (!match) return null;
    return {
        length: parseInt(match[1], 10)
    };
}
function isDecimalType(type) {
    return DECIMAL_REGEX.test(type);
}
function isFixedType(type) {
    return FIXED_REGEX.test(type);
}
function typesEqual(a, b) {
    const decimalA = parseDecimalType(a);
    const decimalB = parseDecimalType(b);
    if (decimalA && decimalB) {
        return decimalA.precision === decimalB.precision && decimalA.scale === decimalB.scale;
    }
    const fixedA = parseFixedType(a);
    const fixedB = parseFixedType(b);
    if (fixedA && fixedB) {
        return fixedA.length === fixedB.length;
    }
    return a === b;
}
function getCurrentSchema(metadata) {
    return metadata.schemas.find((s)=>s["schema-id"] === metadata["current-schema-id"]);
}
;
 //# sourceMappingURL=index.mjs.map
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/iceberg-js@0.8.1/node_modules/iceberg-js/dist/index.cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// src/errors/IcebergError.ts
var IcebergError = class extends Error {
    constructor(message, opts){
        super(message);
        this.name = "IcebergError";
        this.status = opts.status;
        this.icebergType = opts.icebergType;
        this.icebergCode = opts.icebergCode;
        this.details = opts.details;
        this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [
            500,
            502,
            504
        ].includes(opts.status) && opts.icebergType?.includes("CommitState") === true;
    }
    /**
   * Returns true if the error is a 404 Not Found error.
   */ isNotFound() {
        return this.status === 404;
    }
    /**
   * Returns true if the error is a 409 Conflict error.
   */ isConflict() {
        return this.status === 409;
    }
    /**
   * Returns true if the error is a 419 Authentication Timeout error.
   */ isAuthenticationTimeout() {
        return this.status === 419;
    }
};
// src/utils/url.ts
function buildUrl(baseUrl, path, query) {
    const url = new URL(path, baseUrl);
    if (query) {
        for (const [key, value] of Object.entries(query)){
            if (value !== void 0) {
                url.searchParams.set(key, value);
            }
        }
    }
    return url.toString();
}
// src/http/createFetchClient.ts
async function buildAuthHeaders(auth) {
    if (!auth || auth.type === "none") {
        return {};
    }
    if (auth.type === "bearer") {
        return {
            Authorization: `Bearer ${auth.token}`
        };
    }
    if (auth.type === "header") {
        return {
            [auth.name]: auth.value
        };
    }
    if (auth.type === "custom") {
        return await auth.getHeaders();
    }
    return {};
}
function createFetchClient(options) {
    const fetchFn = options.fetchImpl ?? globalThis.fetch;
    return {
        async request ({ method, path, query, body, headers }) {
            const url = buildUrl(options.baseUrl, path, query);
            const authHeaders = await buildAuthHeaders(options.auth);
            const res = await fetchFn(url, {
                method,
                headers: {
                    ...body ? {
                        "Content-Type": "application/json"
                    } : {},
                    ...authHeaders,
                    ...headers
                },
                body: body ? JSON.stringify(body) : void 0
            });
            const text = await res.text();
            const isJson = (res.headers.get("content-type") || "").includes("application/json");
            const data = isJson && text ? JSON.parse(text) : text;
            if (!res.ok) {
                const errBody = isJson ? data : void 0;
                const errorDetail = errBody?.error;
                throw new IcebergError(errorDetail?.message ?? `Request failed with status ${res.status}`, {
                    status: res.status,
                    icebergType: errorDetail?.type,
                    icebergCode: errorDetail?.code,
                    details: errBody
                });
            }
            return {
                status: res.status,
                headers: res.headers,
                data
            };
        }
    };
}
// src/catalog/namespaces.ts
function namespaceToPath(namespace) {
    return namespace.join("");
}
var NamespaceOperations = class {
    constructor(client, prefix = ""){
        this.client = client;
        this.prefix = prefix;
    }
    async listNamespaces(parent) {
        const query = parent ? {
            parent: namespaceToPath(parent.namespace)
        } : void 0;
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces`,
            query
        });
        return response.data.namespaces.map((ns)=>({
                namespace: ns
            }));
    }
    async createNamespace(id, metadata) {
        const request = {
            namespace: id.namespace,
            properties: metadata?.properties
        };
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces`,
            body: request
        });
        return response.data;
    }
    async dropNamespace(id) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
    }
    async loadNamespaceMetadata(id) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
        return {
            properties: response.data.properties
        };
    }
    async namespaceExists(id) {
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createNamespaceIfNotExists(id, metadata) {
        try {
            return await this.createNamespace(id, metadata);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return;
            }
            throw error;
        }
    }
};
// src/catalog/tables.ts
function namespaceToPath2(namespace) {
    return namespace.join("");
}
var TableOperations = class {
    constructor(client, prefix = "", accessDelegation){
        this.client = client;
        this.prefix = prefix;
        this.accessDelegation = accessDelegation;
    }
    async listTables(namespace) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`
        });
        return response.data.identifiers;
    }
    async createTable(namespace, request) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`,
            body: request,
            headers
        });
        return response.data.metadata;
    }
    async updateTable(id, request) {
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            body: request
        });
        return {
            "metadata-location": response.data["metadata-location"],
            metadata: response.data.metadata
        };
    }
    async dropTable(id, options) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            query: {
                purgeRequested: String(options?.purge ?? false)
            }
        });
    }
    async loadTable(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            headers
        });
        return response.data.metadata;
    }
    async tableExists(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
                headers
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createTableIfNotExists(namespace, request) {
        try {
            return await this.createTable(namespace, request);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return await this.loadTable({
                    namespace: namespace.namespace,
                    name: request.name
                });
            }
            throw error;
        }
    }
};
// src/catalog/IcebergRestCatalog.ts
var IcebergRestCatalog = class {
    /**
   * Creates a new Iceberg REST Catalog client.
   *
   * @param options - Configuration options for the catalog client
   */ constructor(options){
        let prefix = "v1";
        if (options.catalogName) {
            prefix += `/${options.catalogName}`;
        }
        const baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl : `${options.baseUrl}/`;
        this.client = createFetchClient({
            baseUrl,
            auth: options.auth,
            fetchImpl: options.fetch
        });
        this.accessDelegation = options.accessDelegation?.join(",");
        this.namespaceOps = new NamespaceOperations(this.client, prefix);
        this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
    }
    /**
   * Lists all namespaces in the catalog.
   *
   * @param parent - Optional parent namespace to list children under
   * @returns Array of namespace identifiers
   *
   * @example
   * ```typescript
   * // List all top-level namespaces
   * const namespaces = await catalog.listNamespaces();
   *
   * // List namespaces under a parent
   * const children = await catalog.listNamespaces({ namespace: ['analytics'] });
   * ```
   */ async listNamespaces(parent) {
        return this.namespaceOps.listNamespaces(parent);
    }
    /**
   * Creates a new namespace in the catalog.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespace(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * console.log(response.namespace); // ['analytics']
   * console.log(response.properties); // { owner: 'data-team', ... }
   * ```
   */ async createNamespace(id, metadata) {
        return this.namespaceOps.createNamespace(id, metadata);
    }
    /**
   * Drops a namespace from the catalog.
   *
   * The namespace must be empty (contain no tables) before it can be dropped.
   *
   * @param id - Namespace identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropNamespace({ namespace: ['analytics'] });
   * ```
   */ async dropNamespace(id) {
        await this.namespaceOps.dropNamespace(id);
    }
    /**
   * Loads metadata for a namespace.
   *
   * @param id - Namespace identifier to load
   * @returns Namespace metadata including properties
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadNamespaceMetadata({ namespace: ['analytics'] });
   * console.log(metadata.properties);
   * ```
   */ async loadNamespaceMetadata(id) {
        return this.namespaceOps.loadNamespaceMetadata(id);
    }
    /**
   * Lists all tables in a namespace.
   *
   * @param namespace - Namespace identifier to list tables from
   * @returns Array of table identifiers
   *
   * @example
   * ```typescript
   * const tables = await catalog.listTables({ namespace: ['analytics'] });
   * console.log(tables); // [{ namespace: ['analytics'], name: 'events' }, ...]
   * ```
   */ async listTables(namespace) {
        return this.tableOps.listTables(namespace);
    }
    /**
   * Creates a new table in the catalog.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTable(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     },
   *     'partition-spec': {
   *       'spec-id': 0,
   *       fields: [
   *         { source_id: 2, field_id: 1000, name: 'ts_day', transform: 'day' }
   *       ]
   *     }
   *   }
   * );
   * ```
   */ async createTable(namespace, request) {
        return this.tableOps.createTable(namespace, request);
    }
    /**
   * Updates an existing table's metadata.
   *
   * Can update the schema, partition spec, or properties of a table.
   *
   * @param id - Table identifier to update
   * @param request - Update request with fields to modify
   * @returns Response containing the metadata location and updated table metadata
   *
   * @example
   * ```typescript
   * const response = await catalog.updateTable(
   *   { namespace: ['analytics'], name: 'events' },
   *   {
   *     properties: { 'read.split.target-size': '134217728' }
   *   }
   * );
   * console.log(response['metadata-location']); // s3://...
   * console.log(response.metadata); // TableMetadata object
   * ```
   */ async updateTable(id, request) {
        return this.tableOps.updateTable(id, request);
    }
    /**
   * Drops a table from the catalog.
   *
   * @param id - Table identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropTable({ namespace: ['analytics'], name: 'events' });
   * ```
   */ async dropTable(id, options) {
        await this.tableOps.dropTable(id, options);
    }
    /**
   * Loads metadata for a table.
   *
   * @param id - Table identifier to load
   * @returns Table metadata including schema, partition spec, location, etc.
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadTable({ namespace: ['analytics'], name: 'events' });
   * console.log(metadata.schema);
   * console.log(metadata.location);
   * ```
   */ async loadTable(id) {
        return this.tableOps.loadTable(id);
    }
    /**
   * Checks if a namespace exists in the catalog.
   *
   * @param id - Namespace identifier to check
   * @returns True if the namespace exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.namespaceExists({ namespace: ['analytics'] });
   * console.log(exists); // true or false
   * ```
   */ async namespaceExists(id) {
        return this.namespaceOps.namespaceExists(id);
    }
    /**
   * Checks if a table exists in the catalog.
   *
   * @param id - Table identifier to check
   * @returns True if the table exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.tableExists({ namespace: ['analytics'], name: 'events' });
   * console.log(exists); // true or false
   * ```
   */ async tableExists(id) {
        return this.tableOps.tableExists(id);
    }
    /**
   * Creates a namespace if it does not exist.
   *
   * If the namespace already exists, returns void. If created, returns the response.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties, or void if it already exists
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespaceIfNotExists(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * if (response) {
   *   console.log('Created:', response.namespace);
   * } else {
   *   console.log('Already exists');
   * }
   * ```
   */ async createNamespaceIfNotExists(id, metadata) {
        return this.namespaceOps.createNamespaceIfNotExists(id, metadata);
    }
    /**
   * Creates a table if it does not exist.
   *
   * If the table already exists, returns its metadata instead.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created or existing table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTableIfNotExists(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     }
   *   }
   * );
   * ```
   */ async createTableIfNotExists(namespace, request) {
        return this.tableOps.createTableIfNotExists(namespace, request);
    }
};
// src/catalog/types.ts
var DECIMAL_REGEX = /^decimal\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)$/;
var FIXED_REGEX = /^fixed\s*\[\s*(\d+)\s*\]$/;
function parseDecimalType(type) {
    const match = type.match(DECIMAL_REGEX);
    if (!match) return null;
    return {
        precision: parseInt(match[1], 10),
        scale: parseInt(match[2], 10)
    };
}
function parseFixedType(type) {
    const match = type.match(FIXED_REGEX);
    if (!match) return null;
    return {
        length: parseInt(match[1], 10)
    };
}
function isDecimalType(type) {
    return DECIMAL_REGEX.test(type);
}
function isFixedType(type) {
    return FIXED_REGEX.test(type);
}
function typesEqual(a, b) {
    const decimalA = parseDecimalType(a);
    const decimalB = parseDecimalType(b);
    if (decimalA && decimalB) {
        return decimalA.precision === decimalB.precision && decimalA.scale === decimalB.scale;
    }
    const fixedA = parseFixedType(a);
    const fixedB = parseFixedType(b);
    if (fixedA && fixedB) {
        return fixedA.length === fixedB.length;
    }
    return a === b;
}
function getCurrentSchema(metadata) {
    return metadata.schemas.find((s)=>s["schema-id"] === metadata["current-schema-id"]);
}
exports.IcebergError = IcebergError;
exports.IcebergRestCatalog = IcebergRestCatalog;
exports.getCurrentSchema = getCurrentSchema;
exports.isDecimalType = isDecimalType;
exports.isFixedType = isFixedType;
exports.parseDecimalType = parseDecimalType;
exports.parseFixedType = parseFixedType;
exports.typesEqual = typesEqual; //# sourceMappingURL=index.cjs.map
 //# sourceMappingURL=index.cjs.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+supabase-js@2.105.4/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseClient",
    ()=>SupabaseClient,
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/types.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$postgrest$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$postgrest$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+postgrest-js@2.105.4/node_modules/@supabase/postgrest-js/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$realtime$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+realtime-js@2.105.4/node_modules/@supabase/realtime-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$realtime$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RealtimeClient$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+realtime-js@2.105.4/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js [app-rsc] (ecmascript) <export default as RealtimeClient>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$storage$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$storage$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+storage-js@2.105.4/node_modules/@supabase/storage-js/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$auth$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+auth-js@2.105.4/node_modules/@supabase/auth-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$auth$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$AuthClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AuthClient$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+auth-js@2.105.4/node_modules/@supabase/auth-js/dist/module/AuthClient.js [app-rsc] (ecmascript) <export default as AuthClient>");
;
;
;
;
;
;
;
//#region src/lib/version.ts
const version = "2.105.4";
//#endregion
//#region src/lib/constants.ts
let JS_ENV = "";
if (typeof Deno !== "undefined") JS_ENV = "deno";
else if (typeof document !== "undefined") JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") JS_ENV = "react-native";
else JS_ENV = "node";
const DEFAULT_HEADERS = {
    "X-Client-Info": `supabase-js-${JS_ENV}/${version}`
};
const DEFAULT_GLOBAL_OPTIONS = {
    headers: DEFAULT_HEADERS
};
const DEFAULT_DB_OPTIONS = {
    schema: "public"
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "implicit"
};
const DEFAULT_REALTIME_OPTIONS = {};
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/typeof.js
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
        return typeof o$1;
    } : function(o$1) {
        return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r$1) {
            return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
            _defineProperty(e, r$1, t[r$1]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
            Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
        });
    }
    return e;
}
//#endregion
//#region src/lib/fetch.ts
const resolveFetch = (customFetch)=>{
    if (customFetch) return (...args)=>customFetch(...args);
    return (...args)=>fetch(...args);
};
const resolveHeadersConstructor = ()=>{
    return Headers;
};
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch)=>{
    const fetch$1 = resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return async (input, init)=>{
        var _await$getAccessToken;
        const accessToken = (_await$getAccessToken = await getAccessToken()) !== null && _await$getAccessToken !== void 0 ? _await$getAccessToken : supabaseKey;
        let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
        if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
        if (!headers.has("Authorization")) headers.set("Authorization", `Bearer ${accessToken}`);
        return fetch$1(input, _objectSpread2(_objectSpread2({}, init), {}, {
            headers
        }));
    };
};
//#endregion
//#region src/lib/helpers.ts
function ensureTrailingSlash(url) {
    return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
    var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header;
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
    const { db: DEFAULT_DB_OPTIONS$1, auth: DEFAULT_AUTH_OPTIONS$1, realtime: DEFAULT_REALTIME_OPTIONS$1, global: DEFAULT_GLOBAL_OPTIONS$1 } = defaults;
    const result = {
        db: _objectSpread2(_objectSpread2({}, DEFAULT_DB_OPTIONS$1), dbOptions),
        auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
        realtime: _objectSpread2(_objectSpread2({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
        storage: {},
        global: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, {
            headers: _objectSpread2(_objectSpread2({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== void 0 ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _globalOptions$header !== void 0 ? _globalOptions$header : {})
        }),
        accessToken: async ()=>""
    };
    if (options.accessToken) result.accessToken = options.accessToken;
    else delete result.accessToken;
    return result;
}
/**
* Validates a Supabase client URL
*
* @param {string} supabaseUrl - The Supabase client URL string.
* @returns {URL} - The validated base URL.
* @throws {Error}
*/ function validateSupabaseUrl(supabaseUrl) {
    const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
    if (!trimmedUrl) throw new Error("supabaseUrl is required.");
    if (!trimmedUrl.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
    try {
        return new URL(ensureTrailingSlash(trimmedUrl));
    } catch (_unused) {
        throw Error("Invalid supabaseUrl: Provided URL is malformed.");
    }
}
//#endregion
//#region src/lib/SupabaseAuthClient.ts
var SupabaseAuthClient = class extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$auth$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$AuthClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AuthClient$3e$__["AuthClient"] {
    constructor(options){
        super(options);
    }
};
//#endregion
//#region src/SupabaseClient.ts
/**
* Supabase Client.
*
* An isomorphic Javascript client for interacting with Postgres.
*/ var SupabaseClient = class {
    /**
	* Create a new client for use in the browser.
	*
	* @category Initializing
	*
	* @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
	* @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
	* @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
	* @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
	* @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
	* @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
	* @param options.realtime Options passed along to realtime-js constructor.
	* @param options.storage Options passed along to the storage-js constructor.
	* @param options.global.fetch A custom fetch implementation.
	* @param options.global.headers Any additional headers to send with each network request.
	*
	* @example Creating a client
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Create a single supabase client for interacting with your database
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* ```
	*
	* @example With a custom domain
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Use a custom domain as the supabase URL
	* const supabase = createClient('https://my-custom-domain.com', 'your-publishable-key')
	* ```
	*
	* @example With additional parameters
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const options = {
	*   db: {
	*     schema: 'public',
	*   },
	*   auth: {
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: true
	*   },
	*   global: {
	*     headers: { 'x-my-custom-header': 'my-app-name' },
	*   },
	* }
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", options)
	* ```
	*
	* @exampleDescription With custom schemas
	* By default the API server points to the `public` schema. You can enable other database schemas within the Dashboard.
	* Go to [Settings > API > Exposed schemas](/dashboard/project/_/settings/api) and add the schema which you want to expose to the API.
	*
	* Note: each client connection can only access a single schema, so the code above can access the `other_schema` schema but cannot access the `public` schema.
	*
	* @example With custom schemas
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   // Provide a custom schema. Defaults to "public".
	*   db: { schema: 'other_schema' }
	* })
	* ```
	*
	* @exampleDescription Custom fetch implementation
	* `supabase-js` uses the [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) library to make HTTP requests,
	* but an alternative `fetch` implementation can be provided as an option.
	* This is most useful in environments where `cross-fetch` is not compatible (for instance Cloudflare Workers).
	*
	* @example Custom fetch implementation
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   global: { fetch: fetch.bind(globalThis) }
	* })
	* ```
	*
	* @exampleDescription React Native options with AsyncStorage
	* For React Native we recommend using `AsyncStorage` as the storage implementation for Supabase Auth.
	*
	* @example React Native options with AsyncStorage
	* ```js
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from "@react-native-async-storage/async-storage";
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: AsyncStorage,
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @exampleDescription React Native options with Expo SecureStore
	* If you wish to encrypt the user's session information, you can use `aes-js` and store the encryption key in Expo SecureStore.
	* The `aes-js` library, a reputable JavaScript-only implementation of the AES encryption algorithm in CTR mode.
	* A new 256-bit encryption key is generated using the `react-native-get-random-values` library.
	* This key is stored inside Expo's SecureStore, while the value is encrypted and placed inside AsyncStorage.
	*
	* Please make sure that:
	* - You keep the `expo-secure-store`, `aes-js` and `react-native-get-random-values` libraries up-to-date.
	* - Choose the correct [`SecureStoreOptions`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestoreoptions) for your app's needs.
	*   E.g. [`SecureStore.WHEN_UNLOCKED`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestorewhen_unlocked) regulates when the data can be accessed.
	* - Carefully consider optimizations or other modifications to the above example, as those can lead to introducing subtle security vulnerabilities.
	*
	* @example React Native options with Expo SecureStore
	* ```ts
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from '@react-native-async-storage/async-storage';
	* import * as SecureStore from 'expo-secure-store';
	* import * as aesjs from 'aes-js';
	* import 'react-native-get-random-values';
	*
	* // As Expo's SecureStore does not support values larger than 2048
	* // bytes, an AES-256 key is generated and stored in SecureStore, while
	* // it is used to encrypt/decrypt values stored in AsyncStorage.
	* class LargeSecureStore {
	*   private async _encrypt(key: string, value: string) {
	*     const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
	*     const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
	*
	*     await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));
	*
	*     return aesjs.utils.hex.fromBytes(encryptedBytes);
	*   }
	*
	*   private async _decrypt(key: string, value: string) {
	*     const encryptionKeyHex = await SecureStore.getItemAsync(key);
	*     if (!encryptionKeyHex) {
	*       return encryptionKeyHex;
	*     }
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
	*     const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
	*
	*     return aesjs.utils.utf8.fromBytes(decryptedBytes);
	*   }
	*
	*   async getItem(key: string) {
	*     const encrypted = await AsyncStorage.getItem(key);
	*     if (!encrypted) { return encrypted; }
	*
	*     return await this._decrypt(key, encrypted);
	*   }
	*
	*   async removeItem(key: string) {
	*     await AsyncStorage.removeItem(key);
	*     await SecureStore.deleteItemAsync(key);
	*   }
	*
	*   async setItem(key: string, value: string) {
	*     const encrypted = await this._encrypt(key, value);
	*
	*     await AsyncStorage.setItem(key, encrypted);
	*   }
	* }
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: new LargeSecureStore(),
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @example With a database query
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	*
	* const { data } = await supabase.from('profiles').select('*')
	* ```
	*/ constructor(supabaseUrl, supabaseKey, options){
        var _settings$auth$storag, _settings$global$head;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        const baseUrl = validateSupabaseUrl(supabaseUrl);
        if (!supabaseKey) throw new Error("supabaseKey is required.");
        this.realtimeUrl = new URL("realtime/v1", baseUrl);
        this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
        this.authUrl = new URL("auth/v1", baseUrl);
        this.storageUrl = new URL("storage/v1", baseUrl);
        this.functionsUrl = new URL("functions/v1", baseUrl);
        const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS), {}, {
                storageKey: defaultStorageKey
            }),
            global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== void 0 ? _settings$auth$storag : "";
        this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== void 0 ? _settings$global$head : {};
        if (!settings.accessToken) {
            var _settings$auth;
            this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== void 0 ? _settings$auth : {}, this.headers, settings.global.fetch);
        } else {
            this.accessToken = settings.accessToken;
            this.auth = new Proxy({}, {
                get: (_, prop)=>{
                    throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
                }
            });
        }
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
        this.realtime = this._initRealtimeClient(_objectSpread2({
            headers: this.headers,
            accessToken: this._getAccessToken.bind(this),
            fetch: this.fetch
        }, settings.realtime));
        if (this.accessToken) Promise.resolve(this.accessToken()).then((token)=>this.realtime.setAuth(token)).catch((e)=>console.warn("Failed to set initial Realtime auth token:", e));
        this.rest = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$postgrest$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$postgrest$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PostgrestClient"](new URL("rest/v1", baseUrl).href, {
            headers: this.headers,
            schema: settings.db.schema,
            fetch: this.fetch,
            timeout: settings.db.timeout,
            urlLengthLimit: settings.db.urlLengthLimit
        });
        this.storage = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$storage$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$storage$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StorageClient"](this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
        if (!settings.accessToken) this._listenForAuthEvents();
    }
    /**
	* Supabase Functions allows you to deploy and invoke edge functions.
	*/ get functions() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$functions$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsClient"](this.functionsUrl.href, {
            headers: this.headers,
            customFetch: this.fetch
        });
    }
    /**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/ from(relation) {
        return this.rest.from(relation);
    }
    /**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/ schema(schema) {
        return this.rest.schema(schema);
    }
    /**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/ rpc(fn, args = {}, options = {
        head: false,
        get: false,
        count: void 0
    }) {
        return this.rest.rpc(fn, args, options);
    }
    /**
	* Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
	*
	* @param {string} name - The name of the Realtime channel.
	* @param {Object} opts - The options to pass to the Realtime channel.
	*
	* @category Realtime
	*/ channel(name, opts = {
        config: {}
    }) {
        return this.realtime.channel(name, opts);
    }
    /**
	* Returns all Realtime channels.
	*
	* @category Realtime
	*
	* @example Get all channels
	* ```js
	* const channels = supabase.getChannels()
	* ```
	*/ getChannels() {
        return this.realtime.getChannels();
    }
    /**
	* Unsubscribes and removes Realtime channel from Realtime client.
	*
	* @param {RealtimeChannel} channel - The name of the Realtime channel.
	*
	*
	* @category Realtime
	*
	* @remarks
	* - Removing a channel is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Removes a channel
	* ```js
	* supabase.removeChannel(myChannel)
	* ```
	*/ removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
	* Unsubscribes and removes all Realtime channels from Realtime client.
	*
	* @category Realtime
	*
	* @remarks
	* - Removing channels is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Remove all channels
	* ```js
	* supabase.removeAllChannels()
	* ```
	*/ removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    async _getAccessToken() {
        var _this = this;
        var _data$session$access_, _data$session;
        if (_this.accessToken) return await _this.accessToken();
        const { data } = await _this.auth.getSession();
        return (_data$session$access_ = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token) !== null && _data$session$access_ !== void 0 ? _data$session$access_ : _this.supabaseKey;
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError, experimental, lockAcquireTimeout, skipAutoInitialize }, headers, fetch$1) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
            url: this.authUrl.href,
            headers: _objectSpread2(_objectSpread2({}, authHeaders), headers),
            storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            userStorage,
            flowType,
            lock,
            debug,
            throwOnError,
            experimental,
            fetch: fetch$1,
            lockAcquireTimeout,
            skipAutoInitialize,
            hasCustomAuthorizationHeader: Object.keys(this.headers).some((key)=>key.toLowerCase() === "authorization")
        });
    }
    _initRealtimeClient(options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$realtime$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RealtimeClient$3e$__["RealtimeClient"](this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, options), {}, {
            params: _objectSpread2(_objectSpread2({}, {
                apikey: this.supabaseKey
            }), options === null || options === void 0 ? void 0 : options.params)
        }));
    }
    _listenForAuthEvents() {
        return this.auth.onAuthStateChange((event, session)=>{
            this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
        });
    }
    _handleTokenChanged(event, source, token) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
            this.changedAccessToken = token;
            this.realtime.setAuth(token);
        } else if (event === "SIGNED_OUT") {
            this.realtime.setAuth();
            if (source == "STORAGE") this.auth.signOut();
            this.changedAccessToken = void 0;
        }
    }
};
//#endregion
//#region src/index.ts
/**
* Creates a new Supabase Client.
*
* @example Creating a Supabase client
* ```ts
* import { createClient } from '@supabase/supabase-js'
*
* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
* const { data, error } = await supabase.from('profiles').select('*')
* ```
*/ const createClient = (supabaseUrl, supabaseKey, options)=>{
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const _process = globalThis["process"];
    if (!_process) return false;
    const processVersion = _process["version"];
    if (processVersion === void 0 || processVersion === null) return false;
    const versionMatch = processVersion.match(/^v(\d+)\./);
    if (!versionMatch) return false;
    return parseInt(versionMatch[1], 10) <= 18;
}
if (shouldShowDeprecationWarning()) console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+supabase-js@2.105.4/node_modules/@supabase/supabase-js/dist/index.cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

let __supabase_functions_js = __turbopack_context__.r("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+functions-js@2.105.4/node_modules/@supabase/functions-js/dist/module/index.js [app-rsc] (ecmascript)");
let __supabase_postgrest_js = __turbopack_context__.r("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+postgrest-js@2.105.4/node_modules/@supabase/postgrest-js/dist/index.cjs [app-rsc] (ecmascript)");
let __supabase_realtime_js = __turbopack_context__.r("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+realtime-js@2.105.4/node_modules/@supabase/realtime-js/dist/module/index.js [app-rsc] (ecmascript)");
let __supabase_storage_js = __turbopack_context__.r("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+storage-js@2.105.4/node_modules/@supabase/storage-js/dist/index.cjs [app-rsc] (ecmascript)");
let __supabase_auth_js = __turbopack_context__.r("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+auth-js@2.105.4/node_modules/@supabase/auth-js/dist/module/index.js [app-rsc] (ecmascript)");
//#region src/lib/version.ts
const version = "2.105.4";
//#endregion
//#region src/lib/constants.ts
let JS_ENV = "";
if (typeof Deno !== "undefined") JS_ENV = "deno";
else if (typeof document !== "undefined") JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") JS_ENV = "react-native";
else JS_ENV = "node";
const DEFAULT_HEADERS = {
    "X-Client-Info": `supabase-js-${JS_ENV}/${version}`
};
const DEFAULT_GLOBAL_OPTIONS = {
    headers: DEFAULT_HEADERS
};
const DEFAULT_DB_OPTIONS = {
    schema: "public"
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "implicit"
};
const DEFAULT_REALTIME_OPTIONS = {};
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/typeof.js
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
        return typeof o$1;
    } : function(o$1) {
        return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r$1) {
            return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
            _defineProperty(e, r$1, t[r$1]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
            Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
        });
    }
    return e;
}
//#endregion
//#region src/lib/fetch.ts
const resolveFetch = (customFetch)=>{
    if (customFetch) return (...args)=>customFetch(...args);
    return (...args)=>fetch(...args);
};
const resolveHeadersConstructor = ()=>{
    return Headers;
};
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch)=>{
    const fetch$1 = resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return async (input, init)=>{
        var _await$getAccessToken;
        const accessToken = (_await$getAccessToken = await getAccessToken()) !== null && _await$getAccessToken !== void 0 ? _await$getAccessToken : supabaseKey;
        let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
        if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
        if (!headers.has("Authorization")) headers.set("Authorization", `Bearer ${accessToken}`);
        return fetch$1(input, _objectSpread2(_objectSpread2({}, init), {}, {
            headers
        }));
    };
};
//#endregion
//#region src/lib/helpers.ts
function ensureTrailingSlash(url) {
    return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
    var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header;
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
    const { db: DEFAULT_DB_OPTIONS$1, auth: DEFAULT_AUTH_OPTIONS$1, realtime: DEFAULT_REALTIME_OPTIONS$1, global: DEFAULT_GLOBAL_OPTIONS$1 } = defaults;
    const result = {
        db: _objectSpread2(_objectSpread2({}, DEFAULT_DB_OPTIONS$1), dbOptions),
        auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
        realtime: _objectSpread2(_objectSpread2({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
        storage: {},
        global: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, {
            headers: _objectSpread2(_objectSpread2({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== void 0 ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _globalOptions$header !== void 0 ? _globalOptions$header : {})
        }),
        accessToken: async ()=>""
    };
    if (options.accessToken) result.accessToken = options.accessToken;
    else delete result.accessToken;
    return result;
}
/**
* Validates a Supabase client URL
*
* @param {string} supabaseUrl - The Supabase client URL string.
* @returns {URL} - The validated base URL.
* @throws {Error}
*/ function validateSupabaseUrl(supabaseUrl) {
    const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
    if (!trimmedUrl) throw new Error("supabaseUrl is required.");
    if (!trimmedUrl.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
    try {
        return new URL(ensureTrailingSlash(trimmedUrl));
    } catch (_unused) {
        throw Error("Invalid supabaseUrl: Provided URL is malformed.");
    }
}
//#endregion
//#region src/lib/SupabaseAuthClient.ts
var SupabaseAuthClient = class extends __supabase_auth_js.AuthClient {
    constructor(options){
        super(options);
    }
};
//#endregion
//#region src/SupabaseClient.ts
/**
* Supabase Client.
*
* An isomorphic Javascript client for interacting with Postgres.
*/ var SupabaseClient = class {
    /**
	* Create a new client for use in the browser.
	*
	* @category Initializing
	*
	* @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
	* @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
	* @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
	* @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
	* @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
	* @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
	* @param options.realtime Options passed along to realtime-js constructor.
	* @param options.storage Options passed along to the storage-js constructor.
	* @param options.global.fetch A custom fetch implementation.
	* @param options.global.headers Any additional headers to send with each network request.
	*
	* @example Creating a client
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Create a single supabase client for interacting with your database
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* ```
	*
	* @example With a custom domain
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Use a custom domain as the supabase URL
	* const supabase = createClient('https://my-custom-domain.com', 'your-publishable-key')
	* ```
	*
	* @example With additional parameters
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const options = {
	*   db: {
	*     schema: 'public',
	*   },
	*   auth: {
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: true
	*   },
	*   global: {
	*     headers: { 'x-my-custom-header': 'my-app-name' },
	*   },
	* }
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", options)
	* ```
	*
	* @exampleDescription With custom schemas
	* By default the API server points to the `public` schema. You can enable other database schemas within the Dashboard.
	* Go to [Settings > API > Exposed schemas](/dashboard/project/_/settings/api) and add the schema which you want to expose to the API.
	*
	* Note: each client connection can only access a single schema, so the code above can access the `other_schema` schema but cannot access the `public` schema.
	*
	* @example With custom schemas
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   // Provide a custom schema. Defaults to "public".
	*   db: { schema: 'other_schema' }
	* })
	* ```
	*
	* @exampleDescription Custom fetch implementation
	* `supabase-js` uses the [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) library to make HTTP requests,
	* but an alternative `fetch` implementation can be provided as an option.
	* This is most useful in environments where `cross-fetch` is not compatible (for instance Cloudflare Workers).
	*
	* @example Custom fetch implementation
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   global: { fetch: fetch.bind(globalThis) }
	* })
	* ```
	*
	* @exampleDescription React Native options with AsyncStorage
	* For React Native we recommend using `AsyncStorage` as the storage implementation for Supabase Auth.
	*
	* @example React Native options with AsyncStorage
	* ```js
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from "@react-native-async-storage/async-storage";
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: AsyncStorage,
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @exampleDescription React Native options with Expo SecureStore
	* If you wish to encrypt the user's session information, you can use `aes-js` and store the encryption key in Expo SecureStore.
	* The `aes-js` library, a reputable JavaScript-only implementation of the AES encryption algorithm in CTR mode.
	* A new 256-bit encryption key is generated using the `react-native-get-random-values` library.
	* This key is stored inside Expo's SecureStore, while the value is encrypted and placed inside AsyncStorage.
	*
	* Please make sure that:
	* - You keep the `expo-secure-store`, `aes-js` and `react-native-get-random-values` libraries up-to-date.
	* - Choose the correct [`SecureStoreOptions`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestoreoptions) for your app's needs.
	*   E.g. [`SecureStore.WHEN_UNLOCKED`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestorewhen_unlocked) regulates when the data can be accessed.
	* - Carefully consider optimizations or other modifications to the above example, as those can lead to introducing subtle security vulnerabilities.
	*
	* @example React Native options with Expo SecureStore
	* ```ts
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from '@react-native-async-storage/async-storage';
	* import * as SecureStore from 'expo-secure-store';
	* import * as aesjs from 'aes-js';
	* import 'react-native-get-random-values';
	*
	* // As Expo's SecureStore does not support values larger than 2048
	* // bytes, an AES-256 key is generated and stored in SecureStore, while
	* // it is used to encrypt/decrypt values stored in AsyncStorage.
	* class LargeSecureStore {
	*   private async _encrypt(key: string, value: string) {
	*     const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
	*     const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
	*
	*     await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));
	*
	*     return aesjs.utils.hex.fromBytes(encryptedBytes);
	*   }
	*
	*   private async _decrypt(key: string, value: string) {
	*     const encryptionKeyHex = await SecureStore.getItemAsync(key);
	*     if (!encryptionKeyHex) {
	*       return encryptionKeyHex;
	*     }
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
	*     const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
	*
	*     return aesjs.utils.utf8.fromBytes(decryptedBytes);
	*   }
	*
	*   async getItem(key: string) {
	*     const encrypted = await AsyncStorage.getItem(key);
	*     if (!encrypted) { return encrypted; }
	*
	*     return await this._decrypt(key, encrypted);
	*   }
	*
	*   async removeItem(key: string) {
	*     await AsyncStorage.removeItem(key);
	*     await SecureStore.deleteItemAsync(key);
	*   }
	*
	*   async setItem(key: string, value: string) {
	*     const encrypted = await this._encrypt(key, value);
	*
	*     await AsyncStorage.setItem(key, encrypted);
	*   }
	* }
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: new LargeSecureStore(),
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @example With a database query
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	*
	* const { data } = await supabase.from('profiles').select('*')
	* ```
	*/ constructor(supabaseUrl, supabaseKey, options){
        var _settings$auth$storag, _settings$global$head;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        const baseUrl = validateSupabaseUrl(supabaseUrl);
        if (!supabaseKey) throw new Error("supabaseKey is required.");
        this.realtimeUrl = new URL("realtime/v1", baseUrl);
        this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
        this.authUrl = new URL("auth/v1", baseUrl);
        this.storageUrl = new URL("storage/v1", baseUrl);
        this.functionsUrl = new URL("functions/v1", baseUrl);
        const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS), {}, {
                storageKey: defaultStorageKey
            }),
            global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== void 0 ? _settings$auth$storag : "";
        this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== void 0 ? _settings$global$head : {};
        if (!settings.accessToken) {
            var _settings$auth;
            this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== void 0 ? _settings$auth : {}, this.headers, settings.global.fetch);
        } else {
            this.accessToken = settings.accessToken;
            this.auth = new Proxy({}, {
                get: (_, prop)=>{
                    throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
                }
            });
        }
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
        this.realtime = this._initRealtimeClient(_objectSpread2({
            headers: this.headers,
            accessToken: this._getAccessToken.bind(this),
            fetch: this.fetch
        }, settings.realtime));
        if (this.accessToken) Promise.resolve(this.accessToken()).then((token)=>this.realtime.setAuth(token)).catch((e)=>console.warn("Failed to set initial Realtime auth token:", e));
        this.rest = new __supabase_postgrest_js.PostgrestClient(new URL("rest/v1", baseUrl).href, {
            headers: this.headers,
            schema: settings.db.schema,
            fetch: this.fetch,
            timeout: settings.db.timeout,
            urlLengthLimit: settings.db.urlLengthLimit
        });
        this.storage = new __supabase_storage_js.StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
        if (!settings.accessToken) this._listenForAuthEvents();
    }
    /**
	* Supabase Functions allows you to deploy and invoke edge functions.
	*/ get functions() {
        return new __supabase_functions_js.FunctionsClient(this.functionsUrl.href, {
            headers: this.headers,
            customFetch: this.fetch
        });
    }
    /**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/ from(relation) {
        return this.rest.from(relation);
    }
    /**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/ schema(schema) {
        return this.rest.schema(schema);
    }
    /**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/ rpc(fn, args = {}, options = {
        head: false,
        get: false,
        count: void 0
    }) {
        return this.rest.rpc(fn, args, options);
    }
    /**
	* Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
	*
	* @param {string} name - The name of the Realtime channel.
	* @param {Object} opts - The options to pass to the Realtime channel.
	*
	* @category Realtime
	*/ channel(name, opts = {
        config: {}
    }) {
        return this.realtime.channel(name, opts);
    }
    /**
	* Returns all Realtime channels.
	*
	* @category Realtime
	*
	* @example Get all channels
	* ```js
	* const channels = supabase.getChannels()
	* ```
	*/ getChannels() {
        return this.realtime.getChannels();
    }
    /**
	* Unsubscribes and removes Realtime channel from Realtime client.
	*
	* @param {RealtimeChannel} channel - The name of the Realtime channel.
	*
	*
	* @category Realtime
	*
	* @remarks
	* - Removing a channel is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Removes a channel
	* ```js
	* supabase.removeChannel(myChannel)
	* ```
	*/ removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
	* Unsubscribes and removes all Realtime channels from Realtime client.
	*
	* @category Realtime
	*
	* @remarks
	* - Removing channels is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Remove all channels
	* ```js
	* supabase.removeAllChannels()
	* ```
	*/ removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    async _getAccessToken() {
        var _this = this;
        var _data$session$access_, _data$session;
        if (_this.accessToken) return await _this.accessToken();
        const { data } = await _this.auth.getSession();
        return (_data$session$access_ = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token) !== null && _data$session$access_ !== void 0 ? _data$session$access_ : _this.supabaseKey;
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError, experimental, lockAcquireTimeout, skipAutoInitialize }, headers, fetch$1) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
            url: this.authUrl.href,
            headers: _objectSpread2(_objectSpread2({}, authHeaders), headers),
            storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            userStorage,
            flowType,
            lock,
            debug,
            throwOnError,
            experimental,
            fetch: fetch$1,
            lockAcquireTimeout,
            skipAutoInitialize,
            hasCustomAuthorizationHeader: Object.keys(this.headers).some((key)=>key.toLowerCase() === "authorization")
        });
    }
    _initRealtimeClient(options) {
        return new __supabase_realtime_js.RealtimeClient(this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, options), {}, {
            params: _objectSpread2(_objectSpread2({}, {
                apikey: this.supabaseKey
            }), options === null || options === void 0 ? void 0 : options.params)
        }));
    }
    _listenForAuthEvents() {
        return this.auth.onAuthStateChange((event, session)=>{
            this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
        });
    }
    _handleTokenChanged(event, source, token) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
            this.changedAccessToken = token;
            this.realtime.setAuth(token);
        } else if (event === "SIGNED_OUT") {
            this.realtime.setAuth();
            if (source == "STORAGE") this.auth.signOut();
            this.changedAccessToken = void 0;
        }
    }
};
//#endregion
//#region src/index.ts
/**
* Creates a new Supabase Client.
*
* @example Creating a Supabase client
* ```ts
* import { createClient } from '@supabase/supabase-js'
*
* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
* const { data, error } = await supabase.from('profiles').select('*')
* ```
*/ const createClient = (supabaseUrl, supabaseKey, options)=>{
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const _process = globalThis["process"];
    if (!_process) return false;
    const processVersion = _process["version"];
    if (processVersion === void 0 || processVersion === null) return false;
    const versionMatch = processVersion.match(/^v(\d+)\./);
    if (!versionMatch) return false;
    return parseInt(versionMatch[1], 10) <= 18;
}
if (shouldShowDeprecationWarning()) console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
//#endregion
Object.defineProperty(exports, 'FunctionRegion', {
    enumerable: true,
    get: function() {
        return __supabase_functions_js.FunctionRegion;
    }
});
Object.defineProperty(exports, 'FunctionsError', {
    enumerable: true,
    get: function() {
        return __supabase_functions_js.FunctionsError;
    }
});
Object.defineProperty(exports, 'FunctionsFetchError', {
    enumerable: true,
    get: function() {
        return __supabase_functions_js.FunctionsFetchError;
    }
});
Object.defineProperty(exports, 'FunctionsHttpError', {
    enumerable: true,
    get: function() {
        return __supabase_functions_js.FunctionsHttpError;
    }
});
Object.defineProperty(exports, 'FunctionsRelayError', {
    enumerable: true,
    get: function() {
        return __supabase_functions_js.FunctionsRelayError;
    }
});
Object.defineProperty(exports, 'PostgrestError', {
    enumerable: true,
    get: function() {
        return __supabase_postgrest_js.PostgrestError;
    }
});
Object.defineProperty(exports, 'StorageApiError', {
    enumerable: true,
    get: function() {
        return __supabase_storage_js.StorageApiError;
    }
});
exports.SupabaseClient = SupabaseClient;
exports.createClient = createClient;
Object.keys(__supabase_auth_js).forEach(function(k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
            return __supabase_auth_js[k];
        }
    });
});
Object.keys(__supabase_realtime_js).forEach(function(k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
            return __supabase_realtime_js[k];
        }
    });
}); //# sourceMappingURL=index.cjs.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/version.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VERSION",
    ()=>VERSION
]);
const VERSION = '0.5.2'; //# sourceMappingURL=version.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/helpers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBrowser",
    ()=>isBrowser,
    "parse",
    ()=>parse,
    "parseCookieHeader",
    ()=>parseCookieHeader,
    "serialize",
    ()=>serialize,
    "serializeCookieHeader",
    ()=>serializeCookieHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/cookie@0.7.2/node_modules/cookie/index.js [app-rsc] (ecmascript)");
;
const parse = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"];
const serialize = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"];
function parseCookieHeader(header) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"])(header);
    return Object.keys(parsed ?? {}).map((name)=>({
            name,
            value: parsed[name]
        }));
}
function serializeCookieHeader(name, value, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"])(name, value, options);
}
function isBrowser() {
    return "undefined" !== "undefined" && typeof window.document !== "undefined";
} //# sourceMappingURL=helpers.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_COOKIE_OPTIONS",
    ()=>DEFAULT_COOKIE_OPTIONS
]);
const DEFAULT_COOKIE_OPTIONS = {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    // https://developer.chrome.com/blog/cookie-max-age-expires
    // https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-cookie-lifetime-limits
    maxAge: 400 * 24 * 60 * 60
}; //# sourceMappingURL=constants.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/chunker.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_CHUNK_SIZE",
    ()=>MAX_CHUNK_SIZE,
    "combineChunks",
    ()=>combineChunks,
    "createChunks",
    ()=>createChunks,
    "deleteChunks",
    ()=>deleteChunks,
    "isChunkLike",
    ()=>isChunkLike
]);
const MAX_CHUNK_SIZE = 3180;
const CHUNK_LIKE_REGEX = /^(.*)[.](0|[1-9][0-9]*)$/;
function isChunkLike(cookieName, key) {
    if (cookieName === key) {
        return true;
    }
    const chunkLike = cookieName.match(CHUNK_LIKE_REGEX);
    if (chunkLike && chunkLike[1] === key) {
        return true;
    }
    return false;
}
function createChunks(key, value, chunkSize) {
    const resolvedChunkSize = chunkSize ?? MAX_CHUNK_SIZE;
    let encodedValue = encodeURIComponent(value);
    if (encodedValue.length <= resolvedChunkSize) {
        return [
            {
                name: key,
                value
            }
        ];
    }
    const chunks = [];
    while(encodedValue.length > 0){
        let encodedChunkHead = encodedValue.slice(0, resolvedChunkSize);
        const lastEscapePos = encodedChunkHead.lastIndexOf("%");
        // Check if the last escaped character is truncated.
        if (lastEscapePos > resolvedChunkSize - 3) {
            // If so, reslice the string to exclude the whole escape sequence.
            // We only reduce the size of the string as the chunk must
            // be smaller than the chunk size.
            encodedChunkHead = encodedChunkHead.slice(0, lastEscapePos);
        }
        let valueHead = "";
        // Check if the chunk was split along a valid unicode boundary.
        while(encodedChunkHead.length > 0){
            try {
                // Try to decode the chunk back and see if it is valid.
                // Stop when the chunk is valid.
                valueHead = decodeURIComponent(encodedChunkHead);
                break;
            } catch (error) {
                if (error instanceof URIError && encodedChunkHead.at(-3) === "%" && encodedChunkHead.length > 3) {
                    encodedChunkHead = encodedChunkHead.slice(0, encodedChunkHead.length - 3);
                } else {
                    throw error;
                }
            }
        }
        chunks.push(valueHead);
        encodedValue = encodedValue.slice(encodedChunkHead.length);
    }
    return chunks.map((value, i)=>({
            name: `${key}.${i}`,
            value
        }));
}
async function combineChunks(key, retrieveChunk) {
    const value = await retrieveChunk(key);
    if (value) {
        return value;
    }
    let values = [];
    for(let i = 0;; i++){
        const chunkName = `${key}.${i}`;
        const chunk = await retrieveChunk(chunkName);
        if (!chunk) {
            break;
        }
        values.push(chunk);
    }
    if (values.length > 0) {
        return values.join("");
    }
    return null;
}
async function deleteChunks(key, retrieveChunk, removeChunk) {
    const value = await retrieveChunk(key);
    if (value) {
        await removeChunk(key);
    }
    for(let i = 0;; i++){
        const chunkName = `${key}.${i}`;
        const chunk = await retrieveChunk(chunkName);
        if (!chunk) {
            break;
        }
        await removeChunk(chunkName);
    }
} //# sourceMappingURL=chunker.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/base64url.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Avoid modifying this file. It's part of
 * https://github.com/supabase-community/base64url-js.  Submit all fixes on
 * that repo!
 */ /**
 * An array of characters that encode 6 bits into a Base64-URL alphabet
 * character.
 */ __turbopack_context__.s([
    "codepointToUTF8",
    ()=>codepointToUTF8,
    "stringFromBase64URL",
    ()=>stringFromBase64URL,
    "stringFromUTF8",
    ()=>stringFromUTF8,
    "stringToBase64URL",
    ()=>stringToBase64URL,
    "stringToUTF8",
    ()=>stringToUTF8
]);
const TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
/**
 * An array of characters that can appear in a Base64-URL encoded string but
 * should be ignored.
 */ const IGNORE_BASE64URL = " \t\n\r=".split("");
/**
 * An array of 128 numbers that map a Base64-URL character to 6 bits, or if -2
 * used to skip the character, or if -1 used to error out.
 */ const FROM_BASE64URL = (()=>{
    const charMap = new Array(128);
    for(let i = 0; i < charMap.length; i += 1){
        charMap[i] = -1;
    }
    for(let i = 0; i < IGNORE_BASE64URL.length; i += 1){
        charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
    }
    for(let i = 0; i < TO_BASE64URL.length; i += 1){
        charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
    }
    return charMap;
})();
function stringToBase64URL(str) {
    const base64 = [];
    let queue = 0;
    let queuedBits = 0;
    const emitter = (byte)=>{
        queue = queue << 8 | byte;
        queuedBits += 8;
        while(queuedBits >= 6){
            const pos = queue >> queuedBits - 6 & 63;
            base64.push(TO_BASE64URL[pos]);
            queuedBits -= 6;
        }
    };
    stringToUTF8(str, emitter);
    if (queuedBits > 0) {
        queue = queue << 6 - queuedBits;
        queuedBits = 6;
        while(queuedBits >= 6){
            const pos = queue >> queuedBits - 6 & 63;
            base64.push(TO_BASE64URL[pos]);
            queuedBits -= 6;
        }
    }
    return base64.join("");
}
function stringFromBase64URL(str) {
    const conv = [];
    const emit = (codepoint)=>{
        conv.push(String.fromCodePoint(codepoint));
    };
    const state = {
        utf8seq: 0,
        codepoint: 0
    };
    let queue = 0;
    let queuedBits = 0;
    for(let i = 0; i < str.length; i += 1){
        const codepoint = str.charCodeAt(i);
        const bits = FROM_BASE64URL[codepoint];
        if (bits > -1) {
            // valid Base64-URL character
            queue = queue << 6 | bits;
            queuedBits += 6;
            while(queuedBits >= 8){
                stringFromUTF8(queue >> queuedBits - 8 & 0xff, state, emit);
                queuedBits -= 8;
            }
        } else if (bits === -2) {
            continue;
        } else {
            throw new Error(`Invalid Base64-URL character "${str.at(i)}" at position ${i}`);
        }
    }
    return conv.join("");
}
function codepointToUTF8(codepoint, emit) {
    if (codepoint <= 0x7f) {
        emit(codepoint);
        return;
    } else if (codepoint <= 0x7ff) {
        emit(0xc0 | codepoint >> 6);
        emit(0x80 | codepoint & 0x3f);
        return;
    } else if (codepoint <= 0xffff) {
        emit(0xe0 | codepoint >> 12);
        emit(0x80 | codepoint >> 6 & 0x3f);
        emit(0x80 | codepoint & 0x3f);
        return;
    } else if (codepoint <= 0x10ffff) {
        emit(0xf0 | codepoint >> 18);
        emit(0x80 | codepoint >> 12 & 0x3f);
        emit(0x80 | codepoint >> 6 & 0x3f);
        emit(0x80 | codepoint & 0x3f);
        return;
    }
    throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
function stringToUTF8(str, emit) {
    for(let i = 0; i < str.length; i += 1){
        let codepoint = str.charCodeAt(i);
        if (codepoint > 0xd7ff && codepoint <= 0xdbff) {
            // most UTF-16 codepoints are Unicode codepoints, except values in this
            // range where the next UTF-16 codepoint needs to be combined with the
            // current one to get the Unicode codepoint
            const highSurrogate = (codepoint - 0xd800) * 0x400 & 0xffff;
            const lowSurrogate = str.charCodeAt(i + 1) - 0xdc00 & 0xffff;
            codepoint = (lowSurrogate | highSurrogate) + 0x10000;
            i += 1;
        }
        codepointToUTF8(codepoint, emit);
    }
}
function stringFromUTF8(byte, state, emit) {
    if (state.utf8seq === 0) {
        if (byte <= 0x7f) {
            emit(byte);
            return;
        }
        // count the number of 1 leading bits until you reach 0
        for(let leadingBit = 1; leadingBit < 6; leadingBit += 1){
            if ((byte >> 7 - leadingBit & 1) === 0) {
                state.utf8seq = leadingBit;
                break;
            }
        }
        if (state.utf8seq === 2) {
            state.codepoint = byte & 31;
        } else if (state.utf8seq === 3) {
            state.codepoint = byte & 15;
        } else if (state.utf8seq === 4) {
            state.codepoint = byte & 7;
        } else {
            throw new Error("Invalid UTF-8 sequence");
        }
        state.utf8seq -= 1;
    } else if (state.utf8seq > 0) {
        if (byte <= 0x7f) {
            throw new Error("Invalid UTF-8 sequence");
        }
        state.codepoint = state.codepoint << 6 | byte & 63;
        state.utf8seq -= 1;
        if (state.utf8seq === 0) {
            emit(state.codepoint);
        }
    }
} //# sourceMappingURL=base64url.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/helpers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/chunker.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/base64url.js [app-rsc] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyServerStorage",
    ()=>applyServerStorage,
    "createStorageFromOptions",
    ()=>createStorageFromOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/cookie@0.7.2/node_modules/cookie/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/chunker.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/helpers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/base64url.js [app-rsc] (ecmascript)");
;
;
const BASE64_PREFIX = "base64-";
function createStorageFromOptions(options, isServerClient) {
    const cookies = options.cookies ?? null;
    const cookieEncoding = options.cookieEncoding;
    const setItems = {};
    const removedItems = {};
    let getAll;
    let setAll;
    if (cookies) {
        if ("get" in cookies) {
            // Just get is not enough, because the client needs to see what cookies
            // are already set and unset them if necessary. To attempt to fix this
            // behavior for most use cases, we pass "hints" which is the keys of the
            // storage items. They are then converted to their corresponding cookie
            // chunk names and are fetched with get. Only 5 chunks are fetched, which
            // should be enough for the majority of use cases, but does not solve
            // those with very large sessions.
            const getWithHints = async (keyHints)=>{
                // optimistically find the first 5 potential chunks for the specified key
                const chunkNames = keyHints.flatMap((keyHint)=>[
                        keyHint,
                        ...Array.from({
                            length: 5
                        }).map((_, i)=>`${keyHint}.${i}`)
                    ]);
                const chunks = [];
                for(let i = 0; i < chunkNames.length; i += 1){
                    const value = await cookies.get(chunkNames[i]);
                    if (!value && typeof value !== "string") {
                        continue;
                    }
                    chunks.push({
                        name: chunkNames[i],
                        value
                    });
                }
                // TODO: detect and log stale chunks error
                return chunks;
            };
            getAll = async (keyHints)=>await getWithHints(keyHints);
            if ("set" in cookies && "remove" in cookies) {
                setAll = async (setCookies)=>{
                    for(let i = 0; i < setCookies.length; i += 1){
                        const { name, value, options } = setCookies[i];
                        if (value) {
                            await cookies.set(name, value, options);
                        } else {
                            await cookies.remove(name, options);
                        }
                    }
                };
            } else if (isServerClient) {
                setAll = async ()=>{
                    console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
                };
            } else {
                throw new Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
            }
        } else if ("getAll" in cookies) {
            getAll = async ()=>await cookies.getAll();
            if ("setAll" in cookies) {
                setAll = cookies.setAll;
            } else if (isServerClient) {
                setAll = async ()=>{
                    console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
                };
            } else {
                throw new Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
            }
        } else {
            // neither get nor getAll is present on cookies, only will occur if pure JavaScript is used, but cookies is an object
            throw new Error(`@supabase/ssr: ${isServerClient ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`);
        }
    } else if (!isServerClient && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])()) {
        // The environment is browser, so use the document.cookie API to implement getAll and setAll.
        const noHintGetAll = ()=>{
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"])(document.cookie);
            return Object.keys(parsed).map((name)=>({
                    name,
                    value: parsed[name]
                }));
        };
        getAll = ()=>noHintGetAll();
        setAll = (setCookies)=>{
            setCookies.forEach(({ name, value, options })=>{
                document.cookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$cookie$40$0$2e$7$2e$2$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"])(name, value, options);
            });
        };
    } else if (isServerClient) {
        throw new Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
    } else {
        // getting cookies when there's no window but we're in browser mode can be OK, because the developer probably is not using auth functions
        getAll = ()=>{
            return [];
        };
        // this is NOT OK because the developer is using auth functions that require setting some state, so that must error out
        setAll = ()=>{
            throw new Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
        };
    }
    if (!isServerClient) {
        // This is the storage client to be used in browsers. It only
        // works on the cookies abstraction, unlike the server client
        // which only uses cookies to read the initial state. When an
        // item is set, cookies are both cleared and set to values so
        // that stale chunks are not left remaining.
        return {
            getAll,
            setAll,
            setItems,
            removedItems,
            storage: {
                isServer: false,
                getItem: async (key)=>{
                    const allCookies = await getAll([
                        key
                    ]);
                    const chunkedCookie = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combineChunks"])(key, async (chunkName)=>{
                        const cookie = allCookies?.find(({ name })=>name === chunkName) || null;
                        if (!cookie) {
                            return null;
                        }
                        return cookie.value;
                    });
                    if (!chunkedCookie) {
                        return null;
                    }
                    let decoded = chunkedCookie;
                    if (chunkedCookie.startsWith(BASE64_PREFIX)) {
                        decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringFromBase64URL"])(chunkedCookie.substring(BASE64_PREFIX.length));
                    }
                    return decoded;
                },
                setItem: async (key, value)=>{
                    const allCookies = await getAll([
                        key
                    ]);
                    const cookieNames = allCookies?.map(({ name })=>name) || [];
                    const removeCookies = new Set(cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, key)));
                    let encoded = value;
                    if (cookieEncoding === "base64url") {
                        encoded = BASE64_PREFIX + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringToBase64URL"])(value);
                    }
                    const setCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createChunks"])(key, encoded);
                    setCookies.forEach(({ name })=>{
                        removeCookies.delete(name);
                    });
                    const removeCookieOptions = {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
                        ...options?.cookieOptions,
                        maxAge: 0
                    };
                    const setCookieOptions = {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
                        ...options?.cookieOptions,
                        maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"].maxAge
                    };
                    // the NextJS cookieStore API can get confused if the `name` from
                    // options.cookieOptions leaks
                    delete removeCookieOptions.name;
                    delete setCookieOptions.name;
                    const allToSet = [
                        ...[
                            ...removeCookies
                        ].map((name)=>({
                                name,
                                value: "",
                                options: removeCookieOptions
                            })),
                        ...setCookies.map(({ name, value })=>({
                                name,
                                value,
                                options: setCookieOptions
                            }))
                    ];
                    if (allToSet.length > 0) {
                        await setAll(allToSet);
                    }
                },
                removeItem: async (key)=>{
                    const allCookies = await getAll([
                        key
                    ]);
                    const cookieNames = allCookies?.map(({ name })=>name) || [];
                    const removeCookies = cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, key));
                    const removeCookieOptions = {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
                        ...options?.cookieOptions,
                        maxAge: 0
                    };
                    // the NextJS cookieStore API can get confused if the `name` from
                    // options.cookieOptions leaks
                    delete removeCookieOptions.name;
                    if (removeCookies.length > 0) {
                        await setAll(removeCookies.map((name)=>({
                                name,
                                value: "",
                                options: removeCookieOptions
                            })));
                    }
                }
            }
        };
    }
    // This is the server client. It only uses getAll to read the initial
    // state. Any subsequent changes to the items is persisted in the
    // setItems and removedItems objects. createServerClient *must* use
    // getAll, setAll and the values in setItems and removedItems to
    // persist the changes *at once* when appropriate (usually only when
    // the TOKEN_REFRESHED, USER_UPDATED or SIGNED_OUT events are fired by
    // the Supabase Auth client).
    return {
        getAll,
        setAll,
        setItems,
        removedItems,
        storage: {
            // to signal to the libraries that these cookies are
            // coming from a server environment and their value
            // should not be trusted
            isServer: true,
            getItem: async (key)=>{
                if (typeof setItems[key] === "string") {
                    return setItems[key];
                }
                if (removedItems[key]) {
                    return null;
                }
                const allCookies = await getAll([
                    key
                ]);
                const chunkedCookie = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combineChunks"])(key, async (chunkName)=>{
                    const cookie = allCookies?.find(({ name })=>name === chunkName) || null;
                    if (!cookie) {
                        return null;
                    }
                    return cookie.value;
                });
                if (!chunkedCookie) {
                    return null;
                }
                let decoded = chunkedCookie;
                if (typeof chunkedCookie === "string" && chunkedCookie.startsWith(BASE64_PREFIX)) {
                    decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringFromBase64URL"])(chunkedCookie.substring(BASE64_PREFIX.length));
                }
                return decoded;
            },
            setItem: async (key, value)=>{
                // We don't have an `onAuthStateChange` event that can let us know that
                // the PKCE code verifier is being set. Therefore, if we see it being
                // set, we need to apply the storage (call `setAll` so the cookie is
                // set properly).
                if (key.endsWith("-code-verifier")) {
                    await applyServerStorage({
                        getAll,
                        setAll,
                        // pretend only that the code verifier was set
                        setItems: {
                            [key]: value
                        },
                        // pretend that nothing was removed
                        removedItems: {}
                    }, {
                        cookieOptions: options?.cookieOptions ?? null,
                        cookieEncoding
                    });
                }
                setItems[key] = value;
                delete removedItems[key];
            },
            removeItem: async (key)=>{
                // Intentionally not applying the storage when the key is the PKCE code
                // verifier, as usually right after it's removed other items are set,
                // so application of the storage will be handled by the
                // `onAuthStateChange` callback that follows removal -- usually as part
                // of the `exchangeCodeForSession` call.
                delete setItems[key];
                removedItems[key] = true;
            }
        }
    };
}
async function applyServerStorage({ getAll, setAll, setItems, removedItems }, options) {
    const cookieEncoding = options.cookieEncoding;
    const cookieOptions = options.cookieOptions ?? null;
    const allCookies = await getAll([
        ...setItems ? Object.keys(setItems) : [],
        ...removedItems ? Object.keys(removedItems) : []
    ]);
    const cookieNames = allCookies?.map(({ name })=>name) || [];
    const removeCookies = Object.keys(removedItems).flatMap((itemName)=>{
        return cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, itemName));
    });
    const setCookies = Object.keys(setItems).flatMap((itemName)=>{
        const removeExistingCookiesForItem = new Set(cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, itemName)));
        let encoded = setItems[itemName];
        if (cookieEncoding === "base64url") {
            encoded = BASE64_PREFIX + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringToBase64URL"])(encoded);
        }
        const chunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createChunks"])(itemName, encoded);
        chunks.forEach((chunk)=>{
            removeExistingCookiesForItem.delete(chunk.name);
        });
        removeCookies.push(...removeExistingCookiesForItem);
        return chunks;
    });
    const removeCookieOptions = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
        ...cookieOptions,
        maxAge: 0
    };
    const setCookieOptions = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
        ...cookieOptions,
        maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"].maxAge
    };
    // the NextJS cookieStore API can get confused if the `name` from
    // options.cookieOptions leaks
    delete removeCookieOptions.name;
    delete setCookieOptions.name;
    await setAll([
        ...removeCookies.map((name)=>({
                name,
                value: "",
                options: removeCookieOptions
            })),
        ...setCookies.map(({ name, value })=>({
                name,
                value,
                options: setCookieOptions
            }))
    ]);
} //# sourceMappingURL=cookies.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBrowserClient",
    ()=>createBrowserClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+supabase-js@2.105.4/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/version.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/helpers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/cookies.js [app-rsc] (ecmascript)");
;
;
;
;
let cachedBrowserClient;
function createBrowserClient(supabaseUrl, supabaseKey, options) {
    // singleton client is created only if isSingleton is set to true, or if isSingleton is not defined and we detect a browser
    const shouldUseSingleton = options?.isSingleton === true || (!options || !("isSingleton" in options)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])();
    if (shouldUseSingleton && cachedBrowserClient) {
        return cachedBrowserClient;
    }
    if (!supabaseUrl || !supabaseKey) {
        throw new Error(`@supabase/ssr: Your project's URL and API key are required to create a Supabase client!\n\nCheck your Supabase project's API settings to find these values\n\nhttps://supabase.com/dashboard/project/_/settings/api`);
    }
    const { storage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createStorageFromOptions"])({
        ...options,
        cookieEncoding: options?.cookieEncoding ?? "base64url"
    }, false);
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey, {
        ...options,
        global: {
            ...options?.global,
            headers: {
                ...options?.global?.headers,
                "X-Client-Info": `supabase-ssr/${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"]}`
            }
        },
        auth: {
            ...options?.auth,
            ...options?.cookieOptions?.name ? {
                storageKey: options.cookieOptions.name
            } : null,
            flowType: "pkce",
            autoRefreshToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])(),
            detectSessionInUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])(),
            persistSession: true,
            storage
        }
    });
    if (shouldUseSingleton) {
        cachedBrowserClient = client;
    }
    return client;
} //# sourceMappingURL=createBrowserClient.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+supabase-js@2.105.4/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/version.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/cookies.js [app-rsc] (ecmascript)");
;
;
;
function createServerClient(supabaseUrl, supabaseKey, options) {
    if (!supabaseUrl || !supabaseKey) {
        throw new Error(`Your project's URL and Key are required to create a Supabase client!\n\nCheck your Supabase project's API settings to find these values\n\nhttps://supabase.com/dashboard/project/_/settings/api`);
    }
    const { storage, getAll, setAll, setItems, removedItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createStorageFromOptions"])({
        ...options,
        cookieEncoding: options?.cookieEncoding ?? "base64url"
    }, true);
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey, {
        ...options,
        global: {
            ...options?.global,
            headers: {
                ...options?.global?.headers,
                "X-Client-Info": `supabase-ssr/${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"]}`
            }
        },
        auth: {
            ...options?.cookieOptions?.name ? {
                storageKey: options.cookieOptions.name
            } : null,
            ...options?.auth,
            flowType: "pkce",
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: true,
            storage
        }
    });
    client.auth.onAuthStateChange(async (event)=>{
        // The SIGNED_IN event is fired very often, but we don't need to
        // apply the storage each time it fires, only if there are changes
        // that need to be set -- which is if setItems / removeItems have
        // data.
        const hasStorageChanges = Object.keys(setItems).length > 0 || Object.keys(removedItems).length > 0;
        if (hasStorageChanges && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED" || event === "PASSWORD_RECOVERY" || event === "SIGNED_OUT" || event === "MFA_CHALLENGE_VERIFIED")) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["applyServerStorage"])({
                getAll,
                setAll,
                setItems,
                removedItems
            }, {
                cookieOptions: options?.cookieOptions ?? null,
                cookieEncoding: options?.cookieEncoding ?? "base64url"
            });
        }
    });
    return client;
} //# sourceMappingURL=createServerClient.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

//# sourceMappingURL=types.js.map
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/types.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/utils/index.js [app-rsc] (ecmascript) <locals>"); //# sourceMappingURL=index.js.map
;
;
;
;
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/cookie@0.7.2/node_modules/cookie/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ exports.parse = parse;
exports.serialize = serialize;
/**
 * Module variables.
 * @private
 */ var __toString = Object.prototype.toString;
var __hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 */ var cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 */ var cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */ var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */ var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [opt]
 * @return {object}
 * @public
 */ function parse(str, opt) {
    if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
    }
    var obj = {};
    var len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2) return obj;
    var dec = opt && opt.decode || decode;
    var index = 0;
    var eqIdx = 0;
    var endIdx = 0;
    do {
        eqIdx = str.indexOf('=', index);
        if (eqIdx === -1) break; // No more cookie pairs.
        endIdx = str.indexOf(';', index);
        if (endIdx === -1) {
            endIdx = len;
        } else if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(';', eqIdx - 1) + 1;
            continue;
        }
        var keyStartIdx = startIndex(str, index, eqIdx);
        var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        var key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (!__hasOwnProperty.call(obj, key)) {
            var valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            var valEndIdx = endIndex(str, endIdx, valStartIdx);
            if (str.charCodeAt(valStartIdx) === 0x22 /* " */  && str.charCodeAt(valEndIdx - 1) === 0x22 /* " */ ) {
                valStartIdx++;
                valEndIdx--;
            }
            var val = str.slice(valStartIdx, valEndIdx);
            obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
    }while (index < len)
    return obj;
}
function startIndex(str, index, max) {
    do {
        var code = str.charCodeAt(index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index;
    }while (++index < max)
    return max;
}
function endIndex(str, index, min) {
    while(index > min){
        var code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [opt]
 * @return {string}
 * @public
 */ function serialize(name, val, opt) {
    var enc = opt && opt.encode || encodeURIComponent;
    if (typeof enc !== 'function') {
        throw new TypeError('option encode is invalid');
    }
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError('argument name is invalid');
    }
    var value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError('argument val is invalid');
    }
    var str = name + '=' + value;
    if (!opt) return str;
    if (null != opt.maxAge) {
        var maxAge = Math.floor(opt.maxAge);
        if (!isFinite(maxAge)) {
            throw new TypeError('option maxAge is invalid');
        }
        str += '; Max-Age=' + maxAge;
    }
    if (opt.domain) {
        if (!domainValueRegExp.test(opt.domain)) {
            throw new TypeError('option domain is invalid');
        }
        str += '; Domain=' + opt.domain;
    }
    if (opt.path) {
        if (!pathValueRegExp.test(opt.path)) {
            throw new TypeError('option path is invalid');
        }
        str += '; Path=' + opt.path;
    }
    if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
            throw new TypeError('option expires is invalid');
        }
        str += '; Expires=' + expires.toUTCString();
    }
    if (opt.httpOnly) {
        str += '; HttpOnly';
    }
    if (opt.secure) {
        str += '; Secure';
    }
    if (opt.partitioned) {
        str += '; Partitioned';
    }
    if (opt.priority) {
        var priority = typeof opt.priority === 'string' ? opt.priority.toLowerCase() : opt.priority;
        switch(priority){
            case 'low':
                str += '; Priority=Low';
                break;
            case 'medium':
                str += '; Priority=Medium';
                break;
            case 'high':
                str += '; Priority=High';
                break;
            default:
                throw new TypeError('option priority is invalid');
        }
    }
    if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch(sameSite){
            case true:
                str += '; SameSite=Strict';
                break;
            case 'lax':
                str += '; SameSite=Lax';
                break;
            case 'strict':
                str += '; SameSite=Strict';
                break;
            case 'none':
                str += '; SameSite=None';
                break;
            default:
                throw new TypeError('option sameSite is invalid');
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */ function decode(str) {
    return str.indexOf('%') !== -1 ? decodeURIComponent(str) : str;
}
/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */ function isDate(val) {
    return __toString.call(val) === '[object Date]';
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */ function tryDecode(str, decode) {
    try {
        return decode(str);
    } catch (e) {
        return str;
    }
}
}),
];

//# sourceMappingURL=3c713__pnpm_20fc0357._.js.map