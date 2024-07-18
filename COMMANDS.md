 yarn workspace api run start:dev
 yarn web


# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 sudo docker-compose -f docker-compose.yml build

# Start prod in detached mode
sudo docker-compose -f docker-compose.yml up -d

 sudo docker exec -it <mycontainer> sh
 
 sudo docker container stop <mycontainer>

 sudo docker run -it 77d39076de8d sh

 sudo docker start -a 2aef27dea9b7