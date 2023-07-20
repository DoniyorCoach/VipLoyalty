import { type FC } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { type IChartComponentProps } from 'Interfaces';

const Chart: FC<IChartComponentProps> = ({ title, type, data }) => {
	const options: Highcharts.Options = {
		title: {
			text: title,
		},
		legend: {
			enabled: false,
		},
		series: [
			{
				name: '',
				type,
				data,
			},
		],
		tooltip: {
			headerFormat: '',
			pointFormat: '<b>{point.y}</b>',
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
			},
		},
		credits: {
			enabled: false,
		},
	};
	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
