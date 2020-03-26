#!/bin/bash

source /root/.bashrc

mkdir -p /cache

apache_updated="/cache/apache_updated"
if [ ! -f $apache_updated ]
then
	echo "apache config setting..."
	# replace apache's default config /var/www/html to /var/www/html/public
	sed -i -e "s/\/var\/www\/html/\/var\/www\/html\/public/g" /etc/apache2/sites-available/000-default.conf 
	# suppress the warning: Could not reliably determine the server's fully qualified domain name, using 192.168.80.2. Set the 'ServerName' directive globally 
	echo "ServerName localhost" >> /etc/apache2/apache2.conf
	touch $apache_updated
else
	echo "skipping apache config setting"
fi

composer_file=/var/www/html/composer.json
composer_checksum=`cksum $composer_file | awk '{print $1}'`
composer_dependencies="/cache/composer-$composer_checksum"

if [ ! -f $composer_dependencies ]
then
	echo "building backend..."
	cd /var/www/html
	composer update
	touch $composer_dependencies
else
	echo "skipping backend build"
fi


package_file=/var/www/html/frontend/package.json
package_checksum=`cksum $package_file | awk '{print $1}'`
package_dependencies="/cache/package-$package_checksum"

if [ ! -f $package_dependencies ]
then
	echo "building frontend..."
	cd /var/www/html/frontend
	npm i && npm run prod
	touch $package_dependencies
else
	echo "skipping frontend build"
fi


# restart apache, this would keep container terminating
apache2ctl stop && apache2ctl -D FOREGROUND
