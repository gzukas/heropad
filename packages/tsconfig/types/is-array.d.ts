type NotAny<T> = 0 extends 1 & T ? never : T;

interface ArrayConstructor {
  isArray<T>(arg: NotAny<T>): arg is Extract<NotAny<T>, readonly unknown[]>;
}
