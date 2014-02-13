
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , _ = require('lodash')
  , getSpreadsheet = require('./lib/get-spreadsheet')
  , processSpreadsheet = require('./lib/process-spreadsheet')
  , app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

// getSpreadsheet(function (error, spreadsheet) {
//   console.log(processSpreadsheet(spreadsheet))
// })

app.get('/', function (req, res) {
  getSpreadsheet(function (error, spreadsheet) {
    if (error) {
      console.error(error)
      return res.send(500, { error: error })
    }

    res.render('index', { targets: processSpreadsheet(spreadsheet) })
  })
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
