FROM ubuntu:18.04

RUN apt-get update \
  && apt-get -y install --no-install-recommends \
    sox \
    nodejs 

RUN apt install curl -y

RUN apt install npm -y

RUN npm config set strict-ssl false

RUN npm install n -g

RUN n stable

RUN apt purge -y nodejs npm
#RUN node -v

#RUN npm install discord.js@12.0 node-opus opusscript

WORKDIR /

ENV PYTHONIOENCODING utf-8 

RUN apt-get install software-properties-common -y

RUN add-apt-repository ppa:longsleep/golang-backports 
RUN apt update 
RUN apt install golang -y

RUN export GOBIN=/bin
RUN go install github.com/jiro4989/ojosama/cmd/ojosama@v0.7.0
#RUN find / -name ojosama
RUN /root/go/bin/ojosama -t パクパクです

COPY ./package.json .
RUN npm install 

CMD ["node","src/main.js"]

