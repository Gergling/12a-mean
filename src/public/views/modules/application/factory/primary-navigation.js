angular.module("application").service("application.service.primary-navigation", function () {

    "use strict";

    var scope = this, setNavItem = function (name, label) {
        var item = {
            label: label,
            name: name
        };
        scope.list.push(item);
    };
    this.list = [];

    setNavItem("mess", "Mess");
    setNavItem("quests", "Bridge");
    setNavItem("cargo-bay", "Cargo Bay");
    setNavItem("skills", "Skills");

    this.setActive = function (name) {
        angular.forEach(scope.list, function (item) {
            if (item.name === name) {
                item.active = true;
                scope.active = item;
            } else {
                item.active = false;
            }
        });
    };
});
