#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BillingAlarmsStack } from '../lib/billing-alarms-stack';

const app = new cdk.App();
new BillingAlarmsStack(app, 'BillingAlarmsStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  }
});