const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const iltorb = require("iltorb");
const glob = require("glob");

exports.onPostBuild = () =>
	new Promise((resolve, reject) => {
		if (process.env.NODE_ENV === "production") {
			try {
				const publicPath = path.join(__dirname, "public");
				const gzippable = glob.sync(
					`${publicPath}/**/?(*.html|*.js|*.css|*.svg)`
				);
				gzippable.forEach((file) => {
					const content = fs.readFileSync(file);
					const zipped = zlib.gzipSync(content);
					fs.writeFileSync(`${file}.gz`, zipped);

					const brotlied = iltorb.compressSync(content);
					fs.writeFileSync(`${file}.br`, brotlied);
				});
			} catch (e) {
				reject(new Error("onPostBuild: Could not compress the files"));
			}
		}

		resolve();
	});
