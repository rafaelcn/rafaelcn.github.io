FROM ruby:2.5

LABEL maintainer Rafael C. Nunes <rcamposnunes@outlook.com>

RUN apt update
RUN apt install jekyll -y

WORKDIR $HOME/blog/
COPY . .

RUN bundle install

EXPOSE 4000
ENTRYPOINT ["make"]
