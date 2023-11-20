type JsonPrimitive = null | number | string | boolean;
type Nested<V> = V | { [s: string]: V | Nested<V> } | Array<V | Nested<V>>;
type Json = Nested<JsonPrimitive>;

/**
 * helper type to get the possible values of a scalar field
 */
type ColumnValue<T> = T | ((ctx: { modelSeed: string; seed: string }) => T);

/**
 * helper type to map a record of scalars to a record of ColumnValue
 */
type MapToColumnValue<T> = { [K in keyof T]: ColumnValue<T[K]> };

/**
 * the callback function we can pass to a child field to generate a list of children
 * @example
 * snaplet.User((x) => x(2, (index) => ({ name: `User${index}` })))
 */
type ChildCallbackInputs<T> = (
  count: (
    n: number | { min: number; max: number },
    cb?: (index: number) => T
  ) => Array<T>
) => Array<T>;

/**
 * all the possible types for a child field
 */
type ChildInputs<T> = Array<T> | ChildCallbackInputs<T>;

/**
 * omit some keys TKeys from a child field
 * @example we remove ExecTask from the Snapshot child field values as we're coming from ExecTask
 * type ExecTaskChildrenInputs<TPath extends string[]> = {
 *   Snapshot: OmitChildInputs<SnapshotChildInputs<[...TPath, "Snapshot"]>, "ExecTask">;
 * };
 */
type OmitChildInputs<T, TKeys extends string> = T extends ChildCallbackInputs<
  infer U
>
  ? ChildCallbackInputs<Omit<U, TKeys>>
  : T extends Array<infer U>
  ? Array<Omit<U, TKeys>>
  : never;

/**
 * the callback function we can pass to a parent field to connect it to another model
 * @example
 * snaplet.Post({ User: (ctx) => ({ id: ctx.store.User[0] }) })
 */
type ConnectCallback<T, TGraph, TPath extends string[]> = (ctx: {
  index: number;
  seed: string;
  store: Store;
  graph: TGraph;
  branch: GetBranch<TGraph, TPath>;
}) => T;

/**
 * compute the Graph type and the tracked path to pass to the connect callback
 */
type ParentCallbackInputs<T, TPath extends string[]> = TPath extends [
  infer TRoot,
  ...infer TRest extends string[]
]
  ? TRoot extends keyof Graph
    ? MergeGraphParts<Graph[TRoot]> extends infer TGraph
      ? ConnectCallback<T, TGraph, TRest>
      : never
    : never
  : never;

type ParentInputs<T, TPath extends string[]> =
  | T
  | ParentCallbackInputs<T, TPath>;

/**
 * omit some keys TKeys from a parent field
 * @example we remove Member from the Organization and User parent fields values as we're coming from Member
 * type MemberParentsInputs<TPath extends string[]> = {
 *   Organization: OmitParentInputs<OrganizationParentInputs<[...TPath, "Organization"]>, "Member", [...TPath, "Organization"]>;
 *   User: OmitParentInputs<UserParentInputs<[...TPath, "User"]>, "Member", [...TPath, "User"]>;
 * };
 */
type OmitParentInputs<
  T,
  TKeys extends string,
  TPath extends string[]
> = T extends ConnectCallback<infer U, any, any>
  ? ParentCallbackInputs<Omit<U, TKeys>, TPath>
  : Omit<T, TKeys>;

/**
 * compute the inputs type for a given model
 */
type Inputs<TScalars, TParents, TChildren> = Partial<
  MapToColumnValue<TScalars> & TParents & TChildren
>;

type OmitChildGraph<
  T extends Array<unknown>,
  TKeys extends string
> = T extends Array<
  infer TGraph extends { Scalars: any; Parents: any; Children: any }
>
  ? Array<{
      Scalars: TGraph['Scalars'];
      Parents: TGraph['Parents'];
      Children: Omit<TGraph['Children'], TKeys>;
    }>
  : never;

type OmitParentGraph<
  T extends Array<unknown>,
  TKeys extends string
> = T extends Array<
  infer TGraph extends { Scalars: any; Parents: any; Children: any }
>
  ? Array<{
      Scalars: TGraph['Scalars'];
      Parents: Omit<TGraph['Parents'], TKeys>;
      Children: TGraph['Children'];
    }>
  : never;

type UnwrapArray<T> = T extends Array<infer U> ? U : T;

type DeepUnwrapKeys<TGraph, TKeys extends any[]> = TKeys extends [
  infer THead,
  ...infer TTail
]
  ? TTail extends any[]
    ? {
        [P in keyof TGraph]: P extends THead
          ? DeepUnwrapKeys<UnwrapArray<TGraph[P]>, TTail>
          : TGraph[P];
      }
    : TGraph
  : TGraph;

type GetBranch<T, K extends any[]> = T extends Array<infer U>
  ? DeepUnwrapKeys<U, K>
  : T;

type MergeGraphParts<T> = T extends Array<
  infer U extends { Scalars: unknown; Parents: unknown; Children: unknown }
>
  ? Array<
      U['Scalars'] & {
        [K in keyof U['Children']]: MergeGraphParts<U['Children'][K]>;
      } & {
        [K in keyof U['Parents']]: MergeGraphParts<
          U['Parents'][K]
        > extends Array<infer TParent>
          ? TParent
          : never;
      }
    >
  : never;

/**
 * the configurable map of models' generate and connect functions
 */
export type UserModels = {
  [KStore in keyof Store]?: Store[KStore] extends Array<
    infer TFields extends Record<string, any>
  >
    ? {
        connect?: (ctx: { store: Store }) => TFields;
        data?: Partial<MapToColumnValue<TFields>>;
      }
    : never;
};

type PlanOptions = {
  autoConnect?: boolean;
  models?: UserModels;
  store?: StoreInstance;
  seed?: string;
};

/**
 * the plan is extending PromiseLike so it can be awaited
 * @example
 * await snaplet.User({ name: "John" });
 */
export interface Plan extends PromiseLike<any> {
  generate: (initialStore?: Store) => Promise<Store>;
  pipe: Pipe;
  merge: Merge;
}

type Pipe = (
  plans: Plan[],
  options?: { models?: UserModels; seed?: string }
) => Plan;

type Merge = (
  plans: Plan[],
  options?: { models?: UserModels; seed?: string }
) => Plan;

type StoreInstance<T extends Partial<Store> = {}> = {
  _store: T;
  toSQL: () => string[];
};

type CreateStore = <T extends Partial<Store>>(
  initialData?: T,
  options?: { external: boolean }
) => StoreInstance<T>;
type Store = {
  HttpResponses: Array<HttpResponsesScalars>;
  auditLogEntries: Array<auditLogEntriesScalars>;
  awards: Array<awardsScalars>;
  buckets: Array<bucketsScalars>;
  flowStates: Array<flowStatesScalars>;
  heros: Array<herosScalars>;
  hooks: Array<hooksScalars>;
  httpRequestQueues: Array<httpRequestQueuesScalars>;
  identities: Array<identitiesScalars>;
  instances: Array<instancesScalars>;
  keys: Array<keysScalars>;
  mfaAmrClaims: Array<mfaAmrClaimsScalars>;
  mfaChallenges: Array<mfaChallengesScalars>;
  mfaFactors: Array<mfaFactorsScalars>;
  storageMigrations: Array<storageMigrationsScalars>;
  supabaseFunctionsMigrations: Array<supabaseFunctionsMigrationsScalars>;
  objects: Array<objectsScalars>;
  refreshTokens: Array<refreshTokensScalars>;
  samlProviders: Array<samlProvidersScalars>;
  samlRelayStates: Array<samlRelayStatesScalars>;
  authSchemaMigrations: Array<authSchemaMigrationsScalars>;
  supabaseMigrationsSchemaMigrations: Array<supabaseMigrationsSchemaMigrationsScalars>;
  secrets: Array<secretsScalars>;
  sessions: Array<sessionsScalars>;
  ssoDomains: Array<ssoDomainsScalars>;
  ssoProviders: Array<ssoProvidersScalars>;
  users: Array<usersScalars>;
};
type aal_levelEnum = 'aal1' | 'aal2' | 'aal3';
type code_challenge_methodEnum = 'plain' | 's256';
type factor_statusEnum = 'unverified' | 'verified';
type factor_typeEnum = 'totp' | 'webauthn';
type request_statusEnum = 'ERROR' | 'PENDING' | 'SUCCESS';
type key_statusEnum = 'default' | 'expired' | 'invalid' | 'valid';
type key_typeEnum =
  | 'aead-det'
  | 'aead-ietf'
  | 'auth'
  | 'generichash'
  | 'hmacsha256'
  | 'hmacsha512'
  | 'kdf'
  | 'secretbox'
  | 'secretstream'
  | 'shorthash'
  | 'stream_xchacha20';
type HttpResponsesScalars = {
  id: number | null;
  statusCode: number | null;
  contentType: string | null;
  headers: Json | null;
  content: string | null;
  timedOut: boolean | null;
  errorMsg: string | null;
  created?: string;
};
type HttpResponsesParentsInputs<TPath extends string[]> = {};
type HttpResponsesChildrenInputs<TPath extends string[]> = {};
type HttpResponsesInputs<TPath extends string[]> = Inputs<
  HttpResponsesScalars,
  HttpResponsesParentsInputs<TPath>,
  HttpResponsesChildrenInputs<TPath>
>;
type HttpResponsesChildInputs<TPath extends string[]> = ChildInputs<
  HttpResponsesInputs<TPath>
>;
type HttpResponsesParentInputs<TPath extends string[]> = ParentInputs<
  HttpResponsesInputs<TPath>,
  TPath
>;
type auditLogEntriesScalars = {
  instanceId: string | null;
  id: string;
  payload: Json | null;
  createdAt: string | null;
  ipAddress?: string;
};
type auditLogEntriesParentsInputs<TPath extends string[]> = {};
type auditLogEntriesChildrenInputs<TPath extends string[]> = {};
type auditLogEntriesInputs<TPath extends string[]> = Inputs<
  auditLogEntriesScalars,
  auditLogEntriesParentsInputs<TPath>,
  auditLogEntriesChildrenInputs<TPath>
>;
type auditLogEntriesChildInputs<TPath extends string[]> = ChildInputs<
  auditLogEntriesInputs<TPath>
>;
type auditLogEntriesParentInputs<TPath extends string[]> = ParentInputs<
  auditLogEntriesInputs<TPath>,
  TPath
>;
type awardsScalars = {
  id?: number;
  givenAt?: string;
  description: string;
  fromId: number;
  toId: number;
};
type awardsParentsInputs<TPath extends string[]> = {
  from: OmitParentInputs<
    herosParentInputs<[...TPath, 'from']>,
    'awardsByFromId',
    [...TPath, 'from']
  >;
  to: OmitParentInputs<
    herosParentInputs<[...TPath, 'to']>,
    'awardsByToId',
    [...TPath, 'to']
  >;
};
type awardsChildrenInputs<TPath extends string[]> = {};
type awardsInputs<TPath extends string[]> = Inputs<
  awardsScalars,
  awardsParentsInputs<TPath>,
  awardsChildrenInputs<TPath>
>;
type awardsChildInputs<TPath extends string[]> = ChildInputs<
  awardsInputs<TPath>
>;
type awardsParentInputs<TPath extends string[]> = ParentInputs<
  awardsInputs<TPath>,
  TPath
>;
type bucketsScalars = {
  id: string;
  name: string;
  owner: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  public: boolean | null;
  avifAutodetection: boolean | null;
  fileSizeLimit: number | null;
  allowedMimeTypes: string[] | null;
};
type bucketsParentsInputs<TPath extends string[]> = {
  userByOwner: OmitParentInputs<
    usersParentInputs<[...TPath, 'userByOwner']>,
    'bucketsByOwner',
    [...TPath, 'userByOwner']
  >;
};
type bucketsChildrenInputs<TPath extends string[]> = {
  objects: OmitChildInputs<
    objectsChildInputs<[...TPath, 'objects']>,
    'bucket' | 'bucketId'
  >;
};
type bucketsInputs<TPath extends string[]> = Inputs<
  bucketsScalars,
  bucketsParentsInputs<TPath>,
  bucketsChildrenInputs<TPath>
>;
type bucketsChildInputs<TPath extends string[]> = ChildInputs<
  bucketsInputs<TPath>
>;
type bucketsParentInputs<TPath extends string[]> = ParentInputs<
  bucketsInputs<TPath>,
  TPath
>;
type flowStatesScalars = {
  id: string;
  userId: string | null;
  authCode: string;
  codeChallengeMethod: code_challenge_methodEnum;
  codeChallenge: string;
  providerType: string;
  providerAccessToken: string | null;
  providerRefreshToken: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  authenticationMethod: string;
};
type flowStatesParentsInputs<TPath extends string[]> = {};
type flowStatesChildrenInputs<TPath extends string[]> = {
  samlRelayStates: OmitChildInputs<
    samlRelayStatesChildInputs<[...TPath, 'samlRelayStates']>,
    'flowState' | 'flowStateId'
  >;
};
type flowStatesInputs<TPath extends string[]> = Inputs<
  flowStatesScalars,
  flowStatesParentsInputs<TPath>,
  flowStatesChildrenInputs<TPath>
>;
type flowStatesChildInputs<TPath extends string[]> = ChildInputs<
  flowStatesInputs<TPath>
>;
type flowStatesParentInputs<TPath extends string[]> = ParentInputs<
  flowStatesInputs<TPath>,
  TPath
>;
type herosScalars = {
  id?: number;
  username: string;
  name: string;
};
type herosParentsInputs<TPath extends string[]> = {};
type herosChildrenInputs<TPath extends string[]> = {
  awardsByFromId: OmitChildInputs<
    awardsChildInputs<[...TPath, 'awardsByFromId']>,
    'from' | 'fromId'
  >;
  awardsByToId: OmitChildInputs<
    awardsChildInputs<[...TPath, 'awardsByToId']>,
    'to' | 'toId'
  >;
};
type herosInputs<TPath extends string[]> = Inputs<
  herosScalars,
  herosParentsInputs<TPath>,
  herosChildrenInputs<TPath>
>;
type herosChildInputs<TPath extends string[]> = ChildInputs<herosInputs<TPath>>;
type herosParentInputs<TPath extends string[]> = ParentInputs<
  herosInputs<TPath>,
  TPath
>;
type hooksScalars = {
  id?: number;
  hookTableId: number;
  hookName: string;
  createdAt?: string;
  requestId: number | null;
};
type hooksParentsInputs<TPath extends string[]> = {};
type hooksChildrenInputs<TPath extends string[]> = {};
type hooksInputs<TPath extends string[]> = Inputs<
  hooksScalars,
  hooksParentsInputs<TPath>,
  hooksChildrenInputs<TPath>
>;
type hooksChildInputs<TPath extends string[]> = ChildInputs<hooksInputs<TPath>>;
type hooksParentInputs<TPath extends string[]> = ParentInputs<
  hooksInputs<TPath>,
  TPath
>;
type httpRequestQueuesScalars = {
  id?: number;
  method: string;
  url: string;
  headers: Json;
  body: string | null;
  timeoutMilliseconds: number;
};
type httpRequestQueuesParentsInputs<TPath extends string[]> = {};
type httpRequestQueuesChildrenInputs<TPath extends string[]> = {};
type httpRequestQueuesInputs<TPath extends string[]> = Inputs<
  httpRequestQueuesScalars,
  httpRequestQueuesParentsInputs<TPath>,
  httpRequestQueuesChildrenInputs<TPath>
>;
type httpRequestQueuesChildInputs<TPath extends string[]> = ChildInputs<
  httpRequestQueuesInputs<TPath>
>;
type httpRequestQueuesParentInputs<TPath extends string[]> = ParentInputs<
  httpRequestQueuesInputs<TPath>,
  TPath
>;
type identitiesScalars = {
  id: string;
  userId: string;
  identityData: Json;
  provider: string;
  lastSignInAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  email?: string | null;
};
type identitiesParentsInputs<TPath extends string[]> = {
  user: OmitParentInputs<
    usersParentInputs<[...TPath, 'user']>,
    'identities',
    [...TPath, 'user']
  >;
};
type identitiesChildrenInputs<TPath extends string[]> = {};
type identitiesInputs<TPath extends string[]> = Inputs<
  Omit<identitiesScalars, 'email'>,
  identitiesParentsInputs<TPath>,
  identitiesChildrenInputs<TPath>
>;
type identitiesChildInputs<TPath extends string[]> = ChildInputs<
  identitiesInputs<TPath>
>;
type identitiesParentInputs<TPath extends string[]> = ParentInputs<
  identitiesInputs<TPath>,
  TPath
>;
type instancesScalars = {
  id: string;
  uuid: string | null;
  rawBaseConfig: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};
type instancesParentsInputs<TPath extends string[]> = {};
type instancesChildrenInputs<TPath extends string[]> = {};
type instancesInputs<TPath extends string[]> = Inputs<
  instancesScalars,
  instancesParentsInputs<TPath>,
  instancesChildrenInputs<TPath>
>;
type instancesChildInputs<TPath extends string[]> = ChildInputs<
  instancesInputs<TPath>
>;
type instancesParentInputs<TPath extends string[]> = ParentInputs<
  instancesInputs<TPath>,
  TPath
>;
type keysScalars = {
  id?: string;
  status: key_statusEnum | null;
  created?: string;
  expires: string | null;
  keyType: key_typeEnum | null;
  keyId: number | null;
  keyContext: string | null;
  name: string | null;
  associatedData: string | null;
  rawKey: string | null;
  rawKeyNonce: string | null;
  parentKey: string | null;
  comment: string | null;
  userData: string | null;
};
type keysParentsInputs<TPath extends string[]> = {
  keysByParentKey: OmitParentInputs<
    keysParentInputs<[...TPath, 'keysByParentKey']>,
    'keysByParentKey',
    [...TPath, 'keysByParentKey']
  >;
};
type keysChildrenInputs<TPath extends string[]> = {
  secrets: OmitChildInputs<
    secretsChildInputs<[...TPath, 'secrets']>,
    'key' | 'keyId'
  >;
};
type keysInputs<TPath extends string[]> = Inputs<
  keysScalars,
  keysParentsInputs<TPath>,
  keysChildrenInputs<TPath>
>;
type keysChildInputs<TPath extends string[]> = ChildInputs<keysInputs<TPath>>;
type keysParentInputs<TPath extends string[]> = ParentInputs<
  keysInputs<TPath>,
  TPath
>;
type mfaAmrClaimsScalars = {
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  authenticationMethod: string;
  id: string;
};
type mfaAmrClaimsParentsInputs<TPath extends string[]> = {
  session: OmitParentInputs<
    sessionsParentInputs<[...TPath, 'session']>,
    'mfaAmrClaims',
    [...TPath, 'session']
  >;
};
type mfaAmrClaimsChildrenInputs<TPath extends string[]> = {};
type mfaAmrClaimsInputs<TPath extends string[]> = Inputs<
  mfaAmrClaimsScalars,
  mfaAmrClaimsParentsInputs<TPath>,
  mfaAmrClaimsChildrenInputs<TPath>
>;
type mfaAmrClaimsChildInputs<TPath extends string[]> = ChildInputs<
  mfaAmrClaimsInputs<TPath>
>;
type mfaAmrClaimsParentInputs<TPath extends string[]> = ParentInputs<
  mfaAmrClaimsInputs<TPath>,
  TPath
>;
type mfaChallengesScalars = {
  id: string;
  factorId: string;
  createdAt: string;
  verifiedAt: string | null;
  ipAddress: string;
};
type mfaChallengesParentsInputs<TPath extends string[]> = {
  factor: OmitParentInputs<
    mfaFactorsParentInputs<[...TPath, 'factor']>,
    'mfaChallengesByFactorId',
    [...TPath, 'factor']
  >;
};
type mfaChallengesChildrenInputs<TPath extends string[]> = {};
type mfaChallengesInputs<TPath extends string[]> = Inputs<
  mfaChallengesScalars,
  mfaChallengesParentsInputs<TPath>,
  mfaChallengesChildrenInputs<TPath>
>;
type mfaChallengesChildInputs<TPath extends string[]> = ChildInputs<
  mfaChallengesInputs<TPath>
>;
type mfaChallengesParentInputs<TPath extends string[]> = ParentInputs<
  mfaChallengesInputs<TPath>,
  TPath
>;
type mfaFactorsScalars = {
  id: string;
  userId: string;
  friendlyName: string | null;
  factorType: factor_typeEnum;
  status: factor_statusEnum;
  createdAt: string;
  updatedAt: string;
  secret: string | null;
};
type mfaFactorsParentsInputs<TPath extends string[]> = {
  user: OmitParentInputs<
    usersParentInputs<[...TPath, 'user']>,
    'mfaFactors',
    [...TPath, 'user']
  >;
};
type mfaFactorsChildrenInputs<TPath extends string[]> = {
  mfaChallengesByFactorId: OmitChildInputs<
    mfaChallengesChildInputs<[...TPath, 'mfaChallengesByFactorId']>,
    'factor' | 'factorId'
  >;
};
type mfaFactorsInputs<TPath extends string[]> = Inputs<
  mfaFactorsScalars,
  mfaFactorsParentsInputs<TPath>,
  mfaFactorsChildrenInputs<TPath>
>;
type mfaFactorsChildInputs<TPath extends string[]> = ChildInputs<
  mfaFactorsInputs<TPath>
>;
type mfaFactorsParentInputs<TPath extends string[]> = ParentInputs<
  mfaFactorsInputs<TPath>,
  TPath
>;
type storageMigrationsScalars = {
  id: number;
  name: string;
  hash: string;
  executedAt: string | null;
};
type storageMigrationsParentsInputs<TPath extends string[]> = {};
type storageMigrationsChildrenInputs<TPath extends string[]> = {};
type storageMigrationsInputs<TPath extends string[]> = Inputs<
  storageMigrationsScalars,
  storageMigrationsParentsInputs<TPath>,
  storageMigrationsChildrenInputs<TPath>
>;
type storageMigrationsChildInputs<TPath extends string[]> = ChildInputs<
  storageMigrationsInputs<TPath>
>;
type storageMigrationsParentInputs<TPath extends string[]> = ParentInputs<
  storageMigrationsInputs<TPath>,
  TPath
>;
type supabaseFunctionsMigrationsScalars = {
  version: string;
  insertedAt?: string;
};
type supabaseFunctionsMigrationsParentsInputs<TPath extends string[]> = {};
type supabaseFunctionsMigrationsChildrenInputs<TPath extends string[]> = {};
type supabaseFunctionsMigrationsInputs<TPath extends string[]> = Inputs<
  supabaseFunctionsMigrationsScalars,
  supabaseFunctionsMigrationsParentsInputs<TPath>,
  supabaseFunctionsMigrationsChildrenInputs<TPath>
>;
type supabaseFunctionsMigrationsChildInputs<TPath extends string[]> =
  ChildInputs<supabaseFunctionsMigrationsInputs<TPath>>;
type supabaseFunctionsMigrationsParentInputs<TPath extends string[]> =
  ParentInputs<supabaseFunctionsMigrationsInputs<TPath>, TPath>;
type objectsScalars = {
  id?: string;
  bucketId: string | null;
  name: string | null;
  owner: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  lastAccessedAt: string | null;
  metadata: Json | null;
  pathTokens?: string[] | null;
  version: string | null;
};
type objectsParentsInputs<TPath extends string[]> = {
  bucket: OmitParentInputs<
    bucketsParentInputs<[...TPath, 'bucket']>,
    'objects',
    [...TPath, 'bucket']
  >;
};
type objectsChildrenInputs<TPath extends string[]> = {};
type objectsInputs<TPath extends string[]> = Inputs<
  Omit<objectsScalars, 'pathTokens'>,
  objectsParentsInputs<TPath>,
  objectsChildrenInputs<TPath>
>;
type objectsChildInputs<TPath extends string[]> = ChildInputs<
  objectsInputs<TPath>
>;
type objectsParentInputs<TPath extends string[]> = ParentInputs<
  objectsInputs<TPath>,
  TPath
>;
type refreshTokensScalars = {
  instanceId: string | null;
  id?: number;
  token: string | null;
  userId: string | null;
  revoked: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  parent: string | null;
  sessionId: string | null;
};
type refreshTokensParentsInputs<TPath extends string[]> = {
  session: OmitParentInputs<
    sessionsParentInputs<[...TPath, 'session']>,
    'refreshTokens',
    [...TPath, 'session']
  >;
};
type refreshTokensChildrenInputs<TPath extends string[]> = {};
type refreshTokensInputs<TPath extends string[]> = Inputs<
  refreshTokensScalars,
  refreshTokensParentsInputs<TPath>,
  refreshTokensChildrenInputs<TPath>
>;
type refreshTokensChildInputs<TPath extends string[]> = ChildInputs<
  refreshTokensInputs<TPath>
>;
type refreshTokensParentInputs<TPath extends string[]> = ParentInputs<
  refreshTokensInputs<TPath>,
  TPath
>;
type samlProvidersScalars = {
  id: string;
  ssoProviderId: string;
  entityId: string;
  metadataXml: string;
  metadataUrl: string | null;
  attributeMapping: Json | null;
  createdAt: string | null;
  updatedAt: string | null;
};
type samlProvidersParentsInputs<TPath extends string[]> = {
  ssoProvider: OmitParentInputs<
    ssoProvidersParentInputs<[...TPath, 'ssoProvider']>,
    'samlProviders',
    [...TPath, 'ssoProvider']
  >;
};
type samlProvidersChildrenInputs<TPath extends string[]> = {};
type samlProvidersInputs<TPath extends string[]> = Inputs<
  samlProvidersScalars,
  samlProvidersParentsInputs<TPath>,
  samlProvidersChildrenInputs<TPath>
>;
type samlProvidersChildInputs<TPath extends string[]> = ChildInputs<
  samlProvidersInputs<TPath>
>;
type samlProvidersParentInputs<TPath extends string[]> = ParentInputs<
  samlProvidersInputs<TPath>,
  TPath
>;
type samlRelayStatesScalars = {
  id: string;
  ssoProviderId: string;
  requestId: string;
  forEmail: string | null;
  redirectTo: string | null;
  fromIpAddress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  flowStateId: string | null;
};
type samlRelayStatesParentsInputs<TPath extends string[]> = {
  flowState: OmitParentInputs<
    flowStatesParentInputs<[...TPath, 'flowState']>,
    'samlRelayStates',
    [...TPath, 'flowState']
  >;
  ssoProvider: OmitParentInputs<
    ssoProvidersParentInputs<[...TPath, 'ssoProvider']>,
    'samlRelayStates',
    [...TPath, 'ssoProvider']
  >;
};
type samlRelayStatesChildrenInputs<TPath extends string[]> = {};
type samlRelayStatesInputs<TPath extends string[]> = Inputs<
  samlRelayStatesScalars,
  samlRelayStatesParentsInputs<TPath>,
  samlRelayStatesChildrenInputs<TPath>
>;
type samlRelayStatesChildInputs<TPath extends string[]> = ChildInputs<
  samlRelayStatesInputs<TPath>
>;
type samlRelayStatesParentInputs<TPath extends string[]> = ParentInputs<
  samlRelayStatesInputs<TPath>,
  TPath
>;
type authSchemaMigrationsScalars = {
  version: string;
};
type authSchemaMigrationsParentsInputs<TPath extends string[]> = {};
type authSchemaMigrationsChildrenInputs<TPath extends string[]> = {};
type authSchemaMigrationsInputs<TPath extends string[]> = Inputs<
  authSchemaMigrationsScalars,
  authSchemaMigrationsParentsInputs<TPath>,
  authSchemaMigrationsChildrenInputs<TPath>
>;
type authSchemaMigrationsChildInputs<TPath extends string[]> = ChildInputs<
  authSchemaMigrationsInputs<TPath>
>;
type authSchemaMigrationsParentInputs<TPath extends string[]> = ParentInputs<
  authSchemaMigrationsInputs<TPath>,
  TPath
>;
type supabaseMigrationsSchemaMigrationsScalars = {
  version: string;
  statements: string[] | null;
  name: string | null;
};
type supabaseMigrationsSchemaMigrationsParentsInputs<TPath extends string[]> =
  {};
type supabaseMigrationsSchemaMigrationsChildrenInputs<TPath extends string[]> =
  {};
type supabaseMigrationsSchemaMigrationsInputs<TPath extends string[]> = Inputs<
  supabaseMigrationsSchemaMigrationsScalars,
  supabaseMigrationsSchemaMigrationsParentsInputs<TPath>,
  supabaseMigrationsSchemaMigrationsChildrenInputs<TPath>
>;
type supabaseMigrationsSchemaMigrationsChildInputs<TPath extends string[]> =
  ChildInputs<supabaseMigrationsSchemaMigrationsInputs<TPath>>;
type supabaseMigrationsSchemaMigrationsParentInputs<TPath extends string[]> =
  ParentInputs<supabaseMigrationsSchemaMigrationsInputs<TPath>, TPath>;
type secretsScalars = {
  id?: string;
  name: string | null;
  description?: string;
  secret: string;
  keyId: string | null;
  nonce: string | null;
  createdAt?: string;
  updatedAt?: string;
};
type secretsParentsInputs<TPath extends string[]> = {
  key: OmitParentInputs<
    keysParentInputs<[...TPath, 'key']>,
    'secrets',
    [...TPath, 'key']
  >;
};
type secretsChildrenInputs<TPath extends string[]> = {};
type secretsInputs<TPath extends string[]> = Inputs<
  secretsScalars,
  secretsParentsInputs<TPath>,
  secretsChildrenInputs<TPath>
>;
type secretsChildInputs<TPath extends string[]> = ChildInputs<
  secretsInputs<TPath>
>;
type secretsParentInputs<TPath extends string[]> = ParentInputs<
  secretsInputs<TPath>,
  TPath
>;
type sessionsScalars = {
  id: string;
  userId: string;
  createdAt: string | null;
  updatedAt: string | null;
  factorId: string | null;
  aal: aal_levelEnum | null;
  notAfter: string | null;
};
type sessionsParentsInputs<TPath extends string[]> = {
  user: OmitParentInputs<
    usersParentInputs<[...TPath, 'user']>,
    'sessions',
    [...TPath, 'user']
  >;
};
type sessionsChildrenInputs<TPath extends string[]> = {
  mfaAmrClaims: OmitChildInputs<
    mfaAmrClaimsChildInputs<[...TPath, 'mfaAmrClaims']>,
    'session' | 'sessionId'
  >;
  refreshTokens: OmitChildInputs<
    refreshTokensChildInputs<[...TPath, 'refreshTokens']>,
    'session' | 'sessionId'
  >;
};
type sessionsInputs<TPath extends string[]> = Inputs<
  sessionsScalars,
  sessionsParentsInputs<TPath>,
  sessionsChildrenInputs<TPath>
>;
type sessionsChildInputs<TPath extends string[]> = ChildInputs<
  sessionsInputs<TPath>
>;
type sessionsParentInputs<TPath extends string[]> = ParentInputs<
  sessionsInputs<TPath>,
  TPath
>;
type ssoDomainsScalars = {
  id: string;
  ssoProviderId: string;
  domain: string;
  createdAt: string | null;
  updatedAt: string | null;
};
type ssoDomainsParentsInputs<TPath extends string[]> = {
  ssoProvider: OmitParentInputs<
    ssoProvidersParentInputs<[...TPath, 'ssoProvider']>,
    'ssoDomains',
    [...TPath, 'ssoProvider']
  >;
};
type ssoDomainsChildrenInputs<TPath extends string[]> = {};
type ssoDomainsInputs<TPath extends string[]> = Inputs<
  ssoDomainsScalars,
  ssoDomainsParentsInputs<TPath>,
  ssoDomainsChildrenInputs<TPath>
>;
type ssoDomainsChildInputs<TPath extends string[]> = ChildInputs<
  ssoDomainsInputs<TPath>
>;
type ssoDomainsParentInputs<TPath extends string[]> = ParentInputs<
  ssoDomainsInputs<TPath>,
  TPath
>;
type ssoProvidersScalars = {
  id: string;
  resourceId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};
type ssoProvidersParentsInputs<TPath extends string[]> = {};
type ssoProvidersChildrenInputs<TPath extends string[]> = {
  samlProviders: OmitChildInputs<
    samlProvidersChildInputs<[...TPath, 'samlProviders']>,
    'ssoProvider' | 'ssoProviderId'
  >;
  samlRelayStates: OmitChildInputs<
    samlRelayStatesChildInputs<[...TPath, 'samlRelayStates']>,
    'ssoProvider' | 'ssoProviderId'
  >;
  ssoDomains: OmitChildInputs<
    ssoDomainsChildInputs<[...TPath, 'ssoDomains']>,
    'ssoProvider' | 'ssoProviderId'
  >;
};
type ssoProvidersInputs<TPath extends string[]> = Inputs<
  ssoProvidersScalars,
  ssoProvidersParentsInputs<TPath>,
  ssoProvidersChildrenInputs<TPath>
>;
type ssoProvidersChildInputs<TPath extends string[]> = ChildInputs<
  ssoProvidersInputs<TPath>
>;
type ssoProvidersParentInputs<TPath extends string[]> = ParentInputs<
  ssoProvidersInputs<TPath>,
  TPath
>;
type usersScalars = {
  instanceId: string | null;
  id: string;
  aud: string | null;
  role: string | null;
  email: string | null;
  encryptedPassword: string | null;
  emailConfirmedAt: string | null;
  invitedAt: string | null;
  confirmationToken: string | null;
  confirmationSentAt: string | null;
  recoveryToken: string | null;
  recoverySentAt: string | null;
  emailChangeTokenNew: string | null;
  emailChange: string | null;
  emailChangeSentAt: string | null;
  lastSignInAt: string | null;
  rawAppMetaData: Json | null;
  rawUserMetaData: Json | null;
  isSuperAdmin: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  phone: string | null;
  phoneConfirmedAt: string | null;
  phoneChange: string | null;
  phoneChangeToken: string | null;
  phoneChangeSentAt: string | null;
  confirmedAt?: string | null;
  emailChangeTokenCurrent: string | null;
  emailChangeConfirmStatus: number | null;
  bannedUntil: string | null;
  reauthenticationToken: string | null;
  reauthenticationSentAt: string | null;
  isSsoUser?: boolean;
  deletedAt: string | null;
};
type usersParentsInputs<TPath extends string[]> = {};
type usersChildrenInputs<TPath extends string[]> = {
  identities: OmitChildInputs<
    identitiesChildInputs<[...TPath, 'identities']>,
    'user' | 'userId'
  >;
  mfaFactors: OmitChildInputs<
    mfaFactorsChildInputs<[...TPath, 'mfaFactors']>,
    'user' | 'userId'
  >;
  sessions: OmitChildInputs<
    sessionsChildInputs<[...TPath, 'sessions']>,
    'user' | 'userId'
  >;
  bucketsByOwner: OmitChildInputs<
    bucketsChildInputs<[...TPath, 'bucketsByOwner']>,
    'userByOwner' | 'owner'
  >;
};
type usersInputs<TPath extends string[]> = Inputs<
  Omit<usersScalars, 'confirmedAt'>,
  usersParentsInputs<TPath>,
  usersChildrenInputs<TPath>
>;
type usersChildInputs<TPath extends string[]> = ChildInputs<usersInputs<TPath>>;
type usersParentInputs<TPath extends string[]> = ParentInputs<
  usersInputs<TPath>,
  TPath
>;
type HttpResponsesParentsGraph = {};
type HttpResponsesChildrenGraph = {};
type HttpResponsesGraph = Array<{
  Scalars: HttpResponsesScalars;
  Parents: HttpResponsesParentsGraph;
  Children: HttpResponsesChildrenGraph;
}>;
type auditLogEntriesParentsGraph = {};
type auditLogEntriesChildrenGraph = {};
type auditLogEntriesGraph = Array<{
  Scalars: auditLogEntriesScalars;
  Parents: auditLogEntriesParentsGraph;
  Children: auditLogEntriesChildrenGraph;
}>;
type awardsParentsGraph = {
  from: OmitChildGraph<herosGraph, 'awardsByFromId'>;
  to: OmitChildGraph<herosGraph, 'awardsByToId'>;
};
type awardsChildrenGraph = {};
type awardsGraph = Array<{
  Scalars: awardsScalars;
  Parents: awardsParentsGraph;
  Children: awardsChildrenGraph;
}>;
type bucketsParentsGraph = {
  userByOwner: OmitChildGraph<usersGraph, 'bucketsByOwner'>;
};
type bucketsChildrenGraph = {
  objects: OmitParentGraph<objectsGraph, 'bucket'>;
};
type bucketsGraph = Array<{
  Scalars: bucketsScalars;
  Parents: bucketsParentsGraph;
  Children: bucketsChildrenGraph;
}>;
type flowStatesParentsGraph = {};
type flowStatesChildrenGraph = {
  samlRelayStates: OmitParentGraph<samlRelayStatesGraph, 'flowState'>;
};
type flowStatesGraph = Array<{
  Scalars: flowStatesScalars;
  Parents: flowStatesParentsGraph;
  Children: flowStatesChildrenGraph;
}>;
type herosParentsGraph = {};
type herosChildrenGraph = {
  awardsByFromId: OmitParentGraph<awardsGraph, 'from'>;
  awardsByToId: OmitParentGraph<awardsGraph, 'to'>;
};
type herosGraph = Array<{
  Scalars: herosScalars;
  Parents: herosParentsGraph;
  Children: herosChildrenGraph;
}>;
type hooksParentsGraph = {};
type hooksChildrenGraph = {};
type hooksGraph = Array<{
  Scalars: hooksScalars;
  Parents: hooksParentsGraph;
  Children: hooksChildrenGraph;
}>;
type httpRequestQueuesParentsGraph = {};
type httpRequestQueuesChildrenGraph = {};
type httpRequestQueuesGraph = Array<{
  Scalars: httpRequestQueuesScalars;
  Parents: httpRequestQueuesParentsGraph;
  Children: httpRequestQueuesChildrenGraph;
}>;
type identitiesParentsGraph = {
  user: OmitChildGraph<usersGraph, 'identities'>;
};
type identitiesChildrenGraph = {};
type identitiesGraph = Array<{
  Scalars: identitiesScalars;
  Parents: identitiesParentsGraph;
  Children: identitiesChildrenGraph;
}>;
type instancesParentsGraph = {};
type instancesChildrenGraph = {};
type instancesGraph = Array<{
  Scalars: instancesScalars;
  Parents: instancesParentsGraph;
  Children: instancesChildrenGraph;
}>;
type keysParentsGraph = {
  keysByParentKey: OmitChildGraph<keysGraph, 'keysByParentKey'>;
};
type keysChildrenGraph = {
  secrets: OmitParentGraph<secretsGraph, 'key'>;
};
type keysGraph = Array<{
  Scalars: keysScalars;
  Parents: keysParentsGraph;
  Children: keysChildrenGraph;
}>;
type mfaAmrClaimsParentsGraph = {
  session: OmitChildGraph<sessionsGraph, 'mfaAmrClaims'>;
};
type mfaAmrClaimsChildrenGraph = {};
type mfaAmrClaimsGraph = Array<{
  Scalars: mfaAmrClaimsScalars;
  Parents: mfaAmrClaimsParentsGraph;
  Children: mfaAmrClaimsChildrenGraph;
}>;
type mfaChallengesParentsGraph = {
  factor: OmitChildGraph<mfaFactorsGraph, 'mfaChallengesByFactorId'>;
};
type mfaChallengesChildrenGraph = {};
type mfaChallengesGraph = Array<{
  Scalars: mfaChallengesScalars;
  Parents: mfaChallengesParentsGraph;
  Children: mfaChallengesChildrenGraph;
}>;
type mfaFactorsParentsGraph = {
  user: OmitChildGraph<usersGraph, 'mfaFactors'>;
};
type mfaFactorsChildrenGraph = {
  mfaChallengesByFactorId: OmitParentGraph<mfaChallengesGraph, 'factor'>;
};
type mfaFactorsGraph = Array<{
  Scalars: mfaFactorsScalars;
  Parents: mfaFactorsParentsGraph;
  Children: mfaFactorsChildrenGraph;
}>;
type storageMigrationsParentsGraph = {};
type storageMigrationsChildrenGraph = {};
type storageMigrationsGraph = Array<{
  Scalars: storageMigrationsScalars;
  Parents: storageMigrationsParentsGraph;
  Children: storageMigrationsChildrenGraph;
}>;
type supabaseFunctionsMigrationsParentsGraph = {};
type supabaseFunctionsMigrationsChildrenGraph = {};
type supabaseFunctionsMigrationsGraph = Array<{
  Scalars: supabaseFunctionsMigrationsScalars;
  Parents: supabaseFunctionsMigrationsParentsGraph;
  Children: supabaseFunctionsMigrationsChildrenGraph;
}>;
type objectsParentsGraph = {
  bucket: OmitChildGraph<bucketsGraph, 'objects'>;
};
type objectsChildrenGraph = {};
type objectsGraph = Array<{
  Scalars: objectsScalars;
  Parents: objectsParentsGraph;
  Children: objectsChildrenGraph;
}>;
type refreshTokensParentsGraph = {
  session: OmitChildGraph<sessionsGraph, 'refreshTokens'>;
};
type refreshTokensChildrenGraph = {};
type refreshTokensGraph = Array<{
  Scalars: refreshTokensScalars;
  Parents: refreshTokensParentsGraph;
  Children: refreshTokensChildrenGraph;
}>;
type samlProvidersParentsGraph = {
  ssoProvider: OmitChildGraph<ssoProvidersGraph, 'samlProviders'>;
};
type samlProvidersChildrenGraph = {};
type samlProvidersGraph = Array<{
  Scalars: samlProvidersScalars;
  Parents: samlProvidersParentsGraph;
  Children: samlProvidersChildrenGraph;
}>;
type samlRelayStatesParentsGraph = {
  flowState: OmitChildGraph<flowStatesGraph, 'samlRelayStates'>;
  ssoProvider: OmitChildGraph<ssoProvidersGraph, 'samlRelayStates'>;
};
type samlRelayStatesChildrenGraph = {};
type samlRelayStatesGraph = Array<{
  Scalars: samlRelayStatesScalars;
  Parents: samlRelayStatesParentsGraph;
  Children: samlRelayStatesChildrenGraph;
}>;
type authSchemaMigrationsParentsGraph = {};
type authSchemaMigrationsChildrenGraph = {};
type authSchemaMigrationsGraph = Array<{
  Scalars: authSchemaMigrationsScalars;
  Parents: authSchemaMigrationsParentsGraph;
  Children: authSchemaMigrationsChildrenGraph;
}>;
type supabaseMigrationsSchemaMigrationsParentsGraph = {};
type supabaseMigrationsSchemaMigrationsChildrenGraph = {};
type supabaseMigrationsSchemaMigrationsGraph = Array<{
  Scalars: supabaseMigrationsSchemaMigrationsScalars;
  Parents: supabaseMigrationsSchemaMigrationsParentsGraph;
  Children: supabaseMigrationsSchemaMigrationsChildrenGraph;
}>;
type secretsParentsGraph = {
  key: OmitChildGraph<keysGraph, 'secrets'>;
};
type secretsChildrenGraph = {};
type secretsGraph = Array<{
  Scalars: secretsScalars;
  Parents: secretsParentsGraph;
  Children: secretsChildrenGraph;
}>;
type sessionsParentsGraph = {
  user: OmitChildGraph<usersGraph, 'sessions'>;
};
type sessionsChildrenGraph = {
  mfaAmrClaims: OmitParentGraph<mfaAmrClaimsGraph, 'session'>;
  refreshTokens: OmitParentGraph<refreshTokensGraph, 'session'>;
};
type sessionsGraph = Array<{
  Scalars: sessionsScalars;
  Parents: sessionsParentsGraph;
  Children: sessionsChildrenGraph;
}>;
type ssoDomainsParentsGraph = {
  ssoProvider: OmitChildGraph<ssoProvidersGraph, 'ssoDomains'>;
};
type ssoDomainsChildrenGraph = {};
type ssoDomainsGraph = Array<{
  Scalars: ssoDomainsScalars;
  Parents: ssoDomainsParentsGraph;
  Children: ssoDomainsChildrenGraph;
}>;
type ssoProvidersParentsGraph = {};
type ssoProvidersChildrenGraph = {
  samlProviders: OmitParentGraph<samlProvidersGraph, 'ssoProvider'>;
  samlRelayStates: OmitParentGraph<samlRelayStatesGraph, 'ssoProvider'>;
  ssoDomains: OmitParentGraph<ssoDomainsGraph, 'ssoProvider'>;
};
type ssoProvidersGraph = Array<{
  Scalars: ssoProvidersScalars;
  Parents: ssoProvidersParentsGraph;
  Children: ssoProvidersChildrenGraph;
}>;
type usersParentsGraph = {};
type usersChildrenGraph = {
  identities: OmitParentGraph<identitiesGraph, 'user'>;
  mfaFactors: OmitParentGraph<mfaFactorsGraph, 'user'>;
  sessions: OmitParentGraph<sessionsGraph, 'user'>;
  bucketsByOwner: OmitParentGraph<bucketsGraph, 'userByOwner'>;
};
type usersGraph = Array<{
  Scalars: usersScalars;
  Parents: usersParentsGraph;
  Children: usersChildrenGraph;
}>;
type Graph = {
  HttpResponses: HttpResponsesGraph;
  auditLogEntries: auditLogEntriesGraph;
  awards: awardsGraph;
  buckets: bucketsGraph;
  flowStates: flowStatesGraph;
  heros: herosGraph;
  hooks: hooksGraph;
  httpRequestQueues: httpRequestQueuesGraph;
  identities: identitiesGraph;
  instances: instancesGraph;
  keys: keysGraph;
  mfaAmrClaims: mfaAmrClaimsGraph;
  mfaChallenges: mfaChallengesGraph;
  mfaFactors: mfaFactorsGraph;
  storageMigrations: storageMigrationsGraph;
  supabaseFunctionsMigrations: supabaseFunctionsMigrationsGraph;
  objects: objectsGraph;
  refreshTokens: refreshTokensGraph;
  samlProviders: samlProvidersGraph;
  samlRelayStates: samlRelayStatesGraph;
  authSchemaMigrations: authSchemaMigrationsGraph;
  supabaseMigrationsSchemaMigrations: supabaseMigrationsSchemaMigrationsGraph;
  secrets: secretsGraph;
  sessions: sessionsGraph;
  ssoDomains: ssoDomainsGraph;
  ssoProviders: ssoProvidersGraph;
  users: usersGraph;
};
export type SnapletClient = {
  HttpResponses: (
    inputs: HttpResponsesChildInputs<['HttpResponses']>,
    options?: PlanOptions
  ) => Plan;
  auditLogEntries: (
    inputs: auditLogEntriesChildInputs<['auditLogEntries']>,
    options?: PlanOptions
  ) => Plan;
  awards: (
    inputs: awardsChildInputs<['awards']>,
    options?: PlanOptions
  ) => Plan;
  buckets: (
    inputs: bucketsChildInputs<['buckets']>,
    options?: PlanOptions
  ) => Plan;
  flowStates: (
    inputs: flowStatesChildInputs<['flowStates']>,
    options?: PlanOptions
  ) => Plan;
  heros: (inputs: herosChildInputs<['heros']>, options?: PlanOptions) => Plan;
  hooks: (inputs: hooksChildInputs<['hooks']>, options?: PlanOptions) => Plan;
  httpRequestQueues: (
    inputs: httpRequestQueuesChildInputs<['httpRequestQueues']>,
    options?: PlanOptions
  ) => Plan;
  identities: (
    inputs: identitiesChildInputs<['identities']>,
    options?: PlanOptions
  ) => Plan;
  instances: (
    inputs: instancesChildInputs<['instances']>,
    options?: PlanOptions
  ) => Plan;
  keys: (inputs: keysChildInputs<['keys']>, options?: PlanOptions) => Plan;
  mfaAmrClaims: (
    inputs: mfaAmrClaimsChildInputs<['mfaAmrClaims']>,
    options?: PlanOptions
  ) => Plan;
  mfaChallenges: (
    inputs: mfaChallengesChildInputs<['mfaChallenges']>,
    options?: PlanOptions
  ) => Plan;
  mfaFactors: (
    inputs: mfaFactorsChildInputs<['mfaFactors']>,
    options?: PlanOptions
  ) => Plan;
  storageMigrations: (
    inputs: storageMigrationsChildInputs<['storageMigrations']>,
    options?: PlanOptions
  ) => Plan;
  supabaseFunctionsMigrations: (
    inputs: supabaseFunctionsMigrationsChildInputs<
      ['supabaseFunctionsMigrations']
    >,
    options?: PlanOptions
  ) => Plan;
  objects: (
    inputs: objectsChildInputs<['objects']>,
    options?: PlanOptions
  ) => Plan;
  refreshTokens: (
    inputs: refreshTokensChildInputs<['refreshTokens']>,
    options?: PlanOptions
  ) => Plan;
  samlProviders: (
    inputs: samlProvidersChildInputs<['samlProviders']>,
    options?: PlanOptions
  ) => Plan;
  samlRelayStates: (
    inputs: samlRelayStatesChildInputs<['samlRelayStates']>,
    options?: PlanOptions
  ) => Plan;
  authSchemaMigrations: (
    inputs: authSchemaMigrationsChildInputs<['authSchemaMigrations']>,
    options?: PlanOptions
  ) => Plan;
  supabaseMigrationsSchemaMigrations: (
    inputs: supabaseMigrationsSchemaMigrationsChildInputs<
      ['supabaseMigrationsSchemaMigrations']
    >,
    options?: PlanOptions
  ) => Plan;
  secrets: (
    inputs: secretsChildInputs<['secrets']>,
    options?: PlanOptions
  ) => Plan;
  sessions: (
    inputs: sessionsChildInputs<['sessions']>,
    options?: PlanOptions
  ) => Plan;
  ssoDomains: (
    inputs: ssoDomainsChildInputs<['ssoDomains']>,
    options?: PlanOptions
  ) => Plan;
  ssoProviders: (
    inputs: ssoProvidersChildInputs<['ssoProviders']>,
    options?: PlanOptions
  ) => Plan;
  users: (inputs: usersChildInputs<['users']>, options?: PlanOptions) => Plan;
  $pipe: Pipe;
  $merge: Merge;
  $createStore: CreateStore;
};
type ScalarField = {
  name: string;
  type: string;
};
type ObjectField = ScalarField & {
  relationFromFields: string[];
  relationToFields: string[];
};
type Inflection = {
  modelName?: (name: string) => string;
  scalarField?: (field: ScalarField) => string;
  parentField?: (
    field: ObjectField,
    oppositeBaseNameMap: Record<string, string>
  ) => string;
  childField?: (
    field: ObjectField,
    oppositeField: ObjectField,
    oppositeBaseNameMap: Record<string, string>
  ) => string;
  oppositeBaseNameMap?: Record<string, string>;
};
type Override = {
  _http_response?: {
    name?: string;
    fields?: {
      id?: string;
      status_code?: string;
      content_type?: string;
      headers?: string;
      content?: string;
      timed_out?: string;
      error_msg?: string;
      created?: string;
    };
  };
  audit_log_entries?: {
    name?: string;
    fields?: {
      instance_id?: string;
      id?: string;
      payload?: string;
      created_at?: string;
      ip_address?: string;
    };
  };
  award?: {
    name?: string;
    fields?: {
      id?: string;
      givenAt?: string;
      description?: string;
      fromId?: string;
      toId?: string;
      hero_award_fromIdTohero?: string;
      hero_award_toIdTohero?: string;
    };
  };
  buckets?: {
    name?: string;
    fields?: {
      id?: string;
      name?: string;
      owner?: string;
      created_at?: string;
      updated_at?: string;
      public?: string;
      avif_autodetection?: string;
      file_size_limit?: string;
      allowed_mime_types?: string;
      users?: string;
      objects?: string;
    };
  };
  flow_state?: {
    name?: string;
    fields?: {
      id?: string;
      user_id?: string;
      auth_code?: string;
      code_challenge_method?: string;
      code_challenge?: string;
      provider_type?: string;
      provider_access_token?: string;
      provider_refresh_token?: string;
      created_at?: string;
      updated_at?: string;
      authentication_method?: string;
      saml_relay_states?: string;
    };
  };
  hero?: {
    name?: string;
    fields?: {
      id?: string;
      username?: string;
      name?: string;
      award_award_fromIdTohero?: string;
      award_award_toIdTohero?: string;
    };
  };
  hooks?: {
    name?: string;
    fields?: {
      id?: string;
      hook_table_id?: string;
      hook_name?: string;
      created_at?: string;
      request_id?: string;
    };
  };
  http_request_queue?: {
    name?: string;
    fields?: {
      id?: string;
      method?: string;
      url?: string;
      headers?: string;
      body?: string;
      timeout_milliseconds?: string;
    };
  };
  identities?: {
    name?: string;
    fields?: {
      id?: string;
      user_id?: string;
      identity_data?: string;
      provider?: string;
      last_sign_in_at?: string;
      created_at?: string;
      updated_at?: string;
      email?: string;
      users?: string;
    };
  };
  instances?: {
    name?: string;
    fields?: {
      id?: string;
      uuid?: string;
      raw_base_config?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
  key?: {
    name?: string;
    fields?: {
      id?: string;
      status?: string;
      created?: string;
      expires?: string;
      key_type?: string;
      key_id?: string;
      key_context?: string;
      name?: string;
      associated_data?: string;
      raw_key?: string;
      raw_key_nonce?: string;
      parent_key?: string;
      comment?: string;
      user_data?: string;
      key?: string;
      key?: string;
      secrets?: string;
    };
  };
  mfa_amr_claims?: {
    name?: string;
    fields?: {
      session_id?: string;
      created_at?: string;
      updated_at?: string;
      authentication_method?: string;
      id?: string;
      sessions?: string;
    };
  };
  mfa_challenges?: {
    name?: string;
    fields?: {
      id?: string;
      factor_id?: string;
      created_at?: string;
      verified_at?: string;
      ip_address?: string;
      mfa_factors?: string;
    };
  };
  mfa_factors?: {
    name?: string;
    fields?: {
      id?: string;
      user_id?: string;
      friendly_name?: string;
      factor_type?: string;
      status?: string;
      created_at?: string;
      updated_at?: string;
      secret?: string;
      users?: string;
      mfa_challenges?: string;
    };
  };
  storage_migrations?: {
    name?: string;
    fields?: {
      id?: string;
      name?: string;
      hash?: string;
      executed_at?: string;
    };
  };
  supabase_functions_migrations?: {
    name?: string;
    fields?: {
      version?: string;
      inserted_at?: string;
    };
  };
  objects?: {
    name?: string;
    fields?: {
      id?: string;
      bucket_id?: string;
      name?: string;
      owner?: string;
      created_at?: string;
      updated_at?: string;
      last_accessed_at?: string;
      metadata?: string;
      path_tokens?: string;
      version?: string;
      buckets?: string;
    };
  };
  refresh_tokens?: {
    name?: string;
    fields?: {
      instance_id?: string;
      id?: string;
      token?: string;
      user_id?: string;
      revoked?: string;
      created_at?: string;
      updated_at?: string;
      parent?: string;
      session_id?: string;
      sessions?: string;
    };
  };
  saml_providers?: {
    name?: string;
    fields?: {
      id?: string;
      sso_provider_id?: string;
      entity_id?: string;
      metadata_xml?: string;
      metadata_url?: string;
      attribute_mapping?: string;
      created_at?: string;
      updated_at?: string;
      sso_providers?: string;
    };
  };
  saml_relay_states?: {
    name?: string;
    fields?: {
      id?: string;
      sso_provider_id?: string;
      request_id?: string;
      for_email?: string;
      redirect_to?: string;
      from_ip_address?: string;
      created_at?: string;
      updated_at?: string;
      flow_state_id?: string;
      flow_state?: string;
      sso_providers?: string;
    };
  };
  auth_schema_migrations?: {
    name?: string;
    fields?: {
      version?: string;
    };
  };
  supabase_migrations_schema_migrations?: {
    name?: string;
    fields?: {
      version?: string;
      statements?: string;
      name?: string;
    };
  };
  secrets?: {
    name?: string;
    fields?: {
      id?: string;
      name?: string;
      description?: string;
      secret?: string;
      key_id?: string;
      nonce?: string;
      created_at?: string;
      updated_at?: string;
      key?: string;
    };
  };
  sessions?: {
    name?: string;
    fields?: {
      id?: string;
      user_id?: string;
      created_at?: string;
      updated_at?: string;
      factor_id?: string;
      aal?: string;
      not_after?: string;
      users?: string;
      mfa_amr_claims?: string;
      refresh_tokens?: string;
    };
  };
  sso_domains?: {
    name?: string;
    fields?: {
      id?: string;
      sso_provider_id?: string;
      domain?: string;
      created_at?: string;
      updated_at?: string;
      sso_providers?: string;
    };
  };
  sso_providers?: {
    name?: string;
    fields?: {
      id?: string;
      resource_id?: string;
      created_at?: string;
      updated_at?: string;
      saml_providers?: string;
      saml_relay_states?: string;
      sso_domains?: string;
    };
  };
  users?: {
    name?: string;
    fields?: {
      instance_id?: string;
      id?: string;
      aud?: string;
      role?: string;
      email?: string;
      encrypted_password?: string;
      email_confirmed_at?: string;
      invited_at?: string;
      confirmation_token?: string;
      confirmation_sent_at?: string;
      recovery_token?: string;
      recovery_sent_at?: string;
      email_change_token_new?: string;
      email_change?: string;
      email_change_sent_at?: string;
      last_sign_in_at?: string;
      raw_app_meta_data?: string;
      raw_user_meta_data?: string;
      is_super_admin?: string;
      created_at?: string;
      updated_at?: string;
      phone?: string;
      phone_confirmed_at?: string;
      phone_change?: string;
      phone_change_token?: string;
      phone_change_sent_at?: string;
      confirmed_at?: string;
      email_change_token_current?: string;
      email_change_confirm_status?: string;
      banned_until?: string;
      reauthentication_token?: string;
      reauthentication_sent_at?: string;
      is_sso_user?: string;
      deleted_at?: string;
      identities?: string;
      mfa_factors?: string;
      sessions?: string;
      buckets?: string;
    };
  };
};
export type Alias = {
  inflection?: Inflection | false;
  override?: Override;
};
