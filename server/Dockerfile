FROM php:8.1-apache
COPY --from=composer:2.8.12 /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

RUN apt-get update \
  && apt-get install -y libpq-dev p7zip git \
  && docker-php-ext-configure pgsql --with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pgsql pdo pdo_pgsql

RUN a2enmod rewrite
COPY composer.json .
RUN composer install

COPY .env .
COPY src/ .
EXPOSE 80