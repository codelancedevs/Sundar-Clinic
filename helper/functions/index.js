'use strict'

exports.requestErrorHandler = function (error){
    const err = error?.response ? error?.response?.data : error;
    return err;
}