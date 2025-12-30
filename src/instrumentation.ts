export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Logic for real Node.js if needed
    }

    // Safety net for Cloudflare Workers / Edge Runtime
    // Prevents polyfills from monkey-patching setImmediate
    try {
        if (typeof setImmediate !== "undefined") {
            // @ts-ignore
            globalThis.setImmediate = undefined;
        }
    } catch (e) {
        console.error("Failed to disable setImmediate:", e);
    }
}
