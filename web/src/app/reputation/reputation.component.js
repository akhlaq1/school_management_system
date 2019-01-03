"use strict";
var module_1 = require();
if (viewEncapsulation) {
     %  > , ViewEncapsulation <  % ;
}
 %  >  % ;
if (changeDetection) {
     %  > , ChangeDetectionStrategy <  % ;
}
 %  > ;
from;
'@angular/core';
if (inlineTemplate) {
     %  >
        template;
    "\n    <p>\n      reputation Works!\n    </p>\n  ",  % ;
}
else {
     %  >
        templateUrl;
    './reputation.component.html',  % ;
}
if (inlineStyle) {
     %  >
        styles;
    [] <  % ;
}
else {
     %  >
        styleUrls;
    ['./reputation.component.css'] <  % ;
}
 %  >  % ;
if (viewEncapsulation) {
     %  > ,
        encapsulation;
    ViewEncapsulation. < ;
    viewEncapsulation %  >  % ;
}
if (changeDetection) {
     %  > ,
        changeDetection;
    ChangeDetectionStrategy. < ;
    changeDetection %  >  % ;
}
 %  >
;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
 %  > module_1.Component;
implements;
module_1.OnInit;
{
    constructor();
    { }
    ngOnInit();
    {
    }
}
