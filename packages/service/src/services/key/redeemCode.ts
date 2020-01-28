import con from '../../middleware/mysql';

export default async (uuid: string, code: string): Promise<any> => {
  const query =
    'UPDATE `beta_keys` SET `used_by`=' +
    con.escape(uuid) +
    ' WHERE `beta_key`=' +
    con.escape(code) +
    ';';

  con.query(query);

  return { success: true, message: 'codeRedeemedSuccessfully' };
};
