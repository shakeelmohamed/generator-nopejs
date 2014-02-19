/*global describe, beforeEach, it*/
"use strict";

var path    = require("path");
var helpers = require("yeoman-generator").test;
var assert  = require("assert");

describe("Egress generator", function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator("egress:app", [
                "../../app"
            ]);
            done();
        }.bind(this));
    });

    it("creates expected files", function (done) {
        var templateFiles = [
            "config.js",
            "package.json",
            "README.md"
        ];
        var remoteFiles = [
            "controllers/_404.js",
            "controllers/account.js",
            "controllers/home.js",
            "controllers/index.js",
            "controllers/join.js",
            "controllers/login.js",
            "controllers/logout.js",
            "databases/database.yml",
            "databases/users.sql",
            "jade/404.jade",
            "jade/account.jade",
            "jade/includes/head.jade",
            "jade/includes/nav.jade",
            "jade/includes/scripts.jade",
            "jade/index.jade",
            "jade/join.jade",
            "jade/login.jade",
            "public/assets/css/egress.css",
            "public/assets/js/html5shiv.js",
            "public/assets/js/jquery-1.10.2.min.map",
            "public/assets/js/jquery.js",
            "public/dist/css/bootstrap.min.css",
            "public/dist/js/bootstrap.min.js",
            "routes/index.js",
            "app.js",
            "index.js",
            "Procfile",
            ".env"
        ];

        var egressConfig = {
            "siteName": "Egress-test-site",
            "siteAuthor": "Shakeel Mohamed",
            "siteDescription": "Egress test site."
        };

        helpers.mockPrompt(this.app, egressConfig);

        this.app.options["skip-install"] = true;

        this.app.run({}, function () {
            helpers.assertFiles(templateFiles);
            helpers.assertFiles(remoteFiles);
            var generatedConfig = require("./temp/config.js");
            for (var i in egressConfig) {
                assert.equal(generatedConfig[i], egressConfig[i]);
            }
            done();
        });
    });
});