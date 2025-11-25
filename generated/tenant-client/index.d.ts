
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
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model Tenancy
 * 
 */
export type Tenancy = $Result.DefaultSelection<Prisma.$TenancyPayload>
/**
 * Model ComplianceType
 * 
 */
export type ComplianceType = $Result.DefaultSelection<Prisma.$ComplianceTypePayload>
/**
 * Model ComplianceRecord
 * 
 */
export type ComplianceRecord = $Result.DefaultSelection<Prisma.$ComplianceRecordPayload>
/**
 * Model MaintenanceTicket
 * 
 */
export type MaintenanceTicket = $Result.DefaultSelection<Prisma.$MaintenanceTicketPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Properties
 * const properties = await prisma.property.findMany()
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
   * // Fetch zero or more Properties
   * const properties = await prisma.property.findMany()
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
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs>;

  /**
   * `prisma.tenancy`: Exposes CRUD operations for the **Tenancy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenancies
    * const tenancies = await prisma.tenancy.findMany()
    * ```
    */
  get tenancy(): Prisma.TenancyDelegate<ExtArgs>;

  /**
   * `prisma.complianceType`: Exposes CRUD operations for the **ComplianceType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplianceTypes
    * const complianceTypes = await prisma.complianceType.findMany()
    * ```
    */
  get complianceType(): Prisma.ComplianceTypeDelegate<ExtArgs>;

  /**
   * `prisma.complianceRecord`: Exposes CRUD operations for the **ComplianceRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplianceRecords
    * const complianceRecords = await prisma.complianceRecord.findMany()
    * ```
    */
  get complianceRecord(): Prisma.ComplianceRecordDelegate<ExtArgs>;

  /**
   * `prisma.maintenanceTicket`: Exposes CRUD operations for the **MaintenanceTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaintenanceTickets
    * const maintenanceTickets = await prisma.maintenanceTicket.findMany()
    * ```
    */
  get maintenanceTicket(): Prisma.MaintenanceTicketDelegate<ExtArgs>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs>;
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
    Property: 'Property',
    Tenancy: 'Tenancy',
    ComplianceType: 'ComplianceType',
    ComplianceRecord: 'ComplianceRecord',
    MaintenanceTicket: 'MaintenanceTicket',
    Transaction: 'Transaction'
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
      modelProps: "property" | "tenancy" | "complianceType" | "complianceRecord" | "maintenanceTicket" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      Tenancy: {
        payload: Prisma.$TenancyPayload<ExtArgs>
        fields: Prisma.TenancyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenancyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenancyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>
          }
          findFirst: {
            args: Prisma.TenancyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenancyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>
          }
          findMany: {
            args: Prisma.TenancyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>[]
          }
          create: {
            args: Prisma.TenancyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>
          }
          createMany: {
            args: Prisma.TenancyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenancyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>[]
          }
          delete: {
            args: Prisma.TenancyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>
          }
          update: {
            args: Prisma.TenancyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>
          }
          deleteMany: {
            args: Prisma.TenancyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenancyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenancyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenancyPayload>
          }
          aggregate: {
            args: Prisma.TenancyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenancy>
          }
          groupBy: {
            args: Prisma.TenancyGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenancyGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenancyCountArgs<ExtArgs>
            result: $Utils.Optional<TenancyCountAggregateOutputType> | number
          }
        }
      }
      ComplianceType: {
        payload: Prisma.$ComplianceTypePayload<ExtArgs>
        fields: Prisma.ComplianceTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplianceTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplianceTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>
          }
          findFirst: {
            args: Prisma.ComplianceTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplianceTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>
          }
          findMany: {
            args: Prisma.ComplianceTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>[]
          }
          create: {
            args: Prisma.ComplianceTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>
          }
          createMany: {
            args: Prisma.ComplianceTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplianceTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>[]
          }
          delete: {
            args: Prisma.ComplianceTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>
          }
          update: {
            args: Prisma.ComplianceTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>
          }
          deleteMany: {
            args: Prisma.ComplianceTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplianceTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComplianceTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceTypePayload>
          }
          aggregate: {
            args: Prisma.ComplianceTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplianceType>
          }
          groupBy: {
            args: Prisma.ComplianceTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplianceTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplianceTypeCountArgs<ExtArgs>
            result: $Utils.Optional<ComplianceTypeCountAggregateOutputType> | number
          }
        }
      }
      ComplianceRecord: {
        payload: Prisma.$ComplianceRecordPayload<ExtArgs>
        fields: Prisma.ComplianceRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplianceRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplianceRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>
          }
          findFirst: {
            args: Prisma.ComplianceRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplianceRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>
          }
          findMany: {
            args: Prisma.ComplianceRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>[]
          }
          create: {
            args: Prisma.ComplianceRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>
          }
          createMany: {
            args: Prisma.ComplianceRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplianceRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>[]
          }
          delete: {
            args: Prisma.ComplianceRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>
          }
          update: {
            args: Prisma.ComplianceRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>
          }
          deleteMany: {
            args: Prisma.ComplianceRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplianceRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComplianceRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceRecordPayload>
          }
          aggregate: {
            args: Prisma.ComplianceRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplianceRecord>
          }
          groupBy: {
            args: Prisma.ComplianceRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplianceRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplianceRecordCountArgs<ExtArgs>
            result: $Utils.Optional<ComplianceRecordCountAggregateOutputType> | number
          }
        }
      }
      MaintenanceTicket: {
        payload: Prisma.$MaintenanceTicketPayload<ExtArgs>
        fields: Prisma.MaintenanceTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaintenanceTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaintenanceTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>
          }
          findFirst: {
            args: Prisma.MaintenanceTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaintenanceTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>
          }
          findMany: {
            args: Prisma.MaintenanceTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>[]
          }
          create: {
            args: Prisma.MaintenanceTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>
          }
          createMany: {
            args: Prisma.MaintenanceTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaintenanceTicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>[]
          }
          delete: {
            args: Prisma.MaintenanceTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>
          }
          update: {
            args: Prisma.MaintenanceTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>
          }
          deleteMany: {
            args: Prisma.MaintenanceTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaintenanceTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MaintenanceTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceTicketPayload>
          }
          aggregate: {
            args: Prisma.MaintenanceTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaintenanceTicket>
          }
          groupBy: {
            args: Prisma.MaintenanceTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaintenanceTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaintenanceTicketCountArgs<ExtArgs>
            result: $Utils.Optional<MaintenanceTicketCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
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
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    tenancies: number
    complianceRecords: number
    maintenanceTickets: number
    transactions: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenancies?: boolean | PropertyCountOutputTypeCountTenanciesArgs
    complianceRecords?: boolean | PropertyCountOutputTypeCountComplianceRecordsArgs
    maintenanceTickets?: boolean | PropertyCountOutputTypeCountMaintenanceTicketsArgs
    transactions?: boolean | PropertyCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountTenanciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenancyWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountComplianceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceRecordWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountMaintenanceTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceTicketWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type TenancyCountOutputType
   */

  export type TenancyCountOutputType = {
    maintenanceTickets: number
  }

  export type TenancyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    maintenanceTickets?: boolean | TenancyCountOutputTypeCountMaintenanceTicketsArgs
  }

  // Custom InputTypes
  /**
   * TenancyCountOutputType without action
   */
  export type TenancyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenancyCountOutputType
     */
    select?: TenancyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenancyCountOutputType without action
   */
  export type TenancyCountOutputTypeCountMaintenanceTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceTicketWhereInput
  }


  /**
   * Count Type ComplianceTypeCountOutputType
   */

  export type ComplianceTypeCountOutputType = {
    complianceRecords: number
  }

  export type ComplianceTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complianceRecords?: boolean | ComplianceTypeCountOutputTypeCountComplianceRecordsArgs
  }

  // Custom InputTypes
  /**
   * ComplianceTypeCountOutputType without action
   */
  export type ComplianceTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTypeCountOutputType
     */
    select?: ComplianceTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComplianceTypeCountOutputType without action
   */
  export type ComplianceTypeCountOutputTypeCountComplianceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyAvgAggregateOutputType = {
    bedrooms: number | null
    bathrooms: number | null
    propertyValueEstimate: Decimal | null
  }

  export type PropertySumAggregateOutputType = {
    bedrooms: number | null
    bathrooms: number | null
    propertyValueEstimate: Decimal | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    address: string | null
    postcode: string | null
    city: string | null
    propertyType: string | null
    bedrooms: number | null
    bathrooms: number | null
    purchaseDate: Date | null
    propertyValueEstimate: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    address: string | null
    postcode: string | null
    city: string | null
    propertyType: string | null
    bedrooms: number | null
    bathrooms: number | null
    purchaseDate: Date | null
    propertyValueEstimate: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    address: number
    postcode: number
    city: number
    propertyType: number
    bedrooms: number
    bathrooms: number
    purchaseDate: number
    propertyValueEstimate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PropertyAvgAggregateInputType = {
    bedrooms?: true
    bathrooms?: true
    propertyValueEstimate?: true
  }

  export type PropertySumAggregateInputType = {
    bedrooms?: true
    bathrooms?: true
    propertyValueEstimate?: true
  }

  export type PropertyMinAggregateInputType = {
    id?: true
    address?: true
    postcode?: true
    city?: true
    propertyType?: true
    bedrooms?: true
    bathrooms?: true
    purchaseDate?: true
    propertyValueEstimate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    address?: true
    postcode?: true
    city?: true
    propertyType?: true
    bedrooms?: true
    bathrooms?: true
    purchaseDate?: true
    propertyValueEstimate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    address?: true
    postcode?: true
    city?: true
    propertyType?: true
    bedrooms?: true
    bathrooms?: true
    purchaseDate?: true
    propertyValueEstimate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _avg?: PropertyAvgAggregateInputType
    _sum?: PropertySumAggregateInputType
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    address: string
    postcode: string
    city: string | null
    propertyType: string | null
    bedrooms: number | null
    bathrooms: number | null
    purchaseDate: Date | null
    propertyValueEstimate: Decimal | null
    createdAt: Date
    updatedAt: Date
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    postcode?: boolean
    city?: boolean
    propertyType?: boolean
    bedrooms?: boolean
    bathrooms?: boolean
    purchaseDate?: boolean
    propertyValueEstimate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenancies?: boolean | Property$tenanciesArgs<ExtArgs>
    complianceRecords?: boolean | Property$complianceRecordsArgs<ExtArgs>
    maintenanceTickets?: boolean | Property$maintenanceTicketsArgs<ExtArgs>
    transactions?: boolean | Property$transactionsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    postcode?: boolean
    city?: boolean
    propertyType?: boolean
    bedrooms?: boolean
    bathrooms?: boolean
    purchaseDate?: boolean
    propertyValueEstimate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    address?: boolean
    postcode?: boolean
    city?: boolean
    propertyType?: boolean
    bedrooms?: boolean
    bathrooms?: boolean
    purchaseDate?: boolean
    propertyValueEstimate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenancies?: boolean | Property$tenanciesArgs<ExtArgs>
    complianceRecords?: boolean | Property$complianceRecordsArgs<ExtArgs>
    maintenanceTickets?: boolean | Property$maintenanceTicketsArgs<ExtArgs>
    transactions?: boolean | Property$transactionsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      tenancies: Prisma.$TenancyPayload<ExtArgs>[]
      complianceRecords: Prisma.$ComplianceRecordPayload<ExtArgs>[]
      maintenanceTickets: Prisma.$MaintenanceTicketPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      postcode: string
      city: string | null
      propertyType: string | null
      bedrooms: number | null
      bathrooms: number | null
      purchaseDate: Date | null
      propertyValueEstimate: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
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
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenancies<T extends Property$tenanciesArgs<ExtArgs> = {}>(args?: Subset<T, Property$tenanciesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "findMany"> | Null>
    complianceRecords<T extends Property$complianceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Property$complianceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "findMany"> | Null>
    maintenanceTickets<T extends Property$maintenanceTicketsArgs<ExtArgs> = {}>(args?: Subset<T, Property$maintenanceTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "findMany"> | Null>
    transactions<T extends Property$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Property$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Property model
   */ 
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly address: FieldRef<"Property", 'String'>
    readonly postcode: FieldRef<"Property", 'String'>
    readonly city: FieldRef<"Property", 'String'>
    readonly propertyType: FieldRef<"Property", 'String'>
    readonly bedrooms: FieldRef<"Property", 'Int'>
    readonly bathrooms: FieldRef<"Property", 'Int'>
    readonly purchaseDate: FieldRef<"Property", 'DateTime'>
    readonly propertyValueEstimate: FieldRef<"Property", 'Decimal'>
    readonly createdAt: FieldRef<"Property", 'DateTime'>
    readonly updatedAt: FieldRef<"Property", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
  }

  /**
   * Property.tenancies
   */
  export type Property$tenanciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    where?: TenancyWhereInput
    orderBy?: TenancyOrderByWithRelationInput | TenancyOrderByWithRelationInput[]
    cursor?: TenancyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenancyScalarFieldEnum | TenancyScalarFieldEnum[]
  }

  /**
   * Property.complianceRecords
   */
  export type Property$complianceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    where?: ComplianceRecordWhereInput
    orderBy?: ComplianceRecordOrderByWithRelationInput | ComplianceRecordOrderByWithRelationInput[]
    cursor?: ComplianceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplianceRecordScalarFieldEnum | ComplianceRecordScalarFieldEnum[]
  }

  /**
   * Property.maintenanceTickets
   */
  export type Property$maintenanceTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    where?: MaintenanceTicketWhereInput
    orderBy?: MaintenanceTicketOrderByWithRelationInput | MaintenanceTicketOrderByWithRelationInput[]
    cursor?: MaintenanceTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaintenanceTicketScalarFieldEnum | MaintenanceTicketScalarFieldEnum[]
  }

  /**
   * Property.transactions
   */
  export type Property$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model Tenancy
   */

  export type AggregateTenancy = {
    _count: TenancyCountAggregateOutputType | null
    _avg: TenancyAvgAggregateOutputType | null
    _sum: TenancySumAggregateOutputType | null
    _min: TenancyMinAggregateOutputType | null
    _max: TenancyMaxAggregateOutputType | null
  }

  export type TenancyAvgAggregateOutputType = {
    monthlyRent: Decimal | null
    depositAmount: Decimal | null
  }

  export type TenancySumAggregateOutputType = {
    monthlyRent: Decimal | null
    depositAmount: Decimal | null
  }

  export type TenancyMinAggregateOutputType = {
    id: string | null
    tenantName: string | null
    tenantEmail: string | null
    startDate: Date | null
    endDate: Date | null
    monthlyRent: Decimal | null
    depositAmount: Decimal | null
    depositProtectionScheme: string | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
  }

  export type TenancyMaxAggregateOutputType = {
    id: string | null
    tenantName: string | null
    tenantEmail: string | null
    startDate: Date | null
    endDate: Date | null
    monthlyRent: Decimal | null
    depositAmount: Decimal | null
    depositProtectionScheme: string | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
  }

  export type TenancyCountAggregateOutputType = {
    id: number
    tenantName: number
    tenantEmail: number
    startDate: number
    endDate: number
    monthlyRent: number
    depositAmount: number
    depositProtectionScheme: number
    createdAt: number
    updatedAt: number
    propertyId: number
    _all: number
  }


  export type TenancyAvgAggregateInputType = {
    monthlyRent?: true
    depositAmount?: true
  }

  export type TenancySumAggregateInputType = {
    monthlyRent?: true
    depositAmount?: true
  }

  export type TenancyMinAggregateInputType = {
    id?: true
    tenantName?: true
    tenantEmail?: true
    startDate?: true
    endDate?: true
    monthlyRent?: true
    depositAmount?: true
    depositProtectionScheme?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
  }

  export type TenancyMaxAggregateInputType = {
    id?: true
    tenantName?: true
    tenantEmail?: true
    startDate?: true
    endDate?: true
    monthlyRent?: true
    depositAmount?: true
    depositProtectionScheme?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
  }

  export type TenancyCountAggregateInputType = {
    id?: true
    tenantName?: true
    tenantEmail?: true
    startDate?: true
    endDate?: true
    monthlyRent?: true
    depositAmount?: true
    depositProtectionScheme?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    _all?: true
  }

  export type TenancyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenancy to aggregate.
     */
    where?: TenancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenancies to fetch.
     */
    orderBy?: TenancyOrderByWithRelationInput | TenancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenancies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenancies
    **/
    _count?: true | TenancyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenancyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenancySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenancyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenancyMaxAggregateInputType
  }

  export type GetTenancyAggregateType<T extends TenancyAggregateArgs> = {
        [P in keyof T & keyof AggregateTenancy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenancy[P]>
      : GetScalarType<T[P], AggregateTenancy[P]>
  }




  export type TenancyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenancyWhereInput
    orderBy?: TenancyOrderByWithAggregationInput | TenancyOrderByWithAggregationInput[]
    by: TenancyScalarFieldEnum[] | TenancyScalarFieldEnum
    having?: TenancyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenancyCountAggregateInputType | true
    _avg?: TenancyAvgAggregateInputType
    _sum?: TenancySumAggregateInputType
    _min?: TenancyMinAggregateInputType
    _max?: TenancyMaxAggregateInputType
  }

  export type TenancyGroupByOutputType = {
    id: string
    tenantName: string
    tenantEmail: string | null
    startDate: Date
    endDate: Date | null
    monthlyRent: Decimal
    depositAmount: Decimal | null
    depositProtectionScheme: string | null
    createdAt: Date
    updatedAt: Date
    propertyId: string
    _count: TenancyCountAggregateOutputType | null
    _avg: TenancyAvgAggregateOutputType | null
    _sum: TenancySumAggregateOutputType | null
    _min: TenancyMinAggregateOutputType | null
    _max: TenancyMaxAggregateOutputType | null
  }

  type GetTenancyGroupByPayload<T extends TenancyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenancyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenancyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenancyGroupByOutputType[P]>
            : GetScalarType<T[P], TenancyGroupByOutputType[P]>
        }
      >
    >


  export type TenancySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantName?: boolean
    tenantEmail?: boolean
    startDate?: boolean
    endDate?: boolean
    monthlyRent?: boolean
    depositAmount?: boolean
    depositProtectionScheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    maintenanceTickets?: boolean | Tenancy$maintenanceTicketsArgs<ExtArgs>
    _count?: boolean | TenancyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenancy"]>

  export type TenancySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantName?: boolean
    tenantEmail?: boolean
    startDate?: boolean
    endDate?: boolean
    monthlyRent?: boolean
    depositAmount?: boolean
    depositProtectionScheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenancy"]>

  export type TenancySelectScalar = {
    id?: boolean
    tenantName?: boolean
    tenantEmail?: boolean
    startDate?: boolean
    endDate?: boolean
    monthlyRent?: boolean
    depositAmount?: boolean
    depositProtectionScheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
  }

  export type TenancyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    maintenanceTickets?: boolean | Tenancy$maintenanceTicketsArgs<ExtArgs>
    _count?: boolean | TenancyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenancyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $TenancyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenancy"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      maintenanceTickets: Prisma.$MaintenanceTicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantName: string
      tenantEmail: string | null
      startDate: Date
      endDate: Date | null
      monthlyRent: Prisma.Decimal
      depositAmount: Prisma.Decimal | null
      depositProtectionScheme: string | null
      createdAt: Date
      updatedAt: Date
      propertyId: string
    }, ExtArgs["result"]["tenancy"]>
    composites: {}
  }

  type TenancyGetPayload<S extends boolean | null | undefined | TenancyDefaultArgs> = $Result.GetResult<Prisma.$TenancyPayload, S>

  type TenancyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenancyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenancyCountAggregateInputType | true
    }

  export interface TenancyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenancy'], meta: { name: 'Tenancy' } }
    /**
     * Find zero or one Tenancy that matches the filter.
     * @param {TenancyFindUniqueArgs} args - Arguments to find a Tenancy
     * @example
     * // Get one Tenancy
     * const tenancy = await prisma.tenancy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenancyFindUniqueArgs>(args: SelectSubset<T, TenancyFindUniqueArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tenancy that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenancyFindUniqueOrThrowArgs} args - Arguments to find a Tenancy
     * @example
     * // Get one Tenancy
     * const tenancy = await prisma.tenancy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenancyFindUniqueOrThrowArgs>(args: SelectSubset<T, TenancyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tenancy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenancyFindFirstArgs} args - Arguments to find a Tenancy
     * @example
     * // Get one Tenancy
     * const tenancy = await prisma.tenancy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenancyFindFirstArgs>(args?: SelectSubset<T, TenancyFindFirstArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tenancy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenancyFindFirstOrThrowArgs} args - Arguments to find a Tenancy
     * @example
     * // Get one Tenancy
     * const tenancy = await prisma.tenancy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenancyFindFirstOrThrowArgs>(args?: SelectSubset<T, TenancyFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tenancies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenancyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenancies
     * const tenancies = await prisma.tenancy.findMany()
     * 
     * // Get first 10 Tenancies
     * const tenancies = await prisma.tenancy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenancyWithIdOnly = await prisma.tenancy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenancyFindManyArgs>(args?: SelectSubset<T, TenancyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tenancy.
     * @param {TenancyCreateArgs} args - Arguments to create a Tenancy.
     * @example
     * // Create one Tenancy
     * const Tenancy = await prisma.tenancy.create({
     *   data: {
     *     // ... data to create a Tenancy
     *   }
     * })
     * 
     */
    create<T extends TenancyCreateArgs>(args: SelectSubset<T, TenancyCreateArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tenancies.
     * @param {TenancyCreateManyArgs} args - Arguments to create many Tenancies.
     * @example
     * // Create many Tenancies
     * const tenancy = await prisma.tenancy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenancyCreateManyArgs>(args?: SelectSubset<T, TenancyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenancies and returns the data saved in the database.
     * @param {TenancyCreateManyAndReturnArgs} args - Arguments to create many Tenancies.
     * @example
     * // Create many Tenancies
     * const tenancy = await prisma.tenancy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenancies and only return the `id`
     * const tenancyWithIdOnly = await prisma.tenancy.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenancyCreateManyAndReturnArgs>(args?: SelectSubset<T, TenancyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tenancy.
     * @param {TenancyDeleteArgs} args - Arguments to delete one Tenancy.
     * @example
     * // Delete one Tenancy
     * const Tenancy = await prisma.tenancy.delete({
     *   where: {
     *     // ... filter to delete one Tenancy
     *   }
     * })
     * 
     */
    delete<T extends TenancyDeleteArgs>(args: SelectSubset<T, TenancyDeleteArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tenancy.
     * @param {TenancyUpdateArgs} args - Arguments to update one Tenancy.
     * @example
     * // Update one Tenancy
     * const tenancy = await prisma.tenancy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenancyUpdateArgs>(args: SelectSubset<T, TenancyUpdateArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tenancies.
     * @param {TenancyDeleteManyArgs} args - Arguments to filter Tenancies to delete.
     * @example
     * // Delete a few Tenancies
     * const { count } = await prisma.tenancy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenancyDeleteManyArgs>(args?: SelectSubset<T, TenancyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenancies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenancyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenancies
     * const tenancy = await prisma.tenancy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenancyUpdateManyArgs>(args: SelectSubset<T, TenancyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenancy.
     * @param {TenancyUpsertArgs} args - Arguments to update or create a Tenancy.
     * @example
     * // Update or create a Tenancy
     * const tenancy = await prisma.tenancy.upsert({
     *   create: {
     *     // ... data to create a Tenancy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenancy we want to update
     *   }
     * })
     */
    upsert<T extends TenancyUpsertArgs>(args: SelectSubset<T, TenancyUpsertArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tenancies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenancyCountArgs} args - Arguments to filter Tenancies to count.
     * @example
     * // Count the number of Tenancies
     * const count = await prisma.tenancy.count({
     *   where: {
     *     // ... the filter for the Tenancies we want to count
     *   }
     * })
    **/
    count<T extends TenancyCountArgs>(
      args?: Subset<T, TenancyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenancyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenancy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenancyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenancyAggregateArgs>(args: Subset<T, TenancyAggregateArgs>): Prisma.PrismaPromise<GetTenancyAggregateType<T>>

    /**
     * Group by Tenancy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenancyGroupByArgs} args - Group by arguments.
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
      T extends TenancyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenancyGroupByArgs['orderBy'] }
        : { orderBy?: TenancyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenancyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenancyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenancy model
   */
  readonly fields: TenancyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenancy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenancyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    maintenanceTickets<T extends Tenancy$maintenanceTicketsArgs<ExtArgs> = {}>(args?: Subset<T, Tenancy$maintenanceTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Tenancy model
   */ 
  interface TenancyFieldRefs {
    readonly id: FieldRef<"Tenancy", 'String'>
    readonly tenantName: FieldRef<"Tenancy", 'String'>
    readonly tenantEmail: FieldRef<"Tenancy", 'String'>
    readonly startDate: FieldRef<"Tenancy", 'DateTime'>
    readonly endDate: FieldRef<"Tenancy", 'DateTime'>
    readonly monthlyRent: FieldRef<"Tenancy", 'Decimal'>
    readonly depositAmount: FieldRef<"Tenancy", 'Decimal'>
    readonly depositProtectionScheme: FieldRef<"Tenancy", 'String'>
    readonly createdAt: FieldRef<"Tenancy", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenancy", 'DateTime'>
    readonly propertyId: FieldRef<"Tenancy", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tenancy findUnique
   */
  export type TenancyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * Filter, which Tenancy to fetch.
     */
    where: TenancyWhereUniqueInput
  }

  /**
   * Tenancy findUniqueOrThrow
   */
  export type TenancyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * Filter, which Tenancy to fetch.
     */
    where: TenancyWhereUniqueInput
  }

  /**
   * Tenancy findFirst
   */
  export type TenancyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * Filter, which Tenancy to fetch.
     */
    where?: TenancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenancies to fetch.
     */
    orderBy?: TenancyOrderByWithRelationInput | TenancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenancies.
     */
    cursor?: TenancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenancies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenancies.
     */
    distinct?: TenancyScalarFieldEnum | TenancyScalarFieldEnum[]
  }

  /**
   * Tenancy findFirstOrThrow
   */
  export type TenancyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * Filter, which Tenancy to fetch.
     */
    where?: TenancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenancies to fetch.
     */
    orderBy?: TenancyOrderByWithRelationInput | TenancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenancies.
     */
    cursor?: TenancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenancies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenancies.
     */
    distinct?: TenancyScalarFieldEnum | TenancyScalarFieldEnum[]
  }

  /**
   * Tenancy findMany
   */
  export type TenancyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * Filter, which Tenancies to fetch.
     */
    where?: TenancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenancies to fetch.
     */
    orderBy?: TenancyOrderByWithRelationInput | TenancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenancies.
     */
    cursor?: TenancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenancies.
     */
    skip?: number
    distinct?: TenancyScalarFieldEnum | TenancyScalarFieldEnum[]
  }

  /**
   * Tenancy create
   */
  export type TenancyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenancy.
     */
    data: XOR<TenancyCreateInput, TenancyUncheckedCreateInput>
  }

  /**
   * Tenancy createMany
   */
  export type TenancyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenancies.
     */
    data: TenancyCreateManyInput | TenancyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenancy createManyAndReturn
   */
  export type TenancyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tenancies.
     */
    data: TenancyCreateManyInput | TenancyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tenancy update
   */
  export type TenancyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenancy.
     */
    data: XOR<TenancyUpdateInput, TenancyUncheckedUpdateInput>
    /**
     * Choose, which Tenancy to update.
     */
    where: TenancyWhereUniqueInput
  }

  /**
   * Tenancy updateMany
   */
  export type TenancyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenancies.
     */
    data: XOR<TenancyUpdateManyMutationInput, TenancyUncheckedUpdateManyInput>
    /**
     * Filter which Tenancies to update
     */
    where?: TenancyWhereInput
  }

  /**
   * Tenancy upsert
   */
  export type TenancyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenancy to update in case it exists.
     */
    where: TenancyWhereUniqueInput
    /**
     * In case the Tenancy found by the `where` argument doesn't exist, create a new Tenancy with this data.
     */
    create: XOR<TenancyCreateInput, TenancyUncheckedCreateInput>
    /**
     * In case the Tenancy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenancyUpdateInput, TenancyUncheckedUpdateInput>
  }

  /**
   * Tenancy delete
   */
  export type TenancyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    /**
     * Filter which Tenancy to delete.
     */
    where: TenancyWhereUniqueInput
  }

  /**
   * Tenancy deleteMany
   */
  export type TenancyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenancies to delete
     */
    where?: TenancyWhereInput
  }

  /**
   * Tenancy.maintenanceTickets
   */
  export type Tenancy$maintenanceTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    where?: MaintenanceTicketWhereInput
    orderBy?: MaintenanceTicketOrderByWithRelationInput | MaintenanceTicketOrderByWithRelationInput[]
    cursor?: MaintenanceTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaintenanceTicketScalarFieldEnum | MaintenanceTicketScalarFieldEnum[]
  }

  /**
   * Tenancy without action
   */
  export type TenancyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
  }


  /**
   * Model ComplianceType
   */

  export type AggregateComplianceType = {
    _count: ComplianceTypeCountAggregateOutputType | null
    _avg: ComplianceTypeAvgAggregateOutputType | null
    _sum: ComplianceTypeSumAggregateOutputType | null
    _min: ComplianceTypeMinAggregateOutputType | null
    _max: ComplianceTypeMaxAggregateOutputType | null
  }

  export type ComplianceTypeAvgAggregateOutputType = {
    renewalFrequencyMonths: number | null
  }

  export type ComplianceTypeSumAggregateOutputType = {
    renewalFrequencyMonths: number | null
  }

  export type ComplianceTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    renewalFrequencyMonths: number | null
    isRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplianceTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    renewalFrequencyMonths: number | null
    isRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplianceTypeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    renewalFrequencyMonths: number
    isRequired: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ComplianceTypeAvgAggregateInputType = {
    renewalFrequencyMonths?: true
  }

  export type ComplianceTypeSumAggregateInputType = {
    renewalFrequencyMonths?: true
  }

  export type ComplianceTypeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    renewalFrequencyMonths?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplianceTypeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    renewalFrequencyMonths?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplianceTypeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    renewalFrequencyMonths?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ComplianceTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceType to aggregate.
     */
    where?: ComplianceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceTypes to fetch.
     */
    orderBy?: ComplianceTypeOrderByWithRelationInput | ComplianceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplianceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplianceTypes
    **/
    _count?: true | ComplianceTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComplianceTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComplianceTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplianceTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplianceTypeMaxAggregateInputType
  }

  export type GetComplianceTypeAggregateType<T extends ComplianceTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateComplianceType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplianceType[P]>
      : GetScalarType<T[P], AggregateComplianceType[P]>
  }




  export type ComplianceTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceTypeWhereInput
    orderBy?: ComplianceTypeOrderByWithAggregationInput | ComplianceTypeOrderByWithAggregationInput[]
    by: ComplianceTypeScalarFieldEnum[] | ComplianceTypeScalarFieldEnum
    having?: ComplianceTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplianceTypeCountAggregateInputType | true
    _avg?: ComplianceTypeAvgAggregateInputType
    _sum?: ComplianceTypeSumAggregateInputType
    _min?: ComplianceTypeMinAggregateInputType
    _max?: ComplianceTypeMaxAggregateInputType
  }

  export type ComplianceTypeGroupByOutputType = {
    id: string
    name: string
    description: string | null
    renewalFrequencyMonths: number
    isRequired: boolean
    createdAt: Date
    updatedAt: Date
    _count: ComplianceTypeCountAggregateOutputType | null
    _avg: ComplianceTypeAvgAggregateOutputType | null
    _sum: ComplianceTypeSumAggregateOutputType | null
    _min: ComplianceTypeMinAggregateOutputType | null
    _max: ComplianceTypeMaxAggregateOutputType | null
  }

  type GetComplianceTypeGroupByPayload<T extends ComplianceTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplianceTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplianceTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplianceTypeGroupByOutputType[P]>
            : GetScalarType<T[P], ComplianceTypeGroupByOutputType[P]>
        }
      >
    >


  export type ComplianceTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    renewalFrequencyMonths?: boolean
    isRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    complianceRecords?: boolean | ComplianceType$complianceRecordsArgs<ExtArgs>
    _count?: boolean | ComplianceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complianceType"]>

  export type ComplianceTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    renewalFrequencyMonths?: boolean
    isRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["complianceType"]>

  export type ComplianceTypeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    renewalFrequencyMonths?: boolean
    isRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ComplianceTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complianceRecords?: boolean | ComplianceType$complianceRecordsArgs<ExtArgs>
    _count?: boolean | ComplianceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComplianceTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ComplianceTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplianceType"
    objects: {
      complianceRecords: Prisma.$ComplianceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      renewalFrequencyMonths: number
      isRequired: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["complianceType"]>
    composites: {}
  }

  type ComplianceTypeGetPayload<S extends boolean | null | undefined | ComplianceTypeDefaultArgs> = $Result.GetResult<Prisma.$ComplianceTypePayload, S>

  type ComplianceTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComplianceTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComplianceTypeCountAggregateInputType | true
    }

  export interface ComplianceTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplianceType'], meta: { name: 'ComplianceType' } }
    /**
     * Find zero or one ComplianceType that matches the filter.
     * @param {ComplianceTypeFindUniqueArgs} args - Arguments to find a ComplianceType
     * @example
     * // Get one ComplianceType
     * const complianceType = await prisma.complianceType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplianceTypeFindUniqueArgs>(args: SelectSubset<T, ComplianceTypeFindUniqueArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ComplianceType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComplianceTypeFindUniqueOrThrowArgs} args - Arguments to find a ComplianceType
     * @example
     * // Get one ComplianceType
     * const complianceType = await prisma.complianceType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplianceTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplianceTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ComplianceType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTypeFindFirstArgs} args - Arguments to find a ComplianceType
     * @example
     * // Get one ComplianceType
     * const complianceType = await prisma.complianceType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplianceTypeFindFirstArgs>(args?: SelectSubset<T, ComplianceTypeFindFirstArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ComplianceType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTypeFindFirstOrThrowArgs} args - Arguments to find a ComplianceType
     * @example
     * // Get one ComplianceType
     * const complianceType = await prisma.complianceType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplianceTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplianceTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ComplianceTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplianceTypes
     * const complianceTypes = await prisma.complianceType.findMany()
     * 
     * // Get first 10 ComplianceTypes
     * const complianceTypes = await prisma.complianceType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complianceTypeWithIdOnly = await prisma.complianceType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplianceTypeFindManyArgs>(args?: SelectSubset<T, ComplianceTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ComplianceType.
     * @param {ComplianceTypeCreateArgs} args - Arguments to create a ComplianceType.
     * @example
     * // Create one ComplianceType
     * const ComplianceType = await prisma.complianceType.create({
     *   data: {
     *     // ... data to create a ComplianceType
     *   }
     * })
     * 
     */
    create<T extends ComplianceTypeCreateArgs>(args: SelectSubset<T, ComplianceTypeCreateArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ComplianceTypes.
     * @param {ComplianceTypeCreateManyArgs} args - Arguments to create many ComplianceTypes.
     * @example
     * // Create many ComplianceTypes
     * const complianceType = await prisma.complianceType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplianceTypeCreateManyArgs>(args?: SelectSubset<T, ComplianceTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplianceTypes and returns the data saved in the database.
     * @param {ComplianceTypeCreateManyAndReturnArgs} args - Arguments to create many ComplianceTypes.
     * @example
     * // Create many ComplianceTypes
     * const complianceType = await prisma.complianceType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplianceTypes and only return the `id`
     * const complianceTypeWithIdOnly = await prisma.complianceType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplianceTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplianceTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ComplianceType.
     * @param {ComplianceTypeDeleteArgs} args - Arguments to delete one ComplianceType.
     * @example
     * // Delete one ComplianceType
     * const ComplianceType = await prisma.complianceType.delete({
     *   where: {
     *     // ... filter to delete one ComplianceType
     *   }
     * })
     * 
     */
    delete<T extends ComplianceTypeDeleteArgs>(args: SelectSubset<T, ComplianceTypeDeleteArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ComplianceType.
     * @param {ComplianceTypeUpdateArgs} args - Arguments to update one ComplianceType.
     * @example
     * // Update one ComplianceType
     * const complianceType = await prisma.complianceType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplianceTypeUpdateArgs>(args: SelectSubset<T, ComplianceTypeUpdateArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ComplianceTypes.
     * @param {ComplianceTypeDeleteManyArgs} args - Arguments to filter ComplianceTypes to delete.
     * @example
     * // Delete a few ComplianceTypes
     * const { count } = await prisma.complianceType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplianceTypeDeleteManyArgs>(args?: SelectSubset<T, ComplianceTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplianceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplianceTypes
     * const complianceType = await prisma.complianceType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplianceTypeUpdateManyArgs>(args: SelectSubset<T, ComplianceTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComplianceType.
     * @param {ComplianceTypeUpsertArgs} args - Arguments to update or create a ComplianceType.
     * @example
     * // Update or create a ComplianceType
     * const complianceType = await prisma.complianceType.upsert({
     *   create: {
     *     // ... data to create a ComplianceType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplianceType we want to update
     *   }
     * })
     */
    upsert<T extends ComplianceTypeUpsertArgs>(args: SelectSubset<T, ComplianceTypeUpsertArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ComplianceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTypeCountArgs} args - Arguments to filter ComplianceTypes to count.
     * @example
     * // Count the number of ComplianceTypes
     * const count = await prisma.complianceType.count({
     *   where: {
     *     // ... the filter for the ComplianceTypes we want to count
     *   }
     * })
    **/
    count<T extends ComplianceTypeCountArgs>(
      args?: Subset<T, ComplianceTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplianceTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplianceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComplianceTypeAggregateArgs>(args: Subset<T, ComplianceTypeAggregateArgs>): Prisma.PrismaPromise<GetComplianceTypeAggregateType<T>>

    /**
     * Group by ComplianceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTypeGroupByArgs} args - Group by arguments.
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
      T extends ComplianceTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplianceTypeGroupByArgs['orderBy'] }
        : { orderBy?: ComplianceTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComplianceTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplianceTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplianceType model
   */
  readonly fields: ComplianceTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplianceType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplianceTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complianceRecords<T extends ComplianceType$complianceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, ComplianceType$complianceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the ComplianceType model
   */ 
  interface ComplianceTypeFieldRefs {
    readonly id: FieldRef<"ComplianceType", 'String'>
    readonly name: FieldRef<"ComplianceType", 'String'>
    readonly description: FieldRef<"ComplianceType", 'String'>
    readonly renewalFrequencyMonths: FieldRef<"ComplianceType", 'Int'>
    readonly isRequired: FieldRef<"ComplianceType", 'Boolean'>
    readonly createdAt: FieldRef<"ComplianceType", 'DateTime'>
    readonly updatedAt: FieldRef<"ComplianceType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplianceType findUnique
   */
  export type ComplianceTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceType to fetch.
     */
    where: ComplianceTypeWhereUniqueInput
  }

  /**
   * ComplianceType findUniqueOrThrow
   */
  export type ComplianceTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceType to fetch.
     */
    where: ComplianceTypeWhereUniqueInput
  }

  /**
   * ComplianceType findFirst
   */
  export type ComplianceTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceType to fetch.
     */
    where?: ComplianceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceTypes to fetch.
     */
    orderBy?: ComplianceTypeOrderByWithRelationInput | ComplianceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceTypes.
     */
    cursor?: ComplianceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceTypes.
     */
    distinct?: ComplianceTypeScalarFieldEnum | ComplianceTypeScalarFieldEnum[]
  }

  /**
   * ComplianceType findFirstOrThrow
   */
  export type ComplianceTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceType to fetch.
     */
    where?: ComplianceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceTypes to fetch.
     */
    orderBy?: ComplianceTypeOrderByWithRelationInput | ComplianceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceTypes.
     */
    cursor?: ComplianceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceTypes.
     */
    distinct?: ComplianceTypeScalarFieldEnum | ComplianceTypeScalarFieldEnum[]
  }

  /**
   * ComplianceType findMany
   */
  export type ComplianceTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceTypes to fetch.
     */
    where?: ComplianceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceTypes to fetch.
     */
    orderBy?: ComplianceTypeOrderByWithRelationInput | ComplianceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplianceTypes.
     */
    cursor?: ComplianceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceTypes.
     */
    skip?: number
    distinct?: ComplianceTypeScalarFieldEnum | ComplianceTypeScalarFieldEnum[]
  }

  /**
   * ComplianceType create
   */
  export type ComplianceTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplianceType.
     */
    data: XOR<ComplianceTypeCreateInput, ComplianceTypeUncheckedCreateInput>
  }

  /**
   * ComplianceType createMany
   */
  export type ComplianceTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplianceTypes.
     */
    data: ComplianceTypeCreateManyInput | ComplianceTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplianceType createManyAndReturn
   */
  export type ComplianceTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ComplianceTypes.
     */
    data: ComplianceTypeCreateManyInput | ComplianceTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplianceType update
   */
  export type ComplianceTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplianceType.
     */
    data: XOR<ComplianceTypeUpdateInput, ComplianceTypeUncheckedUpdateInput>
    /**
     * Choose, which ComplianceType to update.
     */
    where: ComplianceTypeWhereUniqueInput
  }

  /**
   * ComplianceType updateMany
   */
  export type ComplianceTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplianceTypes.
     */
    data: XOR<ComplianceTypeUpdateManyMutationInput, ComplianceTypeUncheckedUpdateManyInput>
    /**
     * Filter which ComplianceTypes to update
     */
    where?: ComplianceTypeWhereInput
  }

  /**
   * ComplianceType upsert
   */
  export type ComplianceTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplianceType to update in case it exists.
     */
    where: ComplianceTypeWhereUniqueInput
    /**
     * In case the ComplianceType found by the `where` argument doesn't exist, create a new ComplianceType with this data.
     */
    create: XOR<ComplianceTypeCreateInput, ComplianceTypeUncheckedCreateInput>
    /**
     * In case the ComplianceType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplianceTypeUpdateInput, ComplianceTypeUncheckedUpdateInput>
  }

  /**
   * ComplianceType delete
   */
  export type ComplianceTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
    /**
     * Filter which ComplianceType to delete.
     */
    where: ComplianceTypeWhereUniqueInput
  }

  /**
   * ComplianceType deleteMany
   */
  export type ComplianceTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceTypes to delete
     */
    where?: ComplianceTypeWhereInput
  }

  /**
   * ComplianceType.complianceRecords
   */
  export type ComplianceType$complianceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    where?: ComplianceRecordWhereInput
    orderBy?: ComplianceRecordOrderByWithRelationInput | ComplianceRecordOrderByWithRelationInput[]
    cursor?: ComplianceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplianceRecordScalarFieldEnum | ComplianceRecordScalarFieldEnum[]
  }

  /**
   * ComplianceType without action
   */
  export type ComplianceTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceType
     */
    select?: ComplianceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceTypeInclude<ExtArgs> | null
  }


  /**
   * Model ComplianceRecord
   */

  export type AggregateComplianceRecord = {
    _count: ComplianceRecordCountAggregateOutputType | null
    _min: ComplianceRecordMinAggregateOutputType | null
    _max: ComplianceRecordMaxAggregateOutputType | null
  }

  export type ComplianceRecordMinAggregateOutputType = {
    id: string | null
    lastCompletedDate: Date | null
    nextDueDate: Date | null
    documentUrl: string | null
    notes: string | null
    lastReminderSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
    complianceTypeId: string | null
  }

  export type ComplianceRecordMaxAggregateOutputType = {
    id: string | null
    lastCompletedDate: Date | null
    nextDueDate: Date | null
    documentUrl: string | null
    notes: string | null
    lastReminderSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
    complianceTypeId: string | null
  }

  export type ComplianceRecordCountAggregateOutputType = {
    id: number
    lastCompletedDate: number
    nextDueDate: number
    documentUrl: number
    notes: number
    lastReminderSentAt: number
    createdAt: number
    updatedAt: number
    propertyId: number
    complianceTypeId: number
    _all: number
  }


  export type ComplianceRecordMinAggregateInputType = {
    id?: true
    lastCompletedDate?: true
    nextDueDate?: true
    documentUrl?: true
    notes?: true
    lastReminderSentAt?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    complianceTypeId?: true
  }

  export type ComplianceRecordMaxAggregateInputType = {
    id?: true
    lastCompletedDate?: true
    nextDueDate?: true
    documentUrl?: true
    notes?: true
    lastReminderSentAt?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    complianceTypeId?: true
  }

  export type ComplianceRecordCountAggregateInputType = {
    id?: true
    lastCompletedDate?: true
    nextDueDate?: true
    documentUrl?: true
    notes?: true
    lastReminderSentAt?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    complianceTypeId?: true
    _all?: true
  }

  export type ComplianceRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceRecord to aggregate.
     */
    where?: ComplianceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceRecords to fetch.
     */
    orderBy?: ComplianceRecordOrderByWithRelationInput | ComplianceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplianceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplianceRecords
    **/
    _count?: true | ComplianceRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplianceRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplianceRecordMaxAggregateInputType
  }

  export type GetComplianceRecordAggregateType<T extends ComplianceRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateComplianceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplianceRecord[P]>
      : GetScalarType<T[P], AggregateComplianceRecord[P]>
  }




  export type ComplianceRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceRecordWhereInput
    orderBy?: ComplianceRecordOrderByWithAggregationInput | ComplianceRecordOrderByWithAggregationInput[]
    by: ComplianceRecordScalarFieldEnum[] | ComplianceRecordScalarFieldEnum
    having?: ComplianceRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplianceRecordCountAggregateInputType | true
    _min?: ComplianceRecordMinAggregateInputType
    _max?: ComplianceRecordMaxAggregateInputType
  }

  export type ComplianceRecordGroupByOutputType = {
    id: string
    lastCompletedDate: Date
    nextDueDate: Date
    documentUrl: string | null
    notes: string | null
    lastReminderSentAt: Date | null
    createdAt: Date
    updatedAt: Date
    propertyId: string
    complianceTypeId: string
    _count: ComplianceRecordCountAggregateOutputType | null
    _min: ComplianceRecordMinAggregateOutputType | null
    _max: ComplianceRecordMaxAggregateOutputType | null
  }

  type GetComplianceRecordGroupByPayload<T extends ComplianceRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplianceRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplianceRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplianceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], ComplianceRecordGroupByOutputType[P]>
        }
      >
    >


  export type ComplianceRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastCompletedDate?: boolean
    nextDueDate?: boolean
    documentUrl?: boolean
    notes?: boolean
    lastReminderSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    complianceTypeId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    complianceType?: boolean | ComplianceTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complianceRecord"]>

  export type ComplianceRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastCompletedDate?: boolean
    nextDueDate?: boolean
    documentUrl?: boolean
    notes?: boolean
    lastReminderSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    complianceTypeId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    complianceType?: boolean | ComplianceTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complianceRecord"]>

  export type ComplianceRecordSelectScalar = {
    id?: boolean
    lastCompletedDate?: boolean
    nextDueDate?: boolean
    documentUrl?: boolean
    notes?: boolean
    lastReminderSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    complianceTypeId?: boolean
  }

  export type ComplianceRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    complianceType?: boolean | ComplianceTypeDefaultArgs<ExtArgs>
  }
  export type ComplianceRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    complianceType?: boolean | ComplianceTypeDefaultArgs<ExtArgs>
  }

  export type $ComplianceRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplianceRecord"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      complianceType: Prisma.$ComplianceTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lastCompletedDate: Date
      nextDueDate: Date
      documentUrl: string | null
      notes: string | null
      lastReminderSentAt: Date | null
      createdAt: Date
      updatedAt: Date
      propertyId: string
      complianceTypeId: string
    }, ExtArgs["result"]["complianceRecord"]>
    composites: {}
  }

  type ComplianceRecordGetPayload<S extends boolean | null | undefined | ComplianceRecordDefaultArgs> = $Result.GetResult<Prisma.$ComplianceRecordPayload, S>

  type ComplianceRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComplianceRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComplianceRecordCountAggregateInputType | true
    }

  export interface ComplianceRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplianceRecord'], meta: { name: 'ComplianceRecord' } }
    /**
     * Find zero or one ComplianceRecord that matches the filter.
     * @param {ComplianceRecordFindUniqueArgs} args - Arguments to find a ComplianceRecord
     * @example
     * // Get one ComplianceRecord
     * const complianceRecord = await prisma.complianceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplianceRecordFindUniqueArgs>(args: SelectSubset<T, ComplianceRecordFindUniqueArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ComplianceRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComplianceRecordFindUniqueOrThrowArgs} args - Arguments to find a ComplianceRecord
     * @example
     * // Get one ComplianceRecord
     * const complianceRecord = await prisma.complianceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplianceRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplianceRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ComplianceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceRecordFindFirstArgs} args - Arguments to find a ComplianceRecord
     * @example
     * // Get one ComplianceRecord
     * const complianceRecord = await prisma.complianceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplianceRecordFindFirstArgs>(args?: SelectSubset<T, ComplianceRecordFindFirstArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ComplianceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceRecordFindFirstOrThrowArgs} args - Arguments to find a ComplianceRecord
     * @example
     * // Get one ComplianceRecord
     * const complianceRecord = await prisma.complianceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplianceRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplianceRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ComplianceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplianceRecords
     * const complianceRecords = await prisma.complianceRecord.findMany()
     * 
     * // Get first 10 ComplianceRecords
     * const complianceRecords = await prisma.complianceRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complianceRecordWithIdOnly = await prisma.complianceRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplianceRecordFindManyArgs>(args?: SelectSubset<T, ComplianceRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ComplianceRecord.
     * @param {ComplianceRecordCreateArgs} args - Arguments to create a ComplianceRecord.
     * @example
     * // Create one ComplianceRecord
     * const ComplianceRecord = await prisma.complianceRecord.create({
     *   data: {
     *     // ... data to create a ComplianceRecord
     *   }
     * })
     * 
     */
    create<T extends ComplianceRecordCreateArgs>(args: SelectSubset<T, ComplianceRecordCreateArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ComplianceRecords.
     * @param {ComplianceRecordCreateManyArgs} args - Arguments to create many ComplianceRecords.
     * @example
     * // Create many ComplianceRecords
     * const complianceRecord = await prisma.complianceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplianceRecordCreateManyArgs>(args?: SelectSubset<T, ComplianceRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplianceRecords and returns the data saved in the database.
     * @param {ComplianceRecordCreateManyAndReturnArgs} args - Arguments to create many ComplianceRecords.
     * @example
     * // Create many ComplianceRecords
     * const complianceRecord = await prisma.complianceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplianceRecords and only return the `id`
     * const complianceRecordWithIdOnly = await prisma.complianceRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplianceRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplianceRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ComplianceRecord.
     * @param {ComplianceRecordDeleteArgs} args - Arguments to delete one ComplianceRecord.
     * @example
     * // Delete one ComplianceRecord
     * const ComplianceRecord = await prisma.complianceRecord.delete({
     *   where: {
     *     // ... filter to delete one ComplianceRecord
     *   }
     * })
     * 
     */
    delete<T extends ComplianceRecordDeleteArgs>(args: SelectSubset<T, ComplianceRecordDeleteArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ComplianceRecord.
     * @param {ComplianceRecordUpdateArgs} args - Arguments to update one ComplianceRecord.
     * @example
     * // Update one ComplianceRecord
     * const complianceRecord = await prisma.complianceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplianceRecordUpdateArgs>(args: SelectSubset<T, ComplianceRecordUpdateArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ComplianceRecords.
     * @param {ComplianceRecordDeleteManyArgs} args - Arguments to filter ComplianceRecords to delete.
     * @example
     * // Delete a few ComplianceRecords
     * const { count } = await prisma.complianceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplianceRecordDeleteManyArgs>(args?: SelectSubset<T, ComplianceRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplianceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplianceRecords
     * const complianceRecord = await prisma.complianceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplianceRecordUpdateManyArgs>(args: SelectSubset<T, ComplianceRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComplianceRecord.
     * @param {ComplianceRecordUpsertArgs} args - Arguments to update or create a ComplianceRecord.
     * @example
     * // Update or create a ComplianceRecord
     * const complianceRecord = await prisma.complianceRecord.upsert({
     *   create: {
     *     // ... data to create a ComplianceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplianceRecord we want to update
     *   }
     * })
     */
    upsert<T extends ComplianceRecordUpsertArgs>(args: SelectSubset<T, ComplianceRecordUpsertArgs<ExtArgs>>): Prisma__ComplianceRecordClient<$Result.GetResult<Prisma.$ComplianceRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ComplianceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceRecordCountArgs} args - Arguments to filter ComplianceRecords to count.
     * @example
     * // Count the number of ComplianceRecords
     * const count = await prisma.complianceRecord.count({
     *   where: {
     *     // ... the filter for the ComplianceRecords we want to count
     *   }
     * })
    **/
    count<T extends ComplianceRecordCountArgs>(
      args?: Subset<T, ComplianceRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplianceRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplianceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComplianceRecordAggregateArgs>(args: Subset<T, ComplianceRecordAggregateArgs>): Prisma.PrismaPromise<GetComplianceRecordAggregateType<T>>

    /**
     * Group by ComplianceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceRecordGroupByArgs} args - Group by arguments.
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
      T extends ComplianceRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplianceRecordGroupByArgs['orderBy'] }
        : { orderBy?: ComplianceRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComplianceRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplianceRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplianceRecord model
   */
  readonly fields: ComplianceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplianceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplianceRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    complianceType<T extends ComplianceTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplianceTypeDefaultArgs<ExtArgs>>): Prisma__ComplianceTypeClient<$Result.GetResult<Prisma.$ComplianceTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ComplianceRecord model
   */ 
  interface ComplianceRecordFieldRefs {
    readonly id: FieldRef<"ComplianceRecord", 'String'>
    readonly lastCompletedDate: FieldRef<"ComplianceRecord", 'DateTime'>
    readonly nextDueDate: FieldRef<"ComplianceRecord", 'DateTime'>
    readonly documentUrl: FieldRef<"ComplianceRecord", 'String'>
    readonly notes: FieldRef<"ComplianceRecord", 'String'>
    readonly lastReminderSentAt: FieldRef<"ComplianceRecord", 'DateTime'>
    readonly createdAt: FieldRef<"ComplianceRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"ComplianceRecord", 'DateTime'>
    readonly propertyId: FieldRef<"ComplianceRecord", 'String'>
    readonly complianceTypeId: FieldRef<"ComplianceRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ComplianceRecord findUnique
   */
  export type ComplianceRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceRecord to fetch.
     */
    where: ComplianceRecordWhereUniqueInput
  }

  /**
   * ComplianceRecord findUniqueOrThrow
   */
  export type ComplianceRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceRecord to fetch.
     */
    where: ComplianceRecordWhereUniqueInput
  }

  /**
   * ComplianceRecord findFirst
   */
  export type ComplianceRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceRecord to fetch.
     */
    where?: ComplianceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceRecords to fetch.
     */
    orderBy?: ComplianceRecordOrderByWithRelationInput | ComplianceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceRecords.
     */
    cursor?: ComplianceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceRecords.
     */
    distinct?: ComplianceRecordScalarFieldEnum | ComplianceRecordScalarFieldEnum[]
  }

  /**
   * ComplianceRecord findFirstOrThrow
   */
  export type ComplianceRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceRecord to fetch.
     */
    where?: ComplianceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceRecords to fetch.
     */
    orderBy?: ComplianceRecordOrderByWithRelationInput | ComplianceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceRecords.
     */
    cursor?: ComplianceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceRecords.
     */
    distinct?: ComplianceRecordScalarFieldEnum | ComplianceRecordScalarFieldEnum[]
  }

  /**
   * ComplianceRecord findMany
   */
  export type ComplianceRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceRecords to fetch.
     */
    where?: ComplianceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceRecords to fetch.
     */
    orderBy?: ComplianceRecordOrderByWithRelationInput | ComplianceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplianceRecords.
     */
    cursor?: ComplianceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceRecords.
     */
    skip?: number
    distinct?: ComplianceRecordScalarFieldEnum | ComplianceRecordScalarFieldEnum[]
  }

  /**
   * ComplianceRecord create
   */
  export type ComplianceRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplianceRecord.
     */
    data: XOR<ComplianceRecordCreateInput, ComplianceRecordUncheckedCreateInput>
  }

  /**
   * ComplianceRecord createMany
   */
  export type ComplianceRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplianceRecords.
     */
    data: ComplianceRecordCreateManyInput | ComplianceRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplianceRecord createManyAndReturn
   */
  export type ComplianceRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ComplianceRecords.
     */
    data: ComplianceRecordCreateManyInput | ComplianceRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplianceRecord update
   */
  export type ComplianceRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplianceRecord.
     */
    data: XOR<ComplianceRecordUpdateInput, ComplianceRecordUncheckedUpdateInput>
    /**
     * Choose, which ComplianceRecord to update.
     */
    where: ComplianceRecordWhereUniqueInput
  }

  /**
   * ComplianceRecord updateMany
   */
  export type ComplianceRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplianceRecords.
     */
    data: XOR<ComplianceRecordUpdateManyMutationInput, ComplianceRecordUncheckedUpdateManyInput>
    /**
     * Filter which ComplianceRecords to update
     */
    where?: ComplianceRecordWhereInput
  }

  /**
   * ComplianceRecord upsert
   */
  export type ComplianceRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplianceRecord to update in case it exists.
     */
    where: ComplianceRecordWhereUniqueInput
    /**
     * In case the ComplianceRecord found by the `where` argument doesn't exist, create a new ComplianceRecord with this data.
     */
    create: XOR<ComplianceRecordCreateInput, ComplianceRecordUncheckedCreateInput>
    /**
     * In case the ComplianceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplianceRecordUpdateInput, ComplianceRecordUncheckedUpdateInput>
  }

  /**
   * ComplianceRecord delete
   */
  export type ComplianceRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
    /**
     * Filter which ComplianceRecord to delete.
     */
    where: ComplianceRecordWhereUniqueInput
  }

  /**
   * ComplianceRecord deleteMany
   */
  export type ComplianceRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceRecords to delete
     */
    where?: ComplianceRecordWhereInput
  }

  /**
   * ComplianceRecord without action
   */
  export type ComplianceRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceRecord
     */
    select?: ComplianceRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceRecordInclude<ExtArgs> | null
  }


  /**
   * Model MaintenanceTicket
   */

  export type AggregateMaintenanceTicket = {
    _count: MaintenanceTicketCountAggregateOutputType | null
    _min: MaintenanceTicketMinAggregateOutputType | null
    _max: MaintenanceTicketMaxAggregateOutputType | null
  }

  export type MaintenanceTicketMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    priority: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
    tenancyId: string | null
    reportedByUserId: string | null
  }

  export type MaintenanceTicketMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    priority: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
    tenancyId: string | null
    reportedByUserId: string | null
  }

  export type MaintenanceTicketCountAggregateOutputType = {
    id: number
    title: number
    description: number
    priority: number
    status: number
    createdAt: number
    updatedAt: number
    propertyId: number
    tenancyId: number
    reportedByUserId: number
    _all: number
  }


  export type MaintenanceTicketMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    tenancyId?: true
    reportedByUserId?: true
  }

  export type MaintenanceTicketMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    tenancyId?: true
    reportedByUserId?: true
  }

  export type MaintenanceTicketCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    tenancyId?: true
    reportedByUserId?: true
    _all?: true
  }

  export type MaintenanceTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceTicket to aggregate.
     */
    where?: MaintenanceTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceTickets to fetch.
     */
    orderBy?: MaintenanceTicketOrderByWithRelationInput | MaintenanceTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaintenanceTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaintenanceTickets
    **/
    _count?: true | MaintenanceTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaintenanceTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaintenanceTicketMaxAggregateInputType
  }

  export type GetMaintenanceTicketAggregateType<T extends MaintenanceTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateMaintenanceTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaintenanceTicket[P]>
      : GetScalarType<T[P], AggregateMaintenanceTicket[P]>
  }




  export type MaintenanceTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceTicketWhereInput
    orderBy?: MaintenanceTicketOrderByWithAggregationInput | MaintenanceTicketOrderByWithAggregationInput[]
    by: MaintenanceTicketScalarFieldEnum[] | MaintenanceTicketScalarFieldEnum
    having?: MaintenanceTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaintenanceTicketCountAggregateInputType | true
    _min?: MaintenanceTicketMinAggregateInputType
    _max?: MaintenanceTicketMaxAggregateInputType
  }

  export type MaintenanceTicketGroupByOutputType = {
    id: string
    title: string
    description: string
    priority: string
    status: string
    createdAt: Date
    updatedAt: Date
    propertyId: string
    tenancyId: string | null
    reportedByUserId: string | null
    _count: MaintenanceTicketCountAggregateOutputType | null
    _min: MaintenanceTicketMinAggregateOutputType | null
    _max: MaintenanceTicketMaxAggregateOutputType | null
  }

  type GetMaintenanceTicketGroupByPayload<T extends MaintenanceTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaintenanceTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaintenanceTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaintenanceTicketGroupByOutputType[P]>
            : GetScalarType<T[P], MaintenanceTicketGroupByOutputType[P]>
        }
      >
    >


  export type MaintenanceTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    tenancyId?: boolean
    reportedByUserId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenancy?: boolean | MaintenanceTicket$tenancyArgs<ExtArgs>
  }, ExtArgs["result"]["maintenanceTicket"]>

  export type MaintenanceTicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    tenancyId?: boolean
    reportedByUserId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenancy?: boolean | MaintenanceTicket$tenancyArgs<ExtArgs>
  }, ExtArgs["result"]["maintenanceTicket"]>

  export type MaintenanceTicketSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    tenancyId?: boolean
    reportedByUserId?: boolean
  }

  export type MaintenanceTicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenancy?: boolean | MaintenanceTicket$tenancyArgs<ExtArgs>
  }
  export type MaintenanceTicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenancy?: boolean | MaintenanceTicket$tenancyArgs<ExtArgs>
  }

  export type $MaintenanceTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaintenanceTicket"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      tenancy: Prisma.$TenancyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      priority: string
      status: string
      createdAt: Date
      updatedAt: Date
      propertyId: string
      tenancyId: string | null
      reportedByUserId: string | null
    }, ExtArgs["result"]["maintenanceTicket"]>
    composites: {}
  }

  type MaintenanceTicketGetPayload<S extends boolean | null | undefined | MaintenanceTicketDefaultArgs> = $Result.GetResult<Prisma.$MaintenanceTicketPayload, S>

  type MaintenanceTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MaintenanceTicketFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MaintenanceTicketCountAggregateInputType | true
    }

  export interface MaintenanceTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaintenanceTicket'], meta: { name: 'MaintenanceTicket' } }
    /**
     * Find zero or one MaintenanceTicket that matches the filter.
     * @param {MaintenanceTicketFindUniqueArgs} args - Arguments to find a MaintenanceTicket
     * @example
     * // Get one MaintenanceTicket
     * const maintenanceTicket = await prisma.maintenanceTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintenanceTicketFindUniqueArgs>(args: SelectSubset<T, MaintenanceTicketFindUniqueArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MaintenanceTicket that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MaintenanceTicketFindUniqueOrThrowArgs} args - Arguments to find a MaintenanceTicket
     * @example
     * // Get one MaintenanceTicket
     * const maintenanceTicket = await prisma.maintenanceTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintenanceTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, MaintenanceTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MaintenanceTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceTicketFindFirstArgs} args - Arguments to find a MaintenanceTicket
     * @example
     * // Get one MaintenanceTicket
     * const maintenanceTicket = await prisma.maintenanceTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintenanceTicketFindFirstArgs>(args?: SelectSubset<T, MaintenanceTicketFindFirstArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MaintenanceTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceTicketFindFirstOrThrowArgs} args - Arguments to find a MaintenanceTicket
     * @example
     * // Get one MaintenanceTicket
     * const maintenanceTicket = await prisma.maintenanceTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintenanceTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, MaintenanceTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MaintenanceTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintenanceTickets
     * const maintenanceTickets = await prisma.maintenanceTicket.findMany()
     * 
     * // Get first 10 MaintenanceTickets
     * const maintenanceTickets = await prisma.maintenanceTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const maintenanceTicketWithIdOnly = await prisma.maintenanceTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaintenanceTicketFindManyArgs>(args?: SelectSubset<T, MaintenanceTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MaintenanceTicket.
     * @param {MaintenanceTicketCreateArgs} args - Arguments to create a MaintenanceTicket.
     * @example
     * // Create one MaintenanceTicket
     * const MaintenanceTicket = await prisma.maintenanceTicket.create({
     *   data: {
     *     // ... data to create a MaintenanceTicket
     *   }
     * })
     * 
     */
    create<T extends MaintenanceTicketCreateArgs>(args: SelectSubset<T, MaintenanceTicketCreateArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MaintenanceTickets.
     * @param {MaintenanceTicketCreateManyArgs} args - Arguments to create many MaintenanceTickets.
     * @example
     * // Create many MaintenanceTickets
     * const maintenanceTicket = await prisma.maintenanceTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaintenanceTicketCreateManyArgs>(args?: SelectSubset<T, MaintenanceTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaintenanceTickets and returns the data saved in the database.
     * @param {MaintenanceTicketCreateManyAndReturnArgs} args - Arguments to create many MaintenanceTickets.
     * @example
     * // Create many MaintenanceTickets
     * const maintenanceTicket = await prisma.maintenanceTicket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaintenanceTickets and only return the `id`
     * const maintenanceTicketWithIdOnly = await prisma.maintenanceTicket.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaintenanceTicketCreateManyAndReturnArgs>(args?: SelectSubset<T, MaintenanceTicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MaintenanceTicket.
     * @param {MaintenanceTicketDeleteArgs} args - Arguments to delete one MaintenanceTicket.
     * @example
     * // Delete one MaintenanceTicket
     * const MaintenanceTicket = await prisma.maintenanceTicket.delete({
     *   where: {
     *     // ... filter to delete one MaintenanceTicket
     *   }
     * })
     * 
     */
    delete<T extends MaintenanceTicketDeleteArgs>(args: SelectSubset<T, MaintenanceTicketDeleteArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MaintenanceTicket.
     * @param {MaintenanceTicketUpdateArgs} args - Arguments to update one MaintenanceTicket.
     * @example
     * // Update one MaintenanceTicket
     * const maintenanceTicket = await prisma.maintenanceTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaintenanceTicketUpdateArgs>(args: SelectSubset<T, MaintenanceTicketUpdateArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MaintenanceTickets.
     * @param {MaintenanceTicketDeleteManyArgs} args - Arguments to filter MaintenanceTickets to delete.
     * @example
     * // Delete a few MaintenanceTickets
     * const { count } = await prisma.maintenanceTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaintenanceTicketDeleteManyArgs>(args?: SelectSubset<T, MaintenanceTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaintenanceTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintenanceTickets
     * const maintenanceTicket = await prisma.maintenanceTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaintenanceTicketUpdateManyArgs>(args: SelectSubset<T, MaintenanceTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MaintenanceTicket.
     * @param {MaintenanceTicketUpsertArgs} args - Arguments to update or create a MaintenanceTicket.
     * @example
     * // Update or create a MaintenanceTicket
     * const maintenanceTicket = await prisma.maintenanceTicket.upsert({
     *   create: {
     *     // ... data to create a MaintenanceTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintenanceTicket we want to update
     *   }
     * })
     */
    upsert<T extends MaintenanceTicketUpsertArgs>(args: SelectSubset<T, MaintenanceTicketUpsertArgs<ExtArgs>>): Prisma__MaintenanceTicketClient<$Result.GetResult<Prisma.$MaintenanceTicketPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MaintenanceTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceTicketCountArgs} args - Arguments to filter MaintenanceTickets to count.
     * @example
     * // Count the number of MaintenanceTickets
     * const count = await prisma.maintenanceTicket.count({
     *   where: {
     *     // ... the filter for the MaintenanceTickets we want to count
     *   }
     * })
    **/
    count<T extends MaintenanceTicketCountArgs>(
      args?: Subset<T, MaintenanceTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaintenanceTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaintenanceTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaintenanceTicketAggregateArgs>(args: Subset<T, MaintenanceTicketAggregateArgs>): Prisma.PrismaPromise<GetMaintenanceTicketAggregateType<T>>

    /**
     * Group by MaintenanceTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceTicketGroupByArgs} args - Group by arguments.
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
      T extends MaintenanceTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaintenanceTicketGroupByArgs['orderBy'] }
        : { orderBy?: MaintenanceTicketGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaintenanceTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenanceTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaintenanceTicket model
   */
  readonly fields: MaintenanceTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaintenanceTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaintenanceTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tenancy<T extends MaintenanceTicket$tenancyArgs<ExtArgs> = {}>(args?: Subset<T, MaintenanceTicket$tenancyArgs<ExtArgs>>): Prisma__TenancyClient<$Result.GetResult<Prisma.$TenancyPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the MaintenanceTicket model
   */ 
  interface MaintenanceTicketFieldRefs {
    readonly id: FieldRef<"MaintenanceTicket", 'String'>
    readonly title: FieldRef<"MaintenanceTicket", 'String'>
    readonly description: FieldRef<"MaintenanceTicket", 'String'>
    readonly priority: FieldRef<"MaintenanceTicket", 'String'>
    readonly status: FieldRef<"MaintenanceTicket", 'String'>
    readonly createdAt: FieldRef<"MaintenanceTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"MaintenanceTicket", 'DateTime'>
    readonly propertyId: FieldRef<"MaintenanceTicket", 'String'>
    readonly tenancyId: FieldRef<"MaintenanceTicket", 'String'>
    readonly reportedByUserId: FieldRef<"MaintenanceTicket", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MaintenanceTicket findUnique
   */
  export type MaintenanceTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceTicket to fetch.
     */
    where: MaintenanceTicketWhereUniqueInput
  }

  /**
   * MaintenanceTicket findUniqueOrThrow
   */
  export type MaintenanceTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceTicket to fetch.
     */
    where: MaintenanceTicketWhereUniqueInput
  }

  /**
   * MaintenanceTicket findFirst
   */
  export type MaintenanceTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceTicket to fetch.
     */
    where?: MaintenanceTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceTickets to fetch.
     */
    orderBy?: MaintenanceTicketOrderByWithRelationInput | MaintenanceTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintenanceTickets.
     */
    cursor?: MaintenanceTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintenanceTickets.
     */
    distinct?: MaintenanceTicketScalarFieldEnum | MaintenanceTicketScalarFieldEnum[]
  }

  /**
   * MaintenanceTicket findFirstOrThrow
   */
  export type MaintenanceTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceTicket to fetch.
     */
    where?: MaintenanceTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceTickets to fetch.
     */
    orderBy?: MaintenanceTicketOrderByWithRelationInput | MaintenanceTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintenanceTickets.
     */
    cursor?: MaintenanceTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintenanceTickets.
     */
    distinct?: MaintenanceTicketScalarFieldEnum | MaintenanceTicketScalarFieldEnum[]
  }

  /**
   * MaintenanceTicket findMany
   */
  export type MaintenanceTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceTickets to fetch.
     */
    where?: MaintenanceTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceTickets to fetch.
     */
    orderBy?: MaintenanceTicketOrderByWithRelationInput | MaintenanceTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaintenanceTickets.
     */
    cursor?: MaintenanceTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceTickets.
     */
    skip?: number
    distinct?: MaintenanceTicketScalarFieldEnum | MaintenanceTicketScalarFieldEnum[]
  }

  /**
   * MaintenanceTicket create
   */
  export type MaintenanceTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * The data needed to create a MaintenanceTicket.
     */
    data: XOR<MaintenanceTicketCreateInput, MaintenanceTicketUncheckedCreateInput>
  }

  /**
   * MaintenanceTicket createMany
   */
  export type MaintenanceTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintenanceTickets.
     */
    data: MaintenanceTicketCreateManyInput | MaintenanceTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaintenanceTicket createManyAndReturn
   */
  export type MaintenanceTicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MaintenanceTickets.
     */
    data: MaintenanceTicketCreateManyInput | MaintenanceTicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaintenanceTicket update
   */
  export type MaintenanceTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * The data needed to update a MaintenanceTicket.
     */
    data: XOR<MaintenanceTicketUpdateInput, MaintenanceTicketUncheckedUpdateInput>
    /**
     * Choose, which MaintenanceTicket to update.
     */
    where: MaintenanceTicketWhereUniqueInput
  }

  /**
   * MaintenanceTicket updateMany
   */
  export type MaintenanceTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintenanceTickets.
     */
    data: XOR<MaintenanceTicketUpdateManyMutationInput, MaintenanceTicketUncheckedUpdateManyInput>
    /**
     * Filter which MaintenanceTickets to update
     */
    where?: MaintenanceTicketWhereInput
  }

  /**
   * MaintenanceTicket upsert
   */
  export type MaintenanceTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * The filter to search for the MaintenanceTicket to update in case it exists.
     */
    where: MaintenanceTicketWhereUniqueInput
    /**
     * In case the MaintenanceTicket found by the `where` argument doesn't exist, create a new MaintenanceTicket with this data.
     */
    create: XOR<MaintenanceTicketCreateInput, MaintenanceTicketUncheckedCreateInput>
    /**
     * In case the MaintenanceTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaintenanceTicketUpdateInput, MaintenanceTicketUncheckedUpdateInput>
  }

  /**
   * MaintenanceTicket delete
   */
  export type MaintenanceTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
    /**
     * Filter which MaintenanceTicket to delete.
     */
    where: MaintenanceTicketWhereUniqueInput
  }

  /**
   * MaintenanceTicket deleteMany
   */
  export type MaintenanceTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceTickets to delete
     */
    where?: MaintenanceTicketWhereInput
  }

  /**
   * MaintenanceTicket.tenancy
   */
  export type MaintenanceTicket$tenancyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenancy
     */
    select?: TenancySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenancyInclude<ExtArgs> | null
    where?: TenancyWhereInput
  }

  /**
   * MaintenanceTicket without action
   */
  export type MaintenanceTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceTicket
     */
    select?: MaintenanceTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceTicketInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    type: string | null
    amount: Decimal | null
    description: string | null
    category: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    type: string | null
    amount: Decimal | null
    description: string | null
    category: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    propertyId: string | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    type: number
    amount: number
    description: number
    category: number
    date: number
    createdAt: number
    updatedAt: number
    propertyId: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    type?: true
    amount?: true
    description?: true
    category?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    type?: true
    amount?: true
    description?: true
    category?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    type?: true
    amount?: true
    description?: true
    category?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    propertyId?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    type: string
    amount: Decimal
    description: string
    category: string
    date: Date
    createdAt: Date
    updatedAt: Date
    propertyId: string
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    category?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    category?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    category?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    propertyId?: boolean
  }

  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      amount: Prisma.Decimal
      description: string
      category: string
      date: Date
      createdAt: Date
      updatedAt: Date
      propertyId: string
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Transaction model
   */ 
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly category: FieldRef<"Transaction", 'String'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
    readonly propertyId: FieldRef<"Transaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
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


  export const PropertyScalarFieldEnum: {
    id: 'id',
    address: 'address',
    postcode: 'postcode',
    city: 'city',
    propertyType: 'propertyType',
    bedrooms: 'bedrooms',
    bathrooms: 'bathrooms',
    purchaseDate: 'purchaseDate',
    propertyValueEstimate: 'propertyValueEstimate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const TenancyScalarFieldEnum: {
    id: 'id',
    tenantName: 'tenantName',
    tenantEmail: 'tenantEmail',
    startDate: 'startDate',
    endDate: 'endDate',
    monthlyRent: 'monthlyRent',
    depositAmount: 'depositAmount',
    depositProtectionScheme: 'depositProtectionScheme',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    propertyId: 'propertyId'
  };

  export type TenancyScalarFieldEnum = (typeof TenancyScalarFieldEnum)[keyof typeof TenancyScalarFieldEnum]


  export const ComplianceTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    renewalFrequencyMonths: 'renewalFrequencyMonths',
    isRequired: 'isRequired',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ComplianceTypeScalarFieldEnum = (typeof ComplianceTypeScalarFieldEnum)[keyof typeof ComplianceTypeScalarFieldEnum]


  export const ComplianceRecordScalarFieldEnum: {
    id: 'id',
    lastCompletedDate: 'lastCompletedDate',
    nextDueDate: 'nextDueDate',
    documentUrl: 'documentUrl',
    notes: 'notes',
    lastReminderSentAt: 'lastReminderSentAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    propertyId: 'propertyId',
    complianceTypeId: 'complianceTypeId'
  };

  export type ComplianceRecordScalarFieldEnum = (typeof ComplianceRecordScalarFieldEnum)[keyof typeof ComplianceRecordScalarFieldEnum]


  export const MaintenanceTicketScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    priority: 'priority',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    propertyId: 'propertyId',
    tenancyId: 'tenancyId',
    reportedByUserId: 'reportedByUserId'
  };

  export type MaintenanceTicketScalarFieldEnum = (typeof MaintenanceTicketScalarFieldEnum)[keyof typeof MaintenanceTicketScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    amount: 'amount',
    description: 'description',
    category: 'category',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    propertyId: 'propertyId'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: StringFilter<"Property"> | string
    address?: StringFilter<"Property"> | string
    postcode?: StringFilter<"Property"> | string
    city?: StringNullableFilter<"Property"> | string | null
    propertyType?: StringNullableFilter<"Property"> | string | null
    bedrooms?: IntNullableFilter<"Property"> | number | null
    bathrooms?: IntNullableFilter<"Property"> | number | null
    purchaseDate?: DateTimeNullableFilter<"Property"> | Date | string | null
    propertyValueEstimate?: DecimalNullableFilter<"Property"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    tenancies?: TenancyListRelationFilter
    complianceRecords?: ComplianceRecordListRelationFilter
    maintenanceTickets?: MaintenanceTicketListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    city?: SortOrderInput | SortOrder
    propertyType?: SortOrderInput | SortOrder
    bedrooms?: SortOrderInput | SortOrder
    bathrooms?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    propertyValueEstimate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenancies?: TenancyOrderByRelationAggregateInput
    complianceRecords?: ComplianceRecordOrderByRelationAggregateInput
    maintenanceTickets?: MaintenanceTicketOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    address?: StringFilter<"Property"> | string
    postcode?: StringFilter<"Property"> | string
    city?: StringNullableFilter<"Property"> | string | null
    propertyType?: StringNullableFilter<"Property"> | string | null
    bedrooms?: IntNullableFilter<"Property"> | number | null
    bathrooms?: IntNullableFilter<"Property"> | number | null
    purchaseDate?: DateTimeNullableFilter<"Property"> | Date | string | null
    propertyValueEstimate?: DecimalNullableFilter<"Property"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    tenancies?: TenancyListRelationFilter
    complianceRecords?: ComplianceRecordListRelationFilter
    maintenanceTickets?: MaintenanceTicketListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    city?: SortOrderInput | SortOrder
    propertyType?: SortOrderInput | SortOrder
    bedrooms?: SortOrderInput | SortOrder
    bathrooms?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    propertyValueEstimate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _avg?: PropertyAvgOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
    _sum?: PropertySumOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Property"> | string
    address?: StringWithAggregatesFilter<"Property"> | string
    postcode?: StringWithAggregatesFilter<"Property"> | string
    city?: StringNullableWithAggregatesFilter<"Property"> | string | null
    propertyType?: StringNullableWithAggregatesFilter<"Property"> | string | null
    bedrooms?: IntNullableWithAggregatesFilter<"Property"> | number | null
    bathrooms?: IntNullableWithAggregatesFilter<"Property"> | number | null
    purchaseDate?: DateTimeNullableWithAggregatesFilter<"Property"> | Date | string | null
    propertyValueEstimate?: DecimalNullableWithAggregatesFilter<"Property"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
  }

  export type TenancyWhereInput = {
    AND?: TenancyWhereInput | TenancyWhereInput[]
    OR?: TenancyWhereInput[]
    NOT?: TenancyWhereInput | TenancyWhereInput[]
    id?: StringFilter<"Tenancy"> | string
    tenantName?: StringFilter<"Tenancy"> | string
    tenantEmail?: StringNullableFilter<"Tenancy"> | string | null
    startDate?: DateTimeFilter<"Tenancy"> | Date | string
    endDate?: DateTimeNullableFilter<"Tenancy"> | Date | string | null
    monthlyRent?: DecimalFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string
    depositAmount?: DecimalNullableFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: StringNullableFilter<"Tenancy"> | string | null
    createdAt?: DateTimeFilter<"Tenancy"> | Date | string
    updatedAt?: DateTimeFilter<"Tenancy"> | Date | string
    propertyId?: StringFilter<"Tenancy"> | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
    maintenanceTickets?: MaintenanceTicketListRelationFilter
  }

  export type TenancyOrderByWithRelationInput = {
    id?: SortOrder
    tenantName?: SortOrder
    tenantEmail?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    monthlyRent?: SortOrder
    depositAmount?: SortOrderInput | SortOrder
    depositProtectionScheme?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    property?: PropertyOrderByWithRelationInput
    maintenanceTickets?: MaintenanceTicketOrderByRelationAggregateInput
  }

  export type TenancyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TenancyWhereInput | TenancyWhereInput[]
    OR?: TenancyWhereInput[]
    NOT?: TenancyWhereInput | TenancyWhereInput[]
    tenantName?: StringFilter<"Tenancy"> | string
    tenantEmail?: StringNullableFilter<"Tenancy"> | string | null
    startDate?: DateTimeFilter<"Tenancy"> | Date | string
    endDate?: DateTimeNullableFilter<"Tenancy"> | Date | string | null
    monthlyRent?: DecimalFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string
    depositAmount?: DecimalNullableFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: StringNullableFilter<"Tenancy"> | string | null
    createdAt?: DateTimeFilter<"Tenancy"> | Date | string
    updatedAt?: DateTimeFilter<"Tenancy"> | Date | string
    propertyId?: StringFilter<"Tenancy"> | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
    maintenanceTickets?: MaintenanceTicketListRelationFilter
  }, "id">

  export type TenancyOrderByWithAggregationInput = {
    id?: SortOrder
    tenantName?: SortOrder
    tenantEmail?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    monthlyRent?: SortOrder
    depositAmount?: SortOrderInput | SortOrder
    depositProtectionScheme?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    _count?: TenancyCountOrderByAggregateInput
    _avg?: TenancyAvgOrderByAggregateInput
    _max?: TenancyMaxOrderByAggregateInput
    _min?: TenancyMinOrderByAggregateInput
    _sum?: TenancySumOrderByAggregateInput
  }

  export type TenancyScalarWhereWithAggregatesInput = {
    AND?: TenancyScalarWhereWithAggregatesInput | TenancyScalarWhereWithAggregatesInput[]
    OR?: TenancyScalarWhereWithAggregatesInput[]
    NOT?: TenancyScalarWhereWithAggregatesInput | TenancyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenancy"> | string
    tenantName?: StringWithAggregatesFilter<"Tenancy"> | string
    tenantEmail?: StringNullableWithAggregatesFilter<"Tenancy"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Tenancy"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Tenancy"> | Date | string | null
    monthlyRent?: DecimalWithAggregatesFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string
    depositAmount?: DecimalNullableWithAggregatesFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: StringNullableWithAggregatesFilter<"Tenancy"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenancy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenancy"> | Date | string
    propertyId?: StringWithAggregatesFilter<"Tenancy"> | string
  }

  export type ComplianceTypeWhereInput = {
    AND?: ComplianceTypeWhereInput | ComplianceTypeWhereInput[]
    OR?: ComplianceTypeWhereInput[]
    NOT?: ComplianceTypeWhereInput | ComplianceTypeWhereInput[]
    id?: StringFilter<"ComplianceType"> | string
    name?: StringFilter<"ComplianceType"> | string
    description?: StringNullableFilter<"ComplianceType"> | string | null
    renewalFrequencyMonths?: IntFilter<"ComplianceType"> | number
    isRequired?: BoolFilter<"ComplianceType"> | boolean
    createdAt?: DateTimeFilter<"ComplianceType"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceType"> | Date | string
    complianceRecords?: ComplianceRecordListRelationFilter
  }

  export type ComplianceTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    renewalFrequencyMonths?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    complianceRecords?: ComplianceRecordOrderByRelationAggregateInput
  }

  export type ComplianceTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ComplianceTypeWhereInput | ComplianceTypeWhereInput[]
    OR?: ComplianceTypeWhereInput[]
    NOT?: ComplianceTypeWhereInput | ComplianceTypeWhereInput[]
    description?: StringNullableFilter<"ComplianceType"> | string | null
    renewalFrequencyMonths?: IntFilter<"ComplianceType"> | number
    isRequired?: BoolFilter<"ComplianceType"> | boolean
    createdAt?: DateTimeFilter<"ComplianceType"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceType"> | Date | string
    complianceRecords?: ComplianceRecordListRelationFilter
  }, "id" | "name">

  export type ComplianceTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    renewalFrequencyMonths?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ComplianceTypeCountOrderByAggregateInput
    _avg?: ComplianceTypeAvgOrderByAggregateInput
    _max?: ComplianceTypeMaxOrderByAggregateInput
    _min?: ComplianceTypeMinOrderByAggregateInput
    _sum?: ComplianceTypeSumOrderByAggregateInput
  }

  export type ComplianceTypeScalarWhereWithAggregatesInput = {
    AND?: ComplianceTypeScalarWhereWithAggregatesInput | ComplianceTypeScalarWhereWithAggregatesInput[]
    OR?: ComplianceTypeScalarWhereWithAggregatesInput[]
    NOT?: ComplianceTypeScalarWhereWithAggregatesInput | ComplianceTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplianceType"> | string
    name?: StringWithAggregatesFilter<"ComplianceType"> | string
    description?: StringNullableWithAggregatesFilter<"ComplianceType"> | string | null
    renewalFrequencyMonths?: IntWithAggregatesFilter<"ComplianceType"> | number
    isRequired?: BoolWithAggregatesFilter<"ComplianceType"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ComplianceType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ComplianceType"> | Date | string
  }

  export type ComplianceRecordWhereInput = {
    AND?: ComplianceRecordWhereInput | ComplianceRecordWhereInput[]
    OR?: ComplianceRecordWhereInput[]
    NOT?: ComplianceRecordWhereInput | ComplianceRecordWhereInput[]
    id?: StringFilter<"ComplianceRecord"> | string
    lastCompletedDate?: DateTimeFilter<"ComplianceRecord"> | Date | string
    nextDueDate?: DateTimeFilter<"ComplianceRecord"> | Date | string
    documentUrl?: StringNullableFilter<"ComplianceRecord"> | string | null
    notes?: StringNullableFilter<"ComplianceRecord"> | string | null
    lastReminderSentAt?: DateTimeNullableFilter<"ComplianceRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"ComplianceRecord"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceRecord"> | Date | string
    propertyId?: StringFilter<"ComplianceRecord"> | string
    complianceTypeId?: StringFilter<"ComplianceRecord"> | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
    complianceType?: XOR<ComplianceTypeRelationFilter, ComplianceTypeWhereInput>
  }

  export type ComplianceRecordOrderByWithRelationInput = {
    id?: SortOrder
    lastCompletedDate?: SortOrder
    nextDueDate?: SortOrder
    documentUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    lastReminderSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    complianceTypeId?: SortOrder
    property?: PropertyOrderByWithRelationInput
    complianceType?: ComplianceTypeOrderByWithRelationInput
  }

  export type ComplianceRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplianceRecordWhereInput | ComplianceRecordWhereInput[]
    OR?: ComplianceRecordWhereInput[]
    NOT?: ComplianceRecordWhereInput | ComplianceRecordWhereInput[]
    lastCompletedDate?: DateTimeFilter<"ComplianceRecord"> | Date | string
    nextDueDate?: DateTimeFilter<"ComplianceRecord"> | Date | string
    documentUrl?: StringNullableFilter<"ComplianceRecord"> | string | null
    notes?: StringNullableFilter<"ComplianceRecord"> | string | null
    lastReminderSentAt?: DateTimeNullableFilter<"ComplianceRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"ComplianceRecord"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceRecord"> | Date | string
    propertyId?: StringFilter<"ComplianceRecord"> | string
    complianceTypeId?: StringFilter<"ComplianceRecord"> | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
    complianceType?: XOR<ComplianceTypeRelationFilter, ComplianceTypeWhereInput>
  }, "id">

  export type ComplianceRecordOrderByWithAggregationInput = {
    id?: SortOrder
    lastCompletedDate?: SortOrder
    nextDueDate?: SortOrder
    documentUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    lastReminderSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    complianceTypeId?: SortOrder
    _count?: ComplianceRecordCountOrderByAggregateInput
    _max?: ComplianceRecordMaxOrderByAggregateInput
    _min?: ComplianceRecordMinOrderByAggregateInput
  }

  export type ComplianceRecordScalarWhereWithAggregatesInput = {
    AND?: ComplianceRecordScalarWhereWithAggregatesInput | ComplianceRecordScalarWhereWithAggregatesInput[]
    OR?: ComplianceRecordScalarWhereWithAggregatesInput[]
    NOT?: ComplianceRecordScalarWhereWithAggregatesInput | ComplianceRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplianceRecord"> | string
    lastCompletedDate?: DateTimeWithAggregatesFilter<"ComplianceRecord"> | Date | string
    nextDueDate?: DateTimeWithAggregatesFilter<"ComplianceRecord"> | Date | string
    documentUrl?: StringNullableWithAggregatesFilter<"ComplianceRecord"> | string | null
    notes?: StringNullableWithAggregatesFilter<"ComplianceRecord"> | string | null
    lastReminderSentAt?: DateTimeNullableWithAggregatesFilter<"ComplianceRecord"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ComplianceRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ComplianceRecord"> | Date | string
    propertyId?: StringWithAggregatesFilter<"ComplianceRecord"> | string
    complianceTypeId?: StringWithAggregatesFilter<"ComplianceRecord"> | string
  }

  export type MaintenanceTicketWhereInput = {
    AND?: MaintenanceTicketWhereInput | MaintenanceTicketWhereInput[]
    OR?: MaintenanceTicketWhereInput[]
    NOT?: MaintenanceTicketWhereInput | MaintenanceTicketWhereInput[]
    id?: StringFilter<"MaintenanceTicket"> | string
    title?: StringFilter<"MaintenanceTicket"> | string
    description?: StringFilter<"MaintenanceTicket"> | string
    priority?: StringFilter<"MaintenanceTicket"> | string
    status?: StringFilter<"MaintenanceTicket"> | string
    createdAt?: DateTimeFilter<"MaintenanceTicket"> | Date | string
    updatedAt?: DateTimeFilter<"MaintenanceTicket"> | Date | string
    propertyId?: StringFilter<"MaintenanceTicket"> | string
    tenancyId?: StringNullableFilter<"MaintenanceTicket"> | string | null
    reportedByUserId?: StringNullableFilter<"MaintenanceTicket"> | string | null
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
    tenancy?: XOR<TenancyNullableRelationFilter, TenancyWhereInput> | null
  }

  export type MaintenanceTicketOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    tenancyId?: SortOrderInput | SortOrder
    reportedByUserId?: SortOrderInput | SortOrder
    property?: PropertyOrderByWithRelationInput
    tenancy?: TenancyOrderByWithRelationInput
  }

  export type MaintenanceTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaintenanceTicketWhereInput | MaintenanceTicketWhereInput[]
    OR?: MaintenanceTicketWhereInput[]
    NOT?: MaintenanceTicketWhereInput | MaintenanceTicketWhereInput[]
    title?: StringFilter<"MaintenanceTicket"> | string
    description?: StringFilter<"MaintenanceTicket"> | string
    priority?: StringFilter<"MaintenanceTicket"> | string
    status?: StringFilter<"MaintenanceTicket"> | string
    createdAt?: DateTimeFilter<"MaintenanceTicket"> | Date | string
    updatedAt?: DateTimeFilter<"MaintenanceTicket"> | Date | string
    propertyId?: StringFilter<"MaintenanceTicket"> | string
    tenancyId?: StringNullableFilter<"MaintenanceTicket"> | string | null
    reportedByUserId?: StringNullableFilter<"MaintenanceTicket"> | string | null
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
    tenancy?: XOR<TenancyNullableRelationFilter, TenancyWhereInput> | null
  }, "id">

  export type MaintenanceTicketOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    tenancyId?: SortOrderInput | SortOrder
    reportedByUserId?: SortOrderInput | SortOrder
    _count?: MaintenanceTicketCountOrderByAggregateInput
    _max?: MaintenanceTicketMaxOrderByAggregateInput
    _min?: MaintenanceTicketMinOrderByAggregateInput
  }

  export type MaintenanceTicketScalarWhereWithAggregatesInput = {
    AND?: MaintenanceTicketScalarWhereWithAggregatesInput | MaintenanceTicketScalarWhereWithAggregatesInput[]
    OR?: MaintenanceTicketScalarWhereWithAggregatesInput[]
    NOT?: MaintenanceTicketScalarWhereWithAggregatesInput | MaintenanceTicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MaintenanceTicket"> | string
    title?: StringWithAggregatesFilter<"MaintenanceTicket"> | string
    description?: StringWithAggregatesFilter<"MaintenanceTicket"> | string
    priority?: StringWithAggregatesFilter<"MaintenanceTicket"> | string
    status?: StringWithAggregatesFilter<"MaintenanceTicket"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MaintenanceTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MaintenanceTicket"> | Date | string
    propertyId?: StringWithAggregatesFilter<"MaintenanceTicket"> | string
    tenancyId?: StringNullableWithAggregatesFilter<"MaintenanceTicket"> | string | null
    reportedByUserId?: StringNullableWithAggregatesFilter<"MaintenanceTicket"> | string | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringFilter<"Transaction"> | string
    category?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    propertyId?: StringFilter<"Transaction"> | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    category?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    type?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringFilter<"Transaction"> | string
    category?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    propertyId?: StringFilter<"Transaction"> | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    category?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringWithAggregatesFilter<"Transaction"> | string
    category?: StringWithAggregatesFilter<"Transaction"> | string
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    propertyId?: StringWithAggregatesFilter<"Transaction"> | string
  }

  export type PropertyCreateInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyCreateNestedManyWithoutPropertyInput
    complianceRecords?: ComplianceRecordCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketCreateNestedManyWithoutPropertyInput
    transactions?: TransactionCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyUncheckedCreateNestedManyWithoutPropertyInput
    complianceRecords?: ComplianceRecordUncheckedCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketUncheckedCreateNestedManyWithoutPropertyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUpdateManyWithoutPropertyNestedInput
    complianceRecords?: ComplianceRecordUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUncheckedUpdateManyWithoutPropertyNestedInput
    complianceRecords?: ComplianceRecordUncheckedUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUncheckedUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenancyCreateInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutTenanciesInput
    maintenanceTickets?: MaintenanceTicketCreateNestedManyWithoutTenancyInput
  }

  export type TenancyUncheckedCreateInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
    maintenanceTickets?: MaintenanceTicketUncheckedCreateNestedManyWithoutTenancyInput
  }

  export type TenancyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutTenanciesNestedInput
    maintenanceTickets?: MaintenanceTicketUpdateManyWithoutTenancyNestedInput
  }

  export type TenancyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
    maintenanceTickets?: MaintenanceTicketUncheckedUpdateManyWithoutTenancyNestedInput
  }

  export type TenancyCreateManyInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
  }

  export type TenancyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenancyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplianceTypeCreateInput = {
    id?: string
    name: string
    description?: string | null
    renewalFrequencyMonths: number
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    complianceRecords?: ComplianceRecordCreateNestedManyWithoutComplianceTypeInput
  }

  export type ComplianceTypeUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    renewalFrequencyMonths: number
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    complianceRecords?: ComplianceRecordUncheckedCreateNestedManyWithoutComplianceTypeInput
  }

  export type ComplianceTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    renewalFrequencyMonths?: IntFieldUpdateOperationsInput | number
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complianceRecords?: ComplianceRecordUpdateManyWithoutComplianceTypeNestedInput
  }

  export type ComplianceTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    renewalFrequencyMonths?: IntFieldUpdateOperationsInput | number
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complianceRecords?: ComplianceRecordUncheckedUpdateManyWithoutComplianceTypeNestedInput
  }

  export type ComplianceTypeCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    renewalFrequencyMonths: number
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    renewalFrequencyMonths?: IntFieldUpdateOperationsInput | number
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    renewalFrequencyMonths?: IntFieldUpdateOperationsInput | number
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceRecordCreateInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutComplianceRecordsInput
    complianceType: ComplianceTypeCreateNestedOneWithoutComplianceRecordsInput
  }

  export type ComplianceRecordUncheckedCreateInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
    complianceTypeId: string
  }

  export type ComplianceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutComplianceRecordsNestedInput
    complianceType?: ComplianceTypeUpdateOneRequiredWithoutComplianceRecordsNestedInput
  }

  export type ComplianceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
    complianceTypeId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplianceRecordCreateManyInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
    complianceTypeId: string
  }

  export type ComplianceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
    complianceTypeId?: StringFieldUpdateOperationsInput | string
  }

  export type MaintenanceTicketCreateInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reportedByUserId?: string | null
    property: PropertyCreateNestedOneWithoutMaintenanceTicketsInput
    tenancy?: TenancyCreateNestedOneWithoutMaintenanceTicketsInput
  }

  export type MaintenanceTicketUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
    tenancyId?: string | null
    reportedByUserId?: string | null
  }

  export type MaintenanceTicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutMaintenanceTicketsNestedInput
    tenancy?: TenancyUpdateOneWithoutMaintenanceTicketsNestedInput
  }

  export type MaintenanceTicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
    tenancyId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaintenanceTicketCreateManyInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
    tenancyId?: string | null
    reportedByUserId?: string | null
  }

  export type MaintenanceTicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaintenanceTicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
    tenancyId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateInput = {
    id?: string
    type: string
    amount: Decimal | DecimalJsLike | number | string
    description: string
    category: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    type: string
    amount: Decimal | DecimalJsLike | number | string
    description: string
    category: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    type: string
    amount: Decimal | DecimalJsLike | number | string
    description: string
    category: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type TenancyListRelationFilter = {
    every?: TenancyWhereInput
    some?: TenancyWhereInput
    none?: TenancyWhereInput
  }

  export type ComplianceRecordListRelationFilter = {
    every?: ComplianceRecordWhereInput
    some?: ComplianceRecordWhereInput
    none?: ComplianceRecordWhereInput
  }

  export type MaintenanceTicketListRelationFilter = {
    every?: MaintenanceTicketWhereInput
    some?: MaintenanceTicketWhereInput
    none?: MaintenanceTicketWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TenancyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplianceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaintenanceTicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    city?: SortOrder
    propertyType?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    purchaseDate?: SortOrder
    propertyValueEstimate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyAvgOrderByAggregateInput = {
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    propertyValueEstimate?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    city?: SortOrder
    propertyType?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    purchaseDate?: SortOrder
    propertyValueEstimate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    city?: SortOrder
    propertyType?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    purchaseDate?: SortOrder
    propertyValueEstimate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertySumOrderByAggregateInput = {
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    propertyValueEstimate?: SortOrder
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

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type PropertyRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type TenancyCountOrderByAggregateInput = {
    id?: SortOrder
    tenantName?: SortOrder
    tenantEmail?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    monthlyRent?: SortOrder
    depositAmount?: SortOrder
    depositProtectionScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
  }

  export type TenancyAvgOrderByAggregateInput = {
    monthlyRent?: SortOrder
    depositAmount?: SortOrder
  }

  export type TenancyMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantName?: SortOrder
    tenantEmail?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    monthlyRent?: SortOrder
    depositAmount?: SortOrder
    depositProtectionScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
  }

  export type TenancyMinOrderByAggregateInput = {
    id?: SortOrder
    tenantName?: SortOrder
    tenantEmail?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    monthlyRent?: SortOrder
    depositAmount?: SortOrder
    depositProtectionScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
  }

  export type TenancySumOrderByAggregateInput = {
    monthlyRent?: SortOrder
    depositAmount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ComplianceTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    renewalFrequencyMonths?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplianceTypeAvgOrderByAggregateInput = {
    renewalFrequencyMonths?: SortOrder
  }

  export type ComplianceTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    renewalFrequencyMonths?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplianceTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    renewalFrequencyMonths?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplianceTypeSumOrderByAggregateInput = {
    renewalFrequencyMonths?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ComplianceTypeRelationFilter = {
    is?: ComplianceTypeWhereInput
    isNot?: ComplianceTypeWhereInput
  }

  export type ComplianceRecordCountOrderByAggregateInput = {
    id?: SortOrder
    lastCompletedDate?: SortOrder
    nextDueDate?: SortOrder
    documentUrl?: SortOrder
    notes?: SortOrder
    lastReminderSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    complianceTypeId?: SortOrder
  }

  export type ComplianceRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    lastCompletedDate?: SortOrder
    nextDueDate?: SortOrder
    documentUrl?: SortOrder
    notes?: SortOrder
    lastReminderSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    complianceTypeId?: SortOrder
  }

  export type ComplianceRecordMinOrderByAggregateInput = {
    id?: SortOrder
    lastCompletedDate?: SortOrder
    nextDueDate?: SortOrder
    documentUrl?: SortOrder
    notes?: SortOrder
    lastReminderSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    complianceTypeId?: SortOrder
  }

  export type TenancyNullableRelationFilter = {
    is?: TenancyWhereInput | null
    isNot?: TenancyWhereInput | null
  }

  export type MaintenanceTicketCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    tenancyId?: SortOrder
    reportedByUserId?: SortOrder
  }

  export type MaintenanceTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    tenancyId?: SortOrder
    reportedByUserId?: SortOrder
  }

  export type MaintenanceTicketMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
    tenancyId?: SortOrder
    reportedByUserId?: SortOrder
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    category?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    category?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    category?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    propertyId?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TenancyCreateNestedManyWithoutPropertyInput = {
    create?: XOR<TenancyCreateWithoutPropertyInput, TenancyUncheckedCreateWithoutPropertyInput> | TenancyCreateWithoutPropertyInput[] | TenancyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TenancyCreateOrConnectWithoutPropertyInput | TenancyCreateOrConnectWithoutPropertyInput[]
    createMany?: TenancyCreateManyPropertyInputEnvelope
    connect?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
  }

  export type ComplianceRecordCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ComplianceRecordCreateWithoutPropertyInput, ComplianceRecordUncheckedCreateWithoutPropertyInput> | ComplianceRecordCreateWithoutPropertyInput[] | ComplianceRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutPropertyInput | ComplianceRecordCreateOrConnectWithoutPropertyInput[]
    createMany?: ComplianceRecordCreateManyPropertyInputEnvelope
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
  }

  export type MaintenanceTicketCreateNestedManyWithoutPropertyInput = {
    create?: XOR<MaintenanceTicketCreateWithoutPropertyInput, MaintenanceTicketUncheckedCreateWithoutPropertyInput> | MaintenanceTicketCreateWithoutPropertyInput[] | MaintenanceTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutPropertyInput | MaintenanceTicketCreateOrConnectWithoutPropertyInput[]
    createMany?: MaintenanceTicketCreateManyPropertyInputEnvelope
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutPropertyInput = {
    create?: XOR<TransactionCreateWithoutPropertyInput, TransactionUncheckedCreateWithoutPropertyInput> | TransactionCreateWithoutPropertyInput[] | TransactionUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPropertyInput | TransactionCreateOrConnectWithoutPropertyInput[]
    createMany?: TransactionCreateManyPropertyInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TenancyUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<TenancyCreateWithoutPropertyInput, TenancyUncheckedCreateWithoutPropertyInput> | TenancyCreateWithoutPropertyInput[] | TenancyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TenancyCreateOrConnectWithoutPropertyInput | TenancyCreateOrConnectWithoutPropertyInput[]
    createMany?: TenancyCreateManyPropertyInputEnvelope
    connect?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
  }

  export type ComplianceRecordUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ComplianceRecordCreateWithoutPropertyInput, ComplianceRecordUncheckedCreateWithoutPropertyInput> | ComplianceRecordCreateWithoutPropertyInput[] | ComplianceRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutPropertyInput | ComplianceRecordCreateOrConnectWithoutPropertyInput[]
    createMany?: ComplianceRecordCreateManyPropertyInputEnvelope
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
  }

  export type MaintenanceTicketUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<MaintenanceTicketCreateWithoutPropertyInput, MaintenanceTicketUncheckedCreateWithoutPropertyInput> | MaintenanceTicketCreateWithoutPropertyInput[] | MaintenanceTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutPropertyInput | MaintenanceTicketCreateOrConnectWithoutPropertyInput[]
    createMany?: MaintenanceTicketCreateManyPropertyInputEnvelope
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<TransactionCreateWithoutPropertyInput, TransactionUncheckedCreateWithoutPropertyInput> | TransactionCreateWithoutPropertyInput[] | TransactionUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPropertyInput | TransactionCreateOrConnectWithoutPropertyInput[]
    createMany?: TransactionCreateManyPropertyInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenancyUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<TenancyCreateWithoutPropertyInput, TenancyUncheckedCreateWithoutPropertyInput> | TenancyCreateWithoutPropertyInput[] | TenancyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TenancyCreateOrConnectWithoutPropertyInput | TenancyCreateOrConnectWithoutPropertyInput[]
    upsert?: TenancyUpsertWithWhereUniqueWithoutPropertyInput | TenancyUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: TenancyCreateManyPropertyInputEnvelope
    set?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    disconnect?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    delete?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    connect?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    update?: TenancyUpdateWithWhereUniqueWithoutPropertyInput | TenancyUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: TenancyUpdateManyWithWhereWithoutPropertyInput | TenancyUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: TenancyScalarWhereInput | TenancyScalarWhereInput[]
  }

  export type ComplianceRecordUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ComplianceRecordCreateWithoutPropertyInput, ComplianceRecordUncheckedCreateWithoutPropertyInput> | ComplianceRecordCreateWithoutPropertyInput[] | ComplianceRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutPropertyInput | ComplianceRecordCreateOrConnectWithoutPropertyInput[]
    upsert?: ComplianceRecordUpsertWithWhereUniqueWithoutPropertyInput | ComplianceRecordUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ComplianceRecordCreateManyPropertyInputEnvelope
    set?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    disconnect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    delete?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    update?: ComplianceRecordUpdateWithWhereUniqueWithoutPropertyInput | ComplianceRecordUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ComplianceRecordUpdateManyWithWhereWithoutPropertyInput | ComplianceRecordUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ComplianceRecordScalarWhereInput | ComplianceRecordScalarWhereInput[]
  }

  export type MaintenanceTicketUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<MaintenanceTicketCreateWithoutPropertyInput, MaintenanceTicketUncheckedCreateWithoutPropertyInput> | MaintenanceTicketCreateWithoutPropertyInput[] | MaintenanceTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutPropertyInput | MaintenanceTicketCreateOrConnectWithoutPropertyInput[]
    upsert?: MaintenanceTicketUpsertWithWhereUniqueWithoutPropertyInput | MaintenanceTicketUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: MaintenanceTicketCreateManyPropertyInputEnvelope
    set?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    disconnect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    delete?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    update?: MaintenanceTicketUpdateWithWhereUniqueWithoutPropertyInput | MaintenanceTicketUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: MaintenanceTicketUpdateManyWithWhereWithoutPropertyInput | MaintenanceTicketUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: MaintenanceTicketScalarWhereInput | MaintenanceTicketScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<TransactionCreateWithoutPropertyInput, TransactionUncheckedCreateWithoutPropertyInput> | TransactionCreateWithoutPropertyInput[] | TransactionUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPropertyInput | TransactionCreateOrConnectWithoutPropertyInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPropertyInput | TransactionUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: TransactionCreateManyPropertyInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPropertyInput | TransactionUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPropertyInput | TransactionUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TenancyUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<TenancyCreateWithoutPropertyInput, TenancyUncheckedCreateWithoutPropertyInput> | TenancyCreateWithoutPropertyInput[] | TenancyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TenancyCreateOrConnectWithoutPropertyInput | TenancyCreateOrConnectWithoutPropertyInput[]
    upsert?: TenancyUpsertWithWhereUniqueWithoutPropertyInput | TenancyUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: TenancyCreateManyPropertyInputEnvelope
    set?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    disconnect?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    delete?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    connect?: TenancyWhereUniqueInput | TenancyWhereUniqueInput[]
    update?: TenancyUpdateWithWhereUniqueWithoutPropertyInput | TenancyUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: TenancyUpdateManyWithWhereWithoutPropertyInput | TenancyUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: TenancyScalarWhereInput | TenancyScalarWhereInput[]
  }

  export type ComplianceRecordUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ComplianceRecordCreateWithoutPropertyInput, ComplianceRecordUncheckedCreateWithoutPropertyInput> | ComplianceRecordCreateWithoutPropertyInput[] | ComplianceRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutPropertyInput | ComplianceRecordCreateOrConnectWithoutPropertyInput[]
    upsert?: ComplianceRecordUpsertWithWhereUniqueWithoutPropertyInput | ComplianceRecordUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ComplianceRecordCreateManyPropertyInputEnvelope
    set?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    disconnect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    delete?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    update?: ComplianceRecordUpdateWithWhereUniqueWithoutPropertyInput | ComplianceRecordUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ComplianceRecordUpdateManyWithWhereWithoutPropertyInput | ComplianceRecordUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ComplianceRecordScalarWhereInput | ComplianceRecordScalarWhereInput[]
  }

  export type MaintenanceTicketUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<MaintenanceTicketCreateWithoutPropertyInput, MaintenanceTicketUncheckedCreateWithoutPropertyInput> | MaintenanceTicketCreateWithoutPropertyInput[] | MaintenanceTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutPropertyInput | MaintenanceTicketCreateOrConnectWithoutPropertyInput[]
    upsert?: MaintenanceTicketUpsertWithWhereUniqueWithoutPropertyInput | MaintenanceTicketUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: MaintenanceTicketCreateManyPropertyInputEnvelope
    set?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    disconnect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    delete?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    update?: MaintenanceTicketUpdateWithWhereUniqueWithoutPropertyInput | MaintenanceTicketUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: MaintenanceTicketUpdateManyWithWhereWithoutPropertyInput | MaintenanceTicketUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: MaintenanceTicketScalarWhereInput | MaintenanceTicketScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<TransactionCreateWithoutPropertyInput, TransactionUncheckedCreateWithoutPropertyInput> | TransactionCreateWithoutPropertyInput[] | TransactionUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPropertyInput | TransactionCreateOrConnectWithoutPropertyInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPropertyInput | TransactionUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: TransactionCreateManyPropertyInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPropertyInput | TransactionUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPropertyInput | TransactionUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutTenanciesInput = {
    create?: XOR<PropertyCreateWithoutTenanciesInput, PropertyUncheckedCreateWithoutTenanciesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutTenanciesInput
    connect?: PropertyWhereUniqueInput
  }

  export type MaintenanceTicketCreateNestedManyWithoutTenancyInput = {
    create?: XOR<MaintenanceTicketCreateWithoutTenancyInput, MaintenanceTicketUncheckedCreateWithoutTenancyInput> | MaintenanceTicketCreateWithoutTenancyInput[] | MaintenanceTicketUncheckedCreateWithoutTenancyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutTenancyInput | MaintenanceTicketCreateOrConnectWithoutTenancyInput[]
    createMany?: MaintenanceTicketCreateManyTenancyInputEnvelope
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
  }

  export type MaintenanceTicketUncheckedCreateNestedManyWithoutTenancyInput = {
    create?: XOR<MaintenanceTicketCreateWithoutTenancyInput, MaintenanceTicketUncheckedCreateWithoutTenancyInput> | MaintenanceTicketCreateWithoutTenancyInput[] | MaintenanceTicketUncheckedCreateWithoutTenancyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutTenancyInput | MaintenanceTicketCreateOrConnectWithoutTenancyInput[]
    createMany?: MaintenanceTicketCreateManyTenancyInputEnvelope
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type PropertyUpdateOneRequiredWithoutTenanciesNestedInput = {
    create?: XOR<PropertyCreateWithoutTenanciesInput, PropertyUncheckedCreateWithoutTenanciesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutTenanciesInput
    upsert?: PropertyUpsertWithoutTenanciesInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutTenanciesInput, PropertyUpdateWithoutTenanciesInput>, PropertyUncheckedUpdateWithoutTenanciesInput>
  }

  export type MaintenanceTicketUpdateManyWithoutTenancyNestedInput = {
    create?: XOR<MaintenanceTicketCreateWithoutTenancyInput, MaintenanceTicketUncheckedCreateWithoutTenancyInput> | MaintenanceTicketCreateWithoutTenancyInput[] | MaintenanceTicketUncheckedCreateWithoutTenancyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutTenancyInput | MaintenanceTicketCreateOrConnectWithoutTenancyInput[]
    upsert?: MaintenanceTicketUpsertWithWhereUniqueWithoutTenancyInput | MaintenanceTicketUpsertWithWhereUniqueWithoutTenancyInput[]
    createMany?: MaintenanceTicketCreateManyTenancyInputEnvelope
    set?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    disconnect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    delete?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    update?: MaintenanceTicketUpdateWithWhereUniqueWithoutTenancyInput | MaintenanceTicketUpdateWithWhereUniqueWithoutTenancyInput[]
    updateMany?: MaintenanceTicketUpdateManyWithWhereWithoutTenancyInput | MaintenanceTicketUpdateManyWithWhereWithoutTenancyInput[]
    deleteMany?: MaintenanceTicketScalarWhereInput | MaintenanceTicketScalarWhereInput[]
  }

  export type MaintenanceTicketUncheckedUpdateManyWithoutTenancyNestedInput = {
    create?: XOR<MaintenanceTicketCreateWithoutTenancyInput, MaintenanceTicketUncheckedCreateWithoutTenancyInput> | MaintenanceTicketCreateWithoutTenancyInput[] | MaintenanceTicketUncheckedCreateWithoutTenancyInput[]
    connectOrCreate?: MaintenanceTicketCreateOrConnectWithoutTenancyInput | MaintenanceTicketCreateOrConnectWithoutTenancyInput[]
    upsert?: MaintenanceTicketUpsertWithWhereUniqueWithoutTenancyInput | MaintenanceTicketUpsertWithWhereUniqueWithoutTenancyInput[]
    createMany?: MaintenanceTicketCreateManyTenancyInputEnvelope
    set?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    disconnect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    delete?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    connect?: MaintenanceTicketWhereUniqueInput | MaintenanceTicketWhereUniqueInput[]
    update?: MaintenanceTicketUpdateWithWhereUniqueWithoutTenancyInput | MaintenanceTicketUpdateWithWhereUniqueWithoutTenancyInput[]
    updateMany?: MaintenanceTicketUpdateManyWithWhereWithoutTenancyInput | MaintenanceTicketUpdateManyWithWhereWithoutTenancyInput[]
    deleteMany?: MaintenanceTicketScalarWhereInput | MaintenanceTicketScalarWhereInput[]
  }

  export type ComplianceRecordCreateNestedManyWithoutComplianceTypeInput = {
    create?: XOR<ComplianceRecordCreateWithoutComplianceTypeInput, ComplianceRecordUncheckedCreateWithoutComplianceTypeInput> | ComplianceRecordCreateWithoutComplianceTypeInput[] | ComplianceRecordUncheckedCreateWithoutComplianceTypeInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutComplianceTypeInput | ComplianceRecordCreateOrConnectWithoutComplianceTypeInput[]
    createMany?: ComplianceRecordCreateManyComplianceTypeInputEnvelope
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
  }

  export type ComplianceRecordUncheckedCreateNestedManyWithoutComplianceTypeInput = {
    create?: XOR<ComplianceRecordCreateWithoutComplianceTypeInput, ComplianceRecordUncheckedCreateWithoutComplianceTypeInput> | ComplianceRecordCreateWithoutComplianceTypeInput[] | ComplianceRecordUncheckedCreateWithoutComplianceTypeInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutComplianceTypeInput | ComplianceRecordCreateOrConnectWithoutComplianceTypeInput[]
    createMany?: ComplianceRecordCreateManyComplianceTypeInputEnvelope
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ComplianceRecordUpdateManyWithoutComplianceTypeNestedInput = {
    create?: XOR<ComplianceRecordCreateWithoutComplianceTypeInput, ComplianceRecordUncheckedCreateWithoutComplianceTypeInput> | ComplianceRecordCreateWithoutComplianceTypeInput[] | ComplianceRecordUncheckedCreateWithoutComplianceTypeInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutComplianceTypeInput | ComplianceRecordCreateOrConnectWithoutComplianceTypeInput[]
    upsert?: ComplianceRecordUpsertWithWhereUniqueWithoutComplianceTypeInput | ComplianceRecordUpsertWithWhereUniqueWithoutComplianceTypeInput[]
    createMany?: ComplianceRecordCreateManyComplianceTypeInputEnvelope
    set?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    disconnect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    delete?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    update?: ComplianceRecordUpdateWithWhereUniqueWithoutComplianceTypeInput | ComplianceRecordUpdateWithWhereUniqueWithoutComplianceTypeInput[]
    updateMany?: ComplianceRecordUpdateManyWithWhereWithoutComplianceTypeInput | ComplianceRecordUpdateManyWithWhereWithoutComplianceTypeInput[]
    deleteMany?: ComplianceRecordScalarWhereInput | ComplianceRecordScalarWhereInput[]
  }

  export type ComplianceRecordUncheckedUpdateManyWithoutComplianceTypeNestedInput = {
    create?: XOR<ComplianceRecordCreateWithoutComplianceTypeInput, ComplianceRecordUncheckedCreateWithoutComplianceTypeInput> | ComplianceRecordCreateWithoutComplianceTypeInput[] | ComplianceRecordUncheckedCreateWithoutComplianceTypeInput[]
    connectOrCreate?: ComplianceRecordCreateOrConnectWithoutComplianceTypeInput | ComplianceRecordCreateOrConnectWithoutComplianceTypeInput[]
    upsert?: ComplianceRecordUpsertWithWhereUniqueWithoutComplianceTypeInput | ComplianceRecordUpsertWithWhereUniqueWithoutComplianceTypeInput[]
    createMany?: ComplianceRecordCreateManyComplianceTypeInputEnvelope
    set?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    disconnect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    delete?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    connect?: ComplianceRecordWhereUniqueInput | ComplianceRecordWhereUniqueInput[]
    update?: ComplianceRecordUpdateWithWhereUniqueWithoutComplianceTypeInput | ComplianceRecordUpdateWithWhereUniqueWithoutComplianceTypeInput[]
    updateMany?: ComplianceRecordUpdateManyWithWhereWithoutComplianceTypeInput | ComplianceRecordUpdateManyWithWhereWithoutComplianceTypeInput[]
    deleteMany?: ComplianceRecordScalarWhereInput | ComplianceRecordScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutComplianceRecordsInput = {
    create?: XOR<PropertyCreateWithoutComplianceRecordsInput, PropertyUncheckedCreateWithoutComplianceRecordsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutComplianceRecordsInput
    connect?: PropertyWhereUniqueInput
  }

  export type ComplianceTypeCreateNestedOneWithoutComplianceRecordsInput = {
    create?: XOR<ComplianceTypeCreateWithoutComplianceRecordsInput, ComplianceTypeUncheckedCreateWithoutComplianceRecordsInput>
    connectOrCreate?: ComplianceTypeCreateOrConnectWithoutComplianceRecordsInput
    connect?: ComplianceTypeWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutComplianceRecordsNestedInput = {
    create?: XOR<PropertyCreateWithoutComplianceRecordsInput, PropertyUncheckedCreateWithoutComplianceRecordsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutComplianceRecordsInput
    upsert?: PropertyUpsertWithoutComplianceRecordsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutComplianceRecordsInput, PropertyUpdateWithoutComplianceRecordsInput>, PropertyUncheckedUpdateWithoutComplianceRecordsInput>
  }

  export type ComplianceTypeUpdateOneRequiredWithoutComplianceRecordsNestedInput = {
    create?: XOR<ComplianceTypeCreateWithoutComplianceRecordsInput, ComplianceTypeUncheckedCreateWithoutComplianceRecordsInput>
    connectOrCreate?: ComplianceTypeCreateOrConnectWithoutComplianceRecordsInput
    upsert?: ComplianceTypeUpsertWithoutComplianceRecordsInput
    connect?: ComplianceTypeWhereUniqueInput
    update?: XOR<XOR<ComplianceTypeUpdateToOneWithWhereWithoutComplianceRecordsInput, ComplianceTypeUpdateWithoutComplianceRecordsInput>, ComplianceTypeUncheckedUpdateWithoutComplianceRecordsInput>
  }

  export type PropertyCreateNestedOneWithoutMaintenanceTicketsInput = {
    create?: XOR<PropertyCreateWithoutMaintenanceTicketsInput, PropertyUncheckedCreateWithoutMaintenanceTicketsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutMaintenanceTicketsInput
    connect?: PropertyWhereUniqueInput
  }

  export type TenancyCreateNestedOneWithoutMaintenanceTicketsInput = {
    create?: XOR<TenancyCreateWithoutMaintenanceTicketsInput, TenancyUncheckedCreateWithoutMaintenanceTicketsInput>
    connectOrCreate?: TenancyCreateOrConnectWithoutMaintenanceTicketsInput
    connect?: TenancyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutMaintenanceTicketsNestedInput = {
    create?: XOR<PropertyCreateWithoutMaintenanceTicketsInput, PropertyUncheckedCreateWithoutMaintenanceTicketsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutMaintenanceTicketsInput
    upsert?: PropertyUpsertWithoutMaintenanceTicketsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutMaintenanceTicketsInput, PropertyUpdateWithoutMaintenanceTicketsInput>, PropertyUncheckedUpdateWithoutMaintenanceTicketsInput>
  }

  export type TenancyUpdateOneWithoutMaintenanceTicketsNestedInput = {
    create?: XOR<TenancyCreateWithoutMaintenanceTicketsInput, TenancyUncheckedCreateWithoutMaintenanceTicketsInput>
    connectOrCreate?: TenancyCreateOrConnectWithoutMaintenanceTicketsInput
    upsert?: TenancyUpsertWithoutMaintenanceTicketsInput
    disconnect?: TenancyWhereInput | boolean
    delete?: TenancyWhereInput | boolean
    connect?: TenancyWhereUniqueInput
    update?: XOR<XOR<TenancyUpdateToOneWithWhereWithoutMaintenanceTicketsInput, TenancyUpdateWithoutMaintenanceTicketsInput>, TenancyUncheckedUpdateWithoutMaintenanceTicketsInput>
  }

  export type PropertyCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<PropertyCreateWithoutTransactionsInput, PropertyUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutTransactionsInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<PropertyCreateWithoutTransactionsInput, PropertyUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutTransactionsInput
    upsert?: PropertyUpsertWithoutTransactionsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutTransactionsInput, PropertyUpdateWithoutTransactionsInput>, PropertyUncheckedUpdateWithoutTransactionsInput>
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TenancyCreateWithoutPropertyInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    maintenanceTickets?: MaintenanceTicketCreateNestedManyWithoutTenancyInput
  }

  export type TenancyUncheckedCreateWithoutPropertyInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    maintenanceTickets?: MaintenanceTicketUncheckedCreateNestedManyWithoutTenancyInput
  }

  export type TenancyCreateOrConnectWithoutPropertyInput = {
    where: TenancyWhereUniqueInput
    create: XOR<TenancyCreateWithoutPropertyInput, TenancyUncheckedCreateWithoutPropertyInput>
  }

  export type TenancyCreateManyPropertyInputEnvelope = {
    data: TenancyCreateManyPropertyInput | TenancyCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type ComplianceRecordCreateWithoutPropertyInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    complianceType: ComplianceTypeCreateNestedOneWithoutComplianceRecordsInput
  }

  export type ComplianceRecordUncheckedCreateWithoutPropertyInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    complianceTypeId: string
  }

  export type ComplianceRecordCreateOrConnectWithoutPropertyInput = {
    where: ComplianceRecordWhereUniqueInput
    create: XOR<ComplianceRecordCreateWithoutPropertyInput, ComplianceRecordUncheckedCreateWithoutPropertyInput>
  }

  export type ComplianceRecordCreateManyPropertyInputEnvelope = {
    data: ComplianceRecordCreateManyPropertyInput | ComplianceRecordCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type MaintenanceTicketCreateWithoutPropertyInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reportedByUserId?: string | null
    tenancy?: TenancyCreateNestedOneWithoutMaintenanceTicketsInput
  }

  export type MaintenanceTicketUncheckedCreateWithoutPropertyInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancyId?: string | null
    reportedByUserId?: string | null
  }

  export type MaintenanceTicketCreateOrConnectWithoutPropertyInput = {
    where: MaintenanceTicketWhereUniqueInput
    create: XOR<MaintenanceTicketCreateWithoutPropertyInput, MaintenanceTicketUncheckedCreateWithoutPropertyInput>
  }

  export type MaintenanceTicketCreateManyPropertyInputEnvelope = {
    data: MaintenanceTicketCreateManyPropertyInput | MaintenanceTicketCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutPropertyInput = {
    id?: string
    type: string
    amount: Decimal | DecimalJsLike | number | string
    description: string
    category: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUncheckedCreateWithoutPropertyInput = {
    id?: string
    type: string
    amount: Decimal | DecimalJsLike | number | string
    description: string
    category: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutPropertyInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutPropertyInput, TransactionUncheckedCreateWithoutPropertyInput>
  }

  export type TransactionCreateManyPropertyInputEnvelope = {
    data: TransactionCreateManyPropertyInput | TransactionCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type TenancyUpsertWithWhereUniqueWithoutPropertyInput = {
    where: TenancyWhereUniqueInput
    update: XOR<TenancyUpdateWithoutPropertyInput, TenancyUncheckedUpdateWithoutPropertyInput>
    create: XOR<TenancyCreateWithoutPropertyInput, TenancyUncheckedCreateWithoutPropertyInput>
  }

  export type TenancyUpdateWithWhereUniqueWithoutPropertyInput = {
    where: TenancyWhereUniqueInput
    data: XOR<TenancyUpdateWithoutPropertyInput, TenancyUncheckedUpdateWithoutPropertyInput>
  }

  export type TenancyUpdateManyWithWhereWithoutPropertyInput = {
    where: TenancyScalarWhereInput
    data: XOR<TenancyUpdateManyMutationInput, TenancyUncheckedUpdateManyWithoutPropertyInput>
  }

  export type TenancyScalarWhereInput = {
    AND?: TenancyScalarWhereInput | TenancyScalarWhereInput[]
    OR?: TenancyScalarWhereInput[]
    NOT?: TenancyScalarWhereInput | TenancyScalarWhereInput[]
    id?: StringFilter<"Tenancy"> | string
    tenantName?: StringFilter<"Tenancy"> | string
    tenantEmail?: StringNullableFilter<"Tenancy"> | string | null
    startDate?: DateTimeFilter<"Tenancy"> | Date | string
    endDate?: DateTimeNullableFilter<"Tenancy"> | Date | string | null
    monthlyRent?: DecimalFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string
    depositAmount?: DecimalNullableFilter<"Tenancy"> | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: StringNullableFilter<"Tenancy"> | string | null
    createdAt?: DateTimeFilter<"Tenancy"> | Date | string
    updatedAt?: DateTimeFilter<"Tenancy"> | Date | string
    propertyId?: StringFilter<"Tenancy"> | string
  }

  export type ComplianceRecordUpsertWithWhereUniqueWithoutPropertyInput = {
    where: ComplianceRecordWhereUniqueInput
    update: XOR<ComplianceRecordUpdateWithoutPropertyInput, ComplianceRecordUncheckedUpdateWithoutPropertyInput>
    create: XOR<ComplianceRecordCreateWithoutPropertyInput, ComplianceRecordUncheckedCreateWithoutPropertyInput>
  }

  export type ComplianceRecordUpdateWithWhereUniqueWithoutPropertyInput = {
    where: ComplianceRecordWhereUniqueInput
    data: XOR<ComplianceRecordUpdateWithoutPropertyInput, ComplianceRecordUncheckedUpdateWithoutPropertyInput>
  }

  export type ComplianceRecordUpdateManyWithWhereWithoutPropertyInput = {
    where: ComplianceRecordScalarWhereInput
    data: XOR<ComplianceRecordUpdateManyMutationInput, ComplianceRecordUncheckedUpdateManyWithoutPropertyInput>
  }

  export type ComplianceRecordScalarWhereInput = {
    AND?: ComplianceRecordScalarWhereInput | ComplianceRecordScalarWhereInput[]
    OR?: ComplianceRecordScalarWhereInput[]
    NOT?: ComplianceRecordScalarWhereInput | ComplianceRecordScalarWhereInput[]
    id?: StringFilter<"ComplianceRecord"> | string
    lastCompletedDate?: DateTimeFilter<"ComplianceRecord"> | Date | string
    nextDueDate?: DateTimeFilter<"ComplianceRecord"> | Date | string
    documentUrl?: StringNullableFilter<"ComplianceRecord"> | string | null
    notes?: StringNullableFilter<"ComplianceRecord"> | string | null
    lastReminderSentAt?: DateTimeNullableFilter<"ComplianceRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"ComplianceRecord"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceRecord"> | Date | string
    propertyId?: StringFilter<"ComplianceRecord"> | string
    complianceTypeId?: StringFilter<"ComplianceRecord"> | string
  }

  export type MaintenanceTicketUpsertWithWhereUniqueWithoutPropertyInput = {
    where: MaintenanceTicketWhereUniqueInput
    update: XOR<MaintenanceTicketUpdateWithoutPropertyInput, MaintenanceTicketUncheckedUpdateWithoutPropertyInput>
    create: XOR<MaintenanceTicketCreateWithoutPropertyInput, MaintenanceTicketUncheckedCreateWithoutPropertyInput>
  }

  export type MaintenanceTicketUpdateWithWhereUniqueWithoutPropertyInput = {
    where: MaintenanceTicketWhereUniqueInput
    data: XOR<MaintenanceTicketUpdateWithoutPropertyInput, MaintenanceTicketUncheckedUpdateWithoutPropertyInput>
  }

  export type MaintenanceTicketUpdateManyWithWhereWithoutPropertyInput = {
    where: MaintenanceTicketScalarWhereInput
    data: XOR<MaintenanceTicketUpdateManyMutationInput, MaintenanceTicketUncheckedUpdateManyWithoutPropertyInput>
  }

  export type MaintenanceTicketScalarWhereInput = {
    AND?: MaintenanceTicketScalarWhereInput | MaintenanceTicketScalarWhereInput[]
    OR?: MaintenanceTicketScalarWhereInput[]
    NOT?: MaintenanceTicketScalarWhereInput | MaintenanceTicketScalarWhereInput[]
    id?: StringFilter<"MaintenanceTicket"> | string
    title?: StringFilter<"MaintenanceTicket"> | string
    description?: StringFilter<"MaintenanceTicket"> | string
    priority?: StringFilter<"MaintenanceTicket"> | string
    status?: StringFilter<"MaintenanceTicket"> | string
    createdAt?: DateTimeFilter<"MaintenanceTicket"> | Date | string
    updatedAt?: DateTimeFilter<"MaintenanceTicket"> | Date | string
    propertyId?: StringFilter<"MaintenanceTicket"> | string
    tenancyId?: StringNullableFilter<"MaintenanceTicket"> | string | null
    reportedByUserId?: StringNullableFilter<"MaintenanceTicket"> | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutPropertyInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutPropertyInput, TransactionUncheckedUpdateWithoutPropertyInput>
    create: XOR<TransactionCreateWithoutPropertyInput, TransactionUncheckedCreateWithoutPropertyInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutPropertyInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutPropertyInput, TransactionUncheckedUpdateWithoutPropertyInput>
  }

  export type TransactionUpdateManyWithWhereWithoutPropertyInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutPropertyInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringFilter<"Transaction"> | string
    category?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    propertyId?: StringFilter<"Transaction"> | string
  }

  export type PropertyCreateWithoutTenanciesInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    complianceRecords?: ComplianceRecordCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketCreateNestedManyWithoutPropertyInput
    transactions?: TransactionCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutTenanciesInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    complianceRecords?: ComplianceRecordUncheckedCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketUncheckedCreateNestedManyWithoutPropertyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutTenanciesInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutTenanciesInput, PropertyUncheckedCreateWithoutTenanciesInput>
  }

  export type MaintenanceTicketCreateWithoutTenancyInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reportedByUserId?: string | null
    property: PropertyCreateNestedOneWithoutMaintenanceTicketsInput
  }

  export type MaintenanceTicketUncheckedCreateWithoutTenancyInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
    reportedByUserId?: string | null
  }

  export type MaintenanceTicketCreateOrConnectWithoutTenancyInput = {
    where: MaintenanceTicketWhereUniqueInput
    create: XOR<MaintenanceTicketCreateWithoutTenancyInput, MaintenanceTicketUncheckedCreateWithoutTenancyInput>
  }

  export type MaintenanceTicketCreateManyTenancyInputEnvelope = {
    data: MaintenanceTicketCreateManyTenancyInput | MaintenanceTicketCreateManyTenancyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpsertWithoutTenanciesInput = {
    update: XOR<PropertyUpdateWithoutTenanciesInput, PropertyUncheckedUpdateWithoutTenanciesInput>
    create: XOR<PropertyCreateWithoutTenanciesInput, PropertyUncheckedCreateWithoutTenanciesInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutTenanciesInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutTenanciesInput, PropertyUncheckedUpdateWithoutTenanciesInput>
  }

  export type PropertyUpdateWithoutTenanciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complianceRecords?: ComplianceRecordUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutTenanciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complianceRecords?: ComplianceRecordUncheckedUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUncheckedUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type MaintenanceTicketUpsertWithWhereUniqueWithoutTenancyInput = {
    where: MaintenanceTicketWhereUniqueInput
    update: XOR<MaintenanceTicketUpdateWithoutTenancyInput, MaintenanceTicketUncheckedUpdateWithoutTenancyInput>
    create: XOR<MaintenanceTicketCreateWithoutTenancyInput, MaintenanceTicketUncheckedCreateWithoutTenancyInput>
  }

  export type MaintenanceTicketUpdateWithWhereUniqueWithoutTenancyInput = {
    where: MaintenanceTicketWhereUniqueInput
    data: XOR<MaintenanceTicketUpdateWithoutTenancyInput, MaintenanceTicketUncheckedUpdateWithoutTenancyInput>
  }

  export type MaintenanceTicketUpdateManyWithWhereWithoutTenancyInput = {
    where: MaintenanceTicketScalarWhereInput
    data: XOR<MaintenanceTicketUpdateManyMutationInput, MaintenanceTicketUncheckedUpdateManyWithoutTenancyInput>
  }

  export type ComplianceRecordCreateWithoutComplianceTypeInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutComplianceRecordsInput
  }

  export type ComplianceRecordUncheckedCreateWithoutComplianceTypeInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
  }

  export type ComplianceRecordCreateOrConnectWithoutComplianceTypeInput = {
    where: ComplianceRecordWhereUniqueInput
    create: XOR<ComplianceRecordCreateWithoutComplianceTypeInput, ComplianceRecordUncheckedCreateWithoutComplianceTypeInput>
  }

  export type ComplianceRecordCreateManyComplianceTypeInputEnvelope = {
    data: ComplianceRecordCreateManyComplianceTypeInput | ComplianceRecordCreateManyComplianceTypeInput[]
    skipDuplicates?: boolean
  }

  export type ComplianceRecordUpsertWithWhereUniqueWithoutComplianceTypeInput = {
    where: ComplianceRecordWhereUniqueInput
    update: XOR<ComplianceRecordUpdateWithoutComplianceTypeInput, ComplianceRecordUncheckedUpdateWithoutComplianceTypeInput>
    create: XOR<ComplianceRecordCreateWithoutComplianceTypeInput, ComplianceRecordUncheckedCreateWithoutComplianceTypeInput>
  }

  export type ComplianceRecordUpdateWithWhereUniqueWithoutComplianceTypeInput = {
    where: ComplianceRecordWhereUniqueInput
    data: XOR<ComplianceRecordUpdateWithoutComplianceTypeInput, ComplianceRecordUncheckedUpdateWithoutComplianceTypeInput>
  }

  export type ComplianceRecordUpdateManyWithWhereWithoutComplianceTypeInput = {
    where: ComplianceRecordScalarWhereInput
    data: XOR<ComplianceRecordUpdateManyMutationInput, ComplianceRecordUncheckedUpdateManyWithoutComplianceTypeInput>
  }

  export type PropertyCreateWithoutComplianceRecordsInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketCreateNestedManyWithoutPropertyInput
    transactions?: TransactionCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutComplianceRecordsInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyUncheckedCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketUncheckedCreateNestedManyWithoutPropertyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutComplianceRecordsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutComplianceRecordsInput, PropertyUncheckedCreateWithoutComplianceRecordsInput>
  }

  export type ComplianceTypeCreateWithoutComplianceRecordsInput = {
    id?: string
    name: string
    description?: string | null
    renewalFrequencyMonths: number
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceTypeUncheckedCreateWithoutComplianceRecordsInput = {
    id?: string
    name: string
    description?: string | null
    renewalFrequencyMonths: number
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceTypeCreateOrConnectWithoutComplianceRecordsInput = {
    where: ComplianceTypeWhereUniqueInput
    create: XOR<ComplianceTypeCreateWithoutComplianceRecordsInput, ComplianceTypeUncheckedCreateWithoutComplianceRecordsInput>
  }

  export type PropertyUpsertWithoutComplianceRecordsInput = {
    update: XOR<PropertyUpdateWithoutComplianceRecordsInput, PropertyUncheckedUpdateWithoutComplianceRecordsInput>
    create: XOR<PropertyCreateWithoutComplianceRecordsInput, PropertyUncheckedCreateWithoutComplianceRecordsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutComplianceRecordsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutComplianceRecordsInput, PropertyUncheckedUpdateWithoutComplianceRecordsInput>
  }

  export type PropertyUpdateWithoutComplianceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutComplianceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUncheckedUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUncheckedUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type ComplianceTypeUpsertWithoutComplianceRecordsInput = {
    update: XOR<ComplianceTypeUpdateWithoutComplianceRecordsInput, ComplianceTypeUncheckedUpdateWithoutComplianceRecordsInput>
    create: XOR<ComplianceTypeCreateWithoutComplianceRecordsInput, ComplianceTypeUncheckedCreateWithoutComplianceRecordsInput>
    where?: ComplianceTypeWhereInput
  }

  export type ComplianceTypeUpdateToOneWithWhereWithoutComplianceRecordsInput = {
    where?: ComplianceTypeWhereInput
    data: XOR<ComplianceTypeUpdateWithoutComplianceRecordsInput, ComplianceTypeUncheckedUpdateWithoutComplianceRecordsInput>
  }

  export type ComplianceTypeUpdateWithoutComplianceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    renewalFrequencyMonths?: IntFieldUpdateOperationsInput | number
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceTypeUncheckedUpdateWithoutComplianceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    renewalFrequencyMonths?: IntFieldUpdateOperationsInput | number
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyCreateWithoutMaintenanceTicketsInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyCreateNestedManyWithoutPropertyInput
    complianceRecords?: ComplianceRecordCreateNestedManyWithoutPropertyInput
    transactions?: TransactionCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutMaintenanceTicketsInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyUncheckedCreateNestedManyWithoutPropertyInput
    complianceRecords?: ComplianceRecordUncheckedCreateNestedManyWithoutPropertyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutMaintenanceTicketsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutMaintenanceTicketsInput, PropertyUncheckedCreateWithoutMaintenanceTicketsInput>
  }

  export type TenancyCreateWithoutMaintenanceTicketsInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutTenanciesInput
  }

  export type TenancyUncheckedCreateWithoutMaintenanceTicketsInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
  }

  export type TenancyCreateOrConnectWithoutMaintenanceTicketsInput = {
    where: TenancyWhereUniqueInput
    create: XOR<TenancyCreateWithoutMaintenanceTicketsInput, TenancyUncheckedCreateWithoutMaintenanceTicketsInput>
  }

  export type PropertyUpsertWithoutMaintenanceTicketsInput = {
    update: XOR<PropertyUpdateWithoutMaintenanceTicketsInput, PropertyUncheckedUpdateWithoutMaintenanceTicketsInput>
    create: XOR<PropertyCreateWithoutMaintenanceTicketsInput, PropertyUncheckedCreateWithoutMaintenanceTicketsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutMaintenanceTicketsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutMaintenanceTicketsInput, PropertyUncheckedUpdateWithoutMaintenanceTicketsInput>
  }

  export type PropertyUpdateWithoutMaintenanceTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUpdateManyWithoutPropertyNestedInput
    complianceRecords?: ComplianceRecordUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutMaintenanceTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUncheckedUpdateManyWithoutPropertyNestedInput
    complianceRecords?: ComplianceRecordUncheckedUpdateManyWithoutPropertyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type TenancyUpsertWithoutMaintenanceTicketsInput = {
    update: XOR<TenancyUpdateWithoutMaintenanceTicketsInput, TenancyUncheckedUpdateWithoutMaintenanceTicketsInput>
    create: XOR<TenancyCreateWithoutMaintenanceTicketsInput, TenancyUncheckedCreateWithoutMaintenanceTicketsInput>
    where?: TenancyWhereInput
  }

  export type TenancyUpdateToOneWithWhereWithoutMaintenanceTicketsInput = {
    where?: TenancyWhereInput
    data: XOR<TenancyUpdateWithoutMaintenanceTicketsInput, TenancyUncheckedUpdateWithoutMaintenanceTicketsInput>
  }

  export type TenancyUpdateWithoutMaintenanceTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutTenanciesNestedInput
  }

  export type TenancyUncheckedUpdateWithoutMaintenanceTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyCreateWithoutTransactionsInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyCreateNestedManyWithoutPropertyInput
    complianceRecords?: ComplianceRecordCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutTransactionsInput = {
    id?: string
    address: string
    postcode: string
    city?: string | null
    propertyType?: string | null
    bedrooms?: number | null
    bathrooms?: number | null
    purchaseDate?: Date | string | null
    propertyValueEstimate?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancies?: TenancyUncheckedCreateNestedManyWithoutPropertyInput
    complianceRecords?: ComplianceRecordUncheckedCreateNestedManyWithoutPropertyInput
    maintenanceTickets?: MaintenanceTicketUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutTransactionsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutTransactionsInput, PropertyUncheckedCreateWithoutTransactionsInput>
  }

  export type PropertyUpsertWithoutTransactionsInput = {
    update: XOR<PropertyUpdateWithoutTransactionsInput, PropertyUncheckedUpdateWithoutTransactionsInput>
    create: XOR<PropertyCreateWithoutTransactionsInput, PropertyUncheckedCreateWithoutTransactionsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutTransactionsInput, PropertyUncheckedUpdateWithoutTransactionsInput>
  }

  export type PropertyUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUpdateManyWithoutPropertyNestedInput
    complianceRecords?: ComplianceRecordUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    postcode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    propertyType?: NullableStringFieldUpdateOperationsInput | string | null
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyValueEstimate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancies?: TenancyUncheckedUpdateManyWithoutPropertyNestedInput
    complianceRecords?: ComplianceRecordUncheckedUpdateManyWithoutPropertyNestedInput
    maintenanceTickets?: MaintenanceTicketUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type TenancyCreateManyPropertyInput = {
    id?: string
    tenantName: string
    tenantEmail?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    monthlyRent: Decimal | DecimalJsLike | number | string
    depositAmount?: Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceRecordCreateManyPropertyInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    complianceTypeId: string
  }

  export type MaintenanceTicketCreateManyPropertyInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenancyId?: string | null
    reportedByUserId?: string | null
  }

  export type TransactionCreateManyPropertyInput = {
    id?: string
    type: string
    amount: Decimal | DecimalJsLike | number | string
    description: string
    category: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenancyUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceTickets?: MaintenanceTicketUpdateManyWithoutTenancyNestedInput
  }

  export type TenancyUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceTickets?: MaintenanceTicketUncheckedUpdateManyWithoutTenancyNestedInput
  }

  export type TenancyUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantName?: StringFieldUpdateOperationsInput | string
    tenantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyRent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    depositAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    depositProtectionScheme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceRecordUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complianceType?: ComplianceTypeUpdateOneRequiredWithoutComplianceRecordsNestedInput
  }

  export type ComplianceRecordUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complianceTypeId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplianceRecordUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complianceTypeId?: StringFieldUpdateOperationsInput | string
  }

  export type MaintenanceTicketUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    tenancy?: TenancyUpdateOneWithoutMaintenanceTicketsNestedInput
  }

  export type MaintenanceTicketUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancyId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaintenanceTicketUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenancyId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceTicketCreateManyTenancyInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
    reportedByUserId?: string | null
  }

  export type MaintenanceTicketUpdateWithoutTenancyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutMaintenanceTicketsNestedInput
  }

  export type MaintenanceTicketUncheckedUpdateWithoutTenancyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaintenanceTicketUncheckedUpdateManyWithoutTenancyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
    reportedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplianceRecordCreateManyComplianceTypeInput = {
    id?: string
    lastCompletedDate: Date | string
    nextDueDate: Date | string
    documentUrl?: string | null
    notes?: string | null
    lastReminderSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyId: string
  }

  export type ComplianceRecordUpdateWithoutComplianceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutComplianceRecordsNestedInput
  }

  export type ComplianceRecordUncheckedUpdateWithoutComplianceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplianceRecordUncheckedUpdateManyWithoutComplianceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastCompletedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lastReminderSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PropertyCountOutputTypeDefaultArgs instead
     */
    export type PropertyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenancyCountOutputTypeDefaultArgs instead
     */
    export type TenancyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenancyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplianceTypeCountOutputTypeDefaultArgs instead
     */
    export type ComplianceTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplianceTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyDefaultArgs instead
     */
    export type PropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenancyDefaultArgs instead
     */
    export type TenancyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenancyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplianceTypeDefaultArgs instead
     */
    export type ComplianceTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplianceTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplianceRecordDefaultArgs instead
     */
    export type ComplianceRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplianceRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MaintenanceTicketDefaultArgs instead
     */
    export type MaintenanceTicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MaintenanceTicketDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransactionDefaultArgs instead
     */
    export type TransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransactionDefaultArgs<ExtArgs>

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