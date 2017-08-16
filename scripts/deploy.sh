printf "\n\n----- running deployment -----\n"

# empty the folder
rm -rf ./dist/*

mkdir ./dist
mkdir ./dist/css
mkdir ./dist/js

printf "\n\n - run deploy:js -\n"
# run js minification / webpack
npm run deploy:js

# run stylus compressed.
printf "\n\n - run stylus/css -\n"
npm run dev:stylus
npm run deploy:css


# ------ 
printf "\n\n - copying assets/files -\n"
# copy files not needed to be built over: 
# this should just be everything that isn't js/css:
#

cp -r ./public/favicon.ico ./dist/favicon.ico

# Assets:
cp -r ./public/imgs ./dist/imgs
cp -r ./public/fonts ./dist/fonts
cp -r ./public/svgs ./dist/svgs
cp -r ./public/tracking-libs ./dist/tracking-libs

printf "\nDONE\n"
