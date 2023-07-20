import axios from 'axios';

import { type IUploadPhotoProps, type IUploadPhoto } from 'Interfaces';

export const uploadPhoto = async ({ image }: IUploadPhotoProps) => {
	const formData = new FormData();
	formData.append('file', image);
	formData.append('upload_preset', 'zcifx93u');

	const response: IUploadPhoto = await axios.post(
		'https://api.cloudinary.com/v1_1/dhtzyrdrc/image/upload',
		formData,
	);

	return response.data;
};
