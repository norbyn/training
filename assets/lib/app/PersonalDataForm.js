define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/i18n!app/nls/Form",
    "dojo/text!./templates/PersonalDataForm.html",
    "dojo/text!./json/person.json",
    "dojo/store/Memory",
    "dojo/json",
    "dojo/on",
    "dojo/query",
    "dojo/_base/config",
    "dijit/registry",
    "dijit/Dialog",
    "dojo/dom-class",
    "dojo/date/locale",
    "dijit/form/Form",
    "dijit/form/Button",
    "dijit/form/TextBox",
    "dijit/form/Select",
    "dijit/form/ValidationTextBox",
    "dijit/form/DateTextBox",
    "dojox/validate/web"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             i18n, template, Person, Memory, json, on, query, config, registry, Dialog, domClass, locale) {


    var genderStore = new Memory({
        data: [
            {name: i18n.genderMaleLabel, id: i18n.genderMaleLabel},
            {name: i18n.genderFemaleLabel, id: i18n.genderFemaleLabel}
        ]
    });


    var personStore = new Memory({
        data: json.parse(Person)
    });


    return declare('app.PersonalDataForm', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        Translate: i18n,
        templateString: template,

        _setGenderStore: function () {
            var genderSelect = registry.byId('genderId');
            genderSelect.set('store', genderStore);
        },

        _loadPersonal: function () {
            var personId = getParam('id');
            if (personId) {
                var person = personStore.get(personId);
                if (person) {
                    var dataForm = registry.byId('dataForm');
                    dataForm.set('value', person);
                }
            }
        },

        _confirm: function () {
            var isValid = dataForm.validate();
            if (isValid && !dataForm.get('isconfirmed')) {

                query(".no-confirmation").forEach(function (node, index, arr) {
                    domClass.add(node, "dijitHidden");
                });

                query("#imageConfirm").forEach(function (node, index, arr) {
                    domClass.remove(node, "dijitHidden");
                });

                query(".confirmation").forEach(function (node, index, arr) {
                    domClass.remove(node, "dijitHidden");
                });

                query(".hiddenLabel.confirmation").forEach(function (node, index, arr) {
                    domClass.add(node, "form-control input-sm confirmText");
                });

                query(".required").forEach(function (node, index, arr) {
                    node.innerHTML = "";
                });
                registry.byId('continueBtn').setAttribute("disabled", false);

                var values = dataForm.get('value');
                query('#emailConfirm')[0].innerHTML = values.email;
                query('#firstnameConfirm')[0].innerHTML = values.firstname;
                query('#surnameConfirm')[0].innerHTML = values.surname;
                query('#companyConfirm')[0].innerHTML = values.company;
                query('#addressConfirm')[0].innerHTML = values.address;
                query('#cityConfirm')[0].innerHTML = values.city;
                query('#postcodeConfirm')[0].innerHTML = values.postcode;
                query('#homephoneConfirm')[0].innerHTML = values.homephone;
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
                domClass.add("formTitle", "fixing");
        }
        ,

        _goBack: function () {
            query('.no-confirmation').forEach(function (node, index, arr) {
                domClass.remove(node, 'dijitHidden');
            });
            query('.confirmation').forEach(function (node, index, arr) {
                domClass.add(node, 'dijitHidden');
            });
            query("#imageConfirm").forEach(function (node, index, arr) {
                domClass.add(node, "dijitHidden");
            });
            registry.byId('dataForm').set('isconfirmed', false);
            registry.byId('continueBtn').setAttribute("disabled", true);
        }
        ,
        postCreate: function () {
            var dataForm = registry.byId('dataForm');
            on(registry.byId('addBtn'), 'click', this._confirm);
            on(registry.byId('backBtn'), 'click', this._goBack);
            this._fixFormTitle();
            this._setGenderStore();
            this._loadPersonal();
            this.inherited(arguments);
        }
    });

})
;