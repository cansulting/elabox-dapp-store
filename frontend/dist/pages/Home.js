var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
// import { Grid, Button } from "antd-mobile";
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(parameters) {
        return _super.call(this, parameters) || this;
    }
    Home.prototype.render = function () {
        return React.createElement("div", null, "sdfsdf");
        // return <Grid columns={4}>
        //     <Grid.Item>
        //         <Button>DFDFGDF</Button>
        //     </Grid.Item>
        // </Grid>;
    };
    return Home;
}(React.Component));
export { Home };
