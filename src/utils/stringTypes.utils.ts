var messagebird = require("messagebird")("bJwOZ42MJ4widd7laI1lyIqHc");
import * as bcrypt from "bcrypt";
import { generate } from "generate-password";

import { IPhone } from '../resources/users/user'
export function getRandomPassword(): string {
  return generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export function randomCode(length: number) {
  return Math.floor(
    Math.pow(10, length - 1) +
    Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
}

export async function sendSMS(phone: IPhone, message: string) {

  const number: string = `${phone.countrycode}${phone.number}`
  var params: {
    originator: string;
    recipients: [string];
    body: string;
  } = {
    // originator: config.get<string>('originator'),
    originator: "Ekivall",
    recipients: [`${number}`],
    body: message,
  };
  console.log(message)
  await messagebird.messages.create(params, function (err: any, response: any) {
    if (err) {
      return console.log(err);
    }
  });

}
