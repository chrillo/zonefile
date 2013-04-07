What it does
============

pares a DNS zonefile and returns a object with an array of records and the ttl. SOA parsing does not yet work



Usage
=====

	var zonefile = require('zonefile')
	var zonedata = '@ IN A 127.0.0.1' // can be a line or a whole zonefile
	var zone = zonefile.parseZone(zonedata)	

	// other methods

	var record = zonefile.paresLine(zonedata)

		{
		name:'@',
		type:'A',
		ttl:null,
		data:'127.0.0.1',
		priority:priority // only set if its an MX record	
		}

Test
====

	npm test


