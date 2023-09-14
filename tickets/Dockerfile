FROM node:alpine

WORKDIR /app

# Install these packages on HOST MACHINE!
# To handle dependency installations
# RUN sudo apt-get install gdebi-core -y

# Download libssl1.1
# RUN wget http://ftp.us.debian.org/debian/pool/main/o/openssl/libssl1.1_1.1.1n-0+deb11u4_amd64.deb

# Install libssl1.1
# RUN sudo gdebi --non-interactive libssl1.1_1.1.1n-0+deb11u4_amd64.deb

COPY package.json .

# Use (--omit=dev)
# To skip this step in development and only excute in production
RUN npm install

COPY . .

CMD [ "npm", "start" ]