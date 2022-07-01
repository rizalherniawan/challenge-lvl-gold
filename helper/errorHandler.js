module.exports = (error) => {
    let err = {}
    if(error.status) {
        err['message'] = error.message
    } else if(error.name === 'SequelizeUniqueConstraintError') {
        const paths = error.errors.map(e => {return `${e.path} already existed`})
        err['message'] = paths
    } else if(error.name === 'SequelizeValidationError') {
        const msg = error.errors.map(e => e.message)
        err['message'] = msg
    } else {
        return false
    }
    return err['message']
}