FROM ruby:3.4

LABEL maintainer="Rafael Campos Nunes <rcamposnunes@outlook.com>"

RUN apt update
RUN apt install jekyll -y

WORKDIR $HOME/blog/
COPY . .

RUN bundle install

EXPOSE 4000
ENTRYPOINT ["make"]
