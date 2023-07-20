import { type FC, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { type ISnackbarComponentProps } from 'Interfaces';

const Snackbar: FC<ISnackbarComponentProps> = ({ text, variant, setText }) => {
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		enqueueSnackbar(text, {
			variant,
			anchorOrigin: { vertical: 'top', horizontal: 'right' },
		});
	}, [enqueueSnackbar, text, variant]);

	useEffect(() => {
		setText(undefined);
	}, [setText]);

	return null;
};

export default Snackbar;
