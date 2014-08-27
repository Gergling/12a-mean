var ngModule = function(ngm) {
    var scope = this;
    this.ngm = ngm;
    this.name = ngm.name;
    this.component = function (type, fnc) {
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
var ngModuleCollection = function () {
    var scope = this, modules = {};
    this.set = function (ngm) {
        var module = new ngModule(ngm);
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
