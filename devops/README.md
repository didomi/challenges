# DevOps challenge

This challenge is used by Didomi for evaluating candidates for DevOps positions.

The challenge is a chance for engineers at Didomi to see how you deploy architecture and organize a project.

## Deliverables

The expected deliverable is a project that includes the following:

- All the resources/configuration to be deployed
- Documentation and comments where appropriate

## Technical stack

For the purpose of this challenge you will use the following:

- [terraform](https://www.terraform.io/) for deploying the resources/infrastructure
- [serverless](https://www.serverless.com/) for deploying the lambda

It's up to you to decide how much infrastructure you would like to deploy via serverless.

## Expectations

Your code will be reviewed by multiple engineers at Didomi and will serve as the base for a discussion in interviews.  
We want to see how you approach working on a complete project and strongly recommend that you work on this challenge alone. We expect the code to be professionally structured, commented, and documented.

If anything is unclear, feel free to ask any questions that might help you understand the specifications or requirements better.

## Delivery

Your application can be sent to us as a GitHub repository or as a compressed archive containing all the deliverables.

# The challenge

The Preference Management Platform (PMP) team has decided on their architecture. They want to create an API using the following technologies:

- an [API Gateway](https://aws.amazon.com/api-gateway/)
- a [Postgresql Database](https://aws.amazon.com/rds/)
- a single [lambda](https://aws.amazon.com/lambda/) deployed with [serverless](https://www.serverless.com/). The lambda needs to make requests to a 3rd party public API. The Lambda also needs to fetch large amounts of data from S3.

The PMP team uses Gitlab runners for CI/CD and needs to be able to deploy their changes using the pipeline. Another problem the team is thinking about is how they can run their migrations inside the pipeline.

![Architecture](/devops/architecture/PMP%20Architecture.png)

## Product specification

To keep the challenge as brief as possible we advise you to focus strictly on defining resources. To focus efforts consider the following:

- We do not expect this stack to be deployed
- We do not expect any programmatic logic in the Lambda, please use a placeholder (eg. a mock handler that always returns 200)
- We do not expect a CI/CD process
- The actual code used in the Lambda to connect to the RDS is not in the scope of this challenge

The architecture will be deployed in a single AWS account. As a result, we will need the following resources to be present:

- A VPC with private subnets
- An IAM user for Gitlab to run the deployment for the lambda in the pipeline
- Policies for the Gitlab user with the minimal required permissions to run the deployment
- An API Gateway that will handle the incoming requests
- A lambda that would connect to the RDS, do some processing, and return a response
- An RDS database that can handle at scale concurrency for our deployed Lambda
- The configuration required to make requests go through a custom domain (Route53, ACM, etc.)
- Other resources that you think are appropriate to deploy this architecture at scale

## Review session

After receiving your code challenge, we organize a review session with you and a few engineers from Didomi. During the review session, we will:

- Ask you to share your screen and do a quick presentation of the infrastructure you would deploy
- Ask you general technical questions related to your project and the architecture
- Do an architecture exercise where you will sketch out an architecture (think about APIs, clients, queues, jobs, etc) using <http://draw.io/>, <http://miro.com/> or a similar tool of your choice
