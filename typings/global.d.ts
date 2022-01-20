declare interface PlainObject {
  [propName: string]: unknown;
}

declare interface BooleanObject {
  [propName: string]: boolean;
}

declare interface StringObject {
  [propName: string]: string;
}

declare type Modify<T, R> = Omit<T, keyof R> & R;

declare interface NumberObject {
  [propName: string]: number;
}
declare type DeepMergeTwoTypes<A, B> = A | B extends Record<string, unknown>
  ? Partial<Omit<A, keyof B>> &
      Partial<Omit<B, keyof A>> & {
        [key in keyof (A | B)]: DeepMergeTwoTypes<A[key], B[key]>;
      }
  : A | B;

declare type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
declare type MixProps<P> = P & { className?: string };

declare interface TypedError<T = any> extends Error {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  response: any;
}

declare interface TypedResponse<T = any> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  data: any;
  statusText: string;
  json<P = T>(): Promise<P>;
}

declare interface TypedError<T = any> extends Error {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  response: any;
}
