import { Construct } from 'constructs'
import { App, TerraformStack, Token} from 'cdktf'
import { AwsProvider, Vpc, Subnet} from './.gen/providers/aws'

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    new AwsProvider(this, 'aws', {
      region: 'us-west-1',
    })

    const vpc = new Vpc(this, "my-tfcdk-vpc", {
      cidrBlock: '10.0.0.0/16'
    })

    new Subnet(this, "my-tfcdk-subnet", {
      vpcId: Token.asString(vpc.id),
      cidrBlock: '10.0.0.0/16'
    })

    // const instance = new Instance(this, 'compute', {
    //   ami: 'ami-01456a894f71116f2',
    //   instanceType: 't2.micro',
    // })

    // new TerraformOutput(this, 'public_ip', {
    //   value: instance.publicIp,
    // })
  }
}

const app = new App()
new MyStack(app, 'typescript-aws')
app.synth()
