import { useState, useEffect } from 'react';
import FestivalDay from './festivalDay.json';
import {
	TextDateTime,
	Title,
	TimeDiv,
	TimeChoice,
} from './DateTimePicker.styles';
import { DatePicker, Space, Select } from 'antd';
import _ from 'lodash';
import moment from 'moment';

const { Option } = Select;

function DateTimePicker({ callback }) {
	const [date, setDate] = useState('');
	const [option, setOption] = useState('');
	const [listFestival, setListFestival] = useState([]);
	const [selectedDay, setSelectedDate] = useState('');

	const handleChangeDate = (dayChoice) => {
		setDate(null);
		setOption(dayChoice);
		setSelectedDate(dayChoice);
	};

	const onChange = (value, dateString) => {
		setOption(null);
		setDate(value);
		setSelectedDate(dateString);
	};

	useEffect(() => {
		FestivalDay.map((item) => {
			const difference = +new Date(`2021-${item.time} 00:00:00`) - +new Date();
			if (difference < 0) {
				listFestival.push({
					time: `2022-${item.time} 00:00:00`,
					name: item.name,
				});
			} else {
				listFestival.push({
					time: `2021-${item.time} 00:00:00`,
					name: item.name,
				});
			}
		});
	}, []);

	const disabledDate = (current) => {
		let customDate = '2021-03-19';
		return current && current < moment(customDate, 'YYYY-MM-DD');
	};

	useEffect(() => {
		if (selectedDay) {
			callback(selectedDay);
		}
	}, [selectedDay]);

	return (
		<TimeChoice>
			<Title marginBottom="25px">
				<TextDateTime fontSize="3.4rem" fontWeight="600" textAlign="center">
					COUNTDOWN TEMPLATE
				</TextDateTime>
			</Title>
			<TimeDiv>
				<Space style={{ width: 300 }} direction="vertical" size={15}>
					<DatePicker
						style={{ width: 300 }}
						showTime
						onChange={onChange}
						disabledDate={disabledDate}
						value={date}
					/>
				</Space>

				<Select
					showSearch
					style={{ width: 500 }}
					placeholder="Select a day"
					optionFilterProp="children"
					onChange={handleChangeDate}
					value={option}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					{_.map(listFestival, (item, index) => {
						return (
							<Option key={index} value={item.time}>
								{item.name}
							</Option>
						);
					})}
				</Select>
			</TimeDiv>
		</TimeChoice>
	);
}

export default DateTimePicker;
