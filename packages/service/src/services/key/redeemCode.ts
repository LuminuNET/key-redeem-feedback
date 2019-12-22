import con from '../../middleware/mysql';
import minecraftApi from '../../middleware/minecraftApi';

export default async (uuid: string, code: string): Promise<any> => {
	const query =
		'UPDATE `beta_keys` SET `used_by`=' +
		con.escape(uuid) +
		' WHERE `beta_key`=' +
		con.escape(code) +
		';';

	con.query(query);

	console.log(uuid);
	console.log(code);

	return { success: true, message: 'codeRedeemedSuccessfully' };
};
