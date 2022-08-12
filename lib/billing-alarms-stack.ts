import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BillingAlarm } from 'aws-cdk-billing-alarm';

export class BillingAlarmsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create an alarm that emails `admin@example.com`
    // if estimated charges exceed 50 USD
    new BillingAlarm(this, 'AWSAccountBillingAlarm', {
      monthlyThreshold: 50,
      emails: ['aphexlog@gmail.com']
    });
  }
}