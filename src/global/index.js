export const decode = (uri) => (
    uri.
    replaceAll("%2A", "*").
    replaceAll("%3A", ":").
    replaceAll("%2B", "+").
    replaceAll("%3B", ";").
    replaceAll("%3D", "=").
    replaceAll("%3F", "?").
    replaceAll("%40", "@").
    replaceAll("%5B", "[").
    replaceAll("%5D", "]").
    replaceAll("%5C", "\\").
    replaceAll("%2F", "/").
    replaceAll("%3C", "<").
    replaceAll("%3E", ">").
    replaceAll("%2D", ">").
    replaceAll("%7E", "~").
    replaceAll("%7B", "{").
    replaceAll("%7D", "}").
    replaceAll("%5F", "_").
    replaceAll("%20", " ").
    replaceAll("%21", "!").
    replaceAll("%22", "\"").
    replaceAll("%23", "#").
    replaceAll("%24", "$").
    replaceAll("%25", "%").
    replaceAll("%26", "&").
    replaceAll("%27", "'").
    replaceAll("%28", "(").
    replaceAll("%29", ")").
    replaceAll("%7C", "|")
)