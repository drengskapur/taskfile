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

variable "TASK_VERSION" {
  default = "3.41.0"
}

variable "ACT_VERSION" {
  default = "0.2.56"
}

target "docker-metadata-action" {}

target "build" {
  context = "../.."
  dockerfile = "packages/taskfile-tester/src/Dockerfile"
  tags = ["${REGISTRY}/${OWNER}/${IMAGE}:${TAG}"]
  platforms = ["linux/amd64"]
  cache-from = ["type=registry,ref=${REGISTRY}/${OWNER}/${IMAGE}-cache"]
  cache-to = ["type=registry,ref=${REGISTRY}/${OWNER}/${IMAGE}-cache,mode=max"]
  args = {
    TASK_VERSION = "${TASK_VERSION}"
    ACT_VERSION = "${ACT_VERSION}"
  }
}

target "act-runner" {
  inherits = ["build"]
  tags = ["taskfile-act:latest"]
  cache-from = ["type=local,src=/tmp/.buildx-cache"]
  cache-to = ["type=local,dest=/tmp/.buildx-cache"]
}

target "act-runner-dev" {
  inherits = ["act-runner"]
  tags = ["taskfile-act:dev"]
}

group "default" {
  targets = ["build"]
}

group "act" {
  targets = ["act-runner"]
}

group "dev" {
  targets = ["act-runner-dev"]
}
