import { type FC } from 'react';
import { SupportAgent } from '@mui/icons-material';
import { List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';

import { formatDate } from 'Helpers';
import { type IMessageComponentProps } from 'Interfaces';
import 'Assets/Styles/Components/Message.scss';

const Message: FC<IMessageComponentProps> = ({ text, date, owner, admin }) =>
	admin ? (
		<List sx={{ m: '10px 15px' }}>
			<ListItem>
				<ListItemAvatar sx={{ display: { xs: 'none', sm: 'inherit' } }}>
					<SupportAgent fontSize="large" color="primary" />
				</ListItemAvatar>
				<ListItemText
					disableTypography
					primary={
						<Typography variant="subtitle2" color="text.secondary" gutterBottom>
							Оператор
						</Typography>
					}
					secondary={
						<Paper className="message">
							<Typography>{text}</Typography>
							<Typography color="text.secondary" align="right">
								{formatDate(date)}
							</Typography>
						</Paper>
					}
				/>
			</ListItem>
		</List>
	) : (
		<Paper className="message" sx={{ alignSelf: owner ? 'end' : 'normal', m: '10px 15px' }}>
			<Typography gutterBottom>{text}</Typography>
			<Typography color="text.secondary" variant="body2" align="right">
				{formatDate(date)}
			</Typography>
		</Paper>
	);

export default Message;
