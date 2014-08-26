var ngModule = function(ngm) {
    this.ngm = ngm;
    this.name = ngm.name;
    this.component = function (type, name, fnc) {
        fnc(this, ngm);
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
};
