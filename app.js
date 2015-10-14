require([
    "dojo/parser",
    "dojo/ready",
    'app/Lang',
    'app/PersonalDataForm'
], function (parser, ready) {
    ready(function () {
        parser.parse();
    });

}); 