

.PHONY: build
build:
	# kubectl create -f ./watchpod.yaml
	docker build -t message-server:v1 ./messageServer
	docker build -t user-server:v1 ./userServer
	docker build -t socket-server:v1 ./socketServer
	docker build -t static-server:v1 ./client
	kubectl create -f ./messenger.yaml

.PHONY: delete
delete:
	kubectl delete deployment my-deployment
	kubectl delete service my-service

.PHONY: message
message:
	docker build -t message-server:v1 ./messageServer
	kubectl set image deployment/my-deployment message-server=message-server:v1

.PHONY: user
user:
	docker build -t user-server:v1 ./userServer
	kubectl set image deployment/my-deployment user-server=user-server:v1

.PHONY: socket
socket:
	docker build -t socket-server:v1 ./socketServer
	kubectl set image deployment/my-deployment socket-server=socket-server:v1

.PHONY: static
static:
	docker build -t static-server:v1 ./client
	kubectl set image deployment/my-deployment static-server=static-server:v1
