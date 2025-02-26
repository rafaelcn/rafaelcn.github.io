FROM ruby:3.4

LABEL maintainer="Rafael Campos Nunes <rcamposnunes@outlook.com>"

RUN apt update
RUN apt install jekyll -y

WORKDIR /blog
COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

#
# Look in the makefile to see how to appropriately run this image 
#

ENTRYPOINT ["make"]
