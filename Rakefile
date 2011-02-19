WDIR = File.dirname __FILE__

namespace :build do
	task :all => [:init, :chrome]

	task :init do
		FileUtils.mkdir_p "#{WDIR}/tmp/chrome"

		['images', 'lib', 'src'].each do |obj|
			FileUtils.cp_r "#{WDIR}/#{obj}", "#{WDIR}/tmp/chrome/#{obj}"
		end

		FileUtils.rm_f "#{WDIR}/tmp/chrome/images/logo_big.png"
	end

	task :chrome do

		['manifest.json', 'background.html'].each do |obj|
			FileUtils.cp "#{WDIR}/browser/chrome/#{obj}", "#{WDIR}/tmp/chrome/#{obj}"
		end

		FileUtils.cp_r "#{WDIR}/browser/chrome/src", "#{WDIR}/tmp/chrome"
	end

	task :clear do
		FileUtils.rm_rf "#{WDIR}/tmp"
	end

end