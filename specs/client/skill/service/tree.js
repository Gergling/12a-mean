describe("Skill Tree Service (skill.service.tree)", function () {
    "use strict";

    var factory, $httpBackend;

    beforeEach(function () {
        module('application');
        module('skill');
        inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            $httpBackend.expectGET("/skill").respond({
                level: 0,
                children: {
                    combat: {
                        name: "combat",
                        level: 1,
                        children: {
                            strategy: {
                                name: "strategy",
                                level: 2
                            }
                        }
                    }
                }
            });
            factory = $injector.get("skill.service.tree");
            $httpBackend.flush();
        });
    });

    it("on instantiation, loads a hierarchy of skill nodes from the backend", function () {
        expect(factory.get(["combat"]).level).toBe(1);
        expect(factory.get(["combat", "strategy"]).level).toBe(2);
    });
});