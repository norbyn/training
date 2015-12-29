define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/i18n!app/nls/Form",
    "dojo/text!./templates/PersonalDataForm.html",
    "dojo/store/Memory",
    "dojo/on",
    "dijit/Dialog",
    "dojo/dom",
    "dojo/_base/config",
    "dijit/registry",
    "dojo/date/locale",
    "dojo/query",
    "dojo/NodeList-dom",
    "dijit/form/Form",
    "dijit/form/Button",
    "dijit/form/TextBox",
    "dijit/form/Select",
    "dijit/form/ValidationTextBox",
    "dijit/form/DateTextBox",
    "dojox/validate/web"
], function (declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             i18n, template, Memory, on,Dialog, dom, config, registry, locale, query, ValidationTextBox) {
    var genderStore = new Memory({
        data: [
            {name: i18n.genderMaleLabel, id: i18n.genderMaleLabel},
            {name: i18n.genderFemaleLabel, id: i18n.genderFemaleLabel}
        ]
    });
    // Create a new instance of dijit/Dialog

    return declare('app.PersonalDataForm', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        Translate: i18n,
        templateString: template,

        _setGenderStore: function () {
            var genderSelect = registry.byId('genderId');
            genderSelect.set('store', genderStore);
        }
        ,
        _myDisplayMessage: lang.hitch(this, function (message) {
            // You can do whatever you want with the message...
            if (typeof message != 'undefined')
                dom.byId("messageMail").innerHTML = message;
        }),
        _myDisplayMessageMail: lang.hitch(this, function (message) {
            // You can do whatever you want with the message...
            if (typeof message != 'undefined')
                dom.byId("messageName").innerHTML = message;
        }),
        _myDisplayMessageSurname: lang.hitch(this, function (message) {
            // You can do whatever you want with the message...
            if (typeof message != 'undefined')
                dom.byId("messageSurname").innerHTML = message;
        }),
        _confirm: function () {
            var isValid = dataForm.validate();
            if (isValid && !dataForm.get('isconfirmed')) {
                query(".no-confirmation").addClass("dijitHidden");
                query("#imageConfirm, .confirmation").removeClass("dijitHidden");
                query(".hiddenLabel.confirmation").addClass("form-control input-sm confirmText");
                query(".required").forEach(function (node, index, arr) {
                    node.innerHTML = "";
                });
                registry.byId('continueBtn').set('disabled', false);
                var values = dataForm.get('value');
                query('#emailConfirm')[0].innerHTML = values.email;
                query('#firstnameConfirm')[0].innerHTML = values.firstname;
                query('#surnameConfirm')[0].innerHTML = values.surname;
                if (values.company === null || values.company === "") {
                    query('#companyConfirm')[0].innerHTML = "?";
                } else {
                    query('#companyConfirm')[0].innerHTML = values.company;
                }

                query('#addressConfirm')[0].innerHTML = values.address;
                query('#cityConfirm')[0].innerHTML = values.city;
                query('#postcodeConfirm')[0].innerHTML = values.postcode;
                if (values.homephone === null || values.homephone === "") {
                    query('#homephoneConfirm')[0].innerHTML = "?";
                } else {
                    query('#homephoneConfirm')[0].innerHTML = values.homephone;
                }
                query('#cellphoneConfirm')[0].innerHTML = values.cellphone;
                query('#birthdateConfirm')[0].innerHTML = locale.format(values.birthdate, {
                    selector: "date",
                    formatLength: "medium"
                });
                query('#genderIdConfirm')[0].innerHTML = genderStore.get(values.genderId).name;
                query('#membershipNumberConfirm')[0].innerHTML = values.membershipNumber;

                dataForm.set('isconfirmed', true);
                return false;
            }
            return isValid;
        }

        ,
        _fixFormTitle: function () {
            if (config.locale == "es-es" || config.locale == "es")
                query('#formTitle').addClass("fixing");
        }
        ,
        _goBack: function () {
            query('.no-confirmation').removeClass('dijitHidden');
            query('.confirmation, #imageConfirm').addClass('dijitHidden');
            query(".required.need").forEach(function (node, index, arr) {
                node.innerHTML = "*";
            });
            registry.byId('dataForm').set('isconfirmed', false);
            registry.byId('continueBtn').set("disabled", true);
        }
        ,

        postCreate: function () {
            var self = this;
            var dataForm = registry.byId('dataForm');
            on(this._addBtn, 'click', this._confirm);
            on(this._backBtn, 'click', this._goBack);
            on(this._upload, 'click', this._uploadTest);
            on(this._diagBtn, 'click', this._showDialog);
            on(this._diagCloseBtn, 'click', this._hideDialog);
            //on(this._myDisplayMessage(), 'click', this.);
            this._fixFormTitle();
            this._setGenderStore();
            this.inherited(arguments);
        }
        ,
        _uploadTest: function () {
            alert();

            dojoConfig.locale = "en";

        }
        ,
        myDialog: new Dialog({
            // The dialog's title
            title: "The Dojo Toolkit",
            // The dialog's content
            content: "This is the dialog content.",
            // Hard-code the dialog width
            style: "width:200px;"
        }),
        _showDialog: function () {
           // debbug;
            alert();
            registry.byId("terms").show();
        },
        // Hide the dialog
        _hideDialog: function () {
            registry.byId("terms").hide();
        }
    });

})
;