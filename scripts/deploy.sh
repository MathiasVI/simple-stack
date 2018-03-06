printf "\n\n----- running deployment -----\n"

# empty the folder
rm -rf ./dist/*

mkdir ./dist

printf "\n\n - run deploy:js -\n"
# run parcel compiles and compresses js/css.
npm run build:parcel


# ------ 
printf "\n\n - copying assets/files -\n"
# copy files not needed to be built over: 
# this should just be everything that isn't js/css:
#

cp -r ./assets/favicon.ico ./dist/favicon.ico

# Assets:
cp -r ./assets/imgs ./dist/imgs
cp -r ./assets/fonts ./dist/fonts
cp -r ./assets/svgs ./dist/svgs

printf "\nDONE\n"
