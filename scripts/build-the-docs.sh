jsdoc=$KERMA_VIEW_ROOT/node_modules/.bin/jsdoc

if [ ! -f $jsdoc ]; then
  printf "\e[1m\e[31merror:\e[0m jsdoc not found. Please run \`npm install\` first\n"
  exit
fi

$jsdoc --debug -c $KERMA_VIEW_ROOT/conf.json -d $KERMA_VIEW_ROOT/docs/dev