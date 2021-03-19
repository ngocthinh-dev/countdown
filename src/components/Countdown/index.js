import { useState, useEffect } from 'react';

import { CountDownBox, CountDownTime, Time, Span } from './Countdown.styles';

function Count({ selectedDay }) {
	const calculateTimeLeft = (picktime) => {
		const timeSelected = picktime || '2022-02-01 00:00:00';

		const difference = +new Date(timeSelected) - +new Date();
		if (difference > 0) {
			const timeLeft = {
				days: Math.floor(difference / (1000 * 24 * 60 * 60)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / (1000 * 60)) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};

			if (timeLeft.seconds === 0) {
				setOverTime(true);
			}
			return timeLeft;
		} else {
			const timeLeft = {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			};
			return timeLeft;
		}
	};

	const [time, setTime] = useState(calculateTimeLeft());
	const [overTime, setOverTime] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			console.log("It's still running");
			setTime(calculateTimeLeft(selectedDay));
		}, 1000);

		if (overTime) {
			clearInterval(timer);
		}

		return () => clearInterval(timer);
	}, [selectedDay, overTime]);

	return (
		<CountDownBox>
			<CountDownTime>
				<Time fontSize="6rem">
					{time.days < 10 ? '0' + time.days : time.days}
				</Time>
				<Span>Ngày</Span>
			</CountDownTime>
			<CountDownTime>
				<Time fontSize="6rem">
					{time.hours < 10 ? '0' + time.hours : time.hours}
				</Time>
				<Span>Giờ</Span>
			</CountDownTime>
			<CountDownTime>
				<Time fontSize="6rem">
					{time.minutes < 10 ? '0' + time.minutes : time.minutes}
				</Time>
				<Span>Phút</Span>
			</CountDownTime>
			<CountDownTime>
				<Time fontSize="6rem">
					{time.seconds < 10 ? '0' + time.seconds : time.seconds}
				</Time>
				<Span>Giây</Span>
			</CountDownTime>
		</CountDownBox>
	);
}

export default Count;
