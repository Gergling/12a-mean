module.exports = function (label, props) {
    this.label = label;
    this.description = props.description;
    this.glyphicon = props.glyphicon || "";

    // Need a validation function for queryData
    this.run = function (queryData) {
        return false;
    };
};
