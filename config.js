var dojoConfig = {
    async: true,
    SiteUrl:'http://localhost/training/index.html',
    packages: [{
        name: "app",
        location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/lib/app'
    }]
};