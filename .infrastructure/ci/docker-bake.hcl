variable "REGISTRY" {
  default = "ghcr.io"
}

variable "OWNER" {
  default = "drengskapur"
}

variable "IMAGE" {
  default = "taskfile-tester"
}

variable "TAG" {
  default = "develop"
}

target "docker-metadata-action" {}

target "build" {
  context = "."
  dockerfile = ".infrastructure/ci/Dockerfile"
  tags = ["${REGISTRY}/${OWNER}/${IMAGE}:${TAG}"]
  platforms = ["linux/amd64"]
  cache-from = ["type=registry,ref=${REGISTRY}/${OWNER}/${IMAGE}-cache"]
  cache-to = ["type=registry,ref=${REGISTRY}/${OWNER}/${IMAGE}-cache,mode=max"]
}

group "default" {
  targets = ["build"]
}
