angular.module("application").service("application.service.primary-navigation", function () {

    "use strict";

    var scope = this, setNavItem = function (sref, label) {
        var item = {
            label: label,
            sref: 'container.' + sref
        };
        scope.list.push(item);
    };
    this.list = [];

    //setNavItem("mess", "Mess");
    setNavItem("quests", "Bridge");
    //setNavItem("cargo-bay", "Cargo Bay");
    setNavItem("skills({skill: ''})", "Skills");

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
