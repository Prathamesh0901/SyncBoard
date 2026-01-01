
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
 * Model CanvasRoom
 * 
 */
export type CanvasRoom = $Result.DefaultSelection<Prisma.$CanvasRoomPayload>
/**
 * Model Element
 * 
 */
export type Element = $Result.DefaultSelection<Prisma.$ElementPayload>
/**
 * Model RoomUser
 * 
 */
export type RoomUser = $Result.DefaultSelection<Prisma.$RoomUserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ShapeTypes: {
  PENCIL: 'PENCIL',
  RECTANGLE: 'RECTANGLE',
  ELLIPSE: 'ELLIPSE',
  LINE: 'LINE',
  ARROW: 'ARROW',
  TEXT: 'TEXT'
};

export type ShapeTypes = (typeof ShapeTypes)[keyof typeof ShapeTypes]

}

export type ShapeTypes = $Enums.ShapeTypes

export const ShapeTypes: typeof $Enums.ShapeTypes

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
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * `prisma.canvasRoom`: Exposes CRUD operations for the **CanvasRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CanvasRooms
    * const canvasRooms = await prisma.canvasRoom.findMany()
    * ```
    */
  get canvasRoom(): Prisma.CanvasRoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.element`: Exposes CRUD operations for the **Element** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elements
    * const elements = await prisma.element.findMany()
    * ```
    */
  get element(): Prisma.ElementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomUser`: Exposes CRUD operations for the **RoomUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomUsers
    * const roomUsers = await prisma.roomUser.findMany()
    * ```
    */
  get roomUser(): Prisma.RoomUserDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    CanvasRoom: 'CanvasRoom',
    Element: 'Element',
    RoomUser: 'RoomUser'
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
      modelProps: "user" | "canvasRoom" | "element" | "roomUser"
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
      CanvasRoom: {
        payload: Prisma.$CanvasRoomPayload<ExtArgs>
        fields: Prisma.CanvasRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CanvasRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CanvasRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>
          }
          findFirst: {
            args: Prisma.CanvasRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CanvasRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>
          }
          findMany: {
            args: Prisma.CanvasRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>[]
          }
          create: {
            args: Prisma.CanvasRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>
          }
          createMany: {
            args: Prisma.CanvasRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CanvasRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>[]
          }
          delete: {
            args: Prisma.CanvasRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>
          }
          update: {
            args: Prisma.CanvasRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>
          }
          deleteMany: {
            args: Prisma.CanvasRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CanvasRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CanvasRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>[]
          }
          upsert: {
            args: Prisma.CanvasRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasRoomPayload>
          }
          aggregate: {
            args: Prisma.CanvasRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCanvasRoom>
          }
          groupBy: {
            args: Prisma.CanvasRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<CanvasRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.CanvasRoomCountArgs<ExtArgs>
            result: $Utils.Optional<CanvasRoomCountAggregateOutputType> | number
          }
        }
      }
      Element: {
        payload: Prisma.$ElementPayload<ExtArgs>
        fields: Prisma.ElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findFirst: {
            args: Prisma.ElementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findMany: {
            args: Prisma.ElementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          create: {
            args: Prisma.ElementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          createMany: {
            args: Prisma.ElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          delete: {
            args: Prisma.ElementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          update: {
            args: Prisma.ElementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          deleteMany: {
            args: Prisma.ElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          upsert: {
            args: Prisma.ElementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          aggregate: {
            args: Prisma.ElementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElement>
          }
          groupBy: {
            args: Prisma.ElementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementCountArgs<ExtArgs>
            result: $Utils.Optional<ElementCountAggregateOutputType> | number
          }
        }
      }
      RoomUser: {
        payload: Prisma.$RoomUserPayload<ExtArgs>
        fields: Prisma.RoomUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>
          }
          findFirst: {
            args: Prisma.RoomUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>
          }
          findMany: {
            args: Prisma.RoomUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>[]
          }
          create: {
            args: Prisma.RoomUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>
          }
          createMany: {
            args: Prisma.RoomUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>[]
          }
          delete: {
            args: Prisma.RoomUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>
          }
          update: {
            args: Prisma.RoomUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>
          }
          deleteMany: {
            args: Prisma.RoomUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>[]
          }
          upsert: {
            args: Prisma.RoomUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUserPayload>
          }
          aggregate: {
            args: Prisma.RoomUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomUser>
          }
          groupBy: {
            args: Prisma.RoomUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomUserCountArgs<ExtArgs>
            result: $Utils.Optional<RoomUserCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    canvasRoom?: CanvasRoomOmit
    element?: ElementOmit
    roomUser?: RoomUserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    rooms: number
    adminRooms: number
    elements: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | UserCountOutputTypeCountRoomsArgs
    adminRooms?: boolean | UserCountOutputTypeCountAdminRoomsArgs
    elements?: boolean | UserCountOutputTypeCountElementsArgs
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
  export type UserCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdminRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CanvasRoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
  }


  /**
   * Count Type CanvasRoomCountOutputType
   */

  export type CanvasRoomCountOutputType = {
    users: number
    elements: number
  }

  export type CanvasRoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CanvasRoomCountOutputTypeCountUsersArgs
    elements?: boolean | CanvasRoomCountOutputTypeCountElementsArgs
  }

  // Custom InputTypes
  /**
   * CanvasRoomCountOutputType without action
   */
  export type CanvasRoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoomCountOutputType
     */
    select?: CanvasRoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CanvasRoomCountOutputType without action
   */
  export type CanvasRoomCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomUserWhereInput
  }

  /**
   * CanvasRoomCountOutputType without action
   */
  export type CanvasRoomCountOutputTypeCountElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
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
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
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
    createdAt: Date
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
    createdAt?: boolean
    rooms?: boolean | User$roomsArgs<ExtArgs>
    adminRooms?: boolean | User$adminRoomsArgs<ExtArgs>
    elements?: boolean | User$elementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | User$roomsArgs<ExtArgs>
    adminRooms?: boolean | User$adminRoomsArgs<ExtArgs>
    elements?: boolean | User$elementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      rooms: Prisma.$RoomUserPayload<ExtArgs>[]
      adminRooms: Prisma.$CanvasRoomPayload<ExtArgs>[]
      elements: Prisma.$ElementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      createdAt: Date
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
    rooms<T extends User$roomsArgs<ExtArgs> = {}>(args?: Subset<T, User$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    adminRooms<T extends User$adminRoomsArgs<ExtArgs> = {}>(args?: Subset<T, User$adminRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    elements<T extends User$elementsArgs<ExtArgs> = {}>(args?: Subset<T, User$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
   * User.rooms
   */
  export type User$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    where?: RoomUserWhereInput
    orderBy?: RoomUserOrderByWithRelationInput | RoomUserOrderByWithRelationInput[]
    cursor?: RoomUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomUserScalarFieldEnum | RoomUserScalarFieldEnum[]
  }

  /**
   * User.adminRooms
   */
  export type User$adminRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    where?: CanvasRoomWhereInput
    orderBy?: CanvasRoomOrderByWithRelationInput | CanvasRoomOrderByWithRelationInput[]
    cursor?: CanvasRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CanvasRoomScalarFieldEnum | CanvasRoomScalarFieldEnum[]
  }

  /**
   * User.elements
   */
  export type User$elementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    cursor?: ElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
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
   * Model CanvasRoom
   */

  export type AggregateCanvasRoom = {
    _count: CanvasRoomCountAggregateOutputType | null
    _min: CanvasRoomMinAggregateOutputType | null
    _max: CanvasRoomMaxAggregateOutputType | null
  }

  export type CanvasRoomMinAggregateOutputType = {
    id: string | null
    slug: string | null
    adminId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CanvasRoomMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    adminId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CanvasRoomCountAggregateOutputType = {
    id: number
    slug: number
    adminId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CanvasRoomMinAggregateInputType = {
    id?: true
    slug?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CanvasRoomMaxAggregateInputType = {
    id?: true
    slug?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CanvasRoomCountAggregateInputType = {
    id?: true
    slug?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CanvasRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CanvasRoom to aggregate.
     */
    where?: CanvasRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CanvasRooms to fetch.
     */
    orderBy?: CanvasRoomOrderByWithRelationInput | CanvasRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CanvasRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CanvasRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CanvasRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CanvasRooms
    **/
    _count?: true | CanvasRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CanvasRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CanvasRoomMaxAggregateInputType
  }

  export type GetCanvasRoomAggregateType<T extends CanvasRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateCanvasRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCanvasRoom[P]>
      : GetScalarType<T[P], AggregateCanvasRoom[P]>
  }




  export type CanvasRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CanvasRoomWhereInput
    orderBy?: CanvasRoomOrderByWithAggregationInput | CanvasRoomOrderByWithAggregationInput[]
    by: CanvasRoomScalarFieldEnum[] | CanvasRoomScalarFieldEnum
    having?: CanvasRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CanvasRoomCountAggregateInputType | true
    _min?: CanvasRoomMinAggregateInputType
    _max?: CanvasRoomMaxAggregateInputType
  }

  export type CanvasRoomGroupByOutputType = {
    id: string
    slug: string
    adminId: string
    createdAt: Date
    updatedAt: Date
    _count: CanvasRoomCountAggregateOutputType | null
    _min: CanvasRoomMinAggregateOutputType | null
    _max: CanvasRoomMaxAggregateOutputType | null
  }

  type GetCanvasRoomGroupByPayload<T extends CanvasRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CanvasRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CanvasRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CanvasRoomGroupByOutputType[P]>
            : GetScalarType<T[P], CanvasRoomGroupByOutputType[P]>
        }
      >
    >


  export type CanvasRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
    users?: boolean | CanvasRoom$usersArgs<ExtArgs>
    elements?: boolean | CanvasRoom$elementsArgs<ExtArgs>
    _count?: boolean | CanvasRoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["canvasRoom"]>

  export type CanvasRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["canvasRoom"]>

  export type CanvasRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["canvasRoom"]>

  export type CanvasRoomSelectScalar = {
    id?: boolean
    slug?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CanvasRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "adminId" | "createdAt" | "updatedAt", ExtArgs["result"]["canvasRoom"]>
  export type CanvasRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
    users?: boolean | CanvasRoom$usersArgs<ExtArgs>
    elements?: boolean | CanvasRoom$elementsArgs<ExtArgs>
    _count?: boolean | CanvasRoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CanvasRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CanvasRoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CanvasRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CanvasRoom"
    objects: {
      admin: Prisma.$UserPayload<ExtArgs>
      users: Prisma.$RoomUserPayload<ExtArgs>[]
      elements: Prisma.$ElementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      adminId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["canvasRoom"]>
    composites: {}
  }

  type CanvasRoomGetPayload<S extends boolean | null | undefined | CanvasRoomDefaultArgs> = $Result.GetResult<Prisma.$CanvasRoomPayload, S>

  type CanvasRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CanvasRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CanvasRoomCountAggregateInputType | true
    }

  export interface CanvasRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CanvasRoom'], meta: { name: 'CanvasRoom' } }
    /**
     * Find zero or one CanvasRoom that matches the filter.
     * @param {CanvasRoomFindUniqueArgs} args - Arguments to find a CanvasRoom
     * @example
     * // Get one CanvasRoom
     * const canvasRoom = await prisma.canvasRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CanvasRoomFindUniqueArgs>(args: SelectSubset<T, CanvasRoomFindUniqueArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CanvasRoom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CanvasRoomFindUniqueOrThrowArgs} args - Arguments to find a CanvasRoom
     * @example
     * // Get one CanvasRoom
     * const canvasRoom = await prisma.canvasRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CanvasRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, CanvasRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CanvasRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasRoomFindFirstArgs} args - Arguments to find a CanvasRoom
     * @example
     * // Get one CanvasRoom
     * const canvasRoom = await prisma.canvasRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CanvasRoomFindFirstArgs>(args?: SelectSubset<T, CanvasRoomFindFirstArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CanvasRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasRoomFindFirstOrThrowArgs} args - Arguments to find a CanvasRoom
     * @example
     * // Get one CanvasRoom
     * const canvasRoom = await prisma.canvasRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CanvasRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, CanvasRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CanvasRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CanvasRooms
     * const canvasRooms = await prisma.canvasRoom.findMany()
     * 
     * // Get first 10 CanvasRooms
     * const canvasRooms = await prisma.canvasRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const canvasRoomWithIdOnly = await prisma.canvasRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CanvasRoomFindManyArgs>(args?: SelectSubset<T, CanvasRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CanvasRoom.
     * @param {CanvasRoomCreateArgs} args - Arguments to create a CanvasRoom.
     * @example
     * // Create one CanvasRoom
     * const CanvasRoom = await prisma.canvasRoom.create({
     *   data: {
     *     // ... data to create a CanvasRoom
     *   }
     * })
     * 
     */
    create<T extends CanvasRoomCreateArgs>(args: SelectSubset<T, CanvasRoomCreateArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CanvasRooms.
     * @param {CanvasRoomCreateManyArgs} args - Arguments to create many CanvasRooms.
     * @example
     * // Create many CanvasRooms
     * const canvasRoom = await prisma.canvasRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CanvasRoomCreateManyArgs>(args?: SelectSubset<T, CanvasRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CanvasRooms and returns the data saved in the database.
     * @param {CanvasRoomCreateManyAndReturnArgs} args - Arguments to create many CanvasRooms.
     * @example
     * // Create many CanvasRooms
     * const canvasRoom = await prisma.canvasRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CanvasRooms and only return the `id`
     * const canvasRoomWithIdOnly = await prisma.canvasRoom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CanvasRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, CanvasRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CanvasRoom.
     * @param {CanvasRoomDeleteArgs} args - Arguments to delete one CanvasRoom.
     * @example
     * // Delete one CanvasRoom
     * const CanvasRoom = await prisma.canvasRoom.delete({
     *   where: {
     *     // ... filter to delete one CanvasRoom
     *   }
     * })
     * 
     */
    delete<T extends CanvasRoomDeleteArgs>(args: SelectSubset<T, CanvasRoomDeleteArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CanvasRoom.
     * @param {CanvasRoomUpdateArgs} args - Arguments to update one CanvasRoom.
     * @example
     * // Update one CanvasRoom
     * const canvasRoom = await prisma.canvasRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CanvasRoomUpdateArgs>(args: SelectSubset<T, CanvasRoomUpdateArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CanvasRooms.
     * @param {CanvasRoomDeleteManyArgs} args - Arguments to filter CanvasRooms to delete.
     * @example
     * // Delete a few CanvasRooms
     * const { count } = await prisma.canvasRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CanvasRoomDeleteManyArgs>(args?: SelectSubset<T, CanvasRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CanvasRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CanvasRooms
     * const canvasRoom = await prisma.canvasRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CanvasRoomUpdateManyArgs>(args: SelectSubset<T, CanvasRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CanvasRooms and returns the data updated in the database.
     * @param {CanvasRoomUpdateManyAndReturnArgs} args - Arguments to update many CanvasRooms.
     * @example
     * // Update many CanvasRooms
     * const canvasRoom = await prisma.canvasRoom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CanvasRooms and only return the `id`
     * const canvasRoomWithIdOnly = await prisma.canvasRoom.updateManyAndReturn({
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
    updateManyAndReturn<T extends CanvasRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, CanvasRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CanvasRoom.
     * @param {CanvasRoomUpsertArgs} args - Arguments to update or create a CanvasRoom.
     * @example
     * // Update or create a CanvasRoom
     * const canvasRoom = await prisma.canvasRoom.upsert({
     *   create: {
     *     // ... data to create a CanvasRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CanvasRoom we want to update
     *   }
     * })
     */
    upsert<T extends CanvasRoomUpsertArgs>(args: SelectSubset<T, CanvasRoomUpsertArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CanvasRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasRoomCountArgs} args - Arguments to filter CanvasRooms to count.
     * @example
     * // Count the number of CanvasRooms
     * const count = await prisma.canvasRoom.count({
     *   where: {
     *     // ... the filter for the CanvasRooms we want to count
     *   }
     * })
    **/
    count<T extends CanvasRoomCountArgs>(
      args?: Subset<T, CanvasRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CanvasRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CanvasRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CanvasRoomAggregateArgs>(args: Subset<T, CanvasRoomAggregateArgs>): Prisma.PrismaPromise<GetCanvasRoomAggregateType<T>>

    /**
     * Group by CanvasRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasRoomGroupByArgs} args - Group by arguments.
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
      T extends CanvasRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CanvasRoomGroupByArgs['orderBy'] }
        : { orderBy?: CanvasRoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CanvasRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCanvasRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CanvasRoom model
   */
  readonly fields: CanvasRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CanvasRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CanvasRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends CanvasRoom$usersArgs<ExtArgs> = {}>(args?: Subset<T, CanvasRoom$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    elements<T extends CanvasRoom$elementsArgs<ExtArgs> = {}>(args?: Subset<T, CanvasRoom$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CanvasRoom model
   */
  interface CanvasRoomFieldRefs {
    readonly id: FieldRef<"CanvasRoom", 'String'>
    readonly slug: FieldRef<"CanvasRoom", 'String'>
    readonly adminId: FieldRef<"CanvasRoom", 'String'>
    readonly createdAt: FieldRef<"CanvasRoom", 'DateTime'>
    readonly updatedAt: FieldRef<"CanvasRoom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CanvasRoom findUnique
   */
  export type CanvasRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * Filter, which CanvasRoom to fetch.
     */
    where: CanvasRoomWhereUniqueInput
  }

  /**
   * CanvasRoom findUniqueOrThrow
   */
  export type CanvasRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * Filter, which CanvasRoom to fetch.
     */
    where: CanvasRoomWhereUniqueInput
  }

  /**
   * CanvasRoom findFirst
   */
  export type CanvasRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * Filter, which CanvasRoom to fetch.
     */
    where?: CanvasRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CanvasRooms to fetch.
     */
    orderBy?: CanvasRoomOrderByWithRelationInput | CanvasRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CanvasRooms.
     */
    cursor?: CanvasRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CanvasRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CanvasRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CanvasRooms.
     */
    distinct?: CanvasRoomScalarFieldEnum | CanvasRoomScalarFieldEnum[]
  }

  /**
   * CanvasRoom findFirstOrThrow
   */
  export type CanvasRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * Filter, which CanvasRoom to fetch.
     */
    where?: CanvasRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CanvasRooms to fetch.
     */
    orderBy?: CanvasRoomOrderByWithRelationInput | CanvasRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CanvasRooms.
     */
    cursor?: CanvasRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CanvasRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CanvasRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CanvasRooms.
     */
    distinct?: CanvasRoomScalarFieldEnum | CanvasRoomScalarFieldEnum[]
  }

  /**
   * CanvasRoom findMany
   */
  export type CanvasRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * Filter, which CanvasRooms to fetch.
     */
    where?: CanvasRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CanvasRooms to fetch.
     */
    orderBy?: CanvasRoomOrderByWithRelationInput | CanvasRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CanvasRooms.
     */
    cursor?: CanvasRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CanvasRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CanvasRooms.
     */
    skip?: number
    distinct?: CanvasRoomScalarFieldEnum | CanvasRoomScalarFieldEnum[]
  }

  /**
   * CanvasRoom create
   */
  export type CanvasRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a CanvasRoom.
     */
    data: XOR<CanvasRoomCreateInput, CanvasRoomUncheckedCreateInput>
  }

  /**
   * CanvasRoom createMany
   */
  export type CanvasRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CanvasRooms.
     */
    data: CanvasRoomCreateManyInput | CanvasRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CanvasRoom createManyAndReturn
   */
  export type CanvasRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * The data used to create many CanvasRooms.
     */
    data: CanvasRoomCreateManyInput | CanvasRoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CanvasRoom update
   */
  export type CanvasRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a CanvasRoom.
     */
    data: XOR<CanvasRoomUpdateInput, CanvasRoomUncheckedUpdateInput>
    /**
     * Choose, which CanvasRoom to update.
     */
    where: CanvasRoomWhereUniqueInput
  }

  /**
   * CanvasRoom updateMany
   */
  export type CanvasRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CanvasRooms.
     */
    data: XOR<CanvasRoomUpdateManyMutationInput, CanvasRoomUncheckedUpdateManyInput>
    /**
     * Filter which CanvasRooms to update
     */
    where?: CanvasRoomWhereInput
    /**
     * Limit how many CanvasRooms to update.
     */
    limit?: number
  }

  /**
   * CanvasRoom updateManyAndReturn
   */
  export type CanvasRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * The data used to update CanvasRooms.
     */
    data: XOR<CanvasRoomUpdateManyMutationInput, CanvasRoomUncheckedUpdateManyInput>
    /**
     * Filter which CanvasRooms to update
     */
    where?: CanvasRoomWhereInput
    /**
     * Limit how many CanvasRooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CanvasRoom upsert
   */
  export type CanvasRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the CanvasRoom to update in case it exists.
     */
    where: CanvasRoomWhereUniqueInput
    /**
     * In case the CanvasRoom found by the `where` argument doesn't exist, create a new CanvasRoom with this data.
     */
    create: XOR<CanvasRoomCreateInput, CanvasRoomUncheckedCreateInput>
    /**
     * In case the CanvasRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CanvasRoomUpdateInput, CanvasRoomUncheckedUpdateInput>
  }

  /**
   * CanvasRoom delete
   */
  export type CanvasRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
    /**
     * Filter which CanvasRoom to delete.
     */
    where: CanvasRoomWhereUniqueInput
  }

  /**
   * CanvasRoom deleteMany
   */
  export type CanvasRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CanvasRooms to delete
     */
    where?: CanvasRoomWhereInput
    /**
     * Limit how many CanvasRooms to delete.
     */
    limit?: number
  }

  /**
   * CanvasRoom.users
   */
  export type CanvasRoom$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    where?: RoomUserWhereInput
    orderBy?: RoomUserOrderByWithRelationInput | RoomUserOrderByWithRelationInput[]
    cursor?: RoomUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomUserScalarFieldEnum | RoomUserScalarFieldEnum[]
  }

  /**
   * CanvasRoom.elements
   */
  export type CanvasRoom$elementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    cursor?: ElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * CanvasRoom without action
   */
  export type CanvasRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasRoom
     */
    select?: CanvasRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CanvasRoom
     */
    omit?: CanvasRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasRoomInclude<ExtArgs> | null
  }


  /**
   * Model Element
   */

  export type AggregateElement = {
    _count: ElementCountAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  export type ElementMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    type: $Enums.ShapeTypes | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElementMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    type: $Enums.ShapeTypes | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElementCountAggregateOutputType = {
    id: number
    roomId: number
    senderId: number
    type: number
    data: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ElementMinAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElementMaxAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElementCountAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    type?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ElementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Element to aggregate.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Elements
    **/
    _count?: true | ElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementMaxAggregateInputType
  }

  export type GetElementAggregateType<T extends ElementAggregateArgs> = {
        [P in keyof T & keyof AggregateElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElement[P]>
      : GetScalarType<T[P], AggregateElement[P]>
  }




  export type ElementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithAggregationInput | ElementOrderByWithAggregationInput[]
    by: ElementScalarFieldEnum[] | ElementScalarFieldEnum
    having?: ElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementCountAggregateInputType | true
    _min?: ElementMinAggregateInputType
    _max?: ElementMaxAggregateInputType
  }

  export type ElementGroupByOutputType = {
    id: string
    roomId: string
    senderId: string
    type: $Enums.ShapeTypes
    data: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: ElementCountAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  type GetElementGroupByPayload<T extends ElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementGroupByOutputType[P]>
            : GetScalarType<T[P], ElementGroupByOutputType[P]>
        }
      >
    >


  export type ElementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    type?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    type?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    type?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectScalar = {
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    type?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ElementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "senderId" | "type" | "data" | "createdAt" | "updatedAt", ExtArgs["result"]["element"]>
  export type ElementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ElementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ElementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ElementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Element"
    objects: {
      room: Prisma.$CanvasRoomPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      senderId: string
      type: $Enums.ShapeTypes
      data: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["element"]>
    composites: {}
  }

  type ElementGetPayload<S extends boolean | null | undefined | ElementDefaultArgs> = $Result.GetResult<Prisma.$ElementPayload, S>

  type ElementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementCountAggregateInputType | true
    }

  export interface ElementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Element'], meta: { name: 'Element' } }
    /**
     * Find zero or one Element that matches the filter.
     * @param {ElementFindUniqueArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementFindUniqueArgs>(args: SelectSubset<T, ElementFindUniqueArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Element that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementFindUniqueOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementFindFirstArgs>(args?: SelectSubset<T, ElementFindFirstArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elements
     * const elements = await prisma.element.findMany()
     * 
     * // Get first 10 Elements
     * const elements = await prisma.element.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const elementWithIdOnly = await prisma.element.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElementFindManyArgs>(args?: SelectSubset<T, ElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Element.
     * @param {ElementCreateArgs} args - Arguments to create a Element.
     * @example
     * // Create one Element
     * const Element = await prisma.element.create({
     *   data: {
     *     // ... data to create a Element
     *   }
     * })
     * 
     */
    create<T extends ElementCreateArgs>(args: SelectSubset<T, ElementCreateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elements.
     * @param {ElementCreateManyArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementCreateManyArgs>(args?: SelectSubset<T, ElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Elements and returns the data saved in the database.
     * @param {ElementCreateManyAndReturnArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Element.
     * @param {ElementDeleteArgs} args - Arguments to delete one Element.
     * @example
     * // Delete one Element
     * const Element = await prisma.element.delete({
     *   where: {
     *     // ... filter to delete one Element
     *   }
     * })
     * 
     */
    delete<T extends ElementDeleteArgs>(args: SelectSubset<T, ElementDeleteArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Element.
     * @param {ElementUpdateArgs} args - Arguments to update one Element.
     * @example
     * // Update one Element
     * const element = await prisma.element.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementUpdateArgs>(args: SelectSubset<T, ElementUpdateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elements.
     * @param {ElementDeleteManyArgs} args - Arguments to filter Elements to delete.
     * @example
     * // Delete a few Elements
     * const { count } = await prisma.element.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementDeleteManyArgs>(args?: SelectSubset<T, ElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementUpdateManyArgs>(args: SelectSubset<T, ElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements and returns the data updated in the database.
     * @param {ElementUpdateManyAndReturnArgs} args - Arguments to update many Elements.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.updateManyAndReturn({
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
    updateManyAndReturn<T extends ElementUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Element.
     * @param {ElementUpsertArgs} args - Arguments to update or create a Element.
     * @example
     * // Update or create a Element
     * const element = await prisma.element.upsert({
     *   create: {
     *     // ... data to create a Element
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Element we want to update
     *   }
     * })
     */
    upsert<T extends ElementUpsertArgs>(args: SelectSubset<T, ElementUpsertArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementCountArgs} args - Arguments to filter Elements to count.
     * @example
     * // Count the number of Elements
     * const count = await prisma.element.count({
     *   where: {
     *     // ... the filter for the Elements we want to count
     *   }
     * })
    **/
    count<T extends ElementCountArgs>(
      args?: Subset<T, ElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ElementAggregateArgs>(args: Subset<T, ElementAggregateArgs>): Prisma.PrismaPromise<GetElementAggregateType<T>>

    /**
     * Group by Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementGroupByArgs} args - Group by arguments.
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
      T extends ElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementGroupByArgs['orderBy'] }
        : { orderBy?: ElementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Element model
   */
  readonly fields: ElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Element.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends CanvasRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CanvasRoomDefaultArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Element model
   */
  interface ElementFieldRefs {
    readonly id: FieldRef<"Element", 'String'>
    readonly roomId: FieldRef<"Element", 'String'>
    readonly senderId: FieldRef<"Element", 'String'>
    readonly type: FieldRef<"Element", 'ShapeTypes'>
    readonly data: FieldRef<"Element", 'Json'>
    readonly createdAt: FieldRef<"Element", 'DateTime'>
    readonly updatedAt: FieldRef<"Element", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Element findUnique
   */
  export type ElementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findUniqueOrThrow
   */
  export type ElementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findFirst
   */
  export type ElementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findFirstOrThrow
   */
  export type ElementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findMany
   */
  export type ElementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Elements to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element create
   */
  export type ElementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to create a Element.
     */
    data: XOR<ElementCreateInput, ElementUncheckedCreateInput>
  }

  /**
   * Element createMany
   */
  export type ElementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Element createManyAndReturn
   */
  export type ElementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Element update
   */
  export type ElementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to update a Element.
     */
    data: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
    /**
     * Choose, which Element to update.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element updateMany
   */
  export type ElementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
  }

  /**
   * Element updateManyAndReturn
   */
  export type ElementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Element upsert
   */
  export type ElementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The filter to search for the Element to update in case it exists.
     */
    where: ElementWhereUniqueInput
    /**
     * In case the Element found by the `where` argument doesn't exist, create a new Element with this data.
     */
    create: XOR<ElementCreateInput, ElementUncheckedCreateInput>
    /**
     * In case the Element was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
  }

  /**
   * Element delete
   */
  export type ElementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter which Element to delete.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element deleteMany
   */
  export type ElementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elements to delete
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to delete.
     */
    limit?: number
  }

  /**
   * Element without action
   */
  export type ElementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
  }


  /**
   * Model RoomUser
   */

  export type AggregateRoomUser = {
    _count: RoomUserCountAggregateOutputType | null
    _min: RoomUserMinAggregateOutputType | null
    _max: RoomUserMaxAggregateOutputType | null
  }

  export type RoomUserMinAggregateOutputType = {
    userId: string | null
    roomId: string | null
    joinedAt: Date | null
  }

  export type RoomUserMaxAggregateOutputType = {
    userId: string | null
    roomId: string | null
    joinedAt: Date | null
  }

  export type RoomUserCountAggregateOutputType = {
    userId: number
    roomId: number
    joinedAt: number
    _all: number
  }


  export type RoomUserMinAggregateInputType = {
    userId?: true
    roomId?: true
    joinedAt?: true
  }

  export type RoomUserMaxAggregateInputType = {
    userId?: true
    roomId?: true
    joinedAt?: true
  }

  export type RoomUserCountAggregateInputType = {
    userId?: true
    roomId?: true
    joinedAt?: true
    _all?: true
  }

  export type RoomUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomUser to aggregate.
     */
    where?: RoomUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsers to fetch.
     */
    orderBy?: RoomUserOrderByWithRelationInput | RoomUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomUsers
    **/
    _count?: true | RoomUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomUserMaxAggregateInputType
  }

  export type GetRoomUserAggregateType<T extends RoomUserAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomUser[P]>
      : GetScalarType<T[P], AggregateRoomUser[P]>
  }




  export type RoomUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomUserWhereInput
    orderBy?: RoomUserOrderByWithAggregationInput | RoomUserOrderByWithAggregationInput[]
    by: RoomUserScalarFieldEnum[] | RoomUserScalarFieldEnum
    having?: RoomUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomUserCountAggregateInputType | true
    _min?: RoomUserMinAggregateInputType
    _max?: RoomUserMaxAggregateInputType
  }

  export type RoomUserGroupByOutputType = {
    userId: string
    roomId: string
    joinedAt: Date
    _count: RoomUserCountAggregateOutputType | null
    _min: RoomUserMinAggregateOutputType | null
    _max: RoomUserMaxAggregateOutputType | null
  }

  type GetRoomUserGroupByPayload<T extends RoomUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomUserGroupByOutputType[P]>
            : GetScalarType<T[P], RoomUserGroupByOutputType[P]>
        }
      >
    >


  export type RoomUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    roomId?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomUser"]>

  export type RoomUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    roomId?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomUser"]>

  export type RoomUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    roomId?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomUser"]>

  export type RoomUserSelectScalar = {
    userId?: boolean
    roomId?: boolean
    joinedAt?: boolean
  }

  export type RoomUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "roomId" | "joinedAt", ExtArgs["result"]["roomUser"]>
  export type RoomUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
  }
  export type RoomUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
  }
  export type RoomUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | CanvasRoomDefaultArgs<ExtArgs>
  }

  export type $RoomUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      room: Prisma.$CanvasRoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      roomId: string
      joinedAt: Date
    }, ExtArgs["result"]["roomUser"]>
    composites: {}
  }

  type RoomUserGetPayload<S extends boolean | null | undefined | RoomUserDefaultArgs> = $Result.GetResult<Prisma.$RoomUserPayload, S>

  type RoomUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomUserCountAggregateInputType | true
    }

  export interface RoomUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomUser'], meta: { name: 'RoomUser' } }
    /**
     * Find zero or one RoomUser that matches the filter.
     * @param {RoomUserFindUniqueArgs} args - Arguments to find a RoomUser
     * @example
     * // Get one RoomUser
     * const roomUser = await prisma.roomUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomUserFindUniqueArgs>(args: SelectSubset<T, RoomUserFindUniqueArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomUserFindUniqueOrThrowArgs} args - Arguments to find a RoomUser
     * @example
     * // Get one RoomUser
     * const roomUser = await prisma.roomUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomUserFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUserFindFirstArgs} args - Arguments to find a RoomUser
     * @example
     * // Get one RoomUser
     * const roomUser = await prisma.roomUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomUserFindFirstArgs>(args?: SelectSubset<T, RoomUserFindFirstArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUserFindFirstOrThrowArgs} args - Arguments to find a RoomUser
     * @example
     * // Get one RoomUser
     * const roomUser = await prisma.roomUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomUserFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomUsers
     * const roomUsers = await prisma.roomUser.findMany()
     * 
     * // Get first 10 RoomUsers
     * const roomUsers = await prisma.roomUser.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const roomUserWithUserIdOnly = await prisma.roomUser.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends RoomUserFindManyArgs>(args?: SelectSubset<T, RoomUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomUser.
     * @param {RoomUserCreateArgs} args - Arguments to create a RoomUser.
     * @example
     * // Create one RoomUser
     * const RoomUser = await prisma.roomUser.create({
     *   data: {
     *     // ... data to create a RoomUser
     *   }
     * })
     * 
     */
    create<T extends RoomUserCreateArgs>(args: SelectSubset<T, RoomUserCreateArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomUsers.
     * @param {RoomUserCreateManyArgs} args - Arguments to create many RoomUsers.
     * @example
     * // Create many RoomUsers
     * const roomUser = await prisma.roomUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomUserCreateManyArgs>(args?: SelectSubset<T, RoomUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomUsers and returns the data saved in the database.
     * @param {RoomUserCreateManyAndReturnArgs} args - Arguments to create many RoomUsers.
     * @example
     * // Create many RoomUsers
     * const roomUser = await prisma.roomUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomUsers and only return the `userId`
     * const roomUserWithUserIdOnly = await prisma.roomUser.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomUserCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomUser.
     * @param {RoomUserDeleteArgs} args - Arguments to delete one RoomUser.
     * @example
     * // Delete one RoomUser
     * const RoomUser = await prisma.roomUser.delete({
     *   where: {
     *     // ... filter to delete one RoomUser
     *   }
     * })
     * 
     */
    delete<T extends RoomUserDeleteArgs>(args: SelectSubset<T, RoomUserDeleteArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomUser.
     * @param {RoomUserUpdateArgs} args - Arguments to update one RoomUser.
     * @example
     * // Update one RoomUser
     * const roomUser = await prisma.roomUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUserUpdateArgs>(args: SelectSubset<T, RoomUserUpdateArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomUsers.
     * @param {RoomUserDeleteManyArgs} args - Arguments to filter RoomUsers to delete.
     * @example
     * // Delete a few RoomUsers
     * const { count } = await prisma.roomUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomUserDeleteManyArgs>(args?: SelectSubset<T, RoomUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomUsers
     * const roomUser = await prisma.roomUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUserUpdateManyArgs>(args: SelectSubset<T, RoomUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomUsers and returns the data updated in the database.
     * @param {RoomUserUpdateManyAndReturnArgs} args - Arguments to update many RoomUsers.
     * @example
     * // Update many RoomUsers
     * const roomUser = await prisma.roomUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomUsers and only return the `userId`
     * const roomUserWithUserIdOnly = await prisma.roomUser.updateManyAndReturn({
     *   select: { userId: true },
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
    updateManyAndReturn<T extends RoomUserUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomUser.
     * @param {RoomUserUpsertArgs} args - Arguments to update or create a RoomUser.
     * @example
     * // Update or create a RoomUser
     * const roomUser = await prisma.roomUser.upsert({
     *   create: {
     *     // ... data to create a RoomUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomUser we want to update
     *   }
     * })
     */
    upsert<T extends RoomUserUpsertArgs>(args: SelectSubset<T, RoomUserUpsertArgs<ExtArgs>>): Prisma__RoomUserClient<$Result.GetResult<Prisma.$RoomUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUserCountArgs} args - Arguments to filter RoomUsers to count.
     * @example
     * // Count the number of RoomUsers
     * const count = await prisma.roomUser.count({
     *   where: {
     *     // ... the filter for the RoomUsers we want to count
     *   }
     * })
    **/
    count<T extends RoomUserCountArgs>(
      args?: Subset<T, RoomUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomUserAggregateArgs>(args: Subset<T, RoomUserAggregateArgs>): Prisma.PrismaPromise<GetRoomUserAggregateType<T>>

    /**
     * Group by RoomUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUserGroupByArgs} args - Group by arguments.
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
      T extends RoomUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomUserGroupByArgs['orderBy'] }
        : { orderBy?: RoomUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomUser model
   */
  readonly fields: RoomUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends CanvasRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CanvasRoomDefaultArgs<ExtArgs>>): Prisma__CanvasRoomClient<$Result.GetResult<Prisma.$CanvasRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RoomUser model
   */
  interface RoomUserFieldRefs {
    readonly userId: FieldRef<"RoomUser", 'String'>
    readonly roomId: FieldRef<"RoomUser", 'String'>
    readonly joinedAt: FieldRef<"RoomUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomUser findUnique
   */
  export type RoomUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * Filter, which RoomUser to fetch.
     */
    where: RoomUserWhereUniqueInput
  }

  /**
   * RoomUser findUniqueOrThrow
   */
  export type RoomUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * Filter, which RoomUser to fetch.
     */
    where: RoomUserWhereUniqueInput
  }

  /**
   * RoomUser findFirst
   */
  export type RoomUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * Filter, which RoomUser to fetch.
     */
    where?: RoomUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsers to fetch.
     */
    orderBy?: RoomUserOrderByWithRelationInput | RoomUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomUsers.
     */
    cursor?: RoomUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomUsers.
     */
    distinct?: RoomUserScalarFieldEnum | RoomUserScalarFieldEnum[]
  }

  /**
   * RoomUser findFirstOrThrow
   */
  export type RoomUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * Filter, which RoomUser to fetch.
     */
    where?: RoomUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsers to fetch.
     */
    orderBy?: RoomUserOrderByWithRelationInput | RoomUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomUsers.
     */
    cursor?: RoomUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomUsers.
     */
    distinct?: RoomUserScalarFieldEnum | RoomUserScalarFieldEnum[]
  }

  /**
   * RoomUser findMany
   */
  export type RoomUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * Filter, which RoomUsers to fetch.
     */
    where?: RoomUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsers to fetch.
     */
    orderBy?: RoomUserOrderByWithRelationInput | RoomUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomUsers.
     */
    cursor?: RoomUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsers.
     */
    skip?: number
    distinct?: RoomUserScalarFieldEnum | RoomUserScalarFieldEnum[]
  }

  /**
   * RoomUser create
   */
  export type RoomUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomUser.
     */
    data: XOR<RoomUserCreateInput, RoomUserUncheckedCreateInput>
  }

  /**
   * RoomUser createMany
   */
  export type RoomUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomUsers.
     */
    data: RoomUserCreateManyInput | RoomUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomUser createManyAndReturn
   */
  export type RoomUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * The data used to create many RoomUsers.
     */
    data: RoomUserCreateManyInput | RoomUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomUser update
   */
  export type RoomUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomUser.
     */
    data: XOR<RoomUserUpdateInput, RoomUserUncheckedUpdateInput>
    /**
     * Choose, which RoomUser to update.
     */
    where: RoomUserWhereUniqueInput
  }

  /**
   * RoomUser updateMany
   */
  export type RoomUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomUsers.
     */
    data: XOR<RoomUserUpdateManyMutationInput, RoomUserUncheckedUpdateManyInput>
    /**
     * Filter which RoomUsers to update
     */
    where?: RoomUserWhereInput
    /**
     * Limit how many RoomUsers to update.
     */
    limit?: number
  }

  /**
   * RoomUser updateManyAndReturn
   */
  export type RoomUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * The data used to update RoomUsers.
     */
    data: XOR<RoomUserUpdateManyMutationInput, RoomUserUncheckedUpdateManyInput>
    /**
     * Filter which RoomUsers to update
     */
    where?: RoomUserWhereInput
    /**
     * Limit how many RoomUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomUser upsert
   */
  export type RoomUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomUser to update in case it exists.
     */
    where: RoomUserWhereUniqueInput
    /**
     * In case the RoomUser found by the `where` argument doesn't exist, create a new RoomUser with this data.
     */
    create: XOR<RoomUserCreateInput, RoomUserUncheckedCreateInput>
    /**
     * In case the RoomUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUserUpdateInput, RoomUserUncheckedUpdateInput>
  }

  /**
   * RoomUser delete
   */
  export type RoomUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
    /**
     * Filter which RoomUser to delete.
     */
    where: RoomUserWhereUniqueInput
  }

  /**
   * RoomUser deleteMany
   */
  export type RoomUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomUsers to delete
     */
    where?: RoomUserWhereInput
    /**
     * Limit how many RoomUsers to delete.
     */
    limit?: number
  }

  /**
   * RoomUser without action
   */
  export type RoomUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUser
     */
    select?: RoomUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUser
     */
    omit?: RoomUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomUserInclude<ExtArgs> | null
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
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CanvasRoomScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    adminId: 'adminId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CanvasRoomScalarFieldEnum = (typeof CanvasRoomScalarFieldEnum)[keyof typeof CanvasRoomScalarFieldEnum]


  export const ElementScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    senderId: 'senderId',
    type: 'type',
    data: 'data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ElementScalarFieldEnum = (typeof ElementScalarFieldEnum)[keyof typeof ElementScalarFieldEnum]


  export const RoomUserScalarFieldEnum: {
    userId: 'userId',
    roomId: 'roomId',
    joinedAt: 'joinedAt'
  };

  export type RoomUserScalarFieldEnum = (typeof RoomUserScalarFieldEnum)[keyof typeof RoomUserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'ShapeTypes'
   */
  export type EnumShapeTypesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShapeTypes'>
    


  /**
   * Reference to a field of type 'ShapeTypes[]'
   */
  export type ListEnumShapeTypesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShapeTypes[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
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
    createdAt?: DateTimeFilter<"User"> | Date | string
    rooms?: RoomUserListRelationFilter
    adminRooms?: CanvasRoomListRelationFilter
    elements?: ElementListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    rooms?: RoomUserOrderByRelationAggregateInput
    adminRooms?: CanvasRoomOrderByRelationAggregateInput
    elements?: ElementOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    rooms?: RoomUserListRelationFilter
    adminRooms?: CanvasRoomListRelationFilter
    elements?: ElementListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
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
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CanvasRoomWhereInput = {
    AND?: CanvasRoomWhereInput | CanvasRoomWhereInput[]
    OR?: CanvasRoomWhereInput[]
    NOT?: CanvasRoomWhereInput | CanvasRoomWhereInput[]
    id?: StringFilter<"CanvasRoom"> | string
    slug?: StringFilter<"CanvasRoom"> | string
    adminId?: StringFilter<"CanvasRoom"> | string
    createdAt?: DateTimeFilter<"CanvasRoom"> | Date | string
    updatedAt?: DateTimeFilter<"CanvasRoom"> | Date | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    users?: RoomUserListRelationFilter
    elements?: ElementListRelationFilter
  }

  export type CanvasRoomOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    admin?: UserOrderByWithRelationInput
    users?: RoomUserOrderByRelationAggregateInput
    elements?: ElementOrderByRelationAggregateInput
  }

  export type CanvasRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CanvasRoomWhereInput | CanvasRoomWhereInput[]
    OR?: CanvasRoomWhereInput[]
    NOT?: CanvasRoomWhereInput | CanvasRoomWhereInput[]
    adminId?: StringFilter<"CanvasRoom"> | string
    createdAt?: DateTimeFilter<"CanvasRoom"> | Date | string
    updatedAt?: DateTimeFilter<"CanvasRoom"> | Date | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    users?: RoomUserListRelationFilter
    elements?: ElementListRelationFilter
  }, "id" | "slug">

  export type CanvasRoomOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CanvasRoomCountOrderByAggregateInput
    _max?: CanvasRoomMaxOrderByAggregateInput
    _min?: CanvasRoomMinOrderByAggregateInput
  }

  export type CanvasRoomScalarWhereWithAggregatesInput = {
    AND?: CanvasRoomScalarWhereWithAggregatesInput | CanvasRoomScalarWhereWithAggregatesInput[]
    OR?: CanvasRoomScalarWhereWithAggregatesInput[]
    NOT?: CanvasRoomScalarWhereWithAggregatesInput | CanvasRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CanvasRoom"> | string
    slug?: StringWithAggregatesFilter<"CanvasRoom"> | string
    adminId?: StringWithAggregatesFilter<"CanvasRoom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CanvasRoom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CanvasRoom"> | Date | string
  }

  export type ElementWhereInput = {
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    id?: StringFilter<"Element"> | string
    roomId?: StringFilter<"Element"> | string
    senderId?: StringFilter<"Element"> | string
    type?: EnumShapeTypesFilter<"Element"> | $Enums.ShapeTypes
    data?: JsonFilter<"Element">
    createdAt?: DateTimeFilter<"Element"> | Date | string
    updatedAt?: DateTimeFilter<"Element"> | Date | string
    room?: XOR<CanvasRoomScalarRelationFilter, CanvasRoomWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ElementOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: CanvasRoomOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type ElementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    roomId?: StringFilter<"Element"> | string
    senderId?: StringFilter<"Element"> | string
    type?: EnumShapeTypesFilter<"Element"> | $Enums.ShapeTypes
    data?: JsonFilter<"Element">
    createdAt?: DateTimeFilter<"Element"> | Date | string
    updatedAt?: DateTimeFilter<"Element"> | Date | string
    room?: XOR<CanvasRoomScalarRelationFilter, CanvasRoomWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ElementOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ElementCountOrderByAggregateInput
    _max?: ElementMaxOrderByAggregateInput
    _min?: ElementMinOrderByAggregateInput
  }

  export type ElementScalarWhereWithAggregatesInput = {
    AND?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    OR?: ElementScalarWhereWithAggregatesInput[]
    NOT?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Element"> | string
    roomId?: StringWithAggregatesFilter<"Element"> | string
    senderId?: StringWithAggregatesFilter<"Element"> | string
    type?: EnumShapeTypesWithAggregatesFilter<"Element"> | $Enums.ShapeTypes
    data?: JsonWithAggregatesFilter<"Element">
    createdAt?: DateTimeWithAggregatesFilter<"Element"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Element"> | Date | string
  }

  export type RoomUserWhereInput = {
    AND?: RoomUserWhereInput | RoomUserWhereInput[]
    OR?: RoomUserWhereInput[]
    NOT?: RoomUserWhereInput | RoomUserWhereInput[]
    userId?: StringFilter<"RoomUser"> | string
    roomId?: StringFilter<"RoomUser"> | string
    joinedAt?: DateTimeFilter<"RoomUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<CanvasRoomScalarRelationFilter, CanvasRoomWhereInput>
  }

  export type RoomUserOrderByWithRelationInput = {
    userId?: SortOrder
    roomId?: SortOrder
    joinedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    room?: CanvasRoomOrderByWithRelationInput
  }

  export type RoomUserWhereUniqueInput = Prisma.AtLeast<{
    userId_roomId?: RoomUserUserIdRoomIdCompoundUniqueInput
    AND?: RoomUserWhereInput | RoomUserWhereInput[]
    OR?: RoomUserWhereInput[]
    NOT?: RoomUserWhereInput | RoomUserWhereInput[]
    userId?: StringFilter<"RoomUser"> | string
    roomId?: StringFilter<"RoomUser"> | string
    joinedAt?: DateTimeFilter<"RoomUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<CanvasRoomScalarRelationFilter, CanvasRoomWhereInput>
  }, "userId_roomId">

  export type RoomUserOrderByWithAggregationInput = {
    userId?: SortOrder
    roomId?: SortOrder
    joinedAt?: SortOrder
    _count?: RoomUserCountOrderByAggregateInput
    _max?: RoomUserMaxOrderByAggregateInput
    _min?: RoomUserMinOrderByAggregateInput
  }

  export type RoomUserScalarWhereWithAggregatesInput = {
    AND?: RoomUserScalarWhereWithAggregatesInput | RoomUserScalarWhereWithAggregatesInput[]
    OR?: RoomUserScalarWhereWithAggregatesInput[]
    NOT?: RoomUserScalarWhereWithAggregatesInput | RoomUserScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"RoomUser"> | string
    roomId?: StringWithAggregatesFilter<"RoomUser"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"RoomUser"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    rooms?: RoomUserCreateNestedManyWithoutUserInput
    adminRooms?: CanvasRoomCreateNestedManyWithoutAdminInput
    elements?: ElementCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    rooms?: RoomUserUncheckedCreateNestedManyWithoutUserInput
    adminRooms?: CanvasRoomUncheckedCreateNestedManyWithoutAdminInput
    elements?: ElementUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUserUpdateManyWithoutUserNestedInput
    adminRooms?: CanvasRoomUpdateManyWithoutAdminNestedInput
    elements?: ElementUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUserUncheckedUpdateManyWithoutUserNestedInput
    adminRooms?: CanvasRoomUncheckedUpdateManyWithoutAdminNestedInput
    elements?: ElementUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CanvasRoomCreateInput = {
    id?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutAdminRoomsInput
    users?: RoomUserCreateNestedManyWithoutRoomInput
    elements?: ElementCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomUncheckedCreateInput = {
    id?: string
    slug: string
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: RoomUserUncheckedCreateNestedManyWithoutRoomInput
    elements?: ElementUncheckedCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutAdminRoomsNestedInput
    users?: RoomUserUpdateManyWithoutRoomNestedInput
    elements?: ElementUpdateManyWithoutRoomNestedInput
  }

  export type CanvasRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: RoomUserUncheckedUpdateManyWithoutRoomNestedInput
    elements?: ElementUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type CanvasRoomCreateManyInput = {
    id?: string
    slug: string
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CanvasRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CanvasRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementCreateInput = {
    id?: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    room: CanvasRoomCreateNestedOneWithoutElementsInput
    sender: UserCreateNestedOneWithoutElementsInput
  }

  export type ElementUncheckedCreateInput = {
    id?: string
    roomId: string
    senderId: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: CanvasRoomUpdateOneRequiredWithoutElementsNestedInput
    sender?: UserUpdateOneRequiredWithoutElementsNestedInput
  }

  export type ElementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementCreateManyInput = {
    id?: string
    roomId: string
    senderId: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUserCreateInput = {
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutRoomsInput
    room: CanvasRoomCreateNestedOneWithoutUsersInput
  }

  export type RoomUserUncheckedCreateInput = {
    userId: string
    roomId: string
    joinedAt?: Date | string
  }

  export type RoomUserUpdateInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoomsNestedInput
    room?: CanvasRoomUpdateOneRequiredWithoutUsersNestedInput
  }

  export type RoomUserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUserCreateManyInput = {
    userId: string
    roomId: string
    joinedAt?: Date | string
  }

  export type RoomUserUpdateManyMutationInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type RoomUserListRelationFilter = {
    every?: RoomUserWhereInput
    some?: RoomUserWhereInput
    none?: RoomUserWhereInput
  }

  export type CanvasRoomListRelationFilter = {
    every?: CanvasRoomWhereInput
    some?: CanvasRoomWhereInput
    none?: CanvasRoomWhereInput
  }

  export type ElementListRelationFilter = {
    every?: ElementWhereInput
    some?: ElementWhereInput
    none?: ElementWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoomUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CanvasRoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CanvasRoomCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CanvasRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CanvasRoomMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumShapeTypesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShapeTypes | EnumShapeTypesFieldRefInput<$PrismaModel>
    in?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumShapeTypesFilter<$PrismaModel> | $Enums.ShapeTypes
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CanvasRoomScalarRelationFilter = {
    is?: CanvasRoomWhereInput
    isNot?: CanvasRoomWhereInput
  }

  export type ElementCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElementMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElementMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumShapeTypesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShapeTypes | EnumShapeTypesFieldRefInput<$PrismaModel>
    in?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumShapeTypesWithAggregatesFilter<$PrismaModel> | $Enums.ShapeTypes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShapeTypesFilter<$PrismaModel>
    _max?: NestedEnumShapeTypesFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type RoomUserUserIdRoomIdCompoundUniqueInput = {
    userId: string
    roomId: string
  }

  export type RoomUserCountOrderByAggregateInput = {
    userId?: SortOrder
    roomId?: SortOrder
    joinedAt?: SortOrder
  }

  export type RoomUserMaxOrderByAggregateInput = {
    userId?: SortOrder
    roomId?: SortOrder
    joinedAt?: SortOrder
  }

  export type RoomUserMinOrderByAggregateInput = {
    userId?: SortOrder
    roomId?: SortOrder
    joinedAt?: SortOrder
  }

  export type RoomUserCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomUserCreateWithoutUserInput, RoomUserUncheckedCreateWithoutUserInput> | RoomUserCreateWithoutUserInput[] | RoomUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutUserInput | RoomUserCreateOrConnectWithoutUserInput[]
    createMany?: RoomUserCreateManyUserInputEnvelope
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
  }

  export type CanvasRoomCreateNestedManyWithoutAdminInput = {
    create?: XOR<CanvasRoomCreateWithoutAdminInput, CanvasRoomUncheckedCreateWithoutAdminInput> | CanvasRoomCreateWithoutAdminInput[] | CanvasRoomUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutAdminInput | CanvasRoomCreateOrConnectWithoutAdminInput[]
    createMany?: CanvasRoomCreateManyAdminInputEnvelope
    connect?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
  }

  export type ElementCreateNestedManyWithoutSenderInput = {
    create?: XOR<ElementCreateWithoutSenderInput, ElementUncheckedCreateWithoutSenderInput> | ElementCreateWithoutSenderInput[] | ElementUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSenderInput | ElementCreateOrConnectWithoutSenderInput[]
    createMany?: ElementCreateManySenderInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type RoomUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomUserCreateWithoutUserInput, RoomUserUncheckedCreateWithoutUserInput> | RoomUserCreateWithoutUserInput[] | RoomUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutUserInput | RoomUserCreateOrConnectWithoutUserInput[]
    createMany?: RoomUserCreateManyUserInputEnvelope
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
  }

  export type CanvasRoomUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<CanvasRoomCreateWithoutAdminInput, CanvasRoomUncheckedCreateWithoutAdminInput> | CanvasRoomCreateWithoutAdminInput[] | CanvasRoomUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutAdminInput | CanvasRoomCreateOrConnectWithoutAdminInput[]
    createMany?: CanvasRoomCreateManyAdminInputEnvelope
    connect?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
  }

  export type ElementUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<ElementCreateWithoutSenderInput, ElementUncheckedCreateWithoutSenderInput> | ElementCreateWithoutSenderInput[] | ElementUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSenderInput | ElementCreateOrConnectWithoutSenderInput[]
    createMany?: ElementCreateManySenderInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
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

  export type RoomUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomUserCreateWithoutUserInput, RoomUserUncheckedCreateWithoutUserInput> | RoomUserCreateWithoutUserInput[] | RoomUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutUserInput | RoomUserCreateOrConnectWithoutUserInput[]
    upsert?: RoomUserUpsertWithWhereUniqueWithoutUserInput | RoomUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomUserCreateManyUserInputEnvelope
    set?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    disconnect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    delete?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    update?: RoomUserUpdateWithWhereUniqueWithoutUserInput | RoomUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomUserUpdateManyWithWhereWithoutUserInput | RoomUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomUserScalarWhereInput | RoomUserScalarWhereInput[]
  }

  export type CanvasRoomUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CanvasRoomCreateWithoutAdminInput, CanvasRoomUncheckedCreateWithoutAdminInput> | CanvasRoomCreateWithoutAdminInput[] | CanvasRoomUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutAdminInput | CanvasRoomCreateOrConnectWithoutAdminInput[]
    upsert?: CanvasRoomUpsertWithWhereUniqueWithoutAdminInput | CanvasRoomUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CanvasRoomCreateManyAdminInputEnvelope
    set?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    disconnect?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    delete?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    connect?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    update?: CanvasRoomUpdateWithWhereUniqueWithoutAdminInput | CanvasRoomUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CanvasRoomUpdateManyWithWhereWithoutAdminInput | CanvasRoomUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CanvasRoomScalarWhereInput | CanvasRoomScalarWhereInput[]
  }

  export type ElementUpdateManyWithoutSenderNestedInput = {
    create?: XOR<ElementCreateWithoutSenderInput, ElementUncheckedCreateWithoutSenderInput> | ElementCreateWithoutSenderInput[] | ElementUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSenderInput | ElementCreateOrConnectWithoutSenderInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutSenderInput | ElementUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: ElementCreateManySenderInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutSenderInput | ElementUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutSenderInput | ElementUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type RoomUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomUserCreateWithoutUserInput, RoomUserUncheckedCreateWithoutUserInput> | RoomUserCreateWithoutUserInput[] | RoomUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutUserInput | RoomUserCreateOrConnectWithoutUserInput[]
    upsert?: RoomUserUpsertWithWhereUniqueWithoutUserInput | RoomUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomUserCreateManyUserInputEnvelope
    set?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    disconnect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    delete?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    update?: RoomUserUpdateWithWhereUniqueWithoutUserInput | RoomUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomUserUpdateManyWithWhereWithoutUserInput | RoomUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomUserScalarWhereInput | RoomUserScalarWhereInput[]
  }

  export type CanvasRoomUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CanvasRoomCreateWithoutAdminInput, CanvasRoomUncheckedCreateWithoutAdminInput> | CanvasRoomCreateWithoutAdminInput[] | CanvasRoomUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutAdminInput | CanvasRoomCreateOrConnectWithoutAdminInput[]
    upsert?: CanvasRoomUpsertWithWhereUniqueWithoutAdminInput | CanvasRoomUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CanvasRoomCreateManyAdminInputEnvelope
    set?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    disconnect?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    delete?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    connect?: CanvasRoomWhereUniqueInput | CanvasRoomWhereUniqueInput[]
    update?: CanvasRoomUpdateWithWhereUniqueWithoutAdminInput | CanvasRoomUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CanvasRoomUpdateManyWithWhereWithoutAdminInput | CanvasRoomUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CanvasRoomScalarWhereInput | CanvasRoomScalarWhereInput[]
  }

  export type ElementUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<ElementCreateWithoutSenderInput, ElementUncheckedCreateWithoutSenderInput> | ElementCreateWithoutSenderInput[] | ElementUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSenderInput | ElementCreateOrConnectWithoutSenderInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutSenderInput | ElementUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: ElementCreateManySenderInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutSenderInput | ElementUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutSenderInput | ElementUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAdminRoomsInput = {
    create?: XOR<UserCreateWithoutAdminRoomsInput, UserUncheckedCreateWithoutAdminRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminRoomsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomUserCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomUserCreateWithoutRoomInput, RoomUserUncheckedCreateWithoutRoomInput> | RoomUserCreateWithoutRoomInput[] | RoomUserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutRoomInput | RoomUserCreateOrConnectWithoutRoomInput[]
    createMany?: RoomUserCreateManyRoomInputEnvelope
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
  }

  export type ElementCreateNestedManyWithoutRoomInput = {
    create?: XOR<ElementCreateWithoutRoomInput, ElementUncheckedCreateWithoutRoomInput> | ElementCreateWithoutRoomInput[] | ElementUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutRoomInput | ElementCreateOrConnectWithoutRoomInput[]
    createMany?: ElementCreateManyRoomInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type RoomUserUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomUserCreateWithoutRoomInput, RoomUserUncheckedCreateWithoutRoomInput> | RoomUserCreateWithoutRoomInput[] | RoomUserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutRoomInput | RoomUserCreateOrConnectWithoutRoomInput[]
    createMany?: RoomUserCreateManyRoomInputEnvelope
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
  }

  export type ElementUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ElementCreateWithoutRoomInput, ElementUncheckedCreateWithoutRoomInput> | ElementCreateWithoutRoomInput[] | ElementUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutRoomInput | ElementCreateOrConnectWithoutRoomInput[]
    createMany?: ElementCreateManyRoomInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAdminRoomsNestedInput = {
    create?: XOR<UserCreateWithoutAdminRoomsInput, UserUncheckedCreateWithoutAdminRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminRoomsInput
    upsert?: UserUpsertWithoutAdminRoomsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminRoomsInput, UserUpdateWithoutAdminRoomsInput>, UserUncheckedUpdateWithoutAdminRoomsInput>
  }

  export type RoomUserUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomUserCreateWithoutRoomInput, RoomUserUncheckedCreateWithoutRoomInput> | RoomUserCreateWithoutRoomInput[] | RoomUserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutRoomInput | RoomUserCreateOrConnectWithoutRoomInput[]
    upsert?: RoomUserUpsertWithWhereUniqueWithoutRoomInput | RoomUserUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomUserCreateManyRoomInputEnvelope
    set?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    disconnect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    delete?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    update?: RoomUserUpdateWithWhereUniqueWithoutRoomInput | RoomUserUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomUserUpdateManyWithWhereWithoutRoomInput | RoomUserUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomUserScalarWhereInput | RoomUserScalarWhereInput[]
  }

  export type ElementUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ElementCreateWithoutRoomInput, ElementUncheckedCreateWithoutRoomInput> | ElementCreateWithoutRoomInput[] | ElementUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutRoomInput | ElementCreateOrConnectWithoutRoomInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutRoomInput | ElementUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ElementCreateManyRoomInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutRoomInput | ElementUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutRoomInput | ElementUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type RoomUserUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomUserCreateWithoutRoomInput, RoomUserUncheckedCreateWithoutRoomInput> | RoomUserCreateWithoutRoomInput[] | RoomUserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomUserCreateOrConnectWithoutRoomInput | RoomUserCreateOrConnectWithoutRoomInput[]
    upsert?: RoomUserUpsertWithWhereUniqueWithoutRoomInput | RoomUserUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomUserCreateManyRoomInputEnvelope
    set?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    disconnect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    delete?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    connect?: RoomUserWhereUniqueInput | RoomUserWhereUniqueInput[]
    update?: RoomUserUpdateWithWhereUniqueWithoutRoomInput | RoomUserUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomUserUpdateManyWithWhereWithoutRoomInput | RoomUserUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomUserScalarWhereInput | RoomUserScalarWhereInput[]
  }

  export type ElementUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ElementCreateWithoutRoomInput, ElementUncheckedCreateWithoutRoomInput> | ElementCreateWithoutRoomInput[] | ElementUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutRoomInput | ElementCreateOrConnectWithoutRoomInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutRoomInput | ElementUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ElementCreateManyRoomInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutRoomInput | ElementUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutRoomInput | ElementUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type CanvasRoomCreateNestedOneWithoutElementsInput = {
    create?: XOR<CanvasRoomCreateWithoutElementsInput, CanvasRoomUncheckedCreateWithoutElementsInput>
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutElementsInput
    connect?: CanvasRoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutElementsInput = {
    create?: XOR<UserCreateWithoutElementsInput, UserUncheckedCreateWithoutElementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutElementsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumShapeTypesFieldUpdateOperationsInput = {
    set?: $Enums.ShapeTypes
  }

  export type CanvasRoomUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<CanvasRoomCreateWithoutElementsInput, CanvasRoomUncheckedCreateWithoutElementsInput>
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutElementsInput
    upsert?: CanvasRoomUpsertWithoutElementsInput
    connect?: CanvasRoomWhereUniqueInput
    update?: XOR<XOR<CanvasRoomUpdateToOneWithWhereWithoutElementsInput, CanvasRoomUpdateWithoutElementsInput>, CanvasRoomUncheckedUpdateWithoutElementsInput>
  }

  export type UserUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<UserCreateWithoutElementsInput, UserUncheckedCreateWithoutElementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutElementsInput
    upsert?: UserUpsertWithoutElementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutElementsInput, UserUpdateWithoutElementsInput>, UserUncheckedUpdateWithoutElementsInput>
  }

  export type UserCreateNestedOneWithoutRoomsInput = {
    create?: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomsInput
    connect?: UserWhereUniqueInput
  }

  export type CanvasRoomCreateNestedOneWithoutUsersInput = {
    create?: XOR<CanvasRoomCreateWithoutUsersInput, CanvasRoomUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutUsersInput
    connect?: CanvasRoomWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomsInput
    upsert?: UserUpsertWithoutRoomsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomsInput, UserUpdateWithoutRoomsInput>, UserUncheckedUpdateWithoutRoomsInput>
  }

  export type CanvasRoomUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CanvasRoomCreateWithoutUsersInput, CanvasRoomUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CanvasRoomCreateOrConnectWithoutUsersInput
    upsert?: CanvasRoomUpsertWithoutUsersInput
    connect?: CanvasRoomWhereUniqueInput
    update?: XOR<XOR<CanvasRoomUpdateToOneWithWhereWithoutUsersInput, CanvasRoomUpdateWithoutUsersInput>, CanvasRoomUncheckedUpdateWithoutUsersInput>
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

  export type NestedEnumShapeTypesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShapeTypes | EnumShapeTypesFieldRefInput<$PrismaModel>
    in?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumShapeTypesFilter<$PrismaModel> | $Enums.ShapeTypes
  }

  export type NestedEnumShapeTypesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShapeTypes | EnumShapeTypesFieldRefInput<$PrismaModel>
    in?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShapeTypes[] | ListEnumShapeTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumShapeTypesWithAggregatesFilter<$PrismaModel> | $Enums.ShapeTypes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShapeTypesFilter<$PrismaModel>
    _max?: NestedEnumShapeTypesFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RoomUserCreateWithoutUserInput = {
    joinedAt?: Date | string
    room: CanvasRoomCreateNestedOneWithoutUsersInput
  }

  export type RoomUserUncheckedCreateWithoutUserInput = {
    roomId: string
    joinedAt?: Date | string
  }

  export type RoomUserCreateOrConnectWithoutUserInput = {
    where: RoomUserWhereUniqueInput
    create: XOR<RoomUserCreateWithoutUserInput, RoomUserUncheckedCreateWithoutUserInput>
  }

  export type RoomUserCreateManyUserInputEnvelope = {
    data: RoomUserCreateManyUserInput | RoomUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CanvasRoomCreateWithoutAdminInput = {
    id?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: RoomUserCreateNestedManyWithoutRoomInput
    elements?: ElementCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomUncheckedCreateWithoutAdminInput = {
    id?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: RoomUserUncheckedCreateNestedManyWithoutRoomInput
    elements?: ElementUncheckedCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomCreateOrConnectWithoutAdminInput = {
    where: CanvasRoomWhereUniqueInput
    create: XOR<CanvasRoomCreateWithoutAdminInput, CanvasRoomUncheckedCreateWithoutAdminInput>
  }

  export type CanvasRoomCreateManyAdminInputEnvelope = {
    data: CanvasRoomCreateManyAdminInput | CanvasRoomCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type ElementCreateWithoutSenderInput = {
    id?: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    room: CanvasRoomCreateNestedOneWithoutElementsInput
  }

  export type ElementUncheckedCreateWithoutSenderInput = {
    id?: string
    roomId: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementCreateOrConnectWithoutSenderInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutSenderInput, ElementUncheckedCreateWithoutSenderInput>
  }

  export type ElementCreateManySenderInputEnvelope = {
    data: ElementCreateManySenderInput | ElementCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type RoomUserUpsertWithWhereUniqueWithoutUserInput = {
    where: RoomUserWhereUniqueInput
    update: XOR<RoomUserUpdateWithoutUserInput, RoomUserUncheckedUpdateWithoutUserInput>
    create: XOR<RoomUserCreateWithoutUserInput, RoomUserUncheckedCreateWithoutUserInput>
  }

  export type RoomUserUpdateWithWhereUniqueWithoutUserInput = {
    where: RoomUserWhereUniqueInput
    data: XOR<RoomUserUpdateWithoutUserInput, RoomUserUncheckedUpdateWithoutUserInput>
  }

  export type RoomUserUpdateManyWithWhereWithoutUserInput = {
    where: RoomUserScalarWhereInput
    data: XOR<RoomUserUpdateManyMutationInput, RoomUserUncheckedUpdateManyWithoutUserInput>
  }

  export type RoomUserScalarWhereInput = {
    AND?: RoomUserScalarWhereInput | RoomUserScalarWhereInput[]
    OR?: RoomUserScalarWhereInput[]
    NOT?: RoomUserScalarWhereInput | RoomUserScalarWhereInput[]
    userId?: StringFilter<"RoomUser"> | string
    roomId?: StringFilter<"RoomUser"> | string
    joinedAt?: DateTimeFilter<"RoomUser"> | Date | string
  }

  export type CanvasRoomUpsertWithWhereUniqueWithoutAdminInput = {
    where: CanvasRoomWhereUniqueInput
    update: XOR<CanvasRoomUpdateWithoutAdminInput, CanvasRoomUncheckedUpdateWithoutAdminInput>
    create: XOR<CanvasRoomCreateWithoutAdminInput, CanvasRoomUncheckedCreateWithoutAdminInput>
  }

  export type CanvasRoomUpdateWithWhereUniqueWithoutAdminInput = {
    where: CanvasRoomWhereUniqueInput
    data: XOR<CanvasRoomUpdateWithoutAdminInput, CanvasRoomUncheckedUpdateWithoutAdminInput>
  }

  export type CanvasRoomUpdateManyWithWhereWithoutAdminInput = {
    where: CanvasRoomScalarWhereInput
    data: XOR<CanvasRoomUpdateManyMutationInput, CanvasRoomUncheckedUpdateManyWithoutAdminInput>
  }

  export type CanvasRoomScalarWhereInput = {
    AND?: CanvasRoomScalarWhereInput | CanvasRoomScalarWhereInput[]
    OR?: CanvasRoomScalarWhereInput[]
    NOT?: CanvasRoomScalarWhereInput | CanvasRoomScalarWhereInput[]
    id?: StringFilter<"CanvasRoom"> | string
    slug?: StringFilter<"CanvasRoom"> | string
    adminId?: StringFilter<"CanvasRoom"> | string
    createdAt?: DateTimeFilter<"CanvasRoom"> | Date | string
    updatedAt?: DateTimeFilter<"CanvasRoom"> | Date | string
  }

  export type ElementUpsertWithWhereUniqueWithoutSenderInput = {
    where: ElementWhereUniqueInput
    update: XOR<ElementUpdateWithoutSenderInput, ElementUncheckedUpdateWithoutSenderInput>
    create: XOR<ElementCreateWithoutSenderInput, ElementUncheckedCreateWithoutSenderInput>
  }

  export type ElementUpdateWithWhereUniqueWithoutSenderInput = {
    where: ElementWhereUniqueInput
    data: XOR<ElementUpdateWithoutSenderInput, ElementUncheckedUpdateWithoutSenderInput>
  }

  export type ElementUpdateManyWithWhereWithoutSenderInput = {
    where: ElementScalarWhereInput
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyWithoutSenderInput>
  }

  export type ElementScalarWhereInput = {
    AND?: ElementScalarWhereInput | ElementScalarWhereInput[]
    OR?: ElementScalarWhereInput[]
    NOT?: ElementScalarWhereInput | ElementScalarWhereInput[]
    id?: StringFilter<"Element"> | string
    roomId?: StringFilter<"Element"> | string
    senderId?: StringFilter<"Element"> | string
    type?: EnumShapeTypesFilter<"Element"> | $Enums.ShapeTypes
    data?: JsonFilter<"Element">
    createdAt?: DateTimeFilter<"Element"> | Date | string
    updatedAt?: DateTimeFilter<"Element"> | Date | string
  }

  export type UserCreateWithoutAdminRoomsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    rooms?: RoomUserCreateNestedManyWithoutUserInput
    elements?: ElementCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutAdminRoomsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    rooms?: RoomUserUncheckedCreateNestedManyWithoutUserInput
    elements?: ElementUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutAdminRoomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminRoomsInput, UserUncheckedCreateWithoutAdminRoomsInput>
  }

  export type RoomUserCreateWithoutRoomInput = {
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutRoomsInput
  }

  export type RoomUserUncheckedCreateWithoutRoomInput = {
    userId: string
    joinedAt?: Date | string
  }

  export type RoomUserCreateOrConnectWithoutRoomInput = {
    where: RoomUserWhereUniqueInput
    create: XOR<RoomUserCreateWithoutRoomInput, RoomUserUncheckedCreateWithoutRoomInput>
  }

  export type RoomUserCreateManyRoomInputEnvelope = {
    data: RoomUserCreateManyRoomInput | RoomUserCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type ElementCreateWithoutRoomInput = {
    id?: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutElementsInput
  }

  export type ElementUncheckedCreateWithoutRoomInput = {
    id?: string
    senderId: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementCreateOrConnectWithoutRoomInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutRoomInput, ElementUncheckedCreateWithoutRoomInput>
  }

  export type ElementCreateManyRoomInputEnvelope = {
    data: ElementCreateManyRoomInput | ElementCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAdminRoomsInput = {
    update: XOR<UserUpdateWithoutAdminRoomsInput, UserUncheckedUpdateWithoutAdminRoomsInput>
    create: XOR<UserCreateWithoutAdminRoomsInput, UserUncheckedCreateWithoutAdminRoomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminRoomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminRoomsInput, UserUncheckedUpdateWithoutAdminRoomsInput>
  }

  export type UserUpdateWithoutAdminRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUserUpdateManyWithoutUserNestedInput
    elements?: ElementUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUserUncheckedUpdateManyWithoutUserNestedInput
    elements?: ElementUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type RoomUserUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomUserWhereUniqueInput
    update: XOR<RoomUserUpdateWithoutRoomInput, RoomUserUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomUserCreateWithoutRoomInput, RoomUserUncheckedCreateWithoutRoomInput>
  }

  export type RoomUserUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomUserWhereUniqueInput
    data: XOR<RoomUserUpdateWithoutRoomInput, RoomUserUncheckedUpdateWithoutRoomInput>
  }

  export type RoomUserUpdateManyWithWhereWithoutRoomInput = {
    where: RoomUserScalarWhereInput
    data: XOR<RoomUserUpdateManyMutationInput, RoomUserUncheckedUpdateManyWithoutRoomInput>
  }

  export type ElementUpsertWithWhereUniqueWithoutRoomInput = {
    where: ElementWhereUniqueInput
    update: XOR<ElementUpdateWithoutRoomInput, ElementUncheckedUpdateWithoutRoomInput>
    create: XOR<ElementCreateWithoutRoomInput, ElementUncheckedCreateWithoutRoomInput>
  }

  export type ElementUpdateWithWhereUniqueWithoutRoomInput = {
    where: ElementWhereUniqueInput
    data: XOR<ElementUpdateWithoutRoomInput, ElementUncheckedUpdateWithoutRoomInput>
  }

  export type ElementUpdateManyWithWhereWithoutRoomInput = {
    where: ElementScalarWhereInput
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyWithoutRoomInput>
  }

  export type CanvasRoomCreateWithoutElementsInput = {
    id?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutAdminRoomsInput
    users?: RoomUserCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomUncheckedCreateWithoutElementsInput = {
    id?: string
    slug: string
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: RoomUserUncheckedCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomCreateOrConnectWithoutElementsInput = {
    where: CanvasRoomWhereUniqueInput
    create: XOR<CanvasRoomCreateWithoutElementsInput, CanvasRoomUncheckedCreateWithoutElementsInput>
  }

  export type UserCreateWithoutElementsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    rooms?: RoomUserCreateNestedManyWithoutUserInput
    adminRooms?: CanvasRoomCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutElementsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    rooms?: RoomUserUncheckedCreateNestedManyWithoutUserInput
    adminRooms?: CanvasRoomUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutElementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutElementsInput, UserUncheckedCreateWithoutElementsInput>
  }

  export type CanvasRoomUpsertWithoutElementsInput = {
    update: XOR<CanvasRoomUpdateWithoutElementsInput, CanvasRoomUncheckedUpdateWithoutElementsInput>
    create: XOR<CanvasRoomCreateWithoutElementsInput, CanvasRoomUncheckedCreateWithoutElementsInput>
    where?: CanvasRoomWhereInput
  }

  export type CanvasRoomUpdateToOneWithWhereWithoutElementsInput = {
    where?: CanvasRoomWhereInput
    data: XOR<CanvasRoomUpdateWithoutElementsInput, CanvasRoomUncheckedUpdateWithoutElementsInput>
  }

  export type CanvasRoomUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutAdminRoomsNestedInput
    users?: RoomUserUpdateManyWithoutRoomNestedInput
  }

  export type CanvasRoomUncheckedUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: RoomUserUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutElementsInput = {
    update: XOR<UserUpdateWithoutElementsInput, UserUncheckedUpdateWithoutElementsInput>
    create: XOR<UserCreateWithoutElementsInput, UserUncheckedCreateWithoutElementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutElementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutElementsInput, UserUncheckedUpdateWithoutElementsInput>
  }

  export type UserUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUserUpdateManyWithoutUserNestedInput
    adminRooms?: CanvasRoomUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUserUncheckedUpdateManyWithoutUserNestedInput
    adminRooms?: CanvasRoomUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutRoomsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    adminRooms?: CanvasRoomCreateNestedManyWithoutAdminInput
    elements?: ElementCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutRoomsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    adminRooms?: CanvasRoomUncheckedCreateNestedManyWithoutAdminInput
    elements?: ElementUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutRoomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
  }

  export type CanvasRoomCreateWithoutUsersInput = {
    id?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutAdminRoomsInput
    elements?: ElementCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomUncheckedCreateWithoutUsersInput = {
    id?: string
    slug: string
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    elements?: ElementUncheckedCreateNestedManyWithoutRoomInput
  }

  export type CanvasRoomCreateOrConnectWithoutUsersInput = {
    where: CanvasRoomWhereUniqueInput
    create: XOR<CanvasRoomCreateWithoutUsersInput, CanvasRoomUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutRoomsInput = {
    update: XOR<UserUpdateWithoutRoomsInput, UserUncheckedUpdateWithoutRoomsInput>
    create: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomsInput, UserUncheckedUpdateWithoutRoomsInput>
  }

  export type UserUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminRooms?: CanvasRoomUpdateManyWithoutAdminNestedInput
    elements?: ElementUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminRooms?: CanvasRoomUncheckedUpdateManyWithoutAdminNestedInput
    elements?: ElementUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type CanvasRoomUpsertWithoutUsersInput = {
    update: XOR<CanvasRoomUpdateWithoutUsersInput, CanvasRoomUncheckedUpdateWithoutUsersInput>
    create: XOR<CanvasRoomCreateWithoutUsersInput, CanvasRoomUncheckedCreateWithoutUsersInput>
    where?: CanvasRoomWhereInput
  }

  export type CanvasRoomUpdateToOneWithWhereWithoutUsersInput = {
    where?: CanvasRoomWhereInput
    data: XOR<CanvasRoomUpdateWithoutUsersInput, CanvasRoomUncheckedUpdateWithoutUsersInput>
  }

  export type CanvasRoomUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutAdminRoomsNestedInput
    elements?: ElementUpdateManyWithoutRoomNestedInput
  }

  export type CanvasRoomUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    elements?: ElementUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUserCreateManyUserInput = {
    roomId: string
    joinedAt?: Date | string
  }

  export type CanvasRoomCreateManyAdminInput = {
    id?: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementCreateManySenderInput = {
    id?: string
    roomId: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUserUpdateWithoutUserInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: CanvasRoomUpdateOneRequiredWithoutUsersNestedInput
  }

  export type RoomUserUncheckedUpdateWithoutUserInput = {
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUserUncheckedUpdateManyWithoutUserInput = {
    roomId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CanvasRoomUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: RoomUserUpdateManyWithoutRoomNestedInput
    elements?: ElementUpdateManyWithoutRoomNestedInput
  }

  export type CanvasRoomUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: RoomUserUncheckedUpdateManyWithoutRoomNestedInput
    elements?: ElementUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type CanvasRoomUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: CanvasRoomUpdateOneRequiredWithoutElementsNestedInput
  }

  export type ElementUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUserCreateManyRoomInput = {
    userId: string
    joinedAt?: Date | string
  }

  export type ElementCreateManyRoomInput = {
    id?: string
    senderId: string
    type: $Enums.ShapeTypes
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUserUpdateWithoutRoomInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUserUncheckedUpdateWithoutRoomInput = {
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUserUncheckedUpdateManyWithoutRoomInput = {
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutElementsNestedInput
  }

  export type ElementUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    type?: EnumShapeTypesFieldUpdateOperationsInput | $Enums.ShapeTypes
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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