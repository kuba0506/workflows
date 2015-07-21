$ = require 'jquery'

do fill = (item = 'The most creative minds in Poland') ->
  $('.tagline').append "#{item}"
fill