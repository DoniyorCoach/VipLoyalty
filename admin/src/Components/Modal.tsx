import { type FC } from 'react';
import { Stack, Modal as MuiModal, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { type IModalComponentProps } from 'Interfaces';
import 'Assets/Styles/Components/Modal.scss';

const Modal: FC<IModalComponentProps> = ({ open, onClose, children }) => {
	const handleClose = () => {
		onClose(false);
	};

	return (
		<MuiModal
			open={open}
			onClose={() => {
				onClose(false);
			}}
			hideBackdrop
			className="modal"
		>
			<Stack spacing={3} sx={{ width: { xs: '90%', md: '65%', xl: '45%' } }}>
				<IconButton onClick={handleClose} className="modal__btn" color="primary">
					<Close />
				</IconButton>
				{children}
			</Stack>
		</MuiModal>
	);
};

export default Modal;
