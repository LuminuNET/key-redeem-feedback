<template>
  <div class="home view">
    <lm-notification
      :fontSize="window().innerWidth <= 560 ? 18 : 24"
      :message="$t('response.' + notification.message)"
      :activity="notification.activity"
      :timeout="notification.timeout"
    />
    <div class="container">
      <lm-card class="lm-beta">
        <h2 class="title">Luminu Beta</h2>
        <p class="description">{{ $t('home.youCanRedeemYourBetaKeyHere') }}</p>
        <lm-seperator :mtop="9" />
        <h3 class="subtitle">{{ $t('home.enterYour8DigitCode') }}</h3>
        <div class="code-input wrapper">
          <input
            v-for="index in 8"
            :key="index"
            @keydown.stop="entered($event, index)"
            :ref="`code-${index}`"
            class="code-input desktop"
            type="text"
            name="beta-luminu-code"
            maxlength="1"
          />
          <input
            type="text"
            name="beta-luminu-code"
            ref="code-input-mobile"
            class="user-input mobile"
            maxlength="8"
          />
        </div>
        <lm-seperator :mtop="13" />
        <h3 class="subtitle">{{ $t('home.yourMinecraftUsername') }}</h3>
        <input
          v-model="username"
          ref="username"
          @keydown.enter="redeem"
          type="text"
          class="user-input"
        />
        <p class="description">{{ $t('home.makeSureYoureEnteringYourNameCorrectly') }}</p>
        <div class="btn-group">
          <lm-button @click.native="redeem" size="big" type="success" :text="$t('home.redeem')" />
        </div>
      </lm-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  LmCard,
  LmNotification,
  LmSeperator,
  LmButton,
} from '@luminu/components';
import { AxiosResponse, AxiosError } from 'axios';
import { api } from '../plugins/axios';

export default Vue.extend({
  name: 'home',
  components: {
    LmCard,
    LmNotification,
    LmSeperator,
    LmButton,
  },
  data: () => ({
    notification: {
      message: 'codeNotSpecified',
      activity: 0,
      timeout: 2500,
    },
    username: '',
    code: '',
    mobileBreakpoint: 560,
  }),
  methods: {
    window(): Window {
      return window;
    },
    updateCode() {
      if (window.innerWidth <= 560) {
        this.code = (this.$refs['code-input-mobile'] as HTMLInputElement).value;
      } else {
        this.code = '';
        for (let i = 1; i < 9; i++) {
          this.code += (this.$refs[`code-${i}`] as HTMLInputElement[])[0].value;
        }
      }
    },
    redeem() {
      this.updateCode();

      // Check if input lengths are valid
      if (
        this.code.length === 8 &&
        this.username.length >= 3 &&
        this.username.length <= 16
      ) {
        // Send request to api server
        api
          .put(`/redeem?username=${this.username}&code=${this.code}`)
          .then((response: AxiosResponse) => {
            for (let i = 1; i < 9; i++) {
              (this.$refs[`code-${i}`] as HTMLInputElement[])[0].value = '';
            }

            this.callNotification(response.data.message);
          })
          .catch((error: AxiosError) => {
            if (error.response) {
              this.callNotification(error.response.data.message);
            } else {
              this.callNotification('serviceUnavailable');
            }
          });
      } else if (this.code.length !== 8) {
        this.callNotification('codeLengthNot8');
      } else if (this.username.length < 3 || this.username.length > 16) {
        this.callNotification('usernameNotFound');
      }
    },
    callNotification(message: string) {
      if (message === 'codeRedeemedSuccessfully') {
        this.notification.timeout = 5000;
      } else {
        this.notification.timeout = 2500;
      }

      this.notification.message = message;

      this.notification.activity++;
    },
    entered(event: KeyboardEvent, index: number) {
      const currentReference = this.$refs[
        `code-${index}`
      ] as HTMLInputElement[];
      const nextReference =
        index === 8
          ? (this.$refs['username'] as HTMLInputElement)
          : (this.$refs[`code-${index + 1}`] as HTMLInputElement[])[0];

      if (nextReference) {
        if (event.key.match(/^[a-z0-9]*$/)) {
          currentReference[0].value = event.key;
          nextReference.focus();
          event.preventDefault();
        } else if (event.key.length === 1) {
          event.preventDefault();
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@luminu/core/scss/_variables.scss';

.home {
  .lm-beta {
    position: relative;
    width: 500px;
    margin: 0 auto;

    .seperator {
      margin-top: 15px;
      margin-bottom: 30px;

      hr {
        position: absolute;
        width: 100%;
        margin-left: -10px;
        border: none;
        border-top: 1px solid rgba($color: #000000, $alpha: 0.3);
      }
    }

    .subtitle {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .code-input {
      &.wrapper {
        display: flex;
        justify-content: space-between;
      }
    }

    .code-input > .mobile {
      display: none;
    }

    .code-input > .code-input,
    .user-input {
      width: 10%;
      height: 70px;
      border-radius: 5px;
      border: 1px solid #333;
      box-shadow: 2px 2px rgba($color: #000000, $alpha: 0.2);
      transition: box-shadow 0.15s;
      text-align: center;
      font-size: 42px;

      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 3px rgba($color: $lmColor2, $alpha: 0.4);
      }
    }

    @media screen and (max-width: 560px) {
      .code-input {
        > .code-input {
          display: none;
        }
        > .mobile {
          display: unset;
        }
      }
    }

    .user-input {
      width: 100%;
      height: 28px;
      text-align: left;
      text-indent: 5px;
      font-size: 16px;
    }

    .btn-group {
      margin-top: 10px;
      display: flex;
      flex-direction: row-reverse;

      .btn.btn--success {
        background-color: $lmSuccess;
        box-shadow: 0px 2px rgba($color: $lmSuccessDarken, $alpha: 1);
        margin-top: 10px;
        padding: 4px 10px;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: background-color 0.1s ease-out;
        user-select: none;

        &:hover {
          background-color: $lmSuccessDarken;
        }
      }
    }
  }

  @media screen and (max-width: 560px) {
    .lm-beta {
      width: 100%;
    }
  }
}
</style>
