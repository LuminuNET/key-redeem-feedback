import con from '../../middleware/mysql';
import { MysqlError } from 'mysql';

export default async (amount: number): Promise<any> => {
	// create random strings
	let randomStrings: Array<string> = [];
	for (let i = 0; i < amount; i++) {
		randomStrings.push(
			Math.random()
				.toString(36)
				.slice(2, 10)
		);
	}

	// build query
	let query = 'INSERT INTO `beta_keys` (`beta_key`, `used_by`) VALUES ';
	randomStrings.forEach((element, index, array) => {
		let curQuery = `(${con.escape(element)}, '')`;
		if (index === array.length - 1) {
			curQuery += ';';
		} else {
			curQuery += ', ';
		}

		query += curQuery;
	});

	// send query to mysql db
	con.query(query, (err: MysqlError) => {
		if (err) {
			console.log('oops ' + err);
		}
	});

	return randomStrings;
};
