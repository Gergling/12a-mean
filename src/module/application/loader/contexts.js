var grunt = require("grunt"),
    pathService = require("path"),

    localPaths = require("./local-paths"),

    Context = require(localPaths.module + "tbe/model/Context"),

    contexts = { };

grunt.file.expand(localPaths.module + "tbe-contexts/*.js").forEach(function (ctx) {
    var modulePath = ctx.replace(".js", ""),
        contextName = pathService.basename(ctx, ".js"),
        context = new Context();

    contexts[contextName] = require(modulePath)(context, srcModules.tbe);
});

module.exports = contexts;
