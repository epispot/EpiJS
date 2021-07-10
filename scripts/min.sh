browserify EpiJS --s EpiJS -o web/index.js
cd web
cat funcs.js >> index.js
cd ..
terser ./web/index.js --keep-classnames --keep-fnames --compress -o ./web/index.min.js # Minify Browserify Output
rm -rf ./web/index.js # Force remove output