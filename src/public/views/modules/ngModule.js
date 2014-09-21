var NGModule = function (ngm) {
    "use strict";

    var scope = this;
    this.ngm = ngm;
    this.name = ngm.name;
    this.getModuleName = function (type, name) {
        return [scope.name, type, name].join(".");
    };
    this.component = function (fnc) {
        fnc(ngm, scope);
        return this;
    };
    this.getPartialUrl = function (name) {
        return [
            scope.name,
            'partial',
            name + '.html'
        ].join('/');
    };
};
var NGModuleCollection = function () {
    "use strict";

    var modules = {};
    this.set = function (ngm) {
        var module = new NGModule(ngm);
        modules[ngm.name] = module;
        return module;
    };
    this.get = function (name) {
        return modules[name];
    };
    this.bootstrap = function (domObj) {
        return angular.bootstrap(domObj, Object.keys(modules));
    };
};
