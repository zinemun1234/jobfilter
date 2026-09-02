/**
 * 구조화 로거 (pino 기반, 서버/클라이언트 겸용)
 *
 * - 서버: production이면 JSON, 아니면 pino-pretty
 * - 클라이언트: console에 구조화 객체 출력
 * - 민감 정보(password, token, secret, email, userId, authorization) redact
 */

import pino from 'pino';

const isServer = typeof window === 'undefined';

const REDACT_CENSOR = '[REDACTED]';

const redactPaths = [
  'req.headers.authorization',
  'headers.authorization',
  'password',
  '*.password',
  'token',
  '*.token',
  'secret',
  '*.secret',
  'email',
  '*.email',
  'userId',
  '*.userId',
  'user.id',
  '*.user.id',
];

const level = isServer ? process.env.LOG_LEVEL || 'info' : 'info';

const logger = isServer
  ? pino({
      level,
      redact: {
        paths: redactPaths,
        censor: REDACT_CENSOR,
        remove: false,
      },
      serializers: {
        err: pino.stdSerializers.err,
      },
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
              },
            },
          }),
    })
  : pino({
      level,
      browser: {
        asObject: true,
        write: (o: object) => {
          if (typeof console === 'undefined') return;
          const record = o as Record<string, unknown>;
          const lvl = (record.level as number) ?? 30;
          // eslint-disable-next-line no-console
          if (lvl >= 50) console.error(o);
          // eslint-disable-next-line no-console
          else if (lvl >= 40) console.warn(o);
          // eslint-disable-next-line no-console
          else if (lvl >= 30) console.info(o);
          // eslint-disable-next-line no-console
          else if (lvl >= 20) console.debug(o);
          // eslint-disable-next-line no-console
          else console.trace(o);
        },
      },
      redact: {
        paths: redactPaths,
        censor: REDACT_CENSOR,
        remove: false,
      },
    });

export default logger;
