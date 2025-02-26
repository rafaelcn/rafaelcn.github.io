#
# The purpose of this makefile is to serve as an entrypoint to the docker file
# and also make the start of the server easier.
#

IMAGE_NAME=rafaelcn.github.io

all:
	bundle exec jekyll serve

docker-build:
	docker build -t $(IMAGE_NAME) .

docker-run: docker-build
	docker run --network=host -v ./:/blog/ -it $(IMAGE_NAME) 
