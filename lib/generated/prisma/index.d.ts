
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model JobPosting
 * 
 */
export type JobPosting = $Result.DefaultSelection<Prisma.$JobPostingPayload>
/**
 * Model StatusHistory
 * 
 */
export type StatusHistory = $Result.DefaultSelection<Prisma.$StatusHistoryPayload>
/**
 * Model RoadmapItem
 * 
 */
export type RoadmapItem = $Result.DefaultSelection<Prisma.$RoadmapItemPayload>
/**
 * Model InterviewQuestion
 * 
 */
export type InterviewQuestion = $Result.DefaultSelection<Prisma.$InterviewQuestionPayload>
/**
 * Model InterviewAnswer
 * 
 */
export type InterviewAnswer = $Result.DefaultSelection<Prisma.$InterviewAnswerPayload>
/**
 * Model CoverLetter
 * 
 */
export type CoverLetter = $Result.DefaultSelection<Prisma.$CoverLetterPayload>
/**
 * Model CoverLetterVersion
 * 
 */
export type CoverLetterVersion = $Result.DefaultSelection<Prisma.$CoverLetterVersionPayload>
/**
 * Model JobListing
 * 
 */
export type JobListing = $Result.DefaultSelection<Prisma.$JobListingPayload>
/**
 * Model JobBookmark
 * 
 */
export type JobBookmark = $Result.DefaultSelection<Prisma.$JobBookmarkPayload>
/**
 * Model EmploymentRecord
 * 
 */
export type EmploymentRecord = $Result.DefaultSelection<Prisma.$EmploymentRecordPayload>
/**
 * Model Notice
 * 
 */
export type Notice = $Result.DefaultSelection<Prisma.$NoticePayload>
/**
 * Model UserNotification
 * 
 */
export type UserNotification = $Result.DefaultSelection<Prisma.$UserNotificationPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs>;

  /**
   * `prisma.jobPosting`: Exposes CRUD operations for the **JobPosting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobPostings
    * const jobPostings = await prisma.jobPosting.findMany()
    * ```
    */
  get jobPosting(): Prisma.JobPostingDelegate<ExtArgs>;

  /**
   * `prisma.statusHistory`: Exposes CRUD operations for the **StatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StatusHistories
    * const statusHistories = await prisma.statusHistory.findMany()
    * ```
    */
  get statusHistory(): Prisma.StatusHistoryDelegate<ExtArgs>;

  /**
   * `prisma.roadmapItem`: Exposes CRUD operations for the **RoadmapItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoadmapItems
    * const roadmapItems = await prisma.roadmapItem.findMany()
    * ```
    */
  get roadmapItem(): Prisma.RoadmapItemDelegate<ExtArgs>;

  /**
   * `prisma.interviewQuestion`: Exposes CRUD operations for the **InterviewQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterviewQuestions
    * const interviewQuestions = await prisma.interviewQuestion.findMany()
    * ```
    */
  get interviewQuestion(): Prisma.InterviewQuestionDelegate<ExtArgs>;

  /**
   * `prisma.interviewAnswer`: Exposes CRUD operations for the **InterviewAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterviewAnswers
    * const interviewAnswers = await prisma.interviewAnswer.findMany()
    * ```
    */
  get interviewAnswer(): Prisma.InterviewAnswerDelegate<ExtArgs>;

  /**
   * `prisma.coverLetter`: Exposes CRUD operations for the **CoverLetter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoverLetters
    * const coverLetters = await prisma.coverLetter.findMany()
    * ```
    */
  get coverLetter(): Prisma.CoverLetterDelegate<ExtArgs>;

  /**
   * `prisma.coverLetterVersion`: Exposes CRUD operations for the **CoverLetterVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoverLetterVersions
    * const coverLetterVersions = await prisma.coverLetterVersion.findMany()
    * ```
    */
  get coverLetterVersion(): Prisma.CoverLetterVersionDelegate<ExtArgs>;

  /**
   * `prisma.jobListing`: Exposes CRUD operations for the **JobListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobListings
    * const jobListings = await prisma.jobListing.findMany()
    * ```
    */
  get jobListing(): Prisma.JobListingDelegate<ExtArgs>;

  /**
   * `prisma.jobBookmark`: Exposes CRUD operations for the **JobBookmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobBookmarks
    * const jobBookmarks = await prisma.jobBookmark.findMany()
    * ```
    */
  get jobBookmark(): Prisma.JobBookmarkDelegate<ExtArgs>;

  /**
   * `prisma.employmentRecord`: Exposes CRUD operations for the **EmploymentRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmploymentRecords
    * const employmentRecords = await prisma.employmentRecord.findMany()
    * ```
    */
  get employmentRecord(): Prisma.EmploymentRecordDelegate<ExtArgs>;

  /**
   * `prisma.notice`: Exposes CRUD operations for the **Notice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notices
    * const notices = await prisma.notice.findMany()
    * ```
    */
  get notice(): Prisma.NoticeDelegate<ExtArgs>;

  /**
   * `prisma.userNotification`: Exposes CRUD operations for the **UserNotification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserNotifications
    * const userNotifications = await prisma.userNotification.findMany()
    * ```
    */
  get userNotification(): Prisma.UserNotificationDelegate<ExtArgs>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Portfolio: 'Portfolio',
    JobPosting: 'JobPosting',
    StatusHistory: 'StatusHistory',
    RoadmapItem: 'RoadmapItem',
    InterviewQuestion: 'InterviewQuestion',
    InterviewAnswer: 'InterviewAnswer',
    CoverLetter: 'CoverLetter',
    CoverLetterVersion: 'CoverLetterVersion',
    JobListing: 'JobListing',
    JobBookmark: 'JobBookmark',
    EmploymentRecord: 'EmploymentRecord',
    Notice: 'Notice',
    UserNotification: 'UserNotification',
    PasswordResetToken: 'PasswordResetToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "portfolio" | "jobPosting" | "statusHistory" | "roadmapItem" | "interviewQuestion" | "interviewAnswer" | "coverLetter" | "coverLetterVersion" | "jobListing" | "jobBookmark" | "employmentRecord" | "notice" | "userNotification" | "passwordResetToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
      JobPosting: {
        payload: Prisma.$JobPostingPayload<ExtArgs>
        fields: Prisma.JobPostingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobPostingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobPostingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findFirst: {
            args: Prisma.JobPostingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobPostingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findMany: {
            args: Prisma.JobPostingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          create: {
            args: Prisma.JobPostingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          createMany: {
            args: Prisma.JobPostingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobPostingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          delete: {
            args: Prisma.JobPostingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          update: {
            args: Prisma.JobPostingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          deleteMany: {
            args: Prisma.JobPostingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobPostingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobPostingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          aggregate: {
            args: Prisma.JobPostingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobPosting>
          }
          groupBy: {
            args: Prisma.JobPostingGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobPostingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobPostingCountArgs<ExtArgs>
            result: $Utils.Optional<JobPostingCountAggregateOutputType> | number
          }
        }
      }
      StatusHistory: {
        payload: Prisma.$StatusHistoryPayload<ExtArgs>
        fields: Prisma.StatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.StatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>
          }
          findMany: {
            args: Prisma.StatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>[]
          }
          create: {
            args: Prisma.StatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>
          }
          createMany: {
            args: Prisma.StatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.StatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>
          }
          update: {
            args: Prisma.StatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.StatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.StatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatusHistory>
          }
          groupBy: {
            args: Prisma.StatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<StatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      RoadmapItem: {
        payload: Prisma.$RoadmapItemPayload<ExtArgs>
        fields: Prisma.RoadmapItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoadmapItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>
          }
          findFirst: {
            args: Prisma.RoadmapItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>
          }
          findMany: {
            args: Prisma.RoadmapItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>[]
          }
          create: {
            args: Prisma.RoadmapItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>
          }
          createMany: {
            args: Prisma.RoadmapItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoadmapItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>[]
          }
          delete: {
            args: Prisma.RoadmapItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>
          }
          update: {
            args: Prisma.RoadmapItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>
          }
          deleteMany: {
            args: Prisma.RoadmapItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoadmapItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapItemPayload>
          }
          aggregate: {
            args: Prisma.RoadmapItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoadmapItem>
          }
          groupBy: {
            args: Prisma.RoadmapItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoadmapItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapItemCountArgs<ExtArgs>
            result: $Utils.Optional<RoadmapItemCountAggregateOutputType> | number
          }
        }
      }
      InterviewQuestion: {
        payload: Prisma.$InterviewQuestionPayload<ExtArgs>
        fields: Prisma.InterviewQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          findFirst: {
            args: Prisma.InterviewQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          findMany: {
            args: Prisma.InterviewQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>[]
          }
          create: {
            args: Prisma.InterviewQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          createMany: {
            args: Prisma.InterviewQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>[]
          }
          delete: {
            args: Prisma.InterviewQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          update: {
            args: Prisma.InterviewQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          deleteMany: {
            args: Prisma.InterviewQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InterviewQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          aggregate: {
            args: Prisma.InterviewQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterviewQuestion>
          }
          groupBy: {
            args: Prisma.InterviewQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewQuestionCountAggregateOutputType> | number
          }
        }
      }
      InterviewAnswer: {
        payload: Prisma.$InterviewAnswerPayload<ExtArgs>
        fields: Prisma.InterviewAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>
          }
          findFirst: {
            args: Prisma.InterviewAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>
          }
          findMany: {
            args: Prisma.InterviewAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>[]
          }
          create: {
            args: Prisma.InterviewAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>
          }
          createMany: {
            args: Prisma.InterviewAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>[]
          }
          delete: {
            args: Prisma.InterviewAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>
          }
          update: {
            args: Prisma.InterviewAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>
          }
          deleteMany: {
            args: Prisma.InterviewAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InterviewAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewAnswerPayload>
          }
          aggregate: {
            args: Prisma.InterviewAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterviewAnswer>
          }
          groupBy: {
            args: Prisma.InterviewAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewAnswerCountAggregateOutputType> | number
          }
        }
      }
      CoverLetter: {
        payload: Prisma.$CoverLetterPayload<ExtArgs>
        fields: Prisma.CoverLetterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoverLetterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoverLetterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>
          }
          findFirst: {
            args: Prisma.CoverLetterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoverLetterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>
          }
          findMany: {
            args: Prisma.CoverLetterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>[]
          }
          create: {
            args: Prisma.CoverLetterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>
          }
          createMany: {
            args: Prisma.CoverLetterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoverLetterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>[]
          }
          delete: {
            args: Prisma.CoverLetterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>
          }
          update: {
            args: Prisma.CoverLetterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>
          }
          deleteMany: {
            args: Prisma.CoverLetterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoverLetterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CoverLetterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterPayload>
          }
          aggregate: {
            args: Prisma.CoverLetterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoverLetter>
          }
          groupBy: {
            args: Prisma.CoverLetterGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoverLetterGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoverLetterCountArgs<ExtArgs>
            result: $Utils.Optional<CoverLetterCountAggregateOutputType> | number
          }
        }
      }
      CoverLetterVersion: {
        payload: Prisma.$CoverLetterVersionPayload<ExtArgs>
        fields: Prisma.CoverLetterVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoverLetterVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoverLetterVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>
          }
          findFirst: {
            args: Prisma.CoverLetterVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoverLetterVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>
          }
          findMany: {
            args: Prisma.CoverLetterVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>[]
          }
          create: {
            args: Prisma.CoverLetterVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>
          }
          createMany: {
            args: Prisma.CoverLetterVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoverLetterVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>[]
          }
          delete: {
            args: Prisma.CoverLetterVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>
          }
          update: {
            args: Prisma.CoverLetterVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>
          }
          deleteMany: {
            args: Prisma.CoverLetterVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoverLetterVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CoverLetterVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoverLetterVersionPayload>
          }
          aggregate: {
            args: Prisma.CoverLetterVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoverLetterVersion>
          }
          groupBy: {
            args: Prisma.CoverLetterVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoverLetterVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoverLetterVersionCountArgs<ExtArgs>
            result: $Utils.Optional<CoverLetterVersionCountAggregateOutputType> | number
          }
        }
      }
      JobListing: {
        payload: Prisma.$JobListingPayload<ExtArgs>
        fields: Prisma.JobListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          findFirst: {
            args: Prisma.JobListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          findMany: {
            args: Prisma.JobListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>[]
          }
          create: {
            args: Prisma.JobListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          createMany: {
            args: Prisma.JobListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>[]
          }
          delete: {
            args: Prisma.JobListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          update: {
            args: Prisma.JobListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          deleteMany: {
            args: Prisma.JobListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          aggregate: {
            args: Prisma.JobListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobListing>
          }
          groupBy: {
            args: Prisma.JobListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobListingCountArgs<ExtArgs>
            result: $Utils.Optional<JobListingCountAggregateOutputType> | number
          }
        }
      }
      JobBookmark: {
        payload: Prisma.$JobBookmarkPayload<ExtArgs>
        fields: Prisma.JobBookmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobBookmarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobBookmarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>
          }
          findFirst: {
            args: Prisma.JobBookmarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobBookmarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>
          }
          findMany: {
            args: Prisma.JobBookmarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>[]
          }
          create: {
            args: Prisma.JobBookmarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>
          }
          createMany: {
            args: Prisma.JobBookmarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobBookmarkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>[]
          }
          delete: {
            args: Prisma.JobBookmarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>
          }
          update: {
            args: Prisma.JobBookmarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>
          }
          deleteMany: {
            args: Prisma.JobBookmarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobBookmarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobBookmarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobBookmarkPayload>
          }
          aggregate: {
            args: Prisma.JobBookmarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobBookmark>
          }
          groupBy: {
            args: Prisma.JobBookmarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobBookmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobBookmarkCountArgs<ExtArgs>
            result: $Utils.Optional<JobBookmarkCountAggregateOutputType> | number
          }
        }
      }
      EmploymentRecord: {
        payload: Prisma.$EmploymentRecordPayload<ExtArgs>
        fields: Prisma.EmploymentRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmploymentRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmploymentRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>
          }
          findFirst: {
            args: Prisma.EmploymentRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmploymentRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>
          }
          findMany: {
            args: Prisma.EmploymentRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>[]
          }
          create: {
            args: Prisma.EmploymentRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>
          }
          createMany: {
            args: Prisma.EmploymentRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmploymentRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>[]
          }
          delete: {
            args: Prisma.EmploymentRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>
          }
          update: {
            args: Prisma.EmploymentRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>
          }
          deleteMany: {
            args: Prisma.EmploymentRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmploymentRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmploymentRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentRecordPayload>
          }
          aggregate: {
            args: Prisma.EmploymentRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmploymentRecord>
          }
          groupBy: {
            args: Prisma.EmploymentRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmploymentRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmploymentRecordCountArgs<ExtArgs>
            result: $Utils.Optional<EmploymentRecordCountAggregateOutputType> | number
          }
        }
      }
      Notice: {
        payload: Prisma.$NoticePayload<ExtArgs>
        fields: Prisma.NoticeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoticeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoticeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findFirst: {
            args: Prisma.NoticeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoticeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findMany: {
            args: Prisma.NoticeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          create: {
            args: Prisma.NoticeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          createMany: {
            args: Prisma.NoticeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoticeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          delete: {
            args: Prisma.NoticeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          update: {
            args: Prisma.NoticeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          deleteMany: {
            args: Prisma.NoticeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoticeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NoticeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          aggregate: {
            args: Prisma.NoticeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotice>
          }
          groupBy: {
            args: Prisma.NoticeGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoticeGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoticeCountArgs<ExtArgs>
            result: $Utils.Optional<NoticeCountAggregateOutputType> | number
          }
        }
      }
      UserNotification: {
        payload: Prisma.$UserNotificationPayload<ExtArgs>
        fields: Prisma.UserNotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserNotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserNotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>
          }
          findFirst: {
            args: Prisma.UserNotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserNotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>
          }
          findMany: {
            args: Prisma.UserNotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>[]
          }
          create: {
            args: Prisma.UserNotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>
          }
          createMany: {
            args: Prisma.UserNotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserNotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>[]
          }
          delete: {
            args: Prisma.UserNotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>
          }
          update: {
            args: Prisma.UserNotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>
          }
          deleteMany: {
            args: Prisma.UserNotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserNotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserNotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPayload>
          }
          aggregate: {
            args: Prisma.UserNotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserNotification>
          }
          groupBy: {
            args: Prisma.UserNotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserNotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserNotificationCountArgs<ExtArgs>
            result: $Utils.Optional<UserNotificationCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    portfolios: number
    jobPostings: number
    roadmapItems: number
    interviewAnswers: number
    customQuestions: number
    coverLetters: number
    notifications: number
    bookmarks: number
    recruitListings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolios?: boolean | UserCountOutputTypeCountPortfoliosArgs
    jobPostings?: boolean | UserCountOutputTypeCountJobPostingsArgs
    roadmapItems?: boolean | UserCountOutputTypeCountRoadmapItemsArgs
    interviewAnswers?: boolean | UserCountOutputTypeCountInterviewAnswersArgs
    customQuestions?: boolean | UserCountOutputTypeCountCustomQuestionsArgs
    coverLetters?: boolean | UserCountOutputTypeCountCoverLettersArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    bookmarks?: boolean | UserCountOutputTypeCountBookmarksArgs
    recruitListings?: boolean | UserCountOutputTypeCountRecruitListingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobPostingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoadmapItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInterviewAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewAnswerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCustomQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewQuestionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCoverLettersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoverLetterWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserNotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobBookmarkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecruitListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobListingWhereInput
  }


  /**
   * Count Type JobPostingCountOutputType
   */

  export type JobPostingCountOutputType = {
    statusHistory: number
    coverLetters: number
  }

  export type JobPostingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | JobPostingCountOutputTypeCountStatusHistoryArgs
    coverLetters?: boolean | JobPostingCountOutputTypeCountCoverLettersArgs
  }

  // Custom InputTypes
  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPostingCountOutputType
     */
    select?: JobPostingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusHistoryWhereInput
  }

  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeCountCoverLettersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoverLetterWhereInput
  }


  /**
   * Count Type InterviewQuestionCountOutputType
   */

  export type InterviewQuestionCountOutputType = {
    answers: number
  }

  export type InterviewQuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | InterviewQuestionCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * InterviewQuestionCountOutputType without action
   */
  export type InterviewQuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestionCountOutputType
     */
    select?: InterviewQuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InterviewQuestionCountOutputType without action
   */
  export type InterviewQuestionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewAnswerWhereInput
  }


  /**
   * Count Type CoverLetterCountOutputType
   */

  export type CoverLetterCountOutputType = {
    versions: number
  }

  export type CoverLetterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | CoverLetterCountOutputTypeCountVersionsArgs
  }

  // Custom InputTypes
  /**
   * CoverLetterCountOutputType without action
   */
  export type CoverLetterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterCountOutputType
     */
    select?: CoverLetterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CoverLetterCountOutputType without action
   */
  export type CoverLetterCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoverLetterVersionWhereInput
  }


  /**
   * Count Type JobListingCountOutputType
   */

  export type JobListingCountOutputType = {
    bookmarks: number
  }

  export type JobListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookmarks?: boolean | JobListingCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * JobListingCountOutputType without action
   */
  export type JobListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListingCountOutputType
     */
    select?: JobListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobListingCountOutputType without action
   */
  export type JobListingCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobBookmarkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    major: string | null
    targetJob: string | null
    skills: string | null
    role: string | null
    companyName: string | null
    companyDesc: string | null
    isApproved: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    major: string | null
    targetJob: string | null
    skills: string | null
    role: string | null
    companyName: string | null
    companyDesc: string | null
    isApproved: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    major: number
    targetJob: number
    skills: number
    role: number
    companyName: number
    companyDesc: number
    isApproved: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    major?: true
    targetJob?: true
    skills?: true
    role?: true
    companyName?: true
    companyDesc?: true
    isApproved?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    major?: true
    targetJob?: true
    skills?: true
    role?: true
    companyName?: true
    companyDesc?: true
    isApproved?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    major?: true
    targetJob?: true
    skills?: true
    role?: true
    companyName?: true
    companyDesc?: true
    isApproved?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    major: string | null
    targetJob: string | null
    skills: string
    role: string
    companyName: string | null
    companyDesc: string | null
    isApproved: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    major?: boolean
    targetJob?: boolean
    skills?: boolean
    role?: boolean
    companyName?: boolean
    companyDesc?: boolean
    isApproved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolios?: boolean | User$portfoliosArgs<ExtArgs>
    jobPostings?: boolean | User$jobPostingsArgs<ExtArgs>
    roadmapItems?: boolean | User$roadmapItemsArgs<ExtArgs>
    interviewAnswers?: boolean | User$interviewAnswersArgs<ExtArgs>
    customQuestions?: boolean | User$customQuestionsArgs<ExtArgs>
    coverLetters?: boolean | User$coverLettersArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    recruitListings?: boolean | User$recruitListingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    major?: boolean
    targetJob?: boolean
    skills?: boolean
    role?: boolean
    companyName?: boolean
    companyDesc?: boolean
    isApproved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    major?: boolean
    targetJob?: boolean
    skills?: boolean
    role?: boolean
    companyName?: boolean
    companyDesc?: boolean
    isApproved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolios?: boolean | User$portfoliosArgs<ExtArgs>
    jobPostings?: boolean | User$jobPostingsArgs<ExtArgs>
    roadmapItems?: boolean | User$roadmapItemsArgs<ExtArgs>
    interviewAnswers?: boolean | User$interviewAnswersArgs<ExtArgs>
    customQuestions?: boolean | User$customQuestionsArgs<ExtArgs>
    coverLetters?: boolean | User$coverLettersArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    recruitListings?: boolean | User$recruitListingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
      jobPostings: Prisma.$JobPostingPayload<ExtArgs>[]
      roadmapItems: Prisma.$RoadmapItemPayload<ExtArgs>[]
      interviewAnswers: Prisma.$InterviewAnswerPayload<ExtArgs>[]
      customQuestions: Prisma.$InterviewQuestionPayload<ExtArgs>[]
      coverLetters: Prisma.$CoverLetterPayload<ExtArgs>[]
      notifications: Prisma.$UserNotificationPayload<ExtArgs>[]
      bookmarks: Prisma.$JobBookmarkPayload<ExtArgs>[]
      recruitListings: Prisma.$JobListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      major: string | null
      targetJob: string | null
      skills: string
      role: string
      companyName: string | null
      companyDesc: string | null
      isApproved: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolios<T extends User$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, User$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany"> | Null>
    jobPostings<T extends User$jobPostingsArgs<ExtArgs> = {}>(args?: Subset<T, User$jobPostingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findMany"> | Null>
    roadmapItems<T extends User$roadmapItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$roadmapItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "findMany"> | Null>
    interviewAnswers<T extends User$interviewAnswersArgs<ExtArgs> = {}>(args?: Subset<T, User$interviewAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "findMany"> | Null>
    customQuestions<T extends User$customQuestionsArgs<ExtArgs> = {}>(args?: Subset<T, User$customQuestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findMany"> | Null>
    coverLetters<T extends User$coverLettersArgs<ExtArgs> = {}>(args?: Subset<T, User$coverLettersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "findMany"> | Null>
    bookmarks<T extends User$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, User$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "findMany"> | Null>
    recruitListings<T extends User$recruitListingsArgs<ExtArgs> = {}>(args?: Subset<T, User$recruitListingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly major: FieldRef<"User", 'String'>
    readonly targetJob: FieldRef<"User", 'String'>
    readonly skills: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly companyName: FieldRef<"User", 'String'>
    readonly companyDesc: FieldRef<"User", 'String'>
    readonly isApproved: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.portfolios
   */
  export type User$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * User.jobPostings
   */
  export type User$jobPostingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    where?: JobPostingWhereInput
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    cursor?: JobPostingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * User.roadmapItems
   */
  export type User$roadmapItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    where?: RoadmapItemWhereInput
    orderBy?: RoadmapItemOrderByWithRelationInput | RoadmapItemOrderByWithRelationInput[]
    cursor?: RoadmapItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoadmapItemScalarFieldEnum | RoadmapItemScalarFieldEnum[]
  }

  /**
   * User.interviewAnswers
   */
  export type User$interviewAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    where?: InterviewAnswerWhereInput
    orderBy?: InterviewAnswerOrderByWithRelationInput | InterviewAnswerOrderByWithRelationInput[]
    cursor?: InterviewAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewAnswerScalarFieldEnum | InterviewAnswerScalarFieldEnum[]
  }

  /**
   * User.customQuestions
   */
  export type User$customQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    where?: InterviewQuestionWhereInput
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    cursor?: InterviewQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * User.coverLetters
   */
  export type User$coverLettersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    where?: CoverLetterWhereInput
    orderBy?: CoverLetterOrderByWithRelationInput | CoverLetterOrderByWithRelationInput[]
    cursor?: CoverLetterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CoverLetterScalarFieldEnum | CoverLetterScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    where?: UserNotificationWhereInput
    orderBy?: UserNotificationOrderByWithRelationInput | UserNotificationOrderByWithRelationInput[]
    cursor?: UserNotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserNotificationScalarFieldEnum | UserNotificationScalarFieldEnum[]
  }

  /**
   * User.bookmarks
   */
  export type User$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    where?: JobBookmarkWhereInput
    orderBy?: JobBookmarkOrderByWithRelationInput | JobBookmarkOrderByWithRelationInput[]
    cursor?: JobBookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobBookmarkScalarFieldEnum | JobBookmarkScalarFieldEnum[]
  }

  /**
   * User.recruitListings
   */
  export type User$recruitListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    where?: JobListingWhereInput
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    cursor?: JobListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    techStack: string | null
    startDate: Date | null
    endDate: Date | null
    githubUrl: string | null
    deployUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    techStack: string | null
    startDate: Date | null
    endDate: Date | null
    githubUrl: string | null
    deployUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    techStack: number
    startDate: number
    endDate: number
    githubUrl: number
    deployUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortfolioMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    techStack?: true
    startDate?: true
    endDate?: true
    githubUrl?: true
    deployUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    techStack?: true
    startDate?: true
    endDate?: true
    githubUrl?: true
    deployUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    techStack?: true
    startDate?: true
    endDate?: true
    githubUrl?: true
    deployUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string
    techStack: string
    startDate: Date
    endDate: Date | null
    githubUrl: string | null
    deployUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    techStack?: boolean
    startDate?: boolean
    endDate?: boolean
    githubUrl?: boolean
    deployUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    techStack?: boolean
    startDate?: boolean
    endDate?: boolean
    githubUrl?: boolean
    deployUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    techStack?: boolean
    startDate?: boolean
    endDate?: boolean
    githubUrl?: boolean
    deployUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string
      techStack: string
      startDate: Date
      endDate: Date | null
      githubUrl: string | null
      deployUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portfolios and returns the data saved in the database.
     * @param {PortfolioCreateManyAndReturnArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio model
   */ 
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly userId: FieldRef<"Portfolio", 'String'>
    readonly title: FieldRef<"Portfolio", 'String'>
    readonly description: FieldRef<"Portfolio", 'String'>
    readonly techStack: FieldRef<"Portfolio", 'String'>
    readonly startDate: FieldRef<"Portfolio", 'DateTime'>
    readonly endDate: FieldRef<"Portfolio", 'DateTime'>
    readonly githubUrl: FieldRef<"Portfolio", 'String'>
    readonly deployUrl: FieldRef<"Portfolio", 'String'>
    readonly createdAt: FieldRef<"Portfolio", 'DateTime'>
    readonly updatedAt: FieldRef<"Portfolio", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Portfolio createManyAndReturn
   */
  export type PortfolioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Model JobPosting
   */

  export type AggregateJobPosting = {
    _count: JobPostingCountAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  export type JobPostingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    company: string | null
    position: string | null
    url: string | null
    deadline: Date | null
    interviewAt: Date | null
    status: string | null
    contacts: string | null
    followUpAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobPostingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    company: string | null
    position: string | null
    url: string | null
    deadline: Date | null
    interviewAt: Date | null
    status: string | null
    contacts: string | null
    followUpAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobPostingCountAggregateOutputType = {
    id: number
    userId: number
    company: number
    position: number
    url: number
    deadline: number
    interviewAt: number
    status: number
    contacts: number
    followUpAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobPostingMinAggregateInputType = {
    id?: true
    userId?: true
    company?: true
    position?: true
    url?: true
    deadline?: true
    interviewAt?: true
    status?: true
    contacts?: true
    followUpAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobPostingMaxAggregateInputType = {
    id?: true
    userId?: true
    company?: true
    position?: true
    url?: true
    deadline?: true
    interviewAt?: true
    status?: true
    contacts?: true
    followUpAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobPostingCountAggregateInputType = {
    id?: true
    userId?: true
    company?: true
    position?: true
    url?: true
    deadline?: true
    interviewAt?: true
    status?: true
    contacts?: true
    followUpAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobPostingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPosting to aggregate.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobPostings
    **/
    _count?: true | JobPostingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobPostingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobPostingMaxAggregateInputType
  }

  export type GetJobPostingAggregateType<T extends JobPostingAggregateArgs> = {
        [P in keyof T & keyof AggregateJobPosting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobPosting[P]>
      : GetScalarType<T[P], AggregateJobPosting[P]>
  }




  export type JobPostingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostingWhereInput
    orderBy?: JobPostingOrderByWithAggregationInput | JobPostingOrderByWithAggregationInput[]
    by: JobPostingScalarFieldEnum[] | JobPostingScalarFieldEnum
    having?: JobPostingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobPostingCountAggregateInputType | true
    _min?: JobPostingMinAggregateInputType
    _max?: JobPostingMaxAggregateInputType
  }

  export type JobPostingGroupByOutputType = {
    id: string
    userId: string
    company: string
    position: string
    url: string | null
    deadline: Date | null
    interviewAt: Date | null
    status: string
    contacts: string | null
    followUpAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: JobPostingCountAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  type GetJobPostingGroupByPayload<T extends JobPostingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobPostingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobPostingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
            : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
        }
      >
    >


  export type JobPostingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    company?: boolean
    position?: boolean
    url?: boolean
    deadline?: boolean
    interviewAt?: boolean
    status?: boolean
    contacts?: boolean
    followUpAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    statusHistory?: boolean | JobPosting$statusHistoryArgs<ExtArgs>
    coverLetters?: boolean | JobPosting$coverLettersArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    company?: boolean
    position?: boolean
    url?: boolean
    deadline?: boolean
    interviewAt?: boolean
    status?: boolean
    contacts?: boolean
    followUpAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectScalar = {
    id?: boolean
    userId?: boolean
    company?: boolean
    position?: boolean
    url?: boolean
    deadline?: boolean
    interviewAt?: boolean
    status?: boolean
    contacts?: boolean
    followUpAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobPostingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    statusHistory?: boolean | JobPosting$statusHistoryArgs<ExtArgs>
    coverLetters?: boolean | JobPosting$coverLettersArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobPostingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JobPostingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobPosting"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      statusHistory: Prisma.$StatusHistoryPayload<ExtArgs>[]
      coverLetters: Prisma.$CoverLetterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      company: string
      position: string
      url: string | null
      deadline: Date | null
      interviewAt: Date | null
      status: string
      contacts: string | null
      followUpAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobPosting"]>
    composites: {}
  }

  type JobPostingGetPayload<S extends boolean | null | undefined | JobPostingDefaultArgs> = $Result.GetResult<Prisma.$JobPostingPayload, S>

  type JobPostingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobPostingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobPostingCountAggregateInputType | true
    }

  export interface JobPostingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobPosting'], meta: { name: 'JobPosting' } }
    /**
     * Find zero or one JobPosting that matches the filter.
     * @param {JobPostingFindUniqueArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobPostingFindUniqueArgs>(args: SelectSubset<T, JobPostingFindUniqueArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobPosting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobPostingFindUniqueOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobPostingFindUniqueOrThrowArgs>(args: SelectSubset<T, JobPostingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobPosting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobPostingFindFirstArgs>(args?: SelectSubset<T, JobPostingFindFirstArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobPosting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobPostingFindFirstOrThrowArgs>(args?: SelectSubset<T, JobPostingFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobPostings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobPostings
     * const jobPostings = await prisma.jobPosting.findMany()
     * 
     * // Get first 10 JobPostings
     * const jobPostings = await prisma.jobPosting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobPostingFindManyArgs>(args?: SelectSubset<T, JobPostingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobPosting.
     * @param {JobPostingCreateArgs} args - Arguments to create a JobPosting.
     * @example
     * // Create one JobPosting
     * const JobPosting = await prisma.jobPosting.create({
     *   data: {
     *     // ... data to create a JobPosting
     *   }
     * })
     * 
     */
    create<T extends JobPostingCreateArgs>(args: SelectSubset<T, JobPostingCreateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobPostings.
     * @param {JobPostingCreateManyArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobPostingCreateManyArgs>(args?: SelectSubset<T, JobPostingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobPostings and returns the data saved in the database.
     * @param {JobPostingCreateManyAndReturnArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobPostings and only return the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobPostingCreateManyAndReturnArgs>(args?: SelectSubset<T, JobPostingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobPosting.
     * @param {JobPostingDeleteArgs} args - Arguments to delete one JobPosting.
     * @example
     * // Delete one JobPosting
     * const JobPosting = await prisma.jobPosting.delete({
     *   where: {
     *     // ... filter to delete one JobPosting
     *   }
     * })
     * 
     */
    delete<T extends JobPostingDeleteArgs>(args: SelectSubset<T, JobPostingDeleteArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobPosting.
     * @param {JobPostingUpdateArgs} args - Arguments to update one JobPosting.
     * @example
     * // Update one JobPosting
     * const jobPosting = await prisma.jobPosting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobPostingUpdateArgs>(args: SelectSubset<T, JobPostingUpdateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobPostings.
     * @param {JobPostingDeleteManyArgs} args - Arguments to filter JobPostings to delete.
     * @example
     * // Delete a few JobPostings
     * const { count } = await prisma.jobPosting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobPostingDeleteManyArgs>(args?: SelectSubset<T, JobPostingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobPostings
     * const jobPosting = await prisma.jobPosting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobPostingUpdateManyArgs>(args: SelectSubset<T, JobPostingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobPosting.
     * @param {JobPostingUpsertArgs} args - Arguments to update or create a JobPosting.
     * @example
     * // Update or create a JobPosting
     * const jobPosting = await prisma.jobPosting.upsert({
     *   create: {
     *     // ... data to create a JobPosting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobPosting we want to update
     *   }
     * })
     */
    upsert<T extends JobPostingUpsertArgs>(args: SelectSubset<T, JobPostingUpsertArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingCountArgs} args - Arguments to filter JobPostings to count.
     * @example
     * // Count the number of JobPostings
     * const count = await prisma.jobPosting.count({
     *   where: {
     *     // ... the filter for the JobPostings we want to count
     *   }
     * })
    **/
    count<T extends JobPostingCountArgs>(
      args?: Subset<T, JobPostingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobPostingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobPostingAggregateArgs>(args: Subset<T, JobPostingAggregateArgs>): Prisma.PrismaPromise<GetJobPostingAggregateType<T>>

    /**
     * Group by JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobPostingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobPostingGroupByArgs['orderBy'] }
        : { orderBy?: JobPostingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobPostingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobPostingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobPosting model
   */
  readonly fields: JobPostingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobPosting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobPostingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    statusHistory<T extends JobPosting$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    coverLetters<T extends JobPosting$coverLettersArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$coverLettersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobPosting model
   */ 
  interface JobPostingFieldRefs {
    readonly id: FieldRef<"JobPosting", 'String'>
    readonly userId: FieldRef<"JobPosting", 'String'>
    readonly company: FieldRef<"JobPosting", 'String'>
    readonly position: FieldRef<"JobPosting", 'String'>
    readonly url: FieldRef<"JobPosting", 'String'>
    readonly deadline: FieldRef<"JobPosting", 'DateTime'>
    readonly interviewAt: FieldRef<"JobPosting", 'DateTime'>
    readonly status: FieldRef<"JobPosting", 'String'>
    readonly contacts: FieldRef<"JobPosting", 'String'>
    readonly followUpAt: FieldRef<"JobPosting", 'DateTime'>
    readonly createdAt: FieldRef<"JobPosting", 'DateTime'>
    readonly updatedAt: FieldRef<"JobPosting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobPosting findUnique
   */
  export type JobPostingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findUniqueOrThrow
   */
  export type JobPostingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findFirst
   */
  export type JobPostingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findFirstOrThrow
   */
  export type JobPostingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findMany
   */
  export type JobPostingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPostings to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting create
   */
  export type JobPostingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to create a JobPosting.
     */
    data: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
  }

  /**
   * JobPosting createMany
   */
  export type JobPostingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobPosting createManyAndReturn
   */
  export type JobPostingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobPosting update
   */
  export type JobPostingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to update a JobPosting.
     */
    data: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
    /**
     * Choose, which JobPosting to update.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting updateMany
   */
  export type JobPostingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobPostings.
     */
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyInput>
    /**
     * Filter which JobPostings to update
     */
    where?: JobPostingWhereInput
  }

  /**
   * JobPosting upsert
   */
  export type JobPostingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The filter to search for the JobPosting to update in case it exists.
     */
    where: JobPostingWhereUniqueInput
    /**
     * In case the JobPosting found by the `where` argument doesn't exist, create a new JobPosting with this data.
     */
    create: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
    /**
     * In case the JobPosting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
  }

  /**
   * JobPosting delete
   */
  export type JobPostingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter which JobPosting to delete.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting deleteMany
   */
  export type JobPostingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPostings to delete
     */
    where?: JobPostingWhereInput
  }

  /**
   * JobPosting.statusHistory
   */
  export type JobPosting$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    where?: StatusHistoryWhereInput
    orderBy?: StatusHistoryOrderByWithRelationInput | StatusHistoryOrderByWithRelationInput[]
    cursor?: StatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatusHistoryScalarFieldEnum | StatusHistoryScalarFieldEnum[]
  }

  /**
   * JobPosting.coverLetters
   */
  export type JobPosting$coverLettersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    where?: CoverLetterWhereInput
    orderBy?: CoverLetterOrderByWithRelationInput | CoverLetterOrderByWithRelationInput[]
    cursor?: CoverLetterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CoverLetterScalarFieldEnum | CoverLetterScalarFieldEnum[]
  }

  /**
   * JobPosting without action
   */
  export type JobPostingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
  }


  /**
   * Model StatusHistory
   */

  export type AggregateStatusHistory = {
    _count: StatusHistoryCountAggregateOutputType | null
    _min: StatusHistoryMinAggregateOutputType | null
    _max: StatusHistoryMaxAggregateOutputType | null
  }

  export type StatusHistoryMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    status: string | null
    changedAt: Date | null
    note: string | null
  }

  export type StatusHistoryMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    status: string | null
    changedAt: Date | null
    note: string | null
  }

  export type StatusHistoryCountAggregateOutputType = {
    id: number
    jobId: number
    status: number
    changedAt: number
    note: number
    _all: number
  }


  export type StatusHistoryMinAggregateInputType = {
    id?: true
    jobId?: true
    status?: true
    changedAt?: true
    note?: true
  }

  export type StatusHistoryMaxAggregateInputType = {
    id?: true
    jobId?: true
    status?: true
    changedAt?: true
    note?: true
  }

  export type StatusHistoryCountAggregateInputType = {
    id?: true
    jobId?: true
    status?: true
    changedAt?: true
    note?: true
    _all?: true
  }

  export type StatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusHistory to aggregate.
     */
    where?: StatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusHistories to fetch.
     */
    orderBy?: StatusHistoryOrderByWithRelationInput | StatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StatusHistories
    **/
    _count?: true | StatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatusHistoryMaxAggregateInputType
  }

  export type GetStatusHistoryAggregateType<T extends StatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatusHistory[P]>
      : GetScalarType<T[P], AggregateStatusHistory[P]>
  }




  export type StatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusHistoryWhereInput
    orderBy?: StatusHistoryOrderByWithAggregationInput | StatusHistoryOrderByWithAggregationInput[]
    by: StatusHistoryScalarFieldEnum[] | StatusHistoryScalarFieldEnum
    having?: StatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatusHistoryCountAggregateInputType | true
    _min?: StatusHistoryMinAggregateInputType
    _max?: StatusHistoryMaxAggregateInputType
  }

  export type StatusHistoryGroupByOutputType = {
    id: string
    jobId: string
    status: string
    changedAt: Date
    note: string | null
    _count: StatusHistoryCountAggregateOutputType | null
    _min: StatusHistoryMinAggregateOutputType | null
    _max: StatusHistoryMaxAggregateOutputType | null
  }

  type GetStatusHistoryGroupByPayload<T extends StatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], StatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type StatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    status?: boolean
    changedAt?: boolean
    note?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusHistory"]>

  export type StatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    status?: boolean
    changedAt?: boolean
    note?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusHistory"]>

  export type StatusHistorySelectScalar = {
    id?: boolean
    jobId?: boolean
    status?: boolean
    changedAt?: boolean
    note?: boolean
  }

  export type StatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type StatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }

  export type $StatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StatusHistory"
    objects: {
      job: Prisma.$JobPostingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      status: string
      changedAt: Date
      note: string | null
    }, ExtArgs["result"]["statusHistory"]>
    composites: {}
  }

  type StatusHistoryGetPayload<S extends boolean | null | undefined | StatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$StatusHistoryPayload, S>

  type StatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StatusHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StatusHistoryCountAggregateInputType | true
    }

  export interface StatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StatusHistory'], meta: { name: 'StatusHistory' } }
    /**
     * Find zero or one StatusHistory that matches the filter.
     * @param {StatusHistoryFindUniqueArgs} args - Arguments to find a StatusHistory
     * @example
     * // Get one StatusHistory
     * const statusHistory = await prisma.statusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatusHistoryFindUniqueArgs>(args: SelectSubset<T, StatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StatusHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a StatusHistory
     * @example
     * // Get one StatusHistory
     * const statusHistory = await prisma.statusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, StatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusHistoryFindFirstArgs} args - Arguments to find a StatusHistory
     * @example
     * // Get one StatusHistory
     * const statusHistory = await prisma.statusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatusHistoryFindFirstArgs>(args?: SelectSubset<T, StatusHistoryFindFirstArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusHistoryFindFirstOrThrowArgs} args - Arguments to find a StatusHistory
     * @example
     * // Get one StatusHistory
     * const statusHistory = await prisma.statusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, StatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StatusHistories
     * const statusHistories = await prisma.statusHistory.findMany()
     * 
     * // Get first 10 StatusHistories
     * const statusHistories = await prisma.statusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statusHistoryWithIdOnly = await prisma.statusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatusHistoryFindManyArgs>(args?: SelectSubset<T, StatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StatusHistory.
     * @param {StatusHistoryCreateArgs} args - Arguments to create a StatusHistory.
     * @example
     * // Create one StatusHistory
     * const StatusHistory = await prisma.statusHistory.create({
     *   data: {
     *     // ... data to create a StatusHistory
     *   }
     * })
     * 
     */
    create<T extends StatusHistoryCreateArgs>(args: SelectSubset<T, StatusHistoryCreateArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StatusHistories.
     * @param {StatusHistoryCreateManyArgs} args - Arguments to create many StatusHistories.
     * @example
     * // Create many StatusHistories
     * const statusHistory = await prisma.statusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatusHistoryCreateManyArgs>(args?: SelectSubset<T, StatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StatusHistories and returns the data saved in the database.
     * @param {StatusHistoryCreateManyAndReturnArgs} args - Arguments to create many StatusHistories.
     * @example
     * // Create many StatusHistories
     * const statusHistory = await prisma.statusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StatusHistories and only return the `id`
     * const statusHistoryWithIdOnly = await prisma.statusHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, StatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StatusHistory.
     * @param {StatusHistoryDeleteArgs} args - Arguments to delete one StatusHistory.
     * @example
     * // Delete one StatusHistory
     * const StatusHistory = await prisma.statusHistory.delete({
     *   where: {
     *     // ... filter to delete one StatusHistory
     *   }
     * })
     * 
     */
    delete<T extends StatusHistoryDeleteArgs>(args: SelectSubset<T, StatusHistoryDeleteArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StatusHistory.
     * @param {StatusHistoryUpdateArgs} args - Arguments to update one StatusHistory.
     * @example
     * // Update one StatusHistory
     * const statusHistory = await prisma.statusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatusHistoryUpdateArgs>(args: SelectSubset<T, StatusHistoryUpdateArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StatusHistories.
     * @param {StatusHistoryDeleteManyArgs} args - Arguments to filter StatusHistories to delete.
     * @example
     * // Delete a few StatusHistories
     * const { count } = await prisma.statusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatusHistoryDeleteManyArgs>(args?: SelectSubset<T, StatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StatusHistories
     * const statusHistory = await prisma.statusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatusHistoryUpdateManyArgs>(args: SelectSubset<T, StatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StatusHistory.
     * @param {StatusHistoryUpsertArgs} args - Arguments to update or create a StatusHistory.
     * @example
     * // Update or create a StatusHistory
     * const statusHistory = await prisma.statusHistory.upsert({
     *   create: {
     *     // ... data to create a StatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends StatusHistoryUpsertArgs>(args: SelectSubset<T, StatusHistoryUpsertArgs<ExtArgs>>): Prisma__StatusHistoryClient<$Result.GetResult<Prisma.$StatusHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusHistoryCountArgs} args - Arguments to filter StatusHistories to count.
     * @example
     * // Count the number of StatusHistories
     * const count = await prisma.statusHistory.count({
     *   where: {
     *     // ... the filter for the StatusHistories we want to count
     *   }
     * })
    **/
    count<T extends StatusHistoryCountArgs>(
      args?: Subset<T, StatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatusHistoryAggregateArgs>(args: Subset<T, StatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetStatusHistoryAggregateType<T>>

    /**
     * Group by StatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: StatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StatusHistory model
   */
  readonly fields: StatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobPostingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostingDefaultArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StatusHistory model
   */ 
  interface StatusHistoryFieldRefs {
    readonly id: FieldRef<"StatusHistory", 'String'>
    readonly jobId: FieldRef<"StatusHistory", 'String'>
    readonly status: FieldRef<"StatusHistory", 'String'>
    readonly changedAt: FieldRef<"StatusHistory", 'DateTime'>
    readonly note: FieldRef<"StatusHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StatusHistory findUnique
   */
  export type StatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which StatusHistory to fetch.
     */
    where: StatusHistoryWhereUniqueInput
  }

  /**
   * StatusHistory findUniqueOrThrow
   */
  export type StatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which StatusHistory to fetch.
     */
    where: StatusHistoryWhereUniqueInput
  }

  /**
   * StatusHistory findFirst
   */
  export type StatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which StatusHistory to fetch.
     */
    where?: StatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusHistories to fetch.
     */
    orderBy?: StatusHistoryOrderByWithRelationInput | StatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusHistories.
     */
    cursor?: StatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusHistories.
     */
    distinct?: StatusHistoryScalarFieldEnum | StatusHistoryScalarFieldEnum[]
  }

  /**
   * StatusHistory findFirstOrThrow
   */
  export type StatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which StatusHistory to fetch.
     */
    where?: StatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusHistories to fetch.
     */
    orderBy?: StatusHistoryOrderByWithRelationInput | StatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusHistories.
     */
    cursor?: StatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusHistories.
     */
    distinct?: StatusHistoryScalarFieldEnum | StatusHistoryScalarFieldEnum[]
  }

  /**
   * StatusHistory findMany
   */
  export type StatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which StatusHistories to fetch.
     */
    where?: StatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusHistories to fetch.
     */
    orderBy?: StatusHistoryOrderByWithRelationInput | StatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StatusHistories.
     */
    cursor?: StatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusHistories.
     */
    skip?: number
    distinct?: StatusHistoryScalarFieldEnum | StatusHistoryScalarFieldEnum[]
  }

  /**
   * StatusHistory create
   */
  export type StatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a StatusHistory.
     */
    data: XOR<StatusHistoryCreateInput, StatusHistoryUncheckedCreateInput>
  }

  /**
   * StatusHistory createMany
   */
  export type StatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StatusHistories.
     */
    data: StatusHistoryCreateManyInput | StatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StatusHistory createManyAndReturn
   */
  export type StatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StatusHistories.
     */
    data: StatusHistoryCreateManyInput | StatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StatusHistory update
   */
  export type StatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a StatusHistory.
     */
    data: XOR<StatusHistoryUpdateInput, StatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which StatusHistory to update.
     */
    where: StatusHistoryWhereUniqueInput
  }

  /**
   * StatusHistory updateMany
   */
  export type StatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StatusHistories.
     */
    data: XOR<StatusHistoryUpdateManyMutationInput, StatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which StatusHistories to update
     */
    where?: StatusHistoryWhereInput
  }

  /**
   * StatusHistory upsert
   */
  export type StatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the StatusHistory to update in case it exists.
     */
    where: StatusHistoryWhereUniqueInput
    /**
     * In case the StatusHistory found by the `where` argument doesn't exist, create a new StatusHistory with this data.
     */
    create: XOR<StatusHistoryCreateInput, StatusHistoryUncheckedCreateInput>
    /**
     * In case the StatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatusHistoryUpdateInput, StatusHistoryUncheckedUpdateInput>
  }

  /**
   * StatusHistory delete
   */
  export type StatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which StatusHistory to delete.
     */
    where: StatusHistoryWhereUniqueInput
  }

  /**
   * StatusHistory deleteMany
   */
  export type StatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusHistories to delete
     */
    where?: StatusHistoryWhereInput
  }

  /**
   * StatusHistory without action
   */
  export type StatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusHistory
     */
    select?: StatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model RoadmapItem
   */

  export type AggregateRoadmapItem = {
    _count: RoadmapItemCountAggregateOutputType | null
    _avg: RoadmapItemAvgAggregateOutputType | null
    _sum: RoadmapItemSumAggregateOutputType | null
    _min: RoadmapItemMinAggregateOutputType | null
    _max: RoadmapItemMaxAggregateOutputType | null
  }

  export type RoadmapItemAvgAggregateOutputType = {
    order: number | null
  }

  export type RoadmapItemSumAggregateOutputType = {
    order: number | null
  }

  export type RoadmapItemMinAggregateOutputType = {
    id: string | null
    userId: string | null
    jobCategory: string | null
    skill: string | null
    status: string | null
    referenceLinks: string | null
    isCustom: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoadmapItemMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    jobCategory: string | null
    skill: string | null
    status: string | null
    referenceLinks: string | null
    isCustom: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoadmapItemCountAggregateOutputType = {
    id: number
    userId: number
    jobCategory: number
    skill: number
    status: number
    referenceLinks: number
    isCustom: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoadmapItemAvgAggregateInputType = {
    order?: true
  }

  export type RoadmapItemSumAggregateInputType = {
    order?: true
  }

  export type RoadmapItemMinAggregateInputType = {
    id?: true
    userId?: true
    jobCategory?: true
    skill?: true
    status?: true
    referenceLinks?: true
    isCustom?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoadmapItemMaxAggregateInputType = {
    id?: true
    userId?: true
    jobCategory?: true
    skill?: true
    status?: true
    referenceLinks?: true
    isCustom?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoadmapItemCountAggregateInputType = {
    id?: true
    userId?: true
    jobCategory?: true
    skill?: true
    status?: true
    referenceLinks?: true
    isCustom?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoadmapItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapItem to aggregate.
     */
    where?: RoadmapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapItems to fetch.
     */
    orderBy?: RoadmapItemOrderByWithRelationInput | RoadmapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoadmapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoadmapItems
    **/
    _count?: true | RoadmapItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoadmapItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoadmapItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoadmapItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoadmapItemMaxAggregateInputType
  }

  export type GetRoadmapItemAggregateType<T extends RoadmapItemAggregateArgs> = {
        [P in keyof T & keyof AggregateRoadmapItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoadmapItem[P]>
      : GetScalarType<T[P], AggregateRoadmapItem[P]>
  }




  export type RoadmapItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapItemWhereInput
    orderBy?: RoadmapItemOrderByWithAggregationInput | RoadmapItemOrderByWithAggregationInput[]
    by: RoadmapItemScalarFieldEnum[] | RoadmapItemScalarFieldEnum
    having?: RoadmapItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoadmapItemCountAggregateInputType | true
    _avg?: RoadmapItemAvgAggregateInputType
    _sum?: RoadmapItemSumAggregateInputType
    _min?: RoadmapItemMinAggregateInputType
    _max?: RoadmapItemMaxAggregateInputType
  }

  export type RoadmapItemGroupByOutputType = {
    id: string
    userId: string
    jobCategory: string
    skill: string
    status: string
    referenceLinks: string
    isCustom: boolean
    order: number
    createdAt: Date
    updatedAt: Date
    _count: RoadmapItemCountAggregateOutputType | null
    _avg: RoadmapItemAvgAggregateOutputType | null
    _sum: RoadmapItemSumAggregateOutputType | null
    _min: RoadmapItemMinAggregateOutputType | null
    _max: RoadmapItemMaxAggregateOutputType | null
  }

  type GetRoadmapItemGroupByPayload<T extends RoadmapItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoadmapItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapItemGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapItemGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobCategory?: boolean
    skill?: boolean
    status?: boolean
    referenceLinks?: boolean
    isCustom?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapItem"]>

  export type RoadmapItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobCategory?: boolean
    skill?: boolean
    status?: boolean
    referenceLinks?: boolean
    isCustom?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapItem"]>

  export type RoadmapItemSelectScalar = {
    id?: boolean
    userId?: boolean
    jobCategory?: boolean
    skill?: boolean
    status?: boolean
    referenceLinks?: boolean
    isCustom?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoadmapItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoadmapItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoadmapItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoadmapItem"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      jobCategory: string
      skill: string
      status: string
      referenceLinks: string
      isCustom: boolean
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roadmapItem"]>
    composites: {}
  }

  type RoadmapItemGetPayload<S extends boolean | null | undefined | RoadmapItemDefaultArgs> = $Result.GetResult<Prisma.$RoadmapItemPayload, S>

  type RoadmapItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoadmapItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoadmapItemCountAggregateInputType | true
    }

  export interface RoadmapItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoadmapItem'], meta: { name: 'RoadmapItem' } }
    /**
     * Find zero or one RoadmapItem that matches the filter.
     * @param {RoadmapItemFindUniqueArgs} args - Arguments to find a RoadmapItem
     * @example
     * // Get one RoadmapItem
     * const roadmapItem = await prisma.roadmapItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoadmapItemFindUniqueArgs>(args: SelectSubset<T, RoadmapItemFindUniqueArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoadmapItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoadmapItemFindUniqueOrThrowArgs} args - Arguments to find a RoadmapItem
     * @example
     * // Get one RoadmapItem
     * const roadmapItem = await prisma.roadmapItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoadmapItemFindUniqueOrThrowArgs>(args: SelectSubset<T, RoadmapItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoadmapItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapItemFindFirstArgs} args - Arguments to find a RoadmapItem
     * @example
     * // Get one RoadmapItem
     * const roadmapItem = await prisma.roadmapItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoadmapItemFindFirstArgs>(args?: SelectSubset<T, RoadmapItemFindFirstArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoadmapItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapItemFindFirstOrThrowArgs} args - Arguments to find a RoadmapItem
     * @example
     * // Get one RoadmapItem
     * const roadmapItem = await prisma.roadmapItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoadmapItemFindFirstOrThrowArgs>(args?: SelectSubset<T, RoadmapItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoadmapItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoadmapItems
     * const roadmapItems = await prisma.roadmapItem.findMany()
     * 
     * // Get first 10 RoadmapItems
     * const roadmapItems = await prisma.roadmapItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roadmapItemWithIdOnly = await prisma.roadmapItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoadmapItemFindManyArgs>(args?: SelectSubset<T, RoadmapItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoadmapItem.
     * @param {RoadmapItemCreateArgs} args - Arguments to create a RoadmapItem.
     * @example
     * // Create one RoadmapItem
     * const RoadmapItem = await prisma.roadmapItem.create({
     *   data: {
     *     // ... data to create a RoadmapItem
     *   }
     * })
     * 
     */
    create<T extends RoadmapItemCreateArgs>(args: SelectSubset<T, RoadmapItemCreateArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoadmapItems.
     * @param {RoadmapItemCreateManyArgs} args - Arguments to create many RoadmapItems.
     * @example
     * // Create many RoadmapItems
     * const roadmapItem = await prisma.roadmapItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoadmapItemCreateManyArgs>(args?: SelectSubset<T, RoadmapItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoadmapItems and returns the data saved in the database.
     * @param {RoadmapItemCreateManyAndReturnArgs} args - Arguments to create many RoadmapItems.
     * @example
     * // Create many RoadmapItems
     * const roadmapItem = await prisma.roadmapItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoadmapItems and only return the `id`
     * const roadmapItemWithIdOnly = await prisma.roadmapItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoadmapItemCreateManyAndReturnArgs>(args?: SelectSubset<T, RoadmapItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoadmapItem.
     * @param {RoadmapItemDeleteArgs} args - Arguments to delete one RoadmapItem.
     * @example
     * // Delete one RoadmapItem
     * const RoadmapItem = await prisma.roadmapItem.delete({
     *   where: {
     *     // ... filter to delete one RoadmapItem
     *   }
     * })
     * 
     */
    delete<T extends RoadmapItemDeleteArgs>(args: SelectSubset<T, RoadmapItemDeleteArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoadmapItem.
     * @param {RoadmapItemUpdateArgs} args - Arguments to update one RoadmapItem.
     * @example
     * // Update one RoadmapItem
     * const roadmapItem = await prisma.roadmapItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoadmapItemUpdateArgs>(args: SelectSubset<T, RoadmapItemUpdateArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoadmapItems.
     * @param {RoadmapItemDeleteManyArgs} args - Arguments to filter RoadmapItems to delete.
     * @example
     * // Delete a few RoadmapItems
     * const { count } = await prisma.roadmapItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoadmapItemDeleteManyArgs>(args?: SelectSubset<T, RoadmapItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoadmapItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoadmapItems
     * const roadmapItem = await prisma.roadmapItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoadmapItemUpdateManyArgs>(args: SelectSubset<T, RoadmapItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoadmapItem.
     * @param {RoadmapItemUpsertArgs} args - Arguments to update or create a RoadmapItem.
     * @example
     * // Update or create a RoadmapItem
     * const roadmapItem = await prisma.roadmapItem.upsert({
     *   create: {
     *     // ... data to create a RoadmapItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoadmapItem we want to update
     *   }
     * })
     */
    upsert<T extends RoadmapItemUpsertArgs>(args: SelectSubset<T, RoadmapItemUpsertArgs<ExtArgs>>): Prisma__RoadmapItemClient<$Result.GetResult<Prisma.$RoadmapItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoadmapItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapItemCountArgs} args - Arguments to filter RoadmapItems to count.
     * @example
     * // Count the number of RoadmapItems
     * const count = await prisma.roadmapItem.count({
     *   where: {
     *     // ... the filter for the RoadmapItems we want to count
     *   }
     * })
    **/
    count<T extends RoadmapItemCountArgs>(
      args?: Subset<T, RoadmapItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoadmapItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoadmapItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoadmapItemAggregateArgs>(args: Subset<T, RoadmapItemAggregateArgs>): Prisma.PrismaPromise<GetRoadmapItemAggregateType<T>>

    /**
     * Group by RoadmapItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoadmapItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoadmapItemGroupByArgs['orderBy'] }
        : { orderBy?: RoadmapItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoadmapItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoadmapItem model
   */
  readonly fields: RoadmapItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoadmapItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoadmapItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoadmapItem model
   */ 
  interface RoadmapItemFieldRefs {
    readonly id: FieldRef<"RoadmapItem", 'String'>
    readonly userId: FieldRef<"RoadmapItem", 'String'>
    readonly jobCategory: FieldRef<"RoadmapItem", 'String'>
    readonly skill: FieldRef<"RoadmapItem", 'String'>
    readonly status: FieldRef<"RoadmapItem", 'String'>
    readonly referenceLinks: FieldRef<"RoadmapItem", 'String'>
    readonly isCustom: FieldRef<"RoadmapItem", 'Boolean'>
    readonly order: FieldRef<"RoadmapItem", 'Int'>
    readonly createdAt: FieldRef<"RoadmapItem", 'DateTime'>
    readonly updatedAt: FieldRef<"RoadmapItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoadmapItem findUnique
   */
  export type RoadmapItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapItem to fetch.
     */
    where: RoadmapItemWhereUniqueInput
  }

  /**
   * RoadmapItem findUniqueOrThrow
   */
  export type RoadmapItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapItem to fetch.
     */
    where: RoadmapItemWhereUniqueInput
  }

  /**
   * RoadmapItem findFirst
   */
  export type RoadmapItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapItem to fetch.
     */
    where?: RoadmapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapItems to fetch.
     */
    orderBy?: RoadmapItemOrderByWithRelationInput | RoadmapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapItems.
     */
    cursor?: RoadmapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapItems.
     */
    distinct?: RoadmapItemScalarFieldEnum | RoadmapItemScalarFieldEnum[]
  }

  /**
   * RoadmapItem findFirstOrThrow
   */
  export type RoadmapItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapItem to fetch.
     */
    where?: RoadmapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapItems to fetch.
     */
    orderBy?: RoadmapItemOrderByWithRelationInput | RoadmapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapItems.
     */
    cursor?: RoadmapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapItems.
     */
    distinct?: RoadmapItemScalarFieldEnum | RoadmapItemScalarFieldEnum[]
  }

  /**
   * RoadmapItem findMany
   */
  export type RoadmapItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapItems to fetch.
     */
    where?: RoadmapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapItems to fetch.
     */
    orderBy?: RoadmapItemOrderByWithRelationInput | RoadmapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoadmapItems.
     */
    cursor?: RoadmapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapItems.
     */
    skip?: number
    distinct?: RoadmapItemScalarFieldEnum | RoadmapItemScalarFieldEnum[]
  }

  /**
   * RoadmapItem create
   */
  export type RoadmapItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * The data needed to create a RoadmapItem.
     */
    data: XOR<RoadmapItemCreateInput, RoadmapItemUncheckedCreateInput>
  }

  /**
   * RoadmapItem createMany
   */
  export type RoadmapItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoadmapItems.
     */
    data: RoadmapItemCreateManyInput | RoadmapItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoadmapItem createManyAndReturn
   */
  export type RoadmapItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoadmapItems.
     */
    data: RoadmapItemCreateManyInput | RoadmapItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoadmapItem update
   */
  export type RoadmapItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * The data needed to update a RoadmapItem.
     */
    data: XOR<RoadmapItemUpdateInput, RoadmapItemUncheckedUpdateInput>
    /**
     * Choose, which RoadmapItem to update.
     */
    where: RoadmapItemWhereUniqueInput
  }

  /**
   * RoadmapItem updateMany
   */
  export type RoadmapItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoadmapItems.
     */
    data: XOR<RoadmapItemUpdateManyMutationInput, RoadmapItemUncheckedUpdateManyInput>
    /**
     * Filter which RoadmapItems to update
     */
    where?: RoadmapItemWhereInput
  }

  /**
   * RoadmapItem upsert
   */
  export type RoadmapItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * The filter to search for the RoadmapItem to update in case it exists.
     */
    where: RoadmapItemWhereUniqueInput
    /**
     * In case the RoadmapItem found by the `where` argument doesn't exist, create a new RoadmapItem with this data.
     */
    create: XOR<RoadmapItemCreateInput, RoadmapItemUncheckedCreateInput>
    /**
     * In case the RoadmapItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoadmapItemUpdateInput, RoadmapItemUncheckedUpdateInput>
  }

  /**
   * RoadmapItem delete
   */
  export type RoadmapItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
    /**
     * Filter which RoadmapItem to delete.
     */
    where: RoadmapItemWhereUniqueInput
  }

  /**
   * RoadmapItem deleteMany
   */
  export type RoadmapItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapItems to delete
     */
    where?: RoadmapItemWhereInput
  }

  /**
   * RoadmapItem without action
   */
  export type RoadmapItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapItem
     */
    select?: RoadmapItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapItemInclude<ExtArgs> | null
  }


  /**
   * Model InterviewQuestion
   */

  export type AggregateInterviewQuestion = {
    _count: InterviewQuestionCountAggregateOutputType | null
    _min: InterviewQuestionMinAggregateOutputType | null
    _max: InterviewQuestionMaxAggregateOutputType | null
  }

  export type InterviewQuestionMinAggregateOutputType = {
    id: string | null
    category: string | null
    jobType: string | null
    question: string | null
    isDefault: boolean | null
    userId: string | null
  }

  export type InterviewQuestionMaxAggregateOutputType = {
    id: string | null
    category: string | null
    jobType: string | null
    question: string | null
    isDefault: boolean | null
    userId: string | null
  }

  export type InterviewQuestionCountAggregateOutputType = {
    id: number
    category: number
    jobType: number
    question: number
    isDefault: number
    userId: number
    _all: number
  }


  export type InterviewQuestionMinAggregateInputType = {
    id?: true
    category?: true
    jobType?: true
    question?: true
    isDefault?: true
    userId?: true
  }

  export type InterviewQuestionMaxAggregateInputType = {
    id?: true
    category?: true
    jobType?: true
    question?: true
    isDefault?: true
    userId?: true
  }

  export type InterviewQuestionCountAggregateInputType = {
    id?: true
    category?: true
    jobType?: true
    question?: true
    isDefault?: true
    userId?: true
    _all?: true
  }

  export type InterviewQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewQuestion to aggregate.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterviewQuestions
    **/
    _count?: true | InterviewQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewQuestionMaxAggregateInputType
  }

  export type GetInterviewQuestionAggregateType<T extends InterviewQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateInterviewQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterviewQuestion[P]>
      : GetScalarType<T[P], AggregateInterviewQuestion[P]>
  }




  export type InterviewQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewQuestionWhereInput
    orderBy?: InterviewQuestionOrderByWithAggregationInput | InterviewQuestionOrderByWithAggregationInput[]
    by: InterviewQuestionScalarFieldEnum[] | InterviewQuestionScalarFieldEnum
    having?: InterviewQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewQuestionCountAggregateInputType | true
    _min?: InterviewQuestionMinAggregateInputType
    _max?: InterviewQuestionMaxAggregateInputType
  }

  export type InterviewQuestionGroupByOutputType = {
    id: string
    category: string
    jobType: string | null
    question: string
    isDefault: boolean
    userId: string | null
    _count: InterviewQuestionCountAggregateOutputType | null
    _min: InterviewQuestionMinAggregateOutputType | null
    _max: InterviewQuestionMaxAggregateOutputType | null
  }

  type GetInterviewQuestionGroupByPayload<T extends InterviewQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewQuestionGroupByOutputType[P]>
        }
      >
    >


  export type InterviewQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    jobType?: boolean
    question?: boolean
    isDefault?: boolean
    userId?: boolean
    user?: boolean | InterviewQuestion$userArgs<ExtArgs>
    answers?: boolean | InterviewQuestion$answersArgs<ExtArgs>
    _count?: boolean | InterviewQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewQuestion"]>

  export type InterviewQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    jobType?: boolean
    question?: boolean
    isDefault?: boolean
    userId?: boolean
    user?: boolean | InterviewQuestion$userArgs<ExtArgs>
  }, ExtArgs["result"]["interviewQuestion"]>

  export type InterviewQuestionSelectScalar = {
    id?: boolean
    category?: boolean
    jobType?: boolean
    question?: boolean
    isDefault?: boolean
    userId?: boolean
  }

  export type InterviewQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | InterviewQuestion$userArgs<ExtArgs>
    answers?: boolean | InterviewQuestion$answersArgs<ExtArgs>
    _count?: boolean | InterviewQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InterviewQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | InterviewQuestion$userArgs<ExtArgs>
  }

  export type $InterviewQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterviewQuestion"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      answers: Prisma.$InterviewAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: string
      jobType: string | null
      question: string
      isDefault: boolean
      userId: string | null
    }, ExtArgs["result"]["interviewQuestion"]>
    composites: {}
  }

  type InterviewQuestionGetPayload<S extends boolean | null | undefined | InterviewQuestionDefaultArgs> = $Result.GetResult<Prisma.$InterviewQuestionPayload, S>

  type InterviewQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InterviewQuestionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InterviewQuestionCountAggregateInputType | true
    }

  export interface InterviewQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterviewQuestion'], meta: { name: 'InterviewQuestion' } }
    /**
     * Find zero or one InterviewQuestion that matches the filter.
     * @param {InterviewQuestionFindUniqueArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewQuestionFindUniqueArgs>(args: SelectSubset<T, InterviewQuestionFindUniqueArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InterviewQuestion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InterviewQuestionFindUniqueOrThrowArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InterviewQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindFirstArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewQuestionFindFirstArgs>(args?: SelectSubset<T, InterviewQuestionFindFirstArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InterviewQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindFirstOrThrowArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InterviewQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterviewQuestions
     * const interviewQuestions = await prisma.interviewQuestion.findMany()
     * 
     * // Get first 10 InterviewQuestions
     * const interviewQuestions = await prisma.interviewQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewQuestionWithIdOnly = await prisma.interviewQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewQuestionFindManyArgs>(args?: SelectSubset<T, InterviewQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InterviewQuestion.
     * @param {InterviewQuestionCreateArgs} args - Arguments to create a InterviewQuestion.
     * @example
     * // Create one InterviewQuestion
     * const InterviewQuestion = await prisma.interviewQuestion.create({
     *   data: {
     *     // ... data to create a InterviewQuestion
     *   }
     * })
     * 
     */
    create<T extends InterviewQuestionCreateArgs>(args: SelectSubset<T, InterviewQuestionCreateArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InterviewQuestions.
     * @param {InterviewQuestionCreateManyArgs} args - Arguments to create many InterviewQuestions.
     * @example
     * // Create many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewQuestionCreateManyArgs>(args?: SelectSubset<T, InterviewQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterviewQuestions and returns the data saved in the database.
     * @param {InterviewQuestionCreateManyAndReturnArgs} args - Arguments to create many InterviewQuestions.
     * @example
     * // Create many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterviewQuestions and only return the `id`
     * const interviewQuestionWithIdOnly = await prisma.interviewQuestion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InterviewQuestion.
     * @param {InterviewQuestionDeleteArgs} args - Arguments to delete one InterviewQuestion.
     * @example
     * // Delete one InterviewQuestion
     * const InterviewQuestion = await prisma.interviewQuestion.delete({
     *   where: {
     *     // ... filter to delete one InterviewQuestion
     *   }
     * })
     * 
     */
    delete<T extends InterviewQuestionDeleteArgs>(args: SelectSubset<T, InterviewQuestionDeleteArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InterviewQuestion.
     * @param {InterviewQuestionUpdateArgs} args - Arguments to update one InterviewQuestion.
     * @example
     * // Update one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewQuestionUpdateArgs>(args: SelectSubset<T, InterviewQuestionUpdateArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InterviewQuestions.
     * @param {InterviewQuestionDeleteManyArgs} args - Arguments to filter InterviewQuestions to delete.
     * @example
     * // Delete a few InterviewQuestions
     * const { count } = await prisma.interviewQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewQuestionDeleteManyArgs>(args?: SelectSubset<T, InterviewQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewQuestionUpdateManyArgs>(args: SelectSubset<T, InterviewQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InterviewQuestion.
     * @param {InterviewQuestionUpsertArgs} args - Arguments to update or create a InterviewQuestion.
     * @example
     * // Update or create a InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.upsert({
     *   create: {
     *     // ... data to create a InterviewQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterviewQuestion we want to update
     *   }
     * })
     */
    upsert<T extends InterviewQuestionUpsertArgs>(args: SelectSubset<T, InterviewQuestionUpsertArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InterviewQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionCountArgs} args - Arguments to filter InterviewQuestions to count.
     * @example
     * // Count the number of InterviewQuestions
     * const count = await prisma.interviewQuestion.count({
     *   where: {
     *     // ... the filter for the InterviewQuestions we want to count
     *   }
     * })
    **/
    count<T extends InterviewQuestionCountArgs>(
      args?: Subset<T, InterviewQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterviewQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewQuestionAggregateArgs>(args: Subset<T, InterviewQuestionAggregateArgs>): Prisma.PrismaPromise<GetInterviewQuestionAggregateType<T>>

    /**
     * Group by InterviewQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewQuestionGroupByArgs['orderBy'] }
        : { orderBy?: InterviewQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterviewQuestion model
   */
  readonly fields: InterviewQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterviewQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends InterviewQuestion$userArgs<ExtArgs> = {}>(args?: Subset<T, InterviewQuestion$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    answers<T extends InterviewQuestion$answersArgs<ExtArgs> = {}>(args?: Subset<T, InterviewQuestion$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterviewQuestion model
   */ 
  interface InterviewQuestionFieldRefs {
    readonly id: FieldRef<"InterviewQuestion", 'String'>
    readonly category: FieldRef<"InterviewQuestion", 'String'>
    readonly jobType: FieldRef<"InterviewQuestion", 'String'>
    readonly question: FieldRef<"InterviewQuestion", 'String'>
    readonly isDefault: FieldRef<"InterviewQuestion", 'Boolean'>
    readonly userId: FieldRef<"InterviewQuestion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * InterviewQuestion findUnique
   */
  export type InterviewQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion findUniqueOrThrow
   */
  export type InterviewQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion findFirst
   */
  export type InterviewQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewQuestions.
     */
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion findFirstOrThrow
   */
  export type InterviewQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewQuestions.
     */
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion findMany
   */
  export type InterviewQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestions to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion create
   */
  export type InterviewQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a InterviewQuestion.
     */
    data: XOR<InterviewQuestionCreateInput, InterviewQuestionUncheckedCreateInput>
  }

  /**
   * InterviewQuestion createMany
   */
  export type InterviewQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterviewQuestions.
     */
    data: InterviewQuestionCreateManyInput | InterviewQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InterviewQuestion createManyAndReturn
   */
  export type InterviewQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InterviewQuestions.
     */
    data: InterviewQuestionCreateManyInput | InterviewQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewQuestion update
   */
  export type InterviewQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a InterviewQuestion.
     */
    data: XOR<InterviewQuestionUpdateInput, InterviewQuestionUncheckedUpdateInput>
    /**
     * Choose, which InterviewQuestion to update.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion updateMany
   */
  export type InterviewQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterviewQuestions.
     */
    data: XOR<InterviewQuestionUpdateManyMutationInput, InterviewQuestionUncheckedUpdateManyInput>
    /**
     * Filter which InterviewQuestions to update
     */
    where?: InterviewQuestionWhereInput
  }

  /**
   * InterviewQuestion upsert
   */
  export type InterviewQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the InterviewQuestion to update in case it exists.
     */
    where: InterviewQuestionWhereUniqueInput
    /**
     * In case the InterviewQuestion found by the `where` argument doesn't exist, create a new InterviewQuestion with this data.
     */
    create: XOR<InterviewQuestionCreateInput, InterviewQuestionUncheckedCreateInput>
    /**
     * In case the InterviewQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewQuestionUpdateInput, InterviewQuestionUncheckedUpdateInput>
  }

  /**
   * InterviewQuestion delete
   */
  export type InterviewQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter which InterviewQuestion to delete.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion deleteMany
   */
  export type InterviewQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewQuestions to delete
     */
    where?: InterviewQuestionWhereInput
  }

  /**
   * InterviewQuestion.user
   */
  export type InterviewQuestion$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * InterviewQuestion.answers
   */
  export type InterviewQuestion$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    where?: InterviewAnswerWhereInput
    orderBy?: InterviewAnswerOrderByWithRelationInput | InterviewAnswerOrderByWithRelationInput[]
    cursor?: InterviewAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewAnswerScalarFieldEnum | InterviewAnswerScalarFieldEnum[]
  }

  /**
   * InterviewQuestion without action
   */
  export type InterviewQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
  }


  /**
   * Model InterviewAnswer
   */

  export type AggregateInterviewAnswer = {
    _count: InterviewAnswerCountAggregateOutputType | null
    _min: InterviewAnswerMinAggregateOutputType | null
    _max: InterviewAnswerMaxAggregateOutputType | null
  }

  export type InterviewAnswerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    questionId: string | null
    answer: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterviewAnswerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    questionId: string | null
    answer: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterviewAnswerCountAggregateOutputType = {
    id: number
    userId: number
    questionId: number
    answer: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InterviewAnswerMinAggregateInputType = {
    id?: true
    userId?: true
    questionId?: true
    answer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterviewAnswerMaxAggregateInputType = {
    id?: true
    userId?: true
    questionId?: true
    answer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterviewAnswerCountAggregateInputType = {
    id?: true
    userId?: true
    questionId?: true
    answer?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InterviewAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewAnswer to aggregate.
     */
    where?: InterviewAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewAnswers to fetch.
     */
    orderBy?: InterviewAnswerOrderByWithRelationInput | InterviewAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterviewAnswers
    **/
    _count?: true | InterviewAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewAnswerMaxAggregateInputType
  }

  export type GetInterviewAnswerAggregateType<T extends InterviewAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateInterviewAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterviewAnswer[P]>
      : GetScalarType<T[P], AggregateInterviewAnswer[P]>
  }




  export type InterviewAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewAnswerWhereInput
    orderBy?: InterviewAnswerOrderByWithAggregationInput | InterviewAnswerOrderByWithAggregationInput[]
    by: InterviewAnswerScalarFieldEnum[] | InterviewAnswerScalarFieldEnum
    having?: InterviewAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewAnswerCountAggregateInputType | true
    _min?: InterviewAnswerMinAggregateInputType
    _max?: InterviewAnswerMaxAggregateInputType
  }

  export type InterviewAnswerGroupByOutputType = {
    id: string
    userId: string
    questionId: string
    answer: string
    createdAt: Date
    updatedAt: Date
    _count: InterviewAnswerCountAggregateOutputType | null
    _min: InterviewAnswerMinAggregateOutputType | null
    _max: InterviewAnswerMaxAggregateOutputType | null
  }

  type GetInterviewAnswerGroupByPayload<T extends InterviewAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewAnswerGroupByOutputType[P]>
        }
      >
    >


  export type InterviewAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    questionId?: boolean
    answer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | InterviewQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewAnswer"]>

  export type InterviewAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    questionId?: boolean
    answer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | InterviewQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewAnswer"]>

  export type InterviewAnswerSelectScalar = {
    id?: boolean
    userId?: boolean
    questionId?: boolean
    answer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InterviewAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | InterviewQuestionDefaultArgs<ExtArgs>
  }
  export type InterviewAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | InterviewQuestionDefaultArgs<ExtArgs>
  }

  export type $InterviewAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterviewAnswer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      question: Prisma.$InterviewQuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      questionId: string
      answer: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["interviewAnswer"]>
    composites: {}
  }

  type InterviewAnswerGetPayload<S extends boolean | null | undefined | InterviewAnswerDefaultArgs> = $Result.GetResult<Prisma.$InterviewAnswerPayload, S>

  type InterviewAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InterviewAnswerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InterviewAnswerCountAggregateInputType | true
    }

  export interface InterviewAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterviewAnswer'], meta: { name: 'InterviewAnswer' } }
    /**
     * Find zero or one InterviewAnswer that matches the filter.
     * @param {InterviewAnswerFindUniqueArgs} args - Arguments to find a InterviewAnswer
     * @example
     * // Get one InterviewAnswer
     * const interviewAnswer = await prisma.interviewAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewAnswerFindUniqueArgs>(args: SelectSubset<T, InterviewAnswerFindUniqueArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InterviewAnswer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InterviewAnswerFindUniqueOrThrowArgs} args - Arguments to find a InterviewAnswer
     * @example
     * // Get one InterviewAnswer
     * const interviewAnswer = await prisma.interviewAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InterviewAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAnswerFindFirstArgs} args - Arguments to find a InterviewAnswer
     * @example
     * // Get one InterviewAnswer
     * const interviewAnswer = await prisma.interviewAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewAnswerFindFirstArgs>(args?: SelectSubset<T, InterviewAnswerFindFirstArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InterviewAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAnswerFindFirstOrThrowArgs} args - Arguments to find a InterviewAnswer
     * @example
     * // Get one InterviewAnswer
     * const interviewAnswer = await prisma.interviewAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InterviewAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterviewAnswers
     * const interviewAnswers = await prisma.interviewAnswer.findMany()
     * 
     * // Get first 10 InterviewAnswers
     * const interviewAnswers = await prisma.interviewAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewAnswerWithIdOnly = await prisma.interviewAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewAnswerFindManyArgs>(args?: SelectSubset<T, InterviewAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InterviewAnswer.
     * @param {InterviewAnswerCreateArgs} args - Arguments to create a InterviewAnswer.
     * @example
     * // Create one InterviewAnswer
     * const InterviewAnswer = await prisma.interviewAnswer.create({
     *   data: {
     *     // ... data to create a InterviewAnswer
     *   }
     * })
     * 
     */
    create<T extends InterviewAnswerCreateArgs>(args: SelectSubset<T, InterviewAnswerCreateArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InterviewAnswers.
     * @param {InterviewAnswerCreateManyArgs} args - Arguments to create many InterviewAnswers.
     * @example
     * // Create many InterviewAnswers
     * const interviewAnswer = await prisma.interviewAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewAnswerCreateManyArgs>(args?: SelectSubset<T, InterviewAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterviewAnswers and returns the data saved in the database.
     * @param {InterviewAnswerCreateManyAndReturnArgs} args - Arguments to create many InterviewAnswers.
     * @example
     * // Create many InterviewAnswers
     * const interviewAnswer = await prisma.interviewAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterviewAnswers and only return the `id`
     * const interviewAnswerWithIdOnly = await prisma.interviewAnswer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InterviewAnswer.
     * @param {InterviewAnswerDeleteArgs} args - Arguments to delete one InterviewAnswer.
     * @example
     * // Delete one InterviewAnswer
     * const InterviewAnswer = await prisma.interviewAnswer.delete({
     *   where: {
     *     // ... filter to delete one InterviewAnswer
     *   }
     * })
     * 
     */
    delete<T extends InterviewAnswerDeleteArgs>(args: SelectSubset<T, InterviewAnswerDeleteArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InterviewAnswer.
     * @param {InterviewAnswerUpdateArgs} args - Arguments to update one InterviewAnswer.
     * @example
     * // Update one InterviewAnswer
     * const interviewAnswer = await prisma.interviewAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewAnswerUpdateArgs>(args: SelectSubset<T, InterviewAnswerUpdateArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InterviewAnswers.
     * @param {InterviewAnswerDeleteManyArgs} args - Arguments to filter InterviewAnswers to delete.
     * @example
     * // Delete a few InterviewAnswers
     * const { count } = await prisma.interviewAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewAnswerDeleteManyArgs>(args?: SelectSubset<T, InterviewAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterviewAnswers
     * const interviewAnswer = await prisma.interviewAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewAnswerUpdateManyArgs>(args: SelectSubset<T, InterviewAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InterviewAnswer.
     * @param {InterviewAnswerUpsertArgs} args - Arguments to update or create a InterviewAnswer.
     * @example
     * // Update or create a InterviewAnswer
     * const interviewAnswer = await prisma.interviewAnswer.upsert({
     *   create: {
     *     // ... data to create a InterviewAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterviewAnswer we want to update
     *   }
     * })
     */
    upsert<T extends InterviewAnswerUpsertArgs>(args: SelectSubset<T, InterviewAnswerUpsertArgs<ExtArgs>>): Prisma__InterviewAnswerClient<$Result.GetResult<Prisma.$InterviewAnswerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InterviewAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAnswerCountArgs} args - Arguments to filter InterviewAnswers to count.
     * @example
     * // Count the number of InterviewAnswers
     * const count = await prisma.interviewAnswer.count({
     *   where: {
     *     // ... the filter for the InterviewAnswers we want to count
     *   }
     * })
    **/
    count<T extends InterviewAnswerCountArgs>(
      args?: Subset<T, InterviewAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterviewAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewAnswerAggregateArgs>(args: Subset<T, InterviewAnswerAggregateArgs>): Prisma.PrismaPromise<GetInterviewAnswerAggregateType<T>>

    /**
     * Group by InterviewAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewAnswerGroupByArgs['orderBy'] }
        : { orderBy?: InterviewAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterviewAnswer model
   */
  readonly fields: InterviewAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterviewAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    question<T extends InterviewQuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InterviewQuestionDefaultArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterviewAnswer model
   */ 
  interface InterviewAnswerFieldRefs {
    readonly id: FieldRef<"InterviewAnswer", 'String'>
    readonly userId: FieldRef<"InterviewAnswer", 'String'>
    readonly questionId: FieldRef<"InterviewAnswer", 'String'>
    readonly answer: FieldRef<"InterviewAnswer", 'String'>
    readonly createdAt: FieldRef<"InterviewAnswer", 'DateTime'>
    readonly updatedAt: FieldRef<"InterviewAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InterviewAnswer findUnique
   */
  export type InterviewAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * Filter, which InterviewAnswer to fetch.
     */
    where: InterviewAnswerWhereUniqueInput
  }

  /**
   * InterviewAnswer findUniqueOrThrow
   */
  export type InterviewAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * Filter, which InterviewAnswer to fetch.
     */
    where: InterviewAnswerWhereUniqueInput
  }

  /**
   * InterviewAnswer findFirst
   */
  export type InterviewAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * Filter, which InterviewAnswer to fetch.
     */
    where?: InterviewAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewAnswers to fetch.
     */
    orderBy?: InterviewAnswerOrderByWithRelationInput | InterviewAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewAnswers.
     */
    cursor?: InterviewAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewAnswers.
     */
    distinct?: InterviewAnswerScalarFieldEnum | InterviewAnswerScalarFieldEnum[]
  }

  /**
   * InterviewAnswer findFirstOrThrow
   */
  export type InterviewAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * Filter, which InterviewAnswer to fetch.
     */
    where?: InterviewAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewAnswers to fetch.
     */
    orderBy?: InterviewAnswerOrderByWithRelationInput | InterviewAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewAnswers.
     */
    cursor?: InterviewAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewAnswers.
     */
    distinct?: InterviewAnswerScalarFieldEnum | InterviewAnswerScalarFieldEnum[]
  }

  /**
   * InterviewAnswer findMany
   */
  export type InterviewAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * Filter, which InterviewAnswers to fetch.
     */
    where?: InterviewAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewAnswers to fetch.
     */
    orderBy?: InterviewAnswerOrderByWithRelationInput | InterviewAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterviewAnswers.
     */
    cursor?: InterviewAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewAnswers.
     */
    skip?: number
    distinct?: InterviewAnswerScalarFieldEnum | InterviewAnswerScalarFieldEnum[]
  }

  /**
   * InterviewAnswer create
   */
  export type InterviewAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a InterviewAnswer.
     */
    data: XOR<InterviewAnswerCreateInput, InterviewAnswerUncheckedCreateInput>
  }

  /**
   * InterviewAnswer createMany
   */
  export type InterviewAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterviewAnswers.
     */
    data: InterviewAnswerCreateManyInput | InterviewAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InterviewAnswer createManyAndReturn
   */
  export type InterviewAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InterviewAnswers.
     */
    data: InterviewAnswerCreateManyInput | InterviewAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewAnswer update
   */
  export type InterviewAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a InterviewAnswer.
     */
    data: XOR<InterviewAnswerUpdateInput, InterviewAnswerUncheckedUpdateInput>
    /**
     * Choose, which InterviewAnswer to update.
     */
    where: InterviewAnswerWhereUniqueInput
  }

  /**
   * InterviewAnswer updateMany
   */
  export type InterviewAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterviewAnswers.
     */
    data: XOR<InterviewAnswerUpdateManyMutationInput, InterviewAnswerUncheckedUpdateManyInput>
    /**
     * Filter which InterviewAnswers to update
     */
    where?: InterviewAnswerWhereInput
  }

  /**
   * InterviewAnswer upsert
   */
  export type InterviewAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the InterviewAnswer to update in case it exists.
     */
    where: InterviewAnswerWhereUniqueInput
    /**
     * In case the InterviewAnswer found by the `where` argument doesn't exist, create a new InterviewAnswer with this data.
     */
    create: XOR<InterviewAnswerCreateInput, InterviewAnswerUncheckedCreateInput>
    /**
     * In case the InterviewAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewAnswerUpdateInput, InterviewAnswerUncheckedUpdateInput>
  }

  /**
   * InterviewAnswer delete
   */
  export type InterviewAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
    /**
     * Filter which InterviewAnswer to delete.
     */
    where: InterviewAnswerWhereUniqueInput
  }

  /**
   * InterviewAnswer deleteMany
   */
  export type InterviewAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewAnswers to delete
     */
    where?: InterviewAnswerWhereInput
  }

  /**
   * InterviewAnswer without action
   */
  export type InterviewAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewAnswer
     */
    select?: InterviewAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewAnswerInclude<ExtArgs> | null
  }


  /**
   * Model CoverLetter
   */

  export type AggregateCoverLetter = {
    _count: CoverLetterCountAggregateOutputType | null
    _avg: CoverLetterAvgAggregateOutputType | null
    _sum: CoverLetterSumAggregateOutputType | null
    _min: CoverLetterMinAggregateOutputType | null
    _max: CoverLetterMaxAggregateOutputType | null
  }

  export type CoverLetterAvgAggregateOutputType = {
    version: number | null
    analysisScore: number | null
  }

  export type CoverLetterSumAggregateOutputType = {
    version: number | null
    analysisScore: number | null
  }

  export type CoverLetterMinAggregateOutputType = {
    id: string | null
    userId: string | null
    jobId: string | null
    company: string | null
    position: string | null
    items: string | null
    version: number | null
    analysisScore: number | null
    analysisHistory: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoverLetterMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    jobId: string | null
    company: string | null
    position: string | null
    items: string | null
    version: number | null
    analysisScore: number | null
    analysisHistory: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoverLetterCountAggregateOutputType = {
    id: number
    userId: number
    jobId: number
    company: number
    position: number
    items: number
    version: number
    analysisScore: number
    analysisHistory: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CoverLetterAvgAggregateInputType = {
    version?: true
    analysisScore?: true
  }

  export type CoverLetterSumAggregateInputType = {
    version?: true
    analysisScore?: true
  }

  export type CoverLetterMinAggregateInputType = {
    id?: true
    userId?: true
    jobId?: true
    company?: true
    position?: true
    items?: true
    version?: true
    analysisScore?: true
    analysisHistory?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoverLetterMaxAggregateInputType = {
    id?: true
    userId?: true
    jobId?: true
    company?: true
    position?: true
    items?: true
    version?: true
    analysisScore?: true
    analysisHistory?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoverLetterCountAggregateInputType = {
    id?: true
    userId?: true
    jobId?: true
    company?: true
    position?: true
    items?: true
    version?: true
    analysisScore?: true
    analysisHistory?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CoverLetterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoverLetter to aggregate.
     */
    where?: CoverLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetters to fetch.
     */
    orderBy?: CoverLetterOrderByWithRelationInput | CoverLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoverLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoverLetters
    **/
    _count?: true | CoverLetterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoverLetterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoverLetterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoverLetterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoverLetterMaxAggregateInputType
  }

  export type GetCoverLetterAggregateType<T extends CoverLetterAggregateArgs> = {
        [P in keyof T & keyof AggregateCoverLetter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoverLetter[P]>
      : GetScalarType<T[P], AggregateCoverLetter[P]>
  }




  export type CoverLetterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoverLetterWhereInput
    orderBy?: CoverLetterOrderByWithAggregationInput | CoverLetterOrderByWithAggregationInput[]
    by: CoverLetterScalarFieldEnum[] | CoverLetterScalarFieldEnum
    having?: CoverLetterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoverLetterCountAggregateInputType | true
    _avg?: CoverLetterAvgAggregateInputType
    _sum?: CoverLetterSumAggregateInputType
    _min?: CoverLetterMinAggregateInputType
    _max?: CoverLetterMaxAggregateInputType
  }

  export type CoverLetterGroupByOutputType = {
    id: string
    userId: string
    jobId: string | null
    company: string
    position: string
    items: string
    version: number
    analysisScore: number | null
    analysisHistory: string | null
    createdAt: Date
    updatedAt: Date
    _count: CoverLetterCountAggregateOutputType | null
    _avg: CoverLetterAvgAggregateOutputType | null
    _sum: CoverLetterSumAggregateOutputType | null
    _min: CoverLetterMinAggregateOutputType | null
    _max: CoverLetterMaxAggregateOutputType | null
  }

  type GetCoverLetterGroupByPayload<T extends CoverLetterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoverLetterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoverLetterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoverLetterGroupByOutputType[P]>
            : GetScalarType<T[P], CoverLetterGroupByOutputType[P]>
        }
      >
    >


  export type CoverLetterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobId?: boolean
    company?: boolean
    position?: boolean
    items?: boolean
    version?: boolean
    analysisScore?: boolean
    analysisHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | CoverLetter$jobArgs<ExtArgs>
    versions?: boolean | CoverLetter$versionsArgs<ExtArgs>
    _count?: boolean | CoverLetterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coverLetter"]>

  export type CoverLetterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobId?: boolean
    company?: boolean
    position?: boolean
    items?: boolean
    version?: boolean
    analysisScore?: boolean
    analysisHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | CoverLetter$jobArgs<ExtArgs>
  }, ExtArgs["result"]["coverLetter"]>

  export type CoverLetterSelectScalar = {
    id?: boolean
    userId?: boolean
    jobId?: boolean
    company?: boolean
    position?: boolean
    items?: boolean
    version?: boolean
    analysisScore?: boolean
    analysisHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CoverLetterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | CoverLetter$jobArgs<ExtArgs>
    versions?: boolean | CoverLetter$versionsArgs<ExtArgs>
    _count?: boolean | CoverLetterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CoverLetterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | CoverLetter$jobArgs<ExtArgs>
  }

  export type $CoverLetterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CoverLetter"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      job: Prisma.$JobPostingPayload<ExtArgs> | null
      versions: Prisma.$CoverLetterVersionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      jobId: string | null
      company: string
      position: string
      items: string
      version: number
      analysisScore: number | null
      analysisHistory: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["coverLetter"]>
    composites: {}
  }

  type CoverLetterGetPayload<S extends boolean | null | undefined | CoverLetterDefaultArgs> = $Result.GetResult<Prisma.$CoverLetterPayload, S>

  type CoverLetterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CoverLetterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CoverLetterCountAggregateInputType | true
    }

  export interface CoverLetterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CoverLetter'], meta: { name: 'CoverLetter' } }
    /**
     * Find zero or one CoverLetter that matches the filter.
     * @param {CoverLetterFindUniqueArgs} args - Arguments to find a CoverLetter
     * @example
     * // Get one CoverLetter
     * const coverLetter = await prisma.coverLetter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoverLetterFindUniqueArgs>(args: SelectSubset<T, CoverLetterFindUniqueArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CoverLetter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CoverLetterFindUniqueOrThrowArgs} args - Arguments to find a CoverLetter
     * @example
     * // Get one CoverLetter
     * const coverLetter = await prisma.coverLetter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoverLetterFindUniqueOrThrowArgs>(args: SelectSubset<T, CoverLetterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CoverLetter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterFindFirstArgs} args - Arguments to find a CoverLetter
     * @example
     * // Get one CoverLetter
     * const coverLetter = await prisma.coverLetter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoverLetterFindFirstArgs>(args?: SelectSubset<T, CoverLetterFindFirstArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CoverLetter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterFindFirstOrThrowArgs} args - Arguments to find a CoverLetter
     * @example
     * // Get one CoverLetter
     * const coverLetter = await prisma.coverLetter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoverLetterFindFirstOrThrowArgs>(args?: SelectSubset<T, CoverLetterFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CoverLetters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoverLetters
     * const coverLetters = await prisma.coverLetter.findMany()
     * 
     * // Get first 10 CoverLetters
     * const coverLetters = await prisma.coverLetter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coverLetterWithIdOnly = await prisma.coverLetter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoverLetterFindManyArgs>(args?: SelectSubset<T, CoverLetterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CoverLetter.
     * @param {CoverLetterCreateArgs} args - Arguments to create a CoverLetter.
     * @example
     * // Create one CoverLetter
     * const CoverLetter = await prisma.coverLetter.create({
     *   data: {
     *     // ... data to create a CoverLetter
     *   }
     * })
     * 
     */
    create<T extends CoverLetterCreateArgs>(args: SelectSubset<T, CoverLetterCreateArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CoverLetters.
     * @param {CoverLetterCreateManyArgs} args - Arguments to create many CoverLetters.
     * @example
     * // Create many CoverLetters
     * const coverLetter = await prisma.coverLetter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoverLetterCreateManyArgs>(args?: SelectSubset<T, CoverLetterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CoverLetters and returns the data saved in the database.
     * @param {CoverLetterCreateManyAndReturnArgs} args - Arguments to create many CoverLetters.
     * @example
     * // Create many CoverLetters
     * const coverLetter = await prisma.coverLetter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CoverLetters and only return the `id`
     * const coverLetterWithIdOnly = await prisma.coverLetter.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoverLetterCreateManyAndReturnArgs>(args?: SelectSubset<T, CoverLetterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CoverLetter.
     * @param {CoverLetterDeleteArgs} args - Arguments to delete one CoverLetter.
     * @example
     * // Delete one CoverLetter
     * const CoverLetter = await prisma.coverLetter.delete({
     *   where: {
     *     // ... filter to delete one CoverLetter
     *   }
     * })
     * 
     */
    delete<T extends CoverLetterDeleteArgs>(args: SelectSubset<T, CoverLetterDeleteArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CoverLetter.
     * @param {CoverLetterUpdateArgs} args - Arguments to update one CoverLetter.
     * @example
     * // Update one CoverLetter
     * const coverLetter = await prisma.coverLetter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoverLetterUpdateArgs>(args: SelectSubset<T, CoverLetterUpdateArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CoverLetters.
     * @param {CoverLetterDeleteManyArgs} args - Arguments to filter CoverLetters to delete.
     * @example
     * // Delete a few CoverLetters
     * const { count } = await prisma.coverLetter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoverLetterDeleteManyArgs>(args?: SelectSubset<T, CoverLetterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoverLetters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoverLetters
     * const coverLetter = await prisma.coverLetter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoverLetterUpdateManyArgs>(args: SelectSubset<T, CoverLetterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CoverLetter.
     * @param {CoverLetterUpsertArgs} args - Arguments to update or create a CoverLetter.
     * @example
     * // Update or create a CoverLetter
     * const coverLetter = await prisma.coverLetter.upsert({
     *   create: {
     *     // ... data to create a CoverLetter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoverLetter we want to update
     *   }
     * })
     */
    upsert<T extends CoverLetterUpsertArgs>(args: SelectSubset<T, CoverLetterUpsertArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CoverLetters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterCountArgs} args - Arguments to filter CoverLetters to count.
     * @example
     * // Count the number of CoverLetters
     * const count = await prisma.coverLetter.count({
     *   where: {
     *     // ... the filter for the CoverLetters we want to count
     *   }
     * })
    **/
    count<T extends CoverLetterCountArgs>(
      args?: Subset<T, CoverLetterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoverLetterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoverLetter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CoverLetterAggregateArgs>(args: Subset<T, CoverLetterAggregateArgs>): Prisma.PrismaPromise<GetCoverLetterAggregateType<T>>

    /**
     * Group by CoverLetter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CoverLetterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoverLetterGroupByArgs['orderBy'] }
        : { orderBy?: CoverLetterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoverLetterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoverLetterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CoverLetter model
   */
  readonly fields: CoverLetterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoverLetter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoverLetterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    job<T extends CoverLetter$jobArgs<ExtArgs> = {}>(args?: Subset<T, CoverLetter$jobArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    versions<T extends CoverLetter$versionsArgs<ExtArgs> = {}>(args?: Subset<T, CoverLetter$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CoverLetter model
   */ 
  interface CoverLetterFieldRefs {
    readonly id: FieldRef<"CoverLetter", 'String'>
    readonly userId: FieldRef<"CoverLetter", 'String'>
    readonly jobId: FieldRef<"CoverLetter", 'String'>
    readonly company: FieldRef<"CoverLetter", 'String'>
    readonly position: FieldRef<"CoverLetter", 'String'>
    readonly items: FieldRef<"CoverLetter", 'String'>
    readonly version: FieldRef<"CoverLetter", 'Int'>
    readonly analysisScore: FieldRef<"CoverLetter", 'Int'>
    readonly analysisHistory: FieldRef<"CoverLetter", 'String'>
    readonly createdAt: FieldRef<"CoverLetter", 'DateTime'>
    readonly updatedAt: FieldRef<"CoverLetter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CoverLetter findUnique
   */
  export type CoverLetterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetter to fetch.
     */
    where: CoverLetterWhereUniqueInput
  }

  /**
   * CoverLetter findUniqueOrThrow
   */
  export type CoverLetterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetter to fetch.
     */
    where: CoverLetterWhereUniqueInput
  }

  /**
   * CoverLetter findFirst
   */
  export type CoverLetterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetter to fetch.
     */
    where?: CoverLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetters to fetch.
     */
    orderBy?: CoverLetterOrderByWithRelationInput | CoverLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoverLetters.
     */
    cursor?: CoverLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoverLetters.
     */
    distinct?: CoverLetterScalarFieldEnum | CoverLetterScalarFieldEnum[]
  }

  /**
   * CoverLetter findFirstOrThrow
   */
  export type CoverLetterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetter to fetch.
     */
    where?: CoverLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetters to fetch.
     */
    orderBy?: CoverLetterOrderByWithRelationInput | CoverLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoverLetters.
     */
    cursor?: CoverLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoverLetters.
     */
    distinct?: CoverLetterScalarFieldEnum | CoverLetterScalarFieldEnum[]
  }

  /**
   * CoverLetter findMany
   */
  export type CoverLetterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetters to fetch.
     */
    where?: CoverLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetters to fetch.
     */
    orderBy?: CoverLetterOrderByWithRelationInput | CoverLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoverLetters.
     */
    cursor?: CoverLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetters.
     */
    skip?: number
    distinct?: CoverLetterScalarFieldEnum | CoverLetterScalarFieldEnum[]
  }

  /**
   * CoverLetter create
   */
  export type CoverLetterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * The data needed to create a CoverLetter.
     */
    data: XOR<CoverLetterCreateInput, CoverLetterUncheckedCreateInput>
  }

  /**
   * CoverLetter createMany
   */
  export type CoverLetterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CoverLetters.
     */
    data: CoverLetterCreateManyInput | CoverLetterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoverLetter createManyAndReturn
   */
  export type CoverLetterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CoverLetters.
     */
    data: CoverLetterCreateManyInput | CoverLetterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CoverLetter update
   */
  export type CoverLetterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * The data needed to update a CoverLetter.
     */
    data: XOR<CoverLetterUpdateInput, CoverLetterUncheckedUpdateInput>
    /**
     * Choose, which CoverLetter to update.
     */
    where: CoverLetterWhereUniqueInput
  }

  /**
   * CoverLetter updateMany
   */
  export type CoverLetterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CoverLetters.
     */
    data: XOR<CoverLetterUpdateManyMutationInput, CoverLetterUncheckedUpdateManyInput>
    /**
     * Filter which CoverLetters to update
     */
    where?: CoverLetterWhereInput
  }

  /**
   * CoverLetter upsert
   */
  export type CoverLetterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * The filter to search for the CoverLetter to update in case it exists.
     */
    where: CoverLetterWhereUniqueInput
    /**
     * In case the CoverLetter found by the `where` argument doesn't exist, create a new CoverLetter with this data.
     */
    create: XOR<CoverLetterCreateInput, CoverLetterUncheckedCreateInput>
    /**
     * In case the CoverLetter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoverLetterUpdateInput, CoverLetterUncheckedUpdateInput>
  }

  /**
   * CoverLetter delete
   */
  export type CoverLetterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
    /**
     * Filter which CoverLetter to delete.
     */
    where: CoverLetterWhereUniqueInput
  }

  /**
   * CoverLetter deleteMany
   */
  export type CoverLetterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoverLetters to delete
     */
    where?: CoverLetterWhereInput
  }

  /**
   * CoverLetter.job
   */
  export type CoverLetter$jobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    where?: JobPostingWhereInput
  }

  /**
   * CoverLetter.versions
   */
  export type CoverLetter$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    where?: CoverLetterVersionWhereInput
    orderBy?: CoverLetterVersionOrderByWithRelationInput | CoverLetterVersionOrderByWithRelationInput[]
    cursor?: CoverLetterVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CoverLetterVersionScalarFieldEnum | CoverLetterVersionScalarFieldEnum[]
  }

  /**
   * CoverLetter without action
   */
  export type CoverLetterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetter
     */
    select?: CoverLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterInclude<ExtArgs> | null
  }


  /**
   * Model CoverLetterVersion
   */

  export type AggregateCoverLetterVersion = {
    _count: CoverLetterVersionCountAggregateOutputType | null
    _avg: CoverLetterVersionAvgAggregateOutputType | null
    _sum: CoverLetterVersionSumAggregateOutputType | null
    _min: CoverLetterVersionMinAggregateOutputType | null
    _max: CoverLetterVersionMaxAggregateOutputType | null
  }

  export type CoverLetterVersionAvgAggregateOutputType = {
    version: number | null
  }

  export type CoverLetterVersionSumAggregateOutputType = {
    version: number | null
  }

  export type CoverLetterVersionMinAggregateOutputType = {
    id: string | null
    coverLetterId: string | null
    version: number | null
    items: string | null
    savedAt: Date | null
  }

  export type CoverLetterVersionMaxAggregateOutputType = {
    id: string | null
    coverLetterId: string | null
    version: number | null
    items: string | null
    savedAt: Date | null
  }

  export type CoverLetterVersionCountAggregateOutputType = {
    id: number
    coverLetterId: number
    version: number
    items: number
    savedAt: number
    _all: number
  }


  export type CoverLetterVersionAvgAggregateInputType = {
    version?: true
  }

  export type CoverLetterVersionSumAggregateInputType = {
    version?: true
  }

  export type CoverLetterVersionMinAggregateInputType = {
    id?: true
    coverLetterId?: true
    version?: true
    items?: true
    savedAt?: true
  }

  export type CoverLetterVersionMaxAggregateInputType = {
    id?: true
    coverLetterId?: true
    version?: true
    items?: true
    savedAt?: true
  }

  export type CoverLetterVersionCountAggregateInputType = {
    id?: true
    coverLetterId?: true
    version?: true
    items?: true
    savedAt?: true
    _all?: true
  }

  export type CoverLetterVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoverLetterVersion to aggregate.
     */
    where?: CoverLetterVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetterVersions to fetch.
     */
    orderBy?: CoverLetterVersionOrderByWithRelationInput | CoverLetterVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoverLetterVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetterVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetterVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoverLetterVersions
    **/
    _count?: true | CoverLetterVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoverLetterVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoverLetterVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoverLetterVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoverLetterVersionMaxAggregateInputType
  }

  export type GetCoverLetterVersionAggregateType<T extends CoverLetterVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateCoverLetterVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoverLetterVersion[P]>
      : GetScalarType<T[P], AggregateCoverLetterVersion[P]>
  }




  export type CoverLetterVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoverLetterVersionWhereInput
    orderBy?: CoverLetterVersionOrderByWithAggregationInput | CoverLetterVersionOrderByWithAggregationInput[]
    by: CoverLetterVersionScalarFieldEnum[] | CoverLetterVersionScalarFieldEnum
    having?: CoverLetterVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoverLetterVersionCountAggregateInputType | true
    _avg?: CoverLetterVersionAvgAggregateInputType
    _sum?: CoverLetterVersionSumAggregateInputType
    _min?: CoverLetterVersionMinAggregateInputType
    _max?: CoverLetterVersionMaxAggregateInputType
  }

  export type CoverLetterVersionGroupByOutputType = {
    id: string
    coverLetterId: string
    version: number
    items: string
    savedAt: Date
    _count: CoverLetterVersionCountAggregateOutputType | null
    _avg: CoverLetterVersionAvgAggregateOutputType | null
    _sum: CoverLetterVersionSumAggregateOutputType | null
    _min: CoverLetterVersionMinAggregateOutputType | null
    _max: CoverLetterVersionMaxAggregateOutputType | null
  }

  type GetCoverLetterVersionGroupByPayload<T extends CoverLetterVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoverLetterVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoverLetterVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoverLetterVersionGroupByOutputType[P]>
            : GetScalarType<T[P], CoverLetterVersionGroupByOutputType[P]>
        }
      >
    >


  export type CoverLetterVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coverLetterId?: boolean
    version?: boolean
    items?: boolean
    savedAt?: boolean
    coverLetter?: boolean | CoverLetterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coverLetterVersion"]>

  export type CoverLetterVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coverLetterId?: boolean
    version?: boolean
    items?: boolean
    savedAt?: boolean
    coverLetter?: boolean | CoverLetterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coverLetterVersion"]>

  export type CoverLetterVersionSelectScalar = {
    id?: boolean
    coverLetterId?: boolean
    version?: boolean
    items?: boolean
    savedAt?: boolean
  }

  export type CoverLetterVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coverLetter?: boolean | CoverLetterDefaultArgs<ExtArgs>
  }
  export type CoverLetterVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coverLetter?: boolean | CoverLetterDefaultArgs<ExtArgs>
  }

  export type $CoverLetterVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CoverLetterVersion"
    objects: {
      coverLetter: Prisma.$CoverLetterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      coverLetterId: string
      version: number
      items: string
      savedAt: Date
    }, ExtArgs["result"]["coverLetterVersion"]>
    composites: {}
  }

  type CoverLetterVersionGetPayload<S extends boolean | null | undefined | CoverLetterVersionDefaultArgs> = $Result.GetResult<Prisma.$CoverLetterVersionPayload, S>

  type CoverLetterVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CoverLetterVersionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CoverLetterVersionCountAggregateInputType | true
    }

  export interface CoverLetterVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CoverLetterVersion'], meta: { name: 'CoverLetterVersion' } }
    /**
     * Find zero or one CoverLetterVersion that matches the filter.
     * @param {CoverLetterVersionFindUniqueArgs} args - Arguments to find a CoverLetterVersion
     * @example
     * // Get one CoverLetterVersion
     * const coverLetterVersion = await prisma.coverLetterVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoverLetterVersionFindUniqueArgs>(args: SelectSubset<T, CoverLetterVersionFindUniqueArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CoverLetterVersion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CoverLetterVersionFindUniqueOrThrowArgs} args - Arguments to find a CoverLetterVersion
     * @example
     * // Get one CoverLetterVersion
     * const coverLetterVersion = await prisma.coverLetterVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoverLetterVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, CoverLetterVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CoverLetterVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterVersionFindFirstArgs} args - Arguments to find a CoverLetterVersion
     * @example
     * // Get one CoverLetterVersion
     * const coverLetterVersion = await prisma.coverLetterVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoverLetterVersionFindFirstArgs>(args?: SelectSubset<T, CoverLetterVersionFindFirstArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CoverLetterVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterVersionFindFirstOrThrowArgs} args - Arguments to find a CoverLetterVersion
     * @example
     * // Get one CoverLetterVersion
     * const coverLetterVersion = await prisma.coverLetterVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoverLetterVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, CoverLetterVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CoverLetterVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoverLetterVersions
     * const coverLetterVersions = await prisma.coverLetterVersion.findMany()
     * 
     * // Get first 10 CoverLetterVersions
     * const coverLetterVersions = await prisma.coverLetterVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coverLetterVersionWithIdOnly = await prisma.coverLetterVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoverLetterVersionFindManyArgs>(args?: SelectSubset<T, CoverLetterVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CoverLetterVersion.
     * @param {CoverLetterVersionCreateArgs} args - Arguments to create a CoverLetterVersion.
     * @example
     * // Create one CoverLetterVersion
     * const CoverLetterVersion = await prisma.coverLetterVersion.create({
     *   data: {
     *     // ... data to create a CoverLetterVersion
     *   }
     * })
     * 
     */
    create<T extends CoverLetterVersionCreateArgs>(args: SelectSubset<T, CoverLetterVersionCreateArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CoverLetterVersions.
     * @param {CoverLetterVersionCreateManyArgs} args - Arguments to create many CoverLetterVersions.
     * @example
     * // Create many CoverLetterVersions
     * const coverLetterVersion = await prisma.coverLetterVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoverLetterVersionCreateManyArgs>(args?: SelectSubset<T, CoverLetterVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CoverLetterVersions and returns the data saved in the database.
     * @param {CoverLetterVersionCreateManyAndReturnArgs} args - Arguments to create many CoverLetterVersions.
     * @example
     * // Create many CoverLetterVersions
     * const coverLetterVersion = await prisma.coverLetterVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CoverLetterVersions and only return the `id`
     * const coverLetterVersionWithIdOnly = await prisma.coverLetterVersion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoverLetterVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, CoverLetterVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CoverLetterVersion.
     * @param {CoverLetterVersionDeleteArgs} args - Arguments to delete one CoverLetterVersion.
     * @example
     * // Delete one CoverLetterVersion
     * const CoverLetterVersion = await prisma.coverLetterVersion.delete({
     *   where: {
     *     // ... filter to delete one CoverLetterVersion
     *   }
     * })
     * 
     */
    delete<T extends CoverLetterVersionDeleteArgs>(args: SelectSubset<T, CoverLetterVersionDeleteArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CoverLetterVersion.
     * @param {CoverLetterVersionUpdateArgs} args - Arguments to update one CoverLetterVersion.
     * @example
     * // Update one CoverLetterVersion
     * const coverLetterVersion = await prisma.coverLetterVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoverLetterVersionUpdateArgs>(args: SelectSubset<T, CoverLetterVersionUpdateArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CoverLetterVersions.
     * @param {CoverLetterVersionDeleteManyArgs} args - Arguments to filter CoverLetterVersions to delete.
     * @example
     * // Delete a few CoverLetterVersions
     * const { count } = await prisma.coverLetterVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoverLetterVersionDeleteManyArgs>(args?: SelectSubset<T, CoverLetterVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoverLetterVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoverLetterVersions
     * const coverLetterVersion = await prisma.coverLetterVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoverLetterVersionUpdateManyArgs>(args: SelectSubset<T, CoverLetterVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CoverLetterVersion.
     * @param {CoverLetterVersionUpsertArgs} args - Arguments to update or create a CoverLetterVersion.
     * @example
     * // Update or create a CoverLetterVersion
     * const coverLetterVersion = await prisma.coverLetterVersion.upsert({
     *   create: {
     *     // ... data to create a CoverLetterVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoverLetterVersion we want to update
     *   }
     * })
     */
    upsert<T extends CoverLetterVersionUpsertArgs>(args: SelectSubset<T, CoverLetterVersionUpsertArgs<ExtArgs>>): Prisma__CoverLetterVersionClient<$Result.GetResult<Prisma.$CoverLetterVersionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CoverLetterVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterVersionCountArgs} args - Arguments to filter CoverLetterVersions to count.
     * @example
     * // Count the number of CoverLetterVersions
     * const count = await prisma.coverLetterVersion.count({
     *   where: {
     *     // ... the filter for the CoverLetterVersions we want to count
     *   }
     * })
    **/
    count<T extends CoverLetterVersionCountArgs>(
      args?: Subset<T, CoverLetterVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoverLetterVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoverLetterVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CoverLetterVersionAggregateArgs>(args: Subset<T, CoverLetterVersionAggregateArgs>): Prisma.PrismaPromise<GetCoverLetterVersionAggregateType<T>>

    /**
     * Group by CoverLetterVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoverLetterVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CoverLetterVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoverLetterVersionGroupByArgs['orderBy'] }
        : { orderBy?: CoverLetterVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoverLetterVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoverLetterVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CoverLetterVersion model
   */
  readonly fields: CoverLetterVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoverLetterVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoverLetterVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coverLetter<T extends CoverLetterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CoverLetterDefaultArgs<ExtArgs>>): Prisma__CoverLetterClient<$Result.GetResult<Prisma.$CoverLetterPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CoverLetterVersion model
   */ 
  interface CoverLetterVersionFieldRefs {
    readonly id: FieldRef<"CoverLetterVersion", 'String'>
    readonly coverLetterId: FieldRef<"CoverLetterVersion", 'String'>
    readonly version: FieldRef<"CoverLetterVersion", 'Int'>
    readonly items: FieldRef<"CoverLetterVersion", 'String'>
    readonly savedAt: FieldRef<"CoverLetterVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CoverLetterVersion findUnique
   */
  export type CoverLetterVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetterVersion to fetch.
     */
    where: CoverLetterVersionWhereUniqueInput
  }

  /**
   * CoverLetterVersion findUniqueOrThrow
   */
  export type CoverLetterVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetterVersion to fetch.
     */
    where: CoverLetterVersionWhereUniqueInput
  }

  /**
   * CoverLetterVersion findFirst
   */
  export type CoverLetterVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetterVersion to fetch.
     */
    where?: CoverLetterVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetterVersions to fetch.
     */
    orderBy?: CoverLetterVersionOrderByWithRelationInput | CoverLetterVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoverLetterVersions.
     */
    cursor?: CoverLetterVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetterVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetterVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoverLetterVersions.
     */
    distinct?: CoverLetterVersionScalarFieldEnum | CoverLetterVersionScalarFieldEnum[]
  }

  /**
   * CoverLetterVersion findFirstOrThrow
   */
  export type CoverLetterVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetterVersion to fetch.
     */
    where?: CoverLetterVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetterVersions to fetch.
     */
    orderBy?: CoverLetterVersionOrderByWithRelationInput | CoverLetterVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoverLetterVersions.
     */
    cursor?: CoverLetterVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetterVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetterVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoverLetterVersions.
     */
    distinct?: CoverLetterVersionScalarFieldEnum | CoverLetterVersionScalarFieldEnum[]
  }

  /**
   * CoverLetterVersion findMany
   */
  export type CoverLetterVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * Filter, which CoverLetterVersions to fetch.
     */
    where?: CoverLetterVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoverLetterVersions to fetch.
     */
    orderBy?: CoverLetterVersionOrderByWithRelationInput | CoverLetterVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoverLetterVersions.
     */
    cursor?: CoverLetterVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoverLetterVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoverLetterVersions.
     */
    skip?: number
    distinct?: CoverLetterVersionScalarFieldEnum | CoverLetterVersionScalarFieldEnum[]
  }

  /**
   * CoverLetterVersion create
   */
  export type CoverLetterVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a CoverLetterVersion.
     */
    data: XOR<CoverLetterVersionCreateInput, CoverLetterVersionUncheckedCreateInput>
  }

  /**
   * CoverLetterVersion createMany
   */
  export type CoverLetterVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CoverLetterVersions.
     */
    data: CoverLetterVersionCreateManyInput | CoverLetterVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoverLetterVersion createManyAndReturn
   */
  export type CoverLetterVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CoverLetterVersions.
     */
    data: CoverLetterVersionCreateManyInput | CoverLetterVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CoverLetterVersion update
   */
  export type CoverLetterVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a CoverLetterVersion.
     */
    data: XOR<CoverLetterVersionUpdateInput, CoverLetterVersionUncheckedUpdateInput>
    /**
     * Choose, which CoverLetterVersion to update.
     */
    where: CoverLetterVersionWhereUniqueInput
  }

  /**
   * CoverLetterVersion updateMany
   */
  export type CoverLetterVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CoverLetterVersions.
     */
    data: XOR<CoverLetterVersionUpdateManyMutationInput, CoverLetterVersionUncheckedUpdateManyInput>
    /**
     * Filter which CoverLetterVersions to update
     */
    where?: CoverLetterVersionWhereInput
  }

  /**
   * CoverLetterVersion upsert
   */
  export type CoverLetterVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the CoverLetterVersion to update in case it exists.
     */
    where: CoverLetterVersionWhereUniqueInput
    /**
     * In case the CoverLetterVersion found by the `where` argument doesn't exist, create a new CoverLetterVersion with this data.
     */
    create: XOR<CoverLetterVersionCreateInput, CoverLetterVersionUncheckedCreateInput>
    /**
     * In case the CoverLetterVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoverLetterVersionUpdateInput, CoverLetterVersionUncheckedUpdateInput>
  }

  /**
   * CoverLetterVersion delete
   */
  export type CoverLetterVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
    /**
     * Filter which CoverLetterVersion to delete.
     */
    where: CoverLetterVersionWhereUniqueInput
  }

  /**
   * CoverLetterVersion deleteMany
   */
  export type CoverLetterVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoverLetterVersions to delete
     */
    where?: CoverLetterVersionWhereInput
  }

  /**
   * CoverLetterVersion without action
   */
  export type CoverLetterVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoverLetterVersion
     */
    select?: CoverLetterVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoverLetterVersionInclude<ExtArgs> | null
  }


  /**
   * Model JobListing
   */

  export type AggregateJobListing = {
    _count: JobListingCountAggregateOutputType | null
    _min: JobListingMinAggregateOutputType | null
    _max: JobListingMaxAggregateOutputType | null
  }

  export type JobListingMinAggregateOutputType = {
    id: string | null
    company: string | null
    position: string | null
    location: string | null
    career: string | null
    education: string | null
    employType: string | null
    salary: string | null
    deadline: Date | null
    url: string | null
    description: string | null
    tags: string | null
    source: string | null
    isActive: boolean | null
    recruiterId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobListingMaxAggregateOutputType = {
    id: string | null
    company: string | null
    position: string | null
    location: string | null
    career: string | null
    education: string | null
    employType: string | null
    salary: string | null
    deadline: Date | null
    url: string | null
    description: string | null
    tags: string | null
    source: string | null
    isActive: boolean | null
    recruiterId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobListingCountAggregateOutputType = {
    id: number
    company: number
    position: number
    location: number
    career: number
    education: number
    employType: number
    salary: number
    deadline: number
    url: number
    description: number
    tags: number
    source: number
    isActive: number
    recruiterId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobListingMinAggregateInputType = {
    id?: true
    company?: true
    position?: true
    location?: true
    career?: true
    education?: true
    employType?: true
    salary?: true
    deadline?: true
    url?: true
    description?: true
    tags?: true
    source?: true
    isActive?: true
    recruiterId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobListingMaxAggregateInputType = {
    id?: true
    company?: true
    position?: true
    location?: true
    career?: true
    education?: true
    employType?: true
    salary?: true
    deadline?: true
    url?: true
    description?: true
    tags?: true
    source?: true
    isActive?: true
    recruiterId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobListingCountAggregateInputType = {
    id?: true
    company?: true
    position?: true
    location?: true
    career?: true
    education?: true
    employType?: true
    salary?: true
    deadline?: true
    url?: true
    description?: true
    tags?: true
    source?: true
    isActive?: true
    recruiterId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobListing to aggregate.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobListings
    **/
    _count?: true | JobListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobListingMaxAggregateInputType
  }

  export type GetJobListingAggregateType<T extends JobListingAggregateArgs> = {
        [P in keyof T & keyof AggregateJobListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobListing[P]>
      : GetScalarType<T[P], AggregateJobListing[P]>
  }




  export type JobListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobListingWhereInput
    orderBy?: JobListingOrderByWithAggregationInput | JobListingOrderByWithAggregationInput[]
    by: JobListingScalarFieldEnum[] | JobListingScalarFieldEnum
    having?: JobListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobListingCountAggregateInputType | true
    _min?: JobListingMinAggregateInputType
    _max?: JobListingMaxAggregateInputType
  }

  export type JobListingGroupByOutputType = {
    id: string
    company: string
    position: string
    location: string | null
    career: string | null
    education: string | null
    employType: string | null
    salary: string | null
    deadline: Date | null
    url: string | null
    description: string | null
    tags: string | null
    source: string | null
    isActive: boolean
    recruiterId: string | null
    createdAt: Date
    updatedAt: Date
    _count: JobListingCountAggregateOutputType | null
    _min: JobListingMinAggregateOutputType | null
    _max: JobListingMaxAggregateOutputType | null
  }

  type GetJobListingGroupByPayload<T extends JobListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobListingGroupByOutputType[P]>
            : GetScalarType<T[P], JobListingGroupByOutputType[P]>
        }
      >
    >


  export type JobListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    position?: boolean
    location?: boolean
    career?: boolean
    education?: boolean
    employType?: boolean
    salary?: boolean
    deadline?: boolean
    url?: boolean
    description?: boolean
    tags?: boolean
    source?: boolean
    isActive?: boolean
    recruiterId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiter?: boolean | JobListing$recruiterArgs<ExtArgs>
    bookmarks?: boolean | JobListing$bookmarksArgs<ExtArgs>
    _count?: boolean | JobListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobListing"]>

  export type JobListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    position?: boolean
    location?: boolean
    career?: boolean
    education?: boolean
    employType?: boolean
    salary?: boolean
    deadline?: boolean
    url?: boolean
    description?: boolean
    tags?: boolean
    source?: boolean
    isActive?: boolean
    recruiterId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiter?: boolean | JobListing$recruiterArgs<ExtArgs>
  }, ExtArgs["result"]["jobListing"]>

  export type JobListingSelectScalar = {
    id?: boolean
    company?: boolean
    position?: boolean
    location?: boolean
    career?: boolean
    education?: boolean
    employType?: boolean
    salary?: boolean
    deadline?: boolean
    url?: boolean
    description?: boolean
    tags?: boolean
    source?: boolean
    isActive?: boolean
    recruiterId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiter?: boolean | JobListing$recruiterArgs<ExtArgs>
    bookmarks?: boolean | JobListing$bookmarksArgs<ExtArgs>
    _count?: boolean | JobListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiter?: boolean | JobListing$recruiterArgs<ExtArgs>
  }

  export type $JobListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobListing"
    objects: {
      recruiter: Prisma.$UserPayload<ExtArgs> | null
      bookmarks: Prisma.$JobBookmarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      company: string
      position: string
      location: string | null
      career: string | null
      education: string | null
      employType: string | null
      salary: string | null
      deadline: Date | null
      url: string | null
      description: string | null
      tags: string | null
      source: string | null
      isActive: boolean
      recruiterId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobListing"]>
    composites: {}
  }

  type JobListingGetPayload<S extends boolean | null | undefined | JobListingDefaultArgs> = $Result.GetResult<Prisma.$JobListingPayload, S>

  type JobListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobListingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobListingCountAggregateInputType | true
    }

  export interface JobListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobListing'], meta: { name: 'JobListing' } }
    /**
     * Find zero or one JobListing that matches the filter.
     * @param {JobListingFindUniqueArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobListingFindUniqueArgs>(args: SelectSubset<T, JobListingFindUniqueArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobListing that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobListingFindUniqueOrThrowArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobListingFindUniqueOrThrowArgs>(args: SelectSubset<T, JobListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingFindFirstArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobListingFindFirstArgs>(args?: SelectSubset<T, JobListingFindFirstArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingFindFirstOrThrowArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobListingFindFirstOrThrowArgs>(args?: SelectSubset<T, JobListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobListings
     * const jobListings = await prisma.jobListing.findMany()
     * 
     * // Get first 10 JobListings
     * const jobListings = await prisma.jobListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobListingWithIdOnly = await prisma.jobListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobListingFindManyArgs>(args?: SelectSubset<T, JobListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobListing.
     * @param {JobListingCreateArgs} args - Arguments to create a JobListing.
     * @example
     * // Create one JobListing
     * const JobListing = await prisma.jobListing.create({
     *   data: {
     *     // ... data to create a JobListing
     *   }
     * })
     * 
     */
    create<T extends JobListingCreateArgs>(args: SelectSubset<T, JobListingCreateArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobListings.
     * @param {JobListingCreateManyArgs} args - Arguments to create many JobListings.
     * @example
     * // Create many JobListings
     * const jobListing = await prisma.jobListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobListingCreateManyArgs>(args?: SelectSubset<T, JobListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobListings and returns the data saved in the database.
     * @param {JobListingCreateManyAndReturnArgs} args - Arguments to create many JobListings.
     * @example
     * // Create many JobListings
     * const jobListing = await prisma.jobListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobListings and only return the `id`
     * const jobListingWithIdOnly = await prisma.jobListing.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobListingCreateManyAndReturnArgs>(args?: SelectSubset<T, JobListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobListing.
     * @param {JobListingDeleteArgs} args - Arguments to delete one JobListing.
     * @example
     * // Delete one JobListing
     * const JobListing = await prisma.jobListing.delete({
     *   where: {
     *     // ... filter to delete one JobListing
     *   }
     * })
     * 
     */
    delete<T extends JobListingDeleteArgs>(args: SelectSubset<T, JobListingDeleteArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobListing.
     * @param {JobListingUpdateArgs} args - Arguments to update one JobListing.
     * @example
     * // Update one JobListing
     * const jobListing = await prisma.jobListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobListingUpdateArgs>(args: SelectSubset<T, JobListingUpdateArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobListings.
     * @param {JobListingDeleteManyArgs} args - Arguments to filter JobListings to delete.
     * @example
     * // Delete a few JobListings
     * const { count } = await prisma.jobListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobListingDeleteManyArgs>(args?: SelectSubset<T, JobListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobListings
     * const jobListing = await prisma.jobListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobListingUpdateManyArgs>(args: SelectSubset<T, JobListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobListing.
     * @param {JobListingUpsertArgs} args - Arguments to update or create a JobListing.
     * @example
     * // Update or create a JobListing
     * const jobListing = await prisma.jobListing.upsert({
     *   create: {
     *     // ... data to create a JobListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobListing we want to update
     *   }
     * })
     */
    upsert<T extends JobListingUpsertArgs>(args: SelectSubset<T, JobListingUpsertArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingCountArgs} args - Arguments to filter JobListings to count.
     * @example
     * // Count the number of JobListings
     * const count = await prisma.jobListing.count({
     *   where: {
     *     // ... the filter for the JobListings we want to count
     *   }
     * })
    **/
    count<T extends JobListingCountArgs>(
      args?: Subset<T, JobListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobListingAggregateArgs>(args: Subset<T, JobListingAggregateArgs>): Prisma.PrismaPromise<GetJobListingAggregateType<T>>

    /**
     * Group by JobListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobListingGroupByArgs['orderBy'] }
        : { orderBy?: JobListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobListing model
   */
  readonly fields: JobListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recruiter<T extends JobListing$recruiterArgs<ExtArgs> = {}>(args?: Subset<T, JobListing$recruiterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    bookmarks<T extends JobListing$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, JobListing$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobListing model
   */ 
  interface JobListingFieldRefs {
    readonly id: FieldRef<"JobListing", 'String'>
    readonly company: FieldRef<"JobListing", 'String'>
    readonly position: FieldRef<"JobListing", 'String'>
    readonly location: FieldRef<"JobListing", 'String'>
    readonly career: FieldRef<"JobListing", 'String'>
    readonly education: FieldRef<"JobListing", 'String'>
    readonly employType: FieldRef<"JobListing", 'String'>
    readonly salary: FieldRef<"JobListing", 'String'>
    readonly deadline: FieldRef<"JobListing", 'DateTime'>
    readonly url: FieldRef<"JobListing", 'String'>
    readonly description: FieldRef<"JobListing", 'String'>
    readonly tags: FieldRef<"JobListing", 'String'>
    readonly source: FieldRef<"JobListing", 'String'>
    readonly isActive: FieldRef<"JobListing", 'Boolean'>
    readonly recruiterId: FieldRef<"JobListing", 'String'>
    readonly createdAt: FieldRef<"JobListing", 'DateTime'>
    readonly updatedAt: FieldRef<"JobListing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobListing findUnique
   */
  export type JobListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing findUniqueOrThrow
   */
  export type JobListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing findFirst
   */
  export type JobListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobListings.
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobListings.
     */
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * JobListing findFirstOrThrow
   */
  export type JobListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobListings.
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobListings.
     */
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * JobListing findMany
   */
  export type JobListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListings to fetch.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobListings.
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * JobListing create
   */
  export type JobListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * The data needed to create a JobListing.
     */
    data: XOR<JobListingCreateInput, JobListingUncheckedCreateInput>
  }

  /**
   * JobListing createMany
   */
  export type JobListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobListings.
     */
    data: JobListingCreateManyInput | JobListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobListing createManyAndReturn
   */
  export type JobListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobListings.
     */
    data: JobListingCreateManyInput | JobListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobListing update
   */
  export type JobListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * The data needed to update a JobListing.
     */
    data: XOR<JobListingUpdateInput, JobListingUncheckedUpdateInput>
    /**
     * Choose, which JobListing to update.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing updateMany
   */
  export type JobListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobListings.
     */
    data: XOR<JobListingUpdateManyMutationInput, JobListingUncheckedUpdateManyInput>
    /**
     * Filter which JobListings to update
     */
    where?: JobListingWhereInput
  }

  /**
   * JobListing upsert
   */
  export type JobListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * The filter to search for the JobListing to update in case it exists.
     */
    where: JobListingWhereUniqueInput
    /**
     * In case the JobListing found by the `where` argument doesn't exist, create a new JobListing with this data.
     */
    create: XOR<JobListingCreateInput, JobListingUncheckedCreateInput>
    /**
     * In case the JobListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobListingUpdateInput, JobListingUncheckedUpdateInput>
  }

  /**
   * JobListing delete
   */
  export type JobListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter which JobListing to delete.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing deleteMany
   */
  export type JobListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobListings to delete
     */
    where?: JobListingWhereInput
  }

  /**
   * JobListing.recruiter
   */
  export type JobListing$recruiterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * JobListing.bookmarks
   */
  export type JobListing$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    where?: JobBookmarkWhereInput
    orderBy?: JobBookmarkOrderByWithRelationInput | JobBookmarkOrderByWithRelationInput[]
    cursor?: JobBookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobBookmarkScalarFieldEnum | JobBookmarkScalarFieldEnum[]
  }

  /**
   * JobListing without action
   */
  export type JobListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
  }


  /**
   * Model JobBookmark
   */

  export type AggregateJobBookmark = {
    _count: JobBookmarkCountAggregateOutputType | null
    _min: JobBookmarkMinAggregateOutputType | null
    _max: JobBookmarkMaxAggregateOutputType | null
  }

  export type JobBookmarkMinAggregateOutputType = {
    id: string | null
    userId: string | null
    listingId: string | null
    createdAt: Date | null
  }

  export type JobBookmarkMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    listingId: string | null
    createdAt: Date | null
  }

  export type JobBookmarkCountAggregateOutputType = {
    id: number
    userId: number
    listingId: number
    createdAt: number
    _all: number
  }


  export type JobBookmarkMinAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
  }

  export type JobBookmarkMaxAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
  }

  export type JobBookmarkCountAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
    _all?: true
  }

  export type JobBookmarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobBookmark to aggregate.
     */
    where?: JobBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobBookmarks to fetch.
     */
    orderBy?: JobBookmarkOrderByWithRelationInput | JobBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobBookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobBookmarks
    **/
    _count?: true | JobBookmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobBookmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobBookmarkMaxAggregateInputType
  }

  export type GetJobBookmarkAggregateType<T extends JobBookmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateJobBookmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobBookmark[P]>
      : GetScalarType<T[P], AggregateJobBookmark[P]>
  }




  export type JobBookmarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobBookmarkWhereInput
    orderBy?: JobBookmarkOrderByWithAggregationInput | JobBookmarkOrderByWithAggregationInput[]
    by: JobBookmarkScalarFieldEnum[] | JobBookmarkScalarFieldEnum
    having?: JobBookmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobBookmarkCountAggregateInputType | true
    _min?: JobBookmarkMinAggregateInputType
    _max?: JobBookmarkMaxAggregateInputType
  }

  export type JobBookmarkGroupByOutputType = {
    id: string
    userId: string
    listingId: string
    createdAt: Date
    _count: JobBookmarkCountAggregateOutputType | null
    _min: JobBookmarkMinAggregateOutputType | null
    _max: JobBookmarkMaxAggregateOutputType | null
  }

  type GetJobBookmarkGroupByPayload<T extends JobBookmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobBookmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobBookmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobBookmarkGroupByOutputType[P]>
            : GetScalarType<T[P], JobBookmarkGroupByOutputType[P]>
        }
      >
    >


  export type JobBookmarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | JobListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobBookmark"]>

  export type JobBookmarkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | JobListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobBookmark"]>

  export type JobBookmarkSelectScalar = {
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
  }

  export type JobBookmarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | JobListingDefaultArgs<ExtArgs>
  }
  export type JobBookmarkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | JobListingDefaultArgs<ExtArgs>
  }

  export type $JobBookmarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobBookmark"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listing: Prisma.$JobListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      listingId: string
      createdAt: Date
    }, ExtArgs["result"]["jobBookmark"]>
    composites: {}
  }

  type JobBookmarkGetPayload<S extends boolean | null | undefined | JobBookmarkDefaultArgs> = $Result.GetResult<Prisma.$JobBookmarkPayload, S>

  type JobBookmarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobBookmarkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobBookmarkCountAggregateInputType | true
    }

  export interface JobBookmarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobBookmark'], meta: { name: 'JobBookmark' } }
    /**
     * Find zero or one JobBookmark that matches the filter.
     * @param {JobBookmarkFindUniqueArgs} args - Arguments to find a JobBookmark
     * @example
     * // Get one JobBookmark
     * const jobBookmark = await prisma.jobBookmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobBookmarkFindUniqueArgs>(args: SelectSubset<T, JobBookmarkFindUniqueArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobBookmark that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobBookmarkFindUniqueOrThrowArgs} args - Arguments to find a JobBookmark
     * @example
     * // Get one JobBookmark
     * const jobBookmark = await prisma.jobBookmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobBookmarkFindUniqueOrThrowArgs>(args: SelectSubset<T, JobBookmarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobBookmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobBookmarkFindFirstArgs} args - Arguments to find a JobBookmark
     * @example
     * // Get one JobBookmark
     * const jobBookmark = await prisma.jobBookmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobBookmarkFindFirstArgs>(args?: SelectSubset<T, JobBookmarkFindFirstArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobBookmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobBookmarkFindFirstOrThrowArgs} args - Arguments to find a JobBookmark
     * @example
     * // Get one JobBookmark
     * const jobBookmark = await prisma.jobBookmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobBookmarkFindFirstOrThrowArgs>(args?: SelectSubset<T, JobBookmarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobBookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobBookmarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobBookmarks
     * const jobBookmarks = await prisma.jobBookmark.findMany()
     * 
     * // Get first 10 JobBookmarks
     * const jobBookmarks = await prisma.jobBookmark.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobBookmarkWithIdOnly = await prisma.jobBookmark.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobBookmarkFindManyArgs>(args?: SelectSubset<T, JobBookmarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobBookmark.
     * @param {JobBookmarkCreateArgs} args - Arguments to create a JobBookmark.
     * @example
     * // Create one JobBookmark
     * const JobBookmark = await prisma.jobBookmark.create({
     *   data: {
     *     // ... data to create a JobBookmark
     *   }
     * })
     * 
     */
    create<T extends JobBookmarkCreateArgs>(args: SelectSubset<T, JobBookmarkCreateArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobBookmarks.
     * @param {JobBookmarkCreateManyArgs} args - Arguments to create many JobBookmarks.
     * @example
     * // Create many JobBookmarks
     * const jobBookmark = await prisma.jobBookmark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobBookmarkCreateManyArgs>(args?: SelectSubset<T, JobBookmarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobBookmarks and returns the data saved in the database.
     * @param {JobBookmarkCreateManyAndReturnArgs} args - Arguments to create many JobBookmarks.
     * @example
     * // Create many JobBookmarks
     * const jobBookmark = await prisma.jobBookmark.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobBookmarks and only return the `id`
     * const jobBookmarkWithIdOnly = await prisma.jobBookmark.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobBookmarkCreateManyAndReturnArgs>(args?: SelectSubset<T, JobBookmarkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobBookmark.
     * @param {JobBookmarkDeleteArgs} args - Arguments to delete one JobBookmark.
     * @example
     * // Delete one JobBookmark
     * const JobBookmark = await prisma.jobBookmark.delete({
     *   where: {
     *     // ... filter to delete one JobBookmark
     *   }
     * })
     * 
     */
    delete<T extends JobBookmarkDeleteArgs>(args: SelectSubset<T, JobBookmarkDeleteArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobBookmark.
     * @param {JobBookmarkUpdateArgs} args - Arguments to update one JobBookmark.
     * @example
     * // Update one JobBookmark
     * const jobBookmark = await prisma.jobBookmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobBookmarkUpdateArgs>(args: SelectSubset<T, JobBookmarkUpdateArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobBookmarks.
     * @param {JobBookmarkDeleteManyArgs} args - Arguments to filter JobBookmarks to delete.
     * @example
     * // Delete a few JobBookmarks
     * const { count } = await prisma.jobBookmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobBookmarkDeleteManyArgs>(args?: SelectSubset<T, JobBookmarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobBookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobBookmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobBookmarks
     * const jobBookmark = await prisma.jobBookmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobBookmarkUpdateManyArgs>(args: SelectSubset<T, JobBookmarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobBookmark.
     * @param {JobBookmarkUpsertArgs} args - Arguments to update or create a JobBookmark.
     * @example
     * // Update or create a JobBookmark
     * const jobBookmark = await prisma.jobBookmark.upsert({
     *   create: {
     *     // ... data to create a JobBookmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobBookmark we want to update
     *   }
     * })
     */
    upsert<T extends JobBookmarkUpsertArgs>(args: SelectSubset<T, JobBookmarkUpsertArgs<ExtArgs>>): Prisma__JobBookmarkClient<$Result.GetResult<Prisma.$JobBookmarkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobBookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobBookmarkCountArgs} args - Arguments to filter JobBookmarks to count.
     * @example
     * // Count the number of JobBookmarks
     * const count = await prisma.jobBookmark.count({
     *   where: {
     *     // ... the filter for the JobBookmarks we want to count
     *   }
     * })
    **/
    count<T extends JobBookmarkCountArgs>(
      args?: Subset<T, JobBookmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobBookmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobBookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobBookmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobBookmarkAggregateArgs>(args: Subset<T, JobBookmarkAggregateArgs>): Prisma.PrismaPromise<GetJobBookmarkAggregateType<T>>

    /**
     * Group by JobBookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobBookmarkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobBookmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobBookmarkGroupByArgs['orderBy'] }
        : { orderBy?: JobBookmarkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobBookmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobBookmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobBookmark model
   */
  readonly fields: JobBookmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobBookmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobBookmarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    listing<T extends JobListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobListingDefaultArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobBookmark model
   */ 
  interface JobBookmarkFieldRefs {
    readonly id: FieldRef<"JobBookmark", 'String'>
    readonly userId: FieldRef<"JobBookmark", 'String'>
    readonly listingId: FieldRef<"JobBookmark", 'String'>
    readonly createdAt: FieldRef<"JobBookmark", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobBookmark findUnique
   */
  export type JobBookmarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which JobBookmark to fetch.
     */
    where: JobBookmarkWhereUniqueInput
  }

  /**
   * JobBookmark findUniqueOrThrow
   */
  export type JobBookmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which JobBookmark to fetch.
     */
    where: JobBookmarkWhereUniqueInput
  }

  /**
   * JobBookmark findFirst
   */
  export type JobBookmarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which JobBookmark to fetch.
     */
    where?: JobBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobBookmarks to fetch.
     */
    orderBy?: JobBookmarkOrderByWithRelationInput | JobBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobBookmarks.
     */
    cursor?: JobBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobBookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobBookmarks.
     */
    distinct?: JobBookmarkScalarFieldEnum | JobBookmarkScalarFieldEnum[]
  }

  /**
   * JobBookmark findFirstOrThrow
   */
  export type JobBookmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which JobBookmark to fetch.
     */
    where?: JobBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobBookmarks to fetch.
     */
    orderBy?: JobBookmarkOrderByWithRelationInput | JobBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobBookmarks.
     */
    cursor?: JobBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobBookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobBookmarks.
     */
    distinct?: JobBookmarkScalarFieldEnum | JobBookmarkScalarFieldEnum[]
  }

  /**
   * JobBookmark findMany
   */
  export type JobBookmarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which JobBookmarks to fetch.
     */
    where?: JobBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobBookmarks to fetch.
     */
    orderBy?: JobBookmarkOrderByWithRelationInput | JobBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobBookmarks.
     */
    cursor?: JobBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobBookmarks.
     */
    skip?: number
    distinct?: JobBookmarkScalarFieldEnum | JobBookmarkScalarFieldEnum[]
  }

  /**
   * JobBookmark create
   */
  export type JobBookmarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a JobBookmark.
     */
    data: XOR<JobBookmarkCreateInput, JobBookmarkUncheckedCreateInput>
  }

  /**
   * JobBookmark createMany
   */
  export type JobBookmarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobBookmarks.
     */
    data: JobBookmarkCreateManyInput | JobBookmarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobBookmark createManyAndReturn
   */
  export type JobBookmarkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobBookmarks.
     */
    data: JobBookmarkCreateManyInput | JobBookmarkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobBookmark update
   */
  export type JobBookmarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a JobBookmark.
     */
    data: XOR<JobBookmarkUpdateInput, JobBookmarkUncheckedUpdateInput>
    /**
     * Choose, which JobBookmark to update.
     */
    where: JobBookmarkWhereUniqueInput
  }

  /**
   * JobBookmark updateMany
   */
  export type JobBookmarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobBookmarks.
     */
    data: XOR<JobBookmarkUpdateManyMutationInput, JobBookmarkUncheckedUpdateManyInput>
    /**
     * Filter which JobBookmarks to update
     */
    where?: JobBookmarkWhereInput
  }

  /**
   * JobBookmark upsert
   */
  export type JobBookmarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the JobBookmark to update in case it exists.
     */
    where: JobBookmarkWhereUniqueInput
    /**
     * In case the JobBookmark found by the `where` argument doesn't exist, create a new JobBookmark with this data.
     */
    create: XOR<JobBookmarkCreateInput, JobBookmarkUncheckedCreateInput>
    /**
     * In case the JobBookmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobBookmarkUpdateInput, JobBookmarkUncheckedUpdateInput>
  }

  /**
   * JobBookmark delete
   */
  export type JobBookmarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
    /**
     * Filter which JobBookmark to delete.
     */
    where: JobBookmarkWhereUniqueInput
  }

  /**
   * JobBookmark deleteMany
   */
  export type JobBookmarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobBookmarks to delete
     */
    where?: JobBookmarkWhereInput
  }

  /**
   * JobBookmark without action
   */
  export type JobBookmarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobBookmark
     */
    select?: JobBookmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobBookmarkInclude<ExtArgs> | null
  }


  /**
   * Model EmploymentRecord
   */

  export type AggregateEmploymentRecord = {
    _count: EmploymentRecordCountAggregateOutputType | null
    _min: EmploymentRecordMinAggregateOutputType | null
    _max: EmploymentRecordMaxAggregateOutputType | null
  }

  export type EmploymentRecordMinAggregateOutputType = {
    id: string | null
    userId: string | null
    company: string | null
    position: string | null
    employType: string | null
    startDate: Date | null
    salary: string | null
    note: string | null
    confirmedAt: Date | null
    createdAt: Date | null
  }

  export type EmploymentRecordMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    company: string | null
    position: string | null
    employType: string | null
    startDate: Date | null
    salary: string | null
    note: string | null
    confirmedAt: Date | null
    createdAt: Date | null
  }

  export type EmploymentRecordCountAggregateOutputType = {
    id: number
    userId: number
    company: number
    position: number
    employType: number
    startDate: number
    salary: number
    note: number
    confirmedAt: number
    createdAt: number
    _all: number
  }


  export type EmploymentRecordMinAggregateInputType = {
    id?: true
    userId?: true
    company?: true
    position?: true
    employType?: true
    startDate?: true
    salary?: true
    note?: true
    confirmedAt?: true
    createdAt?: true
  }

  export type EmploymentRecordMaxAggregateInputType = {
    id?: true
    userId?: true
    company?: true
    position?: true
    employType?: true
    startDate?: true
    salary?: true
    note?: true
    confirmedAt?: true
    createdAt?: true
  }

  export type EmploymentRecordCountAggregateInputType = {
    id?: true
    userId?: true
    company?: true
    position?: true
    employType?: true
    startDate?: true
    salary?: true
    note?: true
    confirmedAt?: true
    createdAt?: true
    _all?: true
  }

  export type EmploymentRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmploymentRecord to aggregate.
     */
    where?: EmploymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmploymentRecords to fetch.
     */
    orderBy?: EmploymentRecordOrderByWithRelationInput | EmploymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmploymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmploymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmploymentRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmploymentRecords
    **/
    _count?: true | EmploymentRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmploymentRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmploymentRecordMaxAggregateInputType
  }

  export type GetEmploymentRecordAggregateType<T extends EmploymentRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateEmploymentRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmploymentRecord[P]>
      : GetScalarType<T[P], AggregateEmploymentRecord[P]>
  }




  export type EmploymentRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmploymentRecordWhereInput
    orderBy?: EmploymentRecordOrderByWithAggregationInput | EmploymentRecordOrderByWithAggregationInput[]
    by: EmploymentRecordScalarFieldEnum[] | EmploymentRecordScalarFieldEnum
    having?: EmploymentRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmploymentRecordCountAggregateInputType | true
    _min?: EmploymentRecordMinAggregateInputType
    _max?: EmploymentRecordMaxAggregateInputType
  }

  export type EmploymentRecordGroupByOutputType = {
    id: string
    userId: string
    company: string
    position: string
    employType: string | null
    startDate: Date | null
    salary: string | null
    note: string | null
    confirmedAt: Date
    createdAt: Date
    _count: EmploymentRecordCountAggregateOutputType | null
    _min: EmploymentRecordMinAggregateOutputType | null
    _max: EmploymentRecordMaxAggregateOutputType | null
  }

  type GetEmploymentRecordGroupByPayload<T extends EmploymentRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmploymentRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmploymentRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmploymentRecordGroupByOutputType[P]>
            : GetScalarType<T[P], EmploymentRecordGroupByOutputType[P]>
        }
      >
    >


  export type EmploymentRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    company?: boolean
    position?: boolean
    employType?: boolean
    startDate?: boolean
    salary?: boolean
    note?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["employmentRecord"]>

  export type EmploymentRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    company?: boolean
    position?: boolean
    employType?: boolean
    startDate?: boolean
    salary?: boolean
    note?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["employmentRecord"]>

  export type EmploymentRecordSelectScalar = {
    id?: boolean
    userId?: boolean
    company?: boolean
    position?: boolean
    employType?: boolean
    startDate?: boolean
    salary?: boolean
    note?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
  }


  export type $EmploymentRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmploymentRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      company: string
      position: string
      employType: string | null
      startDate: Date | null
      salary: string | null
      note: string | null
      confirmedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["employmentRecord"]>
    composites: {}
  }

  type EmploymentRecordGetPayload<S extends boolean | null | undefined | EmploymentRecordDefaultArgs> = $Result.GetResult<Prisma.$EmploymentRecordPayload, S>

  type EmploymentRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmploymentRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmploymentRecordCountAggregateInputType | true
    }

  export interface EmploymentRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmploymentRecord'], meta: { name: 'EmploymentRecord' } }
    /**
     * Find zero or one EmploymentRecord that matches the filter.
     * @param {EmploymentRecordFindUniqueArgs} args - Arguments to find a EmploymentRecord
     * @example
     * // Get one EmploymentRecord
     * const employmentRecord = await prisma.employmentRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmploymentRecordFindUniqueArgs>(args: SelectSubset<T, EmploymentRecordFindUniqueArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EmploymentRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmploymentRecordFindUniqueOrThrowArgs} args - Arguments to find a EmploymentRecord
     * @example
     * // Get one EmploymentRecord
     * const employmentRecord = await prisma.employmentRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmploymentRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, EmploymentRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EmploymentRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentRecordFindFirstArgs} args - Arguments to find a EmploymentRecord
     * @example
     * // Get one EmploymentRecord
     * const employmentRecord = await prisma.employmentRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmploymentRecordFindFirstArgs>(args?: SelectSubset<T, EmploymentRecordFindFirstArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EmploymentRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentRecordFindFirstOrThrowArgs} args - Arguments to find a EmploymentRecord
     * @example
     * // Get one EmploymentRecord
     * const employmentRecord = await prisma.employmentRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmploymentRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, EmploymentRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EmploymentRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmploymentRecords
     * const employmentRecords = await prisma.employmentRecord.findMany()
     * 
     * // Get first 10 EmploymentRecords
     * const employmentRecords = await prisma.employmentRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employmentRecordWithIdOnly = await prisma.employmentRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmploymentRecordFindManyArgs>(args?: SelectSubset<T, EmploymentRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EmploymentRecord.
     * @param {EmploymentRecordCreateArgs} args - Arguments to create a EmploymentRecord.
     * @example
     * // Create one EmploymentRecord
     * const EmploymentRecord = await prisma.employmentRecord.create({
     *   data: {
     *     // ... data to create a EmploymentRecord
     *   }
     * })
     * 
     */
    create<T extends EmploymentRecordCreateArgs>(args: SelectSubset<T, EmploymentRecordCreateArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EmploymentRecords.
     * @param {EmploymentRecordCreateManyArgs} args - Arguments to create many EmploymentRecords.
     * @example
     * // Create many EmploymentRecords
     * const employmentRecord = await prisma.employmentRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmploymentRecordCreateManyArgs>(args?: SelectSubset<T, EmploymentRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmploymentRecords and returns the data saved in the database.
     * @param {EmploymentRecordCreateManyAndReturnArgs} args - Arguments to create many EmploymentRecords.
     * @example
     * // Create many EmploymentRecords
     * const employmentRecord = await prisma.employmentRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmploymentRecords and only return the `id`
     * const employmentRecordWithIdOnly = await prisma.employmentRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmploymentRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, EmploymentRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EmploymentRecord.
     * @param {EmploymentRecordDeleteArgs} args - Arguments to delete one EmploymentRecord.
     * @example
     * // Delete one EmploymentRecord
     * const EmploymentRecord = await prisma.employmentRecord.delete({
     *   where: {
     *     // ... filter to delete one EmploymentRecord
     *   }
     * })
     * 
     */
    delete<T extends EmploymentRecordDeleteArgs>(args: SelectSubset<T, EmploymentRecordDeleteArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EmploymentRecord.
     * @param {EmploymentRecordUpdateArgs} args - Arguments to update one EmploymentRecord.
     * @example
     * // Update one EmploymentRecord
     * const employmentRecord = await prisma.employmentRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmploymentRecordUpdateArgs>(args: SelectSubset<T, EmploymentRecordUpdateArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EmploymentRecords.
     * @param {EmploymentRecordDeleteManyArgs} args - Arguments to filter EmploymentRecords to delete.
     * @example
     * // Delete a few EmploymentRecords
     * const { count } = await prisma.employmentRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmploymentRecordDeleteManyArgs>(args?: SelectSubset<T, EmploymentRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmploymentRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmploymentRecords
     * const employmentRecord = await prisma.employmentRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmploymentRecordUpdateManyArgs>(args: SelectSubset<T, EmploymentRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmploymentRecord.
     * @param {EmploymentRecordUpsertArgs} args - Arguments to update or create a EmploymentRecord.
     * @example
     * // Update or create a EmploymentRecord
     * const employmentRecord = await prisma.employmentRecord.upsert({
     *   create: {
     *     // ... data to create a EmploymentRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmploymentRecord we want to update
     *   }
     * })
     */
    upsert<T extends EmploymentRecordUpsertArgs>(args: SelectSubset<T, EmploymentRecordUpsertArgs<ExtArgs>>): Prisma__EmploymentRecordClient<$Result.GetResult<Prisma.$EmploymentRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EmploymentRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentRecordCountArgs} args - Arguments to filter EmploymentRecords to count.
     * @example
     * // Count the number of EmploymentRecords
     * const count = await prisma.employmentRecord.count({
     *   where: {
     *     // ... the filter for the EmploymentRecords we want to count
     *   }
     * })
    **/
    count<T extends EmploymentRecordCountArgs>(
      args?: Subset<T, EmploymentRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmploymentRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmploymentRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmploymentRecordAggregateArgs>(args: Subset<T, EmploymentRecordAggregateArgs>): Prisma.PrismaPromise<GetEmploymentRecordAggregateType<T>>

    /**
     * Group by EmploymentRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmploymentRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmploymentRecordGroupByArgs['orderBy'] }
        : { orderBy?: EmploymentRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmploymentRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmploymentRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmploymentRecord model
   */
  readonly fields: EmploymentRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmploymentRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmploymentRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmploymentRecord model
   */ 
  interface EmploymentRecordFieldRefs {
    readonly id: FieldRef<"EmploymentRecord", 'String'>
    readonly userId: FieldRef<"EmploymentRecord", 'String'>
    readonly company: FieldRef<"EmploymentRecord", 'String'>
    readonly position: FieldRef<"EmploymentRecord", 'String'>
    readonly employType: FieldRef<"EmploymentRecord", 'String'>
    readonly startDate: FieldRef<"EmploymentRecord", 'DateTime'>
    readonly salary: FieldRef<"EmploymentRecord", 'String'>
    readonly note: FieldRef<"EmploymentRecord", 'String'>
    readonly confirmedAt: FieldRef<"EmploymentRecord", 'DateTime'>
    readonly createdAt: FieldRef<"EmploymentRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmploymentRecord findUnique
   */
  export type EmploymentRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * Filter, which EmploymentRecord to fetch.
     */
    where: EmploymentRecordWhereUniqueInput
  }

  /**
   * EmploymentRecord findUniqueOrThrow
   */
  export type EmploymentRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * Filter, which EmploymentRecord to fetch.
     */
    where: EmploymentRecordWhereUniqueInput
  }

  /**
   * EmploymentRecord findFirst
   */
  export type EmploymentRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * Filter, which EmploymentRecord to fetch.
     */
    where?: EmploymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmploymentRecords to fetch.
     */
    orderBy?: EmploymentRecordOrderByWithRelationInput | EmploymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmploymentRecords.
     */
    cursor?: EmploymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmploymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmploymentRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmploymentRecords.
     */
    distinct?: EmploymentRecordScalarFieldEnum | EmploymentRecordScalarFieldEnum[]
  }

  /**
   * EmploymentRecord findFirstOrThrow
   */
  export type EmploymentRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * Filter, which EmploymentRecord to fetch.
     */
    where?: EmploymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmploymentRecords to fetch.
     */
    orderBy?: EmploymentRecordOrderByWithRelationInput | EmploymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmploymentRecords.
     */
    cursor?: EmploymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmploymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmploymentRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmploymentRecords.
     */
    distinct?: EmploymentRecordScalarFieldEnum | EmploymentRecordScalarFieldEnum[]
  }

  /**
   * EmploymentRecord findMany
   */
  export type EmploymentRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * Filter, which EmploymentRecords to fetch.
     */
    where?: EmploymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmploymentRecords to fetch.
     */
    orderBy?: EmploymentRecordOrderByWithRelationInput | EmploymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmploymentRecords.
     */
    cursor?: EmploymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmploymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmploymentRecords.
     */
    skip?: number
    distinct?: EmploymentRecordScalarFieldEnum | EmploymentRecordScalarFieldEnum[]
  }

  /**
   * EmploymentRecord create
   */
  export type EmploymentRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * The data needed to create a EmploymentRecord.
     */
    data: XOR<EmploymentRecordCreateInput, EmploymentRecordUncheckedCreateInput>
  }

  /**
   * EmploymentRecord createMany
   */
  export type EmploymentRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmploymentRecords.
     */
    data: EmploymentRecordCreateManyInput | EmploymentRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmploymentRecord createManyAndReturn
   */
  export type EmploymentRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EmploymentRecords.
     */
    data: EmploymentRecordCreateManyInput | EmploymentRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmploymentRecord update
   */
  export type EmploymentRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * The data needed to update a EmploymentRecord.
     */
    data: XOR<EmploymentRecordUpdateInput, EmploymentRecordUncheckedUpdateInput>
    /**
     * Choose, which EmploymentRecord to update.
     */
    where: EmploymentRecordWhereUniqueInput
  }

  /**
   * EmploymentRecord updateMany
   */
  export type EmploymentRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmploymentRecords.
     */
    data: XOR<EmploymentRecordUpdateManyMutationInput, EmploymentRecordUncheckedUpdateManyInput>
    /**
     * Filter which EmploymentRecords to update
     */
    where?: EmploymentRecordWhereInput
  }

  /**
   * EmploymentRecord upsert
   */
  export type EmploymentRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * The filter to search for the EmploymentRecord to update in case it exists.
     */
    where: EmploymentRecordWhereUniqueInput
    /**
     * In case the EmploymentRecord found by the `where` argument doesn't exist, create a new EmploymentRecord with this data.
     */
    create: XOR<EmploymentRecordCreateInput, EmploymentRecordUncheckedCreateInput>
    /**
     * In case the EmploymentRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmploymentRecordUpdateInput, EmploymentRecordUncheckedUpdateInput>
  }

  /**
   * EmploymentRecord delete
   */
  export type EmploymentRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
    /**
     * Filter which EmploymentRecord to delete.
     */
    where: EmploymentRecordWhereUniqueInput
  }

  /**
   * EmploymentRecord deleteMany
   */
  export type EmploymentRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmploymentRecords to delete
     */
    where?: EmploymentRecordWhereInput
  }

  /**
   * EmploymentRecord without action
   */
  export type EmploymentRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmploymentRecord
     */
    select?: EmploymentRecordSelect<ExtArgs> | null
  }


  /**
   * Model Notice
   */

  export type AggregateNotice = {
    _count: NoticeCountAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  export type NoticeMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    isPinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoticeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    isPinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoticeCountAggregateOutputType = {
    id: number
    title: number
    content: number
    isPinned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NoticeMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    isPinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoticeMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    isPinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoticeCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    isPinned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NoticeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notice to aggregate.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notices
    **/
    _count?: true | NoticeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoticeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoticeMaxAggregateInputType
  }

  export type GetNoticeAggregateType<T extends NoticeAggregateArgs> = {
        [P in keyof T & keyof AggregateNotice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotice[P]>
      : GetScalarType<T[P], AggregateNotice[P]>
  }




  export type NoticeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoticeWhereInput
    orderBy?: NoticeOrderByWithAggregationInput | NoticeOrderByWithAggregationInput[]
    by: NoticeScalarFieldEnum[] | NoticeScalarFieldEnum
    having?: NoticeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoticeCountAggregateInputType | true
    _min?: NoticeMinAggregateInputType
    _max?: NoticeMaxAggregateInputType
  }

  export type NoticeGroupByOutputType = {
    id: string
    title: string
    content: string
    isPinned: boolean
    createdAt: Date
    updatedAt: Date
    _count: NoticeCountAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  type GetNoticeGroupByPayload<T extends NoticeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoticeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoticeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoticeGroupByOutputType[P]>
            : GetScalarType<T[P], NoticeGroupByOutputType[P]>
        }
      >
    >


  export type NoticeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    isPinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notice"]>

  export type NoticeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    isPinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notice"]>

  export type NoticeSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    isPinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $NoticePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notice"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      isPinned: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notice"]>
    composites: {}
  }

  type NoticeGetPayload<S extends boolean | null | undefined | NoticeDefaultArgs> = $Result.GetResult<Prisma.$NoticePayload, S>

  type NoticeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NoticeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NoticeCountAggregateInputType | true
    }

  export interface NoticeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notice'], meta: { name: 'Notice' } }
    /**
     * Find zero or one Notice that matches the filter.
     * @param {NoticeFindUniqueArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoticeFindUniqueArgs>(args: SelectSubset<T, NoticeFindUniqueArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NoticeFindUniqueOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoticeFindUniqueOrThrowArgs>(args: SelectSubset<T, NoticeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoticeFindFirstArgs>(args?: SelectSubset<T, NoticeFindFirstArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoticeFindFirstOrThrowArgs>(args?: SelectSubset<T, NoticeFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notices
     * const notices = await prisma.notice.findMany()
     * 
     * // Get first 10 Notices
     * const notices = await prisma.notice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noticeWithIdOnly = await prisma.notice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoticeFindManyArgs>(args?: SelectSubset<T, NoticeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notice.
     * @param {NoticeCreateArgs} args - Arguments to create a Notice.
     * @example
     * // Create one Notice
     * const Notice = await prisma.notice.create({
     *   data: {
     *     // ... data to create a Notice
     *   }
     * })
     * 
     */
    create<T extends NoticeCreateArgs>(args: SelectSubset<T, NoticeCreateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notices.
     * @param {NoticeCreateManyArgs} args - Arguments to create many Notices.
     * @example
     * // Create many Notices
     * const notice = await prisma.notice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoticeCreateManyArgs>(args?: SelectSubset<T, NoticeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notices and returns the data saved in the database.
     * @param {NoticeCreateManyAndReturnArgs} args - Arguments to create many Notices.
     * @example
     * // Create many Notices
     * const notice = await prisma.notice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notices and only return the `id`
     * const noticeWithIdOnly = await prisma.notice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoticeCreateManyAndReturnArgs>(args?: SelectSubset<T, NoticeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notice.
     * @param {NoticeDeleteArgs} args - Arguments to delete one Notice.
     * @example
     * // Delete one Notice
     * const Notice = await prisma.notice.delete({
     *   where: {
     *     // ... filter to delete one Notice
     *   }
     * })
     * 
     */
    delete<T extends NoticeDeleteArgs>(args: SelectSubset<T, NoticeDeleteArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notice.
     * @param {NoticeUpdateArgs} args - Arguments to update one Notice.
     * @example
     * // Update one Notice
     * const notice = await prisma.notice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoticeUpdateArgs>(args: SelectSubset<T, NoticeUpdateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notices.
     * @param {NoticeDeleteManyArgs} args - Arguments to filter Notices to delete.
     * @example
     * // Delete a few Notices
     * const { count } = await prisma.notice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoticeDeleteManyArgs>(args?: SelectSubset<T, NoticeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notices
     * const notice = await prisma.notice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoticeUpdateManyArgs>(args: SelectSubset<T, NoticeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notice.
     * @param {NoticeUpsertArgs} args - Arguments to update or create a Notice.
     * @example
     * // Update or create a Notice
     * const notice = await prisma.notice.upsert({
     *   create: {
     *     // ... data to create a Notice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notice we want to update
     *   }
     * })
     */
    upsert<T extends NoticeUpsertArgs>(args: SelectSubset<T, NoticeUpsertArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeCountArgs} args - Arguments to filter Notices to count.
     * @example
     * // Count the number of Notices
     * const count = await prisma.notice.count({
     *   where: {
     *     // ... the filter for the Notices we want to count
     *   }
     * })
    **/
    count<T extends NoticeCountArgs>(
      args?: Subset<T, NoticeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoticeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoticeAggregateArgs>(args: Subset<T, NoticeAggregateArgs>): Prisma.PrismaPromise<GetNoticeAggregateType<T>>

    /**
     * Group by Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoticeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoticeGroupByArgs['orderBy'] }
        : { orderBy?: NoticeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoticeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoticeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notice model
   */
  readonly fields: NoticeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoticeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notice model
   */ 
  interface NoticeFieldRefs {
    readonly id: FieldRef<"Notice", 'String'>
    readonly title: FieldRef<"Notice", 'String'>
    readonly content: FieldRef<"Notice", 'String'>
    readonly isPinned: FieldRef<"Notice", 'Boolean'>
    readonly createdAt: FieldRef<"Notice", 'DateTime'>
    readonly updatedAt: FieldRef<"Notice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notice findUnique
   */
  export type NoticeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findUniqueOrThrow
   */
  export type NoticeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findFirst
   */
  export type NoticeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findFirstOrThrow
   */
  export type NoticeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findMany
   */
  export type NoticeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notices to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice create
   */
  export type NoticeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * The data needed to create a Notice.
     */
    data: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
  }

  /**
   * Notice createMany
   */
  export type NoticeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notices.
     */
    data: NoticeCreateManyInput | NoticeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notice createManyAndReturn
   */
  export type NoticeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notices.
     */
    data: NoticeCreateManyInput | NoticeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notice update
   */
  export type NoticeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * The data needed to update a Notice.
     */
    data: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
    /**
     * Choose, which Notice to update.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice updateMany
   */
  export type NoticeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notices.
     */
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyInput>
    /**
     * Filter which Notices to update
     */
    where?: NoticeWhereInput
  }

  /**
   * Notice upsert
   */
  export type NoticeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * The filter to search for the Notice to update in case it exists.
     */
    where: NoticeWhereUniqueInput
    /**
     * In case the Notice found by the `where` argument doesn't exist, create a new Notice with this data.
     */
    create: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
    /**
     * In case the Notice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
  }

  /**
   * Notice delete
   */
  export type NoticeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter which Notice to delete.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice deleteMany
   */
  export type NoticeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notices to delete
     */
    where?: NoticeWhereInput
  }

  /**
   * Notice without action
   */
  export type NoticeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
  }


  /**
   * Model UserNotification
   */

  export type AggregateUserNotification = {
    _count: UserNotificationCountAggregateOutputType | null
    _min: UserNotificationMinAggregateOutputType | null
    _max: UserNotificationMaxAggregateOutputType | null
  }

  export type UserNotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    body: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type UserNotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    body: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type UserNotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    body: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type UserNotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    body?: true
    isRead?: true
    createdAt?: true
  }

  export type UserNotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    body?: true
    isRead?: true
    createdAt?: true
  }

  export type UserNotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    body?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type UserNotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserNotification to aggregate.
     */
    where?: UserNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotifications to fetch.
     */
    orderBy?: UserNotificationOrderByWithRelationInput | UserNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserNotifications
    **/
    _count?: true | UserNotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserNotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserNotificationMaxAggregateInputType
  }

  export type GetUserNotificationAggregateType<T extends UserNotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserNotification[P]>
      : GetScalarType<T[P], AggregateUserNotification[P]>
  }




  export type UserNotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserNotificationWhereInput
    orderBy?: UserNotificationOrderByWithAggregationInput | UserNotificationOrderByWithAggregationInput[]
    by: UserNotificationScalarFieldEnum[] | UserNotificationScalarFieldEnum
    having?: UserNotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserNotificationCountAggregateInputType | true
    _min?: UserNotificationMinAggregateInputType
    _max?: UserNotificationMaxAggregateInputType
  }

  export type UserNotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    body: string
    isRead: boolean
    createdAt: Date
    _count: UserNotificationCountAggregateOutputType | null
    _min: UserNotificationMinAggregateOutputType | null
    _max: UserNotificationMaxAggregateOutputType | null
  }

  type GetUserNotificationGroupByPayload<T extends UserNotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserNotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserNotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserNotificationGroupByOutputType[P]>
            : GetScalarType<T[P], UserNotificationGroupByOutputType[P]>
        }
      >
    >


  export type UserNotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    body?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userNotification"]>

  export type UserNotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    body?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userNotification"]>

  export type UserNotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    body?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type UserNotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserNotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserNotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserNotification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      body: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["userNotification"]>
    composites: {}
  }

  type UserNotificationGetPayload<S extends boolean | null | undefined | UserNotificationDefaultArgs> = $Result.GetResult<Prisma.$UserNotificationPayload, S>

  type UserNotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserNotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserNotificationCountAggregateInputType | true
    }

  export interface UserNotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserNotification'], meta: { name: 'UserNotification' } }
    /**
     * Find zero or one UserNotification that matches the filter.
     * @param {UserNotificationFindUniqueArgs} args - Arguments to find a UserNotification
     * @example
     * // Get one UserNotification
     * const userNotification = await prisma.userNotification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserNotificationFindUniqueArgs>(args: SelectSubset<T, UserNotificationFindUniqueArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserNotification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserNotificationFindUniqueOrThrowArgs} args - Arguments to find a UserNotification
     * @example
     * // Get one UserNotification
     * const userNotification = await prisma.userNotification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserNotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserNotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserNotification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationFindFirstArgs} args - Arguments to find a UserNotification
     * @example
     * // Get one UserNotification
     * const userNotification = await prisma.userNotification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserNotificationFindFirstArgs>(args?: SelectSubset<T, UserNotificationFindFirstArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserNotification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationFindFirstOrThrowArgs} args - Arguments to find a UserNotification
     * @example
     * // Get one UserNotification
     * const userNotification = await prisma.userNotification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserNotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserNotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserNotifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserNotifications
     * const userNotifications = await prisma.userNotification.findMany()
     * 
     * // Get first 10 UserNotifications
     * const userNotifications = await prisma.userNotification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userNotificationWithIdOnly = await prisma.userNotification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserNotificationFindManyArgs>(args?: SelectSubset<T, UserNotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserNotification.
     * @param {UserNotificationCreateArgs} args - Arguments to create a UserNotification.
     * @example
     * // Create one UserNotification
     * const UserNotification = await prisma.userNotification.create({
     *   data: {
     *     // ... data to create a UserNotification
     *   }
     * })
     * 
     */
    create<T extends UserNotificationCreateArgs>(args: SelectSubset<T, UserNotificationCreateArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserNotifications.
     * @param {UserNotificationCreateManyArgs} args - Arguments to create many UserNotifications.
     * @example
     * // Create many UserNotifications
     * const userNotification = await prisma.userNotification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserNotificationCreateManyArgs>(args?: SelectSubset<T, UserNotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserNotifications and returns the data saved in the database.
     * @param {UserNotificationCreateManyAndReturnArgs} args - Arguments to create many UserNotifications.
     * @example
     * // Create many UserNotifications
     * const userNotification = await prisma.userNotification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserNotifications and only return the `id`
     * const userNotificationWithIdOnly = await prisma.userNotification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserNotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserNotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserNotification.
     * @param {UserNotificationDeleteArgs} args - Arguments to delete one UserNotification.
     * @example
     * // Delete one UserNotification
     * const UserNotification = await prisma.userNotification.delete({
     *   where: {
     *     // ... filter to delete one UserNotification
     *   }
     * })
     * 
     */
    delete<T extends UserNotificationDeleteArgs>(args: SelectSubset<T, UserNotificationDeleteArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserNotification.
     * @param {UserNotificationUpdateArgs} args - Arguments to update one UserNotification.
     * @example
     * // Update one UserNotification
     * const userNotification = await prisma.userNotification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserNotificationUpdateArgs>(args: SelectSubset<T, UserNotificationUpdateArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserNotifications.
     * @param {UserNotificationDeleteManyArgs} args - Arguments to filter UserNotifications to delete.
     * @example
     * // Delete a few UserNotifications
     * const { count } = await prisma.userNotification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserNotificationDeleteManyArgs>(args?: SelectSubset<T, UserNotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserNotifications
     * const userNotification = await prisma.userNotification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserNotificationUpdateManyArgs>(args: SelectSubset<T, UserNotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserNotification.
     * @param {UserNotificationUpsertArgs} args - Arguments to update or create a UserNotification.
     * @example
     * // Update or create a UserNotification
     * const userNotification = await prisma.userNotification.upsert({
     *   create: {
     *     // ... data to create a UserNotification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserNotification we want to update
     *   }
     * })
     */
    upsert<T extends UserNotificationUpsertArgs>(args: SelectSubset<T, UserNotificationUpsertArgs<ExtArgs>>): Prisma__UserNotificationClient<$Result.GetResult<Prisma.$UserNotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationCountArgs} args - Arguments to filter UserNotifications to count.
     * @example
     * // Count the number of UserNotifications
     * const count = await prisma.userNotification.count({
     *   where: {
     *     // ... the filter for the UserNotifications we want to count
     *   }
     * })
    **/
    count<T extends UserNotificationCountArgs>(
      args?: Subset<T, UserNotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserNotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserNotificationAggregateArgs>(args: Subset<T, UserNotificationAggregateArgs>): Prisma.PrismaPromise<GetUserNotificationAggregateType<T>>

    /**
     * Group by UserNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserNotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserNotificationGroupByArgs['orderBy'] }
        : { orderBy?: UserNotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserNotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserNotification model
   */
  readonly fields: UserNotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserNotification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserNotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserNotification model
   */ 
  interface UserNotificationFieldRefs {
    readonly id: FieldRef<"UserNotification", 'String'>
    readonly userId: FieldRef<"UserNotification", 'String'>
    readonly title: FieldRef<"UserNotification", 'String'>
    readonly body: FieldRef<"UserNotification", 'String'>
    readonly isRead: FieldRef<"UserNotification", 'Boolean'>
    readonly createdAt: FieldRef<"UserNotification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserNotification findUnique
   */
  export type UserNotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * Filter, which UserNotification to fetch.
     */
    where: UserNotificationWhereUniqueInput
  }

  /**
   * UserNotification findUniqueOrThrow
   */
  export type UserNotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * Filter, which UserNotification to fetch.
     */
    where: UserNotificationWhereUniqueInput
  }

  /**
   * UserNotification findFirst
   */
  export type UserNotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * Filter, which UserNotification to fetch.
     */
    where?: UserNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotifications to fetch.
     */
    orderBy?: UserNotificationOrderByWithRelationInput | UserNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserNotifications.
     */
    cursor?: UserNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserNotifications.
     */
    distinct?: UserNotificationScalarFieldEnum | UserNotificationScalarFieldEnum[]
  }

  /**
   * UserNotification findFirstOrThrow
   */
  export type UserNotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * Filter, which UserNotification to fetch.
     */
    where?: UserNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotifications to fetch.
     */
    orderBy?: UserNotificationOrderByWithRelationInput | UserNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserNotifications.
     */
    cursor?: UserNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserNotifications.
     */
    distinct?: UserNotificationScalarFieldEnum | UserNotificationScalarFieldEnum[]
  }

  /**
   * UserNotification findMany
   */
  export type UserNotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * Filter, which UserNotifications to fetch.
     */
    where?: UserNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotifications to fetch.
     */
    orderBy?: UserNotificationOrderByWithRelationInput | UserNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserNotifications.
     */
    cursor?: UserNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotifications.
     */
    skip?: number
    distinct?: UserNotificationScalarFieldEnum | UserNotificationScalarFieldEnum[]
  }

  /**
   * UserNotification create
   */
  export type UserNotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a UserNotification.
     */
    data: XOR<UserNotificationCreateInput, UserNotificationUncheckedCreateInput>
  }

  /**
   * UserNotification createMany
   */
  export type UserNotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserNotifications.
     */
    data: UserNotificationCreateManyInput | UserNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserNotification createManyAndReturn
   */
  export type UserNotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserNotifications.
     */
    data: UserNotificationCreateManyInput | UserNotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserNotification update
   */
  export type UserNotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserNotification.
     */
    data: XOR<UserNotificationUpdateInput, UserNotificationUncheckedUpdateInput>
    /**
     * Choose, which UserNotification to update.
     */
    where: UserNotificationWhereUniqueInput
  }

  /**
   * UserNotification updateMany
   */
  export type UserNotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserNotifications.
     */
    data: XOR<UserNotificationUpdateManyMutationInput, UserNotificationUncheckedUpdateManyInput>
    /**
     * Filter which UserNotifications to update
     */
    where?: UserNotificationWhereInput
  }

  /**
   * UserNotification upsert
   */
  export type UserNotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the UserNotification to update in case it exists.
     */
    where: UserNotificationWhereUniqueInput
    /**
     * In case the UserNotification found by the `where` argument doesn't exist, create a new UserNotification with this data.
     */
    create: XOR<UserNotificationCreateInput, UserNotificationUncheckedCreateInput>
    /**
     * In case the UserNotification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserNotificationUpdateInput, UserNotificationUncheckedUpdateInput>
  }

  /**
   * UserNotification delete
   */
  export type UserNotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
    /**
     * Filter which UserNotification to delete.
     */
    where: UserNotificationWhereUniqueInput
  }

  /**
   * UserNotification deleteMany
   */
  export type UserNotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserNotifications to delete
     */
    where?: UserNotificationWhereInput
  }

  /**
   * UserNotification without action
   */
  export type UserNotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotification
     */
    select?: UserNotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserNotificationInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expiresAt: number
    used: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    expiresAt: Date
    used: boolean
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }


  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expiresAt: Date
      used: boolean
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */ 
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly email: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly used: FieldRef<"PasswordResetToken", 'Boolean'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    major: 'major',
    targetJob: 'targetJob',
    skills: 'skills',
    role: 'role',
    companyName: 'companyName',
    companyDesc: 'companyDesc',
    isApproved: 'isApproved',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    techStack: 'techStack',
    startDate: 'startDate',
    endDate: 'endDate',
    githubUrl: 'githubUrl',
    deployUrl: 'deployUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const JobPostingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    company: 'company',
    position: 'position',
    url: 'url',
    deadline: 'deadline',
    interviewAt: 'interviewAt',
    status: 'status',
    contacts: 'contacts',
    followUpAt: 'followUpAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobPostingScalarFieldEnum = (typeof JobPostingScalarFieldEnum)[keyof typeof JobPostingScalarFieldEnum]


  export const StatusHistoryScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    status: 'status',
    changedAt: 'changedAt',
    note: 'note'
  };

  export type StatusHistoryScalarFieldEnum = (typeof StatusHistoryScalarFieldEnum)[keyof typeof StatusHistoryScalarFieldEnum]


  export const RoadmapItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    jobCategory: 'jobCategory',
    skill: 'skill',
    status: 'status',
    referenceLinks: 'referenceLinks',
    isCustom: 'isCustom',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoadmapItemScalarFieldEnum = (typeof RoadmapItemScalarFieldEnum)[keyof typeof RoadmapItemScalarFieldEnum]


  export const InterviewQuestionScalarFieldEnum: {
    id: 'id',
    category: 'category',
    jobType: 'jobType',
    question: 'question',
    isDefault: 'isDefault',
    userId: 'userId'
  };

  export type InterviewQuestionScalarFieldEnum = (typeof InterviewQuestionScalarFieldEnum)[keyof typeof InterviewQuestionScalarFieldEnum]


  export const InterviewAnswerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    questionId: 'questionId',
    answer: 'answer',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InterviewAnswerScalarFieldEnum = (typeof InterviewAnswerScalarFieldEnum)[keyof typeof InterviewAnswerScalarFieldEnum]


  export const CoverLetterScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    jobId: 'jobId',
    company: 'company',
    position: 'position',
    items: 'items',
    version: 'version',
    analysisScore: 'analysisScore',
    analysisHistory: 'analysisHistory',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CoverLetterScalarFieldEnum = (typeof CoverLetterScalarFieldEnum)[keyof typeof CoverLetterScalarFieldEnum]


  export const CoverLetterVersionScalarFieldEnum: {
    id: 'id',
    coverLetterId: 'coverLetterId',
    version: 'version',
    items: 'items',
    savedAt: 'savedAt'
  };

  export type CoverLetterVersionScalarFieldEnum = (typeof CoverLetterVersionScalarFieldEnum)[keyof typeof CoverLetterVersionScalarFieldEnum]


  export const JobListingScalarFieldEnum: {
    id: 'id',
    company: 'company',
    position: 'position',
    location: 'location',
    career: 'career',
    education: 'education',
    employType: 'employType',
    salary: 'salary',
    deadline: 'deadline',
    url: 'url',
    description: 'description',
    tags: 'tags',
    source: 'source',
    isActive: 'isActive',
    recruiterId: 'recruiterId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobListingScalarFieldEnum = (typeof JobListingScalarFieldEnum)[keyof typeof JobListingScalarFieldEnum]


  export const JobBookmarkScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    listingId: 'listingId',
    createdAt: 'createdAt'
  };

  export type JobBookmarkScalarFieldEnum = (typeof JobBookmarkScalarFieldEnum)[keyof typeof JobBookmarkScalarFieldEnum]


  export const EmploymentRecordScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    company: 'company',
    position: 'position',
    employType: 'employType',
    startDate: 'startDate',
    salary: 'salary',
    note: 'note',
    confirmedAt: 'confirmedAt',
    createdAt: 'createdAt'
  };

  export type EmploymentRecordScalarFieldEnum = (typeof EmploymentRecordScalarFieldEnum)[keyof typeof EmploymentRecordScalarFieldEnum]


  export const NoticeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    isPinned: 'isPinned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NoticeScalarFieldEnum = (typeof NoticeScalarFieldEnum)[keyof typeof NoticeScalarFieldEnum]


  export const UserNotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    body: 'body',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type UserNotificationScalarFieldEnum = (typeof UserNotificationScalarFieldEnum)[keyof typeof UserNotificationScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    major?: StringNullableFilter<"User"> | string | null
    targetJob?: StringNullableFilter<"User"> | string | null
    skills?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    companyName?: StringNullableFilter<"User"> | string | null
    companyDesc?: StringNullableFilter<"User"> | string | null
    isApproved?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    portfolios?: PortfolioListRelationFilter
    jobPostings?: JobPostingListRelationFilter
    roadmapItems?: RoadmapItemListRelationFilter
    interviewAnswers?: InterviewAnswerListRelationFilter
    customQuestions?: InterviewQuestionListRelationFilter
    coverLetters?: CoverLetterListRelationFilter
    notifications?: UserNotificationListRelationFilter
    bookmarks?: JobBookmarkListRelationFilter
    recruitListings?: JobListingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    targetJob?: SortOrderInput | SortOrder
    skills?: SortOrder
    role?: SortOrder
    companyName?: SortOrderInput | SortOrder
    companyDesc?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    portfolios?: PortfolioOrderByRelationAggregateInput
    jobPostings?: JobPostingOrderByRelationAggregateInput
    roadmapItems?: RoadmapItemOrderByRelationAggregateInput
    interviewAnswers?: InterviewAnswerOrderByRelationAggregateInput
    customQuestions?: InterviewQuestionOrderByRelationAggregateInput
    coverLetters?: CoverLetterOrderByRelationAggregateInput
    notifications?: UserNotificationOrderByRelationAggregateInput
    bookmarks?: JobBookmarkOrderByRelationAggregateInput
    recruitListings?: JobListingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    major?: StringNullableFilter<"User"> | string | null
    targetJob?: StringNullableFilter<"User"> | string | null
    skills?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    companyName?: StringNullableFilter<"User"> | string | null
    companyDesc?: StringNullableFilter<"User"> | string | null
    isApproved?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    portfolios?: PortfolioListRelationFilter
    jobPostings?: JobPostingListRelationFilter
    roadmapItems?: RoadmapItemListRelationFilter
    interviewAnswers?: InterviewAnswerListRelationFilter
    customQuestions?: InterviewQuestionListRelationFilter
    coverLetters?: CoverLetterListRelationFilter
    notifications?: UserNotificationListRelationFilter
    bookmarks?: JobBookmarkListRelationFilter
    recruitListings?: JobListingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    targetJob?: SortOrderInput | SortOrder
    skills?: SortOrder
    role?: SortOrder
    companyName?: SortOrderInput | SortOrder
    companyDesc?: SortOrderInput | SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    major?: StringNullableWithAggregatesFilter<"User"> | string | null
    targetJob?: StringNullableWithAggregatesFilter<"User"> | string | null
    skills?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    companyName?: StringNullableWithAggregatesFilter<"User"> | string | null
    companyDesc?: StringNullableWithAggregatesFilter<"User"> | string | null
    isApproved?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    userId?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    description?: StringFilter<"Portfolio"> | string
    techStack?: StringFilter<"Portfolio"> | string
    startDate?: DateTimeFilter<"Portfolio"> | Date | string
    endDate?: DateTimeNullableFilter<"Portfolio"> | Date | string | null
    githubUrl?: StringNullableFilter<"Portfolio"> | string | null
    deployUrl?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    githubUrl?: SortOrderInput | SortOrder
    deployUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    userId?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    description?: StringFilter<"Portfolio"> | string
    techStack?: StringFilter<"Portfolio"> | string
    startDate?: DateTimeFilter<"Portfolio"> | Date | string
    endDate?: DateTimeNullableFilter<"Portfolio"> | Date | string | null
    githubUrl?: StringNullableFilter<"Portfolio"> | string | null
    deployUrl?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    githubUrl?: SortOrderInput | SortOrder
    deployUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Portfolio"> | string
    userId?: StringWithAggregatesFilter<"Portfolio"> | string
    title?: StringWithAggregatesFilter<"Portfolio"> | string
    description?: StringWithAggregatesFilter<"Portfolio"> | string
    techStack?: StringWithAggregatesFilter<"Portfolio"> | string
    startDate?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Portfolio"> | Date | string | null
    githubUrl?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    deployUrl?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
  }

  export type JobPostingWhereInput = {
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    id?: StringFilter<"JobPosting"> | string
    userId?: StringFilter<"JobPosting"> | string
    company?: StringFilter<"JobPosting"> | string
    position?: StringFilter<"JobPosting"> | string
    url?: StringNullableFilter<"JobPosting"> | string | null
    deadline?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    interviewAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    status?: StringFilter<"JobPosting"> | string
    contacts?: StringNullableFilter<"JobPosting"> | string | null
    followUpAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    createdAt?: DateTimeFilter<"JobPosting"> | Date | string
    updatedAt?: DateTimeFilter<"JobPosting"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    statusHistory?: StatusHistoryListRelationFilter
    coverLetters?: CoverLetterListRelationFilter
  }

  export type JobPostingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    url?: SortOrderInput | SortOrder
    deadline?: SortOrderInput | SortOrder
    interviewAt?: SortOrderInput | SortOrder
    status?: SortOrder
    contacts?: SortOrderInput | SortOrder
    followUpAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    statusHistory?: StatusHistoryOrderByRelationAggregateInput
    coverLetters?: CoverLetterOrderByRelationAggregateInput
  }

  export type JobPostingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    userId?: StringFilter<"JobPosting"> | string
    company?: StringFilter<"JobPosting"> | string
    position?: StringFilter<"JobPosting"> | string
    url?: StringNullableFilter<"JobPosting"> | string | null
    deadline?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    interviewAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    status?: StringFilter<"JobPosting"> | string
    contacts?: StringNullableFilter<"JobPosting"> | string | null
    followUpAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    createdAt?: DateTimeFilter<"JobPosting"> | Date | string
    updatedAt?: DateTimeFilter<"JobPosting"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    statusHistory?: StatusHistoryListRelationFilter
    coverLetters?: CoverLetterListRelationFilter
  }, "id">

  export type JobPostingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    url?: SortOrderInput | SortOrder
    deadline?: SortOrderInput | SortOrder
    interviewAt?: SortOrderInput | SortOrder
    status?: SortOrder
    contacts?: SortOrderInput | SortOrder
    followUpAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobPostingCountOrderByAggregateInput
    _max?: JobPostingMaxOrderByAggregateInput
    _min?: JobPostingMinOrderByAggregateInput
  }

  export type JobPostingScalarWhereWithAggregatesInput = {
    AND?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    OR?: JobPostingScalarWhereWithAggregatesInput[]
    NOT?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobPosting"> | string
    userId?: StringWithAggregatesFilter<"JobPosting"> | string
    company?: StringWithAggregatesFilter<"JobPosting"> | string
    position?: StringWithAggregatesFilter<"JobPosting"> | string
    url?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    deadline?: DateTimeNullableWithAggregatesFilter<"JobPosting"> | Date | string | null
    interviewAt?: DateTimeNullableWithAggregatesFilter<"JobPosting"> | Date | string | null
    status?: StringWithAggregatesFilter<"JobPosting"> | string
    contacts?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    followUpAt?: DateTimeNullableWithAggregatesFilter<"JobPosting"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
  }

  export type StatusHistoryWhereInput = {
    AND?: StatusHistoryWhereInput | StatusHistoryWhereInput[]
    OR?: StatusHistoryWhereInput[]
    NOT?: StatusHistoryWhereInput | StatusHistoryWhereInput[]
    id?: StringFilter<"StatusHistory"> | string
    jobId?: StringFilter<"StatusHistory"> | string
    status?: StringFilter<"StatusHistory"> | string
    changedAt?: DateTimeFilter<"StatusHistory"> | Date | string
    note?: StringNullableFilter<"StatusHistory"> | string | null
    job?: XOR<JobPostingRelationFilter, JobPostingWhereInput>
  }

  export type StatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrderInput | SortOrder
    job?: JobPostingOrderByWithRelationInput
  }

  export type StatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StatusHistoryWhereInput | StatusHistoryWhereInput[]
    OR?: StatusHistoryWhereInput[]
    NOT?: StatusHistoryWhereInput | StatusHistoryWhereInput[]
    jobId?: StringFilter<"StatusHistory"> | string
    status?: StringFilter<"StatusHistory"> | string
    changedAt?: DateTimeFilter<"StatusHistory"> | Date | string
    note?: StringNullableFilter<"StatusHistory"> | string | null
    job?: XOR<JobPostingRelationFilter, JobPostingWhereInput>
  }, "id">

  export type StatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrderInput | SortOrder
    _count?: StatusHistoryCountOrderByAggregateInput
    _max?: StatusHistoryMaxOrderByAggregateInput
    _min?: StatusHistoryMinOrderByAggregateInput
  }

  export type StatusHistoryScalarWhereWithAggregatesInput = {
    AND?: StatusHistoryScalarWhereWithAggregatesInput | StatusHistoryScalarWhereWithAggregatesInput[]
    OR?: StatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: StatusHistoryScalarWhereWithAggregatesInput | StatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StatusHistory"> | string
    jobId?: StringWithAggregatesFilter<"StatusHistory"> | string
    status?: StringWithAggregatesFilter<"StatusHistory"> | string
    changedAt?: DateTimeWithAggregatesFilter<"StatusHistory"> | Date | string
    note?: StringNullableWithAggregatesFilter<"StatusHistory"> | string | null
  }

  export type RoadmapItemWhereInput = {
    AND?: RoadmapItemWhereInput | RoadmapItemWhereInput[]
    OR?: RoadmapItemWhereInput[]
    NOT?: RoadmapItemWhereInput | RoadmapItemWhereInput[]
    id?: StringFilter<"RoadmapItem"> | string
    userId?: StringFilter<"RoadmapItem"> | string
    jobCategory?: StringFilter<"RoadmapItem"> | string
    skill?: StringFilter<"RoadmapItem"> | string
    status?: StringFilter<"RoadmapItem"> | string
    referenceLinks?: StringFilter<"RoadmapItem"> | string
    isCustom?: BoolFilter<"RoadmapItem"> | boolean
    order?: IntFilter<"RoadmapItem"> | number
    createdAt?: DateTimeFilter<"RoadmapItem"> | Date | string
    updatedAt?: DateTimeFilter<"RoadmapItem"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type RoadmapItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobCategory?: SortOrder
    skill?: SortOrder
    status?: SortOrder
    referenceLinks?: SortOrder
    isCustom?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RoadmapItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoadmapItemWhereInput | RoadmapItemWhereInput[]
    OR?: RoadmapItemWhereInput[]
    NOT?: RoadmapItemWhereInput | RoadmapItemWhereInput[]
    userId?: StringFilter<"RoadmapItem"> | string
    jobCategory?: StringFilter<"RoadmapItem"> | string
    skill?: StringFilter<"RoadmapItem"> | string
    status?: StringFilter<"RoadmapItem"> | string
    referenceLinks?: StringFilter<"RoadmapItem"> | string
    isCustom?: BoolFilter<"RoadmapItem"> | boolean
    order?: IntFilter<"RoadmapItem"> | number
    createdAt?: DateTimeFilter<"RoadmapItem"> | Date | string
    updatedAt?: DateTimeFilter<"RoadmapItem"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type RoadmapItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobCategory?: SortOrder
    skill?: SortOrder
    status?: SortOrder
    referenceLinks?: SortOrder
    isCustom?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoadmapItemCountOrderByAggregateInput
    _avg?: RoadmapItemAvgOrderByAggregateInput
    _max?: RoadmapItemMaxOrderByAggregateInput
    _min?: RoadmapItemMinOrderByAggregateInput
    _sum?: RoadmapItemSumOrderByAggregateInput
  }

  export type RoadmapItemScalarWhereWithAggregatesInput = {
    AND?: RoadmapItemScalarWhereWithAggregatesInput | RoadmapItemScalarWhereWithAggregatesInput[]
    OR?: RoadmapItemScalarWhereWithAggregatesInput[]
    NOT?: RoadmapItemScalarWhereWithAggregatesInput | RoadmapItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoadmapItem"> | string
    userId?: StringWithAggregatesFilter<"RoadmapItem"> | string
    jobCategory?: StringWithAggregatesFilter<"RoadmapItem"> | string
    skill?: StringWithAggregatesFilter<"RoadmapItem"> | string
    status?: StringWithAggregatesFilter<"RoadmapItem"> | string
    referenceLinks?: StringWithAggregatesFilter<"RoadmapItem"> | string
    isCustom?: BoolWithAggregatesFilter<"RoadmapItem"> | boolean
    order?: IntWithAggregatesFilter<"RoadmapItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RoadmapItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoadmapItem"> | Date | string
  }

  export type InterviewQuestionWhereInput = {
    AND?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    OR?: InterviewQuestionWhereInput[]
    NOT?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    id?: StringFilter<"InterviewQuestion"> | string
    category?: StringFilter<"InterviewQuestion"> | string
    jobType?: StringNullableFilter<"InterviewQuestion"> | string | null
    question?: StringFilter<"InterviewQuestion"> | string
    isDefault?: BoolFilter<"InterviewQuestion"> | boolean
    userId?: StringNullableFilter<"InterviewQuestion"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    answers?: InterviewAnswerListRelationFilter
  }

  export type InterviewQuestionOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    jobType?: SortOrderInput | SortOrder
    question?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    answers?: InterviewAnswerOrderByRelationAggregateInput
  }

  export type InterviewQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    OR?: InterviewQuestionWhereInput[]
    NOT?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    category?: StringFilter<"InterviewQuestion"> | string
    jobType?: StringNullableFilter<"InterviewQuestion"> | string | null
    question?: StringFilter<"InterviewQuestion"> | string
    isDefault?: BoolFilter<"InterviewQuestion"> | boolean
    userId?: StringNullableFilter<"InterviewQuestion"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    answers?: InterviewAnswerListRelationFilter
  }, "id">

  export type InterviewQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    jobType?: SortOrderInput | SortOrder
    question?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: InterviewQuestionCountOrderByAggregateInput
    _max?: InterviewQuestionMaxOrderByAggregateInput
    _min?: InterviewQuestionMinOrderByAggregateInput
  }

  export type InterviewQuestionScalarWhereWithAggregatesInput = {
    AND?: InterviewQuestionScalarWhereWithAggregatesInput | InterviewQuestionScalarWhereWithAggregatesInput[]
    OR?: InterviewQuestionScalarWhereWithAggregatesInput[]
    NOT?: InterviewQuestionScalarWhereWithAggregatesInput | InterviewQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InterviewQuestion"> | string
    category?: StringWithAggregatesFilter<"InterviewQuestion"> | string
    jobType?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
    question?: StringWithAggregatesFilter<"InterviewQuestion"> | string
    isDefault?: BoolWithAggregatesFilter<"InterviewQuestion"> | boolean
    userId?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
  }

  export type InterviewAnswerWhereInput = {
    AND?: InterviewAnswerWhereInput | InterviewAnswerWhereInput[]
    OR?: InterviewAnswerWhereInput[]
    NOT?: InterviewAnswerWhereInput | InterviewAnswerWhereInput[]
    id?: StringFilter<"InterviewAnswer"> | string
    userId?: StringFilter<"InterviewAnswer"> | string
    questionId?: StringFilter<"InterviewAnswer"> | string
    answer?: StringFilter<"InterviewAnswer"> | string
    createdAt?: DateTimeFilter<"InterviewAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"InterviewAnswer"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    question?: XOR<InterviewQuestionRelationFilter, InterviewQuestionWhereInput>
  }

  export type InterviewAnswerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    question?: InterviewQuestionOrderByWithRelationInput
  }

  export type InterviewAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_questionId?: InterviewAnswerUserIdQuestionIdCompoundUniqueInput
    AND?: InterviewAnswerWhereInput | InterviewAnswerWhereInput[]
    OR?: InterviewAnswerWhereInput[]
    NOT?: InterviewAnswerWhereInput | InterviewAnswerWhereInput[]
    userId?: StringFilter<"InterviewAnswer"> | string
    questionId?: StringFilter<"InterviewAnswer"> | string
    answer?: StringFilter<"InterviewAnswer"> | string
    createdAt?: DateTimeFilter<"InterviewAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"InterviewAnswer"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    question?: XOR<InterviewQuestionRelationFilter, InterviewQuestionWhereInput>
  }, "id" | "userId_questionId">

  export type InterviewAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InterviewAnswerCountOrderByAggregateInput
    _max?: InterviewAnswerMaxOrderByAggregateInput
    _min?: InterviewAnswerMinOrderByAggregateInput
  }

  export type InterviewAnswerScalarWhereWithAggregatesInput = {
    AND?: InterviewAnswerScalarWhereWithAggregatesInput | InterviewAnswerScalarWhereWithAggregatesInput[]
    OR?: InterviewAnswerScalarWhereWithAggregatesInput[]
    NOT?: InterviewAnswerScalarWhereWithAggregatesInput | InterviewAnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InterviewAnswer"> | string
    userId?: StringWithAggregatesFilter<"InterviewAnswer"> | string
    questionId?: StringWithAggregatesFilter<"InterviewAnswer"> | string
    answer?: StringWithAggregatesFilter<"InterviewAnswer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InterviewAnswer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InterviewAnswer"> | Date | string
  }

  export type CoverLetterWhereInput = {
    AND?: CoverLetterWhereInput | CoverLetterWhereInput[]
    OR?: CoverLetterWhereInput[]
    NOT?: CoverLetterWhereInput | CoverLetterWhereInput[]
    id?: StringFilter<"CoverLetter"> | string
    userId?: StringFilter<"CoverLetter"> | string
    jobId?: StringNullableFilter<"CoverLetter"> | string | null
    company?: StringFilter<"CoverLetter"> | string
    position?: StringFilter<"CoverLetter"> | string
    items?: StringFilter<"CoverLetter"> | string
    version?: IntFilter<"CoverLetter"> | number
    analysisScore?: IntNullableFilter<"CoverLetter"> | number | null
    analysisHistory?: StringNullableFilter<"CoverLetter"> | string | null
    createdAt?: DateTimeFilter<"CoverLetter"> | Date | string
    updatedAt?: DateTimeFilter<"CoverLetter"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    job?: XOR<JobPostingNullableRelationFilter, JobPostingWhereInput> | null
    versions?: CoverLetterVersionListRelationFilter
  }

  export type CoverLetterOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrderInput | SortOrder
    company?: SortOrder
    position?: SortOrder
    items?: SortOrder
    version?: SortOrder
    analysisScore?: SortOrderInput | SortOrder
    analysisHistory?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    job?: JobPostingOrderByWithRelationInput
    versions?: CoverLetterVersionOrderByRelationAggregateInput
  }

  export type CoverLetterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CoverLetterWhereInput | CoverLetterWhereInput[]
    OR?: CoverLetterWhereInput[]
    NOT?: CoverLetterWhereInput | CoverLetterWhereInput[]
    userId?: StringFilter<"CoverLetter"> | string
    jobId?: StringNullableFilter<"CoverLetter"> | string | null
    company?: StringFilter<"CoverLetter"> | string
    position?: StringFilter<"CoverLetter"> | string
    items?: StringFilter<"CoverLetter"> | string
    version?: IntFilter<"CoverLetter"> | number
    analysisScore?: IntNullableFilter<"CoverLetter"> | number | null
    analysisHistory?: StringNullableFilter<"CoverLetter"> | string | null
    createdAt?: DateTimeFilter<"CoverLetter"> | Date | string
    updatedAt?: DateTimeFilter<"CoverLetter"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    job?: XOR<JobPostingNullableRelationFilter, JobPostingWhereInput> | null
    versions?: CoverLetterVersionListRelationFilter
  }, "id">

  export type CoverLetterOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrderInput | SortOrder
    company?: SortOrder
    position?: SortOrder
    items?: SortOrder
    version?: SortOrder
    analysisScore?: SortOrderInput | SortOrder
    analysisHistory?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CoverLetterCountOrderByAggregateInput
    _avg?: CoverLetterAvgOrderByAggregateInput
    _max?: CoverLetterMaxOrderByAggregateInput
    _min?: CoverLetterMinOrderByAggregateInput
    _sum?: CoverLetterSumOrderByAggregateInput
  }

  export type CoverLetterScalarWhereWithAggregatesInput = {
    AND?: CoverLetterScalarWhereWithAggregatesInput | CoverLetterScalarWhereWithAggregatesInput[]
    OR?: CoverLetterScalarWhereWithAggregatesInput[]
    NOT?: CoverLetterScalarWhereWithAggregatesInput | CoverLetterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CoverLetter"> | string
    userId?: StringWithAggregatesFilter<"CoverLetter"> | string
    jobId?: StringNullableWithAggregatesFilter<"CoverLetter"> | string | null
    company?: StringWithAggregatesFilter<"CoverLetter"> | string
    position?: StringWithAggregatesFilter<"CoverLetter"> | string
    items?: StringWithAggregatesFilter<"CoverLetter"> | string
    version?: IntWithAggregatesFilter<"CoverLetter"> | number
    analysisScore?: IntNullableWithAggregatesFilter<"CoverLetter"> | number | null
    analysisHistory?: StringNullableWithAggregatesFilter<"CoverLetter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CoverLetter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CoverLetter"> | Date | string
  }

  export type CoverLetterVersionWhereInput = {
    AND?: CoverLetterVersionWhereInput | CoverLetterVersionWhereInput[]
    OR?: CoverLetterVersionWhereInput[]
    NOT?: CoverLetterVersionWhereInput | CoverLetterVersionWhereInput[]
    id?: StringFilter<"CoverLetterVersion"> | string
    coverLetterId?: StringFilter<"CoverLetterVersion"> | string
    version?: IntFilter<"CoverLetterVersion"> | number
    items?: StringFilter<"CoverLetterVersion"> | string
    savedAt?: DateTimeFilter<"CoverLetterVersion"> | Date | string
    coverLetter?: XOR<CoverLetterRelationFilter, CoverLetterWhereInput>
  }

  export type CoverLetterVersionOrderByWithRelationInput = {
    id?: SortOrder
    coverLetterId?: SortOrder
    version?: SortOrder
    items?: SortOrder
    savedAt?: SortOrder
    coverLetter?: CoverLetterOrderByWithRelationInput
  }

  export type CoverLetterVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CoverLetterVersionWhereInput | CoverLetterVersionWhereInput[]
    OR?: CoverLetterVersionWhereInput[]
    NOT?: CoverLetterVersionWhereInput | CoverLetterVersionWhereInput[]
    coverLetterId?: StringFilter<"CoverLetterVersion"> | string
    version?: IntFilter<"CoverLetterVersion"> | number
    items?: StringFilter<"CoverLetterVersion"> | string
    savedAt?: DateTimeFilter<"CoverLetterVersion"> | Date | string
    coverLetter?: XOR<CoverLetterRelationFilter, CoverLetterWhereInput>
  }, "id">

  export type CoverLetterVersionOrderByWithAggregationInput = {
    id?: SortOrder
    coverLetterId?: SortOrder
    version?: SortOrder
    items?: SortOrder
    savedAt?: SortOrder
    _count?: CoverLetterVersionCountOrderByAggregateInput
    _avg?: CoverLetterVersionAvgOrderByAggregateInput
    _max?: CoverLetterVersionMaxOrderByAggregateInput
    _min?: CoverLetterVersionMinOrderByAggregateInput
    _sum?: CoverLetterVersionSumOrderByAggregateInput
  }

  export type CoverLetterVersionScalarWhereWithAggregatesInput = {
    AND?: CoverLetterVersionScalarWhereWithAggregatesInput | CoverLetterVersionScalarWhereWithAggregatesInput[]
    OR?: CoverLetterVersionScalarWhereWithAggregatesInput[]
    NOT?: CoverLetterVersionScalarWhereWithAggregatesInput | CoverLetterVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CoverLetterVersion"> | string
    coverLetterId?: StringWithAggregatesFilter<"CoverLetterVersion"> | string
    version?: IntWithAggregatesFilter<"CoverLetterVersion"> | number
    items?: StringWithAggregatesFilter<"CoverLetterVersion"> | string
    savedAt?: DateTimeWithAggregatesFilter<"CoverLetterVersion"> | Date | string
  }

  export type JobListingWhereInput = {
    AND?: JobListingWhereInput | JobListingWhereInput[]
    OR?: JobListingWhereInput[]
    NOT?: JobListingWhereInput | JobListingWhereInput[]
    id?: StringFilter<"JobListing"> | string
    company?: StringFilter<"JobListing"> | string
    position?: StringFilter<"JobListing"> | string
    location?: StringNullableFilter<"JobListing"> | string | null
    career?: StringNullableFilter<"JobListing"> | string | null
    education?: StringNullableFilter<"JobListing"> | string | null
    employType?: StringNullableFilter<"JobListing"> | string | null
    salary?: StringNullableFilter<"JobListing"> | string | null
    deadline?: DateTimeNullableFilter<"JobListing"> | Date | string | null
    url?: StringNullableFilter<"JobListing"> | string | null
    description?: StringNullableFilter<"JobListing"> | string | null
    tags?: StringNullableFilter<"JobListing"> | string | null
    source?: StringNullableFilter<"JobListing"> | string | null
    isActive?: BoolFilter<"JobListing"> | boolean
    recruiterId?: StringNullableFilter<"JobListing"> | string | null
    createdAt?: DateTimeFilter<"JobListing"> | Date | string
    updatedAt?: DateTimeFilter<"JobListing"> | Date | string
    recruiter?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    bookmarks?: JobBookmarkListRelationFilter
  }

  export type JobListingOrderByWithRelationInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    location?: SortOrderInput | SortOrder
    career?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    employType?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    deadline?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    isActive?: SortOrder
    recruiterId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiter?: UserOrderByWithRelationInput
    bookmarks?: JobBookmarkOrderByRelationAggregateInput
  }

  export type JobListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobListingWhereInput | JobListingWhereInput[]
    OR?: JobListingWhereInput[]
    NOT?: JobListingWhereInput | JobListingWhereInput[]
    company?: StringFilter<"JobListing"> | string
    position?: StringFilter<"JobListing"> | string
    location?: StringNullableFilter<"JobListing"> | string | null
    career?: StringNullableFilter<"JobListing"> | string | null
    education?: StringNullableFilter<"JobListing"> | string | null
    employType?: StringNullableFilter<"JobListing"> | string | null
    salary?: StringNullableFilter<"JobListing"> | string | null
    deadline?: DateTimeNullableFilter<"JobListing"> | Date | string | null
    url?: StringNullableFilter<"JobListing"> | string | null
    description?: StringNullableFilter<"JobListing"> | string | null
    tags?: StringNullableFilter<"JobListing"> | string | null
    source?: StringNullableFilter<"JobListing"> | string | null
    isActive?: BoolFilter<"JobListing"> | boolean
    recruiterId?: StringNullableFilter<"JobListing"> | string | null
    createdAt?: DateTimeFilter<"JobListing"> | Date | string
    updatedAt?: DateTimeFilter<"JobListing"> | Date | string
    recruiter?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    bookmarks?: JobBookmarkListRelationFilter
  }, "id">

  export type JobListingOrderByWithAggregationInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    location?: SortOrderInput | SortOrder
    career?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    employType?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    deadline?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    isActive?: SortOrder
    recruiterId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobListingCountOrderByAggregateInput
    _max?: JobListingMaxOrderByAggregateInput
    _min?: JobListingMinOrderByAggregateInput
  }

  export type JobListingScalarWhereWithAggregatesInput = {
    AND?: JobListingScalarWhereWithAggregatesInput | JobListingScalarWhereWithAggregatesInput[]
    OR?: JobListingScalarWhereWithAggregatesInput[]
    NOT?: JobListingScalarWhereWithAggregatesInput | JobListingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobListing"> | string
    company?: StringWithAggregatesFilter<"JobListing"> | string
    position?: StringWithAggregatesFilter<"JobListing"> | string
    location?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    career?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    education?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    employType?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    salary?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    deadline?: DateTimeNullableWithAggregatesFilter<"JobListing"> | Date | string | null
    url?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    description?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    tags?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    source?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    isActive?: BoolWithAggregatesFilter<"JobListing"> | boolean
    recruiterId?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JobListing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobListing"> | Date | string
  }

  export type JobBookmarkWhereInput = {
    AND?: JobBookmarkWhereInput | JobBookmarkWhereInput[]
    OR?: JobBookmarkWhereInput[]
    NOT?: JobBookmarkWhereInput | JobBookmarkWhereInput[]
    id?: StringFilter<"JobBookmark"> | string
    userId?: StringFilter<"JobBookmark"> | string
    listingId?: StringFilter<"JobBookmark"> | string
    createdAt?: DateTimeFilter<"JobBookmark"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    listing?: XOR<JobListingRelationFilter, JobListingWhereInput>
  }

  export type JobBookmarkOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    listing?: JobListingOrderByWithRelationInput
  }

  export type JobBookmarkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_listingId?: JobBookmarkUserIdListingIdCompoundUniqueInput
    AND?: JobBookmarkWhereInput | JobBookmarkWhereInput[]
    OR?: JobBookmarkWhereInput[]
    NOT?: JobBookmarkWhereInput | JobBookmarkWhereInput[]
    userId?: StringFilter<"JobBookmark"> | string
    listingId?: StringFilter<"JobBookmark"> | string
    createdAt?: DateTimeFilter<"JobBookmark"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    listing?: XOR<JobListingRelationFilter, JobListingWhereInput>
  }, "id" | "userId_listingId">

  export type JobBookmarkOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
    _count?: JobBookmarkCountOrderByAggregateInput
    _max?: JobBookmarkMaxOrderByAggregateInput
    _min?: JobBookmarkMinOrderByAggregateInput
  }

  export type JobBookmarkScalarWhereWithAggregatesInput = {
    AND?: JobBookmarkScalarWhereWithAggregatesInput | JobBookmarkScalarWhereWithAggregatesInput[]
    OR?: JobBookmarkScalarWhereWithAggregatesInput[]
    NOT?: JobBookmarkScalarWhereWithAggregatesInput | JobBookmarkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobBookmark"> | string
    userId?: StringWithAggregatesFilter<"JobBookmark"> | string
    listingId?: StringWithAggregatesFilter<"JobBookmark"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JobBookmark"> | Date | string
  }

  export type EmploymentRecordWhereInput = {
    AND?: EmploymentRecordWhereInput | EmploymentRecordWhereInput[]
    OR?: EmploymentRecordWhereInput[]
    NOT?: EmploymentRecordWhereInput | EmploymentRecordWhereInput[]
    id?: StringFilter<"EmploymentRecord"> | string
    userId?: StringFilter<"EmploymentRecord"> | string
    company?: StringFilter<"EmploymentRecord"> | string
    position?: StringFilter<"EmploymentRecord"> | string
    employType?: StringNullableFilter<"EmploymentRecord"> | string | null
    startDate?: DateTimeNullableFilter<"EmploymentRecord"> | Date | string | null
    salary?: StringNullableFilter<"EmploymentRecord"> | string | null
    note?: StringNullableFilter<"EmploymentRecord"> | string | null
    confirmedAt?: DateTimeFilter<"EmploymentRecord"> | Date | string
    createdAt?: DateTimeFilter<"EmploymentRecord"> | Date | string
  }

  export type EmploymentRecordOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    employType?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EmploymentRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmploymentRecordWhereInput | EmploymentRecordWhereInput[]
    OR?: EmploymentRecordWhereInput[]
    NOT?: EmploymentRecordWhereInput | EmploymentRecordWhereInput[]
    userId?: StringFilter<"EmploymentRecord"> | string
    company?: StringFilter<"EmploymentRecord"> | string
    position?: StringFilter<"EmploymentRecord"> | string
    employType?: StringNullableFilter<"EmploymentRecord"> | string | null
    startDate?: DateTimeNullableFilter<"EmploymentRecord"> | Date | string | null
    salary?: StringNullableFilter<"EmploymentRecord"> | string | null
    note?: StringNullableFilter<"EmploymentRecord"> | string | null
    confirmedAt?: DateTimeFilter<"EmploymentRecord"> | Date | string
    createdAt?: DateTimeFilter<"EmploymentRecord"> | Date | string
  }, "id">

  export type EmploymentRecordOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    employType?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
    _count?: EmploymentRecordCountOrderByAggregateInput
    _max?: EmploymentRecordMaxOrderByAggregateInput
    _min?: EmploymentRecordMinOrderByAggregateInput
  }

  export type EmploymentRecordScalarWhereWithAggregatesInput = {
    AND?: EmploymentRecordScalarWhereWithAggregatesInput | EmploymentRecordScalarWhereWithAggregatesInput[]
    OR?: EmploymentRecordScalarWhereWithAggregatesInput[]
    NOT?: EmploymentRecordScalarWhereWithAggregatesInput | EmploymentRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmploymentRecord"> | string
    userId?: StringWithAggregatesFilter<"EmploymentRecord"> | string
    company?: StringWithAggregatesFilter<"EmploymentRecord"> | string
    position?: StringWithAggregatesFilter<"EmploymentRecord"> | string
    employType?: StringNullableWithAggregatesFilter<"EmploymentRecord"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"EmploymentRecord"> | Date | string | null
    salary?: StringNullableWithAggregatesFilter<"EmploymentRecord"> | string | null
    note?: StringNullableWithAggregatesFilter<"EmploymentRecord"> | string | null
    confirmedAt?: DateTimeWithAggregatesFilter<"EmploymentRecord"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"EmploymentRecord"> | Date | string
  }

  export type NoticeWhereInput = {
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    id?: StringFilter<"Notice"> | string
    title?: StringFilter<"Notice"> | string
    content?: StringFilter<"Notice"> | string
    isPinned?: BoolFilter<"Notice"> | boolean
    createdAt?: DateTimeFilter<"Notice"> | Date | string
    updatedAt?: DateTimeFilter<"Notice"> | Date | string
  }

  export type NoticeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoticeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    title?: StringFilter<"Notice"> | string
    content?: StringFilter<"Notice"> | string
    isPinned?: BoolFilter<"Notice"> | boolean
    createdAt?: DateTimeFilter<"Notice"> | Date | string
    updatedAt?: DateTimeFilter<"Notice"> | Date | string
  }, "id">

  export type NoticeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NoticeCountOrderByAggregateInput
    _max?: NoticeMaxOrderByAggregateInput
    _min?: NoticeMinOrderByAggregateInput
  }

  export type NoticeScalarWhereWithAggregatesInput = {
    AND?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    OR?: NoticeScalarWhereWithAggregatesInput[]
    NOT?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notice"> | string
    title?: StringWithAggregatesFilter<"Notice"> | string
    content?: StringWithAggregatesFilter<"Notice"> | string
    isPinned?: BoolWithAggregatesFilter<"Notice"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notice"> | Date | string
  }

  export type UserNotificationWhereInput = {
    AND?: UserNotificationWhereInput | UserNotificationWhereInput[]
    OR?: UserNotificationWhereInput[]
    NOT?: UserNotificationWhereInput | UserNotificationWhereInput[]
    id?: StringFilter<"UserNotification"> | string
    userId?: StringFilter<"UserNotification"> | string
    title?: StringFilter<"UserNotification"> | string
    body?: StringFilter<"UserNotification"> | string
    isRead?: BoolFilter<"UserNotification"> | boolean
    createdAt?: DateTimeFilter<"UserNotification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserNotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserNotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserNotificationWhereInput | UserNotificationWhereInput[]
    OR?: UserNotificationWhereInput[]
    NOT?: UserNotificationWhereInput | UserNotificationWhereInput[]
    userId?: StringFilter<"UserNotification"> | string
    title?: StringFilter<"UserNotification"> | string
    body?: StringFilter<"UserNotification"> | string
    isRead?: BoolFilter<"UserNotification"> | boolean
    createdAt?: DateTimeFilter<"UserNotification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type UserNotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: UserNotificationCountOrderByAggregateInput
    _max?: UserNotificationMaxOrderByAggregateInput
    _min?: UserNotificationMinOrderByAggregateInput
  }

  export type UserNotificationScalarWhereWithAggregatesInput = {
    AND?: UserNotificationScalarWhereWithAggregatesInput | UserNotificationScalarWhereWithAggregatesInput[]
    OR?: UserNotificationScalarWhereWithAggregatesInput[]
    NOT?: UserNotificationScalarWhereWithAggregatesInput | UserNotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserNotification"> | string
    userId?: StringWithAggregatesFilter<"UserNotification"> | string
    title?: StringWithAggregatesFilter<"UserNotification"> | string
    body?: StringWithAggregatesFilter<"UserNotification"> | string
    isRead?: BoolWithAggregatesFilter<"UserNotification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserNotification"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    email?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    email?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }, "id" | "token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    email?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    used?: BoolWithAggregatesFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateInput = {
    id?: string
    title: string
    description: string
    techStack: string
    startDate: Date | string
    endDate?: Date | string | null
    githubUrl?: string | null
    deployUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPortfoliosInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description: string
    techStack: string
    startDate: Date | string
    endDate?: Date | string | null
    githubUrl?: string | null
    deployUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deployUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPortfoliosNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deployUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateManyInput = {
    id?: string
    userId: string
    title: string
    description: string
    techStack: string
    startDate: Date | string
    endDate?: Date | string | null
    githubUrl?: string | null
    deployUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deployUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deployUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingCreateInput = {
    id?: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJobPostingsInput
    statusHistory?: StatusHistoryCreateNestedManyWithoutJobInput
    coverLetters?: CoverLetterCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateInput = {
    id?: string
    userId: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: StatusHistoryUncheckedCreateNestedManyWithoutJobInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJobPostingsNestedInput
    statusHistory?: StatusHistoryUpdateManyWithoutJobNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: StatusHistoryUncheckedUpdateManyWithoutJobNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingCreateManyInput = {
    id?: string
    userId: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobPostingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusHistoryCreateInput = {
    id?: string
    status: string
    changedAt?: Date | string
    note?: string | null
    job: JobPostingCreateNestedOneWithoutStatusHistoryInput
  }

  export type StatusHistoryUncheckedCreateInput = {
    id?: string
    jobId: string
    status: string
    changedAt?: Date | string
    note?: string | null
  }

  export type StatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    job?: JobPostingUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type StatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusHistoryCreateManyInput = {
    id?: string
    jobId: string
    status: string
    changedAt?: Date | string
    note?: string | null
  }

  export type StatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoadmapItemCreateInput = {
    id?: string
    jobCategory: string
    skill: string
    status?: string
    referenceLinks: string
    isCustom?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRoadmapItemsInput
  }

  export type RoadmapItemUncheckedCreateInput = {
    id?: string
    userId: string
    jobCategory: string
    skill: string
    status?: string
    referenceLinks: string
    isCustom?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobCategory?: StringFieldUpdateOperationsInput | string
    skill?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    referenceLinks?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoadmapItemsNestedInput
  }

  export type RoadmapItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobCategory?: StringFieldUpdateOperationsInput | string
    skill?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    referenceLinks?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapItemCreateManyInput = {
    id?: string
    userId: string
    jobCategory: string
    skill: string
    status?: string
    referenceLinks: string
    isCustom?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobCategory?: StringFieldUpdateOperationsInput | string
    skill?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    referenceLinks?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobCategory?: StringFieldUpdateOperationsInput | string
    skill?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    referenceLinks?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionCreateInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
    user?: UserCreateNestedOneWithoutCustomQuestionsInput
    answers?: InterviewAnswerCreateNestedManyWithoutQuestionInput
  }

  export type InterviewQuestionUncheckedCreateInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
    userId?: string | null
    answers?: InterviewAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type InterviewQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneWithoutCustomQuestionsNestedInput
    answers?: InterviewAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type InterviewQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: InterviewAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type InterviewQuestionCreateManyInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
    userId?: string | null
  }

  export type InterviewQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InterviewQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterviewAnswerCreateInput = {
    id?: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewAnswersInput
    question: InterviewQuestionCreateNestedOneWithoutAnswersInput
  }

  export type InterviewAnswerUncheckedCreateInput = {
    id?: string
    userId: string
    questionId: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewAnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewAnswersNestedInput
    question?: InterviewQuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type InterviewAnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewAnswerCreateManyInput = {
    id?: string
    userId: string
    questionId: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewAnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewAnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterCreateInput = {
    id?: string
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCoverLettersInput
    job?: JobPostingCreateNestedOneWithoutCoverLettersInput
    versions?: CoverLetterVersionCreateNestedManyWithoutCoverLetterInput
  }

  export type CoverLetterUncheckedCreateInput = {
    id?: string
    userId: string
    jobId?: string | null
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: CoverLetterVersionUncheckedCreateNestedManyWithoutCoverLetterInput
  }

  export type CoverLetterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCoverLettersNestedInput
    job?: JobPostingUpdateOneWithoutCoverLettersNestedInput
    versions?: CoverLetterVersionUpdateManyWithoutCoverLetterNestedInput
  }

  export type CoverLetterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: CoverLetterVersionUncheckedUpdateManyWithoutCoverLetterNestedInput
  }

  export type CoverLetterCreateManyInput = {
    id?: string
    userId: string
    jobId?: string | null
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoverLetterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterVersionCreateInput = {
    id?: string
    version: number
    items: string
    savedAt?: Date | string
    coverLetter: CoverLetterCreateNestedOneWithoutVersionsInput
  }

  export type CoverLetterVersionUncheckedCreateInput = {
    id?: string
    coverLetterId: string
    version: number
    items: string
    savedAt?: Date | string
  }

  export type CoverLetterVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    items?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverLetter?: CoverLetterUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type CoverLetterVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetterId?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    items?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterVersionCreateManyInput = {
    id?: string
    coverLetterId: string
    version: number
    items: string
    savedAt?: Date | string
  }

  export type CoverLetterVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    items?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetterId?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    items?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobListingCreateInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter?: UserCreateNestedOneWithoutRecruitListingsInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutListingInput
  }

  export type JobListingUncheckedCreateInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    recruiterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutListingInput
  }

  export type JobListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneWithoutRecruitListingsNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutListingNestedInput
  }

  export type JobListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    recruiterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutListingNestedInput
  }

  export type JobListingCreateManyInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    recruiterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    recruiterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobBookmarkCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
    listing: JobListingCreateNestedOneWithoutBookmarksInput
  }

  export type JobBookmarkUncheckedCreateInput = {
    id?: string
    userId: string
    listingId: string
    createdAt?: Date | string
  }

  export type JobBookmarkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
    listing?: JobListingUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type JobBookmarkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobBookmarkCreateManyInput = {
    id?: string
    userId: string
    listingId: string
    createdAt?: Date | string
  }

  export type JobBookmarkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobBookmarkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentRecordCreateInput = {
    id?: string
    userId: string
    company: string
    position: string
    employType?: string | null
    startDate?: Date | string | null
    salary?: string | null
    note?: string | null
    confirmedAt?: Date | string
    createdAt?: Date | string
  }

  export type EmploymentRecordUncheckedCreateInput = {
    id?: string
    userId: string
    company: string
    position: string
    employType?: string | null
    startDate?: Date | string | null
    salary?: string | null
    note?: string | null
    confirmedAt?: Date | string
    createdAt?: Date | string
  }

  export type EmploymentRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentRecordCreateManyInput = {
    id?: string
    userId: string
    company: string
    position: string
    employType?: string | null
    startDate?: Date | string | null
    salary?: string | null
    note?: string | null
    confirmedAt?: Date | string
    createdAt?: Date | string
  }

  export type EmploymentRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeCreateInput = {
    id?: string
    title: string
    content: string
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoticeUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoticeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeCreateManyInput = {
    id?: string
    title: string
    content: string
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoticeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserNotificationCreateInput = {
    id?: string
    title: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type UserNotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type UserNotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type UserNotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserNotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type UserNotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserNotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type JobPostingListRelationFilter = {
    every?: JobPostingWhereInput
    some?: JobPostingWhereInput
    none?: JobPostingWhereInput
  }

  export type RoadmapItemListRelationFilter = {
    every?: RoadmapItemWhereInput
    some?: RoadmapItemWhereInput
    none?: RoadmapItemWhereInput
  }

  export type InterviewAnswerListRelationFilter = {
    every?: InterviewAnswerWhereInput
    some?: InterviewAnswerWhereInput
    none?: InterviewAnswerWhereInput
  }

  export type InterviewQuestionListRelationFilter = {
    every?: InterviewQuestionWhereInput
    some?: InterviewQuestionWhereInput
    none?: InterviewQuestionWhereInput
  }

  export type CoverLetterListRelationFilter = {
    every?: CoverLetterWhereInput
    some?: CoverLetterWhereInput
    none?: CoverLetterWhereInput
  }

  export type UserNotificationListRelationFilter = {
    every?: UserNotificationWhereInput
    some?: UserNotificationWhereInput
    none?: UserNotificationWhereInput
  }

  export type JobBookmarkListRelationFilter = {
    every?: JobBookmarkWhereInput
    some?: JobBookmarkWhereInput
    none?: JobBookmarkWhereInput
  }

  export type JobListingListRelationFilter = {
    every?: JobListingWhereInput
    some?: JobListingWhereInput
    none?: JobListingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobPostingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoadmapItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CoverLetterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserNotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobBookmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    major?: SortOrder
    targetJob?: SortOrder
    skills?: SortOrder
    role?: SortOrder
    companyName?: SortOrder
    companyDesc?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    major?: SortOrder
    targetJob?: SortOrder
    skills?: SortOrder
    role?: SortOrder
    companyName?: SortOrder
    companyDesc?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    major?: SortOrder
    targetJob?: SortOrder
    skills?: SortOrder
    role?: SortOrder
    companyName?: SortOrder
    companyDesc?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    githubUrl?: SortOrder
    deployUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    githubUrl?: SortOrder
    deployUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    githubUrl?: SortOrder
    deployUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StatusHistoryListRelationFilter = {
    every?: StatusHistoryWhereInput
    some?: StatusHistoryWhereInput
    none?: StatusHistoryWhereInput
  }

  export type StatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobPostingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    url?: SortOrder
    deadline?: SortOrder
    interviewAt?: SortOrder
    status?: SortOrder
    contacts?: SortOrder
    followUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    url?: SortOrder
    deadline?: SortOrder
    interviewAt?: SortOrder
    status?: SortOrder
    contacts?: SortOrder
    followUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    url?: SortOrder
    deadline?: SortOrder
    interviewAt?: SortOrder
    status?: SortOrder
    contacts?: SortOrder
    followUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostingRelationFilter = {
    is?: JobPostingWhereInput
    isNot?: JobPostingWhereInput
  }

  export type StatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrder
  }

  export type StatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrder
  }

  export type StatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RoadmapItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobCategory?: SortOrder
    skill?: SortOrder
    status?: SortOrder
    referenceLinks?: SortOrder
    isCustom?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapItemAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type RoadmapItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobCategory?: SortOrder
    skill?: SortOrder
    status?: SortOrder
    referenceLinks?: SortOrder
    isCustom?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobCategory?: SortOrder
    skill?: SortOrder
    status?: SortOrder
    referenceLinks?: SortOrder
    isCustom?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapItemSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InterviewQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    jobType?: SortOrder
    question?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
  }

  export type InterviewQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    jobType?: SortOrder
    question?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
  }

  export type InterviewQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    jobType?: SortOrder
    question?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
  }

  export type InterviewQuestionRelationFilter = {
    is?: InterviewQuestionWhereInput
    isNot?: InterviewQuestionWhereInput
  }

  export type InterviewAnswerUserIdQuestionIdCompoundUniqueInput = {
    userId: string
    questionId: string
  }

  export type InterviewAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type JobPostingNullableRelationFilter = {
    is?: JobPostingWhereInput | null
    isNot?: JobPostingWhereInput | null
  }

  export type CoverLetterVersionListRelationFilter = {
    every?: CoverLetterVersionWhereInput
    some?: CoverLetterVersionWhereInput
    none?: CoverLetterVersionWhereInput
  }

  export type CoverLetterVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CoverLetterCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    items?: SortOrder
    version?: SortOrder
    analysisScore?: SortOrder
    analysisHistory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoverLetterAvgOrderByAggregateInput = {
    version?: SortOrder
    analysisScore?: SortOrder
  }

  export type CoverLetterMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    items?: SortOrder
    version?: SortOrder
    analysisScore?: SortOrder
    analysisHistory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoverLetterMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    items?: SortOrder
    version?: SortOrder
    analysisScore?: SortOrder
    analysisHistory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoverLetterSumOrderByAggregateInput = {
    version?: SortOrder
    analysisScore?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CoverLetterRelationFilter = {
    is?: CoverLetterWhereInput
    isNot?: CoverLetterWhereInput
  }

  export type CoverLetterVersionCountOrderByAggregateInput = {
    id?: SortOrder
    coverLetterId?: SortOrder
    version?: SortOrder
    items?: SortOrder
    savedAt?: SortOrder
  }

  export type CoverLetterVersionAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type CoverLetterVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    coverLetterId?: SortOrder
    version?: SortOrder
    items?: SortOrder
    savedAt?: SortOrder
  }

  export type CoverLetterVersionMinOrderByAggregateInput = {
    id?: SortOrder
    coverLetterId?: SortOrder
    version?: SortOrder
    items?: SortOrder
    savedAt?: SortOrder
  }

  export type CoverLetterVersionSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type JobListingCountOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    location?: SortOrder
    career?: SortOrder
    education?: SortOrder
    employType?: SortOrder
    salary?: SortOrder
    deadline?: SortOrder
    url?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    source?: SortOrder
    isActive?: SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobListingMaxOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    location?: SortOrder
    career?: SortOrder
    education?: SortOrder
    employType?: SortOrder
    salary?: SortOrder
    deadline?: SortOrder
    url?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    source?: SortOrder
    isActive?: SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobListingMinOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    location?: SortOrder
    career?: SortOrder
    education?: SortOrder
    employType?: SortOrder
    salary?: SortOrder
    deadline?: SortOrder
    url?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    source?: SortOrder
    isActive?: SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobListingRelationFilter = {
    is?: JobListingWhereInput
    isNot?: JobListingWhereInput
  }

  export type JobBookmarkUserIdListingIdCompoundUniqueInput = {
    userId: string
    listingId: string
  }

  export type JobBookmarkCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type JobBookmarkMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type JobBookmarkMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmploymentRecordCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    employType?: SortOrder
    startDate?: SortOrder
    salary?: SortOrder
    note?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EmploymentRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    employType?: SortOrder
    startDate?: SortOrder
    salary?: SortOrder
    note?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EmploymentRecordMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    company?: SortOrder
    position?: SortOrder
    employType?: SortOrder
    startDate?: SortOrder
    salary?: SortOrder
    note?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NoticeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoticeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoticeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type UserNotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type UserNotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioCreateNestedManyWithoutUserInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type JobPostingCreateNestedManyWithoutUserInput = {
    create?: XOR<JobPostingCreateWithoutUserInput, JobPostingUncheckedCreateWithoutUserInput> | JobPostingCreateWithoutUserInput[] | JobPostingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutUserInput | JobPostingCreateOrConnectWithoutUserInput[]
    createMany?: JobPostingCreateManyUserInputEnvelope
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
  }

  export type RoadmapItemCreateNestedManyWithoutUserInput = {
    create?: XOR<RoadmapItemCreateWithoutUserInput, RoadmapItemUncheckedCreateWithoutUserInput> | RoadmapItemCreateWithoutUserInput[] | RoadmapItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoadmapItemCreateOrConnectWithoutUserInput | RoadmapItemCreateOrConnectWithoutUserInput[]
    createMany?: RoadmapItemCreateManyUserInputEnvelope
    connect?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
  }

  export type InterviewAnswerCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewAnswerCreateWithoutUserInput, InterviewAnswerUncheckedCreateWithoutUserInput> | InterviewAnswerCreateWithoutUserInput[] | InterviewAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutUserInput | InterviewAnswerCreateOrConnectWithoutUserInput[]
    createMany?: InterviewAnswerCreateManyUserInputEnvelope
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
  }

  export type InterviewQuestionCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewQuestionCreateWithoutUserInput, InterviewQuestionUncheckedCreateWithoutUserInput> | InterviewQuestionCreateWithoutUserInput[] | InterviewQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutUserInput | InterviewQuestionCreateOrConnectWithoutUserInput[]
    createMany?: InterviewQuestionCreateManyUserInputEnvelope
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
  }

  export type CoverLetterCreateNestedManyWithoutUserInput = {
    create?: XOR<CoverLetterCreateWithoutUserInput, CoverLetterUncheckedCreateWithoutUserInput> | CoverLetterCreateWithoutUserInput[] | CoverLetterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutUserInput | CoverLetterCreateOrConnectWithoutUserInput[]
    createMany?: CoverLetterCreateManyUserInputEnvelope
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
  }

  export type UserNotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<UserNotificationCreateWithoutUserInput, UserNotificationUncheckedCreateWithoutUserInput> | UserNotificationCreateWithoutUserInput[] | UserNotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserNotificationCreateOrConnectWithoutUserInput | UserNotificationCreateOrConnectWithoutUserInput[]
    createMany?: UserNotificationCreateManyUserInputEnvelope
    connect?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
  }

  export type JobBookmarkCreateNestedManyWithoutUserInput = {
    create?: XOR<JobBookmarkCreateWithoutUserInput, JobBookmarkUncheckedCreateWithoutUserInput> | JobBookmarkCreateWithoutUserInput[] | JobBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutUserInput | JobBookmarkCreateOrConnectWithoutUserInput[]
    createMany?: JobBookmarkCreateManyUserInputEnvelope
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
  }

  export type JobListingCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<JobListingCreateWithoutRecruiterInput, JobListingUncheckedCreateWithoutRecruiterInput> | JobListingCreateWithoutRecruiterInput[] | JobListingUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutRecruiterInput | JobListingCreateOrConnectWithoutRecruiterInput[]
    createMany?: JobListingCreateManyRecruiterInputEnvelope
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type JobPostingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JobPostingCreateWithoutUserInput, JobPostingUncheckedCreateWithoutUserInput> | JobPostingCreateWithoutUserInput[] | JobPostingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutUserInput | JobPostingCreateOrConnectWithoutUserInput[]
    createMany?: JobPostingCreateManyUserInputEnvelope
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
  }

  export type RoadmapItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RoadmapItemCreateWithoutUserInput, RoadmapItemUncheckedCreateWithoutUserInput> | RoadmapItemCreateWithoutUserInput[] | RoadmapItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoadmapItemCreateOrConnectWithoutUserInput | RoadmapItemCreateOrConnectWithoutUserInput[]
    createMany?: RoadmapItemCreateManyUserInputEnvelope
    connect?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
  }

  export type InterviewAnswerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewAnswerCreateWithoutUserInput, InterviewAnswerUncheckedCreateWithoutUserInput> | InterviewAnswerCreateWithoutUserInput[] | InterviewAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutUserInput | InterviewAnswerCreateOrConnectWithoutUserInput[]
    createMany?: InterviewAnswerCreateManyUserInputEnvelope
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
  }

  export type InterviewQuestionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewQuestionCreateWithoutUserInput, InterviewQuestionUncheckedCreateWithoutUserInput> | InterviewQuestionCreateWithoutUserInput[] | InterviewQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutUserInput | InterviewQuestionCreateOrConnectWithoutUserInput[]
    createMany?: InterviewQuestionCreateManyUserInputEnvelope
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
  }

  export type CoverLetterUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CoverLetterCreateWithoutUserInput, CoverLetterUncheckedCreateWithoutUserInput> | CoverLetterCreateWithoutUserInput[] | CoverLetterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutUserInput | CoverLetterCreateOrConnectWithoutUserInput[]
    createMany?: CoverLetterCreateManyUserInputEnvelope
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
  }

  export type UserNotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserNotificationCreateWithoutUserInput, UserNotificationUncheckedCreateWithoutUserInput> | UserNotificationCreateWithoutUserInput[] | UserNotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserNotificationCreateOrConnectWithoutUserInput | UserNotificationCreateOrConnectWithoutUserInput[]
    createMany?: UserNotificationCreateManyUserInputEnvelope
    connect?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
  }

  export type JobBookmarkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JobBookmarkCreateWithoutUserInput, JobBookmarkUncheckedCreateWithoutUserInput> | JobBookmarkCreateWithoutUserInput[] | JobBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutUserInput | JobBookmarkCreateOrConnectWithoutUserInput[]
    createMany?: JobBookmarkCreateManyUserInputEnvelope
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
  }

  export type JobListingUncheckedCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<JobListingCreateWithoutRecruiterInput, JobListingUncheckedCreateWithoutRecruiterInput> | JobListingCreateWithoutRecruiterInput[] | JobListingUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutRecruiterInput | JobListingCreateOrConnectWithoutRecruiterInput[]
    createMany?: JobListingCreateManyRecruiterInputEnvelope
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PortfolioUpdateManyWithoutUserNestedInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutUserInput | PortfolioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutUserInput | PortfolioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutUserInput | PortfolioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type JobPostingUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobPostingCreateWithoutUserInput, JobPostingUncheckedCreateWithoutUserInput> | JobPostingCreateWithoutUserInput[] | JobPostingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutUserInput | JobPostingCreateOrConnectWithoutUserInput[]
    upsert?: JobPostingUpsertWithWhereUniqueWithoutUserInput | JobPostingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobPostingCreateManyUserInputEnvelope
    set?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    disconnect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    delete?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    update?: JobPostingUpdateWithWhereUniqueWithoutUserInput | JobPostingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobPostingUpdateManyWithWhereWithoutUserInput | JobPostingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
  }

  export type RoadmapItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoadmapItemCreateWithoutUserInput, RoadmapItemUncheckedCreateWithoutUserInput> | RoadmapItemCreateWithoutUserInput[] | RoadmapItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoadmapItemCreateOrConnectWithoutUserInput | RoadmapItemCreateOrConnectWithoutUserInput[]
    upsert?: RoadmapItemUpsertWithWhereUniqueWithoutUserInput | RoadmapItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoadmapItemCreateManyUserInputEnvelope
    set?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    disconnect?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    delete?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    connect?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    update?: RoadmapItemUpdateWithWhereUniqueWithoutUserInput | RoadmapItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoadmapItemUpdateManyWithWhereWithoutUserInput | RoadmapItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoadmapItemScalarWhereInput | RoadmapItemScalarWhereInput[]
  }

  export type InterviewAnswerUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewAnswerCreateWithoutUserInput, InterviewAnswerUncheckedCreateWithoutUserInput> | InterviewAnswerCreateWithoutUserInput[] | InterviewAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutUserInput | InterviewAnswerCreateOrConnectWithoutUserInput[]
    upsert?: InterviewAnswerUpsertWithWhereUniqueWithoutUserInput | InterviewAnswerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewAnswerCreateManyUserInputEnvelope
    set?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    disconnect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    delete?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    update?: InterviewAnswerUpdateWithWhereUniqueWithoutUserInput | InterviewAnswerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewAnswerUpdateManyWithWhereWithoutUserInput | InterviewAnswerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewAnswerScalarWhereInput | InterviewAnswerScalarWhereInput[]
  }

  export type InterviewQuestionUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewQuestionCreateWithoutUserInput, InterviewQuestionUncheckedCreateWithoutUserInput> | InterviewQuestionCreateWithoutUserInput[] | InterviewQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutUserInput | InterviewQuestionCreateOrConnectWithoutUserInput[]
    upsert?: InterviewQuestionUpsertWithWhereUniqueWithoutUserInput | InterviewQuestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewQuestionCreateManyUserInputEnvelope
    set?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    disconnect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    delete?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    update?: InterviewQuestionUpdateWithWhereUniqueWithoutUserInput | InterviewQuestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewQuestionUpdateManyWithWhereWithoutUserInput | InterviewQuestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
  }

  export type CoverLetterUpdateManyWithoutUserNestedInput = {
    create?: XOR<CoverLetterCreateWithoutUserInput, CoverLetterUncheckedCreateWithoutUserInput> | CoverLetterCreateWithoutUserInput[] | CoverLetterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutUserInput | CoverLetterCreateOrConnectWithoutUserInput[]
    upsert?: CoverLetterUpsertWithWhereUniqueWithoutUserInput | CoverLetterUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CoverLetterCreateManyUserInputEnvelope
    set?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    disconnect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    delete?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    update?: CoverLetterUpdateWithWhereUniqueWithoutUserInput | CoverLetterUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CoverLetterUpdateManyWithWhereWithoutUserInput | CoverLetterUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CoverLetterScalarWhereInput | CoverLetterScalarWhereInput[]
  }

  export type UserNotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserNotificationCreateWithoutUserInput, UserNotificationUncheckedCreateWithoutUserInput> | UserNotificationCreateWithoutUserInput[] | UserNotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserNotificationCreateOrConnectWithoutUserInput | UserNotificationCreateOrConnectWithoutUserInput[]
    upsert?: UserNotificationUpsertWithWhereUniqueWithoutUserInput | UserNotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserNotificationCreateManyUserInputEnvelope
    set?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    disconnect?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    delete?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    connect?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    update?: UserNotificationUpdateWithWhereUniqueWithoutUserInput | UserNotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserNotificationUpdateManyWithWhereWithoutUserInput | UserNotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserNotificationScalarWhereInput | UserNotificationScalarWhereInput[]
  }

  export type JobBookmarkUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobBookmarkCreateWithoutUserInput, JobBookmarkUncheckedCreateWithoutUserInput> | JobBookmarkCreateWithoutUserInput[] | JobBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutUserInput | JobBookmarkCreateOrConnectWithoutUserInput[]
    upsert?: JobBookmarkUpsertWithWhereUniqueWithoutUserInput | JobBookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobBookmarkCreateManyUserInputEnvelope
    set?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    disconnect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    delete?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    update?: JobBookmarkUpdateWithWhereUniqueWithoutUserInput | JobBookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobBookmarkUpdateManyWithWhereWithoutUserInput | JobBookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobBookmarkScalarWhereInput | JobBookmarkScalarWhereInput[]
  }

  export type JobListingUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<JobListingCreateWithoutRecruiterInput, JobListingUncheckedCreateWithoutRecruiterInput> | JobListingCreateWithoutRecruiterInput[] | JobListingUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutRecruiterInput | JobListingCreateOrConnectWithoutRecruiterInput[]
    upsert?: JobListingUpsertWithWhereUniqueWithoutRecruiterInput | JobListingUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: JobListingCreateManyRecruiterInputEnvelope
    set?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    disconnect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    delete?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    update?: JobListingUpdateWithWhereUniqueWithoutRecruiterInput | JobListingUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: JobListingUpdateManyWithWhereWithoutRecruiterInput | JobListingUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutUserInput | PortfolioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutUserInput | PortfolioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutUserInput | PortfolioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type JobPostingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobPostingCreateWithoutUserInput, JobPostingUncheckedCreateWithoutUserInput> | JobPostingCreateWithoutUserInput[] | JobPostingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutUserInput | JobPostingCreateOrConnectWithoutUserInput[]
    upsert?: JobPostingUpsertWithWhereUniqueWithoutUserInput | JobPostingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobPostingCreateManyUserInputEnvelope
    set?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    disconnect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    delete?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    update?: JobPostingUpdateWithWhereUniqueWithoutUserInput | JobPostingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobPostingUpdateManyWithWhereWithoutUserInput | JobPostingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
  }

  export type RoadmapItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoadmapItemCreateWithoutUserInput, RoadmapItemUncheckedCreateWithoutUserInput> | RoadmapItemCreateWithoutUserInput[] | RoadmapItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoadmapItemCreateOrConnectWithoutUserInput | RoadmapItemCreateOrConnectWithoutUserInput[]
    upsert?: RoadmapItemUpsertWithWhereUniqueWithoutUserInput | RoadmapItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoadmapItemCreateManyUserInputEnvelope
    set?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    disconnect?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    delete?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    connect?: RoadmapItemWhereUniqueInput | RoadmapItemWhereUniqueInput[]
    update?: RoadmapItemUpdateWithWhereUniqueWithoutUserInput | RoadmapItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoadmapItemUpdateManyWithWhereWithoutUserInput | RoadmapItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoadmapItemScalarWhereInput | RoadmapItemScalarWhereInput[]
  }

  export type InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewAnswerCreateWithoutUserInput, InterviewAnswerUncheckedCreateWithoutUserInput> | InterviewAnswerCreateWithoutUserInput[] | InterviewAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutUserInput | InterviewAnswerCreateOrConnectWithoutUserInput[]
    upsert?: InterviewAnswerUpsertWithWhereUniqueWithoutUserInput | InterviewAnswerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewAnswerCreateManyUserInputEnvelope
    set?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    disconnect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    delete?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    update?: InterviewAnswerUpdateWithWhereUniqueWithoutUserInput | InterviewAnswerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewAnswerUpdateManyWithWhereWithoutUserInput | InterviewAnswerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewAnswerScalarWhereInput | InterviewAnswerScalarWhereInput[]
  }

  export type InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewQuestionCreateWithoutUserInput, InterviewQuestionUncheckedCreateWithoutUserInput> | InterviewQuestionCreateWithoutUserInput[] | InterviewQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutUserInput | InterviewQuestionCreateOrConnectWithoutUserInput[]
    upsert?: InterviewQuestionUpsertWithWhereUniqueWithoutUserInput | InterviewQuestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewQuestionCreateManyUserInputEnvelope
    set?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    disconnect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    delete?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    update?: InterviewQuestionUpdateWithWhereUniqueWithoutUserInput | InterviewQuestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewQuestionUpdateManyWithWhereWithoutUserInput | InterviewQuestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
  }

  export type CoverLetterUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CoverLetterCreateWithoutUserInput, CoverLetterUncheckedCreateWithoutUserInput> | CoverLetterCreateWithoutUserInput[] | CoverLetterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutUserInput | CoverLetterCreateOrConnectWithoutUserInput[]
    upsert?: CoverLetterUpsertWithWhereUniqueWithoutUserInput | CoverLetterUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CoverLetterCreateManyUserInputEnvelope
    set?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    disconnect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    delete?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    update?: CoverLetterUpdateWithWhereUniqueWithoutUserInput | CoverLetterUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CoverLetterUpdateManyWithWhereWithoutUserInput | CoverLetterUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CoverLetterScalarWhereInput | CoverLetterScalarWhereInput[]
  }

  export type UserNotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserNotificationCreateWithoutUserInput, UserNotificationUncheckedCreateWithoutUserInput> | UserNotificationCreateWithoutUserInput[] | UserNotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserNotificationCreateOrConnectWithoutUserInput | UserNotificationCreateOrConnectWithoutUserInput[]
    upsert?: UserNotificationUpsertWithWhereUniqueWithoutUserInput | UserNotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserNotificationCreateManyUserInputEnvelope
    set?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    disconnect?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    delete?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    connect?: UserNotificationWhereUniqueInput | UserNotificationWhereUniqueInput[]
    update?: UserNotificationUpdateWithWhereUniqueWithoutUserInput | UserNotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserNotificationUpdateManyWithWhereWithoutUserInput | UserNotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserNotificationScalarWhereInput | UserNotificationScalarWhereInput[]
  }

  export type JobBookmarkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobBookmarkCreateWithoutUserInput, JobBookmarkUncheckedCreateWithoutUserInput> | JobBookmarkCreateWithoutUserInput[] | JobBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutUserInput | JobBookmarkCreateOrConnectWithoutUserInput[]
    upsert?: JobBookmarkUpsertWithWhereUniqueWithoutUserInput | JobBookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobBookmarkCreateManyUserInputEnvelope
    set?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    disconnect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    delete?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    update?: JobBookmarkUpdateWithWhereUniqueWithoutUserInput | JobBookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobBookmarkUpdateManyWithWhereWithoutUserInput | JobBookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobBookmarkScalarWhereInput | JobBookmarkScalarWhereInput[]
  }

  export type JobListingUncheckedUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<JobListingCreateWithoutRecruiterInput, JobListingUncheckedCreateWithoutRecruiterInput> | JobListingCreateWithoutRecruiterInput[] | JobListingUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutRecruiterInput | JobListingCreateOrConnectWithoutRecruiterInput[]
    upsert?: JobListingUpsertWithWhereUniqueWithoutRecruiterInput | JobListingUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: JobListingCreateManyRecruiterInputEnvelope
    set?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    disconnect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    delete?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    update?: JobListingUpdateWithWhereUniqueWithoutRecruiterInput | JobListingUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: JobListingUpdateManyWithWhereWithoutRecruiterInput | JobListingUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfoliosInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutPortfoliosNestedInput = {
    create?: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfoliosInput
    upsert?: UserUpsertWithoutPortfoliosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPortfoliosInput, UserUpdateWithoutPortfoliosInput>, UserUncheckedUpdateWithoutPortfoliosInput>
  }

  export type UserCreateNestedOneWithoutJobPostingsInput = {
    create?: XOR<UserCreateWithoutJobPostingsInput, UserUncheckedCreateWithoutJobPostingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobPostingsInput
    connect?: UserWhereUniqueInput
  }

  export type StatusHistoryCreateNestedManyWithoutJobInput = {
    create?: XOR<StatusHistoryCreateWithoutJobInput, StatusHistoryUncheckedCreateWithoutJobInput> | StatusHistoryCreateWithoutJobInput[] | StatusHistoryUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StatusHistoryCreateOrConnectWithoutJobInput | StatusHistoryCreateOrConnectWithoutJobInput[]
    createMany?: StatusHistoryCreateManyJobInputEnvelope
    connect?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
  }

  export type CoverLetterCreateNestedManyWithoutJobInput = {
    create?: XOR<CoverLetterCreateWithoutJobInput, CoverLetterUncheckedCreateWithoutJobInput> | CoverLetterCreateWithoutJobInput[] | CoverLetterUncheckedCreateWithoutJobInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutJobInput | CoverLetterCreateOrConnectWithoutJobInput[]
    createMany?: CoverLetterCreateManyJobInputEnvelope
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
  }

  export type StatusHistoryUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<StatusHistoryCreateWithoutJobInput, StatusHistoryUncheckedCreateWithoutJobInput> | StatusHistoryCreateWithoutJobInput[] | StatusHistoryUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StatusHistoryCreateOrConnectWithoutJobInput | StatusHistoryCreateOrConnectWithoutJobInput[]
    createMany?: StatusHistoryCreateManyJobInputEnvelope
    connect?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
  }

  export type CoverLetterUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<CoverLetterCreateWithoutJobInput, CoverLetterUncheckedCreateWithoutJobInput> | CoverLetterCreateWithoutJobInput[] | CoverLetterUncheckedCreateWithoutJobInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutJobInput | CoverLetterCreateOrConnectWithoutJobInput[]
    createMany?: CoverLetterCreateManyJobInputEnvelope
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutJobPostingsNestedInput = {
    create?: XOR<UserCreateWithoutJobPostingsInput, UserUncheckedCreateWithoutJobPostingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobPostingsInput
    upsert?: UserUpsertWithoutJobPostingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobPostingsInput, UserUpdateWithoutJobPostingsInput>, UserUncheckedUpdateWithoutJobPostingsInput>
  }

  export type StatusHistoryUpdateManyWithoutJobNestedInput = {
    create?: XOR<StatusHistoryCreateWithoutJobInput, StatusHistoryUncheckedCreateWithoutJobInput> | StatusHistoryCreateWithoutJobInput[] | StatusHistoryUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StatusHistoryCreateOrConnectWithoutJobInput | StatusHistoryCreateOrConnectWithoutJobInput[]
    upsert?: StatusHistoryUpsertWithWhereUniqueWithoutJobInput | StatusHistoryUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: StatusHistoryCreateManyJobInputEnvelope
    set?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    disconnect?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    delete?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    connect?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    update?: StatusHistoryUpdateWithWhereUniqueWithoutJobInput | StatusHistoryUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: StatusHistoryUpdateManyWithWhereWithoutJobInput | StatusHistoryUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: StatusHistoryScalarWhereInput | StatusHistoryScalarWhereInput[]
  }

  export type CoverLetterUpdateManyWithoutJobNestedInput = {
    create?: XOR<CoverLetterCreateWithoutJobInput, CoverLetterUncheckedCreateWithoutJobInput> | CoverLetterCreateWithoutJobInput[] | CoverLetterUncheckedCreateWithoutJobInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutJobInput | CoverLetterCreateOrConnectWithoutJobInput[]
    upsert?: CoverLetterUpsertWithWhereUniqueWithoutJobInput | CoverLetterUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: CoverLetterCreateManyJobInputEnvelope
    set?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    disconnect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    delete?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    update?: CoverLetterUpdateWithWhereUniqueWithoutJobInput | CoverLetterUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: CoverLetterUpdateManyWithWhereWithoutJobInput | CoverLetterUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: CoverLetterScalarWhereInput | CoverLetterScalarWhereInput[]
  }

  export type StatusHistoryUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<StatusHistoryCreateWithoutJobInput, StatusHistoryUncheckedCreateWithoutJobInput> | StatusHistoryCreateWithoutJobInput[] | StatusHistoryUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StatusHistoryCreateOrConnectWithoutJobInput | StatusHistoryCreateOrConnectWithoutJobInput[]
    upsert?: StatusHistoryUpsertWithWhereUniqueWithoutJobInput | StatusHistoryUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: StatusHistoryCreateManyJobInputEnvelope
    set?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    disconnect?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    delete?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    connect?: StatusHistoryWhereUniqueInput | StatusHistoryWhereUniqueInput[]
    update?: StatusHistoryUpdateWithWhereUniqueWithoutJobInput | StatusHistoryUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: StatusHistoryUpdateManyWithWhereWithoutJobInput | StatusHistoryUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: StatusHistoryScalarWhereInput | StatusHistoryScalarWhereInput[]
  }

  export type CoverLetterUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<CoverLetterCreateWithoutJobInput, CoverLetterUncheckedCreateWithoutJobInput> | CoverLetterCreateWithoutJobInput[] | CoverLetterUncheckedCreateWithoutJobInput[]
    connectOrCreate?: CoverLetterCreateOrConnectWithoutJobInput | CoverLetterCreateOrConnectWithoutJobInput[]
    upsert?: CoverLetterUpsertWithWhereUniqueWithoutJobInput | CoverLetterUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: CoverLetterCreateManyJobInputEnvelope
    set?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    disconnect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    delete?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    connect?: CoverLetterWhereUniqueInput | CoverLetterWhereUniqueInput[]
    update?: CoverLetterUpdateWithWhereUniqueWithoutJobInput | CoverLetterUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: CoverLetterUpdateManyWithWhereWithoutJobInput | CoverLetterUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: CoverLetterScalarWhereInput | CoverLetterScalarWhereInput[]
  }

  export type JobPostingCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<JobPostingCreateWithoutStatusHistoryInput, JobPostingUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutStatusHistoryInput
    connect?: JobPostingWhereUniqueInput
  }

  export type JobPostingUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<JobPostingCreateWithoutStatusHistoryInput, JobPostingUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutStatusHistoryInput
    upsert?: JobPostingUpsertWithoutStatusHistoryInput
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutStatusHistoryInput, JobPostingUpdateWithoutStatusHistoryInput>, JobPostingUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type UserCreateNestedOneWithoutRoadmapItemsInput = {
    create?: XOR<UserCreateWithoutRoadmapItemsInput, UserUncheckedCreateWithoutRoadmapItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoadmapItemsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutRoadmapItemsNestedInput = {
    create?: XOR<UserCreateWithoutRoadmapItemsInput, UserUncheckedCreateWithoutRoadmapItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoadmapItemsInput
    upsert?: UserUpsertWithoutRoadmapItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoadmapItemsInput, UserUpdateWithoutRoadmapItemsInput>, UserUncheckedUpdateWithoutRoadmapItemsInput>
  }

  export type UserCreateNestedOneWithoutCustomQuestionsInput = {
    create?: XOR<UserCreateWithoutCustomQuestionsInput, UserUncheckedCreateWithoutCustomQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomQuestionsInput
    connect?: UserWhereUniqueInput
  }

  export type InterviewAnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<InterviewAnswerCreateWithoutQuestionInput, InterviewAnswerUncheckedCreateWithoutQuestionInput> | InterviewAnswerCreateWithoutQuestionInput[] | InterviewAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutQuestionInput | InterviewAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: InterviewAnswerCreateManyQuestionInputEnvelope
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
  }

  export type InterviewAnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<InterviewAnswerCreateWithoutQuestionInput, InterviewAnswerUncheckedCreateWithoutQuestionInput> | InterviewAnswerCreateWithoutQuestionInput[] | InterviewAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutQuestionInput | InterviewAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: InterviewAnswerCreateManyQuestionInputEnvelope
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutCustomQuestionsNestedInput = {
    create?: XOR<UserCreateWithoutCustomQuestionsInput, UserUncheckedCreateWithoutCustomQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomQuestionsInput
    upsert?: UserUpsertWithoutCustomQuestionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomQuestionsInput, UserUpdateWithoutCustomQuestionsInput>, UserUncheckedUpdateWithoutCustomQuestionsInput>
  }

  export type InterviewAnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<InterviewAnswerCreateWithoutQuestionInput, InterviewAnswerUncheckedCreateWithoutQuestionInput> | InterviewAnswerCreateWithoutQuestionInput[] | InterviewAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutQuestionInput | InterviewAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: InterviewAnswerUpsertWithWhereUniqueWithoutQuestionInput | InterviewAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: InterviewAnswerCreateManyQuestionInputEnvelope
    set?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    disconnect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    delete?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    update?: InterviewAnswerUpdateWithWhereUniqueWithoutQuestionInput | InterviewAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: InterviewAnswerUpdateManyWithWhereWithoutQuestionInput | InterviewAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: InterviewAnswerScalarWhereInput | InterviewAnswerScalarWhereInput[]
  }

  export type InterviewAnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<InterviewAnswerCreateWithoutQuestionInput, InterviewAnswerUncheckedCreateWithoutQuestionInput> | InterviewAnswerCreateWithoutQuestionInput[] | InterviewAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: InterviewAnswerCreateOrConnectWithoutQuestionInput | InterviewAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: InterviewAnswerUpsertWithWhereUniqueWithoutQuestionInput | InterviewAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: InterviewAnswerCreateManyQuestionInputEnvelope
    set?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    disconnect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    delete?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    connect?: InterviewAnswerWhereUniqueInput | InterviewAnswerWhereUniqueInput[]
    update?: InterviewAnswerUpdateWithWhereUniqueWithoutQuestionInput | InterviewAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: InterviewAnswerUpdateManyWithWhereWithoutQuestionInput | InterviewAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: InterviewAnswerScalarWhereInput | InterviewAnswerScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInterviewAnswersInput = {
    create?: XOR<UserCreateWithoutInterviewAnswersInput, UserUncheckedCreateWithoutInterviewAnswersInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewAnswersInput
    connect?: UserWhereUniqueInput
  }

  export type InterviewQuestionCreateNestedOneWithoutAnswersInput = {
    create?: XOR<InterviewQuestionCreateWithoutAnswersInput, InterviewQuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutAnswersInput
    connect?: InterviewQuestionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutInterviewAnswersNestedInput = {
    create?: XOR<UserCreateWithoutInterviewAnswersInput, UserUncheckedCreateWithoutInterviewAnswersInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewAnswersInput
    upsert?: UserUpsertWithoutInterviewAnswersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInterviewAnswersInput, UserUpdateWithoutInterviewAnswersInput>, UserUncheckedUpdateWithoutInterviewAnswersInput>
  }

  export type InterviewQuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<InterviewQuestionCreateWithoutAnswersInput, InterviewQuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutAnswersInput
    upsert?: InterviewQuestionUpsertWithoutAnswersInput
    connect?: InterviewQuestionWhereUniqueInput
    update?: XOR<XOR<InterviewQuestionUpdateToOneWithWhereWithoutAnswersInput, InterviewQuestionUpdateWithoutAnswersInput>, InterviewQuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type UserCreateNestedOneWithoutCoverLettersInput = {
    create?: XOR<UserCreateWithoutCoverLettersInput, UserUncheckedCreateWithoutCoverLettersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoverLettersInput
    connect?: UserWhereUniqueInput
  }

  export type JobPostingCreateNestedOneWithoutCoverLettersInput = {
    create?: XOR<JobPostingCreateWithoutCoverLettersInput, JobPostingUncheckedCreateWithoutCoverLettersInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutCoverLettersInput
    connect?: JobPostingWhereUniqueInput
  }

  export type CoverLetterVersionCreateNestedManyWithoutCoverLetterInput = {
    create?: XOR<CoverLetterVersionCreateWithoutCoverLetterInput, CoverLetterVersionUncheckedCreateWithoutCoverLetterInput> | CoverLetterVersionCreateWithoutCoverLetterInput[] | CoverLetterVersionUncheckedCreateWithoutCoverLetterInput[]
    connectOrCreate?: CoverLetterVersionCreateOrConnectWithoutCoverLetterInput | CoverLetterVersionCreateOrConnectWithoutCoverLetterInput[]
    createMany?: CoverLetterVersionCreateManyCoverLetterInputEnvelope
    connect?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
  }

  export type CoverLetterVersionUncheckedCreateNestedManyWithoutCoverLetterInput = {
    create?: XOR<CoverLetterVersionCreateWithoutCoverLetterInput, CoverLetterVersionUncheckedCreateWithoutCoverLetterInput> | CoverLetterVersionCreateWithoutCoverLetterInput[] | CoverLetterVersionUncheckedCreateWithoutCoverLetterInput[]
    connectOrCreate?: CoverLetterVersionCreateOrConnectWithoutCoverLetterInput | CoverLetterVersionCreateOrConnectWithoutCoverLetterInput[]
    createMany?: CoverLetterVersionCreateManyCoverLetterInputEnvelope
    connect?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCoverLettersNestedInput = {
    create?: XOR<UserCreateWithoutCoverLettersInput, UserUncheckedCreateWithoutCoverLettersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoverLettersInput
    upsert?: UserUpsertWithoutCoverLettersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCoverLettersInput, UserUpdateWithoutCoverLettersInput>, UserUncheckedUpdateWithoutCoverLettersInput>
  }

  export type JobPostingUpdateOneWithoutCoverLettersNestedInput = {
    create?: XOR<JobPostingCreateWithoutCoverLettersInput, JobPostingUncheckedCreateWithoutCoverLettersInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutCoverLettersInput
    upsert?: JobPostingUpsertWithoutCoverLettersInput
    disconnect?: JobPostingWhereInput | boolean
    delete?: JobPostingWhereInput | boolean
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutCoverLettersInput, JobPostingUpdateWithoutCoverLettersInput>, JobPostingUncheckedUpdateWithoutCoverLettersInput>
  }

  export type CoverLetterVersionUpdateManyWithoutCoverLetterNestedInput = {
    create?: XOR<CoverLetterVersionCreateWithoutCoverLetterInput, CoverLetterVersionUncheckedCreateWithoutCoverLetterInput> | CoverLetterVersionCreateWithoutCoverLetterInput[] | CoverLetterVersionUncheckedCreateWithoutCoverLetterInput[]
    connectOrCreate?: CoverLetterVersionCreateOrConnectWithoutCoverLetterInput | CoverLetterVersionCreateOrConnectWithoutCoverLetterInput[]
    upsert?: CoverLetterVersionUpsertWithWhereUniqueWithoutCoverLetterInput | CoverLetterVersionUpsertWithWhereUniqueWithoutCoverLetterInput[]
    createMany?: CoverLetterVersionCreateManyCoverLetterInputEnvelope
    set?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    disconnect?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    delete?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    connect?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    update?: CoverLetterVersionUpdateWithWhereUniqueWithoutCoverLetterInput | CoverLetterVersionUpdateWithWhereUniqueWithoutCoverLetterInput[]
    updateMany?: CoverLetterVersionUpdateManyWithWhereWithoutCoverLetterInput | CoverLetterVersionUpdateManyWithWhereWithoutCoverLetterInput[]
    deleteMany?: CoverLetterVersionScalarWhereInput | CoverLetterVersionScalarWhereInput[]
  }

  export type CoverLetterVersionUncheckedUpdateManyWithoutCoverLetterNestedInput = {
    create?: XOR<CoverLetterVersionCreateWithoutCoverLetterInput, CoverLetterVersionUncheckedCreateWithoutCoverLetterInput> | CoverLetterVersionCreateWithoutCoverLetterInput[] | CoverLetterVersionUncheckedCreateWithoutCoverLetterInput[]
    connectOrCreate?: CoverLetterVersionCreateOrConnectWithoutCoverLetterInput | CoverLetterVersionCreateOrConnectWithoutCoverLetterInput[]
    upsert?: CoverLetterVersionUpsertWithWhereUniqueWithoutCoverLetterInput | CoverLetterVersionUpsertWithWhereUniqueWithoutCoverLetterInput[]
    createMany?: CoverLetterVersionCreateManyCoverLetterInputEnvelope
    set?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    disconnect?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    delete?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    connect?: CoverLetterVersionWhereUniqueInput | CoverLetterVersionWhereUniqueInput[]
    update?: CoverLetterVersionUpdateWithWhereUniqueWithoutCoverLetterInput | CoverLetterVersionUpdateWithWhereUniqueWithoutCoverLetterInput[]
    updateMany?: CoverLetterVersionUpdateManyWithWhereWithoutCoverLetterInput | CoverLetterVersionUpdateManyWithWhereWithoutCoverLetterInput[]
    deleteMany?: CoverLetterVersionScalarWhereInput | CoverLetterVersionScalarWhereInput[]
  }

  export type CoverLetterCreateNestedOneWithoutVersionsInput = {
    create?: XOR<CoverLetterCreateWithoutVersionsInput, CoverLetterUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: CoverLetterCreateOrConnectWithoutVersionsInput
    connect?: CoverLetterWhereUniqueInput
  }

  export type CoverLetterUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<CoverLetterCreateWithoutVersionsInput, CoverLetterUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: CoverLetterCreateOrConnectWithoutVersionsInput
    upsert?: CoverLetterUpsertWithoutVersionsInput
    connect?: CoverLetterWhereUniqueInput
    update?: XOR<XOR<CoverLetterUpdateToOneWithWhereWithoutVersionsInput, CoverLetterUpdateWithoutVersionsInput>, CoverLetterUncheckedUpdateWithoutVersionsInput>
  }

  export type UserCreateNestedOneWithoutRecruitListingsInput = {
    create?: XOR<UserCreateWithoutRecruitListingsInput, UserUncheckedCreateWithoutRecruitListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecruitListingsInput
    connect?: UserWhereUniqueInput
  }

  export type JobBookmarkCreateNestedManyWithoutListingInput = {
    create?: XOR<JobBookmarkCreateWithoutListingInput, JobBookmarkUncheckedCreateWithoutListingInput> | JobBookmarkCreateWithoutListingInput[] | JobBookmarkUncheckedCreateWithoutListingInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutListingInput | JobBookmarkCreateOrConnectWithoutListingInput[]
    createMany?: JobBookmarkCreateManyListingInputEnvelope
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
  }

  export type JobBookmarkUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<JobBookmarkCreateWithoutListingInput, JobBookmarkUncheckedCreateWithoutListingInput> | JobBookmarkCreateWithoutListingInput[] | JobBookmarkUncheckedCreateWithoutListingInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutListingInput | JobBookmarkCreateOrConnectWithoutListingInput[]
    createMany?: JobBookmarkCreateManyListingInputEnvelope
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutRecruitListingsNestedInput = {
    create?: XOR<UserCreateWithoutRecruitListingsInput, UserUncheckedCreateWithoutRecruitListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecruitListingsInput
    upsert?: UserUpsertWithoutRecruitListingsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecruitListingsInput, UserUpdateWithoutRecruitListingsInput>, UserUncheckedUpdateWithoutRecruitListingsInput>
  }

  export type JobBookmarkUpdateManyWithoutListingNestedInput = {
    create?: XOR<JobBookmarkCreateWithoutListingInput, JobBookmarkUncheckedCreateWithoutListingInput> | JobBookmarkCreateWithoutListingInput[] | JobBookmarkUncheckedCreateWithoutListingInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutListingInput | JobBookmarkCreateOrConnectWithoutListingInput[]
    upsert?: JobBookmarkUpsertWithWhereUniqueWithoutListingInput | JobBookmarkUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: JobBookmarkCreateManyListingInputEnvelope
    set?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    disconnect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    delete?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    update?: JobBookmarkUpdateWithWhereUniqueWithoutListingInput | JobBookmarkUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: JobBookmarkUpdateManyWithWhereWithoutListingInput | JobBookmarkUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: JobBookmarkScalarWhereInput | JobBookmarkScalarWhereInput[]
  }

  export type JobBookmarkUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<JobBookmarkCreateWithoutListingInput, JobBookmarkUncheckedCreateWithoutListingInput> | JobBookmarkCreateWithoutListingInput[] | JobBookmarkUncheckedCreateWithoutListingInput[]
    connectOrCreate?: JobBookmarkCreateOrConnectWithoutListingInput | JobBookmarkCreateOrConnectWithoutListingInput[]
    upsert?: JobBookmarkUpsertWithWhereUniqueWithoutListingInput | JobBookmarkUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: JobBookmarkCreateManyListingInputEnvelope
    set?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    disconnect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    delete?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    connect?: JobBookmarkWhereUniqueInput | JobBookmarkWhereUniqueInput[]
    update?: JobBookmarkUpdateWithWhereUniqueWithoutListingInput | JobBookmarkUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: JobBookmarkUpdateManyWithWhereWithoutListingInput | JobBookmarkUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: JobBookmarkScalarWhereInput | JobBookmarkScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    connect?: UserWhereUniqueInput
  }

  export type JobListingCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<JobListingCreateWithoutBookmarksInput, JobListingUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: JobListingCreateOrConnectWithoutBookmarksInput
    connect?: JobListingWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    upsert?: UserUpsertWithoutBookmarksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookmarksInput, UserUpdateWithoutBookmarksInput>, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type JobListingUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<JobListingCreateWithoutBookmarksInput, JobListingUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: JobListingCreateOrConnectWithoutBookmarksInput
    upsert?: JobListingUpsertWithoutBookmarksInput
    connect?: JobListingWhereUniqueInput
    update?: XOR<XOR<JobListingUpdateToOneWithWhereWithoutBookmarksInput, JobListingUpdateWithoutBookmarksInput>, JobListingUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PortfolioCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    techStack: string
    startDate: Date | string
    endDate?: Date | string | null
    githubUrl?: string | null
    deployUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    techStack: string
    startDate: Date | string
    endDate?: Date | string | null
    githubUrl?: string | null
    deployUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateOrConnectWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput>
  }

  export type PortfolioCreateManyUserInputEnvelope = {
    data: PortfolioCreateManyUserInput | PortfolioCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JobPostingCreateWithoutUserInput = {
    id?: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: StatusHistoryCreateNestedManyWithoutJobInput
    coverLetters?: CoverLetterCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutUserInput = {
    id?: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: StatusHistoryUncheckedCreateNestedManyWithoutJobInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutUserInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutUserInput, JobPostingUncheckedCreateWithoutUserInput>
  }

  export type JobPostingCreateManyUserInputEnvelope = {
    data: JobPostingCreateManyUserInput | JobPostingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoadmapItemCreateWithoutUserInput = {
    id?: string
    jobCategory: string
    skill: string
    status?: string
    referenceLinks: string
    isCustom?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapItemUncheckedCreateWithoutUserInput = {
    id?: string
    jobCategory: string
    skill: string
    status?: string
    referenceLinks: string
    isCustom?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapItemCreateOrConnectWithoutUserInput = {
    where: RoadmapItemWhereUniqueInput
    create: XOR<RoadmapItemCreateWithoutUserInput, RoadmapItemUncheckedCreateWithoutUserInput>
  }

  export type RoadmapItemCreateManyUserInputEnvelope = {
    data: RoadmapItemCreateManyUserInput | RoadmapItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InterviewAnswerCreateWithoutUserInput = {
    id?: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
    question: InterviewQuestionCreateNestedOneWithoutAnswersInput
  }

  export type InterviewAnswerUncheckedCreateWithoutUserInput = {
    id?: string
    questionId: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewAnswerCreateOrConnectWithoutUserInput = {
    where: InterviewAnswerWhereUniqueInput
    create: XOR<InterviewAnswerCreateWithoutUserInput, InterviewAnswerUncheckedCreateWithoutUserInput>
  }

  export type InterviewAnswerCreateManyUserInputEnvelope = {
    data: InterviewAnswerCreateManyUserInput | InterviewAnswerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InterviewQuestionCreateWithoutUserInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
    answers?: InterviewAnswerCreateNestedManyWithoutQuestionInput
  }

  export type InterviewQuestionUncheckedCreateWithoutUserInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
    answers?: InterviewAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type InterviewQuestionCreateOrConnectWithoutUserInput = {
    where: InterviewQuestionWhereUniqueInput
    create: XOR<InterviewQuestionCreateWithoutUserInput, InterviewQuestionUncheckedCreateWithoutUserInput>
  }

  export type InterviewQuestionCreateManyUserInputEnvelope = {
    data: InterviewQuestionCreateManyUserInput | InterviewQuestionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CoverLetterCreateWithoutUserInput = {
    id?: string
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job?: JobPostingCreateNestedOneWithoutCoverLettersInput
    versions?: CoverLetterVersionCreateNestedManyWithoutCoverLetterInput
  }

  export type CoverLetterUncheckedCreateWithoutUserInput = {
    id?: string
    jobId?: string | null
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: CoverLetterVersionUncheckedCreateNestedManyWithoutCoverLetterInput
  }

  export type CoverLetterCreateOrConnectWithoutUserInput = {
    where: CoverLetterWhereUniqueInput
    create: XOR<CoverLetterCreateWithoutUserInput, CoverLetterUncheckedCreateWithoutUserInput>
  }

  export type CoverLetterCreateManyUserInputEnvelope = {
    data: CoverLetterCreateManyUserInput | CoverLetterCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserNotificationCreateWithoutUserInput = {
    id?: string
    title: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type UserNotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type UserNotificationCreateOrConnectWithoutUserInput = {
    where: UserNotificationWhereUniqueInput
    create: XOR<UserNotificationCreateWithoutUserInput, UserNotificationUncheckedCreateWithoutUserInput>
  }

  export type UserNotificationCreateManyUserInputEnvelope = {
    data: UserNotificationCreateManyUserInput | UserNotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JobBookmarkCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    listing: JobListingCreateNestedOneWithoutBookmarksInput
  }

  export type JobBookmarkUncheckedCreateWithoutUserInput = {
    id?: string
    listingId: string
    createdAt?: Date | string
  }

  export type JobBookmarkCreateOrConnectWithoutUserInput = {
    where: JobBookmarkWhereUniqueInput
    create: XOR<JobBookmarkCreateWithoutUserInput, JobBookmarkUncheckedCreateWithoutUserInput>
  }

  export type JobBookmarkCreateManyUserInputEnvelope = {
    data: JobBookmarkCreateManyUserInput | JobBookmarkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JobListingCreateWithoutRecruiterInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookmarks?: JobBookmarkCreateNestedManyWithoutListingInput
  }

  export type JobListingUncheckedCreateWithoutRecruiterInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutListingInput
  }

  export type JobListingCreateOrConnectWithoutRecruiterInput = {
    where: JobListingWhereUniqueInput
    create: XOR<JobListingCreateWithoutRecruiterInput, JobListingUncheckedCreateWithoutRecruiterInput>
  }

  export type JobListingCreateManyRecruiterInputEnvelope = {
    data: JobListingCreateManyRecruiterInput | JobListingCreateManyRecruiterInput[]
    skipDuplicates?: boolean
  }

  export type PortfolioUpsertWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutUserInput, PortfolioUncheckedUpdateWithoutUserInput>
    create: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutUserInput, PortfolioUncheckedUpdateWithoutUserInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutUserInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutUserInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    userId?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    description?: StringFilter<"Portfolio"> | string
    techStack?: StringFilter<"Portfolio"> | string
    startDate?: DateTimeFilter<"Portfolio"> | Date | string
    endDate?: DateTimeNullableFilter<"Portfolio"> | Date | string | null
    githubUrl?: StringNullableFilter<"Portfolio"> | string | null
    deployUrl?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
  }

  export type JobPostingUpsertWithWhereUniqueWithoutUserInput = {
    where: JobPostingWhereUniqueInput
    update: XOR<JobPostingUpdateWithoutUserInput, JobPostingUncheckedUpdateWithoutUserInput>
    create: XOR<JobPostingCreateWithoutUserInput, JobPostingUncheckedCreateWithoutUserInput>
  }

  export type JobPostingUpdateWithWhereUniqueWithoutUserInput = {
    where: JobPostingWhereUniqueInput
    data: XOR<JobPostingUpdateWithoutUserInput, JobPostingUncheckedUpdateWithoutUserInput>
  }

  export type JobPostingUpdateManyWithWhereWithoutUserInput = {
    where: JobPostingScalarWhereInput
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyWithoutUserInput>
  }

  export type JobPostingScalarWhereInput = {
    AND?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
    OR?: JobPostingScalarWhereInput[]
    NOT?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
    id?: StringFilter<"JobPosting"> | string
    userId?: StringFilter<"JobPosting"> | string
    company?: StringFilter<"JobPosting"> | string
    position?: StringFilter<"JobPosting"> | string
    url?: StringNullableFilter<"JobPosting"> | string | null
    deadline?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    interviewAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    status?: StringFilter<"JobPosting"> | string
    contacts?: StringNullableFilter<"JobPosting"> | string | null
    followUpAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    createdAt?: DateTimeFilter<"JobPosting"> | Date | string
    updatedAt?: DateTimeFilter<"JobPosting"> | Date | string
  }

  export type RoadmapItemUpsertWithWhereUniqueWithoutUserInput = {
    where: RoadmapItemWhereUniqueInput
    update: XOR<RoadmapItemUpdateWithoutUserInput, RoadmapItemUncheckedUpdateWithoutUserInput>
    create: XOR<RoadmapItemCreateWithoutUserInput, RoadmapItemUncheckedCreateWithoutUserInput>
  }

  export type RoadmapItemUpdateWithWhereUniqueWithoutUserInput = {
    where: RoadmapItemWhereUniqueInput
    data: XOR<RoadmapItemUpdateWithoutUserInput, RoadmapItemUncheckedUpdateWithoutUserInput>
  }

  export type RoadmapItemUpdateManyWithWhereWithoutUserInput = {
    where: RoadmapItemScalarWhereInput
    data: XOR<RoadmapItemUpdateManyMutationInput, RoadmapItemUncheckedUpdateManyWithoutUserInput>
  }

  export type RoadmapItemScalarWhereInput = {
    AND?: RoadmapItemScalarWhereInput | RoadmapItemScalarWhereInput[]
    OR?: RoadmapItemScalarWhereInput[]
    NOT?: RoadmapItemScalarWhereInput | RoadmapItemScalarWhereInput[]
    id?: StringFilter<"RoadmapItem"> | string
    userId?: StringFilter<"RoadmapItem"> | string
    jobCategory?: StringFilter<"RoadmapItem"> | string
    skill?: StringFilter<"RoadmapItem"> | string
    status?: StringFilter<"RoadmapItem"> | string
    referenceLinks?: StringFilter<"RoadmapItem"> | string
    isCustom?: BoolFilter<"RoadmapItem"> | boolean
    order?: IntFilter<"RoadmapItem"> | number
    createdAt?: DateTimeFilter<"RoadmapItem"> | Date | string
    updatedAt?: DateTimeFilter<"RoadmapItem"> | Date | string
  }

  export type InterviewAnswerUpsertWithWhereUniqueWithoutUserInput = {
    where: InterviewAnswerWhereUniqueInput
    update: XOR<InterviewAnswerUpdateWithoutUserInput, InterviewAnswerUncheckedUpdateWithoutUserInput>
    create: XOR<InterviewAnswerCreateWithoutUserInput, InterviewAnswerUncheckedCreateWithoutUserInput>
  }

  export type InterviewAnswerUpdateWithWhereUniqueWithoutUserInput = {
    where: InterviewAnswerWhereUniqueInput
    data: XOR<InterviewAnswerUpdateWithoutUserInput, InterviewAnswerUncheckedUpdateWithoutUserInput>
  }

  export type InterviewAnswerUpdateManyWithWhereWithoutUserInput = {
    where: InterviewAnswerScalarWhereInput
    data: XOR<InterviewAnswerUpdateManyMutationInput, InterviewAnswerUncheckedUpdateManyWithoutUserInput>
  }

  export type InterviewAnswerScalarWhereInput = {
    AND?: InterviewAnswerScalarWhereInput | InterviewAnswerScalarWhereInput[]
    OR?: InterviewAnswerScalarWhereInput[]
    NOT?: InterviewAnswerScalarWhereInput | InterviewAnswerScalarWhereInput[]
    id?: StringFilter<"InterviewAnswer"> | string
    userId?: StringFilter<"InterviewAnswer"> | string
    questionId?: StringFilter<"InterviewAnswer"> | string
    answer?: StringFilter<"InterviewAnswer"> | string
    createdAt?: DateTimeFilter<"InterviewAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"InterviewAnswer"> | Date | string
  }

  export type InterviewQuestionUpsertWithWhereUniqueWithoutUserInput = {
    where: InterviewQuestionWhereUniqueInput
    update: XOR<InterviewQuestionUpdateWithoutUserInput, InterviewQuestionUncheckedUpdateWithoutUserInput>
    create: XOR<InterviewQuestionCreateWithoutUserInput, InterviewQuestionUncheckedCreateWithoutUserInput>
  }

  export type InterviewQuestionUpdateWithWhereUniqueWithoutUserInput = {
    where: InterviewQuestionWhereUniqueInput
    data: XOR<InterviewQuestionUpdateWithoutUserInput, InterviewQuestionUncheckedUpdateWithoutUserInput>
  }

  export type InterviewQuestionUpdateManyWithWhereWithoutUserInput = {
    where: InterviewQuestionScalarWhereInput
    data: XOR<InterviewQuestionUpdateManyMutationInput, InterviewQuestionUncheckedUpdateManyWithoutUserInput>
  }

  export type InterviewQuestionScalarWhereInput = {
    AND?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
    OR?: InterviewQuestionScalarWhereInput[]
    NOT?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
    id?: StringFilter<"InterviewQuestion"> | string
    category?: StringFilter<"InterviewQuestion"> | string
    jobType?: StringNullableFilter<"InterviewQuestion"> | string | null
    question?: StringFilter<"InterviewQuestion"> | string
    isDefault?: BoolFilter<"InterviewQuestion"> | boolean
    userId?: StringNullableFilter<"InterviewQuestion"> | string | null
  }

  export type CoverLetterUpsertWithWhereUniqueWithoutUserInput = {
    where: CoverLetterWhereUniqueInput
    update: XOR<CoverLetterUpdateWithoutUserInput, CoverLetterUncheckedUpdateWithoutUserInput>
    create: XOR<CoverLetterCreateWithoutUserInput, CoverLetterUncheckedCreateWithoutUserInput>
  }

  export type CoverLetterUpdateWithWhereUniqueWithoutUserInput = {
    where: CoverLetterWhereUniqueInput
    data: XOR<CoverLetterUpdateWithoutUserInput, CoverLetterUncheckedUpdateWithoutUserInput>
  }

  export type CoverLetterUpdateManyWithWhereWithoutUserInput = {
    where: CoverLetterScalarWhereInput
    data: XOR<CoverLetterUpdateManyMutationInput, CoverLetterUncheckedUpdateManyWithoutUserInput>
  }

  export type CoverLetterScalarWhereInput = {
    AND?: CoverLetterScalarWhereInput | CoverLetterScalarWhereInput[]
    OR?: CoverLetterScalarWhereInput[]
    NOT?: CoverLetterScalarWhereInput | CoverLetterScalarWhereInput[]
    id?: StringFilter<"CoverLetter"> | string
    userId?: StringFilter<"CoverLetter"> | string
    jobId?: StringNullableFilter<"CoverLetter"> | string | null
    company?: StringFilter<"CoverLetter"> | string
    position?: StringFilter<"CoverLetter"> | string
    items?: StringFilter<"CoverLetter"> | string
    version?: IntFilter<"CoverLetter"> | number
    analysisScore?: IntNullableFilter<"CoverLetter"> | number | null
    analysisHistory?: StringNullableFilter<"CoverLetter"> | string | null
    createdAt?: DateTimeFilter<"CoverLetter"> | Date | string
    updatedAt?: DateTimeFilter<"CoverLetter"> | Date | string
  }

  export type UserNotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: UserNotificationWhereUniqueInput
    update: XOR<UserNotificationUpdateWithoutUserInput, UserNotificationUncheckedUpdateWithoutUserInput>
    create: XOR<UserNotificationCreateWithoutUserInput, UserNotificationUncheckedCreateWithoutUserInput>
  }

  export type UserNotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: UserNotificationWhereUniqueInput
    data: XOR<UserNotificationUpdateWithoutUserInput, UserNotificationUncheckedUpdateWithoutUserInput>
  }

  export type UserNotificationUpdateManyWithWhereWithoutUserInput = {
    where: UserNotificationScalarWhereInput
    data: XOR<UserNotificationUpdateManyMutationInput, UserNotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type UserNotificationScalarWhereInput = {
    AND?: UserNotificationScalarWhereInput | UserNotificationScalarWhereInput[]
    OR?: UserNotificationScalarWhereInput[]
    NOT?: UserNotificationScalarWhereInput | UserNotificationScalarWhereInput[]
    id?: StringFilter<"UserNotification"> | string
    userId?: StringFilter<"UserNotification"> | string
    title?: StringFilter<"UserNotification"> | string
    body?: StringFilter<"UserNotification"> | string
    isRead?: BoolFilter<"UserNotification"> | boolean
    createdAt?: DateTimeFilter<"UserNotification"> | Date | string
  }

  export type JobBookmarkUpsertWithWhereUniqueWithoutUserInput = {
    where: JobBookmarkWhereUniqueInput
    update: XOR<JobBookmarkUpdateWithoutUserInput, JobBookmarkUncheckedUpdateWithoutUserInput>
    create: XOR<JobBookmarkCreateWithoutUserInput, JobBookmarkUncheckedCreateWithoutUserInput>
  }

  export type JobBookmarkUpdateWithWhereUniqueWithoutUserInput = {
    where: JobBookmarkWhereUniqueInput
    data: XOR<JobBookmarkUpdateWithoutUserInput, JobBookmarkUncheckedUpdateWithoutUserInput>
  }

  export type JobBookmarkUpdateManyWithWhereWithoutUserInput = {
    where: JobBookmarkScalarWhereInput
    data: XOR<JobBookmarkUpdateManyMutationInput, JobBookmarkUncheckedUpdateManyWithoutUserInput>
  }

  export type JobBookmarkScalarWhereInput = {
    AND?: JobBookmarkScalarWhereInput | JobBookmarkScalarWhereInput[]
    OR?: JobBookmarkScalarWhereInput[]
    NOT?: JobBookmarkScalarWhereInput | JobBookmarkScalarWhereInput[]
    id?: StringFilter<"JobBookmark"> | string
    userId?: StringFilter<"JobBookmark"> | string
    listingId?: StringFilter<"JobBookmark"> | string
    createdAt?: DateTimeFilter<"JobBookmark"> | Date | string
  }

  export type JobListingUpsertWithWhereUniqueWithoutRecruiterInput = {
    where: JobListingWhereUniqueInput
    update: XOR<JobListingUpdateWithoutRecruiterInput, JobListingUncheckedUpdateWithoutRecruiterInput>
    create: XOR<JobListingCreateWithoutRecruiterInput, JobListingUncheckedCreateWithoutRecruiterInput>
  }

  export type JobListingUpdateWithWhereUniqueWithoutRecruiterInput = {
    where: JobListingWhereUniqueInput
    data: XOR<JobListingUpdateWithoutRecruiterInput, JobListingUncheckedUpdateWithoutRecruiterInput>
  }

  export type JobListingUpdateManyWithWhereWithoutRecruiterInput = {
    where: JobListingScalarWhereInput
    data: XOR<JobListingUpdateManyMutationInput, JobListingUncheckedUpdateManyWithoutRecruiterInput>
  }

  export type JobListingScalarWhereInput = {
    AND?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
    OR?: JobListingScalarWhereInput[]
    NOT?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
    id?: StringFilter<"JobListing"> | string
    company?: StringFilter<"JobListing"> | string
    position?: StringFilter<"JobListing"> | string
    location?: StringNullableFilter<"JobListing"> | string | null
    career?: StringNullableFilter<"JobListing"> | string | null
    education?: StringNullableFilter<"JobListing"> | string | null
    employType?: StringNullableFilter<"JobListing"> | string | null
    salary?: StringNullableFilter<"JobListing"> | string | null
    deadline?: DateTimeNullableFilter<"JobListing"> | Date | string | null
    url?: StringNullableFilter<"JobListing"> | string | null
    description?: StringNullableFilter<"JobListing"> | string | null
    tags?: StringNullableFilter<"JobListing"> | string | null
    source?: StringNullableFilter<"JobListing"> | string | null
    isActive?: BoolFilter<"JobListing"> | boolean
    recruiterId?: StringNullableFilter<"JobListing"> | string | null
    createdAt?: DateTimeFilter<"JobListing"> | Date | string
    updatedAt?: DateTimeFilter<"JobListing"> | Date | string
  }

  export type UserCreateWithoutPortfoliosInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutPortfoliosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
  }

  export type UserUpsertWithoutPortfoliosInput = {
    update: XOR<UserUpdateWithoutPortfoliosInput, UserUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPortfoliosInput, UserUncheckedUpdateWithoutPortfoliosInput>
  }

  export type UserUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type UserCreateWithoutJobPostingsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutJobPostingsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutJobPostingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobPostingsInput, UserUncheckedCreateWithoutJobPostingsInput>
  }

  export type StatusHistoryCreateWithoutJobInput = {
    id?: string
    status: string
    changedAt?: Date | string
    note?: string | null
  }

  export type StatusHistoryUncheckedCreateWithoutJobInput = {
    id?: string
    status: string
    changedAt?: Date | string
    note?: string | null
  }

  export type StatusHistoryCreateOrConnectWithoutJobInput = {
    where: StatusHistoryWhereUniqueInput
    create: XOR<StatusHistoryCreateWithoutJobInput, StatusHistoryUncheckedCreateWithoutJobInput>
  }

  export type StatusHistoryCreateManyJobInputEnvelope = {
    data: StatusHistoryCreateManyJobInput | StatusHistoryCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type CoverLetterCreateWithoutJobInput = {
    id?: string
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCoverLettersInput
    versions?: CoverLetterVersionCreateNestedManyWithoutCoverLetterInput
  }

  export type CoverLetterUncheckedCreateWithoutJobInput = {
    id?: string
    userId: string
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: CoverLetterVersionUncheckedCreateNestedManyWithoutCoverLetterInput
  }

  export type CoverLetterCreateOrConnectWithoutJobInput = {
    where: CoverLetterWhereUniqueInput
    create: XOR<CoverLetterCreateWithoutJobInput, CoverLetterUncheckedCreateWithoutJobInput>
  }

  export type CoverLetterCreateManyJobInputEnvelope = {
    data: CoverLetterCreateManyJobInput | CoverLetterCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutJobPostingsInput = {
    update: XOR<UserUpdateWithoutJobPostingsInput, UserUncheckedUpdateWithoutJobPostingsInput>
    create: XOR<UserCreateWithoutJobPostingsInput, UserUncheckedCreateWithoutJobPostingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobPostingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobPostingsInput, UserUncheckedUpdateWithoutJobPostingsInput>
  }

  export type UserUpdateWithoutJobPostingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutJobPostingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type StatusHistoryUpsertWithWhereUniqueWithoutJobInput = {
    where: StatusHistoryWhereUniqueInput
    update: XOR<StatusHistoryUpdateWithoutJobInput, StatusHistoryUncheckedUpdateWithoutJobInput>
    create: XOR<StatusHistoryCreateWithoutJobInput, StatusHistoryUncheckedCreateWithoutJobInput>
  }

  export type StatusHistoryUpdateWithWhereUniqueWithoutJobInput = {
    where: StatusHistoryWhereUniqueInput
    data: XOR<StatusHistoryUpdateWithoutJobInput, StatusHistoryUncheckedUpdateWithoutJobInput>
  }

  export type StatusHistoryUpdateManyWithWhereWithoutJobInput = {
    where: StatusHistoryScalarWhereInput
    data: XOR<StatusHistoryUpdateManyMutationInput, StatusHistoryUncheckedUpdateManyWithoutJobInput>
  }

  export type StatusHistoryScalarWhereInput = {
    AND?: StatusHistoryScalarWhereInput | StatusHistoryScalarWhereInput[]
    OR?: StatusHistoryScalarWhereInput[]
    NOT?: StatusHistoryScalarWhereInput | StatusHistoryScalarWhereInput[]
    id?: StringFilter<"StatusHistory"> | string
    jobId?: StringFilter<"StatusHistory"> | string
    status?: StringFilter<"StatusHistory"> | string
    changedAt?: DateTimeFilter<"StatusHistory"> | Date | string
    note?: StringNullableFilter<"StatusHistory"> | string | null
  }

  export type CoverLetterUpsertWithWhereUniqueWithoutJobInput = {
    where: CoverLetterWhereUniqueInput
    update: XOR<CoverLetterUpdateWithoutJobInput, CoverLetterUncheckedUpdateWithoutJobInput>
    create: XOR<CoverLetterCreateWithoutJobInput, CoverLetterUncheckedCreateWithoutJobInput>
  }

  export type CoverLetterUpdateWithWhereUniqueWithoutJobInput = {
    where: CoverLetterWhereUniqueInput
    data: XOR<CoverLetterUpdateWithoutJobInput, CoverLetterUncheckedUpdateWithoutJobInput>
  }

  export type CoverLetterUpdateManyWithWhereWithoutJobInput = {
    where: CoverLetterScalarWhereInput
    data: XOR<CoverLetterUpdateManyMutationInput, CoverLetterUncheckedUpdateManyWithoutJobInput>
  }

  export type JobPostingCreateWithoutStatusHistoryInput = {
    id?: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJobPostingsInput
    coverLetters?: CoverLetterCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    userId: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutStatusHistoryInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutStatusHistoryInput, JobPostingUncheckedCreateWithoutStatusHistoryInput>
  }

  export type JobPostingUpsertWithoutStatusHistoryInput = {
    update: XOR<JobPostingUpdateWithoutStatusHistoryInput, JobPostingUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<JobPostingCreateWithoutStatusHistoryInput, JobPostingUncheckedCreateWithoutStatusHistoryInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutStatusHistoryInput, JobPostingUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type JobPostingUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJobPostingsNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutJobNestedInput
  }

  export type UserCreateWithoutRoadmapItemsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutRoadmapItemsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutRoadmapItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoadmapItemsInput, UserUncheckedCreateWithoutRoadmapItemsInput>
  }

  export type UserUpsertWithoutRoadmapItemsInput = {
    update: XOR<UserUpdateWithoutRoadmapItemsInput, UserUncheckedUpdateWithoutRoadmapItemsInput>
    create: XOR<UserCreateWithoutRoadmapItemsInput, UserUncheckedCreateWithoutRoadmapItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoadmapItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoadmapItemsInput, UserUncheckedUpdateWithoutRoadmapItemsInput>
  }

  export type UserUpdateWithoutRoadmapItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutRoadmapItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type UserCreateWithoutCustomQuestionsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutCustomQuestionsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutCustomQuestionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomQuestionsInput, UserUncheckedCreateWithoutCustomQuestionsInput>
  }

  export type InterviewAnswerCreateWithoutQuestionInput = {
    id?: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewAnswersInput
  }

  export type InterviewAnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    userId: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewAnswerCreateOrConnectWithoutQuestionInput = {
    where: InterviewAnswerWhereUniqueInput
    create: XOR<InterviewAnswerCreateWithoutQuestionInput, InterviewAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type InterviewAnswerCreateManyQuestionInputEnvelope = {
    data: InterviewAnswerCreateManyQuestionInput | InterviewAnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCustomQuestionsInput = {
    update: XOR<UserUpdateWithoutCustomQuestionsInput, UserUncheckedUpdateWithoutCustomQuestionsInput>
    create: XOR<UserCreateWithoutCustomQuestionsInput, UserUncheckedCreateWithoutCustomQuestionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomQuestionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomQuestionsInput, UserUncheckedUpdateWithoutCustomQuestionsInput>
  }

  export type UserUpdateWithoutCustomQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type InterviewAnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: InterviewAnswerWhereUniqueInput
    update: XOR<InterviewAnswerUpdateWithoutQuestionInput, InterviewAnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<InterviewAnswerCreateWithoutQuestionInput, InterviewAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type InterviewAnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: InterviewAnswerWhereUniqueInput
    data: XOR<InterviewAnswerUpdateWithoutQuestionInput, InterviewAnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type InterviewAnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: InterviewAnswerScalarWhereInput
    data: XOR<InterviewAnswerUpdateManyMutationInput, InterviewAnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type UserCreateWithoutInterviewAnswersInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutInterviewAnswersInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutInterviewAnswersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInterviewAnswersInput, UserUncheckedCreateWithoutInterviewAnswersInput>
  }

  export type InterviewQuestionCreateWithoutAnswersInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
    user?: UserCreateNestedOneWithoutCustomQuestionsInput
  }

  export type InterviewQuestionUncheckedCreateWithoutAnswersInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
    userId?: string | null
  }

  export type InterviewQuestionCreateOrConnectWithoutAnswersInput = {
    where: InterviewQuestionWhereUniqueInput
    create: XOR<InterviewQuestionCreateWithoutAnswersInput, InterviewQuestionUncheckedCreateWithoutAnswersInput>
  }

  export type UserUpsertWithoutInterviewAnswersInput = {
    update: XOR<UserUpdateWithoutInterviewAnswersInput, UserUncheckedUpdateWithoutInterviewAnswersInput>
    create: XOR<UserCreateWithoutInterviewAnswersInput, UserUncheckedCreateWithoutInterviewAnswersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInterviewAnswersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInterviewAnswersInput, UserUncheckedUpdateWithoutInterviewAnswersInput>
  }

  export type UserUpdateWithoutInterviewAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutInterviewAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type InterviewQuestionUpsertWithoutAnswersInput = {
    update: XOR<InterviewQuestionUpdateWithoutAnswersInput, InterviewQuestionUncheckedUpdateWithoutAnswersInput>
    create: XOR<InterviewQuestionCreateWithoutAnswersInput, InterviewQuestionUncheckedCreateWithoutAnswersInput>
    where?: InterviewQuestionWhereInput
  }

  export type InterviewQuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: InterviewQuestionWhereInput
    data: XOR<InterviewQuestionUpdateWithoutAnswersInput, InterviewQuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type InterviewQuestionUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneWithoutCustomQuestionsNestedInput
  }

  export type InterviewQuestionUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutCoverLettersInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutCoverLettersInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutCoverLettersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCoverLettersInput, UserUncheckedCreateWithoutCoverLettersInput>
  }

  export type JobPostingCreateWithoutCoverLettersInput = {
    id?: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJobPostingsInput
    statusHistory?: StatusHistoryCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutCoverLettersInput = {
    id?: string
    userId: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: StatusHistoryUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutCoverLettersInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutCoverLettersInput, JobPostingUncheckedCreateWithoutCoverLettersInput>
  }

  export type CoverLetterVersionCreateWithoutCoverLetterInput = {
    id?: string
    version: number
    items: string
    savedAt?: Date | string
  }

  export type CoverLetterVersionUncheckedCreateWithoutCoverLetterInput = {
    id?: string
    version: number
    items: string
    savedAt?: Date | string
  }

  export type CoverLetterVersionCreateOrConnectWithoutCoverLetterInput = {
    where: CoverLetterVersionWhereUniqueInput
    create: XOR<CoverLetterVersionCreateWithoutCoverLetterInput, CoverLetterVersionUncheckedCreateWithoutCoverLetterInput>
  }

  export type CoverLetterVersionCreateManyCoverLetterInputEnvelope = {
    data: CoverLetterVersionCreateManyCoverLetterInput | CoverLetterVersionCreateManyCoverLetterInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCoverLettersInput = {
    update: XOR<UserUpdateWithoutCoverLettersInput, UserUncheckedUpdateWithoutCoverLettersInput>
    create: XOR<UserCreateWithoutCoverLettersInput, UserUncheckedCreateWithoutCoverLettersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCoverLettersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCoverLettersInput, UserUncheckedUpdateWithoutCoverLettersInput>
  }

  export type UserUpdateWithoutCoverLettersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutCoverLettersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type JobPostingUpsertWithoutCoverLettersInput = {
    update: XOR<JobPostingUpdateWithoutCoverLettersInput, JobPostingUncheckedUpdateWithoutCoverLettersInput>
    create: XOR<JobPostingCreateWithoutCoverLettersInput, JobPostingUncheckedCreateWithoutCoverLettersInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutCoverLettersInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutCoverLettersInput, JobPostingUncheckedUpdateWithoutCoverLettersInput>
  }

  export type JobPostingUpdateWithoutCoverLettersInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJobPostingsNestedInput
    statusHistory?: StatusHistoryUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutCoverLettersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: StatusHistoryUncheckedUpdateManyWithoutJobNestedInput
  }

  export type CoverLetterVersionUpsertWithWhereUniqueWithoutCoverLetterInput = {
    where: CoverLetterVersionWhereUniqueInput
    update: XOR<CoverLetterVersionUpdateWithoutCoverLetterInput, CoverLetterVersionUncheckedUpdateWithoutCoverLetterInput>
    create: XOR<CoverLetterVersionCreateWithoutCoverLetterInput, CoverLetterVersionUncheckedCreateWithoutCoverLetterInput>
  }

  export type CoverLetterVersionUpdateWithWhereUniqueWithoutCoverLetterInput = {
    where: CoverLetterVersionWhereUniqueInput
    data: XOR<CoverLetterVersionUpdateWithoutCoverLetterInput, CoverLetterVersionUncheckedUpdateWithoutCoverLetterInput>
  }

  export type CoverLetterVersionUpdateManyWithWhereWithoutCoverLetterInput = {
    where: CoverLetterVersionScalarWhereInput
    data: XOR<CoverLetterVersionUpdateManyMutationInput, CoverLetterVersionUncheckedUpdateManyWithoutCoverLetterInput>
  }

  export type CoverLetterVersionScalarWhereInput = {
    AND?: CoverLetterVersionScalarWhereInput | CoverLetterVersionScalarWhereInput[]
    OR?: CoverLetterVersionScalarWhereInput[]
    NOT?: CoverLetterVersionScalarWhereInput | CoverLetterVersionScalarWhereInput[]
    id?: StringFilter<"CoverLetterVersion"> | string
    coverLetterId?: StringFilter<"CoverLetterVersion"> | string
    version?: IntFilter<"CoverLetterVersion"> | number
    items?: StringFilter<"CoverLetterVersion"> | string
    savedAt?: DateTimeFilter<"CoverLetterVersion"> | Date | string
  }

  export type CoverLetterCreateWithoutVersionsInput = {
    id?: string
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCoverLettersInput
    job?: JobPostingCreateNestedOneWithoutCoverLettersInput
  }

  export type CoverLetterUncheckedCreateWithoutVersionsInput = {
    id?: string
    userId: string
    jobId?: string | null
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoverLetterCreateOrConnectWithoutVersionsInput = {
    where: CoverLetterWhereUniqueInput
    create: XOR<CoverLetterCreateWithoutVersionsInput, CoverLetterUncheckedCreateWithoutVersionsInput>
  }

  export type CoverLetterUpsertWithoutVersionsInput = {
    update: XOR<CoverLetterUpdateWithoutVersionsInput, CoverLetterUncheckedUpdateWithoutVersionsInput>
    create: XOR<CoverLetterCreateWithoutVersionsInput, CoverLetterUncheckedCreateWithoutVersionsInput>
    where?: CoverLetterWhereInput
  }

  export type CoverLetterUpdateToOneWithWhereWithoutVersionsInput = {
    where?: CoverLetterWhereInput
    data: XOR<CoverLetterUpdateWithoutVersionsInput, CoverLetterUncheckedUpdateWithoutVersionsInput>
  }

  export type CoverLetterUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCoverLettersNestedInput
    job?: JobPostingUpdateOneWithoutCoverLettersNestedInput
  }

  export type CoverLetterUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutRecruitListingsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecruitListingsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecruitListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecruitListingsInput, UserUncheckedCreateWithoutRecruitListingsInput>
  }

  export type JobBookmarkCreateWithoutListingInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
  }

  export type JobBookmarkUncheckedCreateWithoutListingInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type JobBookmarkCreateOrConnectWithoutListingInput = {
    where: JobBookmarkWhereUniqueInput
    create: XOR<JobBookmarkCreateWithoutListingInput, JobBookmarkUncheckedCreateWithoutListingInput>
  }

  export type JobBookmarkCreateManyListingInputEnvelope = {
    data: JobBookmarkCreateManyListingInput | JobBookmarkCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRecruitListingsInput = {
    update: XOR<UserUpdateWithoutRecruitListingsInput, UserUncheckedUpdateWithoutRecruitListingsInput>
    create: XOR<UserCreateWithoutRecruitListingsInput, UserUncheckedCreateWithoutRecruitListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecruitListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecruitListingsInput, UserUncheckedUpdateWithoutRecruitListingsInput>
  }

  export type UserUpdateWithoutRecruitListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecruitListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type JobBookmarkUpsertWithWhereUniqueWithoutListingInput = {
    where: JobBookmarkWhereUniqueInput
    update: XOR<JobBookmarkUpdateWithoutListingInput, JobBookmarkUncheckedUpdateWithoutListingInput>
    create: XOR<JobBookmarkCreateWithoutListingInput, JobBookmarkUncheckedCreateWithoutListingInput>
  }

  export type JobBookmarkUpdateWithWhereUniqueWithoutListingInput = {
    where: JobBookmarkWhereUniqueInput
    data: XOR<JobBookmarkUpdateWithoutListingInput, JobBookmarkUncheckedUpdateWithoutListingInput>
  }

  export type JobBookmarkUpdateManyWithWhereWithoutListingInput = {
    where: JobBookmarkScalarWhereInput
    data: XOR<JobBookmarkUpdateManyMutationInput, JobBookmarkUncheckedUpdateManyWithoutListingInput>
  }

  export type UserCreateWithoutBookmarksInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    notifications?: UserNotificationCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutBookmarksInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    notifications?: UserNotificationUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutBookmarksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
  }

  export type JobListingCreateWithoutBookmarksInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter?: UserCreateNestedOneWithoutRecruitListingsInput
  }

  export type JobListingUncheckedCreateWithoutBookmarksInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    recruiterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobListingCreateOrConnectWithoutBookmarksInput = {
    where: JobListingWhereUniqueInput
    create: XOR<JobListingCreateWithoutBookmarksInput, JobListingUncheckedCreateWithoutBookmarksInput>
  }

  export type UserUpsertWithoutBookmarksInput = {
    update: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    notifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type JobListingUpsertWithoutBookmarksInput = {
    update: XOR<JobListingUpdateWithoutBookmarksInput, JobListingUncheckedUpdateWithoutBookmarksInput>
    create: XOR<JobListingCreateWithoutBookmarksInput, JobListingUncheckedCreateWithoutBookmarksInput>
    where?: JobListingWhereInput
  }

  export type JobListingUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: JobListingWhereInput
    data: XOR<JobListingUpdateWithoutBookmarksInput, JobListingUncheckedUpdateWithoutBookmarksInput>
  }

  export type JobListingUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneWithoutRecruitListingsNestedInput
  }

  export type JobListingUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    recruiterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkCreateNestedManyWithoutUserInput
    recruitListings?: JobListingCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    major?: string | null
    targetJob?: string | null
    skills: string
    role?: string
    companyName?: string | null
    companyDesc?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    jobPostings?: JobPostingUncheckedCreateNestedManyWithoutUserInput
    roadmapItems?: RoadmapItemUncheckedCreateNestedManyWithoutUserInput
    interviewAnswers?: InterviewAnswerUncheckedCreateNestedManyWithoutUserInput
    customQuestions?: InterviewQuestionUncheckedCreateNestedManyWithoutUserInput
    coverLetters?: CoverLetterUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: JobBookmarkUncheckedCreateNestedManyWithoutUserInput
    recruitListings?: JobListingUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    targetJob?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyDesc?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    jobPostings?: JobPostingUncheckedUpdateManyWithoutUserNestedInput
    roadmapItems?: RoadmapItemUncheckedUpdateManyWithoutUserNestedInput
    interviewAnswers?: InterviewAnswerUncheckedUpdateManyWithoutUserNestedInput
    customQuestions?: InterviewQuestionUncheckedUpdateManyWithoutUserNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutUserNestedInput
    recruitListings?: JobListingUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type PortfolioCreateManyUserInput = {
    id?: string
    title: string
    description: string
    techStack: string
    startDate: Date | string
    endDate?: Date | string | null
    githubUrl?: string | null
    deployUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobPostingCreateManyUserInput = {
    id?: string
    company: string
    position: string
    url?: string | null
    deadline?: Date | string | null
    interviewAt?: Date | string | null
    status?: string
    contacts?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapItemCreateManyUserInput = {
    id?: string
    jobCategory: string
    skill: string
    status?: string
    referenceLinks: string
    isCustom?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewAnswerCreateManyUserInput = {
    id?: string
    questionId: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewQuestionCreateManyUserInput = {
    id?: string
    category: string
    jobType?: string | null
    question: string
    isDefault?: boolean
  }

  export type CoverLetterCreateManyUserInput = {
    id?: string
    jobId?: string | null
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserNotificationCreateManyUserInput = {
    id?: string
    title: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type JobBookmarkCreateManyUserInput = {
    id?: string
    listingId: string
    createdAt?: Date | string
  }

  export type JobListingCreateManyRecruiterInput = {
    id?: string
    company: string
    position: string
    location?: string | null
    career?: string | null
    education?: string | null
    employType?: string | null
    salary?: string | null
    deadline?: Date | string | null
    url?: string | null
    description?: string | null
    tags?: string | null
    source?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deployUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deployUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deployUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: StatusHistoryUpdateManyWithoutJobNestedInput
    coverLetters?: CoverLetterUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: StatusHistoryUncheckedUpdateManyWithoutJobNestedInput
    coverLetters?: CoverLetterUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobCategory?: StringFieldUpdateOperationsInput | string
    skill?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    referenceLinks?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobCategory?: StringFieldUpdateOperationsInput | string
    skill?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    referenceLinks?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobCategory?: StringFieldUpdateOperationsInput | string
    skill?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    referenceLinks?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewAnswerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: InterviewQuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type InterviewAnswerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewAnswerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    answers?: InterviewAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type InterviewQuestionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    answers?: InterviewAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type InterviewQuestionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CoverLetterUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobPostingUpdateOneWithoutCoverLettersNestedInput
    versions?: CoverLetterVersionUpdateManyWithoutCoverLetterNestedInput
  }

  export type CoverLetterUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: CoverLetterVersionUncheckedUpdateManyWithoutCoverLetterNestedInput
  }

  export type CoverLetterUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserNotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserNotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserNotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobBookmarkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: JobListingUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type JobBookmarkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobBookmarkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobListingUpdateWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: JobBookmarkUpdateManyWithoutListingNestedInput
  }

  export type JobListingUncheckedUpdateWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: JobBookmarkUncheckedUpdateManyWithoutListingNestedInput
  }

  export type JobListingUncheckedUpdateManyWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    career?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    employType?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusHistoryCreateManyJobInput = {
    id?: string
    status: string
    changedAt?: Date | string
    note?: string | null
  }

  export type CoverLetterCreateManyJobInput = {
    id?: string
    userId: string
    company: string
    position: string
    items: string
    version?: number
    analysisScore?: number | null
    analysisHistory?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StatusHistoryUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusHistoryUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusHistoryUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CoverLetterUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCoverLettersNestedInput
    versions?: CoverLetterVersionUpdateManyWithoutCoverLetterNestedInput
  }

  export type CoverLetterUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: CoverLetterVersionUncheckedUpdateManyWithoutCoverLetterNestedInput
  }

  export type CoverLetterUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    analysisScore?: NullableIntFieldUpdateOperationsInput | number | null
    analysisHistory?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewAnswerCreateManyQuestionInput = {
    id?: string
    userId: string
    answer: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewAnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewAnswersNestedInput
  }

  export type InterviewAnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewAnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterVersionCreateManyCoverLetterInput = {
    id?: string
    version: number
    items: string
    savedAt?: Date | string
  }

  export type CoverLetterVersionUpdateWithoutCoverLetterInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    items?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterVersionUncheckedUpdateWithoutCoverLetterInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    items?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoverLetterVersionUncheckedUpdateManyWithoutCoverLetterInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    items?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobBookmarkCreateManyListingInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type JobBookmarkUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type JobBookmarkUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobBookmarkUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobPostingCountOutputTypeDefaultArgs instead
     */
    export type JobPostingCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobPostingCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewQuestionCountOutputTypeDefaultArgs instead
     */
    export type InterviewQuestionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewQuestionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CoverLetterCountOutputTypeDefaultArgs instead
     */
    export type CoverLetterCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CoverLetterCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobListingCountOutputTypeDefaultArgs instead
     */
    export type JobListingCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobListingCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PortfolioDefaultArgs instead
     */
    export type PortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PortfolioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobPostingDefaultArgs instead
     */
    export type JobPostingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobPostingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StatusHistoryDefaultArgs instead
     */
    export type StatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StatusHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoadmapItemDefaultArgs instead
     */
    export type RoadmapItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoadmapItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewQuestionDefaultArgs instead
     */
    export type InterviewQuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewQuestionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewAnswerDefaultArgs instead
     */
    export type InterviewAnswerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewAnswerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CoverLetterDefaultArgs instead
     */
    export type CoverLetterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CoverLetterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CoverLetterVersionDefaultArgs instead
     */
    export type CoverLetterVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CoverLetterVersionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobListingDefaultArgs instead
     */
    export type JobListingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobListingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobBookmarkDefaultArgs instead
     */
    export type JobBookmarkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobBookmarkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmploymentRecordDefaultArgs instead
     */
    export type EmploymentRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmploymentRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NoticeDefaultArgs instead
     */
    export type NoticeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NoticeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserNotificationDefaultArgs instead
     */
    export type UserNotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserNotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PasswordResetTokenDefaultArgs instead
     */
    export type PasswordResetTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PasswordResetTokenDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}