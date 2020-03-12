FROM node:8.11.2

WORKDIR /usr/src/nanosbackend

COPY ./ ./

RUN npm install


CMD ["/bin/bash"]