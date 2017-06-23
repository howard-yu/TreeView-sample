function initjsTree() {
    var jscom = jsTreeCom.getInstance();

    $('#html').jstree();

    $('#treeview').jstree({
        'core': {
            'data': [{
                "id": "1",
                "text": "Release",
                "children": [
                    {
                        "id": "2", "text": "Braswell",
                        "children": [
                            {
                                "id": "1_2_21", "text": "BW051",
                                "children": [
                                   { "id": "1_2_21_211", "text": "Win10" },
                                   { "id": "1_2_21_212", "text": "Win8 X" },
                                   { "id": "1_2_21_213", "text": "Win7" },
                                   {
                                       "id": "1_2_21_214", "text": "WES7",
                                       "children": [
                                           { "id": "1_2_21_214_2141", "text": "64bit" },
                                           { "id": "1_2_21_214_2142", "text": "32bit" }
                                       ]
                                   },
                                ]
                            },
                            { "id": "1_2_22", "text": "BW173" },
                            { "id": "1_2_23", "text": "BW556" }
                        ],
                    },
                    {
                        "id": "3", "text": "Skylake",
                        "children": [
                            { "id": "1_3_21", "text": "test3" },
                            { "id": "1_3_22", "text": "test4" }
                        ],
                    }
                ]
            }],
            "themes": {
                "dots": true,
                "responsive": false
            },
            'multiple': false,
            'check_callback': function (operation, node, parent, position, more) {
                var options = {
                    'operation': operation,
                    'node': node,
                    'parent': parent,
                    'position': position,
                    'more': more
                };
                jscom.setOptions(options);
                jscom.checkCallback();
            },
        },
        'types': {
            "default": {
                "icon": "jstree-default-large jstree-folder"
            },
            "file": {
                "icon": "jstree-default-large jstree-file",
                "valid_children" : []
            },
        },
        'plugins': [
            'dnd',
            'state',
            'types',
            'contextmenu',
            'wholerow',
        ],
        "contextmenu": {
            select_node: false,
            show_at_node: true,
            items: function (options, callback) {
                var actionitem = jscom.createActions();
                var actions = {
                    "create": options.type == "file" ? null : actionitem.create,
                    "rename": (options.id == "1" || options.type == "file") ? null: actionitem.rename,
                    "delete": (options.id == "1" || options.type == "file") ? null : actionitem.delete
                }
                return actions;
            }
        },
    });

    $('#treeview').on("select_node.jstree", function (e, data) {

        var loMainSelected = data;
        var nodepath = uiGetParents(loMainSelected);

        $('#wrapper-content').empty();
        var content = "<table class='table'>";
        content += "<col width='80%'>";
        content += "<tr>";
        content += "<td colspan='8'>";
        content += "<div class='row'>";
        content += "<div class='col-md-4'>" + nodepath + "</div>";
        content += "<div class='col-md-8' style='text-align:right'>";
        content += "<input type='button' value='Add New File' id='add' />";
        content += "</div>";
        content += "</div>";
        content += "</td>";
        content += "</tr>";
        content += "<tr>";
        content += "<th colspan='8'><div class='text-center'>Standard</div></th>";
        content += "</tr>";
        content += "<tr>";
        content += "<td colspan='8'><div class='text-center'>OS</div></td>";
        content += "</tr>";
        content += "<tr>";
        content += "<td class='text-center'>File Name</td>";
        content += "<td class='text-center'>Part Number</td>";
        content += "<td class='text-center'>Revision</td>";
        content += "<td class='text-center'>Release Date</td>";
        content += "<td class='text-center'>Upload Date</td>";
        content += "<td class='text-center'>Desc</td>";
        content += "<td class='text-center'>Status</td>";
        content += "<td class='text-center'>";
        content += "</td>";
        content += "</tr>";
        content += "<tr>";
        content += "<td class='text-center'><a href='#'>OS_WES7_642_0000BWE7</a><span class='glyphicon glyphicon-save'></span></td>";
        content += "<td class='text-center'>642_0000BWE7_080G</td>";
        content += "<td class='text-center'>1.0.0.0</td>";
        content += "<td class='text-center'>2017/5/4</td>";
        content += "<td class='text-center'>2017/5/4</td>";
        content += "<td class='text-center'>WES7 OS Img</td>";
        content += "<td class='text-center'>Release for PA</td>";
        content += "<td class='text-center'>";
        content += "<input type='button' value='Formal Release' id='formalrelease'/><br />";
        content += "<input type='button' value='Edit' id='edit' />";
        content += "<input type='button' value='Delete' id='delete' />";
        content += "</td>";
        content += "</tr>";
        content += "<tr>";
        content += "<th colspan='8'><div class='text-center'>OEM</div></th>";
        content += "</tr>";
        content += "<tr>";
        content += "<td colspan='8'><div class='text-center'>Driver</div></td>";
        content += "</tr>";
        content += "<tr>";
        content += "<td colspan='8'><div class='text-center'>Audio</div></td>";
        content += "</tr>";
        content += "<tr>";
        content += "<td class='text-center'>File Name</td>";
        content += "<td class='text-center'>Part Number</td>";
        content += "<td class='text-center'>Revision</td>";
        content += "<td class='text-center'>Release Date</td>";
        content += "<td class='text-center'>Upload Date</td>";
        content += "<td class='text-center'>Desc</td>";
        content += "<td class='text-center'>Status</td>";
        content += "<td class='text-center'>";
        content += "</td>";
        content += "</tr>";
        content += "<tr>";
        content += "<td class='text-center'><a href='#'>OS_WES7_642_0000BWE7</a><span class='glyphicon glyphicon-save'></span></td>";
        content += "<td class='text-center'>642_0000BWE7_080G</td>";
        content += "<td class='text-center'>1.0.0.0</td>";
        content += "<td class='text-center'>2017/5/4</td>";
        content += "<td class='text-center'>2017/5/4</td>";
        content += "<td class='text-center'>WES7 OS Img</td>";
        content += "<td class='text-center'>Release for PA</td>";
        content += "<td class='text-center'>";
        content += "<input type='button' value='Edit' id='edit' />";
        content += "<input type='button' value='Delete' id='delete' />";
        content += "</td>";
        $('#wrapper-content').append(content);
    });
};

function uiGetParents(loSelectedNode) {
    try {
        var lnLevel = loSelectedNode.node.parents.length;
        var lsSelectedID = loSelectedNode.node.id;
        var loParent = $("#" + lsSelectedID);
        var lsParents = loSelectedNode.node.text + ' >';
        for (var ln = 0; ln <= lnLevel - 1 ; ln++) {
            var loParent = loParent.parent().parent();
            if (loParent.children()[2] != undefined) {
                lsParents += loParent.children()[2].text + " > ";
            }
        }
        if (lsParents.length > 0) {
            lsParents = lsParents.substring(0, lsParents.length - 1);
        }
        return lsParents;
    }
    catch (err) {
        alert('Error in uiGetParents');
    }
};