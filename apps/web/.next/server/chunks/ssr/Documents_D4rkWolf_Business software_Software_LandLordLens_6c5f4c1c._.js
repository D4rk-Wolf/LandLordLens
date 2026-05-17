module.exports = [
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerClient",
    ()=>createServerClient,
    "createServiceRoleClient",
    ()=>createServiceRoleClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://jjpsessttexydvjithdl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcHNlc3N0dGV4eWR2aml0aGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDE4NjksImV4cCI6MjA5NDUxNzg2OX0.z4U-p4dcJK3MuazmGk7gQbfFctINS8FJ12lCw3Jb-2o"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // Called from a Server Component — cookies will be set by middleware
                }
            }
        }
    });
}
function createServiceRoleClient() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = __turbopack_context__.r("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+supabase-js@2.105.4/node_modules/@supabase/supabase-js/dist/index.cjs [app-rsc] (ecmascript)");
    return createClient(("TURBOPACK compile-time value", "https://jjpsessttexydvjithdl.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/browser.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-rsc] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://jjpsessttexydvjithdl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcHNlc3N0dGV4eWR2aml0aGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDE4NjksImV4cCI6MjA5NDUxNzg2OX0.z4U-p4dcJK3MuazmGk7gQbfFctINS8FJ12lCw3Jb-2o"));
}
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/session.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "requireUser",
    ()=>requireUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/server.ts [app-rsc] (ecmascript)");
;
async function getCurrentUser() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}
async function requireUser() {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    return user;
}
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/middleware.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateSession",
    ()=>updateSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/@supabase+ssr@0.5.2_@supabase+supabase-js@2.105.4/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/server.js [app-rsc] (ecmascript)");
;
;
const PROTECTED_PATHS = [
    '/dashboard',
    '/admin'
];
const AUTH_PATHS = [
    '/sign-in',
    '/sign-up'
];
async function updateSession(request) {
    let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request
    });
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supabase$2b$supabase$2d$js$40$2$2e$105$2e$4$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://jjpsessttexydvjithdl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcHNlc3N0dGV4eWR2aml0aGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDE4NjksImV4cCI6MjA5NDUxNzg2OX0.z4U-p4dcJK3MuazmGk7gQbfFctINS8FJ12lCw3Jb-2o"), {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request
                });
                cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
            }
        }
    });
    const { data: { user } } = await supabase.auth.getUser();
    const pathname = request.nextUrl.pathname;
    const isProtected = PROTECTED_PATHS.some((p)=>pathname.startsWith(p));
    const isAuthPage = AUTH_PATHS.some((p)=>pathname.startsWith(p));
    if (!user && isProtected) {
        const url = request.nextUrl.clone();
        url.pathname = '/sign-in';
        url.searchParams.set('redirectTo', pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    if (user && isAuthPage) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return supabaseResponse;
}
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/roles.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAdmin",
    ()=>isAdmin,
    "isLandlord",
    ()=>isLandlord
]);
function isAdmin(role) {
    return role === 'admin';
}
function isLandlord(role) {
    return role === 'landlord' || role === 'admin';
}
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$browser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/browser.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$middleware$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/middleware.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$roles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/roles.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Sidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx <module evaluation>", "Sidebar");
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Sidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx", "Sidebar");
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "MobileHeader",
    ()=>MobileHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const MobileHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MobileHeader() from the server but MobileHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx <module evaluation>", "MobileHeader");
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "MobileHeader",
    ()=>MobileHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const MobileHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MobileHeader() from the server but MobileHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx", "MobileHeader");
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$mobile$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$mobile$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$mobile$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/(dashboard)/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/node_modules/.pnpm/next@15.5.18_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/packages/auth/src/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/sidebar.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$mobile$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/components/dashboard/mobile-header.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function DashboardLayout({ children }) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$packages$2f$auth$2f$src$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/sign-in');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
                fileName: "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/(dashboard)/layout.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$apps$2f$web$2f$app$2f$components$2f$dashboard$2f$mobile$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MobileHeader"], {}, void 0, false, {
                        fileName: "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/(dashboard)/layout.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$D4rkWolf$2f$Business__software$2f$Software$2f$LandLordLens$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 p-6 md:p-8",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/(dashboard)/layout.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/(dashboard)/layout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/D4rkWolf/Business software/Software/LandLordLens/apps/web/app/(dashboard)/layout.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Documents_D4rkWolf_Business%20software_Software_LandLordLens_6c5f4c1c._.js.map