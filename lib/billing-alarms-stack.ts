import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { BillingAlarm } from 'aws-cdk-billing-alarm';
import { Alarm, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Topic, Subscription, SubscriptionProtocol } from 'aws-cdk-lib/aws-sns';

import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class BillingAlarmsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const alarm = new Alarm(this, 'AWSAccountBillingAlarm', {
      metric: new Metric({
        namespace: 'AWS/Billing',
        metricName: 'EstimatedCharges',
        statistic: 'Maximum',
        dimensionsMap: {
          'Currency': 'USD'
        }
      }),
      threshold: 50,
      evaluationPeriods: 1,
      actionsEnabled: true
    });

    const topic = new Topic(this, 'BillingTopic', {
      topicName: 'BillingTopic'
    });

  new SnsAction(topic);

  const lambdaFn = new Function(this, 'DiscordWebhookFunction', {
    code: Code.fromAsset('src/lambda'),
    handler: 'index.handler',
    runtime: Runtime.NODEJS_12_X,
    events: [
      new SnsEventSource(topic)
    ]
  });

  new Subscription(this, 'BillingSubscription', {
    topic: topic,
    protocol: SubscriptionProtocol.LAMBDA,
    endpoint: lambdaFn.functionArn
  });


  }
}