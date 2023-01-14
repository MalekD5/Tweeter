import { RowDataPacket } from 'mysql2';
import { pool, authTable, verifyTable } from '../MySQLConnection';
import { transport } from 'mailer';

interface VerifyResponse extends RowDataPacket {
  user_id: string;
}

const UPDATE_VERIFIED_STATUS = `
UPDATE ${authTable} SET verified='1' WHERE id=?
`;

const DELETE_VERFIY_TUPLE = `
DELETE FROM ${verifyTable} WHERE user_id=?
`;

const SELECT_TUPLE = `
  SELECT user_id FROM ${verifyTable} WHERE verifyCode=?
`;

const INSERT_VERIFY_CODE = `
  INSERT INTO ${verifyTable}(user_id, verifyCode) VALUES(?,?)
`;

export async function verifyEmail(verifyCode: string) {
  const connection = await pool.promise().getConnection();
  try {
    await connection.beginTransaction();
    const [responses] = await connection.execute<VerifyResponse[]>(
      SELECT_TUPLE,
      [verifyCode]
    );
    if (!responses || responses.length === 0) return false;
    const [{ user_id }] = responses;
    await Promise.all([
      connection.execute(UPDATE_VERIFIED_STATUS, [user_id]),
      connection.execute(DELETE_VERFIY_TUPLE, [user_id])
    ]);
    await connection.commit();
    return true;
  } catch (err: any) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export async function createVerifyCode(
  user_id: number,
  email: string,
  verifyCode: string
) {
  const connection = await pool.promise().getConnection();
  try {
    await connection.execute(INSERT_VERIFY_CODE, [user_id, verifyCode]);
    await connection.commit();
  } catch (err: any) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }

  await transport.sendMail({
    from: 'no-reply@tweeter.com',
    to: email,
    subject: 'verify your email',
    text: `https://localhost:5173/verify/${verifyCode}`
  });
}

export type { VerifyResponse };
