var dojoConfig = {
    parseOnLoad: false,
    isDebug: true,
    async: true,

    SiteUrl:'http://localhost/training/index.html',
    packages: [{
        name: "app",
        location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/lib/app'
    }]
};