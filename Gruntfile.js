module.exports = function(grunt) {

	// Import the modules we need

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-open');

	/*
	 Grunt Configuration

	 connect: Sets up the server
	 typescript: Sets the source directory files and make it recursively search for any file ending in .ts
	 less: Parametrization for LESS compile
	 watch: 
	  scripts: Sets the taks for any changes in typescript to be compiled into js
	  styles: Sets the configuration for any changes un LESS to be compliled into CSS
	*/

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 8080,
					base: "./"
				}
			}
		},
		typescript: {
			base: {
				src: ['web/scripts/**/*.ts'],
				dest: 'js/main.js',
				options: {
					module: 'amd',
					target: 'es5'
				}
			}
		},
		less: {
			development: {
				files: {
					'css/main.css': 'web/less/main.less'
				}
			},
			production: {
				paths: ['css'],
				plugins: [
					new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']})
				],
				files: {
					'css/main.css': 'web/less/main.less'
				},
				options: {
				
				}
			}
		},
		watch: {
			scripts: {
				files: '**/*.ts',
				tasks: ['typescript']
			},
			styles: {
				files: '**/*.less',
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		},
		open: {
			dev: {
				path: 'http://localhost:8080/index.html'
			}
		}
	});

	grunt.registerTask('default', ['connect', 'open', 'watch']);
}