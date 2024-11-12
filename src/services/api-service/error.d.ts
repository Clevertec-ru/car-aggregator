interface ErrorConstructor {
  captureStackTrace?: (targetObject: object, constructorOpt?: typeof Object.constructor) => void
}
