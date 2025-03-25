#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdcPythonLambdaStack } from '../lib/cdc-python-lambda-stack';

const app = new cdk.App();
new CdcPythonLambdaStack(app, 'CdcPythonLambdaStack', {});