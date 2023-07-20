import { type ChangeEvent, useEffect, useState, type FC } from 'react';
import { Button, Pagination, Stack, TextField, Typography } from '@mui/material';

import LoadingPage from 'Pages/LoadingPage';
import { Ceil, Modal, Snackbar } from 'Components';
import { createAddress, getAddresses } from 'Api/addresses';
import { type IAddress, type ISnackbar } from 'Interfaces';
import { ValidatorTexts, Validators } from 'Validators';
import 'Assets/Styles/Pages/AddressesPage.scss';
import UpdateAddressPage from './UpdateAddressPage';

const AddressesPage: FC = () => {
	const [addresses, setAddresses] = useState<IAddress[]>([]);
	const [name, setName] = useState('');
	const [validate, setValidate] = useState(true);
	const [open, setOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<IAddress>();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [reloadPage, setReloadPage] = useState(false);
	const [snackbar, setSnackbar] = useState<ISnackbar>();

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleUpdate = (address: IAddress) => {
		setSelectedAddress(address);
		setOpen(true);
	};

	const handlePage = (e: ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSubmit = async () => {
		if (!Validators({ address: name }).address) {
			setValidate(false);
			return;
		}

		setValidate(true);

		const { status, data } = await createAddress({ name });
		if (status !== 201) {
			setSnackbar({ text: data, variant: 'error' });
			return;
		}

		setSnackbar({ text: 'Успешно', variant: 'success' });
		setName('');
		setReloadPage(!reloadPage);
	};

	useEffect(() => {
		(async () => {
			const { status, data } = await getAddresses({ page: currentPage });

			if (status !== 200) {
				setSnackbar({ text: data as string, variant: 'error' });
				return;
			}

			if (typeof data === 'object' && 'addresses' in data) {
				setAddresses(data.addresses);
				setTotalPages(data.totalPages);
			}
		})();
	}, [reloadPage, currentPage]);

	return addresses ? (
		<Stack spacing={5} width={{ xs: '100%', md: '85%' }} className="addressesPage">
			<Stack spacing={2}>
				<TextField
					label="Адрес магазина"
					autoFocus
					required
					value={name}
					onChange={handleName}
					error={!validate}
					helperText={!validate && ValidatorTexts.address}
				/>
				<Button onClick={handleSubmit}>Добавить</Button>
			</Stack>
			<Stack spacing={2}>
				{addresses.map((address) => (
					<Ceil
						key={address.id}
						left={<Typography>{address.name}</Typography>}
						right={
							<Button
								variant="contained"
								color="secondary"
								onClick={() => {
									handleUpdate(address);
								}}
							>
								Изменить
							</Button>
						}
					/>
				))}
			</Stack>
			{addresses.length > 0 && (
				<Pagination
					shape="rounded"
					color="primary"
					variant="outlined"
					count={totalPages}
					page={currentPage}
					onChange={handlePage}
					siblingCount={0}
					boundaryCount={0}
					sx={{ ml: 'auto !important' }}
				/>
			)}
			{selectedAddress && (
				<Modal open={open} onClose={setOpen}>
					<UpdateAddressPage
						selectedAddress={selectedAddress}
						setReloadPage={setReloadPage}
						reloadPage={reloadPage}
					/>
				</Modal>
			)}
			{snackbar && (
				<Snackbar text={snackbar.text} variant={snackbar.variant} setText={setSnackbar} />
			)}
		</Stack>
	) : (
		<LoadingPage />
	);
};

export default AddressesPage;
