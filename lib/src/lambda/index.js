'use strict'

exports.handler = function (event, context, callback) {
    console.log(JSON.stringify(`Event: event`))
    context.succeed('Success!')
    context.fail('Failed!')
}