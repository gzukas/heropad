import {
  sql,
  ExpressionWrapper,
  type ReferenceExpression,
  type ExpressionBuilder
} from 'kysely';

export interface PqidsOptions {
  salt?: string;
}

const defaultOptions: PqidsOptions = {
  salt: process.env.HEROPAD_PQIDS_SALT
};

export interface Pqids<DB, TB extends keyof DB> {
  encode<T>(id: ReferenceExpression<DB, TB>): ExpressionWrapper<DB, TB, T>;
  decode<T>(id: string): ExpressionWrapper<DB, TB, T>;
}

export function pqids<DB, TB extends keyof DB>(
  eb: ExpressionBuilder<DB, TB>,
  options?: PqidsOptions
): Pqids<DB, TB> {
  const { salt } = { ...defaultOptions, ...options };
  return {
    encode: id =>
      eb.fn('id_encode', [id, salt && sql.lit(salt)].filter(Boolean)),
    decode: id =>
      eb.fn(
        'id_decode_once',
        [sql.lit(id), salt && sql.lit(salt)].filter(Boolean)
      )
  };
}
