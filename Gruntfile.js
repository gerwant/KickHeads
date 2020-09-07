module.exports = function(grunt){

	grunt.initConfig({
		
		connect: {
			server : {
				options : {
					port : 9090,
                    keepalive : true,
                    base: '.'
				}
			},
			keepalive : true
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
};