FROM brettt89/silverstripe-web:7.2-debian-stretch

ARG WORKING_DIR

WORKDIR $WORKING_DIR

# install some tools, just add here 
RUN apt-get update && apt-get install vim

# install composer
RUN curl -sS https://getcomposer.org/installer | php \
        && mv composer.phar /usr/local/bin/ \
        && ln -s /usr/local/bin/composer.phar /usr/local/bin/composer
