#!/bin/env bash
FILENAME=".env"
if test -f "$FILENAME"; then
   rm $FILENAME
fi

touch $FILENAME

echo DB_HOST=sql11.freemysqlhosting.net >> $FILENAME
echo DB_DBNAME=sql11504331 >> $FILENAME
echo DB_USER=sql11504331 >> $FILENAME
echo DB_PASSWORD=UeGXmq83jn >> $FILENAME
echo TOKEN_EXPIRATION_TIME=10 >> $FILENAME
echo SECRET_KEY=helloworld >> $FILENAME
echo NODE_ENV=production >> $FILENAME
echo PORT=4000 >> $FILENAME