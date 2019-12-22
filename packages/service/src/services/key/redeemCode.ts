import con from '../../middleware/mysql';
import minecraftApi from '../../middleware/minecraftApi';

export default async (username: string, code: string): Promise<any> => {
	// get uuid from player
	const uuid = ((await minecraftApi.get(username)) as any)['data']['uuid'];

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
