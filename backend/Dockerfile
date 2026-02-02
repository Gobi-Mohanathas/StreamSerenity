FROM php:8.2-apache

# Install PostgreSQL PDO driver
RUN docker-php-ext-install pdo_pgsql

# Enable Apache rewrite
RUN a2enmod rewrite

# Set document root to /public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf

# Copy application
COPY . /var/www/html/

EXPOSE 80

