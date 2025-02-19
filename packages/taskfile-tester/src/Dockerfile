FROM catthehacker/ubuntu:act-latest

ARG TASK_VERSION=3.41.0
ARG ACT_VERSION=0.2.56

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    jq \
    unzip \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

# Install Task
RUN curl -sL https://taskfile.dev/install.sh | sh \
    && mv ./bin/task /usr/local/bin/

# Install act
RUN curl -sL "https://github.com/nektos/act/releases/download/v${ACT_VERSION}/act_Linux_x86_64.tar.gz" | tar xz \
    && mv act /usr/local/bin/act \
    && chmod +x /usr/local/bin/act

# Create .actrc
RUN --mount=type=bind <<EOT
--platform ubuntu-latest=ghcr.io/drengskapur/taskfile-tester:develop
--container-architecture linux/amd64
--env-file .env
-s GITHUB_TOKEN
--bind
--use-gitignore
EOT tee /root/.actrc

# Set environment variables
ENV SHELL=/bin/bash \
    TERM=xterm-256color \
    PATH="/usr/local/bin:${PATH}"

WORKDIR /workspace

# The container needs to be run with --privileged and -v /var/run/docker.sock:/var/run/docker.sock
ENTRYPOINT ["/usr/local/bin/act"]
