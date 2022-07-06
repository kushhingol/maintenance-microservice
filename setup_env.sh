#!/bin/env bash
FILENAME=".env"
if test -f "$FILENAME"; then
   rm $FILENAME
fi

touch $FILENAME

## need to use secret manager here so avoided adding env vars value
## Do contact the author for env variable values
echo DB_HOST= >> $FILENAME
echo DB_DBNAME= >> $FILENAME
echo DB_USER= >> $FILENAME
echo DB_PASSWORD= >> $FILENAME
echo TOKEN_EXPIRATION_TIME=10 >> $FILENAME
echo SECRET_KEY= >> $FILENAME
echo NODE_ENV=production >> $FILENAME
echo PORT=4000 >> $FILENAME