var fs = require('fs')
var mocha = require('mocha')
var should = require('should')

var zonefile = require('../lib/zonefile')

var data = fs.readFileSync(__dirname+'/testzone','utf-8')

describe('Zonefile',function(){

	describe('method parse zone',function(){
		it('should return the zonefile in a structured format',function(done){
			var zone = zonefile.parseZone(data)
				zone.ttl.should.equal(86400)
				zone.records.length.should.equal(9)
				//console.log(zone)
				done()
		})
	})
	
	describe('method parse ttl',function(){
		it('should extract the ttl value if it exits',function(done){
				var line = '$TTL 86400'
				var ttl = zonefile.parseTTL(line)
				ttl.should.equal(86400)
				done()
		})
	})
	describe('method pares line',function(){
		it('should extract A recods',function(done){
			var line = 'test                   IN A       127.0.0.1'
			var record = zonefile.parseLine(line)		
			record.name.should.equal('test')
			record.type.should.equal('A')
			record.data.should.equal('127.0.0.1')
			done()
		})
		it('should extract MX records with priorities',function(done){
			var line = '@                        IN MX 10   www'
			var record = zonefile.parseLine(line)
			record.name.should.equal('@')
			record.type.should.equal('MX')
			record.data.should.equal('www')
			record.priority.should.equal(10)
			done()
		})
		
	})

})