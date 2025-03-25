import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
import path = require('path');
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
const REPOSITORY_TOP = path.resolve(__dirname,"../");
import * as dotenv from 'dotenv';
dotenv.config();
console.log("#####",process.env.OPEN_API_KEY);
export class CdcPythonLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    console.log("#####",process.env.OPEN_API_KEY);
    const lambdaFunction = new PythonFunction(this, 'PythonLambda', {
      entry: path.join(REPOSITORY_TOP, 'lambdas/color_agent/color_agent'),
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_13,
      handler: 'lambda_handler',
      index: 'handler.py',
      functionName: 'ColorAgentPythonLambda',
      timeout: cdk.Duration.seconds(20), // ★ ここを追加または変更
      environment: {
        OPEN_API_KEY: process.env.OPEN_API_KEY||""
      },
    });

    const api = new apigateway.RestApi(this, 'Api', {
      restApiName: 'ColorAgentApi',
      description: 'ColorAgentApi',
    });

    const integration = new LambdaIntegration(lambdaFunction);
    const resource = api.root.addResource('color');
    resource.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      maxAge: cdk.Duration.days(1),
    });
    resource.addMethod('POST', integration);
  }
}
