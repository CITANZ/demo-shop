# FROM node:12.16.1:alpine AS frontend-builder
# WORKDIR /build/frontend
# RUN mkdir -p /build/app/client/dist
# COPY ../frontend .
# RUN npm i && npm run prod

FROM brettt89/silverstripe-web:7.2-debian-stretch

# install composer and nvm
RUN curl -sS https://getcomposer.org/installer | php \
        && mv composer.phar /usr/local/bin/ \
        && ln -s /usr/local/bin/composer.phar /usr/local/bin/composer \ 
        && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash \ 
        && export NVM_DIR="$HOME/.nvm" \ 
        && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
        && nvm install 12.16.1 

# install some tools, just add here 
RUN apt-get update && \ 
        apt-get -y install vim && \ 
        apt-get -y install lsof

COPY start.sh /var/tmp

RUN chmod +x /var/tmp/start.sh