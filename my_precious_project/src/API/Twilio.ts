// Twilio.ts 파일

import twilio from "twilio";

export class Twilio {
  private client: twilio.Twilio;
  private accountSid = "AC5eb92cbd65cf915a3e2fb523dc354213";
  private authToken = "e74ec26e387c5fb64b521af4783a320e";
  private verifyServiceSid = "VAd3bee0ca8624f5fe66018ddeb8766031";

  constructor() {
    this.client = twilio(this.accountSid, this.authToken);
  }

  sendVerificationCode(options: { to: string }) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verifications.create({ to: options.to, channel: "sms" });
  }
  checkVerificationCode(options: { to: string; code: string }) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verificationChecks.create({
        to: options.to,
        code: options.code,
      });
  }
}
