

var RECORD_TYPES = ['A', 'AAAA', 'NS', 'MX', 'CNAME', 'PTR', 'TXT']

function parseZone(data){
	zone = {
		records:[]
	}

	data.split('\n').forEach(function(line){
		if(!zone.ttl){
			zone.ttl = parseTTL(line)
		}

		var record = parseLine(line)
		if(record){
			zone.records.push(record)
		}
	})
	return zone
}

function parseTTL(line){

	if (line.match(/^\$TTL?\s+(.*)$/i)) {
         return parseInt( line.match(/^\$TTL?\s+(.*)$/i)[1] );
    }
}

function parseLine(line){

	var chunks = line.split(' ')
	var name =  chunks[0]

	if(!name) return null

	var ttl = null
	for(var c in chunks){
		if(c>0){
			var reg = /^\d+$/;
			if(chunks[c]!='' && reg.test(chunks[c])){
				ttl = parseInt(chunks[c])
			}
		}
	}
	var type = null

	var re = /.(IN CNAME|IN A|IN AAAA|IN NS|IN AAAA|IN TXT|IN MX|IN PTR)./i;
	var typeinfo = line.match(re);


	// unsupported type
	if(!typeinfo) return null
	var type = typeinfo[1].split(' ')[1]
	var index = line.indexOf("IN "+type)+('IN '+type).length

	var data = line.substr(index)

	var priority = null
		if(type=='MX'){
			var datachunks = data.split(' ')
			data =''
			datachunks.forEach(function(chunk){
				if(chunk && parseInt(chunk)>0 && !priority){
					priority = parseInt(chunk)
				}else{
					if(chunk!=''){
						data+=chunk
					}
				}
			})
		}else{
			data = data.replace(/\s+/g, '');
		}

	var record = {
		name:name,
		type:type,
		value:data,
		ttl:ttl,
		priority:priority
	}
	return record
}


module.exports = {
	parseZone:parseZone,
	parseLine:parseLine,
	parseTTL:parseTTL
}