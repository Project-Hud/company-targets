module.exports = processSpreadsheet

var _ = require('lodash')
  , numAbbr = require('number-abbreviate')

function processSpreadsheet(rows) {
  var spreadsheetData = { target: 0, earnt: 0, quarters: [] }
    , quarterRows = _.compact(Object.keys(rows).map(function (row) {
        if (typeof rows[row]['1'] !== 'undefined') return rows[row]
      }))

  quarterRows.forEach(function (row) {
    row['2'] = normalizeInt(row['2'])
    row['3'] = normalizeInt(row['3'])
    row['4'] = normalizeBoolean(row['4'])

    spreadsheetData.quarters.push(
      { title: row['1']
      , target: numAbbr(row['2'], 2)
      , earnt: numAbbr(row['3'], 2)
      , met: row['3'] >= row['2']
      , passed: row['4']
      })

    spreadsheetData.target += parseInt(row['2'])
    spreadsheetData.earnt += parseInt(row['3'])
  })

  spreadsheetData.formatTarget = numAbbr(spreadsheetData.target, 2)
  spreadsheetData.formatEarnt = numAbbr(spreadsheetData.earnt, 2)

  spreadsheetData.formatTargetInt = spreadsheetData.target
  spreadsheetData.formatEarntInt = spreadsheetData.earnt

  return spreadsheetData
}

function normalizeInt(integer) {
  if (isNaN(parseInt(integer, 10))) {
    integer = 0
  }
  return integer
}

function normalizeBoolean(boolean) {
  return boolean === '1' ? true : false
}
