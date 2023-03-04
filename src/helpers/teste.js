$(document).ready(function () {
    $('#dialogMessage').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            OK: function () { $(this).dialog("close"); }
        },
    })
});

function openModal() {
    $("#dialogMessage").dialog("open");
}