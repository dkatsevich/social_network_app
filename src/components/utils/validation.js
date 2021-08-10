const mustRequire = value => (value ? undefined : 'It is required');

const maxLengthCreator = max => value =>
    (value && value.length > max ? `String must be less than ${max} symbols` : undefined)


export {
    mustRequire,
    maxLengthCreator,
}