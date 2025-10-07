````
docker --no-cache build -t yourdockerusername/youvie_server -f ./movie-app-server/Dockerfile ./movie-app-server

docker push yourdockerusername/youvie_server

docker --no-cache build -t yourdockerusername/youvie_client -f ./movie-app-client/Dockerfile ./movie-app-client

docker push yourdockerusername/youvie_client 
````