var Widget = new require('hud-widget')
  , widget = new Widget()
  , getSpreadsheet = require('./lib/get-spreadsheet')
  , processSpreadsheet = require('./lib/process-spreadsheet')

widget.get('/', function (req, res) {
  getSpreadsheet(function (error, spreadsheet) {
    if (error) {
      console.error(error)
      return res.send(500, { error: error })
    }

    res.render('index', { targets: processSpreadsheet(spreadsheet) })
  })
})
