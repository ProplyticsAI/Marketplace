export type CallRequest = {
  leadId: string;
  phone: string;
  scriptVersion: string;
};

export type CallResponse = {
  providerCallId: string;
  status: 'queued' | 'started' | 'failed';
};

export interface CallProvider {
  name: 'twilio' | 'vapi' | 'retell' | 'mock';
  enqueueCall(request: CallRequest): Promise<CallResponse>;
}

export class MockCallProvider implements CallProvider {
  name: 'mock' = 'mock';

  async enqueueCall(request: CallRequest): Promise<CallResponse> {
    return {
      providerCallId: `mock-${request.leadId}-${Date.now()}`,
      status: 'queued'
    };
  }
}
