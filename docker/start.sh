#!/bin/bash

initialised="/tmp/initialised"
if [ ! -f $initialised ]
	echo "init..."
	# replace apache's default config /var/www/html to /var/www/html/public
	sed -i -e "s/\/var\/www\/html/\/var\/www\/html\/public/g" /etc/apache2/sites-available/000-default.conf 
	# suppress the warning: Could not reliably determine the server's fully qualified domain name, using 192.168.80.2. Set the 'ServerName' directive globally 
	echo "ServerName localhost" >> /etc/apache2/apache2.conf
	touch $initialised
then
	echo "skipping init"
fi

# this is a signal whether composer update has been done
file="/tmp/composer-updated"

if [ ! -f $file ]
	echo "doing composer update..."
	cd /var/www/html
	composer update
	touch $file
then
	echo "skipping composer update"
fi


# restart apache, this would keep container terminating
apache2ctl stop && apache2ctl -D FOREGROUND
