WDIR = File.dirname __FILE__

namespace :build do
	task :all => [:clear, :init, :chrome, :firefox_3x]

	task :init do
		FileUtils.mkdir_p "#{WDIR}/tmp/chrome"
		FileUtils.mkdir_p "#{WDIR}/tmp/firefox_3x/habralinguist"
	end

	task :chrome do
		['images', 'lib', 'src'].each do |obj|
			FileUtils.cp_r "#{WDIR}/#{obj}", "#{WDIR}/tmp/chrome/#{obj}"
		end

		FileUtils.rm_f "#{WDIR}/tmp/chrome/images/logo_big.png"

		['manifest.json', 'background.html'].each do |obj|
			FileUtils.cp "#{WDIR}/browser/chrome/#{obj}", "#{WDIR}/tmp/chrome/#{obj}"
		end

		FileUtils.cp_r "#{WDIR}/browser/chrome/src", "#{WDIR}/tmp/chrome"
	end

	task :firefox_3x do
		ext_dir = "tmp/firefox_3x/habralinguist/chrome/content"

		Dir["#{WDIR}/browser/firefox_3x/*"].each do |obj|
			FileUtils.cp_r obj, "#{WDIR}/tmp/firefox_3x/habralinguist"
		end

		['images', 'lib'].each do |obj|
			FileUtils.cp_r "#{WDIR}/#{obj}", "#{WDIR}/#{ext_dir}/#{obj}"
		end

		Dir["#{WDIR}/src/*.*"].each do |obj|
			FileUtils.cp obj, "#{WDIR}/#{ext_dir}/src"
		end
	end

	task :clear do
		FileUtils.rm_rf "#{WDIR}/tmp"
	end

end

namespace :pack do
	task :all => [:clear, :init, :firefox_3x, :chrome]

	task :init do
		FileUtils.mkdir_p "#{WDIR}/bin/chrome"
		FileUtils.mkdir_p "#{WDIR}/bin/firefox_3x"
	end

	task :chrome do
		system "chromium-browser --pack-extension=#{WDIR}/tmp/chrome --pack-extension-key=#{WDIR}/browser/chrome/chrome.pem --no-message-box"
		FileUtils.cp "#{WDIR}/tmp/chrome.crx", "#{WDIR}/bin/chrome"
	end

	task :firefox_3x do
		FileUtils.cd "#{WDIR}/tmp/firefox_3x/habralinguist/"
		system "zip -qr habralinguist.xpi ./"
		FileUtils.cd WDIR

		FileUtils.cp "#{WDIR}/tmp/firefox_3x/habralinguist/habralinguist.xpi", "#{WDIR}/bin/firefox_3x"
	end

	task :clear do
		FileUtils.rm_rf "#{WDIR}/bin"
	end
end