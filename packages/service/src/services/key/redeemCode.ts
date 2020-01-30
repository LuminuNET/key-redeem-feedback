import con from '../../middleware/mysql';
import { Redis } from '@luminu/core';
import { MysqlError } from 'mysql';

export default async (uuid: string, code: string): Promise<any> => {
  const query =
    'UPDATE `beta_keys` SET `used_by`=' +
    con.escape(uuid) +
    ' WHERE `beta_key`=' +
    con.escape(code) +
    ';';

  con.query(query, (err: MysqlError, result: any) => {
    if (!err) {
      Redis.getRedis().sadd('betalist', uuid);
    }
  });

  return { success: true, message: 'codeRedeemedSuccessfully' };
};
