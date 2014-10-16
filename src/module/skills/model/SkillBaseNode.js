module.exports = function () {
    var SkillReference = function (strRef) {
            var scope = this,
                chunks = strRef.split("."),
                name = chunks.shift(),
                descRef = chunks.join(".");

            this.getName = function () {return name; };
            this.getDescendentReference = function () {return descRef; };
        };

    var SkillBaseNode = function (extension) {
        var scope = this;

        this.children = { };

        this.set = function (strRef) {
            return scope.traverse(strRef, false);
        };
        this.find = function (strRef) {
            return scope.traverse(strRef, true);
        };

        this.traverse = function (strRef, getter) {
            var reference = new SkillReference(strRef),
                childName = reference.getName(),
                descRef = reference.getDescendentReference(),
                child = scope.children[childName],
                ext = extension || SkillBaseNode
                node;

            if (!child) {
                if (getter) {
                    throw new Error();
                } else {
                    child = new ext(descRef);
                    scope.children[childName] = child;
                }
            }
            if (!descRef) {
                node = child;
            } else {
                node = child.traverse(descref, getter);
            }
            return node;
        };
    };
};