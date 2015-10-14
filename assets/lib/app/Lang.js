define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Lang.html",
    "dojo/on",
    "dojo/query",
    "dojo/_base/config",
    "dijit/Menu",
    "dijit/MenuItem"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             template, on, query, config) {
    return declare('app.Lang', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        postCreate: function () {
            on(this._spanishMenuItem, 'click', function () {
                window.location.href = config.SiteUrl + '?lang=es';
            });
            on(this._englishMenuItem, 'click', function () {
                window.location.href = config.SiteUrl + '?lang=en';
            });
        }
    });

});
