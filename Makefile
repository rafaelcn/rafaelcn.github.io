#
# The purpose of this makefile is to serve as an entrypoint to the docker file
# and also make the start of the server easier.
#

all:
	bundle exec jekyll serve

docker_build:
	docker build -t rafael-blog .

docker_run: docker_build
	docker run --network=host -v ./:/blog/ -it rafael-blog

docker_bare_run:
	docker run --network=host -v ./:/blog/ -it rafael-blog

