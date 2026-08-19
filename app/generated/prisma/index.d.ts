
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
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model Milestone
 * 
 */
export type Milestone = $Result.DefaultSelection<Prisma.$MilestonePayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Subtask
 * 
 */
export type Subtask = $Result.DefaultSelection<Prisma.$SubtaskPayload>
/**
 * Model Resource
 * 
 */
export type Resource = $Result.DefaultSelection<Prisma.$ResourcePayload>
/**
 * Model TimerSession
 * 
 */
export type TimerSession = $Result.DefaultSelection<Prisma.$TimerSessionPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model ChatMessage
 * 
 */
export type ChatMessage = $Result.DefaultSelection<Prisma.$ChatMessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Priority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type Priority = (typeof Priority)[keyof typeof Priority]


export const ResourceType: {
  LINK: 'LINK',
  AI_CHAT: 'AI_CHAT',
  PDF: 'PDF',
  BOOK: 'BOOK'
};

export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType]


export const Recurrence: {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY'
};

export type Recurrence = (typeof Recurrence)[keyof typeof Recurrence]


export const ChatRole: {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT'
};

export type ChatRole = (typeof ChatRole)[keyof typeof ChatRole]

}

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

export type ResourceType = $Enums.ResourceType

export const ResourceType: typeof $Enums.ResourceType

export type Recurrence = $Enums.Recurrence

export const Recurrence: typeof $Enums.Recurrence

export type ChatRole = $Enums.ChatRole

export const ChatRole: typeof $Enums.ChatRole

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
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.milestone`: Exposes CRUD operations for the **Milestone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Milestones
    * const milestones = await prisma.milestone.findMany()
    * ```
    */
  get milestone(): Prisma.MilestoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subtask`: Exposes CRUD operations for the **Subtask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subtasks
    * const subtasks = await prisma.subtask.findMany()
    * ```
    */
  get subtask(): Prisma.SubtaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resource`: Exposes CRUD operations for the **Resource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resources
    * const resources = await prisma.resource.findMany()
    * ```
    */
  get resource(): Prisma.ResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timerSession`: Exposes CRUD operations for the **TimerSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimerSessions
    * const timerSessions = await prisma.timerSession.findMany()
    * ```
    */
  get timerSession(): Prisma.TimerSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMessage`: Exposes CRUD operations for the **ChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessages
    * const chatMessages = await prisma.chatMessage.findMany()
    * ```
    */
  get chatMessage(): Prisma.ChatMessageDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Subject: 'Subject',
    Milestone: 'Milestone',
    Task: 'Task',
    Subtask: 'Subtask',
    Resource: 'Resource',
    TimerSession: 'TimerSession',
    Conversation: 'Conversation',
    ChatMessage: 'ChatMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "subject" | "milestone" | "task" | "subtask" | "resource" | "timerSession" | "conversation" | "chatMessage"
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
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      Milestone: {
        payload: Prisma.$MilestonePayload<ExtArgs>
        fields: Prisma.MilestoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MilestoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MilestoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findFirst: {
            args: Prisma.MilestoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MilestoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findMany: {
            args: Prisma.MilestoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          create: {
            args: Prisma.MilestoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          createMany: {
            args: Prisma.MilestoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MilestoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          delete: {
            args: Prisma.MilestoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          update: {
            args: Prisma.MilestoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          deleteMany: {
            args: Prisma.MilestoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MilestoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MilestoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          upsert: {
            args: Prisma.MilestoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          aggregate: {
            args: Prisma.MilestoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMilestone>
          }
          groupBy: {
            args: Prisma.MilestoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<MilestoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.MilestoneCountArgs<ExtArgs>
            result: $Utils.Optional<MilestoneCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Subtask: {
        payload: Prisma.$SubtaskPayload<ExtArgs>
        fields: Prisma.SubtaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubtaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubtaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          findFirst: {
            args: Prisma.SubtaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubtaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          findMany: {
            args: Prisma.SubtaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          create: {
            args: Prisma.SubtaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          createMany: {
            args: Prisma.SubtaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubtaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          delete: {
            args: Prisma.SubtaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          update: {
            args: Prisma.SubtaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          deleteMany: {
            args: Prisma.SubtaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubtaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubtaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          upsert: {
            args: Prisma.SubtaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          aggregate: {
            args: Prisma.SubtaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubtask>
          }
          groupBy: {
            args: Prisma.SubtaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubtaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubtaskCountArgs<ExtArgs>
            result: $Utils.Optional<SubtaskCountAggregateOutputType> | number
          }
        }
      }
      Resource: {
        payload: Prisma.$ResourcePayload<ExtArgs>
        fields: Prisma.ResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findFirst: {
            args: Prisma.ResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findMany: {
            args: Prisma.ResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          create: {
            args: Prisma.ResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          createMany: {
            args: Prisma.ResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          delete: {
            args: Prisma.ResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          update: {
            args: Prisma.ResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          deleteMany: {
            args: Prisma.ResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          upsert: {
            args: Prisma.ResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          aggregate: {
            args: Prisma.ResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResource>
          }
          groupBy: {
            args: Prisma.ResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceCountAggregateOutputType> | number
          }
        }
      }
      TimerSession: {
        payload: Prisma.$TimerSessionPayload<ExtArgs>
        fields: Prisma.TimerSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimerSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimerSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>
          }
          findFirst: {
            args: Prisma.TimerSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimerSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>
          }
          findMany: {
            args: Prisma.TimerSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>[]
          }
          create: {
            args: Prisma.TimerSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>
          }
          createMany: {
            args: Prisma.TimerSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimerSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>[]
          }
          delete: {
            args: Prisma.TimerSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>
          }
          update: {
            args: Prisma.TimerSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>
          }
          deleteMany: {
            args: Prisma.TimerSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimerSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimerSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>[]
          }
          upsert: {
            args: Prisma.TimerSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimerSessionPayload>
          }
          aggregate: {
            args: Prisma.TimerSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimerSession>
          }
          groupBy: {
            args: Prisma.TimerSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimerSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimerSessionCountArgs<ExtArgs>
            result: $Utils.Optional<TimerSessionCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      ChatMessage: {
        payload: Prisma.$ChatMessagePayload<ExtArgs>
        fields: Prisma.ChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findFirst: {
            args: Prisma.ChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findMany: {
            args: Prisma.ChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          create: {
            args: Prisma.ChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          createMany: {
            args: Prisma.ChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          delete: {
            args: Prisma.ChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          update: {
            args: Prisma.ChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          upsert: {
            args: Prisma.ChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          aggregate: {
            args: Prisma.ChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMessage>
          }
          groupBy: {
            args: Prisma.ChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageCountAggregateOutputType> | number
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    subject?: SubjectOmit
    milestone?: MilestoneOmit
    task?: TaskOmit
    subtask?: SubtaskOmit
    resource?: ResourceOmit
    timerSession?: TimerSessionOmit
    conversation?: ConversationOmit
    chatMessage?: ChatMessageOmit
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
    | 'updateManyAndReturn'
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
    subjects: number
    tasks: number
    resources: number
    conversations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subjects?: boolean | UserCountOutputTypeCountSubjectsArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    resources?: boolean | UserCountOutputTypeCountResourcesArgs
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
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
  export type UserCountOutputTypeCountSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    milestones: number
    resources: number
    tasks: number
    conversations: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    milestones?: boolean | SubjectCountOutputTypeCountMilestonesArgs
    resources?: boolean | SubjectCountOutputTypeCountResourcesArgs
    tasks?: boolean | SubjectCountOutputTypeCountTasksArgs
    conversations?: boolean | SubjectCountOutputTypeCountConversationsArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountMilestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountResourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Count Type MilestoneCountOutputType
   */

  export type MilestoneCountOutputType = {
    tasks: number
  }

  export type MilestoneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | MilestoneCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * MilestoneCountOutputType without action
   */
  export type MilestoneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilestoneCountOutputType
     */
    select?: MilestoneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MilestoneCountOutputType without action
   */
  export type MilestoneCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    subtasks: number
    timerSessions: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subtasks?: boolean | TaskCountOutputTypeCountSubtasksArgs
    timerSessions?: boolean | TaskCountOutputTypeCountTimerSessionsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountTimerSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimerSessionWhereInput
  }


  /**
   * Count Type SubtaskCountOutputType
   */

  export type SubtaskCountOutputType = {
    children: number
  }

  export type SubtaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | SubtaskCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * SubtaskCountOutputType without action
   */
  export type SubtaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubtaskCountOutputType
     */
    select?: SubtaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubtaskCountOutputType without action
   */
  export type SubtaskCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
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
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
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
    name: string | null
    password: string | null
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
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjects?: boolean | User$subjectsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    resources?: boolean | User$resourcesArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subjects?: boolean | User$subjectsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    resources?: boolean | User$resourcesArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      subjects: Prisma.$SubjectPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      resources: Prisma.$ResourcePayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subjects<T extends User$subjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$subjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resources<T extends User$resourcesArgs<ExtArgs> = {}>(args?: Subset<T, User$resourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.subjects
   */
  export type User$subjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    cursor?: SubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.resources
   */
  export type User$resourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    cursor?: ResourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    color: string | null
    isArchived: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    color: string | null
    isArchived: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    title: number
    description: number
    color: number
    isArchived: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type SubjectMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    color?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    color?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    color?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: string
    title: string
    description: string | null
    color: string | null
    isArchived: boolean
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    color?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    milestones?: boolean | Subject$milestonesArgs<ExtArgs>
    resources?: boolean | Subject$resourcesArgs<ExtArgs>
    tasks?: boolean | Subject$tasksArgs<ExtArgs>
    conversations?: boolean | Subject$conversationsArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    color?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    color?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    color?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "color" | "isArchived" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["subject"]>
  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    milestones?: boolean | Subject$milestonesArgs<ExtArgs>
    resources?: boolean | Subject$resourcesArgs<ExtArgs>
    tasks?: boolean | Subject$tasksArgs<ExtArgs>
    conversations?: boolean | Subject$conversationsArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      milestones: Prisma.$MilestonePayload<ExtArgs>[]
      resources: Prisma.$ResourcePayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      color: string | null
      isArchived: boolean
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
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
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    milestones<T extends Subject$milestonesArgs<ExtArgs> = {}>(args?: Subset<T, Subject$milestonesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resources<T extends Subject$resourcesArgs<ExtArgs> = {}>(args?: Subset<T, Subject$resourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Subject$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Subject$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends Subject$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'String'>
    readonly title: FieldRef<"Subject", 'String'>
    readonly description: FieldRef<"Subject", 'String'>
    readonly color: FieldRef<"Subject", 'String'>
    readonly isArchived: FieldRef<"Subject", 'Boolean'>
    readonly createdAt: FieldRef<"Subject", 'DateTime'>
    readonly updatedAt: FieldRef<"Subject", 'DateTime'>
    readonly userId: FieldRef<"Subject", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject.milestones
   */
  export type Subject$milestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    cursor?: MilestoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Subject.resources
   */
  export type Subject$resourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    cursor?: ResourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Subject.tasks
   */
  export type Subject$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Subject.conversations
   */
  export type Subject$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model Milestone
   */

  export type AggregateMilestone = {
    _count: MilestoneCountAggregateOutputType | null
    _avg: MilestoneAvgAggregateOutputType | null
    _sum: MilestoneSumAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  export type MilestoneAvgAggregateOutputType = {
    order: number | null
  }

  export type MilestoneSumAggregateOutputType = {
    order: number | null
  }

  export type MilestoneMinAggregateOutputType = {
    id: string | null
    title: string | null
    notes: string | null
    order: number | null
    isCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    subjectId: string | null
  }

  export type MilestoneMaxAggregateOutputType = {
    id: string | null
    title: string | null
    notes: string | null
    order: number | null
    isCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    subjectId: string | null
  }

  export type MilestoneCountAggregateOutputType = {
    id: number
    title: number
    notes: number
    order: number
    isCompleted: number
    createdAt: number
    updatedAt: number
    subjectId: number
    _all: number
  }


  export type MilestoneAvgAggregateInputType = {
    order?: true
  }

  export type MilestoneSumAggregateInputType = {
    order?: true
  }

  export type MilestoneMinAggregateInputType = {
    id?: true
    title?: true
    notes?: true
    order?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    subjectId?: true
  }

  export type MilestoneMaxAggregateInputType = {
    id?: true
    title?: true
    notes?: true
    order?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    subjectId?: true
  }

  export type MilestoneCountAggregateInputType = {
    id?: true
    title?: true
    notes?: true
    order?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    subjectId?: true
    _all?: true
  }

  export type MilestoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestone to aggregate.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Milestones
    **/
    _count?: true | MilestoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MilestoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MilestoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MilestoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MilestoneMaxAggregateInputType
  }

  export type GetMilestoneAggregateType<T extends MilestoneAggregateArgs> = {
        [P in keyof T & keyof AggregateMilestone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMilestone[P]>
      : GetScalarType<T[P], AggregateMilestone[P]>
  }




  export type MilestoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithAggregationInput | MilestoneOrderByWithAggregationInput[]
    by: MilestoneScalarFieldEnum[] | MilestoneScalarFieldEnum
    having?: MilestoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MilestoneCountAggregateInputType | true
    _avg?: MilestoneAvgAggregateInputType
    _sum?: MilestoneSumAggregateInputType
    _min?: MilestoneMinAggregateInputType
    _max?: MilestoneMaxAggregateInputType
  }

  export type MilestoneGroupByOutputType = {
    id: string
    title: string
    notes: string
    order: number
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date
    subjectId: string
    _count: MilestoneCountAggregateOutputType | null
    _avg: MilestoneAvgAggregateOutputType | null
    _sum: MilestoneSumAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  type GetMilestoneGroupByPayload<T extends MilestoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MilestoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MilestoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
            : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
        }
      >
    >


  export type MilestoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    notes?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjectId?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    tasks?: boolean | Milestone$tasksArgs<ExtArgs>
    _count?: boolean | MilestoneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    notes?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjectId?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    notes?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjectId?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectScalar = {
    id?: boolean
    title?: boolean
    notes?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjectId?: boolean
  }

  export type MilestoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "notes" | "order" | "isCompleted" | "createdAt" | "updatedAt" | "subjectId", ExtArgs["result"]["milestone"]>
  export type MilestoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    tasks?: boolean | Milestone$tasksArgs<ExtArgs>
    _count?: boolean | MilestoneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MilestoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type MilestoneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $MilestonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Milestone"
    objects: {
      subject: Prisma.$SubjectPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      notes: string
      order: number
      isCompleted: boolean
      createdAt: Date
      updatedAt: Date
      subjectId: string
    }, ExtArgs["result"]["milestone"]>
    composites: {}
  }

  type MilestoneGetPayload<S extends boolean | null | undefined | MilestoneDefaultArgs> = $Result.GetResult<Prisma.$MilestonePayload, S>

  type MilestoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MilestoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MilestoneCountAggregateInputType | true
    }

  export interface MilestoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Milestone'], meta: { name: 'Milestone' } }
    /**
     * Find zero or one Milestone that matches the filter.
     * @param {MilestoneFindUniqueArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MilestoneFindUniqueArgs>(args: SelectSubset<T, MilestoneFindUniqueArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Milestone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MilestoneFindUniqueOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MilestoneFindUniqueOrThrowArgs>(args: SelectSubset<T, MilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MilestoneFindFirstArgs>(args?: SelectSubset<T, MilestoneFindFirstArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MilestoneFindFirstOrThrowArgs>(args?: SelectSubset<T, MilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Milestones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Milestones
     * const milestones = await prisma.milestone.findMany()
     * 
     * // Get first 10 Milestones
     * const milestones = await prisma.milestone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const milestoneWithIdOnly = await prisma.milestone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MilestoneFindManyArgs>(args?: SelectSubset<T, MilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Milestone.
     * @param {MilestoneCreateArgs} args - Arguments to create a Milestone.
     * @example
     * // Create one Milestone
     * const Milestone = await prisma.milestone.create({
     *   data: {
     *     // ... data to create a Milestone
     *   }
     * })
     * 
     */
    create<T extends MilestoneCreateArgs>(args: SelectSubset<T, MilestoneCreateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Milestones.
     * @param {MilestoneCreateManyArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MilestoneCreateManyArgs>(args?: SelectSubset<T, MilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Milestones and returns the data saved in the database.
     * @param {MilestoneCreateManyAndReturnArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MilestoneCreateManyAndReturnArgs>(args?: SelectSubset<T, MilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Milestone.
     * @param {MilestoneDeleteArgs} args - Arguments to delete one Milestone.
     * @example
     * // Delete one Milestone
     * const Milestone = await prisma.milestone.delete({
     *   where: {
     *     // ... filter to delete one Milestone
     *   }
     * })
     * 
     */
    delete<T extends MilestoneDeleteArgs>(args: SelectSubset<T, MilestoneDeleteArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Milestone.
     * @param {MilestoneUpdateArgs} args - Arguments to update one Milestone.
     * @example
     * // Update one Milestone
     * const milestone = await prisma.milestone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MilestoneUpdateArgs>(args: SelectSubset<T, MilestoneUpdateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Milestones.
     * @param {MilestoneDeleteManyArgs} args - Arguments to filter Milestones to delete.
     * @example
     * // Delete a few Milestones
     * const { count } = await prisma.milestone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MilestoneDeleteManyArgs>(args?: SelectSubset<T, MilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MilestoneUpdateManyArgs>(args: SelectSubset<T, MilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones and returns the data updated in the database.
     * @param {MilestoneUpdateManyAndReturnArgs} args - Arguments to update many Milestones.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MilestoneUpdateManyAndReturnArgs>(args: SelectSubset<T, MilestoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Milestone.
     * @param {MilestoneUpsertArgs} args - Arguments to update or create a Milestone.
     * @example
     * // Update or create a Milestone
     * const milestone = await prisma.milestone.upsert({
     *   create: {
     *     // ... data to create a Milestone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Milestone we want to update
     *   }
     * })
     */
    upsert<T extends MilestoneUpsertArgs>(args: SelectSubset<T, MilestoneUpsertArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneCountArgs} args - Arguments to filter Milestones to count.
     * @example
     * // Count the number of Milestones
     * const count = await prisma.milestone.count({
     *   where: {
     *     // ... the filter for the Milestones we want to count
     *   }
     * })
    **/
    count<T extends MilestoneCountArgs>(
      args?: Subset<T, MilestoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MilestoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MilestoneAggregateArgs>(args: Subset<T, MilestoneAggregateArgs>): Prisma.PrismaPromise<GetMilestoneAggregateType<T>>

    /**
     * Group by Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneGroupByArgs} args - Group by arguments.
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
      T extends MilestoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MilestoneGroupByArgs['orderBy'] }
        : { orderBy?: MilestoneGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Milestone model
   */
  readonly fields: MilestoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Milestone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MilestoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends Milestone$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Milestone$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Milestone model
   */
  interface MilestoneFieldRefs {
    readonly id: FieldRef<"Milestone", 'String'>
    readonly title: FieldRef<"Milestone", 'String'>
    readonly notes: FieldRef<"Milestone", 'String'>
    readonly order: FieldRef<"Milestone", 'Int'>
    readonly isCompleted: FieldRef<"Milestone", 'Boolean'>
    readonly createdAt: FieldRef<"Milestone", 'DateTime'>
    readonly updatedAt: FieldRef<"Milestone", 'DateTime'>
    readonly subjectId: FieldRef<"Milestone", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Milestone findUnique
   */
  export type MilestoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findUniqueOrThrow
   */
  export type MilestoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findFirst
   */
  export type MilestoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findFirstOrThrow
   */
  export type MilestoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findMany
   */
  export type MilestoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestones to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone create
   */
  export type MilestoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to create a Milestone.
     */
    data: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
  }

  /**
   * Milestone createMany
   */
  export type MilestoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Milestone createManyAndReturn
   */
  export type MilestoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Milestone update
   */
  export type MilestoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to update a Milestone.
     */
    data: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
    /**
     * Choose, which Milestone to update.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone updateMany
   */
  export type MilestoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
  }

  /**
   * Milestone updateManyAndReturn
   */
  export type MilestoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Milestone upsert
   */
  export type MilestoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The filter to search for the Milestone to update in case it exists.
     */
    where: MilestoneWhereUniqueInput
    /**
     * In case the Milestone found by the `where` argument doesn't exist, create a new Milestone with this data.
     */
    create: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
    /**
     * In case the Milestone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
  }

  /**
   * Milestone delete
   */
  export type MilestoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter which Milestone to delete.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone deleteMany
   */
  export type MilestoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestones to delete
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to delete.
     */
    limit?: number
  }

  /**
   * Milestone.tasks
   */
  export type Milestone$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Milestone without action
   */
  export type MilestoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    estimatedTime: number | null
    timeSpent: number | null
    order: number | null
  }

  export type TaskSumAggregateOutputType = {
    estimatedTime: number | null
    timeSpent: number | null
    order: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    isCompleted: boolean | null
    completedAt: Date | null
    dueDate: Date | null
    priority: $Enums.Priority | null
    estimatedTime: number | null
    timeSpent: number | null
    recurrence: $Enums.Recurrence | null
    order: number | null
    createdAt: Date | null
    userId: string | null
    subjectId: string | null
    milestoneId: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    isCompleted: boolean | null
    completedAt: Date | null
    dueDate: Date | null
    priority: $Enums.Priority | null
    estimatedTime: number | null
    timeSpent: number | null
    recurrence: $Enums.Recurrence | null
    order: number | null
    createdAt: Date | null
    userId: string | null
    subjectId: string | null
    milestoneId: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    isCompleted: number
    completedAt: number
    dueDate: number
    priority: number
    estimatedTime: number
    timeSpent: number
    recurrence: number
    order: number
    createdAt: number
    userId: number
    subjectId: number
    milestoneId: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    estimatedTime?: true
    timeSpent?: true
    order?: true
  }

  export type TaskSumAggregateInputType = {
    estimatedTime?: true
    timeSpent?: true
    order?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isCompleted?: true
    completedAt?: true
    dueDate?: true
    priority?: true
    estimatedTime?: true
    timeSpent?: true
    recurrence?: true
    order?: true
    createdAt?: true
    userId?: true
    subjectId?: true
    milestoneId?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isCompleted?: true
    completedAt?: true
    dueDate?: true
    priority?: true
    estimatedTime?: true
    timeSpent?: true
    recurrence?: true
    order?: true
    createdAt?: true
    userId?: true
    subjectId?: true
    milestoneId?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isCompleted?: true
    completedAt?: true
    dueDate?: true
    priority?: true
    estimatedTime?: true
    timeSpent?: true
    recurrence?: true
    order?: true
    createdAt?: true
    userId?: true
    subjectId?: true
    milestoneId?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string | null
    isCompleted: boolean
    completedAt: Date | null
    dueDate: Date | null
    priority: $Enums.Priority
    estimatedTime: number | null
    timeSpent: number | null
    recurrence: $Enums.Recurrence | null
    order: number
    createdAt: Date
    userId: string
    subjectId: string
    milestoneId: string | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    dueDate?: boolean
    priority?: boolean
    estimatedTime?: boolean
    timeSpent?: boolean
    recurrence?: boolean
    order?: boolean
    createdAt?: boolean
    userId?: boolean
    subjectId?: boolean
    milestoneId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    milestone?: boolean | Task$milestoneArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    timerSessions?: boolean | Task$timerSessionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    dueDate?: boolean
    priority?: boolean
    estimatedTime?: boolean
    timeSpent?: boolean
    recurrence?: boolean
    order?: boolean
    createdAt?: boolean
    userId?: boolean
    subjectId?: boolean
    milestoneId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    milestone?: boolean | Task$milestoneArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    dueDate?: boolean
    priority?: boolean
    estimatedTime?: boolean
    timeSpent?: boolean
    recurrence?: boolean
    order?: boolean
    createdAt?: boolean
    userId?: boolean
    subjectId?: boolean
    milestoneId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    milestone?: boolean | Task$milestoneArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    dueDate?: boolean
    priority?: boolean
    estimatedTime?: boolean
    timeSpent?: boolean
    recurrence?: boolean
    order?: boolean
    createdAt?: boolean
    userId?: boolean
    subjectId?: boolean
    milestoneId?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "isCompleted" | "completedAt" | "dueDate" | "priority" | "estimatedTime" | "timeSpent" | "recurrence" | "order" | "createdAt" | "userId" | "subjectId" | "milestoneId", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    milestone?: boolean | Task$milestoneArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    timerSessions?: boolean | Task$timerSessionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    milestone?: boolean | Task$milestoneArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    milestone?: boolean | Task$milestoneArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
      milestone: Prisma.$MilestonePayload<ExtArgs> | null
      subtasks: Prisma.$SubtaskPayload<ExtArgs>[]
      timerSessions: Prisma.$TimerSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      isCompleted: boolean
      completedAt: Date | null
      dueDate: Date | null
      priority: $Enums.Priority
      estimatedTime: number | null
      timeSpent: number | null
      recurrence: $Enums.Recurrence | null
      order: number
      createdAt: Date
      userId: string
      subjectId: string
      milestoneId: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
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
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    milestone<T extends Task$milestoneArgs<ExtArgs> = {}>(args?: Subset<T, Task$milestoneArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subtasks<T extends Task$subtasksArgs<ExtArgs> = {}>(args?: Subset<T, Task$subtasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timerSessions<T extends Task$timerSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Task$timerSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly isCompleted: FieldRef<"Task", 'Boolean'>
    readonly completedAt: FieldRef<"Task", 'DateTime'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly priority: FieldRef<"Task", 'Priority'>
    readonly estimatedTime: FieldRef<"Task", 'Int'>
    readonly timeSpent: FieldRef<"Task", 'Int'>
    readonly recurrence: FieldRef<"Task", 'Recurrence'>
    readonly order: FieldRef<"Task", 'Int'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly subjectId: FieldRef<"Task", 'String'>
    readonly milestoneId: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.milestone
   */
  export type Task$milestoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    where?: MilestoneWhereInput
  }

  /**
   * Task.subtasks
   */
  export type Task$subtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    cursor?: SubtaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Task.timerSessions
   */
  export type Task$timerSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    where?: TimerSessionWhereInput
    orderBy?: TimerSessionOrderByWithRelationInput | TimerSessionOrderByWithRelationInput[]
    cursor?: TimerSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimerSessionScalarFieldEnum | TimerSessionScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Subtask
   */

  export type AggregateSubtask = {
    _count: SubtaskCountAggregateOutputType | null
    _avg: SubtaskAvgAggregateOutputType | null
    _sum: SubtaskSumAggregateOutputType | null
    _min: SubtaskMinAggregateOutputType | null
    _max: SubtaskMaxAggregateOutputType | null
  }

  export type SubtaskAvgAggregateOutputType = {
    order: number | null
  }

  export type SubtaskSumAggregateOutputType = {
    order: number | null
  }

  export type SubtaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    notes: string | null
    isCompleted: boolean | null
    completedAt: Date | null
    order: number | null
    createdAt: Date | null
    taskId: string | null
    parentId: string | null
  }

  export type SubtaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    notes: string | null
    isCompleted: boolean | null
    completedAt: Date | null
    order: number | null
    createdAt: Date | null
    taskId: string | null
    parentId: string | null
  }

  export type SubtaskCountAggregateOutputType = {
    id: number
    title: number
    notes: number
    isCompleted: number
    completedAt: number
    order: number
    createdAt: number
    taskId: number
    parentId: number
    _all: number
  }


  export type SubtaskAvgAggregateInputType = {
    order?: true
  }

  export type SubtaskSumAggregateInputType = {
    order?: true
  }

  export type SubtaskMinAggregateInputType = {
    id?: true
    title?: true
    notes?: true
    isCompleted?: true
    completedAt?: true
    order?: true
    createdAt?: true
    taskId?: true
    parentId?: true
  }

  export type SubtaskMaxAggregateInputType = {
    id?: true
    title?: true
    notes?: true
    isCompleted?: true
    completedAt?: true
    order?: true
    createdAt?: true
    taskId?: true
    parentId?: true
  }

  export type SubtaskCountAggregateInputType = {
    id?: true
    title?: true
    notes?: true
    isCompleted?: true
    completedAt?: true
    order?: true
    createdAt?: true
    taskId?: true
    parentId?: true
    _all?: true
  }

  export type SubtaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtask to aggregate.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subtasks
    **/
    _count?: true | SubtaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubtaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubtaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubtaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubtaskMaxAggregateInputType
  }

  export type GetSubtaskAggregateType<T extends SubtaskAggregateArgs> = {
        [P in keyof T & keyof AggregateSubtask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubtask[P]>
      : GetScalarType<T[P], AggregateSubtask[P]>
  }




  export type SubtaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithAggregationInput | SubtaskOrderByWithAggregationInput[]
    by: SubtaskScalarFieldEnum[] | SubtaskScalarFieldEnum
    having?: SubtaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubtaskCountAggregateInputType | true
    _avg?: SubtaskAvgAggregateInputType
    _sum?: SubtaskSumAggregateInputType
    _min?: SubtaskMinAggregateInputType
    _max?: SubtaskMaxAggregateInputType
  }

  export type SubtaskGroupByOutputType = {
    id: string
    title: string
    notes: string
    isCompleted: boolean
    completedAt: Date | null
    order: number
    createdAt: Date
    taskId: string
    parentId: string | null
    _count: SubtaskCountAggregateOutputType | null
    _avg: SubtaskAvgAggregateOutputType | null
    _sum: SubtaskSumAggregateOutputType | null
    _min: SubtaskMinAggregateOutputType | null
    _max: SubtaskMaxAggregateOutputType | null
  }

  type GetSubtaskGroupByPayload<T extends SubtaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubtaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubtaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubtaskGroupByOutputType[P]>
            : GetScalarType<T[P], SubtaskGroupByOutputType[P]>
        }
      >
    >


  export type SubtaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    notes?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    createdAt?: boolean
    taskId?: boolean
    parentId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    parent?: boolean | Subtask$parentArgs<ExtArgs>
    children?: boolean | Subtask$childrenArgs<ExtArgs>
    _count?: boolean | SubtaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    notes?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    createdAt?: boolean
    taskId?: boolean
    parentId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    parent?: boolean | Subtask$parentArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    notes?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    createdAt?: boolean
    taskId?: boolean
    parentId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    parent?: boolean | Subtask$parentArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectScalar = {
    id?: boolean
    title?: boolean
    notes?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    createdAt?: boolean
    taskId?: boolean
    parentId?: boolean
  }

  export type SubtaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "notes" | "isCompleted" | "completedAt" | "order" | "createdAt" | "taskId" | "parentId", ExtArgs["result"]["subtask"]>
  export type SubtaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    parent?: boolean | Subtask$parentArgs<ExtArgs>
    children?: boolean | Subtask$childrenArgs<ExtArgs>
    _count?: boolean | SubtaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubtaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    parent?: boolean | Subtask$parentArgs<ExtArgs>
  }
  export type SubtaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    parent?: boolean | Subtask$parentArgs<ExtArgs>
  }

  export type $SubtaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subtask"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      parent: Prisma.$SubtaskPayload<ExtArgs> | null
      children: Prisma.$SubtaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      notes: string
      isCompleted: boolean
      completedAt: Date | null
      order: number
      createdAt: Date
      taskId: string
      parentId: string | null
    }, ExtArgs["result"]["subtask"]>
    composites: {}
  }

  type SubtaskGetPayload<S extends boolean | null | undefined | SubtaskDefaultArgs> = $Result.GetResult<Prisma.$SubtaskPayload, S>

  type SubtaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubtaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubtaskCountAggregateInputType | true
    }

  export interface SubtaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subtask'], meta: { name: 'Subtask' } }
    /**
     * Find zero or one Subtask that matches the filter.
     * @param {SubtaskFindUniqueArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubtaskFindUniqueArgs>(args: SelectSubset<T, SubtaskFindUniqueArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subtask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubtaskFindUniqueOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubtaskFindUniqueOrThrowArgs>(args: SelectSubset<T, SubtaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubtaskFindFirstArgs>(args?: SelectSubset<T, SubtaskFindFirstArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubtaskFindFirstOrThrowArgs>(args?: SelectSubset<T, SubtaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subtasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subtasks
     * const subtasks = await prisma.subtask.findMany()
     * 
     * // Get first 10 Subtasks
     * const subtasks = await prisma.subtask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subtaskWithIdOnly = await prisma.subtask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubtaskFindManyArgs>(args?: SelectSubset<T, SubtaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subtask.
     * @param {SubtaskCreateArgs} args - Arguments to create a Subtask.
     * @example
     * // Create one Subtask
     * const Subtask = await prisma.subtask.create({
     *   data: {
     *     // ... data to create a Subtask
     *   }
     * })
     * 
     */
    create<T extends SubtaskCreateArgs>(args: SelectSubset<T, SubtaskCreateArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subtasks.
     * @param {SubtaskCreateManyArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubtaskCreateManyArgs>(args?: SelectSubset<T, SubtaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subtasks and returns the data saved in the database.
     * @param {SubtaskCreateManyAndReturnArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubtaskCreateManyAndReturnArgs>(args?: SelectSubset<T, SubtaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subtask.
     * @param {SubtaskDeleteArgs} args - Arguments to delete one Subtask.
     * @example
     * // Delete one Subtask
     * const Subtask = await prisma.subtask.delete({
     *   where: {
     *     // ... filter to delete one Subtask
     *   }
     * })
     * 
     */
    delete<T extends SubtaskDeleteArgs>(args: SelectSubset<T, SubtaskDeleteArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subtask.
     * @param {SubtaskUpdateArgs} args - Arguments to update one Subtask.
     * @example
     * // Update one Subtask
     * const subtask = await prisma.subtask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubtaskUpdateArgs>(args: SelectSubset<T, SubtaskUpdateArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subtasks.
     * @param {SubtaskDeleteManyArgs} args - Arguments to filter Subtasks to delete.
     * @example
     * // Delete a few Subtasks
     * const { count } = await prisma.subtask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubtaskDeleteManyArgs>(args?: SelectSubset<T, SubtaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubtaskUpdateManyArgs>(args: SelectSubset<T, SubtaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtasks and returns the data updated in the database.
     * @param {SubtaskUpdateManyAndReturnArgs} args - Arguments to update many Subtasks.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubtaskUpdateManyAndReturnArgs>(args: SelectSubset<T, SubtaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subtask.
     * @param {SubtaskUpsertArgs} args - Arguments to update or create a Subtask.
     * @example
     * // Update or create a Subtask
     * const subtask = await prisma.subtask.upsert({
     *   create: {
     *     // ... data to create a Subtask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subtask we want to update
     *   }
     * })
     */
    upsert<T extends SubtaskUpsertArgs>(args: SelectSubset<T, SubtaskUpsertArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskCountArgs} args - Arguments to filter Subtasks to count.
     * @example
     * // Count the number of Subtasks
     * const count = await prisma.subtask.count({
     *   where: {
     *     // ... the filter for the Subtasks we want to count
     *   }
     * })
    **/
    count<T extends SubtaskCountArgs>(
      args?: Subset<T, SubtaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubtaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubtaskAggregateArgs>(args: Subset<T, SubtaskAggregateArgs>): Prisma.PrismaPromise<GetSubtaskAggregateType<T>>

    /**
     * Group by Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskGroupByArgs} args - Group by arguments.
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
      T extends SubtaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubtaskGroupByArgs['orderBy'] }
        : { orderBy?: SubtaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubtaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubtaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subtask model
   */
  readonly fields: SubtaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subtask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubtaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends Subtask$parentArgs<ExtArgs> = {}>(args?: Subset<T, Subtask$parentArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Subtask$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Subtask$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Subtask model
   */
  interface SubtaskFieldRefs {
    readonly id: FieldRef<"Subtask", 'String'>
    readonly title: FieldRef<"Subtask", 'String'>
    readonly notes: FieldRef<"Subtask", 'String'>
    readonly isCompleted: FieldRef<"Subtask", 'Boolean'>
    readonly completedAt: FieldRef<"Subtask", 'DateTime'>
    readonly order: FieldRef<"Subtask", 'Int'>
    readonly createdAt: FieldRef<"Subtask", 'DateTime'>
    readonly taskId: FieldRef<"Subtask", 'String'>
    readonly parentId: FieldRef<"Subtask", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subtask findUnique
   */
  export type SubtaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask findUniqueOrThrow
   */
  export type SubtaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask findFirst
   */
  export type SubtaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask findFirstOrThrow
   */
  export type SubtaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask findMany
   */
  export type SubtaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtasks to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask create
   */
  export type SubtaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Subtask.
     */
    data: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>
  }

  /**
   * Subtask createMany
   */
  export type SubtaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subtask createManyAndReturn
   */
  export type SubtaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtask update
   */
  export type SubtaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Subtask.
     */
    data: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>
    /**
     * Choose, which Subtask to update.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask updateMany
   */
  export type SubtaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number
  }

  /**
   * Subtask updateManyAndReturn
   */
  export type SubtaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtask upsert
   */
  export type SubtaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Subtask to update in case it exists.
     */
    where: SubtaskWhereUniqueInput
    /**
     * In case the Subtask found by the `where` argument doesn't exist, create a new Subtask with this data.
     */
    create: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>
    /**
     * In case the Subtask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>
  }

  /**
   * Subtask delete
   */
  export type SubtaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter which Subtask to delete.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask deleteMany
   */
  export type SubtaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtasks to delete
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to delete.
     */
    limit?: number
  }

  /**
   * Subtask.parent
   */
  export type Subtask$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
  }

  /**
   * Subtask.children
   */
  export type Subtask$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    cursor?: SubtaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask without action
   */
  export type SubtaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
  }


  /**
   * Model Resource
   */

  export type AggregateResource = {
    _count: ResourceCountAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  export type ResourceMinAggregateOutputType = {
    id: string | null
    type: $Enums.ResourceType | null
    url: string | null
    title: string | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    subjectId: string | null
  }

  export type ResourceMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ResourceType | null
    url: string | null
    title: string | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    subjectId: string | null
  }

  export type ResourceCountAggregateOutputType = {
    id: number
    type: number
    url: number
    title: number
    note: number
    createdAt: number
    updatedAt: number
    userId: number
    subjectId: number
    _all: number
  }


  export type ResourceMinAggregateInputType = {
    id?: true
    type?: true
    url?: true
    title?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectId?: true
  }

  export type ResourceMaxAggregateInputType = {
    id?: true
    type?: true
    url?: true
    title?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectId?: true
  }

  export type ResourceCountAggregateInputType = {
    id?: true
    type?: true
    url?: true
    title?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectId?: true
    _all?: true
  }

  export type ResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resource to aggregate.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resources
    **/
    _count?: true | ResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceMaxAggregateInputType
  }

  export type GetResourceAggregateType<T extends ResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResource[P]>
      : GetScalarType<T[P], AggregateResource[P]>
  }




  export type ResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithAggregationInput | ResourceOrderByWithAggregationInput[]
    by: ResourceScalarFieldEnum[] | ResourceScalarFieldEnum
    having?: ResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceCountAggregateInputType | true
    _min?: ResourceMinAggregateInputType
    _max?: ResourceMaxAggregateInputType
  }

  export type ResourceGroupByOutputType = {
    id: string
    type: $Enums.ResourceType
    url: string
    title: string
    note: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    subjectId: string
    _count: ResourceCountAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  type GetResourceGroupByPayload<T extends ResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceGroupByOutputType[P]>
        }
      >
    >


  export type ResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    url?: boolean
    title?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    url?: boolean
    title?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    url?: boolean
    title?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectScalar = {
    id?: boolean
    type?: boolean
    url?: boolean
    title?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
  }

  export type ResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "url" | "title" | "note" | "createdAt" | "updatedAt" | "userId" | "subjectId", ExtArgs["result"]["resource"]>
  export type ResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $ResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resource"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ResourceType
      url: string
      title: string
      note: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
      subjectId: string
    }, ExtArgs["result"]["resource"]>
    composites: {}
  }

  type ResourceGetPayload<S extends boolean | null | undefined | ResourceDefaultArgs> = $Result.GetResult<Prisma.$ResourcePayload, S>

  type ResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceCountAggregateInputType | true
    }

  export interface ResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resource'], meta: { name: 'Resource' } }
    /**
     * Find zero or one Resource that matches the filter.
     * @param {ResourceFindUniqueArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceFindUniqueArgs>(args: SelectSubset<T, ResourceFindUniqueArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceFindUniqueOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceFindFirstArgs>(args?: SelectSubset<T, ResourceFindFirstArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resources
     * const resources = await prisma.resource.findMany()
     * 
     * // Get first 10 Resources
     * const resources = await prisma.resource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceWithIdOnly = await prisma.resource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceFindManyArgs>(args?: SelectSubset<T, ResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resource.
     * @param {ResourceCreateArgs} args - Arguments to create a Resource.
     * @example
     * // Create one Resource
     * const Resource = await prisma.resource.create({
     *   data: {
     *     // ... data to create a Resource
     *   }
     * })
     * 
     */
    create<T extends ResourceCreateArgs>(args: SelectSubset<T, ResourceCreateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resources.
     * @param {ResourceCreateManyArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceCreateManyArgs>(args?: SelectSubset<T, ResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resources and returns the data saved in the database.
     * @param {ResourceCreateManyAndReturnArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resource.
     * @param {ResourceDeleteArgs} args - Arguments to delete one Resource.
     * @example
     * // Delete one Resource
     * const Resource = await prisma.resource.delete({
     *   where: {
     *     // ... filter to delete one Resource
     *   }
     * })
     * 
     */
    delete<T extends ResourceDeleteArgs>(args: SelectSubset<T, ResourceDeleteArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resource.
     * @param {ResourceUpdateArgs} args - Arguments to update one Resource.
     * @example
     * // Update one Resource
     * const resource = await prisma.resource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceUpdateArgs>(args: SelectSubset<T, ResourceUpdateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resources.
     * @param {ResourceDeleteManyArgs} args - Arguments to filter Resources to delete.
     * @example
     * // Delete a few Resources
     * const { count } = await prisma.resource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceDeleteManyArgs>(args?: SelectSubset<T, ResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceUpdateManyArgs>(args: SelectSubset<T, ResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources and returns the data updated in the database.
     * @param {ResourceUpdateManyAndReturnArgs} args - Arguments to update many Resources.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resource.
     * @param {ResourceUpsertArgs} args - Arguments to update or create a Resource.
     * @example
     * // Update or create a Resource
     * const resource = await prisma.resource.upsert({
     *   create: {
     *     // ... data to create a Resource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resource we want to update
     *   }
     * })
     */
    upsert<T extends ResourceUpsertArgs>(args: SelectSubset<T, ResourceUpsertArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCountArgs} args - Arguments to filter Resources to count.
     * @example
     * // Count the number of Resources
     * const count = await prisma.resource.count({
     *   where: {
     *     // ... the filter for the Resources we want to count
     *   }
     * })
    **/
    count<T extends ResourceCountArgs>(
      args?: Subset<T, ResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResourceAggregateArgs>(args: Subset<T, ResourceAggregateArgs>): Prisma.PrismaPromise<GetResourceAggregateType<T>>

    /**
     * Group by Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceGroupByArgs} args - Group by arguments.
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
      T extends ResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceGroupByArgs['orderBy'] }
        : { orderBy?: ResourceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resource model
   */
  readonly fields: ResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Resource model
   */
  interface ResourceFieldRefs {
    readonly id: FieldRef<"Resource", 'String'>
    readonly type: FieldRef<"Resource", 'ResourceType'>
    readonly url: FieldRef<"Resource", 'String'>
    readonly title: FieldRef<"Resource", 'String'>
    readonly note: FieldRef<"Resource", 'String'>
    readonly createdAt: FieldRef<"Resource", 'DateTime'>
    readonly updatedAt: FieldRef<"Resource", 'DateTime'>
    readonly userId: FieldRef<"Resource", 'String'>
    readonly subjectId: FieldRef<"Resource", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Resource findUnique
   */
  export type ResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findUniqueOrThrow
   */
  export type ResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findFirst
   */
  export type ResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findFirstOrThrow
   */
  export type ResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findMany
   */
  export type ResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resources to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource create
   */
  export type ResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Resource.
     */
    data: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
  }

  /**
   * Resource createMany
   */
  export type ResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resource createManyAndReturn
   */
  export type ResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource update
   */
  export type ResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Resource.
     */
    data: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
    /**
     * Choose, which Resource to update.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource updateMany
   */
  export type ResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
  }

  /**
   * Resource updateManyAndReturn
   */
  export type ResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource upsert
   */
  export type ResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Resource to update in case it exists.
     */
    where: ResourceWhereUniqueInput
    /**
     * In case the Resource found by the `where` argument doesn't exist, create a new Resource with this data.
     */
    create: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
    /**
     * In case the Resource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
  }

  /**
   * Resource delete
   */
  export type ResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter which Resource to delete.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource deleteMany
   */
  export type ResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resources to delete
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to delete.
     */
    limit?: number
  }

  /**
   * Resource without action
   */
  export type ResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
  }


  /**
   * Model TimerSession
   */

  export type AggregateTimerSession = {
    _count: TimerSessionCountAggregateOutputType | null
    _avg: TimerSessionAvgAggregateOutputType | null
    _sum: TimerSessionSumAggregateOutputType | null
    _min: TimerSessionMinAggregateOutputType | null
    _max: TimerSessionMaxAggregateOutputType | null
  }

  export type TimerSessionAvgAggregateOutputType = {
    duration: number | null
  }

  export type TimerSessionSumAggregateOutputType = {
    duration: number | null
  }

  export type TimerSessionMinAggregateOutputType = {
    id: string | null
    startedAt: Date | null
    endedAt: Date | null
    duration: number | null
    taskId: string | null
  }

  export type TimerSessionMaxAggregateOutputType = {
    id: string | null
    startedAt: Date | null
    endedAt: Date | null
    duration: number | null
    taskId: string | null
  }

  export type TimerSessionCountAggregateOutputType = {
    id: number
    startedAt: number
    endedAt: number
    duration: number
    taskId: number
    _all: number
  }


  export type TimerSessionAvgAggregateInputType = {
    duration?: true
  }

  export type TimerSessionSumAggregateInputType = {
    duration?: true
  }

  export type TimerSessionMinAggregateInputType = {
    id?: true
    startedAt?: true
    endedAt?: true
    duration?: true
    taskId?: true
  }

  export type TimerSessionMaxAggregateInputType = {
    id?: true
    startedAt?: true
    endedAt?: true
    duration?: true
    taskId?: true
  }

  export type TimerSessionCountAggregateInputType = {
    id?: true
    startedAt?: true
    endedAt?: true
    duration?: true
    taskId?: true
    _all?: true
  }

  export type TimerSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimerSession to aggregate.
     */
    where?: TimerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimerSessions to fetch.
     */
    orderBy?: TimerSessionOrderByWithRelationInput | TimerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimerSessions
    **/
    _count?: true | TimerSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimerSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimerSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimerSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimerSessionMaxAggregateInputType
  }

  export type GetTimerSessionAggregateType<T extends TimerSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateTimerSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimerSession[P]>
      : GetScalarType<T[P], AggregateTimerSession[P]>
  }




  export type TimerSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimerSessionWhereInput
    orderBy?: TimerSessionOrderByWithAggregationInput | TimerSessionOrderByWithAggregationInput[]
    by: TimerSessionScalarFieldEnum[] | TimerSessionScalarFieldEnum
    having?: TimerSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimerSessionCountAggregateInputType | true
    _avg?: TimerSessionAvgAggregateInputType
    _sum?: TimerSessionSumAggregateInputType
    _min?: TimerSessionMinAggregateInputType
    _max?: TimerSessionMaxAggregateInputType
  }

  export type TimerSessionGroupByOutputType = {
    id: string
    startedAt: Date
    endedAt: Date | null
    duration: number | null
    taskId: string
    _count: TimerSessionCountAggregateOutputType | null
    _avg: TimerSessionAvgAggregateOutputType | null
    _sum: TimerSessionSumAggregateOutputType | null
    _min: TimerSessionMinAggregateOutputType | null
    _max: TimerSessionMaxAggregateOutputType | null
  }

  type GetTimerSessionGroupByPayload<T extends TimerSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimerSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimerSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimerSessionGroupByOutputType[P]>
            : GetScalarType<T[P], TimerSessionGroupByOutputType[P]>
        }
      >
    >


  export type TimerSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startedAt?: boolean
    endedAt?: boolean
    duration?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timerSession"]>

  export type TimerSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startedAt?: boolean
    endedAt?: boolean
    duration?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timerSession"]>

  export type TimerSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startedAt?: boolean
    endedAt?: boolean
    duration?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timerSession"]>

  export type TimerSessionSelectScalar = {
    id?: boolean
    startedAt?: boolean
    endedAt?: boolean
    duration?: boolean
    taskId?: boolean
  }

  export type TimerSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "startedAt" | "endedAt" | "duration" | "taskId", ExtArgs["result"]["timerSession"]>
  export type TimerSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TimerSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TimerSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $TimerSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimerSession"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      startedAt: Date
      endedAt: Date | null
      duration: number | null
      taskId: string
    }, ExtArgs["result"]["timerSession"]>
    composites: {}
  }

  type TimerSessionGetPayload<S extends boolean | null | undefined | TimerSessionDefaultArgs> = $Result.GetResult<Prisma.$TimerSessionPayload, S>

  type TimerSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimerSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimerSessionCountAggregateInputType | true
    }

  export interface TimerSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimerSession'], meta: { name: 'TimerSession' } }
    /**
     * Find zero or one TimerSession that matches the filter.
     * @param {TimerSessionFindUniqueArgs} args - Arguments to find a TimerSession
     * @example
     * // Get one TimerSession
     * const timerSession = await prisma.timerSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimerSessionFindUniqueArgs>(args: SelectSubset<T, TimerSessionFindUniqueArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimerSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimerSessionFindUniqueOrThrowArgs} args - Arguments to find a TimerSession
     * @example
     * // Get one TimerSession
     * const timerSession = await prisma.timerSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimerSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, TimerSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimerSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimerSessionFindFirstArgs} args - Arguments to find a TimerSession
     * @example
     * // Get one TimerSession
     * const timerSession = await prisma.timerSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimerSessionFindFirstArgs>(args?: SelectSubset<T, TimerSessionFindFirstArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimerSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimerSessionFindFirstOrThrowArgs} args - Arguments to find a TimerSession
     * @example
     * // Get one TimerSession
     * const timerSession = await prisma.timerSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimerSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, TimerSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimerSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimerSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimerSessions
     * const timerSessions = await prisma.timerSession.findMany()
     * 
     * // Get first 10 TimerSessions
     * const timerSessions = await prisma.timerSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timerSessionWithIdOnly = await prisma.timerSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimerSessionFindManyArgs>(args?: SelectSubset<T, TimerSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimerSession.
     * @param {TimerSessionCreateArgs} args - Arguments to create a TimerSession.
     * @example
     * // Create one TimerSession
     * const TimerSession = await prisma.timerSession.create({
     *   data: {
     *     // ... data to create a TimerSession
     *   }
     * })
     * 
     */
    create<T extends TimerSessionCreateArgs>(args: SelectSubset<T, TimerSessionCreateArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimerSessions.
     * @param {TimerSessionCreateManyArgs} args - Arguments to create many TimerSessions.
     * @example
     * // Create many TimerSessions
     * const timerSession = await prisma.timerSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimerSessionCreateManyArgs>(args?: SelectSubset<T, TimerSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimerSessions and returns the data saved in the database.
     * @param {TimerSessionCreateManyAndReturnArgs} args - Arguments to create many TimerSessions.
     * @example
     * // Create many TimerSessions
     * const timerSession = await prisma.timerSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimerSessions and only return the `id`
     * const timerSessionWithIdOnly = await prisma.timerSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimerSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, TimerSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimerSession.
     * @param {TimerSessionDeleteArgs} args - Arguments to delete one TimerSession.
     * @example
     * // Delete one TimerSession
     * const TimerSession = await prisma.timerSession.delete({
     *   where: {
     *     // ... filter to delete one TimerSession
     *   }
     * })
     * 
     */
    delete<T extends TimerSessionDeleteArgs>(args: SelectSubset<T, TimerSessionDeleteArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimerSession.
     * @param {TimerSessionUpdateArgs} args - Arguments to update one TimerSession.
     * @example
     * // Update one TimerSession
     * const timerSession = await prisma.timerSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimerSessionUpdateArgs>(args: SelectSubset<T, TimerSessionUpdateArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimerSessions.
     * @param {TimerSessionDeleteManyArgs} args - Arguments to filter TimerSessions to delete.
     * @example
     * // Delete a few TimerSessions
     * const { count } = await prisma.timerSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimerSessionDeleteManyArgs>(args?: SelectSubset<T, TimerSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimerSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimerSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimerSessions
     * const timerSession = await prisma.timerSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimerSessionUpdateManyArgs>(args: SelectSubset<T, TimerSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimerSessions and returns the data updated in the database.
     * @param {TimerSessionUpdateManyAndReturnArgs} args - Arguments to update many TimerSessions.
     * @example
     * // Update many TimerSessions
     * const timerSession = await prisma.timerSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimerSessions and only return the `id`
     * const timerSessionWithIdOnly = await prisma.timerSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimerSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, TimerSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimerSession.
     * @param {TimerSessionUpsertArgs} args - Arguments to update or create a TimerSession.
     * @example
     * // Update or create a TimerSession
     * const timerSession = await prisma.timerSession.upsert({
     *   create: {
     *     // ... data to create a TimerSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimerSession we want to update
     *   }
     * })
     */
    upsert<T extends TimerSessionUpsertArgs>(args: SelectSubset<T, TimerSessionUpsertArgs<ExtArgs>>): Prisma__TimerSessionClient<$Result.GetResult<Prisma.$TimerSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimerSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimerSessionCountArgs} args - Arguments to filter TimerSessions to count.
     * @example
     * // Count the number of TimerSessions
     * const count = await prisma.timerSession.count({
     *   where: {
     *     // ... the filter for the TimerSessions we want to count
     *   }
     * })
    **/
    count<T extends TimerSessionCountArgs>(
      args?: Subset<T, TimerSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimerSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimerSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimerSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TimerSessionAggregateArgs>(args: Subset<T, TimerSessionAggregateArgs>): Prisma.PrismaPromise<GetTimerSessionAggregateType<T>>

    /**
     * Group by TimerSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimerSessionGroupByArgs} args - Group by arguments.
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
      T extends TimerSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimerSessionGroupByArgs['orderBy'] }
        : { orderBy?: TimerSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TimerSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimerSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimerSession model
   */
  readonly fields: TimerSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimerSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimerSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TimerSession model
   */
  interface TimerSessionFieldRefs {
    readonly id: FieldRef<"TimerSession", 'String'>
    readonly startedAt: FieldRef<"TimerSession", 'DateTime'>
    readonly endedAt: FieldRef<"TimerSession", 'DateTime'>
    readonly duration: FieldRef<"TimerSession", 'Int'>
    readonly taskId: FieldRef<"TimerSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TimerSession findUnique
   */
  export type TimerSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * Filter, which TimerSession to fetch.
     */
    where: TimerSessionWhereUniqueInput
  }

  /**
   * TimerSession findUniqueOrThrow
   */
  export type TimerSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * Filter, which TimerSession to fetch.
     */
    where: TimerSessionWhereUniqueInput
  }

  /**
   * TimerSession findFirst
   */
  export type TimerSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * Filter, which TimerSession to fetch.
     */
    where?: TimerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimerSessions to fetch.
     */
    orderBy?: TimerSessionOrderByWithRelationInput | TimerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimerSessions.
     */
    cursor?: TimerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimerSessions.
     */
    distinct?: TimerSessionScalarFieldEnum | TimerSessionScalarFieldEnum[]
  }

  /**
   * TimerSession findFirstOrThrow
   */
  export type TimerSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * Filter, which TimerSession to fetch.
     */
    where?: TimerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimerSessions to fetch.
     */
    orderBy?: TimerSessionOrderByWithRelationInput | TimerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimerSessions.
     */
    cursor?: TimerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimerSessions.
     */
    distinct?: TimerSessionScalarFieldEnum | TimerSessionScalarFieldEnum[]
  }

  /**
   * TimerSession findMany
   */
  export type TimerSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * Filter, which TimerSessions to fetch.
     */
    where?: TimerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimerSessions to fetch.
     */
    orderBy?: TimerSessionOrderByWithRelationInput | TimerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimerSessions.
     */
    cursor?: TimerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimerSessions.
     */
    skip?: number
    distinct?: TimerSessionScalarFieldEnum | TimerSessionScalarFieldEnum[]
  }

  /**
   * TimerSession create
   */
  export type TimerSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a TimerSession.
     */
    data: XOR<TimerSessionCreateInput, TimerSessionUncheckedCreateInput>
  }

  /**
   * TimerSession createMany
   */
  export type TimerSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimerSessions.
     */
    data: TimerSessionCreateManyInput | TimerSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimerSession createManyAndReturn
   */
  export type TimerSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * The data used to create many TimerSessions.
     */
    data: TimerSessionCreateManyInput | TimerSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimerSession update
   */
  export type TimerSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a TimerSession.
     */
    data: XOR<TimerSessionUpdateInput, TimerSessionUncheckedUpdateInput>
    /**
     * Choose, which TimerSession to update.
     */
    where: TimerSessionWhereUniqueInput
  }

  /**
   * TimerSession updateMany
   */
  export type TimerSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimerSessions.
     */
    data: XOR<TimerSessionUpdateManyMutationInput, TimerSessionUncheckedUpdateManyInput>
    /**
     * Filter which TimerSessions to update
     */
    where?: TimerSessionWhereInput
    /**
     * Limit how many TimerSessions to update.
     */
    limit?: number
  }

  /**
   * TimerSession updateManyAndReturn
   */
  export type TimerSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * The data used to update TimerSessions.
     */
    data: XOR<TimerSessionUpdateManyMutationInput, TimerSessionUncheckedUpdateManyInput>
    /**
     * Filter which TimerSessions to update
     */
    where?: TimerSessionWhereInput
    /**
     * Limit how many TimerSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimerSession upsert
   */
  export type TimerSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the TimerSession to update in case it exists.
     */
    where: TimerSessionWhereUniqueInput
    /**
     * In case the TimerSession found by the `where` argument doesn't exist, create a new TimerSession with this data.
     */
    create: XOR<TimerSessionCreateInput, TimerSessionUncheckedCreateInput>
    /**
     * In case the TimerSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimerSessionUpdateInput, TimerSessionUncheckedUpdateInput>
  }

  /**
   * TimerSession delete
   */
  export type TimerSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
    /**
     * Filter which TimerSession to delete.
     */
    where: TimerSessionWhereUniqueInput
  }

  /**
   * TimerSession deleteMany
   */
  export type TimerSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimerSessions to delete
     */
    where?: TimerSessionWhereInput
    /**
     * Limit how many TimerSessions to delete.
     */
    limit?: number
  }

  /**
   * TimerSession without action
   */
  export type TimerSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimerSession
     */
    select?: TimerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimerSession
     */
    omit?: TimerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimerSessionInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    subjectId: string | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    subjectId: string | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    title: number
    createdAt: number
    updatedAt: number
    userId: number
    subjectId: number
    contextSubjectIds: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectId?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectId?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectId?: true
    contextSubjectIds?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    title: string
    createdAt: Date
    updatedAt: Date
    userId: string
    subjectId: string | null
    contextSubjectIds: string[]
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
    contextSubjectIds?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | Conversation$subjectArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
    contextSubjectIds?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | Conversation$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
    contextSubjectIds?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | Conversation$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectId?: boolean
    contextSubjectIds?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "createdAt" | "updatedAt" | "userId" | "subjectId" | "contextSubjectIds", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | Conversation$subjectArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | Conversation$subjectArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subject?: boolean | Conversation$subjectArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs> | null
      messages: Prisma.$ChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      createdAt: Date
      updatedAt: Date
      userId: string
      subjectId: string | null
      contextSubjectIds: string[]
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
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
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends Conversation$subjectArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$subjectArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly title: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
    readonly userId: FieldRef<"Conversation", 'String'>
    readonly subjectId: FieldRef<"Conversation", 'String'>
    readonly contextSubjectIds: FieldRef<"Conversation", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.subject
   */
  export type Conversation$subjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    where?: SubjectWhereInput
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model ChatMessage
   */

  export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  export type ChatMessageMinAggregateOutputType = {
    id: string | null
    role: $Enums.ChatRole | null
    content: string | null
    model: string | null
    createdAt: Date | null
    conversationId: string | null
  }

  export type ChatMessageMaxAggregateOutputType = {
    id: string | null
    role: $Enums.ChatRole | null
    content: string | null
    model: string | null
    createdAt: Date | null
    conversationId: string | null
  }

  export type ChatMessageCountAggregateOutputType = {
    id: number
    role: number
    content: number
    model: number
    createdAt: number
    conversationId: number
    _all: number
  }


  export type ChatMessageMinAggregateInputType = {
    id?: true
    role?: true
    content?: true
    model?: true
    createdAt?: true
    conversationId?: true
  }

  export type ChatMessageMaxAggregateInputType = {
    id?: true
    role?: true
    content?: true
    model?: true
    createdAt?: true
    conversationId?: true
  }

  export type ChatMessageCountAggregateInputType = {
    id?: true
    role?: true
    content?: true
    model?: true
    createdAt?: true
    conversationId?: true
    _all?: true
  }

  export type ChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessage to aggregate.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessages
    **/
    _count?: true | ChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageMaxAggregateInputType
  }

  export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessage[P]>
      : GetScalarType<T[P], AggregateChatMessage[P]>
  }




  export type ChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithAggregationInput | ChatMessageOrderByWithAggregationInput[]
    by: ChatMessageScalarFieldEnum[] | ChatMessageScalarFieldEnum
    having?: ChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCountAggregateInputType | true
    _min?: ChatMessageMinAggregateInputType
    _max?: ChatMessageMaxAggregateInputType
  }

  export type ChatMessageGroupByOutputType = {
    id: string
    role: $Enums.ChatRole
    content: string
    model: string | null
    createdAt: Date
    conversationId: string
    _count: ChatMessageCountAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type ChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    content?: boolean
    model?: boolean
    createdAt?: boolean
    conversationId?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    content?: boolean
    model?: boolean
    createdAt?: boolean
    conversationId?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    content?: boolean
    model?: boolean
    createdAt?: boolean
    conversationId?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectScalar = {
    id?: boolean
    role?: boolean
    content?: boolean
    model?: boolean
    createdAt?: boolean
    conversationId?: boolean
  }

  export type ChatMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "content" | "model" | "createdAt" | "conversationId", ExtArgs["result"]["chatMessage"]>
  export type ChatMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ChatMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type ChatMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $ChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMessage"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.ChatRole
      content: string
      model: string | null
      createdAt: Date
      conversationId: string
    }, ExtArgs["result"]["chatMessage"]>
    composites: {}
  }

  type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = $Result.GetResult<Prisma.$ChatMessagePayload, S>

  type ChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMessageCountAggregateInputType | true
    }

  export interface ChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'], meta: { name: 'ChatMessage' } }
    /**
     * Find zero or one ChatMessage that matches the filter.
     * @param {ChatMessageFindUniqueArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMessageFindUniqueArgs>(args: SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMessageFindUniqueOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMessageFindFirstArgs>(args?: SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany()
     * 
     * // Get first 10 ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMessageFindManyArgs>(args?: SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMessage.
     * @param {ChatMessageCreateArgs} args - Arguments to create a ChatMessage.
     * @example
     * // Create one ChatMessage
     * const ChatMessage = await prisma.chatMessage.create({
     *   data: {
     *     // ... data to create a ChatMessage
     *   }
     * })
     * 
     */
    create<T extends ChatMessageCreateArgs>(args: SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMessages.
     * @param {ChatMessageCreateManyArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMessageCreateManyArgs>(args?: SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMessages and returns the data saved in the database.
     * @param {ChatMessageCreateManyAndReturnArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMessage.
     * @param {ChatMessageDeleteArgs} args - Arguments to delete one ChatMessage.
     * @example
     * // Delete one ChatMessage
     * const ChatMessage = await prisma.chatMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatMessage
     *   }
     * })
     * 
     */
    delete<T extends ChatMessageDeleteArgs>(args: SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMessage.
     * @param {ChatMessageUpdateArgs} args - Arguments to update one ChatMessage.
     * @example
     * // Update one ChatMessage
     * const chatMessage = await prisma.chatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMessageUpdateArgs>(args: SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMessages.
     * @param {ChatMessageDeleteManyArgs} args - Arguments to filter ChatMessages to delete.
     * @example
     * // Delete a few ChatMessages
     * const { count } = await prisma.chatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMessageDeleteManyArgs>(args?: SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMessageUpdateManyArgs>(args: SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages and returns the data updated in the database.
     * @param {ChatMessageUpdateManyAndReturnArgs} args - Arguments to update many ChatMessages.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMessage.
     * @param {ChatMessageUpsertArgs} args - Arguments to update or create a ChatMessage.
     * @example
     * // Update or create a ChatMessage
     * const chatMessage = await prisma.chatMessage.upsert({
     *   create: {
     *     // ... data to create a ChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends ChatMessageUpsertArgs>(args: SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCountArgs} args - Arguments to filter ChatMessages to count.
     * @example
     * // Count the number of ChatMessages
     * const count = await prisma.chatMessage.count({
     *   where: {
     *     // ... the filter for the ChatMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCountArgs>(
      args?: Subset<T, ChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMessageAggregateArgs>(args: Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>

    /**
     * Group by ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageGroupByArgs} args - Group by arguments.
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
      T extends ChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMessage model
   */
  readonly fields: ChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ChatMessage model
   */
  interface ChatMessageFieldRefs {
    readonly id: FieldRef<"ChatMessage", 'String'>
    readonly role: FieldRef<"ChatMessage", 'ChatRole'>
    readonly content: FieldRef<"ChatMessage", 'String'>
    readonly model: FieldRef<"ChatMessage", 'String'>
    readonly createdAt: FieldRef<"ChatMessage", 'DateTime'>
    readonly conversationId: FieldRef<"ChatMessage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ChatMessage findUnique
   */
  export type ChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findUniqueOrThrow
   */
  export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findFirst
   */
  export type ChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findFirstOrThrow
   */
  export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findMany
   */
  export type ChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessages to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage create
   */
  export type ChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatMessage.
     */
    data: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
  }

  /**
   * ChatMessage createMany
   */
  export type ChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMessage createManyAndReturn
   */
  export type ChatMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMessage update
   */
  export type ChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatMessage.
     */
    data: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatMessage to update.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage updateMany
   */
  export type ChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
  }

  /**
   * ChatMessage updateManyAndReturn
   */
  export type ChatMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMessage upsert
   */
  export type ChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatMessage to update in case it exists.
     */
    where: ChatMessageWhereUniqueInput
    /**
     * In case the ChatMessage found by the `where` argument doesn't exist, create a new ChatMessage with this data.
     */
    create: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
    /**
     * In case the ChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
  }

  /**
   * ChatMessage delete
   */
  export type ChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter which ChatMessage to delete.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage deleteMany
   */
  export type ChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessages to delete
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to delete.
     */
    limit?: number
  }

  /**
   * ChatMessage without action
   */
  export type ChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
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
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    color: 'color',
    isArchived: 'isArchived',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const MilestoneScalarFieldEnum: {
    id: 'id',
    title: 'title',
    notes: 'notes',
    order: 'order',
    isCompleted: 'isCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    subjectId: 'subjectId'
  };

  export type MilestoneScalarFieldEnum = (typeof MilestoneScalarFieldEnum)[keyof typeof MilestoneScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    isCompleted: 'isCompleted',
    completedAt: 'completedAt',
    dueDate: 'dueDate',
    priority: 'priority',
    estimatedTime: 'estimatedTime',
    timeSpent: 'timeSpent',
    recurrence: 'recurrence',
    order: 'order',
    createdAt: 'createdAt',
    userId: 'userId',
    subjectId: 'subjectId',
    milestoneId: 'milestoneId'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SubtaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    notes: 'notes',
    isCompleted: 'isCompleted',
    completedAt: 'completedAt',
    order: 'order',
    createdAt: 'createdAt',
    taskId: 'taskId',
    parentId: 'parentId'
  };

  export type SubtaskScalarFieldEnum = (typeof SubtaskScalarFieldEnum)[keyof typeof SubtaskScalarFieldEnum]


  export const ResourceScalarFieldEnum: {
    id: 'id',
    type: 'type',
    url: 'url',
    title: 'title',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    subjectId: 'subjectId'
  };

  export type ResourceScalarFieldEnum = (typeof ResourceScalarFieldEnum)[keyof typeof ResourceScalarFieldEnum]


  export const TimerSessionScalarFieldEnum: {
    id: 'id',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    duration: 'duration',
    taskId: 'taskId'
  };

  export type TimerSessionScalarFieldEnum = (typeof TimerSessionScalarFieldEnum)[keyof typeof TimerSessionScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    subjectId: 'subjectId',
    contextSubjectIds: 'contextSubjectIds'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const ChatMessageScalarFieldEnum: {
    id: 'id',
    role: 'role',
    content: 'content',
    model: 'model',
    createdAt: 'createdAt',
    conversationId: 'conversationId'
  };

  export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Priority'
   */
  export type EnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority'>
    


  /**
   * Reference to a field of type 'Priority[]'
   */
  export type ListEnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority[]'>
    


  /**
   * Reference to a field of type 'Recurrence'
   */
  export type EnumRecurrenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Recurrence'>
    


  /**
   * Reference to a field of type 'Recurrence[]'
   */
  export type ListEnumRecurrenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Recurrence[]'>
    


  /**
   * Reference to a field of type 'ResourceType'
   */
  export type EnumResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResourceType'>
    


  /**
   * Reference to a field of type 'ResourceType[]'
   */
  export type ListEnumResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResourceType[]'>
    


  /**
   * Reference to a field of type 'ChatRole'
   */
  export type EnumChatRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatRole'>
    


  /**
   * Reference to a field of type 'ChatRole[]'
   */
  export type ListEnumChatRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatRole[]'>
    


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
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subjects?: SubjectListRelationFilter
    tasks?: TaskListRelationFilter
    resources?: ResourceListRelationFilter
    conversations?: ConversationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjects?: SubjectOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    resources?: ResourceOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subjects?: SubjectListRelationFilter
    tasks?: TaskListRelationFilter
    resources?: ResourceListRelationFilter
    conversations?: ConversationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
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
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: StringFilter<"Subject"> | string
    title?: StringFilter<"Subject"> | string
    description?: StringNullableFilter<"Subject"> | string | null
    color?: StringNullableFilter<"Subject"> | string | null
    isArchived?: BoolFilter<"Subject"> | boolean
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    userId?: StringFilter<"Subject"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    milestones?: MilestoneListRelationFilter
    resources?: ResourceListRelationFilter
    tasks?: TaskListRelationFilter
    conversations?: ConversationListRelationFilter
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    milestones?: MilestoneOrderByRelationAggregateInput
    resources?: ResourceOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    title?: StringFilter<"Subject"> | string
    description?: StringNullableFilter<"Subject"> | string | null
    color?: StringNullableFilter<"Subject"> | string | null
    isArchived?: BoolFilter<"Subject"> | boolean
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    userId?: StringFilter<"Subject"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    milestones?: MilestoneListRelationFilter
    resources?: ResourceListRelationFilter
    tasks?: TaskListRelationFilter
    conversations?: ConversationListRelationFilter
  }, "id">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subject"> | string
    title?: StringWithAggregatesFilter<"Subject"> | string
    description?: StringNullableWithAggregatesFilter<"Subject"> | string | null
    color?: StringNullableWithAggregatesFilter<"Subject"> | string | null
    isArchived?: BoolWithAggregatesFilter<"Subject"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    userId?: StringWithAggregatesFilter<"Subject"> | string
  }

  export type MilestoneWhereInput = {
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    id?: StringFilter<"Milestone"> | string
    title?: StringFilter<"Milestone"> | string
    notes?: StringFilter<"Milestone"> | string
    order?: IntFilter<"Milestone"> | number
    isCompleted?: BoolFilter<"Milestone"> | boolean
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    subjectId?: StringFilter<"Milestone"> | string
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    tasks?: TaskListRelationFilter
  }

  export type MilestoneOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectId?: SortOrder
    subject?: SubjectOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type MilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    title?: StringFilter<"Milestone"> | string
    notes?: StringFilter<"Milestone"> | string
    order?: IntFilter<"Milestone"> | number
    isCompleted?: BoolFilter<"Milestone"> | boolean
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    subjectId?: StringFilter<"Milestone"> | string
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    tasks?: TaskListRelationFilter
  }, "id">

  export type MilestoneOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectId?: SortOrder
    _count?: MilestoneCountOrderByAggregateInput
    _avg?: MilestoneAvgOrderByAggregateInput
    _max?: MilestoneMaxOrderByAggregateInput
    _min?: MilestoneMinOrderByAggregateInput
    _sum?: MilestoneSumOrderByAggregateInput
  }

  export type MilestoneScalarWhereWithAggregatesInput = {
    AND?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    OR?: MilestoneScalarWhereWithAggregatesInput[]
    NOT?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Milestone"> | string
    title?: StringWithAggregatesFilter<"Milestone"> | string
    notes?: StringWithAggregatesFilter<"Milestone"> | string
    order?: IntWithAggregatesFilter<"Milestone"> | number
    isCompleted?: BoolWithAggregatesFilter<"Milestone"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    subjectId?: StringWithAggregatesFilter<"Milestone"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    isCompleted?: BoolFilter<"Task"> | boolean
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: EnumPriorityFilter<"Task"> | $Enums.Priority
    estimatedTime?: IntNullableFilter<"Task"> | number | null
    timeSpent?: IntNullableFilter<"Task"> | number | null
    recurrence?: EnumRecurrenceNullableFilter<"Task"> | $Enums.Recurrence | null
    order?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    userId?: StringFilter<"Task"> | string
    subjectId?: StringFilter<"Task"> | string
    milestoneId?: StringNullableFilter<"Task"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    milestone?: XOR<MilestoneNullableScalarRelationFilter, MilestoneWhereInput> | null
    subtasks?: SubtaskListRelationFilter
    timerSessions?: TimerSessionListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    recurrence?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    milestoneId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    milestone?: MilestoneOrderByWithRelationInput
    subtasks?: SubtaskOrderByRelationAggregateInput
    timerSessions?: TimerSessionOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    isCompleted?: BoolFilter<"Task"> | boolean
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: EnumPriorityFilter<"Task"> | $Enums.Priority
    estimatedTime?: IntNullableFilter<"Task"> | number | null
    timeSpent?: IntNullableFilter<"Task"> | number | null
    recurrence?: EnumRecurrenceNullableFilter<"Task"> | $Enums.Recurrence | null
    order?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    userId?: StringFilter<"Task"> | string
    subjectId?: StringFilter<"Task"> | string
    milestoneId?: StringNullableFilter<"Task"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    milestone?: XOR<MilestoneNullableScalarRelationFilter, MilestoneWhereInput> | null
    subtasks?: SubtaskListRelationFilter
    timerSessions?: TimerSessionListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    recurrence?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    milestoneId?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    isCompleted?: BoolWithAggregatesFilter<"Task"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    priority?: EnumPriorityWithAggregatesFilter<"Task"> | $Enums.Priority
    estimatedTime?: IntNullableWithAggregatesFilter<"Task"> | number | null
    timeSpent?: IntNullableWithAggregatesFilter<"Task"> | number | null
    recurrence?: EnumRecurrenceNullableWithAggregatesFilter<"Task"> | $Enums.Recurrence | null
    order?: IntWithAggregatesFilter<"Task"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    userId?: StringWithAggregatesFilter<"Task"> | string
    subjectId?: StringWithAggregatesFilter<"Task"> | string
    milestoneId?: StringNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type SubtaskWhereInput = {
    AND?: SubtaskWhereInput | SubtaskWhereInput[]
    OR?: SubtaskWhereInput[]
    NOT?: SubtaskWhereInput | SubtaskWhereInput[]
    id?: StringFilter<"Subtask"> | string
    title?: StringFilter<"Subtask"> | string
    notes?: StringFilter<"Subtask"> | string
    isCompleted?: BoolFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    order?: IntFilter<"Subtask"> | number
    createdAt?: DateTimeFilter<"Subtask"> | Date | string
    taskId?: StringFilter<"Subtask"> | string
    parentId?: StringNullableFilter<"Subtask"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    parent?: XOR<SubtaskNullableScalarRelationFilter, SubtaskWhereInput> | null
    children?: SubtaskListRelationFilter
  }

  export type SubtaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    task?: TaskOrderByWithRelationInput
    parent?: SubtaskOrderByWithRelationInput
    children?: SubtaskOrderByRelationAggregateInput
  }

  export type SubtaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubtaskWhereInput | SubtaskWhereInput[]
    OR?: SubtaskWhereInput[]
    NOT?: SubtaskWhereInput | SubtaskWhereInput[]
    title?: StringFilter<"Subtask"> | string
    notes?: StringFilter<"Subtask"> | string
    isCompleted?: BoolFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    order?: IntFilter<"Subtask"> | number
    createdAt?: DateTimeFilter<"Subtask"> | Date | string
    taskId?: StringFilter<"Subtask"> | string
    parentId?: StringNullableFilter<"Subtask"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    parent?: XOR<SubtaskNullableScalarRelationFilter, SubtaskWhereInput> | null
    children?: SubtaskListRelationFilter
  }, "id">

  export type SubtaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: SubtaskCountOrderByAggregateInput
    _avg?: SubtaskAvgOrderByAggregateInput
    _max?: SubtaskMaxOrderByAggregateInput
    _min?: SubtaskMinOrderByAggregateInput
    _sum?: SubtaskSumOrderByAggregateInput
  }

  export type SubtaskScalarWhereWithAggregatesInput = {
    AND?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[]
    OR?: SubtaskScalarWhereWithAggregatesInput[]
    NOT?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subtask"> | string
    title?: StringWithAggregatesFilter<"Subtask"> | string
    notes?: StringWithAggregatesFilter<"Subtask"> | string
    isCompleted?: BoolWithAggregatesFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"Subtask"> | Date | string | null
    order?: IntWithAggregatesFilter<"Subtask"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Subtask"> | Date | string
    taskId?: StringWithAggregatesFilter<"Subtask"> | string
    parentId?: StringNullableWithAggregatesFilter<"Subtask"> | string | null
  }

  export type ResourceWhereInput = {
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    id?: StringFilter<"Resource"> | string
    type?: EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType
    url?: StringFilter<"Resource"> | string
    title?: StringFilter<"Resource"> | string
    note?: StringNullableFilter<"Resource"> | string | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    updatedAt?: DateTimeFilter<"Resource"> | Date | string
    userId?: StringFilter<"Resource"> | string
    subjectId?: StringFilter<"Resource"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }

  export type ResourceOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    user?: UserOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
  }

  export type ResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    type?: EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType
    url?: StringFilter<"Resource"> | string
    title?: StringFilter<"Resource"> | string
    note?: StringNullableFilter<"Resource"> | string | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    updatedAt?: DateTimeFilter<"Resource"> | Date | string
    userId?: StringFilter<"Resource"> | string
    subjectId?: StringFilter<"Resource"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }, "id">

  export type ResourceOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    _count?: ResourceCountOrderByAggregateInput
    _max?: ResourceMaxOrderByAggregateInput
    _min?: ResourceMinOrderByAggregateInput
  }

  export type ResourceScalarWhereWithAggregatesInput = {
    AND?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    OR?: ResourceScalarWhereWithAggregatesInput[]
    NOT?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resource"> | string
    type?: EnumResourceTypeWithAggregatesFilter<"Resource"> | $Enums.ResourceType
    url?: StringWithAggregatesFilter<"Resource"> | string
    title?: StringWithAggregatesFilter<"Resource"> | string
    note?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Resource"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Resource"> | Date | string
    userId?: StringWithAggregatesFilter<"Resource"> | string
    subjectId?: StringWithAggregatesFilter<"Resource"> | string
  }

  export type TimerSessionWhereInput = {
    AND?: TimerSessionWhereInput | TimerSessionWhereInput[]
    OR?: TimerSessionWhereInput[]
    NOT?: TimerSessionWhereInput | TimerSessionWhereInput[]
    id?: StringFilter<"TimerSession"> | string
    startedAt?: DateTimeFilter<"TimerSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"TimerSession"> | Date | string | null
    duration?: IntNullableFilter<"TimerSession"> | number | null
    taskId?: StringFilter<"TimerSession"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type TimerSessionOrderByWithRelationInput = {
    id?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    taskId?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type TimerSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimerSessionWhereInput | TimerSessionWhereInput[]
    OR?: TimerSessionWhereInput[]
    NOT?: TimerSessionWhereInput | TimerSessionWhereInput[]
    startedAt?: DateTimeFilter<"TimerSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"TimerSession"> | Date | string | null
    duration?: IntNullableFilter<"TimerSession"> | number | null
    taskId?: StringFilter<"TimerSession"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type TimerSessionOrderByWithAggregationInput = {
    id?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    taskId?: SortOrder
    _count?: TimerSessionCountOrderByAggregateInput
    _avg?: TimerSessionAvgOrderByAggregateInput
    _max?: TimerSessionMaxOrderByAggregateInput
    _min?: TimerSessionMinOrderByAggregateInput
    _sum?: TimerSessionSumOrderByAggregateInput
  }

  export type TimerSessionScalarWhereWithAggregatesInput = {
    AND?: TimerSessionScalarWhereWithAggregatesInput | TimerSessionScalarWhereWithAggregatesInput[]
    OR?: TimerSessionScalarWhereWithAggregatesInput[]
    NOT?: TimerSessionScalarWhereWithAggregatesInput | TimerSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimerSession"> | string
    startedAt?: DateTimeWithAggregatesFilter<"TimerSession"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"TimerSession"> | Date | string | null
    duration?: IntNullableWithAggregatesFilter<"TimerSession"> | number | null
    taskId?: StringWithAggregatesFilter<"TimerSession"> | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    userId?: StringFilter<"Conversation"> | string
    subjectId?: StringNullableFilter<"Conversation"> | string | null
    contextSubjectIds?: StringNullableListFilter<"Conversation">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subject?: XOR<SubjectNullableScalarRelationFilter, SubjectWhereInput> | null
    messages?: ChatMessageListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    contextSubjectIds?: SortOrder
    user?: UserOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    messages?: ChatMessageOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    title?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    userId?: StringFilter<"Conversation"> | string
    subjectId?: StringNullableFilter<"Conversation"> | string | null
    contextSubjectIds?: StringNullableListFilter<"Conversation">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subject?: XOR<SubjectNullableScalarRelationFilter, SubjectWhereInput> | null
    messages?: ChatMessageListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    contextSubjectIds?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    title?: StringWithAggregatesFilter<"Conversation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    userId?: StringWithAggregatesFilter<"Conversation"> | string
    subjectId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    contextSubjectIds?: StringNullableListFilter<"Conversation">
  }

  export type ChatMessageWhereInput = {
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    id?: StringFilter<"ChatMessage"> | string
    role?: EnumChatRoleFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringFilter<"ChatMessage"> | string
    model?: StringNullableFilter<"ChatMessage"> | string | null
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    conversationId?: StringFilter<"ChatMessage"> | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type ChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    model?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    role?: EnumChatRoleFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringFilter<"ChatMessage"> | string
    model?: StringNullableFilter<"ChatMessage"> | string | null
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    conversationId?: StringFilter<"ChatMessage"> | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id">

  export type ChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    model?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
    _count?: ChatMessageCountOrderByAggregateInput
    _max?: ChatMessageMaxOrderByAggregateInput
    _min?: ChatMessageMinOrderByAggregateInput
  }

  export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    OR?: ChatMessageScalarWhereWithAggregatesInput[]
    NOT?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatMessage"> | string
    role?: EnumChatRoleWithAggregatesFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringWithAggregatesFilter<"ChatMessage"> | string
    model?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
    conversationId?: StringWithAggregatesFilter<"ChatMessage"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    resources?: ResourceCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    resources?: ResourceUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectCreateInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubjectsInput
    milestones?: MilestoneCreateNestedManyWithoutSubjectInput
    resources?: ResourceCreateNestedManyWithoutSubjectInput
    tasks?: TaskCreateNestedManyWithoutSubjectInput
    conversations?: ConversationCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    milestones?: MilestoneUncheckedCreateNestedManyWithoutSubjectInput
    resources?: ResourceUncheckedCreateNestedManyWithoutSubjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutSubjectInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubjectsNestedInput
    milestones?: MilestoneUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    milestones?: MilestoneUncheckedUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type SubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MilestoneCreateInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subject: SubjectCreateNestedOneWithoutMilestonesInput
    tasks?: TaskCreateNestedManyWithoutMilestoneInput
  }

  export type MilestoneUncheckedCreateInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId: string
    tasks?: TaskUncheckedCreateNestedManyWithoutMilestoneInput
  }

  export type MilestoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutMilestonesNestedInput
    tasks?: TaskUpdateManyWithoutMilestoneNestedInput
  }

  export type MilestoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutMilestoneNestedInput
  }

  export type MilestoneCreateManyInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId: string
  }

  export type MilestoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
    subject: SubjectCreateNestedOneWithoutTasksInput
    milestone?: MilestoneCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    subjectId: string
    milestoneId?: string | null
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    subject?: SubjectUpdateOneRequiredWithoutTasksNestedInput
    milestone?: MilestoneUpdateOneWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    subjectId: string
    milestoneId?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubtaskCreateInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutSubtasksInput
    parent?: SubtaskCreateNestedOneWithoutChildrenInput
    children?: SubtaskCreateNestedManyWithoutParentInput
  }

  export type SubtaskUncheckedCreateInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    taskId: string
    parentId?: string | null
    children?: SubtaskUncheckedCreateNestedManyWithoutParentInput
  }

  export type SubtaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
    parent?: SubtaskUpdateOneWithoutChildrenNestedInput
    children?: SubtaskUpdateManyWithoutParentNestedInput
  }

  export type SubtaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: SubtaskUncheckedUpdateManyWithoutParentNestedInput
  }

  export type SubtaskCreateManyInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    taskId: string
    parentId?: string | null
  }

  export type SubtaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubtaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceCreateInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutResourcesInput
    subject: SubjectCreateNestedOneWithoutResourcesInput
  }

  export type ResourceUncheckedCreateInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    subjectId: string
  }

  export type ResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResourcesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutResourcesNestedInput
  }

  export type ResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type ResourceCreateManyInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    subjectId: string
  }

  export type ResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type TimerSessionCreateInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    task: TaskCreateNestedOneWithoutTimerSessionsInput
  }

  export type TimerSessionUncheckedCreateInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    taskId: string
  }

  export type TimerSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    task?: TaskUpdateOneRequiredWithoutTimerSessionsNestedInput
  }

  export type TimerSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type TimerSessionCreateManyInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    taskId: string
  }

  export type TimerSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TimerSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ConversationCreateInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
    user: UserCreateNestedOneWithoutConversationsInput
    subject?: SubjectCreateNestedOneWithoutConversationsInput
    messages?: ChatMessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    subjectId?: string | null
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
    messages?: ChatMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    subject?: SubjectUpdateOneWithoutConversationsNestedInput
    messages?: ChatMessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
    messages?: ChatMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    subjectId?: string | null
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
  }

  export type ChatMessageCreateInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    model?: string | null
    createdAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type ChatMessageUncheckedCreateInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    model?: string | null
    createdAt?: Date | string
    conversationId: string
  }

  export type ChatMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageCreateManyInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    model?: string | null
    createdAt?: Date | string
    conversationId: string
  }

  export type ChatMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationId?: StringFieldUpdateOperationsInput | string
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

  export type SubjectListRelationFilter = {
    every?: SubjectWhereInput
    some?: SubjectWhereInput
    none?: SubjectWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type ResourceListRelationFilter = {
    every?: ResourceWhereInput
    some?: ResourceWhereInput
    none?: ResourceWhereInput
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SubjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MilestoneListRelationFilter = {
    every?: MilestoneWhereInput
    some?: MilestoneWhereInput
    none?: MilestoneWhereInput
  }

  export type MilestoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type SubjectScalarRelationFilter = {
    is?: SubjectWhereInput
    isNot?: SubjectWhereInput
  }

  export type MilestoneCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectId?: SortOrder
  }

  export type MilestoneAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MilestoneMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectId?: SortOrder
  }

  export type MilestoneMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjectId?: SortOrder
  }

  export type MilestoneSumOrderByAggregateInput = {
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

  export type EnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
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

  export type EnumRecurrenceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | EnumRecurrenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecurrenceNullableFilter<$PrismaModel> | $Enums.Recurrence | null
  }

  export type MilestoneNullableScalarRelationFilter = {
    is?: MilestoneWhereInput | null
    isNot?: MilestoneWhereInput | null
  }

  export type SubtaskListRelationFilter = {
    every?: SubtaskWhereInput
    some?: SubtaskWhereInput
    none?: SubtaskWhereInput
  }

  export type TimerSessionListRelationFilter = {
    every?: TimerSessionWhereInput
    some?: TimerSessionWhereInput
    none?: TimerSessionWhereInput
  }

  export type SubtaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimerSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    timeSpent?: SortOrder
    recurrence?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    milestoneId?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    estimatedTime?: SortOrder
    timeSpent?: SortOrder
    order?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    timeSpent?: SortOrder
    recurrence?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    milestoneId?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    timeSpent?: SortOrder
    recurrence?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    milestoneId?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    estimatedTime?: SortOrder
    timeSpent?: SortOrder
    order?: SortOrder
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

  export type EnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
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

  export type EnumRecurrenceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | EnumRecurrenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecurrenceNullableWithAggregatesFilter<$PrismaModel> | $Enums.Recurrence | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRecurrenceNullableFilter<$PrismaModel>
    _max?: NestedEnumRecurrenceNullableFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type SubtaskNullableScalarRelationFilter = {
    is?: SubtaskWhereInput | null
    isNot?: SubtaskWhereInput | null
  }

  export type SubtaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    parentId?: SortOrder
  }

  export type SubtaskAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type SubtaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    parentId?: SortOrder
  }

  export type SubtaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    parentId?: SortOrder
  }

  export type SubtaskSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type EnumResourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceTypeFilter<$PrismaModel> | $Enums.ResourceType
  }

  export type ResourceCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
  }

  export type ResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
  }

  export type ResourceMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
  }

  export type EnumResourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ResourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResourceTypeFilter<$PrismaModel>
    _max?: NestedEnumResourceTypeFilter<$PrismaModel>
  }

  export type TimerSessionCountOrderByAggregateInput = {
    id?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    duration?: SortOrder
    taskId?: SortOrder
  }

  export type TimerSessionAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type TimerSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    duration?: SortOrder
    taskId?: SortOrder
  }

  export type TimerSessionMinOrderByAggregateInput = {
    id?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    duration?: SortOrder
    taskId?: SortOrder
  }

  export type TimerSessionSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SubjectNullableScalarRelationFilter = {
    is?: SubjectWhereInput | null
    isNot?: SubjectWhereInput | null
  }

  export type ChatMessageListRelationFilter = {
    every?: ChatMessageWhereInput
    some?: ChatMessageWhereInput
    none?: ChatMessageWhereInput
  }

  export type ChatMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
    contextSubjectIds?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectId?: SortOrder
  }

  export type EnumChatRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleFilter<$PrismaModel> | $Enums.ChatRole
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type ChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type ChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type ChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    conversationId?: SortOrder
  }

  export type EnumChatRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatRoleFilter<$PrismaModel>
    _max?: NestedEnumChatRoleFilter<$PrismaModel>
  }

  export type SubjectCreateNestedManyWithoutUserInput = {
    create?: XOR<SubjectCreateWithoutUserInput, SubjectUncheckedCreateWithoutUserInput> | SubjectCreateWithoutUserInput[] | SubjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutUserInput | SubjectCreateOrConnectWithoutUserInput[]
    createMany?: SubjectCreateManyUserInputEnvelope
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ResourceCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type SubjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubjectCreateWithoutUserInput, SubjectUncheckedCreateWithoutUserInput> | SubjectCreateWithoutUserInput[] | SubjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutUserInput | SubjectCreateOrConnectWithoutUserInput[]
    createMany?: SubjectCreateManyUserInputEnvelope
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ResourceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SubjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubjectCreateWithoutUserInput, SubjectUncheckedCreateWithoutUserInput> | SubjectCreateWithoutUserInput[] | SubjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutUserInput | SubjectCreateOrConnectWithoutUserInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutUserInput | SubjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubjectCreateManyUserInputEnvelope
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutUserInput | SubjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutUserInput | SubjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ResourceUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutUserInput | ResourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutUserInput | ResourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutUserInput | ResourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type SubjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubjectCreateWithoutUserInput, SubjectUncheckedCreateWithoutUserInput> | SubjectCreateWithoutUserInput[] | SubjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutUserInput | SubjectCreateOrConnectWithoutUserInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutUserInput | SubjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubjectCreateManyUserInputEnvelope
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutUserInput | SubjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutUserInput | SubjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ResourceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutUserInput | ResourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutUserInput | ResourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutUserInput | ResourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubjectsInput = {
    create?: XOR<UserCreateWithoutSubjectsInput, UserUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubjectsInput
    connect?: UserWhereUniqueInput
  }

  export type MilestoneCreateNestedManyWithoutSubjectInput = {
    create?: XOR<MilestoneCreateWithoutSubjectInput, MilestoneUncheckedCreateWithoutSubjectInput> | MilestoneCreateWithoutSubjectInput[] | MilestoneUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutSubjectInput | MilestoneCreateOrConnectWithoutSubjectInput[]
    createMany?: MilestoneCreateManySubjectInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type ResourceCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ResourceCreateWithoutSubjectInput, ResourceUncheckedCreateWithoutSubjectInput> | ResourceCreateWithoutSubjectInput[] | ResourceUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutSubjectInput | ResourceCreateOrConnectWithoutSubjectInput[]
    createMany?: ResourceCreateManySubjectInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutSubjectInput = {
    create?: XOR<TaskCreateWithoutSubjectInput, TaskUncheckedCreateWithoutSubjectInput> | TaskCreateWithoutSubjectInput[] | TaskUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSubjectInput | TaskCreateOrConnectWithoutSubjectInput[]
    createMany?: TaskCreateManySubjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ConversationCreateWithoutSubjectInput, ConversationUncheckedCreateWithoutSubjectInput> | ConversationCreateWithoutSubjectInput[] | ConversationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutSubjectInput | ConversationCreateOrConnectWithoutSubjectInput[]
    createMany?: ConversationCreateManySubjectInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type MilestoneUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<MilestoneCreateWithoutSubjectInput, MilestoneUncheckedCreateWithoutSubjectInput> | MilestoneCreateWithoutSubjectInput[] | MilestoneUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutSubjectInput | MilestoneCreateOrConnectWithoutSubjectInput[]
    createMany?: MilestoneCreateManySubjectInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type ResourceUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ResourceCreateWithoutSubjectInput, ResourceUncheckedCreateWithoutSubjectInput> | ResourceCreateWithoutSubjectInput[] | ResourceUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutSubjectInput | ResourceCreateOrConnectWithoutSubjectInput[]
    createMany?: ResourceCreateManySubjectInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<TaskCreateWithoutSubjectInput, TaskUncheckedCreateWithoutSubjectInput> | TaskCreateWithoutSubjectInput[] | TaskUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSubjectInput | TaskCreateOrConnectWithoutSubjectInput[]
    createMany?: TaskCreateManySubjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ConversationCreateWithoutSubjectInput, ConversationUncheckedCreateWithoutSubjectInput> | ConversationCreateWithoutSubjectInput[] | ConversationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutSubjectInput | ConversationCreateOrConnectWithoutSubjectInput[]
    createMany?: ConversationCreateManySubjectInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutSubjectsNestedInput = {
    create?: XOR<UserCreateWithoutSubjectsInput, UserUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubjectsInput
    upsert?: UserUpsertWithoutSubjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubjectsInput, UserUpdateWithoutSubjectsInput>, UserUncheckedUpdateWithoutSubjectsInput>
  }

  export type MilestoneUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<MilestoneCreateWithoutSubjectInput, MilestoneUncheckedCreateWithoutSubjectInput> | MilestoneCreateWithoutSubjectInput[] | MilestoneUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutSubjectInput | MilestoneCreateOrConnectWithoutSubjectInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutSubjectInput | MilestoneUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: MilestoneCreateManySubjectInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutSubjectInput | MilestoneUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutSubjectInput | MilestoneUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type ResourceUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ResourceCreateWithoutSubjectInput, ResourceUncheckedCreateWithoutSubjectInput> | ResourceCreateWithoutSubjectInput[] | ResourceUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutSubjectInput | ResourceCreateOrConnectWithoutSubjectInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutSubjectInput | ResourceUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ResourceCreateManySubjectInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutSubjectInput | ResourceUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutSubjectInput | ResourceUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<TaskCreateWithoutSubjectInput, TaskUncheckedCreateWithoutSubjectInput> | TaskCreateWithoutSubjectInput[] | TaskUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSubjectInput | TaskCreateOrConnectWithoutSubjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutSubjectInput | TaskUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: TaskCreateManySubjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutSubjectInput | TaskUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutSubjectInput | TaskUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ConversationCreateWithoutSubjectInput, ConversationUncheckedCreateWithoutSubjectInput> | ConversationCreateWithoutSubjectInput[] | ConversationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutSubjectInput | ConversationCreateOrConnectWithoutSubjectInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutSubjectInput | ConversationUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ConversationCreateManySubjectInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutSubjectInput | ConversationUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutSubjectInput | ConversationUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type MilestoneUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<MilestoneCreateWithoutSubjectInput, MilestoneUncheckedCreateWithoutSubjectInput> | MilestoneCreateWithoutSubjectInput[] | MilestoneUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutSubjectInput | MilestoneCreateOrConnectWithoutSubjectInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutSubjectInput | MilestoneUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: MilestoneCreateManySubjectInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutSubjectInput | MilestoneUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutSubjectInput | MilestoneUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type ResourceUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ResourceCreateWithoutSubjectInput, ResourceUncheckedCreateWithoutSubjectInput> | ResourceCreateWithoutSubjectInput[] | ResourceUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutSubjectInput | ResourceCreateOrConnectWithoutSubjectInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutSubjectInput | ResourceUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ResourceCreateManySubjectInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutSubjectInput | ResourceUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutSubjectInput | ResourceUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<TaskCreateWithoutSubjectInput, TaskUncheckedCreateWithoutSubjectInput> | TaskCreateWithoutSubjectInput[] | TaskUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSubjectInput | TaskCreateOrConnectWithoutSubjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutSubjectInput | TaskUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: TaskCreateManySubjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutSubjectInput | TaskUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutSubjectInput | TaskUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ConversationCreateWithoutSubjectInput, ConversationUncheckedCreateWithoutSubjectInput> | ConversationCreateWithoutSubjectInput[] | ConversationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutSubjectInput | ConversationCreateOrConnectWithoutSubjectInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutSubjectInput | ConversationUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ConversationCreateManySubjectInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutSubjectInput | ConversationUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutSubjectInput | ConversationUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type SubjectCreateNestedOneWithoutMilestonesInput = {
    create?: XOR<SubjectCreateWithoutMilestonesInput, SubjectUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutMilestonesInput
    connect?: SubjectWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutMilestoneInput = {
    create?: XOR<TaskCreateWithoutMilestoneInput, TaskUncheckedCreateWithoutMilestoneInput> | TaskCreateWithoutMilestoneInput[] | TaskUncheckedCreateWithoutMilestoneInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutMilestoneInput | TaskCreateOrConnectWithoutMilestoneInput[]
    createMany?: TaskCreateManyMilestoneInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutMilestoneInput = {
    create?: XOR<TaskCreateWithoutMilestoneInput, TaskUncheckedCreateWithoutMilestoneInput> | TaskCreateWithoutMilestoneInput[] | TaskUncheckedCreateWithoutMilestoneInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutMilestoneInput | TaskCreateOrConnectWithoutMilestoneInput[]
    createMany?: TaskCreateManyMilestoneInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubjectUpdateOneRequiredWithoutMilestonesNestedInput = {
    create?: XOR<SubjectCreateWithoutMilestonesInput, SubjectUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutMilestonesInput
    upsert?: SubjectUpsertWithoutMilestonesInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutMilestonesInput, SubjectUpdateWithoutMilestonesInput>, SubjectUncheckedUpdateWithoutMilestonesInput>
  }

  export type TaskUpdateManyWithoutMilestoneNestedInput = {
    create?: XOR<TaskCreateWithoutMilestoneInput, TaskUncheckedCreateWithoutMilestoneInput> | TaskCreateWithoutMilestoneInput[] | TaskUncheckedCreateWithoutMilestoneInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutMilestoneInput | TaskCreateOrConnectWithoutMilestoneInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutMilestoneInput | TaskUpsertWithWhereUniqueWithoutMilestoneInput[]
    createMany?: TaskCreateManyMilestoneInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutMilestoneInput | TaskUpdateWithWhereUniqueWithoutMilestoneInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutMilestoneInput | TaskUpdateManyWithWhereWithoutMilestoneInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutMilestoneNestedInput = {
    create?: XOR<TaskCreateWithoutMilestoneInput, TaskUncheckedCreateWithoutMilestoneInput> | TaskCreateWithoutMilestoneInput[] | TaskUncheckedCreateWithoutMilestoneInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutMilestoneInput | TaskCreateOrConnectWithoutMilestoneInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutMilestoneInput | TaskUpsertWithWhereUniqueWithoutMilestoneInput[]
    createMany?: TaskCreateManyMilestoneInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutMilestoneInput | TaskUpdateWithWhereUniqueWithoutMilestoneInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutMilestoneInput | TaskUpdateManyWithWhereWithoutMilestoneInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutTasksInput = {
    create?: XOR<SubjectCreateWithoutTasksInput, SubjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutTasksInput
    connect?: SubjectWhereUniqueInput
  }

  export type MilestoneCreateNestedOneWithoutTasksInput = {
    create?: XOR<MilestoneCreateWithoutTasksInput, MilestoneUncheckedCreateWithoutTasksInput>
    connectOrCreate?: MilestoneCreateOrConnectWithoutTasksInput
    connect?: MilestoneWhereUniqueInput
  }

  export type SubtaskCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type TimerSessionCreateNestedManyWithoutTaskInput = {
    create?: XOR<TimerSessionCreateWithoutTaskInput, TimerSessionUncheckedCreateWithoutTaskInput> | TimerSessionCreateWithoutTaskInput[] | TimerSessionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimerSessionCreateOrConnectWithoutTaskInput | TimerSessionCreateOrConnectWithoutTaskInput[]
    createMany?: TimerSessionCreateManyTaskInputEnvelope
    connect?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
  }

  export type SubtaskUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type TimerSessionUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TimerSessionCreateWithoutTaskInput, TimerSessionUncheckedCreateWithoutTaskInput> | TimerSessionCreateWithoutTaskInput[] | TimerSessionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimerSessionCreateOrConnectWithoutTaskInput | TimerSessionCreateOrConnectWithoutTaskInput[]
    createMany?: TimerSessionCreateManyTaskInputEnvelope
    connect?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumRecurrenceFieldUpdateOperationsInput = {
    set?: $Enums.Recurrence | null
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type SubjectUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<SubjectCreateWithoutTasksInput, SubjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutTasksInput
    upsert?: SubjectUpsertWithoutTasksInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutTasksInput, SubjectUpdateWithoutTasksInput>, SubjectUncheckedUpdateWithoutTasksInput>
  }

  export type MilestoneUpdateOneWithoutTasksNestedInput = {
    create?: XOR<MilestoneCreateWithoutTasksInput, MilestoneUncheckedCreateWithoutTasksInput>
    connectOrCreate?: MilestoneCreateOrConnectWithoutTasksInput
    upsert?: MilestoneUpsertWithoutTasksInput
    disconnect?: MilestoneWhereInput | boolean
    delete?: MilestoneWhereInput | boolean
    connect?: MilestoneWhereUniqueInput
    update?: XOR<XOR<MilestoneUpdateToOneWithWhereWithoutTasksInput, MilestoneUpdateWithoutTasksInput>, MilestoneUncheckedUpdateWithoutTasksInput>
  }

  export type SubtaskUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type TimerSessionUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TimerSessionCreateWithoutTaskInput, TimerSessionUncheckedCreateWithoutTaskInput> | TimerSessionCreateWithoutTaskInput[] | TimerSessionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimerSessionCreateOrConnectWithoutTaskInput | TimerSessionCreateOrConnectWithoutTaskInput[]
    upsert?: TimerSessionUpsertWithWhereUniqueWithoutTaskInput | TimerSessionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TimerSessionCreateManyTaskInputEnvelope
    set?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    disconnect?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    delete?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    connect?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    update?: TimerSessionUpdateWithWhereUniqueWithoutTaskInput | TimerSessionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TimerSessionUpdateManyWithWhereWithoutTaskInput | TimerSessionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TimerSessionScalarWhereInput | TimerSessionScalarWhereInput[]
  }

  export type SubtaskUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type TimerSessionUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TimerSessionCreateWithoutTaskInput, TimerSessionUncheckedCreateWithoutTaskInput> | TimerSessionCreateWithoutTaskInput[] | TimerSessionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimerSessionCreateOrConnectWithoutTaskInput | TimerSessionCreateOrConnectWithoutTaskInput[]
    upsert?: TimerSessionUpsertWithWhereUniqueWithoutTaskInput | TimerSessionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TimerSessionCreateManyTaskInputEnvelope
    set?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    disconnect?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    delete?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    connect?: TimerSessionWhereUniqueInput | TimerSessionWhereUniqueInput[]
    update?: TimerSessionUpdateWithWhereUniqueWithoutTaskInput | TimerSessionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TimerSessionUpdateManyWithWhereWithoutTaskInput | TimerSessionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TimerSessionScalarWhereInput | TimerSessionScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutSubtasksInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    connect?: TaskWhereUniqueInput
  }

  export type SubtaskCreateNestedOneWithoutChildrenInput = {
    create?: XOR<SubtaskCreateWithoutChildrenInput, SubtaskUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SubtaskCreateOrConnectWithoutChildrenInput
    connect?: SubtaskWhereUniqueInput
  }

  export type SubtaskCreateNestedManyWithoutParentInput = {
    create?: XOR<SubtaskCreateWithoutParentInput, SubtaskUncheckedCreateWithoutParentInput> | SubtaskCreateWithoutParentInput[] | SubtaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutParentInput | SubtaskCreateOrConnectWithoutParentInput[]
    createMany?: SubtaskCreateManyParentInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type SubtaskUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<SubtaskCreateWithoutParentInput, SubtaskUncheckedCreateWithoutParentInput> | SubtaskCreateWithoutParentInput[] | SubtaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutParentInput | SubtaskCreateOrConnectWithoutParentInput[]
    createMany?: SubtaskCreateManyParentInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type TaskUpdateOneRequiredWithoutSubtasksNestedInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    upsert?: TaskUpsertWithoutSubtasksInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutSubtasksInput, TaskUpdateWithoutSubtasksInput>, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type SubtaskUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<SubtaskCreateWithoutChildrenInput, SubtaskUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SubtaskCreateOrConnectWithoutChildrenInput
    upsert?: SubtaskUpsertWithoutChildrenInput
    disconnect?: SubtaskWhereInput | boolean
    delete?: SubtaskWhereInput | boolean
    connect?: SubtaskWhereUniqueInput
    update?: XOR<XOR<SubtaskUpdateToOneWithWhereWithoutChildrenInput, SubtaskUpdateWithoutChildrenInput>, SubtaskUncheckedUpdateWithoutChildrenInput>
  }

  export type SubtaskUpdateManyWithoutParentNestedInput = {
    create?: XOR<SubtaskCreateWithoutParentInput, SubtaskUncheckedCreateWithoutParentInput> | SubtaskCreateWithoutParentInput[] | SubtaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutParentInput | SubtaskCreateOrConnectWithoutParentInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutParentInput | SubtaskUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: SubtaskCreateManyParentInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutParentInput | SubtaskUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutParentInput | SubtaskUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type SubtaskUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<SubtaskCreateWithoutParentInput, SubtaskUncheckedCreateWithoutParentInput> | SubtaskCreateWithoutParentInput[] | SubtaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutParentInput | SubtaskCreateOrConnectWithoutParentInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutParentInput | SubtaskUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: SubtaskCreateManyParentInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutParentInput | SubtaskUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutParentInput | SubtaskUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResourcesInput = {
    create?: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourcesInput
    connect?: UserWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutResourcesInput = {
    create?: XOR<SubjectCreateWithoutResourcesInput, SubjectUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutResourcesInput
    connect?: SubjectWhereUniqueInput
  }

  export type EnumResourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ResourceType
  }

  export type UserUpdateOneRequiredWithoutResourcesNestedInput = {
    create?: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourcesInput
    upsert?: UserUpsertWithoutResourcesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResourcesInput, UserUpdateWithoutResourcesInput>, UserUncheckedUpdateWithoutResourcesInput>
  }

  export type SubjectUpdateOneRequiredWithoutResourcesNestedInput = {
    create?: XOR<SubjectCreateWithoutResourcesInput, SubjectUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutResourcesInput
    upsert?: SubjectUpsertWithoutResourcesInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutResourcesInput, SubjectUpdateWithoutResourcesInput>, SubjectUncheckedUpdateWithoutResourcesInput>
  }

  export type TaskCreateNestedOneWithoutTimerSessionsInput = {
    create?: XOR<TaskCreateWithoutTimerSessionsInput, TaskUncheckedCreateWithoutTimerSessionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTimerSessionsInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutTimerSessionsNestedInput = {
    create?: XOR<TaskCreateWithoutTimerSessionsInput, TaskUncheckedCreateWithoutTimerSessionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTimerSessionsInput
    upsert?: TaskUpsertWithoutTimerSessionsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutTimerSessionsInput, TaskUpdateWithoutTimerSessionsInput>, TaskUncheckedUpdateWithoutTimerSessionsInput>
  }

  export type ConversationCreatecontextSubjectIdsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutConversationsInput = {
    create?: XOR<SubjectCreateWithoutConversationsInput, SubjectUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutConversationsInput
    connect?: SubjectWhereUniqueInput
  }

  export type ChatMessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<ChatMessageCreateWithoutConversationInput, ChatMessageUncheckedCreateWithoutConversationInput> | ChatMessageCreateWithoutConversationInput[] | ChatMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutConversationInput | ChatMessageCreateOrConnectWithoutConversationInput[]
    createMany?: ChatMessageCreateManyConversationInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<ChatMessageCreateWithoutConversationInput, ChatMessageUncheckedCreateWithoutConversationInput> | ChatMessageCreateWithoutConversationInput[] | ChatMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutConversationInput | ChatMessageCreateOrConnectWithoutConversationInput[]
    createMany?: ChatMessageCreateManyConversationInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ConversationUpdatecontextSubjectIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type SubjectUpdateOneWithoutConversationsNestedInput = {
    create?: XOR<SubjectCreateWithoutConversationsInput, SubjectUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutConversationsInput
    upsert?: SubjectUpsertWithoutConversationsInput
    disconnect?: SubjectWhereInput | boolean
    delete?: SubjectWhereInput | boolean
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutConversationsInput, SubjectUpdateWithoutConversationsInput>, SubjectUncheckedUpdateWithoutConversationsInput>
  }

  export type ChatMessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<ChatMessageCreateWithoutConversationInput, ChatMessageUncheckedCreateWithoutConversationInput> | ChatMessageCreateWithoutConversationInput[] | ChatMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutConversationInput | ChatMessageCreateOrConnectWithoutConversationInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutConversationInput | ChatMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: ChatMessageCreateManyConversationInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutConversationInput | ChatMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutConversationInput | ChatMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ChatMessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<ChatMessageCreateWithoutConversationInput, ChatMessageUncheckedCreateWithoutConversationInput> | ChatMessageCreateWithoutConversationInput[] | ChatMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutConversationInput | ChatMessageCreateOrConnectWithoutConversationInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutConversationInput | ChatMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: ChatMessageCreateManyConversationInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutConversationInput | ChatMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutConversationInput | ChatMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type EnumChatRoleFieldUpdateOperationsInput = {
    set?: $Enums.ChatRole
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type NestedEnumRecurrenceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | EnumRecurrenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecurrenceNullableFilter<$PrismaModel> | $Enums.Recurrence | null
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

  export type NestedEnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
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

  export type NestedEnumRecurrenceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | EnumRecurrenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Recurrence[] | ListEnumRecurrenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecurrenceNullableWithAggregatesFilter<$PrismaModel> | $Enums.Recurrence | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRecurrenceNullableFilter<$PrismaModel>
    _max?: NestedEnumRecurrenceNullableFilter<$PrismaModel>
  }

  export type NestedEnumResourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceTypeFilter<$PrismaModel> | $Enums.ResourceType
  }

  export type NestedEnumResourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ResourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResourceTypeFilter<$PrismaModel>
    _max?: NestedEnumResourceTypeFilter<$PrismaModel>
  }

  export type NestedEnumChatRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleFilter<$PrismaModel> | $Enums.ChatRole
  }

  export type NestedEnumChatRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatRoleFilter<$PrismaModel>
    _max?: NestedEnumChatRoleFilter<$PrismaModel>
  }

  export type SubjectCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    milestones?: MilestoneCreateNestedManyWithoutSubjectInput
    resources?: ResourceCreateNestedManyWithoutSubjectInput
    tasks?: TaskCreateNestedManyWithoutSubjectInput
    conversations?: ConversationCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    milestones?: MilestoneUncheckedCreateNestedManyWithoutSubjectInput
    resources?: ResourceUncheckedCreateNestedManyWithoutSubjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutSubjectInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutUserInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutUserInput, SubjectUncheckedCreateWithoutUserInput>
  }

  export type SubjectCreateManyUserInputEnvelope = {
    data: SubjectCreateManyUserInput | SubjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    subject: SubjectCreateNestedOneWithoutTasksInput
    milestone?: MilestoneCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    subjectId: string
    milestoneId?: string | null
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResourceCreateWithoutUserInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subject: SubjectCreateNestedOneWithoutResourcesInput
  }

  export type ResourceUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId: string
  }

  export type ResourceCreateOrConnectWithoutUserInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput>
  }

  export type ResourceCreateManyUserInputEnvelope = {
    data: ResourceCreateManyUserInput | ResourceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
    subject?: SubjectCreateNestedOneWithoutConversationsInput
    messages?: ChatMessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId?: string | null
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
    messages?: ChatMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: ConversationCreateManyUserInput | ConversationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubjectUpsertWithWhereUniqueWithoutUserInput = {
    where: SubjectWhereUniqueInput
    update: XOR<SubjectUpdateWithoutUserInput, SubjectUncheckedUpdateWithoutUserInput>
    create: XOR<SubjectCreateWithoutUserInput, SubjectUncheckedCreateWithoutUserInput>
  }

  export type SubjectUpdateWithWhereUniqueWithoutUserInput = {
    where: SubjectWhereUniqueInput
    data: XOR<SubjectUpdateWithoutUserInput, SubjectUncheckedUpdateWithoutUserInput>
  }

  export type SubjectUpdateManyWithWhereWithoutUserInput = {
    where: SubjectScalarWhereInput
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyWithoutUserInput>
  }

  export type SubjectScalarWhereInput = {
    AND?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    OR?: SubjectScalarWhereInput[]
    NOT?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    id?: StringFilter<"Subject"> | string
    title?: StringFilter<"Subject"> | string
    description?: StringNullableFilter<"Subject"> | string | null
    color?: StringNullableFilter<"Subject"> | string | null
    isArchived?: BoolFilter<"Subject"> | boolean
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    userId?: StringFilter<"Subject"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    isCompleted?: BoolFilter<"Task"> | boolean
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    priority?: EnumPriorityFilter<"Task"> | $Enums.Priority
    estimatedTime?: IntNullableFilter<"Task"> | number | null
    timeSpent?: IntNullableFilter<"Task"> | number | null
    recurrence?: EnumRecurrenceNullableFilter<"Task"> | $Enums.Recurrence | null
    order?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    userId?: StringFilter<"Task"> | string
    subjectId?: StringFilter<"Task"> | string
    milestoneId?: StringNullableFilter<"Task"> | string | null
  }

  export type ResourceUpsertWithWhereUniqueWithoutUserInput = {
    where: ResourceWhereUniqueInput
    update: XOR<ResourceUpdateWithoutUserInput, ResourceUncheckedUpdateWithoutUserInput>
    create: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput>
  }

  export type ResourceUpdateWithWhereUniqueWithoutUserInput = {
    where: ResourceWhereUniqueInput
    data: XOR<ResourceUpdateWithoutUserInput, ResourceUncheckedUpdateWithoutUserInput>
  }

  export type ResourceUpdateManyWithWhereWithoutUserInput = {
    where: ResourceScalarWhereInput
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyWithoutUserInput>
  }

  export type ResourceScalarWhereInput = {
    AND?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    OR?: ResourceScalarWhereInput[]
    NOT?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    id?: StringFilter<"Resource"> | string
    type?: EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType
    url?: StringFilter<"Resource"> | string
    title?: StringFilter<"Resource"> | string
    note?: StringNullableFilter<"Resource"> | string | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    updatedAt?: DateTimeFilter<"Resource"> | Date | string
    userId?: StringFilter<"Resource"> | string
    subjectId?: StringFilter<"Resource"> | string
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    userId?: StringFilter<"Conversation"> | string
    subjectId?: StringNullableFilter<"Conversation"> | string | null
    contextSubjectIds?: StringNullableListFilter<"Conversation">
  }

  export type UserCreateWithoutSubjectsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutUserInput
    resources?: ResourceCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubjectsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubjectsInput, UserUncheckedCreateWithoutSubjectsInput>
  }

  export type MilestoneCreateWithoutSubjectInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutMilestoneInput
  }

  export type MilestoneUncheckedCreateWithoutSubjectInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutMilestoneInput
  }

  export type MilestoneCreateOrConnectWithoutSubjectInput = {
    where: MilestoneWhereUniqueInput
    create: XOR<MilestoneCreateWithoutSubjectInput, MilestoneUncheckedCreateWithoutSubjectInput>
  }

  export type MilestoneCreateManySubjectInputEnvelope = {
    data: MilestoneCreateManySubjectInput | MilestoneCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type ResourceCreateWithoutSubjectInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutResourcesInput
  }

  export type ResourceUncheckedCreateWithoutSubjectInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ResourceCreateOrConnectWithoutSubjectInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutSubjectInput, ResourceUncheckedCreateWithoutSubjectInput>
  }

  export type ResourceCreateManySubjectInputEnvelope = {
    data: ResourceCreateManySubjectInput | ResourceCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutSubjectInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
    milestone?: MilestoneCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutSubjectInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    milestoneId?: string | null
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutSubjectInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubjectInput, TaskUncheckedCreateWithoutSubjectInput>
  }

  export type TaskCreateManySubjectInputEnvelope = {
    data: TaskCreateManySubjectInput | TaskCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutSubjectInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: ChatMessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutSubjectInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
    messages?: ChatMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutSubjectInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutSubjectInput, ConversationUncheckedCreateWithoutSubjectInput>
  }

  export type ConversationCreateManySubjectInputEnvelope = {
    data: ConversationCreateManySubjectInput | ConversationCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSubjectsInput = {
    update: XOR<UserUpdateWithoutSubjectsInput, UserUncheckedUpdateWithoutSubjectsInput>
    create: XOR<UserCreateWithoutSubjectsInput, UserUncheckedCreateWithoutSubjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubjectsInput, UserUncheckedUpdateWithoutSubjectsInput>
  }

  export type UserUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    resources?: ResourceUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MilestoneUpsertWithWhereUniqueWithoutSubjectInput = {
    where: MilestoneWhereUniqueInput
    update: XOR<MilestoneUpdateWithoutSubjectInput, MilestoneUncheckedUpdateWithoutSubjectInput>
    create: XOR<MilestoneCreateWithoutSubjectInput, MilestoneUncheckedCreateWithoutSubjectInput>
  }

  export type MilestoneUpdateWithWhereUniqueWithoutSubjectInput = {
    where: MilestoneWhereUniqueInput
    data: XOR<MilestoneUpdateWithoutSubjectInput, MilestoneUncheckedUpdateWithoutSubjectInput>
  }

  export type MilestoneUpdateManyWithWhereWithoutSubjectInput = {
    where: MilestoneScalarWhereInput
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyWithoutSubjectInput>
  }

  export type MilestoneScalarWhereInput = {
    AND?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    OR?: MilestoneScalarWhereInput[]
    NOT?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    id?: StringFilter<"Milestone"> | string
    title?: StringFilter<"Milestone"> | string
    notes?: StringFilter<"Milestone"> | string
    order?: IntFilter<"Milestone"> | number
    isCompleted?: BoolFilter<"Milestone"> | boolean
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    subjectId?: StringFilter<"Milestone"> | string
  }

  export type ResourceUpsertWithWhereUniqueWithoutSubjectInput = {
    where: ResourceWhereUniqueInput
    update: XOR<ResourceUpdateWithoutSubjectInput, ResourceUncheckedUpdateWithoutSubjectInput>
    create: XOR<ResourceCreateWithoutSubjectInput, ResourceUncheckedCreateWithoutSubjectInput>
  }

  export type ResourceUpdateWithWhereUniqueWithoutSubjectInput = {
    where: ResourceWhereUniqueInput
    data: XOR<ResourceUpdateWithoutSubjectInput, ResourceUncheckedUpdateWithoutSubjectInput>
  }

  export type ResourceUpdateManyWithWhereWithoutSubjectInput = {
    where: ResourceScalarWhereInput
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyWithoutSubjectInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutSubjectInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutSubjectInput, TaskUncheckedUpdateWithoutSubjectInput>
    create: XOR<TaskCreateWithoutSubjectInput, TaskUncheckedCreateWithoutSubjectInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutSubjectInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutSubjectInput, TaskUncheckedUpdateWithoutSubjectInput>
  }

  export type TaskUpdateManyWithWhereWithoutSubjectInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutSubjectInput>
  }

  export type ConversationUpsertWithWhereUniqueWithoutSubjectInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutSubjectInput, ConversationUncheckedUpdateWithoutSubjectInput>
    create: XOR<ConversationCreateWithoutSubjectInput, ConversationUncheckedCreateWithoutSubjectInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutSubjectInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutSubjectInput, ConversationUncheckedUpdateWithoutSubjectInput>
  }

  export type ConversationUpdateManyWithWhereWithoutSubjectInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutSubjectInput>
  }

  export type SubjectCreateWithoutMilestonesInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubjectsInput
    resources?: ResourceCreateNestedManyWithoutSubjectInput
    tasks?: TaskCreateNestedManyWithoutSubjectInput
    conversations?: ConversationCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutMilestonesInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    resources?: ResourceUncheckedCreateNestedManyWithoutSubjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutSubjectInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutMilestonesInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutMilestonesInput, SubjectUncheckedCreateWithoutMilestonesInput>
  }

  export type TaskCreateWithoutMilestoneInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
    subject: SubjectCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutMilestoneInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    subjectId: string
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    timerSessions?: TimerSessionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutMilestoneInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutMilestoneInput, TaskUncheckedCreateWithoutMilestoneInput>
  }

  export type TaskCreateManyMilestoneInputEnvelope = {
    data: TaskCreateManyMilestoneInput | TaskCreateManyMilestoneInput[]
    skipDuplicates?: boolean
  }

  export type SubjectUpsertWithoutMilestonesInput = {
    update: XOR<SubjectUpdateWithoutMilestonesInput, SubjectUncheckedUpdateWithoutMilestonesInput>
    create: XOR<SubjectCreateWithoutMilestonesInput, SubjectUncheckedCreateWithoutMilestonesInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutMilestonesInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutMilestonesInput, SubjectUncheckedUpdateWithoutMilestonesInput>
  }

  export type SubjectUpdateWithoutMilestonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubjectsNestedInput
    resources?: ResourceUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutMilestonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    resources?: ResourceUncheckedUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutMilestoneInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutMilestoneInput, TaskUncheckedUpdateWithoutMilestoneInput>
    create: XOR<TaskCreateWithoutMilestoneInput, TaskUncheckedCreateWithoutMilestoneInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutMilestoneInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutMilestoneInput, TaskUncheckedUpdateWithoutMilestoneInput>
  }

  export type TaskUpdateManyWithWhereWithoutMilestoneInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutMilestoneInput>
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutUserInput
    resources?: ResourceCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutUserInput
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type SubjectCreateWithoutTasksInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubjectsInput
    milestones?: MilestoneCreateNestedManyWithoutSubjectInput
    resources?: ResourceCreateNestedManyWithoutSubjectInput
    conversations?: ConversationCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutTasksInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    milestones?: MilestoneUncheckedCreateNestedManyWithoutSubjectInput
    resources?: ResourceUncheckedCreateNestedManyWithoutSubjectInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutTasksInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutTasksInput, SubjectUncheckedCreateWithoutTasksInput>
  }

  export type MilestoneCreateWithoutTasksInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subject: SubjectCreateNestedOneWithoutMilestonesInput
  }

  export type MilestoneUncheckedCreateWithoutTasksInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId: string
  }

  export type MilestoneCreateOrConnectWithoutTasksInput = {
    where: MilestoneWhereUniqueInput
    create: XOR<MilestoneCreateWithoutTasksInput, MilestoneUncheckedCreateWithoutTasksInput>
  }

  export type SubtaskCreateWithoutTaskInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    parent?: SubtaskCreateNestedOneWithoutChildrenInput
    children?: SubtaskCreateNestedManyWithoutParentInput
  }

  export type SubtaskUncheckedCreateWithoutTaskInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    parentId?: string | null
    children?: SubtaskUncheckedCreateNestedManyWithoutParentInput
  }

  export type SubtaskCreateOrConnectWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
  }

  export type SubtaskCreateManyTaskInputEnvelope = {
    data: SubtaskCreateManyTaskInput | SubtaskCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TimerSessionCreateWithoutTaskInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    duration?: number | null
  }

  export type TimerSessionUncheckedCreateWithoutTaskInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    duration?: number | null
  }

  export type TimerSessionCreateOrConnectWithoutTaskInput = {
    where: TimerSessionWhereUniqueInput
    create: XOR<TimerSessionCreateWithoutTaskInput, TimerSessionUncheckedCreateWithoutTaskInput>
  }

  export type TimerSessionCreateManyTaskInputEnvelope = {
    data: TimerSessionCreateManyTaskInput | TimerSessionCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutUserNestedInput
    resources?: ResourceUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutUserNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubjectUpsertWithoutTasksInput = {
    update: XOR<SubjectUpdateWithoutTasksInput, SubjectUncheckedUpdateWithoutTasksInput>
    create: XOR<SubjectCreateWithoutTasksInput, SubjectUncheckedCreateWithoutTasksInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutTasksInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutTasksInput, SubjectUncheckedUpdateWithoutTasksInput>
  }

  export type SubjectUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubjectsNestedInput
    milestones?: MilestoneUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    milestones?: MilestoneUncheckedUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type MilestoneUpsertWithoutTasksInput = {
    update: XOR<MilestoneUpdateWithoutTasksInput, MilestoneUncheckedUpdateWithoutTasksInput>
    create: XOR<MilestoneCreateWithoutTasksInput, MilestoneUncheckedCreateWithoutTasksInput>
    where?: MilestoneWhereInput
  }

  export type MilestoneUpdateToOneWithWhereWithoutTasksInput = {
    where?: MilestoneWhereInput
    data: XOR<MilestoneUpdateWithoutTasksInput, MilestoneUncheckedUpdateWithoutTasksInput>
  }

  export type MilestoneUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutMilestonesNestedInput
  }

  export type MilestoneUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type SubtaskUpsertWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    update: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
  }

  export type SubtaskUpdateWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    data: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>
  }

  export type SubtaskUpdateManyWithWhereWithoutTaskInput = {
    where: SubtaskScalarWhereInput
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyWithoutTaskInput>
  }

  export type SubtaskScalarWhereInput = {
    AND?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
    OR?: SubtaskScalarWhereInput[]
    NOT?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
    id?: StringFilter<"Subtask"> | string
    title?: StringFilter<"Subtask"> | string
    notes?: StringFilter<"Subtask"> | string
    isCompleted?: BoolFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    order?: IntFilter<"Subtask"> | number
    createdAt?: DateTimeFilter<"Subtask"> | Date | string
    taskId?: StringFilter<"Subtask"> | string
    parentId?: StringNullableFilter<"Subtask"> | string | null
  }

  export type TimerSessionUpsertWithWhereUniqueWithoutTaskInput = {
    where: TimerSessionWhereUniqueInput
    update: XOR<TimerSessionUpdateWithoutTaskInput, TimerSessionUncheckedUpdateWithoutTaskInput>
    create: XOR<TimerSessionCreateWithoutTaskInput, TimerSessionUncheckedCreateWithoutTaskInput>
  }

  export type TimerSessionUpdateWithWhereUniqueWithoutTaskInput = {
    where: TimerSessionWhereUniqueInput
    data: XOR<TimerSessionUpdateWithoutTaskInput, TimerSessionUncheckedUpdateWithoutTaskInput>
  }

  export type TimerSessionUpdateManyWithWhereWithoutTaskInput = {
    where: TimerSessionScalarWhereInput
    data: XOR<TimerSessionUpdateManyMutationInput, TimerSessionUncheckedUpdateManyWithoutTaskInput>
  }

  export type TimerSessionScalarWhereInput = {
    AND?: TimerSessionScalarWhereInput | TimerSessionScalarWhereInput[]
    OR?: TimerSessionScalarWhereInput[]
    NOT?: TimerSessionScalarWhereInput | TimerSessionScalarWhereInput[]
    id?: StringFilter<"TimerSession"> | string
    startedAt?: DateTimeFilter<"TimerSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"TimerSession"> | Date | string | null
    duration?: IntNullableFilter<"TimerSession"> | number | null
    taskId?: StringFilter<"TimerSession"> | string
  }

  export type TaskCreateWithoutSubtasksInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
    subject: SubjectCreateNestedOneWithoutTasksInput
    milestone?: MilestoneCreateNestedOneWithoutTasksInput
    timerSessions?: TimerSessionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutSubtasksInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    subjectId: string
    milestoneId?: string | null
    timerSessions?: TimerSessionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutSubtasksInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
  }

  export type SubtaskCreateWithoutChildrenInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutSubtasksInput
    parent?: SubtaskCreateNestedOneWithoutChildrenInput
  }

  export type SubtaskUncheckedCreateWithoutChildrenInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    taskId: string
    parentId?: string | null
  }

  export type SubtaskCreateOrConnectWithoutChildrenInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutChildrenInput, SubtaskUncheckedCreateWithoutChildrenInput>
  }

  export type SubtaskCreateWithoutParentInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutSubtasksInput
    children?: SubtaskCreateNestedManyWithoutParentInput
  }

  export type SubtaskUncheckedCreateWithoutParentInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    taskId: string
    children?: SubtaskUncheckedCreateNestedManyWithoutParentInput
  }

  export type SubtaskCreateOrConnectWithoutParentInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutParentInput, SubtaskUncheckedCreateWithoutParentInput>
  }

  export type SubtaskCreateManyParentInputEnvelope = {
    data: SubtaskCreateManyParentInput | SubtaskCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type TaskUpsertWithoutSubtasksInput = {
    update: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutSubtasksInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type TaskUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    subject?: SubjectUpdateOneRequiredWithoutTasksNestedInput
    milestone?: MilestoneUpdateOneWithoutTasksNestedInput
    timerSessions?: TimerSessionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
    timerSessions?: TimerSessionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type SubtaskUpsertWithoutChildrenInput = {
    update: XOR<SubtaskUpdateWithoutChildrenInput, SubtaskUncheckedUpdateWithoutChildrenInput>
    create: XOR<SubtaskCreateWithoutChildrenInput, SubtaskUncheckedCreateWithoutChildrenInput>
    where?: SubtaskWhereInput
  }

  export type SubtaskUpdateToOneWithWhereWithoutChildrenInput = {
    where?: SubtaskWhereInput
    data: XOR<SubtaskUpdateWithoutChildrenInput, SubtaskUncheckedUpdateWithoutChildrenInput>
  }

  export type SubtaskUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
    parent?: SubtaskUpdateOneWithoutChildrenNestedInput
  }

  export type SubtaskUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubtaskUpsertWithWhereUniqueWithoutParentInput = {
    where: SubtaskWhereUniqueInput
    update: XOR<SubtaskUpdateWithoutParentInput, SubtaskUncheckedUpdateWithoutParentInput>
    create: XOR<SubtaskCreateWithoutParentInput, SubtaskUncheckedCreateWithoutParentInput>
  }

  export type SubtaskUpdateWithWhereUniqueWithoutParentInput = {
    where: SubtaskWhereUniqueInput
    data: XOR<SubtaskUpdateWithoutParentInput, SubtaskUncheckedUpdateWithoutParentInput>
  }

  export type SubtaskUpdateManyWithWhereWithoutParentInput = {
    where: SubtaskScalarWhereInput
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyWithoutParentInput>
  }

  export type UserCreateWithoutResourcesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResourcesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResourcesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
  }

  export type SubjectCreateWithoutResourcesInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubjectsInput
    milestones?: MilestoneCreateNestedManyWithoutSubjectInput
    tasks?: TaskCreateNestedManyWithoutSubjectInput
    conversations?: ConversationCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutResourcesInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    milestones?: MilestoneUncheckedCreateNestedManyWithoutSubjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutSubjectInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutResourcesInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutResourcesInput, SubjectUncheckedCreateWithoutResourcesInput>
  }

  export type UserUpsertWithoutResourcesInput = {
    update: XOR<UserUpdateWithoutResourcesInput, UserUncheckedUpdateWithoutResourcesInput>
    create: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResourcesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResourcesInput, UserUncheckedUpdateWithoutResourcesInput>
  }

  export type UserUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubjectUpsertWithoutResourcesInput = {
    update: XOR<SubjectUpdateWithoutResourcesInput, SubjectUncheckedUpdateWithoutResourcesInput>
    create: XOR<SubjectCreateWithoutResourcesInput, SubjectUncheckedCreateWithoutResourcesInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutResourcesInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutResourcesInput, SubjectUncheckedUpdateWithoutResourcesInput>
  }

  export type SubjectUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubjectsNestedInput
    milestones?: MilestoneUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    milestones?: MilestoneUncheckedUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type TaskCreateWithoutTimerSessionsInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
    subject: SubjectCreateNestedOneWithoutTasksInput
    milestone?: MilestoneCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutTimerSessionsInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    subjectId: string
    milestoneId?: string | null
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutTimerSessionsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutTimerSessionsInput, TaskUncheckedCreateWithoutTimerSessionsInput>
  }

  export type TaskUpsertWithoutTimerSessionsInput = {
    update: XOR<TaskUpdateWithoutTimerSessionsInput, TaskUncheckedUpdateWithoutTimerSessionsInput>
    create: XOR<TaskCreateWithoutTimerSessionsInput, TaskUncheckedCreateWithoutTimerSessionsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutTimerSessionsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutTimerSessionsInput, TaskUncheckedUpdateWithoutTimerSessionsInput>
  }

  export type TaskUpdateWithoutTimerSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    subject?: SubjectUpdateOneRequiredWithoutTasksNestedInput
    milestone?: MilestoneUpdateOneWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutTimerSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    resources?: ResourceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type SubjectCreateWithoutConversationsInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubjectsInput
    milestones?: MilestoneCreateNestedManyWithoutSubjectInput
    resources?: ResourceCreateNestedManyWithoutSubjectInput
    tasks?: TaskCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutConversationsInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    milestones?: MilestoneUncheckedCreateNestedManyWithoutSubjectInput
    resources?: ResourceUncheckedCreateNestedManyWithoutSubjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutConversationsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutConversationsInput, SubjectUncheckedCreateWithoutConversationsInput>
  }

  export type ChatMessageCreateWithoutConversationInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    model?: string | null
    createdAt?: Date | string
  }

  export type ChatMessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    model?: string | null
    createdAt?: Date | string
  }

  export type ChatMessageCreateOrConnectWithoutConversationInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutConversationInput, ChatMessageUncheckedCreateWithoutConversationInput>
  }

  export type ChatMessageCreateManyConversationInputEnvelope = {
    data: ChatMessageCreateManyConversationInput | ChatMessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    resources?: ResourceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubjectUpsertWithoutConversationsInput = {
    update: XOR<SubjectUpdateWithoutConversationsInput, SubjectUncheckedUpdateWithoutConversationsInput>
    create: XOR<SubjectCreateWithoutConversationsInput, SubjectUncheckedCreateWithoutConversationsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutConversationsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutConversationsInput, SubjectUncheckedUpdateWithoutConversationsInput>
  }

  export type SubjectUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubjectsNestedInput
    milestones?: MilestoneUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    milestones?: MilestoneUncheckedUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutConversationInput, ChatMessageUncheckedUpdateWithoutConversationInput>
    create: XOR<ChatMessageCreateWithoutConversationInput, ChatMessageUncheckedCreateWithoutConversationInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutConversationInput, ChatMessageUncheckedUpdateWithoutConversationInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutConversationInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type ChatMessageScalarWhereInput = {
    AND?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    OR?: ChatMessageScalarWhereInput[]
    NOT?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    id?: StringFilter<"ChatMessage"> | string
    role?: EnumChatRoleFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringFilter<"ChatMessage"> | string
    model?: StringNullableFilter<"ChatMessage"> | string | null
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    conversationId?: StringFilter<"ChatMessage"> | string
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
    user: UserCreateNestedOneWithoutConversationsInput
    subject?: SubjectCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    subjectId?: string | null
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    subject?: SubjectUpdateOneWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
  }

  export type SubjectCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    color?: string | null
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    subjectId: string
    milestoneId?: string | null
  }

  export type ResourceCreateManyUserInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId: string
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId?: string | null
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
  }

  export type SubjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    milestones?: MilestoneUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    milestones?: MilestoneUncheckedUpdateManyWithoutSubjectNestedInput
    resources?: ResourceUncheckedUpdateManyWithoutSubjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutSubjectNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutTasksNestedInput
    milestone?: MilestoneUpdateOneWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutResourcesNestedInput
  }

  export type ResourceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type ResourceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type ConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
    subject?: SubjectUpdateOneWithoutConversationsNestedInput
    messages?: ChatMessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
    messages?: ChatMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
  }

  export type MilestoneCreateManySubjectInput = {
    id?: string
    title: string
    notes?: string
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResourceCreateManySubjectInput = {
    id?: string
    type: $Enums.ResourceType
    url: string
    title: string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type TaskCreateManySubjectInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    milestoneId?: string | null
  }

  export type ConversationCreateManySubjectInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    contextSubjectIds?: ConversationCreatecontextSubjectIdsInput | string[]
  }

  export type MilestoneUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutMilestoneNestedInput
  }

  export type MilestoneUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutMilestoneNestedInput
  }

  export type MilestoneUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResourcesNestedInput
  }

  export type ResourceUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ResourceUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    milestone?: MilestoneUpdateOneWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    milestoneId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConversationUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: ChatMessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
    messages?: ChatMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    contextSubjectIds?: ConversationUpdatecontextSubjectIdsInput | string[]
  }

  export type TaskCreateManyMilestoneInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    completedAt?: Date | string | null
    dueDate?: Date | string | null
    priority?: $Enums.Priority
    estimatedTime?: number | null
    timeSpent?: number | null
    recurrence?: $Enums.Recurrence | null
    order?: number
    createdAt?: Date | string
    userId: string
    subjectId: string
  }

  export type TaskUpdateWithoutMilestoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    subject?: SubjectUpdateOneRequiredWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutMilestoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    timerSessions?: TimerSessionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutMilestoneInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    recurrence?: NullableEnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type SubtaskCreateManyTaskInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    parentId?: string | null
  }

  export type TimerSessionCreateManyTaskInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    duration?: number | null
  }

  export type SubtaskUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: SubtaskUpdateOneWithoutChildrenNestedInput
    children?: SubtaskUpdateManyWithoutParentNestedInput
  }

  export type SubtaskUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: SubtaskUncheckedUpdateManyWithoutParentNestedInput
  }

  export type SubtaskUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimerSessionUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TimerSessionUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TimerSessionUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SubtaskCreateManyParentInput = {
    id?: string
    title: string
    notes?: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    createdAt?: Date | string
    taskId: string
  }

  export type SubtaskUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
    children?: SubtaskUpdateManyWithoutParentNestedInput
  }

  export type SubtaskUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    children?: SubtaskUncheckedUpdateManyWithoutParentNestedInput
  }

  export type SubtaskUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageCreateManyConversationInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    model?: string | null
    createdAt?: Date | string
  }

  export type ChatMessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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