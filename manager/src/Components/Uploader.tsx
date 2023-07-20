import { type ChangeEvent, useState, type FC } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';

import { uploadPhoto } from 'Api/cloudinaryApi';
import { type IUploaderComponent, type IValidatorsResponse } from 'Interfaces';

import Validators from 'Validators/Validators';
import ValidatorTexts from 'Validators/ValidatorTexts';

import 'Assets/Styles/Components/Uploader.scss';

const Uploader: FC<IUploaderComponent> = ({ link, setLink }) => {
	const [imageLoading, setImageLoading] = useState(false);
	const [validate, setValidate] = useState<IValidatorsResponse>({});

	const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!Validators({ file }).file) {
			setValidate({ file: false });
			return;
		}

		setImageLoading(true);
		setValidate({});

		if (!file) {
			return;
		}

		const { url } = await uploadPhoto({ image: file });

		setLink(url);
		setImageLoading(false);
	};

	const handleCancel = () => {
		setLink('');
	};

	return (
		<Stack alignItems="center" className="uploader">
			{imageLoading ? (
				<CircularProgress />
			) : link ? (
				<Box
					sx={{
						backgroundImage: `url(${link})`,
					}}
					className="uploader__image"
				>
					<Button className="uploader__cancel" onClick={handleCancel}>
						x
					</Button>
				</Box>
			) : (
				<>
					<Button component="label">
						Выберите файл <input type="file" accept="image/*" onChange={handleFile} hidden />
					</Button>
					{validate.file === false && (
						<Typography variant="subtitle2" color="error">
							{ValidatorTexts.file}
						</Typography>
					)}
				</>
			)}
		</Stack>
	);
};

export default Uploader;
