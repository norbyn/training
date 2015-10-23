define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Lang.html",
    "dojo/on",
    "dijit/Menu",
    "dijit/MenuItem"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             template, on) {
    return declare('app.Lang', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        postCreate: function () {
		var url = window.location.href.split('?')[0];
            on(this._spanishMenuItem, 'click', function () {               
			   window.location.href = url + '?lang=es';			   
            });
            on(this._englishMenuItem, 'click', function () {                
				 window.location.href = url + '?lang=en';
            });
        }
    });

});
