FUNCTION=mercury-users-getuserdetails

build-m1-mac:
	docker build -t mercury-portal:1.0.0 . --platform=linux/amd64
.PHONY:build-m1-mac

build:
	docker build -t mercury-portal:1.0.0 .
.PHONY:build

terraform:
	terraform -chdir=infrastructure/terraform init
	terraform -chdir=infrastructure/terraform apply 
.PHONY:terraform

switch-function-origin-to-local:
	aws lambda update-function-configuration --function-name test-$(FUNCTION) --environment=Variables='{environment=test,origin=http://localhost:3000}'
.PHONY:switch-function-origin-to-local

switch-function-origin-to-test:
	aws lambda update-function-configuration --function-name test-$(FUNCTION) --environment=Variables='{environment=test,origin=https://test.dgvy6ac45v29n.amplifyapp.com}'
.PHONY:switch-function-origin-to-test
