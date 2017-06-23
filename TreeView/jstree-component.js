var jsTreeCom = (function () {
    var instance;

    function createInstance() {
        var object = new jstreeCom();
        return object;
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function jstreeCom() {
    this.options = {};
};

jstreeCom.prototype.setOptions = function (options) {
    this.options = options;
};

jstreeCom.prototype.checkCallback = function () {
    if (this.options.operation === 'create_node') {
        console.log(this.options.parent.text);
        console.log('create');
    }
    if (this.options.operation === 'delete_node') {
        console.log(this.options.node.text);
        console.log(this.options.position);
        console.log('delete');
    }
    if (this.options.operation === 'rename_node') {
        console.log(this.options.position);
        console.log(this.options.node.text);
        console.log('rename');
    }
    return true;
};

jstreeCom.prototype.createActions = function ()
{
    var actions = {};
    actions.create = {
        "separator_before": false,
        "separator_after": true,
        "_disabled": false,
        "label": "new",
        "action": function (data) {
            var inst = $.jstree.reference(data.reference),
                 obj = inst.get_node(data.reference);
            inst.create_node(obj, {}, "first", function (new_node) {
                setTimeout(function () { inst.edit(new_node); }, 0);
            });
        }
    }
    actions.rename = {
        "separator_before": false,
        "separator_after": false,
        "_disabled": false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
        "label": "rename",
        "action": function (data) {
            var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
            inst.edit(obj);
        }
    }
    actions.delete = {
        "separator_before": false,
        "icon": false,
        "separator_after": false,
        "_disabled": false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
        "label": "delete",
        "action": function (data) {
            var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
            if (inst.is_selected(obj)) {
                inst.delete_node(inst.get_selected());
            }
            else {
                inst.delete_node(obj);
            }
        }
    }
    return actions ;
}

jstreeCom.prototype.post = function (url, postData, successFunction, errorFunction) {
    var result;
    $.support.cors = true;
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(postData),
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            successFunction(data, errorFunction);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            try {
                if (jqXHR.responseText) {
                    result = JSON.parse(jqXHR.responseText);
                    result = result.message;
                } else {
                    result = errorThrown;
                }
            }
            catch (e) {
                result = errorThrown;
            }

            errorFunction(result);
        }
    });
}