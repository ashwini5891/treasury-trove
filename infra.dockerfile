FROM mcr.microsoft.com/azure-cli:cbl-mariner2.0

# Install terraform using yum
RUN yum install -y yum-utils \
    && yum -y install unzip

RUN curl -L https://releases.hashicorp.com/terraform/1.12.2/terraform_1.12.2_linux_386.zip -o /tmp/terraform.zip \
    && unzip /tmp/terraform.zip -d /usr/local/bin \
    && rm -f /tmp/terraform.zip
