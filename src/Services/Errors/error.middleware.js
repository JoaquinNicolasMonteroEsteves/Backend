import EErrors from './error-enum.js'

export default (error, req, res, next) => {
  switch (error.code) {
    case EErrors.INVALID_TYPE_ERROR:
      res.status(400).send({ status: 'Error', error: error.message })
      break
    case EErrors.INVALID_CREDENTIALS:
      res.status(401).send({ status: 'Error', error: error.message })
      break

    case EErrors.NOT_FOUND:
      res.status(404).send({ status: 'Error', error: error.message })
      break

    default:
      res.status(500).send({ status: 'Error', error: 'Unhandled error!'})
  }
}