FROM brettt89/silverstripe-web:7.2-debian-stretch

# install composer
RUN curl -sS https://getcomposer.org/installer | php \
        && mv composer.phar /usr/local/bin/ \
        && ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

# install some tools, just add here 
RUN apt-get update && \ 
        apt-get -y install vim && \ 
        apt-get -y install lsof

COPY start.sh /var/tmp

RUN chmod +x /var/tmp/start.sh