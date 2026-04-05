require 'webrick'
server = WEBrick::HTTPServer.new(
  Port: 3000,
  DocumentRoot: File.expand_path(File.dirname(__FILE__))
)
trap('INT') { server.shutdown }
server.start
