define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/PersonalDataForm.html",
    "dojo/on",
    "dojo/_base/config",
    "dojo/query",
    "dojo/dom",
    "dojo/i18n!app/nls/Form",
    "dojo/dom-class",
    "dojo/store/Memory",
    "dijit/form/FilteringSelect",
    "dojo/dom-style",
    "dijit/Dialog",
    "dojo/_base/json",
    "dijit/form/Form",
    "dijit/form/ValidationTextBox",
    "dijit/form/DateTextBox",
    "dojox/validate/web"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             template, on, config, query, dom, i18n, domClass, Memory, Select, domStyle, Dialog, JSON) {
    return declare('app.PersonalDataForm', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        Translate: i18n,
        templateString: template,
        _gender: null,
        _back: true,
        postCreate: function () {
            this.inherited(arguments);
            if (config.locale == "es-es" || config.locale == "es")
                domClass.add("formTitle", "fixing");
            var self = this;
            var genderStore = new Memory({
                data: [
                    {name: i18n.genderMaleLabel, id: i18n.genderMaleLabel},
                    {name: i18n.genderFemaleLabel, id: i18n.genderFemaleLabel}
                ]
            });
            //Doing something programmatically
            var select = new Select({
                required: true,
                id: "genderSelect",
                store: genderStore,
                searchAttr: "name"
            }, "genderSelect").startup();

            on(this._btn, 'click', function () {
                if (dataForm.validate() && self._back) {
                    query("input").forEach(function (node, index, arr) {
                        node.setAttribute('disabled', true);
                        node.setAttribute("editable", false);
                    });
                    query(".required").forEach(function (node, index, arr) {
                        node.innerHTML = "";
                        // domStyle.set(node, "display", "none");
                    });

                    query(".button-group span#_btn").forEach(function (node, index, arr) {
                        node.innerHTML = i18n.backButton;
                        // domStyle.set(node, "display", "none");
                    });
                    self._back = false;
                }
                else if (dataForm.validate()) {
                    query("input").forEach(function (node, index, arr) {
                        node.setAttribute('disabled', true);
                        node.setAttribute("editable", false);
                        console.log("kakakaka");
                    });
                    query(".required").forEach(function (node, index, arr) {
                        node.innerHTML = "*";
                        // domStyle.set(node, "display", "none");
                    });

                    query(".button-group span#_btn").forEach(function (node, index, arr) {
                        node.innerHTML = i18n.addNewPersonButton;
                        // domStyle.set(node, "display", "none");
                    });
                    self._back = true;
                }
            });

            on(this._btnContinue, 'click', function () {
                if (dataForm.isValid()) {
                    var data = {
                        email: self._email.value,
                        firstname: self._firstname.value,
                        surname: self._surname.value,
                        company: self._company.value,
                        address: self._address.value,
                        city: self._city.value,
                        postcode: self._postcode.value,
                        homephone: self._homephone.value,
                        cellphone: self._cellphone.value,
                        birthdate: self._birthdate.value,
                        genderValue: self._genderValue.value,
                        membershipNumber: self._membershipNumber.value
                    };
                    console.log(data);
                    //var requestParams = syntaxHighlight(dojo.toJson(data));
                   /* var myDialog = new Dialog({
                        title: i18n.postOk,
                        content: requestParams,
                        style: "width:400px;"
                    });
                    myDialog.show();*/
                }
            });

        }
    });

});