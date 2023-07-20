import { type FC, useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';

import ProgramCondition from 'Components/ProgramCondition';
import { type IProgramSettingsPageProps, type IValidatorsResponse } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';

const ProgramSettingsPage: FC<IProgramSettingsPageProps> = ({
	conditions,
	setConditions,
	setSettingsValidate,
	paymentPercent,
	pointsToRubles,
	setPaymentPercent,
	setPointsToRubles,
}) => {
	const [amount1, setAmount1] = useState(conditions ? Object.keys(conditions)[0] : '');
	const [amount2, setAmount2] = useState(conditions ? Object.keys(conditions)[1] : '');
	const [percent1, setPercent1] = useState(
		conditions ? conditions[Object.keys(conditions)[0]] : '',
	);
	const [percent2, setPercent2] = useState(
		conditions ? conditions[Object.keys(conditions)[1]] : '',
	);
	const [paymentPercentState, setPaymentPercentState] = useState(paymentPercent ?? '');
	const [pointsToRublesState, setPointsToRublesState] = useState(pointsToRubles ?? '');

	const [validate, setValidate] = useState<IValidatorsResponse[]>([{}, {}, {}]);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
			return; // Чтобы валидаторы не сработали при первом загрузке
		}

		const validation1 = Validators({ percent: percent1, amount: amount1 });
		const validation2 = Validators({ percent: percent2, amount: amount2 });
		const validation3 = Validators({ percent: paymentPercentState, points: pointsToRublesState });
		setValidate([validation1, validation2, validation3]);

		if (
			!validation1.amount || !validation1.percent || !validation2.amount || !validation2.percent || !validation3.percent || !validation3.points
		) {
			setSettingsValidate(false);
			return;
		}

		const conditions = {
			[amount1]: percent1,
			[amount2]: percent2,
		};

		setConditions(conditions);
		setPaymentPercent(paymentPercentState);
		setPointsToRubles(pointsToRublesState);
		setSettingsValidate(true);
	}, [amount1, amount2, percent1, percent2, paymentPercentState, pointsToRublesState]);

	return (
		<Stack spacing={4}>
			<Stack spacing={1}>
				<Typography variant="subtitle2" fontWeight="bold">
					Условия программы
				</Typography>
				<ProgramCondition
					persent={percent1}
					amount={amount1}
					setPersent={setPercent1}
					setAmount={setAmount1}
					amountError={validate[0].amount}
					persentError={validate[0].percent}
				/>
				<ProgramCondition
					persent={percent2}
					amount={amount2}
					setPersent={setPercent2}
					setAmount={setAmount2}
					amountError={validate[1].amount}
					persentError={validate[1].percent}
				/>
			</Stack>
			<Stack spacing={1}>
				<Typography variant="subtitle2" fontWeight="bold">
					Лимиты программы
				</Typography>
				<ProgramCondition
					persent={paymentPercentState}
					amount={pointsToRublesState}
					setPersent={setPaymentPercentState}
					setAmount={setPointsToRublesState}
					firstLabel="Часть покупки, которую можно оплатить баллами"
					secondLabel="Курс обмена. 1 ₽ = баллов"
					secondAvatar={<EmojiEvents />}
					amountError={validate[2].points}
					persentError={validate[2].percent}
					secondErrorText={ValidatorTexts.points}
				/>
			</Stack>
		</Stack>
	);
};

export default ProgramSettingsPage;
