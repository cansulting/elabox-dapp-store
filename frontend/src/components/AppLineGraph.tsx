import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const options = {
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
}
const Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       ']
export interface AppLineGraph {
    stats: [any]
}

export const AppLineGraph = (props: AppLineGraph): JSX.Element => {
    const data = {
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
    }
    return <Line options={options} data={data} height={70} />
}
