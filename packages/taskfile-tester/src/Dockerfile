FROM catthehacker/ubuntu:act-latest

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    jq \
    unzip \
    python3 \
    sudo \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://taskfile.dev/install.sh | sh \
    && mv ./bin/task /usr/local/bin/

RUN curl -sL "https://github.com/nektos/act/releases/download/v0.2.74/act_Linux_x86_64.tar.gz" | \
    tar xz -C /usr/local/bin act

# Create a non-root user with the same UID/GID as the host user
RUN groupadd -g 1000 runner && \
    useradd -u 1000 -g runner -m runner && \
    chown -R runner:runner /home/runner && \
    echo "runner ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Configure act for non-root user
RUN mkdir -p /home/runner/.config/act && \
    <<EOF cat > /home/runner/.config/act/actrc
-P ubuntu-latest=catthehacker/ubuntu:act-latest
-P ubuntu-22.04=catthehacker/ubuntu:act-22.04
-P ubuntu-20.04=catthehacker/ubuntu:act-20.04
-P ubuntu-18.04=catthehacker/ubuntu:act-18.04
--bind
--env RUNNER_TOOL_CACHE=/tmp/tools
EOF

# Set environment variables
ENV SHELL=/bin/bash \
    TERM=xterm-256color \
    PATH="/usr/local/bin:${PATH}" \
    DEBIAN_FRONTEND=noninteractive

# Set ownership of act config
RUN chown -R runner:runner /home/runner/.config

WORKDIR /workspace

USER runner

ENTRYPOINT ["act"]
