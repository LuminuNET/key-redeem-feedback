import { footer } from '@luminu/core/translations/en';

const en = {
  navigation: {
    home: 'Home',
    forum: 'Forum',
  },
  home: {
    youCanRedeemYourBetaKeyHere: 'You can redeem your beta key here.',
    enterYour8DigitCode: 'Enter your 8-digit code',
    yourMinecraftUsername: 'Your Minecraft username',
    redeem: 'Redeem',
    makeSureYoureEnteringYourNameCorrectly:
      "Make sure you're entering your name correctly.",
  },
  response: {
    userAlreadyRedeemedBetaCode:
      'The user specified has already redeemed a beta code.',
    codeAlreadyRedeemed: 'The code specified has already been redeemed.',
    codeNotFound: 'The code specified could not be found.',
    usernameNotFound: 'The username specified could not be found.',
    codeNotSpecified: 'No code was specified.',
    codeLengthNot8: 'The length of the the code specified is not 8.',
    usernameNotSpecifiedInQuery: 'The username was not specified in the query.',
    serviceUnavailable: 'Service currently unavailable.',
    codeRedeemedSuccessfully: 'The code was redeemed successfully.',
    tooManyRequestsAtOnce:
      'You have sent too many requests, please wait for 5 minutes.',
  },
  footer,
};

export { en };
