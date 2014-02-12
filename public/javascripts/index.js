(function () {
  var twoPi = 2 * Math.PI
    , $data = $('.quarterTarget-countdown')
    , width = $data.width()
    , height = $data.height()
    , target = $data.attr('data-target')
    , earnt = $data.attr('data-earnt')

  var percent = earnt / target
    , radianAngle = -((twoPi * percent))

  var extraClass = percent < 1 ? 'foreground--warning' : 'foreground--good'

  var arcBackground = d3.svg.arc().startAngle(0).innerRadius((height * 0.95) * 0.38).outerRadius((height * 0.95) * 0.46)
    , arcForeground = d3.svg.arc().startAngle(0).innerRadius((height * 0.95) * 0.35).outerRadius((height * 0.95) * 0.48)
    , svg = d3.select('.quarterTarget-countdown').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  var meter = svg.append('g').attr('class', 'progress-meter')
  meter.append('path').attr('class', 'background').attr('d', arcBackground.endAngle(twoPi))

  var $progress = meter.append('path').attr('class', 'foreground '+ extraClass)

  console.log(percent, radianAngle)

  $progress.attr('d', arcForeground.endAngle(radianAngle))

})()

