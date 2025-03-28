#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdcPythonLambdaStack } from '../lib/cdc-python-lambda-stack';
import { LambdaStudyCloudfrontStack } from '../lib/lambda-study-cloudfront-stack';  

const app = new cdk.App();
new LambdaStudyCloudfrontStack(app, 'LambdaStudyCloudfrontStack', {});
new CdcPythonLambdaStack(app, 'CdcPythonLambdaStack', {});