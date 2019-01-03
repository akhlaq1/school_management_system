/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require("@angular/core/testing");
var pub_sub_service_1 = require("./pub-sub.service");
describe('PubSubService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [pub_sub_service_1.PubSubService]
        });
    });
    it('should ...', testing_1.inject([pub_sub_service_1.PubSubService], function (service) {
        expect(service).toBeTruthy();
    }));
});
