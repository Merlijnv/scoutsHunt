FROM ubuntu:latest

RUN apt update

RUN apt -y install wget

RUN apt -y install unzip

RUN mkdir android-sdk

RUN wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip

RUN unzip sdk-tools-linux-4333796.zip -d /android-sdk/

ENV ANDROID_HOME /android-sdk/

RUN apt -y install openjdk-8-jdk

ENV JAVA_HOME /usr/lib/jvm/java-1.8.0-openjdk-amd64

RUN ./android-sdk/tools/bin/sdkmanager --update

RUN yes | ./android-sdk/tools/bin/sdkmanager --licenses

RUN apt -y install nodejs

RUN apt -y install npm

RUN npm install -g cordova ionic

RUN apt -y install gradle

RUN ./android-sdk/tools/bin/sdkmanager "build-tools;25.0.2"
