"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLineGraph = void 0;
var react_1 = __importDefault(require("react"));
var chart_js_1 = require("chart.js");
var react_chartjs_2_1 = require("react-chartjs-2");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
var options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        labels: {
            display: false,
        },
    },
};
var Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       '];
var AppLineGraph = function (props) {
    var data = {
        labels: Labels,
        datasets: [
            {
                label: '',
                data: props.stats,
                borderColor: '#2C71F6',
                backgroundColor: '#2C71F6',
                tension: 0.1,
            },
        ],
    };
    return react_1.default.createElement(react_chartjs_2_1.Line, { options: options, data: data, height: 70 });
};
exports.AppLineGraph = AppLineGraph;
